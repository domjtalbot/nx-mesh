import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Index
        listFeaturedQuestions={{
          items: [
            {
              questionId: 1,
              title: 'A',
            },
            {
              questionId: 2,
              title: 'B',
            },
          ],
        }}
      />
    );

    expect(baseElement).toBeTruthy();
  });
});
