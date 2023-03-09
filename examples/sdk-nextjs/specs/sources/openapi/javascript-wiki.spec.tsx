import React from 'react';
import { render } from '@testing-library/react';

import { JavascriptWikiRoute } from '../../../pages/sources/openapi/javascript-wiki';

import exampleData from './javascript-wiki.json';

describe('CountryIfno', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JavascriptWikiRoute {...exampleData} />);

    expect(baseElement).toBeTruthy();
  });
});
