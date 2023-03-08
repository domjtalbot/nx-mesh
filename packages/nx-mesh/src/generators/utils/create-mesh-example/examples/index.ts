import type { ExampleConfig } from '../types';

import * as countryInfo from './country-info';
import * as fakeApi from './fake-api';
import * as javascriptWiki from './javascript-wiki';
import * as movies from './movies';
import * as rfam from './rfam';
import * as stackexchange from './stackexchange';
import * as starWarsApi from './star-wars';
import * as trippin from './trippin';

export const examples: ExampleConfig = {
  'country-info': countryInfo.config,
  'fake-api': fakeApi.config,
  'javascript-wiki': javascriptWiki.config,
  movies: movies.config,
  rfam: rfam.config,
  stackexchange: stackexchange.config,
  'star-wars': starWarsApi.config,
  trippin: trippin.config,
};

export default examples;
