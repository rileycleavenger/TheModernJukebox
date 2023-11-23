import React, {useEffect} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import About from './pages/about/About';
import MusicPlayer from './pages/music-player/MusicPlayer';
import DeviceConnection from './pages/device-connection/DeviceConnection';
import Login from './pages/login/Login';
import Queue from './pages/queue/Queue';

function AppRouter(){

    // contains all app routes
    return(   
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/about' />} /> /* redirects to the about page by default */
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/device-connection" element={<DeviceConnection />} />
                <Route path="/music-player" element={<MusicPlayer />} /> 
                <Route path="/queue" element={<Queue />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;