import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeEach, expect } from 'vitest';
import 'vitest-dom/extend-expect';

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

class ResizeObserverStub {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = window.ResizeObserver || ResizeObserverStub;
