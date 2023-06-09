import './Controls.css';
import { useCrosswordContext } from './CrosswordProvider';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { Overlay } from './Overlay';
import { useEffect, useState } from 'react';

const keyboardLayout = {
  'default': [
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    '123 Z X C V B N M {bksp}',
    'Rebus Draft'
  ]
};

const buttonTheme = [
  {
    class: "keyboard-backspace",
    buttons: "{bksp}"
  },
  {
    class: "keyboard-draft",
    buttons: "Draft"
  },
  {
    class: "keyboard-secondary",
    buttons: "123 {bksp} Rebus Draft"
  },
  {
    class: "keyboard-tertiary",
    buttons: "Rebus Draft"
  },
  {
    class: "keyboard-letters",
    buttons: "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M"
  }
]

export function Controls({ onSolved = () => { } }) {
  const {
    toggleDirection,
    clue,
    nextClue,
    previousClue,
    insertLetter,
    deleteCell,
    solved,
    failed,
  } = useCrosswordContext();
  const [showFailed, setShowFailed] = useState(false);
  const [showSolved, setShowSolved] = useState(false);

  useEffect(() => {
    setShowFailed(failed);
  }, [failed]);

  useEffect(() => {
    setShowSolved(solved);
    if (solved) {
      onSolved();
    }
  }, [solved]);

  const closeOverlay = () => {
    setShowFailed(false);
    setShowSolved(false);
  }

  const onKeyPress = (button) => {
    if (button === '{bksp}') {
      deleteCell();
    } else if (button === 'Draft') {
    } else if (button === 'Rebus') {
    } else if (button === '123') {
    } else {
      insertLetter(button);
    }
  }
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

        <Keyboard layout={keyboardLayout} buttonTheme={buttonTheme} onKeyReleased={onKeyPress} />
      </div>
      <Overlay visible={showSolved} header={"Bravissima!"} description={
        <div>
          Hai vinto un bacio e una cena!
          <div style={{ marginTop: 10 }}>
            😘
          </div>
        </div>
      } onHide={closeOverlay} solved>
      </Overlay>
      <Overlay visible={showFailed} header={"Che flauta!"} description={
        <div>
          I thought you loved me.
          <div style={{ marginTop: 10 }}>
            💔
          </div>
        </div>
      } onHide={closeOverlay}>
        <button className='button' onClick={closeOverlay}>
          Riprovaci va!
        </button>
      </Overlay>
    </div >
  );
}
