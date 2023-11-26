import {useEffect, useState} from 'react';
import './LoginForm.css'
import SpotiftyLogo from '../../../../assets/images/spotify_logo.svg'; 
import AppleMusicLogo from '../../../../assets/images/applemusic_logo.svg'; 
import { loginURL } from '../../../../hooks/spotify';
import React from 'react';

const LoginForm: React.FC = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState("");
  //export currentToken = token;
  useEffect(()=>{
    const hash:string = window.location.hash
    let token = window.sessionStorage.getItem("token")
    if(!token && hash){
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1] ?? ""
        window.location.hash = ""
        sessionStorage.setItem("token",token)
        setToken(token)
        console.log("token",token)
    }
},[])
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleButtonToggle = (button: string) => {
    setSelectedService((prevSelected) => (prevSelected === button ? null : button));
  };

  const handleLogin = () => {
    // Can handle login here based on apple or spotify
    console.log('Selected Service:', selectedService);
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const isAppleSelected = selectedService === 'apple';
  const isSpotifySelected = selectedService === 'spotify';

  return (
    <div className="page">
      <div className="login-container">
        <div className="inner-login-container">
          <div className="apple-and-spotify">
            <button
              type="button"
              className={`apple ${isAppleSelected ? 'selected' : ''}`}
              onClick={() => handleButtonToggle('apple')}
            >
              <img src={AppleMusicLogo} alt="Apple" />
            </button>
            <button
              type="button"
              className={`spotify ${isSpotifySelected ? 'selected' : ''}`}
              onClick={() => {
                handleButtonToggle('spotify');
                window.location.href = loginURL;
              }}
            >
              <img src={SpotiftyLogo} alt="Spotify" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;