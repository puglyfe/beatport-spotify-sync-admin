import { beforeEach } from 'vitest';

import { server } from '@src/mocks/server';

beforeEach(() => {
  server.resetHandlers();
});