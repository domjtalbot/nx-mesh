import { source as javascriptWiki } from './javascript-wiki';
import { source as stackexchange } from './stackexchange';
import { source as trippin } from './trippin';
import { source as countryInfo } from './country-info';

export const sources = {
  javascriptWiki,
  stackexchange,
  trippin,
  countryInfo,
};

export type SourceOptions = keyof typeof sources;

export type Sources = typeof sources;
