# dorado-api

Some APIs that [dorado](https://github.com/chawyehsu/dorado) bucket uses to
maintain manifests.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ba53d064-ad14-4d5a-990f-b95286caaf42/deploy-status)](https://app.netlify.com/projects/dorado-api/deploys)

## Deployment

### Netlify Edge Functions

Runs on [Netlify Edge Functions](https://docs.netlify.com/build/edge-functions/overview/).

#### Local

Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/) and run:

```bash
npx netlify dev
```

#### Production

Deploy by connecting the repository to Netlify. The checked-in `netlify.toml`
configures the Edge Function route.

### Deno Deploy

**Deprecating**: Deno Deploy will be shut down in the future.

Runs on [Deno Deploy](https://deno.com/deploy).

#### Local

Run with `deno serve`:

```bash
deno task start
```

or with watch mode:

```bash
deno task dev
```

#### Production

Deploy by connecting the repository to Deno Deploy.

## License

**dorado-api** © [Chawye Hsu](https://github.com/chawyehsu). Released under the
[MIT](LICENSE) license.

> [Blog](https://chawyehsu.com) · GitHub
> [@chawyehsu](https://github.com/chawyehsu) · Twitter
> [@chawyehsu](https://twitter.com/chawyehsu)
