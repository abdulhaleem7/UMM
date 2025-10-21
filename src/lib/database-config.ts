// Database configuration for different environments
export const getDatabaseConfig = () => {
  if (process.env.VERCEL) {
    // Production: Use Vercel Postgres
    return {
      type: 'postgres' as const,
      connectionString: process.env.POSTGRES_URL,
    };
  } else {
    // Development: Use SQLite
    return {
      type: 'sqlite' as const,
      path: './clients.db',
    };
  }
};

// Check if we should use external database
export const shouldUseExternalDB = () => {
  return process.env.VERCEL && process.env.POSTGRES_URL;
};