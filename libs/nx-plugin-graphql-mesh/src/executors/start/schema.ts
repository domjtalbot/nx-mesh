import type { Options } from '../../utils';

type MeshStartSchema = Options<'start'>;

export type StartExecutorSchema = MeshStartSchema['args'] &
  MeshStartSchema['env'];
