import { Crossword } from './Crossword';
import { Controls } from './Controls';
import { CrosswordProvider } from './CrosswordProvider';
import './GamePage.css';

const CLUES = {
  down: [
    {
      clue: 'A type of tree',
      answer: 'AAAA',
    },
    {
      clue: 'Another type of tree',
      answer: 'AAAAA',
    },
    {
      clue: 'A third type of tree',
      answer: 'AAAAA',
    },
    {
      clue: 'An animal that lives in trees',
      answer: 'AAAAA',
    },
    {
      clue: 'A flower that grows on trees',
      answer: 'AAAA',
    },
  ],
  across: [
    {
      clue: 'A city in California',
      answer: 'AAA',
    },
    {
      clue: 'A city in Florida',
      answer: 'AAAAA',
    },
    {
      clue: 'A mountain in Colorado',
      answer: 'AAAAA',
    },
    {
      clue: 'A river in New York',
      answer: 'AAAAA',
    },
    {
      clue: 'A lake in Michigan',
      answer: 'AAAAA',
    },
  ]
}


export function GamePage({ onSolved }) {
  return (
    <CrosswordProvider clues={CLUES}>
      <div className="game-page">
        <div className="crossword-section">
          <Crossword />
        </div>
        <div className="controls-section">
          <Controls onSolved={onSolved} />
        </div>
      </div >
    </CrosswordProvider>
  );
}
