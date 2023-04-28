import { Crossword } from './Crossword';
import { Controls } from './Controls';
import { CrosswordProvider } from './CrosswordProvider';
import './GamePage.css';

const CLUES = {
  down: [
    {
      clue: '-',
      answer: 'B',
    },
    {
      clue: 'In Italy, you eat it almost every day',
      answer: 'PASTA',
    },
    {
      clue: 'NÃO in UK',
      answer: 'NO',
    },
    {
      clue: 'Some random noise',
      answer: 'GU',
    },
    {
      clue: 'Pee without Es',
      answer: 'P',
    },
  ],
  across: [
    {
      clue: 'Pee without Es',
      answer: 'P',
    },
    {
      clue: 'What we\'re probably going to do when we get home',
      answer: 'BANG',
    },
    {
      clue: 'What risotto is, basically',
      answer: 'SOUP',
    },
    {
      clue: '-',
      answer: 'T',
    },
    {
      clue: '-',
      answer: 'A',
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
