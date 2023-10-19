import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter';


function App() {
  return (
    <div className="App">

      <ul id = 'nav-list' className="nav-bar">
        <li className="left"><a href="/music-player">Music Player</a></li>
        <li className="left"><a href="/device-connection">Device Connection</a></li>
        <li className="left"><a href="/about">About</a></li>
        <li className="right"><a href="/login">Login</a></li>
      </ul>

      <AppRouter />
    </div>
  );
}

export default App;
