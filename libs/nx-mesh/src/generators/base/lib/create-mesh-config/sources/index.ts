import { source as javascriptWiki } from './javascript-wiki';
import { source as stackexchange } from './stackexchange';
import { source as trippin } from './trippin';
import { source as weatherbit } from './weatherbit';

export const sources = {
  javascriptWiki,
  stackexchange,
  trippin,
  weatherbit,
};

export type SourceOptions = keyof typeof sources;

export type Sources = typeof sources;
