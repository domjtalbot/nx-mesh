import { CustomHasher } from '@nrwl/devkit';

/**
 * This is a boilerplate custom hasher that matches
 * the default Nx hasher. If you need to extend the behavior,
 * you can consume workspace details from the context.
 */
export const buildHasher: CustomHasher = async (task, context) => {
  return context.hasher.hashTask(task);
};

export default buildHasher;
