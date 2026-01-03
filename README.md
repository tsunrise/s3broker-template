# S3Broker Template

A one-click deployable [Cloudflare Worker](https://workers.cloudflare.com/) template for proxying S3-compatible endpoints with configurable guardrail policies.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tsunrise/s3broker-template)

## Overview

This template uses [s3broker](https://www.npmjs.com/package/s3broker) to create a proxy in front of your S3-compatible storage (AWS S3, Cloudflare R2, etc.) with built-in guardrail policies to protect against accidental or malicious actions when the client is compromised.

## Manual Deployment

Steps is you prefer manual deployment:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Put secrets:

   Credentials for upstream:

   ```bash
   wrangler secret put UPSTREAM_ACCESS_KEY_ID
   wrangler secret put UPSTREAM_SECRET_ACCESS_KEY
   ```

   Credentials that clients will use to authenticate with this proxy:

   ```bash
   wrangler secret put CLIENT_ACCESS_KEY_ID
   wrangler secret put CLIENT_SECRET_ACCESS_KEY
   ```

4. Deploy:
   ```bash
   wrangler deploy
   ```

## License

MIT
