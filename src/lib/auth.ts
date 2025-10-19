import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// This would normally be in your environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
// Use environment hash or generate a new one for 'admin123' if not set
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin123', 12);

export interface User {
  username: string;
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) {
    return false;
  }
  
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function generateToken(user: User): string {
  return jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    return { username: decoded.username };
  } catch (error) {
    return null;
  }
}

// To change the admin password, use this function:
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

// Example usage to generate a new password hash:
// console.log('New password hash:', hashPassword('your-new-password'));