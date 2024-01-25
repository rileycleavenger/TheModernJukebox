import React, { useEffect, useState } from 'react';
import Navbar from './pages/navbar';
import MusicPlayer from './pages/musicPlayer';
import About from './pages/about';
import Home from './pages/home';
import Queue from './pages/queue';
import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="relative flex  bg-primary-100">
    <Navbar />
    <BrowserRouter>
    <Routes>
      <Route
       path =""
       element={<Home/>}
       />
      <Route
        path="home"
        element={<Home />} 
      />
      <Route
        path="musicplayer"
        element={<MusicPlayer />}
      />
      <Route
        path="queue"
        element={<Queue />}
      />
      <Route
        path="about"
        element={<About />}
      />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
