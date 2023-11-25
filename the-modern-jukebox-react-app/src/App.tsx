import React, { useState } from 'react';
import AppRouter from './AppRouter';
import './variables.css'
import Navbar from './pages/navbar';
import { SelectedPage } from './assets/variables/availablepages';
import MusicPlayer from './pages/music-player/MusicPlayer';
import About from './pages/about';
import ConnectDevice from './pages/connectDevice';
function App() {
{/*
  // function used to made button bold if on the current page
  const isButtonBold = (path: string) => {
    return window.location.pathname === path;
  }

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  }
*/}

  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.LandingPage)
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  return (
    <div className="App bg-gray-50">
      <Navbar 
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <About setSelectedPage={setSelectedPage} />
      <ConnectDevice setSelectedPage={setSelectedPage} />
      {/*
      <DeviceConnection setSelectedPage={setSelectedPage} />
      <MusicPlayer setSelectedPage={setSelectedPage} />
      <About setSelectedPage={setSelectedPage} />
      */}
    </div>
  );
}

export default App;
