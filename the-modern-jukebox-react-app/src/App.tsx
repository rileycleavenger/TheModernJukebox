import React, { useEffect, useState } from 'react';
import './variables.css'
import Navbar from './pages/navbar';
import { SelectedPage } from './assets/variables/availablepages';
import MusicPlayer from './pages/musicPlayer';
import About from './pages/about';
import ConnectDevice from './pages/connectDevice';
import Home from './pages/home';
import Queue from './pages/queue';
function App() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setSelectedPage(SelectedPage.Home);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home)
  return (
    <div className="App bg-primary-100">
      <Navbar 
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home setSelectedPage={setSelectedPage} />
      <ConnectDevice setSelectedPage={setSelectedPage} />
      <MusicPlayer setSelectedPage={setSelectedPage} />
      <Queue setSelectedPage={setSelectedPage} />
      <About setSelectedPage={setSelectedPage} />
    </div>
  );
}

export default App;
