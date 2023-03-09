import type { Options } from '../../utils/mesh-cli';

type MeshValidateSchema = Options<'validate'>;

export type ValidateExecutorSchema = MeshValidateSchema['args'] &
  MeshValidateSchema['env'];
