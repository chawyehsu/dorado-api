function splitFromLastDot(inputString: string): [string, string | undefined] {
  const lastDotIndex = inputString.lastIndexOf('.')

  if (lastDotIndex === -1) {
    // No dot found, return the original string as the first part
    return [inputString, undefined]
  } else {
    const partBeforeLastDot = inputString.slice(0, lastDotIndex)
    const partAfterLastDot = inputString.slice(lastDotIndex + 1)
    return [partBeforeLastDot, partAfterLastDot]
  }
}

export default async function handleRequest(
  request: Request,
): Promise<Response> {
  const sp = new URLSearchParams(new URL(request.url).search)
  if (!sp.has('version')) {
    return new Response(
      JSON.stringify({ message: 'version parameter is required' }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
      },
    )
  }

  const [ver, build] = splitFromLastDot(sp.get('version')!)
  if (!build) {
    return new Response(
      JSON.stringify({ message: 'version parameter format is invalid' }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
      },
    )
  }

  const downloadUrl = `https://uu.gdl.netease.com/${build}/UU-${ver}.exe`

  const r = await fetch('https://adl.netease.com/d/g/uu/c/gw/js', {
    method: 'GET',
    headers: {
      'user-agent': 'Deno/2.0 (Deno Deploy) Scoop/1.0 (+https://scoop.sh)',
      'content-type': 'application/x-www-form-urlencoded',
      'accept-encoding': 'gzip, deflate, br',
    },
  })

  const regex = `(${downloadUrl.replaceAll(/\./g, '\\.')}\\?key.*?)"`

  const js = await r.text()
  const match = js.match(new RegExp(regex))
  if (!match || match.length < 2) {
    // Upstream JS typically contains URLs like ...netease.com/{build}/UU-{version}.exe.
    // If requested version is stale, surface the current version instead of returning 500.
    const availableVersionMatch = js.match(
      /\.netease\.com\/(\d+)\/UU-([\d.]+)\.exe/i,
    )
    if (availableVersionMatch && availableVersionMatch.length >= 3) {
      const currentVersion = `${availableVersionMatch[2]}.${
        availableVersionMatch[1]
      }`
      return new Response(
        JSON.stringify({
          message:
            `requested version ${ver}.${build}, current available version is ${currentVersion}`,
        }),
        {
          status: 404,
          headers: {
            'content-type': 'application/json; charset=UTF-8',
          },
        },
      )
    }

    return new Response('Failed to find download keys', { status: 500 })
  }

  return Response.redirect(match[1], 302)
}
