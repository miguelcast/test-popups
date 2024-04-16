import { render, fireEvent, screen } from '@testing-library/react';

import Board from './Board';
import { memo } from 'react';
import { Containers } from '../../types/board.d';

const ComponentA = memo(() => <h1>H1 Board Test A</h1>);

const ComponentB = memo(() => <h1>H1 Board Test B</h1>);

const containersMock: Containers = [
  {
    id: `A`,
    name: 'A',
    Content: ComponentA,
    position: { row: 0, col: 0 },
  },
  {
    id: `B`,
    name: 'B',
    Content: ComponentB,
    position: { row: 1, col: 0 },
  },
];

describe('Board', () => {
  it('should render successfully', async () => {
    render(<Board containersConfig={containersMock} />);
    screen.getByText('Add(A)');
  });

  it('should add popups', async () => {
    render(<Board containersConfig={containersMock} />);

    const addButtonA = screen.getByText('Add(A)');
    fireEvent.click(addButtonA);

    await screen.findByText('H1 Board Test A');
  });

  it('should close a popup', async () => {
    render(<Board containersConfig={containersMock} />);

    const addButtonA = screen.getByText('Add(A)');
    fireEvent.click(addButtonA);

    await screen.findByText('H1 Board Test A');

    const closeButton = screen.getByLabelText('Close Popup button');
    fireEvent.click(closeButton);

    const containersContent = screen.queryAllByText('H1 Board Test A');
    expect(containersContent).toHaveLength(0);
  });
});
