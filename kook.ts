import { doradoFetch, jsonResponse } from './utils.ts'

interface KookApiResponse {
  url?: string
}

export default async function handleRequest(
  request: Request,
): Promise<Response> {
  const sp = new URLSearchParams(new URL(request.url).search)
  const version = sp.get('version')
  if (!version) {
    return jsonResponse({ message: 'version parameter is required' }, 400)
  }

  const UPSTREAM_API =
    'https://www.kookapp.cn/api/v2/updates/latest-version?platform=windows'

  const res = await doradoFetch(UPSTREAM_API, {
    method: 'GET',
  })
  const data: KookApiResponse = await res.json()

  if (!data.url) {
    return jsonResponse(
      {
        message: 'upstream api failed, please try again later',
      },
      500,
    )
  }

  const regex = `Kook_PC_Setup_v${version}_`
  if (!data.url.match(new RegExp(regex))) {
    return jsonResponse({ message: 'version parameter mismatch' }, 400)
  }

  return Response.redirect(data.url, 302)
}
