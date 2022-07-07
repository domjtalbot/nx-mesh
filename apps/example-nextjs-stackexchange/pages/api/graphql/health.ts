import type { NextApiRequest, NextApiResponse } from 'next';

import { server$ } from '../graphql';

export default async function graphqlHealth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await server$;
  res.status(200).json({ message: 'alive' });
}
