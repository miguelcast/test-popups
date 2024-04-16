import { render } from '@testing-library/react';

import ComponentB from './component-b';

describe('ComponentB', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentB />);
    expect(baseElement).toBeTruthy();
  });
});
