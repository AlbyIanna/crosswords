import { useState } from 'react';

const EMPTY_GRID = Array(5).fill().map(() => Array(5).fill(''));
EMPTY_GRID[0][0] = '-';
EMPTY_GRID[0][4] = '-';


export const useCrossword = (
  onFocusCell = () => { },
) => {
  const [gridLetters, setGridLetters] = useState(EMPTY_GRID);
  const [selected, setSelected] = useState({ row: 0, column: 2 });
  const [direction, setDirection] = useState('across');

  const focusCell = (row, column) => {
    // check if the cell is outside the grid or if it is a black cell
    if (row < 0 || row >= gridLetters.length || column < 0 || column >= gridLetters[0].length || gridLetters[row][column] === '-') {
      return;
    }
    setSelected({ row, column });
    onFocusCell(row, column);
  }

  const handleClickCell = (row, column) => {
    if (selected.row === row && selected.column === column) {
      toggleDirection();
    }
  }

  const toggleDirection = () => {
    setDirection(direction === 'across' ? 'down' : 'across');
  }

  const isGridFull = () => {
    return gridLetters.every(row => row.every(cell => cell !== ''));
  }

  const findFirstCell = (line, direction) => {
    let cell = { row: 0, column: 0 };
    if (direction === 'across') {
      cell.row = line;
      while (cell.column < gridLetters[0].length && gridLetters[cell.row] && gridLetters[cell.row][cell.column] === '-') {
        cell.column++;
      }
    } else {
      cell.column = line;
      while (cell.row < gridLetters.length && gridLetters[cell.row] && gridLetters[cell.row][cell.column] === '-') {
        cell.row++;
      }
    }
    return cell;
  }

  const getNextCell = (row, column) => {
    let nextCell;
    if (direction === 'across') {
      nextCell = { row, column: column + 1 };
      // if the next cell is outside the grid, go to the next row
      if (nextCell.column >= gridLetters[0].length) {
        nextCell.row++;
        nextCell.column = findFirstCell(nextCell.row, direction).column;
      }
    } else {
      nextCell = { row: row + 1, column };
      // if the next cell is outside the grid, go to the next column
      if (nextCell.row >= gridLetters.length) {
        nextCell.column++;
        nextCell.row = findFirstCell(nextCell.column, direction).row;
      }
    }

    if (nextCell.row < gridLetters.length && nextCell.column < gridLetters[0].length) {
      // if the next cell is empty or if the grid is full, return the next cell
      if (gridLetters[nextCell.row][nextCell.column] === '' || isGridFull()) {
        return nextCell;
      }
      return getNextCell(nextCell.row, nextCell.column);
    } else { // if the current cell is the last empty cell, go to the first cell and toggle direction
      toggleDirection();
      return getNextCell(0, 0);
    }
  }

  const getPreviousEmptyCell = (row, column) => {
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

  }

  const selectNextCell = () => {
    let nextCell = getNextCell(selected.row, selected.column);
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

  return {
    selected,
    direction,
    toggleDirection,
    selectNextCell,
    handleChangeCell,
    handleClickCell,
    focusCell,
    deleteCell,
    insertLetter,
    gridLetters,
  };
}


