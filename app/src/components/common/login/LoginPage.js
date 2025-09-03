import React, { useState } from "react";
import "./login.css";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        onLogin();
        setError("");
        setUsername("");
        setPassword("");
      } else {
        setError(data.message || "Invalid username or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-box'>
          <h2>Login</h2>

          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
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
