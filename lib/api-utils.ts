import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'midai-healthcare-secret-key-2026';
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'doctor' | 'admin';
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function getTokenFromHeaders(headers: Headers): string | null {
  const authHeader = headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}

// API Error Handler
export class APIError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
  }
}

// Async handler wrapper
export function asyncHandler(fn: Function) {
  return async (req: Request, context?: any) => {
    try {
      return await fn(req, context);
    } catch (error: any) {
      console.error('API Error:', error);
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      return errorResponse(message, statusCode);
    }
  };
}
