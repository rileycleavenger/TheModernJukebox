import React, { useEffect, useState } from 'react';
import './variables.css'
import Navbar from './pages/navbar';
import { SelectedPage } from './assets/variables/availablepages';
import MusicPlayer from './pages/musicPlayer';
import About from './pages/about';
import ConnectDevice from './pages/connectDevice';
import Home from './pages/home';
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
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setSelectedPage(SelectedPage.Home);
      }
      setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home)
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  return (
    <div className="App bg-gray-50">
      <Navbar 
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home setSelectedPage={setSelectedPage} />
      <ConnectDevice setSelectedPage={setSelectedPage} />
      <MusicPlayer setSelectedPage={setSelectedPage} />
      <About setSelectedPage={setSelectedPage} />
      {/*
      <DeviceConnection setSelectedPage={setSelectedPage} />
      <MusicPlayer setSelectedPage={setSelectedPage} />
      <About setSelectedPage={setSelectedPage} />
      */}
    </div>
  );
}

export default App;
