# 👷 `cloudflare-worker-template-prerenderio` Prerender.io

A template for kick starting a Cloudflare worker project with [Prerender.io](https://prerenderio)

[`index.js`](https://github.com/bcnzer/cloudflare-worker-template-prerenderio/blob/master/index.js) is the content of the Workers script with the [Prerender.io](https://prerenderio) support. 

Note this template is based on the code from [websirnik](https://github.com/websirnik) in [this thread](https://github.com/prerender/prerender/issues/353#issuecomment-408394515).

#### Configuration
You need to enter your Prerender token. There is a variable `MY_PRERENDER_TOKEN` at the top of the file, between the single quotes.

#### Wrangler
To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate myApp https://github.com/bcnzer/cloudflare-worker-template-prerenderio
```

#### Serverless
To deploy using serverless add a [`serverless.yml`](https://serverless.com/framework/docs/providers/cloudflare/) file.
