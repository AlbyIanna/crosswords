import miniLogo from './assets/mini-logo.svg';
import './ReadyPage.css';

export function ReadyPage({ onStart = () => { } }) {
  return (
    <div className='ready-page'>
      <img src={miniLogo} className="mini-logo" alt="Mini logo" />
      <div className='title'>
        The Mini Crossword
      </div>
      <div className='subtitle'>
        Ready to start solving?
      </div>
      <button className='button' onClick={onStart}>Play</button>
      <div className='date'>Friday, April 21, 2023</div>
      <div className='byMe'>By A. I.</div>
    </div>
  )
}
