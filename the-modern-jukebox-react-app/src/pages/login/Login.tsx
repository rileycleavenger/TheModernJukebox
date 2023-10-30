import React, { useState } from 'react';
import './Login.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add your authentication logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="page">
      <div className="login-container">
        <div className="inner-login-container">
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
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
