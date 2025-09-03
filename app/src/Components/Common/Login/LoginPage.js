import React, { useState } from "react";
import "./login.css";
import loginBg from "../../../assets/images/login-bg.png"; // move your image into src/assets/images

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const correctUsername = process.env.REACT_APP_USERNAME;
    const correctPassword = process.env.REACT_APP_PASSWORD;

    if (
      username.toLowerCase() === correctUsername &&
      password === correctPassword
    ) {
      onLogin();
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className='login-page' style={{ backgroundImage: `url(${loginBg})` }}>
      <div className='login-container'>
        <div className='login-box'>
          <h2>Login</h2>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Log In</button>
          {error && <p className='error'>{error}</p>}
        </div>
        <div className='pfpage-link'>
          Official website at{" "}
          <a
            href='https://www.partyfascinations.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            www.partyfascinations.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
