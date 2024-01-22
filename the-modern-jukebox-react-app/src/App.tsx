import React, { useEffect, useState } from 'react';
import './variables.css'
import Navbar from './pages/navbar';
import MusicPlayer from './pages/musicPlayer';
import About from './pages/about';
import Home from './pages/home';
import Queue from './pages/queue';
import useMediaQuery from './hooks/useMediaQuery';
import { SelectedPage } from './assets/variables/availablepages';
function App() {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home)
  const isButtonBold = (path: string) => {
    return window.location.pathname === path;
  }
  useEffect(() => {
    if (window.scrollY === 0) {
       setSelectedPage(SelectedPage.Home);
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  }


  return (
    <div className="App bg-primary-100">
    <div className="App bg-primary-100">
      <Navbar 
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home setSelectedPage={setSelectedPage} />
      <MusicPlayer setSelectedPage={setSelectedPage} />
      <Queue setSelectedPage={setSelectedPage} />
      <About setSelectedPage={setSelectedPage} />
    </div>
  </div>
  );
}

export default App;
