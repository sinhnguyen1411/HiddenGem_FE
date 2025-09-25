import React, { useState } from 'react';
import './Register.css';
import { useAuth, useLoading } from '../../components';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const {loading, register} = useAuth();
  const { showLoading, hideLoading } = useLoading();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt with:', { name, mobile, email, password });
    
    try {
      showLoading('Creating your account...');
      const res = await register({email, password, username: email, full_name: name, phone_number: mobile});
      console.log('Registration successful:', res);
      if (res.user_id) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <h1 className="register-title">
          Sign up
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Name Field */}
          <div className="register-field">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="register-input"
            />
          </div>

          {/* Mobile Number Field */}
          <div className="register-field">
            <input
              type="tel"
              placeholder="Mobile number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              required
              className="register-input"
            />
          </div>

          {/* Email Field */}
          <div className="register-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="register-input"
            />
          </div>

          {/* Password Field */}
          <div className="register-field">
            <div className="register-password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="register-input password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="register-password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="register-button"
            disabled={loading}
            >
            Continue
          </button>
        </form>

        {/* Already have an account link */}
        <p className="register-signin-link">
          Already have an account?{' '}
          <a href="#">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register; 