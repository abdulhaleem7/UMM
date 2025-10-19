'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CurrentUser {
  id: number;
  username: string;
  email: string;
  role: 'super_admin' | 'admin';
}

export default function ChangePasswordPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.currentPassword) {
      newErrors.push('Current password is required');
    }

    if (!formData.newPassword) {
      newErrors.push('New password is required');
    } else if (formData.newPassword.length < 6) {
      newErrors.push('New password must be at least 6 characters long');
    }

    if (!formData.confirmPassword) {
      newErrors.push('Please confirm your new password');
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.push('New password and confirmation do not match');
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.push('New password must be different from current password');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Password changed successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        router.push('/admin/dashboard');
      } else {
        setErrors([data.error || 'Failed to change password']);
      }
    } catch (error) {
      setErrors(['An error occurred while changing password']);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🔐 Change Password</h1>
        <div className="admin-header-actions">
          <button 
            onClick={() => router.push('/admin/dashboard')}
            className="admin-btn admin-btn-secondary"
          >
            ← Back to Dashboard
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('adminToken');
              router.push('/admin/login');
            }}
            className="admin-btn admin-btn-danger"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="change-password-container">
        <div className="change-password-card">
          <div className="card-header">
            <h2>🔐 Change Your Password</h2>
            <p>Update your password for user: <strong>{currentUser.username}</strong></p>
          </div>

          {errors.length > 0 && (
            <div className="error-messages">
              <h4>❌ Please fix the following errors:</h4>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="password-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password *</label>
              <input
                type="password"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                placeholder="Enter your current password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password *</label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                placeholder="Enter your new password (min. 6 characters)"
                minLength={6}
                required
              />
              <small className="form-help">Password must be at least 6 characters long</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password *</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your new password"
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="admin-btn admin-btn-primary"
              >
                {loading ? (
                  <>
                    <span className="admin-spinner small"></span>
                    Changing Password...
                  </>
                ) : (
                  <>
                    🔐 Change Password
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setErrors([]);
                }}
                className="admin-btn admin-btn-secondary"
                disabled={loading}
              >
                🔄 Clear Form
              </button>
            </div>
          </form>

          <div className="password-tips">
            <h4>💡 Password Security Tips</h4>
            <ul>
              <li>Use a strong, unique password</li>
              <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>Avoid using personal information</li>
              <li>Don't reuse passwords from other accounts</li>
              <li>Change your password regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}