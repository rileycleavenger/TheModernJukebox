import {useEffect, useState} from 'react';
import './LoginForm.css'
import SpotiftyLogo from '../../../../assets/images/spotify_logo.svg'; 
import AppleMusicLogo from '../../../../assets/images/applemusic_logo.svg'; 
import { loginURL } from '../../../../hooks/spotify';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState("");
  useEffect(()=>{
    const hash:string = window.location.hash
    let token = window.localStorage.getItem("token")
    if(!token && hash){
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1] ?? ""
        window.location.hash = ""
        window.localStorage.setItem("token",token)
        setToken(token)
    }
    console.log("token",token)
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
              onClick={() => handleButtonToggle('spotify')}
            >
              <img src={SpotiftyLogo} alt="Spotify" />
            </button>
          </div>
          <form>
            <div className="username-and-pass">
              <div>
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="signIn">
              <div>
                <a href={loginURL} id="signIn">
                  Login with Spotify
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;