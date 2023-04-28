import { Crossword } from './Crossword';
import { Controls } from './Controls';
import { CrosswordProvider } from './CrosswordProvider';
import './GamePage.css';

const CLUES = {
  down: [
    {
      clue: 'A type of tree',
      answer: 'oak',
    },
    {
      clue: 'Another type of tree',
      answer: 'elm',
    },
    {
      clue: 'A third type of tree',
      answer: 'ash',
    },
    {
      clue: 'An animal that lives in trees',
      answer: 'squirrel',
    },
    {
      clue: 'A flower that grows on trees',
      answer: 'cherry',
    },
  ],
  across: [
    {
      clue: 'A city in California',
      answer: 'oakland',
    },
    {
      clue: 'A city in Florida',
      answer: 'orlando',
    },
    {
      clue: 'A mountain in Colorado',
      answer: 'eldora',
    },
    {
      clue: 'A river in New York',
      answer: 'allegheny',
    },
    {
      clue: 'A lake in Michigan',
      answer: 'erie',
    },
  ]
}


export function GamePage() {
  return (
    <CrosswordProvider clues={CLUES}>
      <div className="game-page">
        <div className="crossword-section">
          <Crossword />
        </div>
        <div className="controls-section">
          <Controls />
        </div>
      </div >
    </CrosswordProvider>
  );
}
