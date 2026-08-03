import { doradoFetch } from './utils.ts'

export default async function handleRequest(_: Request): Promise<Response> {
  const UPSTREAM_API = 'https://www.swift.org/download/'

  // Proxy the request to swift.org with explicit `accept-encoding` header,
  // return an uncompressed response to downstream scoop.
  return await doradoFetch(UPSTREAM_API, {
    method: 'GET',
  })
}
