import { Hasher, HasherContext } from '@nrwl/devkit';

import { buildGatewayHasher } from './hasher';

describe('buildGatewayHasher', () => {
  it('should generate hash', async () => {
    const mockHasher: Hasher = {
      hashTaskWithDepsAndContext: jest
        .fn()
        .mockReturnValue({ value: 'hashed-task' }),
    } as unknown as Hasher;
    const hash = await buildGatewayHasher(
      {
        id: 'my-task-id',
        target: {
          project: 'proj',
          target: 'target',
        },
        overrides: {},
      },
      {
        hasher: mockHasher,
      } as unknown as HasherContext
    );
    expect(hash).toEqual({ value: 'hashed-task' });
  });
});
