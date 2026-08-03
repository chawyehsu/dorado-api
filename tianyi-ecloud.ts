import { doradoFetch } from './utils.ts'

export default async function handleRequest(
  request: Request,
): Promise<Response> {
  const UPSTREAM_API =
    'https://cloud.189.cn/api/portal/listClients.action?pcClientType='

  const response = await doradoFetch(UPSTREAM_API, {
    method: 'GET',
  })

  if (response.ok) {
    const data = await response.json()
    const version = data.clientList[0].clientVersion
    let url = data.clientList[0].downloadUrl
    if (url.indexOf('//') === 0) {
      url = 'https:' + url
    }

    const sp = new URLSearchParams(new URL(request.url).search)
    if (sp.has('dl')) {
      return Response.redirect(url, 302)
    }

    return new Response(
      JSON.stringify({
        'url': url,
        'version': version,
      }),
      {
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
      },
    )
  }

  return new Response(
    JSON.stringify({ message: "couldn't process your request" }),
    {
      status: 500,
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    },
  )
}
