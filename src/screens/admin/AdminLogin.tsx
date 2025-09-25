import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input } from '../../components';
import './AdminLogin.css';
import { useAuth } from '../../components/AuthProvider';

interface AdminLoginProps {
  className?: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { login, loading, error, setUser, isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (localError) setLocalError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const res = await login({ email: formData.email, password: formData.password });
      console.log(res)
      if (!res?.user || res.user.role === 'customer') {
        setUser(null);
        setLocalError('You do not have admin permissions.');
        return;
      }
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setLocalError(err?.data?.message || err?.message || 'Login failed');
    }
  };

  return (
    <div className={`admin-login ${className}`}>
      <div className="admin-login__container">
        <div className="admin-login__card">
          <div className="admin-login__header">
            <div className="admin-login__logo">
              <div className="admin-login__logo-icon">☕</div>
              <Title level="h1" size="lg" color="primary" className="admin-login__logo-text">
                Hidden Gems
              </Title>
            </div>
            <Text variant="p" size="md" color="secondary" className="admin-login__subtitle">
              Admin Portal
            </Text>
          </div>

          <form className="admin-login__form" onSubmit={handleSubmit}>
            <div className="admin-login__form-header">
              <Title level="h2" size="xl" color="primary" className="admin-login__title">
                Sign In
              </Title>
              <Text variant="p" size="sm" color="secondary" className="admin-login__description">
                Enter your credentials to access the admin dashboard
              </Text>
            </div>

            <div className="admin-login__fields">
              <div className="admin-login__field">
                <label htmlFor="email" className="admin-login__label">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="admin@hiddengems.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  className="admin-login__input"
                />
              </div>

              <div className="admin-login__field">
                <label htmlFor="password" className="admin-login__label">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  className="admin-login__input"
                />
              </div>
            </div>

            {(localError || error) && (
              <div className="admin-login__error">
                <Text variant="p" size="sm" color="primary">
                  {localError || error}
                </Text>
              </div>
            )}

            <div className="admin-login__actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                fullWidth
                className="admin-login__submit"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>

          <div className="admin-login__footer">
            <Text variant="p" size="xs" color="secondary" className="admin-login__footer-text">
              © 2024 Hidden Gems. All rights reserved.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
