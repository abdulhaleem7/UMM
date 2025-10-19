'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  patronageCount: number;
  dateAdded: string;
  lastPatronageDate?: string;
  notes?: string;
}

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalCount: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [newClient, setNewClient] = useState<Omit<Client, 'id' | 'patronageCount' | 'dateAdded'>>({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [sendingThankYou, setSendingThankYou] = useState<number | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentUser, setCurrentUser] = useState<{id: number, username: string, email: string, role: 'super_admin' | 'admin'} | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchClients();
  }, []);

  // Fetch clients when search, filter, or page changes
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchClients();
    }, 300); // Debounce search

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, filterBy, currentPage]);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const response = await fetch('/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
      } else {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    }
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pagination.limit.toString(),
        search: searchTerm,
        filter: filterBy
      });
      
      const response = await fetch(`/api/clients?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setClients(data.clients);
        setPagination(data.pagination);
      }
    } catch (error) {
      toast.error('Failed to fetch clients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newClient)
      });

      if (response.ok) {
        toast.success('Client added successfully!');
        setNewClient({ name: '', email: '', phone: '', notes: '' });
        setShowAddForm(false);
        fetchClients();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to add client');
      }
    } catch (error) {
      toast.error('Failed to add client');
    }
  };

  const handleAddPatronage = async (clientId: number) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/clients/${clientId}/patronage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          notes: 'Manual entry'
        })
      });

      if (response.ok) {
        toast.success('Patronage recorded!');
        fetchClients();
      } else {
        toast.error('Failed to record patronage');
      }
    } catch (error) {
      toast.error('Failed to record patronage');
    }
  };

  const handleSendMonthlyEmail = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/email/monthly-campaign', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('Monthly emails sent successfully!');
      } else {
        toast.error('Failed to send monthly emails');
      }
    } catch (error) {
      toast.error('Failed to send monthly emails');
    }
  };

  const handleSendThankYou = async (clientId: number, clientName: string) => {
    setSendingThankYou(clientId);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/email/thank-you', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ clientId })
      });

      if (response.ok) {
        toast.success(`Thank you email sent to ${clientName}!`);
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to send thank you email');
      }
    } catch (error) {
      toast.error('Failed to send thank you email');
    } finally {
      setSendingThankYou(null);
    }
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setShowEditForm(true);
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/clients/${editingClient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editingClient.name,
          email: editingClient.email,
          phone: editingClient.phone,
          notes: editingClient.notes
        })
      });

      if (response.ok) {
        toast.success('Client updated successfully!');
        setShowEditForm(false);
        setEditingClient(null);
        fetchClients();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update client');
      }
    } catch (error) {
      toast.error('Failed to update client');
    }
  };

  const handleDeleteClient = async (clientId: number, clientName: string) => {
    if (!confirm(`Are you sure you want to delete ${clientName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/clients/${clientId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success(`${clientName} deleted successfully!`);
        fetchClients();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete client');
      }
    } catch (error) {
      toast.error('Failed to delete client');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">Admin Dashboard</h1>
            {currentUser && (
              <p className="dashboard-subtitle">
                Welcome, {currentUser.username} 
                <span className={`role-badge ${currentUser.role === 'super_admin' ? 'super-admin' : 'admin'}`}>
                  {currentUser.role === 'super_admin' ? '🔱 Super Admin' : '👤 Admin'}
                </span>
              </p>
            )}
          </div>
          <div className="header-buttons">
            {/* Super Admin Only Features */}
            {currentUser?.role === 'super_admin' && (
              <>
                <button
                  onClick={() => router.push('/admin/super-admin')}
                  className="btn-sm btn-primary"
                  title="Super Admin Control Panel"
                >
                  🔱 Super Admin Panel
                </button>
                <button
                  onClick={() => router.push('/admin/users')}
                  className="btn-sm btn-accent"
                  title="Manage admin users"
                >
                  👥 Manage Admins
                </button>
                <button
                  onClick={() => router.push('/admin/data-management')}
                  className="btn-sm btn-secondary"
                  title="Import/Export Excel data"
                >
                  📊 Data Management
                </button>
              </>
            )}
            <button
              onClick={handleSendMonthlyEmail}
              className="btn-sm btn-green"
            >
              📧 Send Monthly Emails
            </button>
            <button
              onClick={() => router.push('/admin/change-password')}
              className="btn-sm btn-blue"
              title="Change your password"
            >
              🔐 Change Password
            </button>
            <button
              onClick={handleLogout}
              className="btn-sm btn-red"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <main style={{maxWidth: '80rem', margin: '0 auto', padding: '0'}}>
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon primary">
                👥
              </div>
              <div>
                <div className="stat-label">Total Clients</div>
                <div className="stat-value">{clients.length}</div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon success">
                🔄
              </div>
              <div>
                <div className="stat-label">Total Patronage</div>
                <div className="stat-value">
                  {clients.reduce((sum, client) => sum + client.patronageCount, 0)}
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon secondary">
                📧
              </div>
              <div>
                <div className="stat-label">Email Subscribers</div>
                <div className="stat-value">
                  {clients.filter(client => client.email).length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-section">
          <div className="search-filter-header">
            <h3 className="search-filter-title">🔍 Search & Filter</h3>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap'}}>
              <input
                type="text"
                placeholder="Search clients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="filter-buttons">
                <button
                  onClick={() => setFilterBy('all')}
                  className={`filter-btn ${filterBy === 'all' ? 'active' : ''}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterBy('recent')}
                  className={`filter-btn ${filterBy === 'recent' ? 'active' : ''}`}
                >
                  Recent
                </button>
                <button
                  onClick={() => setFilterBy('frequent')}
                  className={`filter-btn ${filterBy === 'frequent' ? 'active' : ''}`}
                >
                  Frequent
                </button>
                <button
                  onClick={() => setFilterBy('inactive')}
                  className={`filter-btn ${filterBy === 'inactive' ? 'active' : ''}`}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Client Button */}
        <div style={{padding: '0 1rem'}}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`btn-sm ${showAddForm ? 'btn-red' : 'btn-secondary'}`}
          >
            {showAddForm ? '❌ Cancel' : '➕ Add New Client'}
          </button>
        </div>

        {/* Add Client Form */}
        {showAddForm && (
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">➕ Add New Client</h2>
              <p className="form-subtitle">Enter client information to add them to your database</p>
            </div>
            <form onSubmit={handleAddClient}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newClient.email}
                    onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                    className="form-input"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                    className="form-input"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group form-grid-full">
                  <label className="form-label">Notes</label>
                  <textarea
                    value={newClient.notes}
                    onChange={(e) => setNewClient(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="form-textarea"
                    placeholder="Additional notes about the client..."
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-sm"
                  style={{background: 'var(--admin-gray-300)', color: 'var(--admin-gray-700)'}}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-sm btn-secondary"
                >
                  ➕ Add Client
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Client Form */}
        {showEditForm && editingClient && (
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">✏️ Edit Client</h2>
              <p className="form-subtitle">Update client information</p>
            </div>
            <form onSubmit={handleUpdateClient}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingClient.name}
                    onChange={(e) => setEditingClient(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                    className="form-input"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={editingClient.email}
                    onChange={(e) => setEditingClient(prev => prev ? ({ ...prev, email: e.target.value }) : null)}
                    className="form-input"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={editingClient.phone || ''}
                    onChange={(e) => setEditingClient(prev => prev ? ({ ...prev, phone: e.target.value }) : null)}
                    className="form-input"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group form-grid-full">
                  <label className="form-label">Notes</label>
                  <textarea
                    value={editingClient.notes || ''}
                    onChange={(e) => setEditingClient(prev => prev ? ({ ...prev, notes: e.target.value }) : null)}
                    rows={3}
                    className="form-textarea"
                    placeholder="Additional notes about the client..."
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingClient(null);
                  }}
                  className="btn-sm"
                  style={{background: 'var(--admin-gray-300)', color: 'var(--admin-gray-700)'}}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-sm btn-primary"
                >
                  ✏️ Update Client
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Clients Table */}
        <div className="table-container">
          <div className="table-header">
            <h3 className="table-title">📋 Client Management</h3>
            <p className="table-subtitle">
              Showing {clients.length} of {pagination.totalCount} clients
              {searchTerm && ` matching "${searchTerm}"`}
              {filterBy !== 'all' && ` • Filter: ${filterBy}`}
              • Page {currentPage} of {pagination.totalPages}
            </p>
          </div>
          <div style={{overflowX: 'auto'}}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>👤 Client Info</th>
                  <th>📞 Contact</th>
                  <th>🔄 Patronage</th>
                  <th>📅 Dates</th>
                  <th>⚡ Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client: Client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="client-info">
                        <div className="client-name">{client.name}</div>
                      </div>
                    </td>
                    <td>
                      <div className="client-contact">
                        <div className="client-email">{client.email}</div>
                        {client.phone && (
                          <div className="client-phone">{client.phone}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="patronage-count">
                        {client.patronageCount} time{client.patronageCount !== 1 ? 's' : ''}
                      </div>
                    </td>
                    <td>
                      <div className="date-info">
                        <div>Added: {new Date(client.dateAdded).toLocaleDateString()}</div>
                        {client.lastPatronageDate && (
                          <div>Last: {new Date(client.lastPatronageDate).toLocaleDateString()}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleAddPatronage(client.id!)}
                          className="action-btn success"
                          title="Record a visit"
                        >
                          ➕ Visit
                        </button>
                        <button
                          onClick={() => handleSendThankYou(client.id!, client.name)}
                          className="action-btn primary"
                          disabled={sendingThankYou === client.id}
                          title="Send thank you email"
                        >
                          {sendingThankYou === client.id ? '📤' : '🙏'}
                        </button>
                        <button
                          onClick={() => handleEditClient(client)}
                          className="action-btn secondary"
                          title="Edit client details"
                        >
                          ✏️
                        </button>
                        {/* Only Super Admins can delete clients */}
                        {currentUser?.role === 'super_admin' && (
                          <button
                            onClick={() => handleDeleteClient(client.id!, client.name)}
                            className="action-btn danger"
                            title="Delete client (Super Admin only)"
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
            {clients.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <div className="empty-state-title">
                  {searchTerm || filterBy !== 'all' ? 'No matching clients found' : 'No clients yet'}
                </div>
                <div className="empty-state-text">
                  {searchTerm || filterBy !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Add your first client using the button above!'
                  }
                </div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={!pagination.hasPrevPage}
                className="pagination-btn"
              >
                ⬅️ Previous
              </button>
              
              <div className="pagination-info">
                <span className="pagination-text">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <span className="pagination-count">
                  ({pagination.totalCount} total clients)
                </span>
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                disabled={!pagination.hasNextPage}
                className="pagination-btn"
              >
                Next ➡️
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}