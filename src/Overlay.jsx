import { Dialog } from 'primereact/dialog';
import 'primereact/resources/primereact.css';                       // core css
import './Overlay.css';
import image from './assets/mini-progress-blue-star.svg'


export function Overlay({ children, onHide, visible, header, description, solved }) {

  return (
    <Dialog className={`overlay${solved ? " solved" : ""}`} visible={visible} position='bottom' onHide={onHide} maskStyle={{
      backgroundColor: 'rgba(250, 250, 250, 0.86)',
    }} contentStyle={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="overlay-wrapper">
        {solved && <button className="overlay-back-to-puzzle" onClick={onHide}>Back to puzzle</button>}
        {solved && <img src={image} className="overlay-image" alt="winning star" />}
        <h1 className="overlay-header">
          {header}
        </h1>
        <div className="overlay-description">
          {/* {minutes && seconds ? <div>You solved it in <b>{minutes}, {seconds}</b></div> : null} */}
          {description}
        </div>
        <div className="overlay-content">
          {children}
        </div>
      </div>
    </Dialog >
  )
}
