import { render } from '@testing-library/react';

import ComponentA from './component-a';

describe('ComponentA', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentA />);
    expect(baseElement).toBeTruthy();
  });
});
