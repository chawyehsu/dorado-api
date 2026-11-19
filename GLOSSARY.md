# dorado-api

Version-check and download endpoints that dorado's bucket uses to maintain
manifests. Each endpoint proxies a request to a third-party upstream API and
re-shapes its response for Scoop.

## Language

**doradoFetch**: A shared wrapper around `fetch` that sends dorado/Scoop
identity headers (Scoop user-agent, form content-type) when calling upstream
APIs. _Avoid_: upstreamFetch, proxyFetch, fetchWithDefaults
