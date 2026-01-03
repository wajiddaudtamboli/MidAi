import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken, successResponse, errorResponse, asyncHandler } from '@/lib/api-utils';

export const POST = asyncHandler(async (req: NextRequest) => {
  await connectDB();

  const body = await req.json();
  const { name, email, password, phone } = body;

  // Validation
  if (!name || !email || !password) {
    return errorResponse('Name, email, and password are required', 400);
  }

  if (password.length < 6) {
    return errorResponse('Password must be at least 6 characters', 400);
  }

  // Check if user exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return errorResponse('User with this email already exists', 409);
  }

  // Create user
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    phone,
    role: 'user',
  });

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return successResponse(
    {
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    201
  );
});
