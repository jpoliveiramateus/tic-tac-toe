import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const ALL_HOUSES = 8;

describe('test game tic-tac-toe two players', () => {
  it('all houses start empty', () => {
    render(<App />);

    for(let i = 0; i <= ALL_HOUSES; i += 1) {
      expect(screen.getByTestId(`square ${i}`)).toHaveTextContent('');
    }
  });

  it('is not possible to select an already marked house', () => {
    render(<App />);

    expect(screen.getByTestId('square 0')).toHaveTextContent('');
    userEvent.click(screen.getByTestId('square 0'));
    expect(screen.getByTestId('square 0')).toHaveTextContent('X');

    userEvent.click(screen.getByTestId('square 0'));
    expect(screen.getByTestId('square 0')).toHaveTextContent('X');
  });

  it('point is scored when player 1 wins and highlights the line', () => {
    render(<App />);

    expect(screen.getByTestId('points-p1')).toHaveTextContent('0');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    for(let i = 0; i <= ALL_HOUSES; i += 1) {
      expect(screen.getByTestId(`square ${i}`)).toHaveStyle('color: white');
    }

    userEvent.click(screen.getByTestId('square 0'));
    userEvent.click(screen.getByTestId('square 1'));
    userEvent.click(screen.getByTestId('square 3'));
    userEvent.click(screen.getByTestId('square 4'));
    userEvent.click(screen.getByTestId('square 6'));

    expect(screen.getByTestId(`square 0`)).toHaveStyle('color: white');
    expect(screen.getByTestId(`square 1`)).toHaveStyle('color: gray');
    expect(screen.getByTestId(`square 3`)).toHaveStyle('color: white');
    expect(screen.getByTestId(`square 4`)).toHaveStyle('color: gray');
    expect(screen.getByTestId(`square 6`)).toHaveStyle('color: white');

    expect(screen.getByTestId('points-p1')).toHaveTextContent('1');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');
  });

  it('point is scored when player 2 wins', () => {
    render(<App />);

    expect(screen.getByTestId('points-p1')).toHaveTextContent('0');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0'));
    userEvent.click(screen.getByTestId('square 1'));
    userEvent.click(screen.getByTestId('square 3'));
    userEvent.click(screen.getByTestId('square 4'));
    userEvent.click(screen.getByTestId('square 8'));
    userEvent.click(screen.getByTestId('square 7'));

    expect(screen.getByTestId('points-p1')).toHaveTextContent('0');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('1');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');
  });

  it('point is scored in the tie and all squares are gray', () => {
    render(<App />);

    expect(screen.getByTestId('points-p1')).toHaveTextContent('0');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    for(let i = 0; i <= ALL_HOUSES; i += 1) {
      expect(screen.getByTestId(`square ${i}`)).toHaveStyle('color: white');
    }

    const draw = [0, 1, 3, 4, 7, 6, 2, 5, 8];
    draw.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });

    for(let i = 0; i <= ALL_HOUSES; i += 1) {
      expect(screen.getByTestId(`square ${i}`)).toHaveStyle('color: gray');
    }

    expect(screen.getByTestId('points-p1')).toHaveTextContent('0');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('1');
  });

  it('is possible to reset the game', () => {
    render(<App />);

    expect(screen.getByTestId('points-p1')).toHaveTextContent('0');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0'));
    userEvent.click(screen.getByTestId('square 1'));
    userEvent.click(screen.getByTestId('square 3'));
    userEvent.click(screen.getByTestId('square 4'));
    userEvent.click(screen.getByTestId('square 6'));

    expect(screen.getByTestId('points-p1')).toHaveTextContent('1');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0')); // reset

    userEvent.click(screen.getByTestId('square 0'));
    userEvent.click(screen.getByTestId('square 1'));
    userEvent.click(screen.getByTestId('square 3'));
    userEvent.click(screen.getByTestId('square 4'));
    userEvent.click(screen.getByTestId('square 6'));

    expect(screen.getByTestId('points-p1')).toHaveTextContent('1');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('1');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');
  });

  const possible1 = [0, 3, 1, 4, 2]; // first line horizontally
  const possible2 = [3, 0, 4, 1, 5]; // second line horizontally
  const possible3 = [6, 3, 7, 4, 8]; // third line horizontally
  const possible4 = [0, 1, 3, 4, 6]; // first line vertically
  const possible5 = [1, 0, 4, 3, 7]; // second line vertically
  const possible6 = [2, 1, 5, 4, 8]; // third line vertically
  const possible7 = [0, 1, 4, 2, 8]; // diagonally 
  const possible8 = [2, 1, 4, 0, 6]; // diagonally

  it('every chance to win' ,() => {
    render(<App />);

    expect(screen.getByTestId('points-p1')).toHaveTextContent('0');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    possible1.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });
    expect(screen.getByTestId('points-p1')).toHaveTextContent('1');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0')); // reset

    possible2.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });
    expect(screen.getByTestId('points-p1')).toHaveTextContent('1');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('1');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0')); // reset

    possible3.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });
    expect(screen.getByTestId('points-p1')).toHaveTextContent('2');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('1');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0')); // reset

    possible4.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });
    expect(screen.getByTestId('points-p1')).toHaveTextContent('2');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('2');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0')); // reset

    possible5.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });
    expect(screen.getByTestId('points-p1')).toHaveTextContent('3');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('2');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0')); // reset

    possible6.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });
    expect(screen.getByTestId('points-p1')).toHaveTextContent('3');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('3');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0')); // reset

    possible7.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });
    expect(screen.getByTestId('points-p1')).toHaveTextContent('4');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('3');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('square 0')); // reset

    possible8.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });
    expect(screen.getByTestId('points-p1')).toHaveTextContent('4');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('4');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');
  });

  it('is possible to win on the last move' , () => {
    render(<App />);
    expect(screen.getByTestId('points-p1')).toHaveTextContent('0');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');

    for(let i = 0; i <= ALL_HOUSES; i += 1) {
      expect(screen.getByTestId(`square ${i}`)).toHaveStyle('color: white');
    }

    const winOnTheLastMove = [0, 1, 3, 4, 7, 2, 5, 8, 6];
    winOnTheLastMove.forEach((index) => {
      userEvent.click(screen.getByTestId(`square ${index}`));
    });

    expect(screen.getByTestId(`square 0`)).toHaveStyle('color: white');
    expect(screen.getByTestId(`square 1`)).toHaveStyle('color: gray');
    expect(screen.getByTestId(`square 2`)).toHaveStyle('color: gray');
    expect(screen.getByTestId(`square 3`)).toHaveStyle('color: white');
    expect(screen.getByTestId(`square 4`)).toHaveStyle('color: gray');
    expect(screen.getByTestId(`square 5`)).toHaveStyle('color: gray');
    expect(screen.getByTestId(`square 6`)).toHaveStyle('color: white');
    expect(screen.getByTestId(`square 7`)).toHaveStyle('color: gray');
    expect(screen.getByTestId(`square 8`)).toHaveStyle('color: gray');

    expect(screen.getByTestId('points-p1')).toHaveTextContent('1');
    expect(screen.getByTestId('points-p2')).toHaveTextContent('0');
    expect(screen.getByTestId('points-tie')).toHaveTextContent('0');
  });
});
