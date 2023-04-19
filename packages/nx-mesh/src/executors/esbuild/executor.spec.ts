import { EsbuildExecutorSchema } from './schema';
import executor from './executor';

const options: EsbuildExecutorSchema = {};

describe('Esbuild Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
