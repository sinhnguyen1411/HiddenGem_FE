import React, { useState } from 'react';
import './Login.css';
import { useAuth, useLoading } from '../../components';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  let navigate = useNavigate();
  const {loading, login} = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
    
    try {
      showLoading('Signing in...');
      const res = await login({email, password});
      console.log('Login successful:', res);
      if (res.user) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      hideLoading();
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <h1 className="login-title">
          Login
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email/Mobile Field */}
          <div className="login-field">
            <input
              type="email"
              placeholder="Email or mobile phone number"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>

          {/* Password Field */}
          <div className="login-field">
            <div className="login-password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="login-input password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="login-forgot-password">
            <a href="#">
              Forgot Password
            </a>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            Login
          </button>
        </form>

        {/* Terms Agreement */}
        <p className="login-terms">
          By continuing, you agree to Nicobar{' '}
          <a href="#">
            Conditions of Use
          </a>{' '}
          and{' '}
          <a href="#">
            Privacy Notice
          </a>
          .
        </p>

        {/* Create Account Button */}
        <button
          type="button"
          className="login-create-account"
          onClick={goToRegister}
        >
          Create account
        </button>
      </div>
    </div>
  );
};

export default Login; 