import { Hasher, HasherContext } from '@nrwl/devkit';

import { serveHasher } from './hasher';

describe('serveHasher', () => {
  it('should generate hash', async () => {
    const mockHasher: Hasher = {
      hashTask: jest.fn().mockReturnValue({ value: 'hashed-task' }),
    } as unknown as Hasher;
    const hash = await serveHasher(
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
