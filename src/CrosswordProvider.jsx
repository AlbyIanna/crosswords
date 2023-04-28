import { useState, useContext, useEffect } from 'react';
import { CrosswordContext } from './CrosswordContext';

const EMPTY_GRID = Array(5).fill().map(() => Array(5).fill(''));
EMPTY_GRID[0][0] = '-';
EMPTY_GRID[0][4] = '-';


export const useCrossword = (clues) => {
  const [gridLetters, setGridLetters] = useState(EMPTY_GRID);
  const [selected, setSelected] = useState({ row: 0, column: 2 });
  const [direction, setDirection] = useState('across');
  const [clue, setClue] = useState('');
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);

  // set the clue based on the selected cell and direction
  useEffect(() => {
    if (selected) {
      const { row, column } = selected;
      const clue = direction === 'across' ? clues.across[row]?.clue : clues.down[column]?.clue;
      setClue(clue);
    }
  }, [selected, direction, clues]);

  const focusCell = (row, column) => {
    // check if the cell is outside the grid or if it is a black cell
    if (row < 0 || row >= gridLetters.length || column < 0 || column >= gridLetters[0].length || gridLetters[row][column] === '-') {
      return;
    }
    setSelected({ row, column });
  }

  const handleClickCell = (row, column) => {
    if (selected.row === row && selected.column === column) {
      toggleDirection();
    }
  }

  const toggleDirection = () => {
    setDirection(direction === 'across' ? 'down' : 'across');
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
      if (gridLetters[nextCell.row][nextCell.column] === '' || isGridFull(gridLetters)) {
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
    setFailed(false);
    setSolved(false);
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

  const insertLetter = (letter) => {
    // get row and column from the selected cell
    const { row, column } = selected;
    // replace the value of the cell with the key pressed
    const newGridLetters = [...gridLetters];
    newGridLetters[row][column] = letter;
    setGridLetters(newGridLetters);
    const isOldGridFull = isGridFull(gridLetters);
    const isNewGridFull = isGridFull(newGridLetters);
    let shouldSetSolved = false;
    let shouldSetFailed = false;
    if (isNewGridFull) {
      // if the grid is full, check if the puzzle is solved
      const isSolved = checkSolution(newGridLetters, clues);
      if (isSolved) {
        shouldSetSolved = true;
      } else {
        shouldSetFailed = true;
      }
    }
    if (isOldGridFull || !isNewGridFull) {
      selectNextCell();
    }
    setSolved(shouldSetSolved);
    setFailed(shouldSetFailed);
  }

  // go the next row or column that has free cells and select the first cell of that row or column
  const nextClue = () => {
    let nextCell;
    if (direction === 'across') {
      nextCell = findFirstCell(selected.row + 1, direction);
    } else {
      nextCell = findFirstCell(selected.column + 1, direction);
    }
    // if the next row or column is outside the grid, go to the first row or column and change direction
    if (nextCell.row >= gridLetters.length || nextCell.column >= gridLetters[0].length) {
      toggleDirection();
      nextCell = findFirstCell(0, direction);
    }
    focusCell(nextCell.row, nextCell.column);
  }

  // go the previous row or column that has free cells and select the first cell of that row or column
  const previousClue = () => {
    let previousCell;
    if (direction === 'across') {
      previousCell = findFirstCell(selected.row - 1, direction);
    } else {
      previousCell = findFirstCell(selected.column - 1, direction);
    }
    // if the previous row or column is outside the grid, go to the last row or column and change direction 
    if (previousCell.row < 0 || previousCell.column < 0) {
      toggleDirection();
      previousCell = findFirstCell(0, direction);
    }
    focusCell(previousCell.row, previousCell.column);
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
    clue,
    nextClue,
    previousClue,
    failed,
    solved
  };
}

export function CrosswordProvider(props) {
  const { children, clues } = props;
  const contextValue = useCrossword(clues);

  return (
    <CrosswordContext.Provider value={contextValue}>
      {children}
    </CrosswordContext.Provider>
  );
}

export function useCrosswordContext() {
  return useContext(CrosswordContext);
}

const isGridFull = (gridLetters) => {
  return gridLetters.every(row => row.every(cell => cell !== ''));
}

// clues is an objects with the following structure:
// { across: [{ clue: 'clue', answer: 'answer' }, ...], down: [{ clue: 'clue', answer: 'answer' }, ...] }
const checkSolution = (gridLetters, clues) => {
  const gridWords = getGridWords(gridLetters);
  const words = clues.across.map(clue => clue.answer).concat(clues.down.map(clue => clue.answer));
  return gridWords.every(word => words.includes(word));
}

const getGridWords = (gridLetters) => {
  const gridWords = [];
  const acrossWords = getAcrossWords(gridLetters);
  const downWords = getDownWords(gridLetters);
  gridWords.push(...acrossWords, ...downWords);
  return gridWords;
}

const getAcrossWords = (gridLetters) => {
  const acrossWords = [];
  for (let row = 0; row < gridLetters.length; row++) {
    let word = '';
    for (let column = 0; column < gridLetters[0].length; column++) {
      if (gridLetters[row][column] !== '-') {
        word += gridLetters[row][column];
      } else {
        if (word.length > 1) {
          acrossWords.push(word);
        }
        word = '';
      }
    }
    if (word.length > 1) {
      acrossWords.push(word);
    }
  }
  return acrossWords;
}

const getDownWords = (gridLetters) => {
  const downWords = [];
  for (let column = 0; column < gridLetters[0].length; column++) {
    let word = '';
    for (let row = 0; row < gridLetters.length; row++) {
      if (gridLetters[row][column] !== '-') {
        word += gridLetters[row][column];
      } else {
        if (word.length > 1) {
          downWords.push(word);
        }
        word = '';
      }
    }
    if (word.length > 1) {
      downWords.push(word);
    }
  }
  return downWords;
}


