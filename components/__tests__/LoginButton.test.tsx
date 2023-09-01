import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { describe, expect, test } from 'vitest';

import { server } from '@src/mocks/server';
import { AllTheProviders } from '@src/tests/utils';

import LoginButton from '../LoginButton';

describe('<LoginButton />', () => {
  test('shows a login button when user does not have an active session', () => {
    server.use(
      rest.get('/api/auth/session', (_req, res, ctx) => {
        return res(ctx.json({}));
      }),
    );
    render(<LoginButton />, {
      wrapper: AllTheProviders,
    });

    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  test.skip('shows a logout button when user has an active session', () => {
    render(<LoginButton />, {
      wrapper: AllTheProviders,
    });

    expect(
      screen.getByRole('button', { name: /sign out/i }),
    ).toBeInTheDocument();
  });
});
