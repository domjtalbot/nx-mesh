import type { Options } from '../../utils';

type MeshValidateSchema = Options<'validate'>;

export type ValidateExecutorSchema = MeshValidateSchema['args'] &
  MeshValidateSchema['env'];
