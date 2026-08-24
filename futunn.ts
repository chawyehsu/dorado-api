import { doradoFetch, jsonResponse } from './utils.ts'

export default async function handleRequest(
  _: Request,
): Promise<Response> {
  const UPSTREAM_API = 'https://www.futunn.com/download/windows'

  const response = await doradoFetch(UPSTREAM_API, {
    method: 'GET',
  })

  if (response.ok) {
    const data = await response.text()
    const regex = /for Windows Ver. ([\d.]+)/s

    const match = data.match(regex)
    const version = match ? match[1] : undefined

    if (!version) {
      return jsonResponse({ message: "couldn't find version" }, 500)
    }

    return jsonResponse({
      'version': version,
    })
  }

  return jsonResponse({ message: "couldn't process your request" }, 500)
}
