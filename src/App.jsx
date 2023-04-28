import { useState } from 'react'
import './App.css'
import { Header } from './Header'
import { ReadyPage } from './ReadyPage';
import { GamePage } from './GamePage';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className='app'>
      <Header gameStatus={started ? 'started' : 'initial'} />
      <div className='main'>
        {
          started ?
            (
              <GamePage />
            )
            :
            (
              <ReadyPage onStart={() => setStarted(true)} />
            )
        }
      </div>
    </div>
  )
}

export default App
