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
        fetcher,
      }}
    >
      <SessionProvider session={null}>{children}</SessionProvider>;
    </SWRConfig>
  );
};
