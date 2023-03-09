import type { Types } from '../types';

export const isAvailability = <T>(
  value: T | Types.availability
): value is Types.availability =>
  [
    'in_the_news',
    'most_read',
    'on_this_day',
    'picture_of_the_day',
    'todays_featured_article',
  ].some((name) => Object.prototype.hasOwnProperty.call(value, name));

export default isAvailability;
