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

