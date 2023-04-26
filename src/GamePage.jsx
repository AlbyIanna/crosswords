import { Crossword } from './Crossword';
import { Controls } from './Controls';
import './GamePage.css';

const DEFINITIONS = {
  verticals: [
    {
      clue: 'A type of tree',
      answer: 'oak',
    }
  ],
  horizontals: []
}


export function GamePage() {
  return (
    <div className="game-page">
      <div className="crossword-section">
        <Crossword definitions={DEFINITIONS} />
      </div>
      <div className="controls-section">
        <Controls />
      </div>
    </div >
  );
}
