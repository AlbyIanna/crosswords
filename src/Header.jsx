
import './Header.css';
import { Overlay } from './Overlay';
import logo from './assets/nyt.svg'
import { useState } from 'react';

export function Header() {
  const [paused, setPaused] = useState(false);

  const unpause = () => {
    setPaused(false);
  }

  return <header className="header">
    <div className='container'>
      <button onClick={() => setPaused(true)}>pause</button>
      <img src={logo} className="logo" alt="New York Times logo" />
    </div>
    <Overlay visible={paused} onHide={unpause} header={"Your game is paused."} description={"Ready to play?"}>
      <button className='button' onClick={unpause}>
        Continue
      </button>
    </Overlay>
  </header>
}
