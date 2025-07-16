import React, { useState } from "react";
import "./login.css"; // New separate CSS for login

function LoginPage({ onLogin }) {
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // Dummy logic — replace with server verification later
    if (username.toLowerCase() === "admin" && password === "1234") {
      onLogin();
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-box'>
          <h2>{isNewUser ? "Create Account" : "Login"}</h2>

          <input
            type='text'
            placeholder={isNewUser ? "New Username" : "Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder={isNewUser ? "New Password" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSubmit}>
            {isNewUser ? "Register & Enter" : "Log In"}
          </button>

          <p className='new-user-wrapper'>
            {isNewUser ? "Already have an account?" : "New user?"}{" "}
            <span
              className='link'
              onClick={() => {
                setIsNewUser(!isNewUser);
                setError("");
              }}
            >
              {isNewUser ? "Log In" : "Create an account"}
            </span>
          </p>

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
