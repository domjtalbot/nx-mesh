import type { DevExecutorSchema } from '../schema';

import getPort = require('get-port');

export async function port(options: DevExecutorSchema) {
  let port = options.port.number ?? 4200;

  if (options.port.auto) {
    port = await getPort();
  } else if (options.port.fallback === 'auto') {
    port = await getPort({
      port: options.port.number,
      host: '0.0.0.0',
    });
  }

  return port;
}

export default port;
