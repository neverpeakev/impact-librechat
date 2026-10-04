import { resolveSiteKey, siteKeyFromHost } from '../site';

describe('siteKeyFromHost', () => {
  it('derives a key from the hostname', () => {
    expect(siteKeyFromHost('chat.example.edu')).toBe('chat-example-edu');
    expect(siteKeyFromHost('www.Example.com')).toBe('example-com');
    expect(siteKeyFromHost('localhost')).toBe('localhost');
  });

  it('caps the key at 41 characters without a trailing dash', () => {
    const key = siteKeyFromHost(`${'a'.repeat(40)}.example.com`);
    expect(key).toBe('a'.repeat(40));
    expect(siteKeyFromHost(`${'b'.repeat(39)}.c.example.com`)).toBe(`${'b'.repeat(39)}-c`);
  });

  it('returns an empty key when nothing usable remains', () => {
    expect(siteKeyFromHost('')).toBe('');
    expect(siteKeyFromHost('a')).toBe('');
  });
});

describe('resolveSiteKey', () => {
  it('prefers a valid configured key', () => {
    expect(resolveSiteKey(' Lincoln-High ', 'chat.example.edu')).toBe('lincoln-high');
  });

  it('falls back to the host when the configured key is missing or invalid', () => {
    expect(resolveSiteKey(undefined, 'chat.example.edu')).toBe('chat-example-edu');
    expect(resolveSiteKey('no spaces allowed', 'chat.example.edu')).toBe('chat-example-edu');
  });
});
