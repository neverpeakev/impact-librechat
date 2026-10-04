const SITE_KEY = /^[a-z0-9][a-z0-9-]{1,40}$/;

/** `chat.example.edu` -> `chat-example-edu`, so every deployment gets its own row with zero setup. */
export function siteKeyFromHost(host: string): string {
  const key = host
    .toLowerCase()
    .replace(/^www\./, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 41)
    .replace(/-+$/, '');
  return SITE_KEY.test(key) ? key : '';
}

/** The operator's `GOODWAIT_SITE` when it is a valid key, else the key derived from the host. */
export function resolveSiteKey(configured: string | undefined, host: string): string {
  const site = (configured ?? '').trim().toLowerCase();
  return SITE_KEY.test(site) ? site : siteKeyFromHost(host);
}
