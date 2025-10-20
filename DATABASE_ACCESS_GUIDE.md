# 🚀 SQLite Database Access After Deployment

## 📊 Database Export Feature

Your admin dashboard now includes a **"📊 DB Export"** button that gives you complete database access via your web interface.

### How to Use:
1. Login to your admin dashboard
2. Click **"📊 DB Export"** in the header
3. View complete client data with patronage statistics
4. Copy data to clipboard for backup/analysis

## 🌐 Deployment Options & Database Access

### 1. **Vercel (Recommended for Next.js)**
```bash
# Deployment
npm run build
vercel --prod

# Database Access After Deployment
✅ Use the "📊 DB Export" button in your admin dashboard
✅ Database recreates automatically with environment variables
❌ File system is read-only (database resets on each deployment)

# Solution: Migrate to Vercel Postgres for production
npm install @vercel/postgres
```

### 2. **Railway (Better for SQLite)**
```bash
# Deployment
railway login
railway link
railway up

# Database Access
✅ Persistent file system (database survives deployments)
✅ Use "📊 DB Export" button
✅ SSH access: railway shell
✅ Direct file access to clients.db
```

### 3. **Render**
```bash
# Deployment
# Connect GitHub repo to Render
# Build command: npm run build
# Start command: npm start

# Database Access
✅ Persistent disk storage (paid plans)
✅ Use "📊 DB Export" button
✅ SSH access via Render Shell
```

### 4. **VPS/Dedicated Server**
```bash
# Deployment
git clone your-repo
npm install
npm run build
npm start

# Database Access
✅ Full SSH access
✅ Direct file access: /path/to/your/app/clients.db
✅ Use sqlite3 command line tool
✅ Use "📊 DB Export" button
```

## 🛠️ Advanced Database Access Methods

### Method 1: Web Interface (✅ Available Now)
```typescript
// Your admin dashboard includes:
- 📊 DB Export button
- Complete client data with patronage stats
- Copy to clipboard functionality
- JSON format for easy import/export
```

### Method 2: API Endpoints
```bash
# Available endpoints:
POST /api/admin/database

# Predefined queries:
- get_all_clients
- get_all_patronage  
- get_client_count
- get_patronage_count
- get_clients_with_patronage
- get_database_schema
```

### Method 3: Direct File Access (VPS/Railway)
```bash
# SSH into your server
ssh user@your-server

# Navigate to your app directory
cd /path/to/your/app

# Use SQLite command line
sqlite3 clients.db

# View tables
.tables

# Export data
.output backup.sql
.dump

# View clients
SELECT * FROM clients;
```

### Method 4: Database Browser (Local Development)
```bash
# Download DB Browser for SQLite
# https://sqlitebrowser.org/

# Copy clients.db from your server
scp user@server:/path/to/app/clients.db ./local-backup.db

# Open in DB Browser
# Browse data, run queries, export to CSV/JSON
```

## 📋 Database Backup Strategy

### Option 1: Use DB Export Button
1. Login to admin dashboard
2. Click "📊 DB Export"
3. Copy JSON data
4. Save to local file for backup

### Option 2: API Backup Script
```javascript
// Create a backup script
const backup = async () => {
  const response = await fetch('/api/admin/database', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: JSON.stringify({ action: 'get_clients_with_patronage' })
  });
  
  const data = await response.json();
  console.log(JSON.stringify(data.data, null, 2));
};
```

### Option 3: Scheduled Backups (Production)
```bash
# Create a cron job on your server
0 2 * * * cd /path/to/app && cp clients.db backups/clients-$(date +%Y%m%d).db
```

## 🔧 Migration to Production Database

For high-traffic production, consider migrating to:

### PostgreSQL (Recommended)
```bash
# Install
npm install pg @types/pg

# Update database.ts to use PostgreSQL
# Deploy with managed PostgreSQL (Vercel, Railway, etc.)
```

### MySQL
```bash
# Install  
npm install mysql2

# Update database connections
# Use managed MySQL service
```

## 📱 Mobile Access

Your **"📊 DB Export"** feature works perfectly on mobile:
- Responsive design
- Touch-friendly interface
- Copy to clipboard works on mobile browsers
- Access your data anywhere with internet

## 🔐 Security Notes

- Database access requires admin authentication
- Only SELECT queries allowed via API for security
- Predefined safe queries prevent SQL injection
- Use HTTPS in production for encrypted data transfer

## 🚀 Quick Start Guide

1. **Deploy your app** to your chosen platform
2. **Access admin dashboard** at `your-domain.com/admin/login`
3. **Login** with your credentials
4. **Click "📊 DB Export"** to access all your data
5. **Copy to clipboard** for backup or analysis

Your SQLite database is now fully accessible after deployment! 🎉