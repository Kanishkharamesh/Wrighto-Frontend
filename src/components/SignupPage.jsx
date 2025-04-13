import React, { useState } from 'react';
import './SignupPage.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false); // DARK MODE STATE
  const [language, setLanguage] = useState('English');

  const toggleDarkMode = () => setDarkMode(!darkMode); // TOGGLE FUNCTION

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/signup', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className={`signup-container ${darkMode ? 'dark-mode' : ''}`}>  {/* APPLY DARK MODE CLASS */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="signup-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password-signup"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
          <div className="social-login">
            <button type="button" className="social-button">
              <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
            <button type="button" className="social-button">
              <FontAwesomeIcon icon={faFacebookF} /> Facebook
            </button>
          </div>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;