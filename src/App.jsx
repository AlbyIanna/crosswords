import { useState } from 'react'
import './App.css'
import { Header } from './Header'
import { ReadyPage } from './ReadyPage';
import { GamePage } from './GamePage';

function App() {
  const [gameStatus, setGameStatus] = useState('initial');

  const onSolved = () => {
    setGameStatus('solved');
  }


  return (
    <div className='app'>
      <Header gameStatus={gameStatus} />
      <div className='main'>
        {gameStatus === 'initial' ?
          (
            <ReadyPage onStart={() => setGameStatus('started')} />
          ) :
          (
            <GamePage onSolved={onSolved} />
          )
        }
      </div>
    </div>
  )
}

export default App
