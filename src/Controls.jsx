import './Controls.css';
import { useCrossword, useCrosswordContext } from './CrosswordProvider';

export function Controls({
  clue = 'A type of tree',
  nextClue = () => { },
  previousClue = () => { },
}) {
  const { toggleDirection } = useCrosswordContext();
  return (
    <div className="controls">
      <div className="cluebar">
        <button className="arrow-left">
          <i className="cluebar-arrow" />
        </button>
        <button className="clue" onClick={toggleDirection}>{clue}</button>
        <button className="arrow-right">
          <i className="cluebar-arrow" />
        </button>
      </div>
      <div className="keyboard">
        keyboard
      </div>
    </div>
  );
}
