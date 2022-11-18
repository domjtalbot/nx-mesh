import countryInfo from './country-info';
import javascriptWiki from './javascript-wiki';
import stackexchange from './stackexchange';
import trippin from './trippin';

export const examples = {
  countryInfo,
  javascriptWiki,
  stackexchange,
  trippin,
};

export type ExampleOptions = keyof typeof examples;

export type Examples = typeof examples;
