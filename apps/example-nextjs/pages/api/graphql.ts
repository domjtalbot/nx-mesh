import { createServer } from '@graphql-yoga/node';
import { NextApiRequest, NextApiResponse } from 'next';
import { getBuiltMesh } from '@nx-plugin-graphql-mesh/examples/graphql-mesh-lib';

async function buildServer() {
  // retrieve the mesh instance (with configured Envelop plugins)
  const mesh = await getBuiltMesh();

  // pass the Mesh instance to Yoga and configure GraphiQL
  const server = createServer({
    plugins: mesh.plugins,
    graphiql: {
      endpoint: '/api/graphql',
      title: 'Mesh Gateway',
    },
  });

  return server;
}

// avoids building the server at each request!
export const server$ = buildServer();

export default async function apiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return (await server$).requestListener(req, res);
}
