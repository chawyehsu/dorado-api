import handlerAliyunDrive from './alipan.ts'
import handlerAppxqq from './appxqq.ts'
import handlerEdge from './edge.ts'
import handleKook from './kook.ts'
import handlerNeteaseUU from './neteaseuu.ts'
import handleTianyiEcloud from './tianyi-ecloud.ts'
import handleFutunn from './futunn.ts'
import { jsonResponse, toHexPolyfill } from './utils.ts'

toHexPolyfill()

async function handler(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url)

  // aliundrive/alipan
  if (pathname === '/alipan') {
    return await handlerAliyunDrive(request)
  }

  // edge
  if (pathname === '/edge') {
    return await handlerEdge(request)
  }

  // kook
  if (pathname === '/kook') {
    return await handleKook(request)
  }

  // neteaseuu
  if (pathname === '/neteaseuu') {
    return await handlerNeteaseUU(request)
  }

  // tianyi-ecloud
  if (pathname === '/tianyi-ecloud') {
    return await handleTianyiEcloud(request)
  }

  // futunn
  if (pathname === '/futunn') {
    return await handleFutunn(request)
  }

  return jsonResponse({
    message: 'missing action',
    help: 'https://github.com/chawyehsu/dorado-api',
    actions: [
      '/alipan',
      '/alipan?version=&dl',
      '/edge?arch=&channel=',
      '/edge?arch=&channel=&dl',
      '/tianyi-ecloud',
      '/tianyi-ecloud?dl',
      '/neteaseuu?version=',
      '/kook?version=',
      '/futunn',
    ],
  }, 404)
}

export default {
  fetch: handler,
}
