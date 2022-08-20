import { useDepthLimit as depthLimit } from '@envelop/depth-limit';
import { useDisableIntrospection as disableIntrospection } from '@envelop/disable-introspection';
import { createServer } from '@graphql-yoga/node';
import { NextApiRequest, NextApiResponse } from 'next';
import { getBuiltMesh } from '@nx-mesh/sdk/trippin-swc';

async function buildServer() {
  // retrieve the mesh instance (with configured Envelop plugins)
  const mesh = await getBuiltMesh();

  // pass the Mesh instance to Yoga and configure GraphiQL
  const server = createServer({
    plugins: [
      ...mesh.plugins,
      disableIntrospection({
        disableIf: () =>
          process.env['NX__ENABLE_GRAPHQL_INTROSPECTION'] === 'false',
      }),
      depthLimit({
        maxDepth: 10,
      }),
    ],
    graphiql:
      process.env['NX__ENABLE_GRAPHIQL'] === 'false'
        ? false
        : {
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
