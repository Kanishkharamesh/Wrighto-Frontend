import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';  // Import Header component
import axios from 'axios';

// Import FontAwesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token, user } = res.data;

      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      // Redirect after login
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="login-card">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="link">Forgot Password?</Link>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">Login</button>
          <div className="social-login">
            <button type="button" className="social-button">
              <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
            <button type="button" className="social-button">
              <FontAwesomeIcon icon={faFacebookF} /> Facebook
            </button>
          </div>
          <p className="signup-link">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;