import { CustomHasher } from '@nrwl/devkit';

/**
 * This is a boilerplate custom hasher that matches
 * the default Nx hasher. If you need to extend the behavior,
 * you can consume workspace details from the context.
 */
export const buildSwcHasher: CustomHasher = async (task, context) => {
  return context.hasher.hashTaskWithDepsAndContext(task);
};

export default buildSwcHasher;
