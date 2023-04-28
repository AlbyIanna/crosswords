
import './Header.css';
import { Overlay } from './Overlay';
import logo from './assets/nyt.svg'
import { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

export function Header({ gameStatus }) {
  const {
    seconds,
    minutes,
    start,
    pause,
  } = useStopwatch({ autoStart: false });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (gameStatus === 'started') {
      start();
    }
    if (gameStatus === 'solved') {
      pauseTimer();
    }
  }, [gameStatus]);

  const pauseTimer = () => {
    setPaused(true);
    pause();
  }

  const unpause = () => {
    setPaused(false);
    start();
  }

  return <header className="header">
    <button type="button" aria-label="Navigation menu button" aria-haspopup="true" aria-expanded="false" className="pz-nav__hamburger-helper pz-nav__hamburger pz-nav__hamburger-squeeze" id="js-nav-burger">
      <span className="pz-nav__hamburger-box">
        <span className="pz-nav__hamburger-inner">
        </span>
      </span>
    </button>
    {gameStatus === 'initial' ?
      <>
        <img src={logo} className="logo" alt="New York Times logo" />
        <div className='empty-space-45'></div>
      </> :
      <>
        <div className='timer'>
          <button onClick={pauseTimer} className='timer-button'>
            <div className='timer-digits'>
              <span>{minutes}</span>:<span>{seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}</span>
            </div>
            {gameStatus !== 'solved' && <i className='timer-button-icon'></i>}
          </button>
        </div>
        <div className='other-buttons'>
          <button className='button-icon'><i className='information'></i></button>
          <button className='button-icon'><i className='lifesaver'></i></button>
          <button className='button-icon'><i className='settings'></i></button>
        </div>
      </>
    }
    <Overlay visible={paused && gameStatus !== 'solved'} onHide={unpause} header={"Your game is paused."} description={"Ready to play?"}>
      <button className='button' onClick={unpause}>
        Continue
      </button>
    </Overlay>
  </header >
}
