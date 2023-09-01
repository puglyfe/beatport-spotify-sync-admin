// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeEach } from 'vitest';
import 'vitest-dom/extend-expect';
import 'whatwg-fetch';

import './setupResizeObserver';

import '@src/mocks';
import { server } from '@src/mocks/server';

beforeEach(() => {
  server.resetHandlers();
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  server.close();
});
