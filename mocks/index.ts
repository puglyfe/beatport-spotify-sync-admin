async function initMocks() {
  if (typeof window === 'undefined' || process.env.VITEST) {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
}

initMocks();

export {};
