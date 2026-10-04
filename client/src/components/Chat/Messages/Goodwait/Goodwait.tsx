import { createElement, useContext, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { ThemeContext, isDark } from '@librechat/client';
import type { CSSProperties } from 'react';
import { getMessageRowWidthClass } from '~/components/Chat/Messages/ui/MessageRow';
import { showGoodwaitAtom } from '~/store/goodwait';
import { useGetStartupConfig } from '~/data-provider';
import { resolveSiteKey } from './site';
import { cn } from '~/utils';
import './element';

type GoodwaitElement = HTMLElement & { query: string };

/** The element styles itself in a shadow root; these hooks point its colors at the
 *  app's semantic tokens so custom and high-contrast themes reach it too. */
const themeTokens = {
  '--iw-bg': 'rgb(var(--surface-primary-alt))',
  '--iw-fg': 'rgb(var(--text-primary))',
  '--iw-muted': 'rgb(var(--text-secondary))',
  '--iw-line': 'rgb(var(--border-light))',
  '--iw-tag': 'rgb(var(--surface-tertiary))',
  '--iw-accent': 'rgb(var(--link))',
} as CSSProperties;

/**
 * One labeled sponsored line (the vendored `<good-wait>` element) under the
 * in-progress response. It fetches only while `active`, sends nothing but the
 * site key and `query`, counts a view after 1s at least half on screen, and
 * hides itself a few seconds after `active` clears.
 */
export default function Goodwait({
  active,
  query,
  maximizeChatSpace = false,
}: {
  active: boolean;
  query: string;
  maximizeChatSpace?: boolean;
}) {
  const { theme } = useContext(ThemeContext);
  const { data: startupConfig } = useGetStartupConfig();
  const showGoodwait = useAtomValue(showGoodwaitAtom);
  const [element, setElement] = useState<GoodwaitElement | null>(null);

  const config = startupConfig?.goodwait;
  const site =
    config?.enabled === true && showGoodwait
      ? resolveSiteKey(config.site, window.location.hostname)
      : '';

  useEffect(() => {
    if (element == null) {
      return;
    }
    element.query = query;
    element.toggleAttribute('active', active && query.trim() !== '');
  }, [element, active, query]);

  if (!site) {
    return null;
  }

  return (
    <div className="w-full px-4 sm:px-0">
      <div className={cn('mx-auto', getMessageRowWidthClass({ fullWidth: maximizeChatSpace }))}>
        {createElement('good-wait', {
          ref: setElement,
          site,
          style: themeTokens,
          theme: isDark(theme) ? 'dark' : 'light',
          'data-testid': 'good-wait',
        })}
      </div>
    </div>
  );
}
