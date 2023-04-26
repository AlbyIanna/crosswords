
import './Header.css';
import logo from './assets/nyt.svg'

export function Header() {
  return <header className="header">
    <div className='container'>
      <img src={logo} className="logo" alt="New York Times logo" />
    </div>
  </header>
}
