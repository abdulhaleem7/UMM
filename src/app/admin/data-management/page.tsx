'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DataManagementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
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

  const handleExport = async () => {
    setExportLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/export-excel', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      // Get the blob and create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `UMM_Clients_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Show success notification
      alert('✅ Data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('❌ Failed to export data. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      alert('Please select a file to import');
      return;
    }

    setImportLoading(true);
    setImportResult(null);

    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('file', importFile);

      const response = await fetch('/api/admin/import-excel', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        setImportResult(result);
        setImportFile(null);
        // Reset file input
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error(result.error || 'Failed to import data');
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert(`❌ Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setImportLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setImportFile(file);
      } else {
        alert('Please drop an Excel file (.xlsx or .xls)');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setImportFile(file);
      } else {
        alert('Please select an Excel file (.xlsx or .xls)');
        e.target.value = '';
      }
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>📊 Data Management</h1>
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

      <div className="data-management-grid">
        {/* Export Section */}
        <div className="data-management-card">
          <div className="card-header">
            <h2>📤 Export Data</h2>
            <p>Download all client data as an Excel file</p>
          </div>
          <div className="card-content">
            <div className="export-info">
              <ul>
                <li>✅ All client information</li>
                <li>✅ Patronage counts</li>
                <li>✅ Contact details</li>
                <li>✅ Notes and dates</li>
              </ul>
            </div>
            <button 
              onClick={handleExport}
              disabled={exportLoading}
              className="admin-btn admin-btn-primary full-width"
            >
              {exportLoading ? (
                <>
                  <span className="admin-spinner small"></span>
                  Exporting...
                </>
              ) : (
                <>
                  📤 Export to Excel
                </>
              )}
            </button>
          </div>
        </div>

        {/* Import Section */}
        <div className="data-management-card">
          <div className="card-header">
            <h2>📥 Import Data</h2>
            <p>Upload an Excel file to import client data</p>
          </div>
          <div className="card-content">
            <div 
              className={`file-drop-zone ${dragActive ? 'active' : ''} ${importFile ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {importFile ? (
                <div className="file-selected">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <strong>{importFile.name}</strong>
                    <small>{(importFile.size / 1024).toFixed(1)} KB</small>
                  </div>
                  <button 
                    onClick={() => setImportFile(null)}
                    className="remove-file"
                  >
                    ❌
                  </button>
                </div>
              ) : (
                <div className="drop-zone-content">
                  <div className="drop-icon">📁</div>
                  <p><strong>Drop your Excel file here</strong></p>
                  <p>or</p>
                  <label htmlFor="fileInput" className="file-input-label">
                    Choose File
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <small>Supports .xlsx and .xls files</small>
                </div>
              )}
            </div>

            {importFile && (
              <button 
                onClick={handleImport}
                disabled={importLoading}
                className="admin-btn admin-btn-success full-width"
              >
                {importLoading ? (
                  <>
                    <span className="admin-spinner small"></span>
                    Importing...
                  </>
                ) : (
                  <>
                    📥 Import Data
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Import Results */}
      {importResult && (
        <div className="import-results">
          <h3>Import Results</h3>
          <div className="results-summary">
            <div className="result-item success">
              <strong>✅ Imported:</strong> {importResult.summary.imported} clients
            </div>
            <div className="result-item warning">
              <strong>⚠️ Skipped:</strong> {importResult.summary.skipped} rows
            </div>
            <div className="result-item info">
              <strong>📊 Total Processed:</strong> {importResult.summary.totalRows} rows
            </div>
          </div>

          {importResult.summary.errors && importResult.summary.errors.length > 0 && (
            <div className="error-details">
              <h4>Errors & Warnings:</h4>
              <ul>
                {importResult.summary.errors.map((error: string, index: number) => (
                  <li key={index} className="error-item">{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="instructions-card">
        <h3>📋 Excel File Format</h3>
        <p>Your Excel file should have these columns:</p>
        <div className="format-table">
          <table>
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Client Name</code></td>
                <td>✅ Yes</td>
                <td>Full name of the client</td>
              </tr>
              <tr>
                <td><code>Email</code></td>
                <td>✅ Yes</td>
                <td>Valid email address</td>
              </tr>
              <tr>
                <td><code>Phone</code></td>
                <td>❌ No</td>
                <td>Phone number</td>
              </tr>
              <tr>
                <td><code>Patronage Count</code></td>
                <td>❌ No</td>
                <td>Number of visits (default: 0)</td>
              </tr>
              <tr>
                <td><code>Date Added</code></td>
                <td>❌ No</td>
                <td>When client was added (default: today)</td>
              </tr>
              <tr>
                <td><code>Last Patronage Date</code></td>
                <td>❌ No</td>
                <td>Date of last visit</td>
              </tr>
              <tr>
                <td><code>Notes</code></td>
                <td>❌ No</td>
                <td>Additional notes</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="import-notes">
          <h4>📝 Import Notes:</h4>
          <ul>
            <li>If a client with the same email exists, their data will be updated</li>
            <li>Invalid rows will be skipped and reported in the results</li>
            <li>Email addresses must be valid format</li>
            <li>Export your current data first as a backup before importing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}