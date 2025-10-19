# UMM Transport & Logistics

This is a [Next.js](https://nextjs.org) project for UMM Transport & Logistics with an integrated admin system for client management.

## Features

### Public Website
- Transport and logistics services showcase
- Contact forms and service information
- Responsive design with modern UI

### Admin System
- **🔐 Secure Login**: JWT-based authentication with modern UI
- **👥 Client Management**: Add, view, and manage customer records with search & filtering
- **📊 Smart Dashboard**: Real-time statistics with beautiful visualizations
- **🔍 Advanced Search**: Search clients by name, email, or phone number
- **🏷️ Smart Filters**: Filter by All, Recent, Frequent, or Inactive clients  
- **🔄 Patronage Tracking**: Record and track customer visits with dates
- **📧 Email Campaigns**: Send branded monthly newsletters to clients
- **🎨 Modern Design**: Responsive design using UMM brand colors and gradients

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your settings:

```bash
copy .env.example .env.local
```

Edit `.env.local` with your actual credentials:
- Set a secure JWT secret
- Configure your email credentials (Gmail or SMTP)
- Optionally change admin username/password

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the main website.

### 4. Access Admin System

Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to access the admin panel.

**Default credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Change these credentials in production!**

## Admin System Usage

### Client Management
1. **Add Clients**: Use the modern dashboard form to add new clients (name, email, phone, notes)
2. **Search & Filter**: 
   - 🔍 Search by name, email, or phone number
   - 🏷️ Filter by: All, Recent (last 30 days), Frequent (5+ visits), or Inactive clients
3. **Track Patronage**: Click "Record Visit" to log when a client uses your services
4. **View History**: Monitor patronage count and dates for each client
5. **Email Campaigns**: Send beautiful branded monthly newsletters to all clients

### Email Setup
The system uses **Zoho Mail** (already configured in the project):

1. **Set up your Zoho account:**
   - Get a Zoho Mail account if you don't have one
   - Go to Account Settings > Security > App Passwords
   - Generate a new app password for "UMM Transport Admin"

2. **Configure environment variables:**
   - Copy `.env.example` to `.env.local`
   - Set `EMAIL_USER` to your Zoho email address
   - Set `EMAIL_PASSWORD` to your Zoho app password

3. **Email Features:**
   - 🎨 Beautiful branded HTML emails with UMM colors
   - 📱 Mobile-responsive email templates
   - 🌟 Professional newsletter design
   - 📢 Automatic referral encouragement

### Changing Admin Password

To change the admin password:

1. Use the `hashPassword` function in `src/lib/auth.ts`:
```javascript
import { hashPassword } from '@/lib/auth';
console.log('New password hash:', hashPassword('your-new-password'));
```

2. Update the `ADMIN_PASSWORD_HASH` in your `.env.local` file

### Database

The system uses SQLite database (`clients.db`) which is automatically created when you first run the application. No additional database setup required.

## API Endpoints

- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Add new client
- `POST /api/clients/[id]/patronage` - Record patronage
- `GET /api/clients/[id]/patronage` - Get patronage history
- `POST /api/email/monthly-campaign` - Send monthly emails

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/          # Admin login page
│   │   └── dashboard/      # Admin dashboard
│   └── api/
│       ├── auth/           # Authentication endpoints
│       ├── clients/        # Client management APIs
│       └── email/          # Email campaign APIs
├── lib/
│   ├── auth.ts            # Authentication utilities
│   └── database.ts        # Database operations
└── components/            # Existing website components
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
