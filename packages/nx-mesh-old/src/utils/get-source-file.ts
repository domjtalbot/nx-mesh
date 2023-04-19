import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

export type GetSourceFileProps = {
  dir: string;
  root: string;
  sourcePath?: string;
};

export const getSourceFile = async (props: GetSourceFileProps) => {
  const { root, dir, sourcePath } = Object.assign(
    {
      sourcePath: '.mesh/index.ts',
    },
    props
  );

  const dirPath = resolve(root, dir);
  const sourceFilePath = join(dirPath, sourcePath);

  return await readFile(sourceFilePath, 'utf8');
};
