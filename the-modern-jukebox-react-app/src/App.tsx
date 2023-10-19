import './App.css';
import AppRouter from './AppRouter';
import './variables.css'

function App() {

  // function used to made button bold if on the current page
  const isButtonBold = (path: string) => {
    return window.location.pathname === path;
  }

  return (
    <div className="App">

      <div className="navbar-container">
      <ul id="nav-list" className="nav-bar">
        <li className={`left ${isButtonBold('/music-player') ? 'bold' : ''}`}>
          <a href="/music-player">Music Player</a>
        </li>
        <li className={`left ${isButtonBold('/device-connection') ? 'bold' : ''}`}>
          <a href="/device-connection">Device Connection</a>
        </li>
        <li className={`left ${isButtonBold('/about') ? 'bold' : ''}`}>
          <a href="/about">About</a>
        </li>
        <li className={`right ${isButtonBold('/login') ? 'bold' : ''}`}>
          <a href="/login">Login</a>
        </li>
      </ul>
      </div>

      <div className="page-content">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
