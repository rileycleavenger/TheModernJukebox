import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { About } from './pages/about/About';
import { MusicPlayer } from './pages/music-player/MusicPlayer';
import { DeviceConnection } from './pages/device-connection/DeviceConnection';
import { Login } from './pages/login/Login';

function AppRouter(){

    // contains all app routes

    return(   
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/device-connection" element={<DeviceConnection />} />
                <Route path="/music-player" element={<MusicPlayer />} /> 
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;