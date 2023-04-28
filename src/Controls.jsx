import './Controls.css';
import { useCrosswordContext } from './CrosswordProvider';

export function Controls() {
  const { toggleDirection, clue, nextClue, previousClue } = useCrosswordContext();
  return (
    <div className="controls">
      <div className="cluebar">
        <button className="arrow-left" onClick={previousClue}>
          <i className="cluebar-arrow" />
        </button>
        <button className="clue" onClick={toggleDirection}>{clue}</button>
        <button className="arrow-right" onClick={nextClue}>
          <i className="cluebar-arrow" />
        </button>
      </div>
      <div className="keyboard">
        keyboard
      </div>
    </div>
  );
}
