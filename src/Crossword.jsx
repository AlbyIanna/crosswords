import { useEffect, useRef, useState } from 'react';
import './Crossword.css';

const EMPTY_GRID = Array(5).fill().map(() => Array(5).fill(''));
EMPTY_GRID[0][0] = '-';
EMPTY_GRID[0][1] = '-';


export function Crossword({ definitions = { verticals: [], horizontals: [] } }) {
  const [gridLetters, setGridLetters] = useState(EMPTY_GRID);
  // create refs for each cell in the grid
  const cellRefs = useRef([]);
  useEffect(() => {
    cellRefs.current = cellRefs.current.slice(0, gridLetters.length * gridLetters[0].length);
  }, [gridLetters]);

  const [selected, setSelected] = useState({ row: 0, column: 2 });
  const [direction, setDirection] = useState('across');

  const focusCell = (row, column) => {
    // check if the cell is outside the grid or if it is a black cell
    if (row < 0 || row >= gridLetters.length || column < 0 || column >= gridLetters[0].length || gridLetters[row][column] === '-') {
      return;
    }
    setSelected({ row, column });
    cellRefs.current[row * gridLetters[0].length + column].focus();
  }

  const handleClickCell = (row, column) => {
    if (selected.row === row && selected.column === column) {
      toggleDirection();
    }
  }

  const toggleDirection = () => {
    setDirection(direction === 'across' ? 'down' : 'across');
  }

  const getNextEmptyCell = (row, column) => {
    let nextCell;
    if (direction === 'across') {
      nextCell = { row, column: column + 1 };
      // if the next cell is outside the grid, go to the next row
      if (nextCell.column >= gridLetters[0].length) {
        nextCell.row++;
        nextCell.column = 0;
      }
    } else {
      nextCell = { row: row + 1, column };
      // if the next cell is outside the grid, go to the next column
      if (nextCell.row >= gridLetters.length) {
        nextCell.row = 0;
        nextCell.column++;
      }
    }

    // if the current cell is the last empty ce ll, go to the first cell and toggle direction

    // if the next cell is empty, return it
    if (nextCell.row < gridLetters.length && nextCell.column < gridLetters[0].length) {
      if (gridLetters[nextCell.row][nextCell.column] === '') {
        return nextCell;
      }
      return getNextEmptyCell(nextCell.row, nextCell.column);
    }
    return null;



    // if the next cell is outside the grid, return the first cell

    // if (nextCell.row < gridLetters.length && nextCell.column < gridLetters[0].length) {
    //   if (gridLetters[nextCell.row][nextCell.column] === '-') {
    //     return getNextEmptyCell(nextCell.row, nextCell.column);
    //   }
    //   return nextCell;
    // }
    // return null;
  }

  const selectNextCell = () => {

    let nextCell;
    // use getNextEmptyCell to find the next empty cell
    nextCell = getNextEmptyCell(selected.row, selected.column);
    if (!nextCell) {
      // if there is no next empty cell, go to the next cell
      nextCell = { row: selected.row, column: selected.column };
      if (direction === 'across') {
        nextCell.column++;
      } else {
        nextCell.row++;
      }
    }
    if (nextCell.row < gridLetters.length && nextCell.column < gridLetters[0].length) {
      focusCell(nextCell.row, nextCell.column);

    }
  }

  const handleChangeCell = (event, row, column) => {
    const { value } = event.target;
    const newGridLetters = [...gridLetters];
    newGridLetters[row][column] = value;
    setGridLetters(newGridLetters);

    if (value !== '') {
      selectNextCell();
    }
  }

  const deleteCell = (row, column) => {
    if (gridLetters[row][column] === '') {
      let previousCell;
      if (direction === 'across') {
        previousCell = { row, column: column - 1 };
        // if the previous cell is outside the grid, go to the previous row
        if (previousCell.column < 0) {
          previousCell.row--;
          previousCell.column = gridLetters[0].length - 1;
        }
      } else {
        previousCell = { row: row - 1, column };
        // if the previous cell is outside the grid, go to the previous column
        if (previousCell.row < 0) {
          previousCell.row = gridLetters.length - 1;
          previousCell.column--;
        }
      }
      if (previousCell.row >= 0 && previousCell.column >= 0 && gridLetters[previousCell.row][previousCell.column] !== '-') {
        const newGridLetters = [...gridLetters];
        newGridLetters[previousCell.row][previousCell.column] = '';
        setGridLetters(newGridLetters);
        focusCell(previousCell.row, previousCell.column);
      }
    }
    // if the cell is not empty, clear it
    else {
      const newGridLetters = [...gridLetters];
      newGridLetters[row][column] = '';
      setGridLetters(newGridLetters);
    }
  }

  const insertLetter = (letter, row, column) => {
    // replace the value of the cell with the key pressed
    const newGridLetters = [...gridLetters];
    newGridLetters[row][column] = letter;
    setGridLetters(newGridLetters);
    selectNextCell();
  }

  const handleKeyDown = (event, row, column) => {
    switch (event.code) {
      case 'ArrowUp':
        focusCell(row - 1, column);
        break;
      case 'ArrowDown':
        focusCell(row + 1, column);
        break;
      case 'ArrowRight':
        focusCell(row, column + 1);
        break;
      case 'ArrowLeft':
        focusCell(row, column - 1);
        break;
      case 'Space':
        event.preventDefault();
        event.stopPropagation();
        toggleDirection();
        break;
      case 'Backspace':
        event.stopPropagation();
        deleteCell(row, column);
        break;
      default:
        event.stopPropagation();
        event.preventDefault();
        // if the key pressed is a letter
        if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
          insertLetter(event.key.toUpperCase(), row, column);
        }
        break;
    }
  }

  return <div className="crossword">
    <div className="grid">
      {
        gridLetters.map((row, rowIndex) => {
          return row.map((cell, columnIndex) => {
            const selectedLine = direction === 'across' ? rowIndex === selected.row : columnIndex === selected.column;;
            const selectedCell = rowIndex === selected.row && columnIndex === selected.column;
            const blackCell = cell === '-';
            return <div key={`${rowIndex}-${columnIndex}`}
              className={`cell${selectedCell ? ' selected-cell' : ''}${selectedLine ? ' selected-line' : ''}${blackCell ? ' black-cell' : ''}
              `}>
              {blackCell ? '' :
                <input value={cell} maxLength="1" ref={el => cellRefs.current[rowIndex * gridLetters[0].length + columnIndex] = el}
                  onMouseDown={() => handleClickCell(rowIndex, columnIndex)}
                  onFocus={() => focusCell(rowIndex, columnIndex)}
                  onChange={(event) => handleChangeCell(event, rowIndex, columnIndex)}
                  onKeyDown={(event) => handleKeyDown(event, rowIndex, columnIndex)}
                />
              }
            </div>
          })
        })
      }
    </div>
  </div>
}

