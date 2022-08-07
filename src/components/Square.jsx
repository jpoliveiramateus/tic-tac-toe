import React from 'react';

function Square({ index, square, handleClick }) {
  return (
    <div
      className={ `square ${index}` }
      onClick={ () => handleClick(index, square) }
      data-testid={ `square ${index}` }
    >
      {square}
    </div>
  );
}

export default Square;