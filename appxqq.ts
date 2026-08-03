import { doradoFetch, jsonResponse } from './utils.ts'

export default async function handleRequest(
  request: Request,
): Promise<Response> {
  const UPSTREAM_API = 'https://store.rg-adguard.net/api/GetFiles'
  // `9nhlgf0zwc5s` refers to:
  // https://www.microsoft.com/zh-cn/p/qq%E6%A1%8C%E9%9D%A2%E7%89%88/9nhlgf0zwc5s
  const BODY = 'type=ProductId&url=9nhlgf0zwc5s&ring=Retail&lang=en-US'

  const response = await doradoFetch(UPSTREAM_API, {
    method: 'POST',
    body: BODY,
  })

  if (response.ok) {
    const text = await response.text()
    const re = new RegExp(
      /href="(?<url>http:\/\/t.+?)".+?(?<name>90.+?4B1ECA_(?<version>[\d.]+).+?a99ra4d2cbcxa.appx).+?">(?<sha1>\w{40})</sm,
    )
    const groups = text.match(re)

    if (groups) {
      const url = groups[1]
      const name = groups[2]
      const version = groups[3]
      const hash = groups[4]

      const sp = new URLSearchParams(new URL(request.url).search)

      if (sp.has('dl')) {
        return Response.redirect(url, 302)
      }

      return jsonResponse({
        'url': url,
        'version': version,
        'name': name,
        'sha1': hash,
      })
    }
  }

  return jsonResponse({ message: "couldn't process your request" }, 500)
}
