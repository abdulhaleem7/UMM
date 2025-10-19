'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'super_admin' | 'admin';
  created_at: string;
  updated_at: string;
  last_login?: string;
  is_active: boolean;
}

interface CurrentUser {
  id: number;
  username: string;
  email: string;
  role: 'super_admin' | 'admin';
}

export default function AdminUsersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin' as 'admin' | 'super_admin'
  });
  const [loading, setLoading] = useState(false);
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
        if (data.user.role !== 'super_admin') {
          alert('Access denied. Super admin required.');
          router.push('/admin/dashboard');
          return;
        }
        setCurrentUser(data.user);
        setIsAuthenticated(true);
        fetchAdminUsers();
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

  const fetchAdminUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdminUsers(data.adminUsers);
      }
    } catch (error) {
      console.error('Failed to fetch admin users:', error);
    }
  };

  const handleCreateUser = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Admin user created successfully!');
        setShowCreateForm(false);
        setFormData({ username: '', email: '', password: '', role: 'admin' });
        fetchAdminUsers();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Failed to create admin user');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          role: formData.role
        })
      });

      if (response.ok) {
        alert('Admin user updated successfully!');
        setShowEditForm(false);
        setEditingUser(null);
        setFormData({ username: '', email: '', password: '', role: 'admin' });
        fetchAdminUsers();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Failed to update admin user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number, username: string) => {
    if (!confirm(`Are you sure you want to delete admin user "${username}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Admin user deleted successfully!');
        fetchAdminUsers();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Failed to delete admin user');
    }
  };

  const openEditForm = (user: AdminUser) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      role: user.role
    });
    setShowEditForm(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
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
        <h1>👥 Admin User Management</h1>
        <div className="admin-header-actions">
          <button 
            onClick={() => setShowCreateForm(true)}
            className="admin-btn admin-btn-primary"
          >
            ➕ Add New Admin
          </button>
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

      {/* Create Admin Form */}
      {showCreateForm && (
        <div className="form-container">
          <div className="form-header">
            <h2>➕ Create New Admin User</h2>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <label>Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'super_admin' })}
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button
              onClick={handleCreateUser}
              disabled={loading}
              className="admin-btn admin-btn-success"
            >
              {loading ? 'Creating...' : '✅ Create Admin'}
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setFormData({ username: '', email: '', password: '', role: 'admin' });
              }}
              className="admin-btn admin-btn-secondary"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Admin Form */}
      {showEditForm && editingUser && (
        <div className="form-container">
          <div className="form-header">
            <h2>✏️ Edit Admin User: {editingUser.username}</h2>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'super_admin' })}
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button
              onClick={handleEditUser}
              disabled={loading}
              className="admin-btn admin-btn-success"
            >
              {loading ? 'Updating...' : '✅ Update Admin'}
            </button>
            <button
              onClick={() => {
                setShowEditForm(false);
                setEditingUser(null);
                setFormData({ username: '', email: '', password: '', role: 'admin' });
              }}
              className="admin-btn admin-btn-secondary"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      {/* Admin Users Table */}
      <div className="table-container">
        <div className="table-header">
          <h3>👥 Admin Users ({adminUsers.length})</h3>
        </div>
        <div style={{overflowX: 'auto'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th>👤 User Info</th>
                <th>🔐 Role</th>
                <th>📅 Created</th>
                <th>🕐 Last Login</th>
                <th>⚡ Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="client-info">
                      <div className="client-name">
                        {user.username}
                        {user.id === currentUser.id && <span className="badge-info"> (You)</span>}
                      </div>
                      <div className="client-email">{user.email}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role === 'super_admin' ? 'super-admin' : 'admin'}`}>
                      {user.role === 'super_admin' ? '🔱 Super Admin' : '👤 Admin'}
                    </span>
                  </td>
                  <td>{formatDate(user.created_at)}</td>
                  <td>{user.last_login ? formatDate(user.last_login) : 'Never'}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => openEditForm(user)}
                        className="btn-sm btn-blue"
                        title="Edit user"
                      >
                        ✏️
                      </button>
                      {user.id !== currentUser.id && (
                        <button
                          onClick={() => handleDeleteUser(user.id, user.username)}
                          className="btn-sm btn-red"
                          title="Delete user"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}