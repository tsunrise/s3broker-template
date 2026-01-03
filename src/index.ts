/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { handle } from 's3broker';

interface Env extends Cloudflare.Env {
	UPSTREAM_ACCESS_KEY_ID: string;
	UPSTREAM_SECRET_ACCESS_KEY: string;
	CLIENT_ACCESS_KEY_ID: string;
	CLIENT_SECRET_ACCESS_KEY: string;
}

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return handle(request, {
			s3Endpoint: env.UPSTREAM_ENDPOINT,
			upstreamAccessKeyId: env.UPSTREAM_ACCESS_KEY_ID,
			upstreamSecretAccessKey: env.UPSTREAM_SECRET_ACCESS_KEY,
			clientAccessKeyId: env.CLIENT_ACCESS_KEY_ID,
			clientSecretAccessKey: env.CLIENT_SECRET_ACCESS_KEY,
			guardrailConfig: {
				// See https://github.com/tsunrise/s3broker?tab=readme-ov-file#built-in-policies
				noDeleteOld: [
					{
						pattern: '/.*',
						config: {
							noDeleteBeforeSeconds: ONE_WEEK_IN_SECONDS,
						},
					},
				],
				noReplaceOld: [
					{
						pattern: '/.*',
						config: {
							noReplaceBeforeSeconds: ONE_WEEK_IN_SECONDS,
						},
					},
				],
				managedSse: [],
			},
		});
	},
} satisfies ExportedHandler<Env>;
