import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages/index';

import exampleData from './example.json';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index {...exampleData} />);

    expect(baseElement).toBeTruthy();
  });
});
