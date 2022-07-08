import type { Error } from '../sdk';

export const isError = <T>(value: T | Error): value is Error =>
  Object.prototype.hasOwnProperty.call(value, 'code');

export default isError;
