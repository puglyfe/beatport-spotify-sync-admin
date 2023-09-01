import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

import fetcher from '@src/lib/fetch';

export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 0,
        fetcher,
        // Initiate a new cache provider on every test.
        provider: () => new Map(),
      }}
    >
      <SessionProvider session={null}>{children}</SessionProvider>;
    </SWRConfig>
  );
};
