import { Container, Group, Header, SimpleGrid } from '@mantine/core';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import LoginButton from '@src/components/LoginButton';
import OrphanTracksContainer from '@src/components/OrphanTracksContainer';
import PlaylistContainer from '@src/components/PlaylistContainer';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Hi." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header height="4rem">
        <Group sx={{ height: '100%' }} px="1.5rem" position="right">
          <LoginButton />
        </Group>
      </Header>
      <main>
        {session ? (
          <Container py="xl" size="xl">
            <SimpleGrid cols={2}>
              <PlaylistContainer />
              <OrphanTracksContainer />
            </SimpleGrid>
          </Container>
        ) : (
          <p>You&apos;re not logged in.</p>
        )}
      </main>
    </>
  );
}
