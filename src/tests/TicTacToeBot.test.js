import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const ALL_HOUSES = 8;

describe('test game tic-tac-toe one player', () => {
  it('all houses start empty', () => {
    render(<App />);

    userEvent.click(screen.getByTestId('player'));

    for(let i = 0; i <= ALL_HOUSES; i += 1) {
      expect(screen.getByTestId(`square ${i}`)).toHaveTextContent('');
    }
  });

  it('bot makes the first move after 500 milliseconds', async () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    // https://jestjs.io/pt-BR/docs/timer-mocks
    
    render(<App/>);
    
    expect(screen.getByTestId('player')).toHaveTextContent('2P');
    userEvent.click(screen.getByTestId('player'));
    expect(screen.getByTestId('player')).toHaveTextContent('1P');

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);

    await waitFor(() => {
      expect(screen.getByText('O')).toBeInTheDocument();
    });

    // all houses empty  
    userEvent.click(screen.getAllByRole('empty')[0]);
    expect(screen.getByText('X')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText('O')).toHaveLength(2);
    });

    userEvent.click(screen.getAllByRole('empty')[0]);
    await waitFor(() => {
      expect(screen.getAllByText('O')).toHaveLength(3);
    });

    userEvent.click(screen.getByTestId('player'));
    expect(screen.getByTestId('player')).toHaveTextContent('2P');
  });
});
