import React from 'react';
import { render } from '@testing-library/react';

import { TrippinRoute } from '../../../pages/sources/odata/trippin';

import exampleData from './trippin.json';

describe('CountryIfno', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrippinRoute {...exampleData} />);

    expect(baseElement).toBeTruthy();
  });
});
