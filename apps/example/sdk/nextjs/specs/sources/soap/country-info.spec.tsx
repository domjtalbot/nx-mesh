import React from 'react';
import { render } from '@testing-library/react';

import { CountryInfoRoute } from '../../../pages/sources/soap/country-info';

import exampleData from './country-info.json';

describe('CountryIfno', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CountryInfoRoute {...exampleData} />);

    expect(baseElement).toBeTruthy();
  });
});
