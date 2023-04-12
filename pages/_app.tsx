import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

import '@src/styles/globals.css';

import fetcher from '@src/lib/fetch';

if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
  require('@src/mocks');
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <SessionProvider session={session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
          }}
        >
          <Notifications />
          <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
