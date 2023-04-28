import { useEffect, useRef } from 'react';
import './Crossword.css';
import { useCrosswordContext } from './CrosswordProvider';

export function Crossword() {
  const onFocusCell = (row, column) => {
    cellRefs.current[row * gridLetters[0].length + column].focus();
  }

  const {
    selected,
    direction,
    focusCell,
    toggleDirection,
    handleChangeCell,
    handleClickCell,
    deleteCell,
    insertLetter,
    gridLetters,
  } = useCrosswordContext();

  // create refs for each cell in the grid
  const cellRefs = useRef([]);
  useEffect(() => {
    cellRefs.current = cellRefs.current.slice(0, gridLetters.length * gridLetters[0].length);
  }, [gridLetters]);

  // on direction change, change the focus to the same cell in the new direction
  useEffect(() => {
    if (selected) {
      onFocusCell(selected.row, selected.column);
    }
  }, [direction, selected]);


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
          insertLetter(event.key.toUpperCase());
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

