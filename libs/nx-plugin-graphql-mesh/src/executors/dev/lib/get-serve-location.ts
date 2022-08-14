import type { DevExecutorSchema } from '../schema';

import getPort = require('get-port');

export async function getServeLocation(options: DevExecutorSchema) {
  let port = options.port.number ?? 4200;

  if (options.port.auto) {
    port = await getPort();
  } else if (options.port.fallback === 'auto') {
    port = await getPort({
      port: options.port.number,
      host: options.port.host,
    });
  }

  return {
    baseUrl: `http://${options.port.host}:${port}`,
    host: options.port.host,
    port,
  };
}

export default getServeLocation;
