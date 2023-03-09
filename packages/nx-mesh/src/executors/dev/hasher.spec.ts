import { Hasher, HasherContext } from '@nrwl/devkit';

import { devHasher } from './hasher';

describe('devHasher', () => {
  it('should generate hash', async () => {
    const mockHasher: Hasher = {
      hashTask: jest.fn().mockReturnValue({ value: 'hashed-task' }),
    } as unknown as Hasher;
    const hash = await devHasher(
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
