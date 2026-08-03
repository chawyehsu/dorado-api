declare global {
  interface Uint8Array {
    toHex(): string
  }
}

const DEFAULT_HEADERS = {
  'user-agent': 'Deno/2.0 (Deno Deploy) Scoop/1.0 (+https://scoop.sh)',
  'content-type': 'application/x-www-form-urlencoded',
  'accept-encoding': 'gzip, deflate, br',
}

export async function doradoFetch(
  input: string | URL | Request,
  init?: RequestInit,
): Promise<Response> {
  const headers = new Headers(DEFAULT_HEADERS)
  if (init?.headers) {
    for (const [key, value] of new Headers(init.headers).entries()) {
      headers.set(key, value)
    }
  }
  return await fetch(input, { ...init, headers })
}
}

export function toHexPolyfill() {
  if (!Uint8Array.prototype.toHex) {
    Uint8Array.prototype.toHex = function (this: Uint8Array) {
      let out = ''
      for (const value of this) {
        out += value.toString(16).padStart(2, '0')
      }
      return out
    }
  }
}
