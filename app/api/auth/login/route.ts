import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken, successResponse, errorResponse, asyncHandler } from '@/lib/api-utils';

export const POST = asyncHandler(async (req: NextRequest) => {
  await connectDB();

  const body = await req.json();
  const { email, password } = body;

  // Validation
  if (!email || !password) {
    return errorResponse('Email and password are required', 400);
  }

  // Find user with password field
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    return errorResponse('Invalid email or password', 401);
  }

  // Check if user is active
  if (!user.isActive) {
    return errorResponse('Your account has been deactivated. Please contact support.', 403);
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return errorResponse('Invalid email or password', 401);
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return successResponse({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
});
