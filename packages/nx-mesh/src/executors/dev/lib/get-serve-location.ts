import type { DevExecutorSchema } from '../schema';

import getPort from 'get-port';

export async function getServeLocation(options: DevExecutorSchema) {
  let port = options.port.number ?? 4200;
  const isRange = options.port.range !== undefined;
  const range = getPort.makeRange(
    options.port.range?.from ?? 1024,
    options.port.range?.to ?? 65535
  );

  if (options.port.auto) {
    port = await getPort({
      port: isRange ? range : undefined,
    });
  } else {
    if (options.port.fallback === 'auto') {
      port = await getPort({
        port: isRange ? range : options.port.number,
        host: options.port.host,
      });
    }
  }

  return {
    baseUrl: `http://${options.port.host}:${port}`,
    host: options.port.host,
    port,
  };
}

export default getServeLocation;
