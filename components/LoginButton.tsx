import { Button } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';

const LoginButton = () => {
  const { data: session } = useSession();

  return session ? (
    <Button onClick={() => signOut()} variant="outline">
      Sign out
    </Button>
  ) : (
    <Button onClick={() => signIn()}>Sign in</Button>
  );
};

export default LoginButton;
