'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CurrentUser {
  id: number;
  username: string;
  email: string;
  role: 'super_admin' | 'admin';
}

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

interface SystemStats {
  totalClients: number;
  totalAdmins: number;
  totalPatronage: number;
  recentActivity: string[];
}

export default function SuperAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalClients: 0,
    totalAdmins: 0,
    totalPatronage: 0,
    recentActivity: []
  });
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
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
        fetchSystemStats();
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

  const fetchSystemStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch clients
      const clientsResponse = await fetch('/api/clients?page=1&limit=1000', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (clientsResponse.ok) {
        const clientsData = await clientsResponse.json();
        const totalPatronage = clientsData.clients.reduce((sum: number, client: any) => sum + client.patronageCount, 0);
        
        setSystemStats(prev => ({
          ...prev,
          totalClients: clientsData.pagination.totalCount,
          totalPatronage: totalPatronage,
          recentActivity: [
            `${clientsData.pagination.totalCount} clients in system`,
            `${totalPatronage} total patronage visits recorded`,
            `Last updated: ${new Date().toLocaleDateString()}`
          ]
        }));
      }
    } catch (error) {
      console.error('Failed to fetch system stats:', error);
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
        setSystemStats(prev => ({
          ...prev,
          totalAdmins: data.adminUsers.length
        }));
      }
    } catch (error) {
      console.error('Failed to fetch admin users:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getActivityStatus = (user: AdminUser) => {
    if (!user.last_login) return 'Never logged in';
    
    const lastLogin = new Date(user.last_login);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return '🟢 Active (< 1h ago)';
    if (diffHours < 24) return '🟡 Recent (< 24h ago)';
    if (diffHours < 168) return '🟠 This week';
    return '🔴 Inactive (> 1 week)';
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading Super Admin Panel...</p>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>🔱 Super Admin Control Panel</h1>
          <p className="dashboard-subtitle">
            System Overview & Advanced Management
            <span className="role-badge super-admin">🔱 Super Admin</span>
          </p>
        </div>
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

      {/* System Overview Stats */}
      <div className="super-admin-stats-grid">
        <div className="stat-card gradient-primary">
          <div className="stat-content">
            <div className="stat-icon">👥</div>
            <div>
              <div className="stat-label">Total Clients</div>
              <div className="stat-value">{systemStats.totalClients}</div>
            </div>
          </div>
        </div>

        <div className="stat-card gradient-secondary">
          <div className="stat-content">
            <div className="stat-icon">🔐</div>
            <div>
              <div className="stat-label">Admin Users</div>
              <div className="stat-value">{systemStats.totalAdmins}</div>
            </div>
          </div>
        </div>

        <div className="stat-card gradient-success">
          <div className="stat-content">
            <div className="stat-icon">📊</div>
            <div>
              <div className="stat-label">Total Patronage</div>
              <div className="stat-value">{systemStats.totalPatronage}</div>
            </div>
          </div>
        </div>

        <div className="stat-card gradient-accent">
          <div className="stat-content">
            <div className="stat-icon">⚡</div>
            <div>
              <div className="stat-label">System Status</div>
              <div className="stat-value">🟢 Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="super-admin-actions">
        <h3>🚀 Quick Actions</h3>
        <div className="actions-grid">
          <button 
            onClick={() => router.push('/admin/users')}
            className="action-card primary"
          >
            <div className="action-icon">👥</div>
            <div className="action-content">
              <h4>Manage Admins</h4>
              <p>Add, edit, and remove admin users</p>
            </div>
          </button>

          <button 
            onClick={() => router.push('/admin/data-management')}
            className="action-card secondary"
          >
            <div className="action-icon">📊</div>
            <div className="action-content">
              <h4>Data Management</h4>
              <p>Export/Import client data</p>
            </div>
          </button>

          <button 
            onClick={() => router.push('/admin/dashboard')}
            className="action-card accent"
          >
            <div className="action-icon">📋</div>
            <div className="action-content">
              <h4>Client Management</h4>
              <p>View and manage all clients</p>
            </div>
          </button>

          <button 
            onClick={() => {
              if (confirm('This will refresh all system caches and data. Continue?')) {
                window.location.reload();
              }
            }}
            className="action-card warning"
          >
            <div className="action-icon">🔄</div>
            <div className="action-content">
              <h4>System Refresh</h4>
              <p>Refresh system data & caches</p>
            </div>
          </button>
        </div>
      </div>

      {/* Admin Activity Overview */}
      <div className="admin-activity-overview">
        <h3>👥 Admin User Activity</h3>
        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>👤 Admin User</th>
                <th>🔐 Role</th>
                <th>📅 Created</th>
                <th>🕐 Last Login</th>
                <th>⚡ Status</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-info">
                      <div className="admin-name">
                        {user.username}
                        {user.id === currentUser.id && <span className="badge-info">(You)</span>}
                      </div>
                      <div className="admin-email">{user.email}</div>
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
                    <span className="activity-status">
                      {getActivityStatus(user)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Information */}
      <div className="system-info">
        <h3>ℹ️ System Information</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>🌐 Environment</h4>
            <p>{process.env.VERCEL ? 'Vercel Production' : 'Local Development'}</p>
          </div>
          <div className="info-card">
            <h4>💾 Database</h4>
            <p>{process.env.VERCEL ? 'In-Memory SQLite' : 'File-Based SQLite'}</p>
          </div>
          <div className="info-card">
            <h4>🔐 Authentication</h4>
            <p>JWT + bcrypt (Database-based)</p>
          </div>
          <div className="info-card">
            <h4>📧 Email System</h4>
            <p>Zoho Mail SMTP Active</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="recent-activity">
        <h3>📋 Recent System Activity</h3>
        <div className="activity-log">
          {systemStats.recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-dot"></div>
              <span>{activity}</span>
            </div>
          ))}
          <div className="activity-item">
            <div className="activity-dot success"></div>
            <span>Super Admin Panel accessed by {currentUser.username}</span>
          </div>
          <div className="activity-item">
            <div className="activity-dot"></div>
            <span>Role-based access control active and enforced</span>
          </div>
        </div>
      </div>
    </div>
  );
}