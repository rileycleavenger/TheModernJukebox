import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter';


function App() {
  return (
    <div className="App">

      <div className="navbar-container">
        <ul id = 'nav-list' className="nav-bar">
          <li className="left"><a href="/music-player">Music Player</a></li>
          <li className="left"><a href="/device-connection">Device Connection</a></li>
          <li className="left"><a href="/about">About</a></li>
          <li className="right"><a href="/login">Login</a></li>
        </ul>
      </div>

      <div className="page-content">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
