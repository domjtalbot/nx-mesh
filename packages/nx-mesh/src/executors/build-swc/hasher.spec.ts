import { Hasher, HasherContext } from '@nrwl/devkit';

import { buildSwcHasher } from './hasher';

describe('buildSwcHasher', () => {
  it('should generate hash', async () => {
    const mockHasher: Hasher = {
      hashTask: jest.fn().mockReturnValue({ value: 'hashed-task' }),
    } as unknown as Hasher;
    const hash = await buildSwcHasher(
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
