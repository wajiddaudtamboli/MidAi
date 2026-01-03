import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { verifyToken, getTokenFromHeaders, successResponse, errorResponse, asyncHandler } from '@/lib/api-utils';

export const GET = asyncHandler(async (req: NextRequest) => {
  await connectDB();

  const token = getTokenFromHeaders(req.headers);
  if (!token) {
    return errorResponse('Authorization token required', 401);
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return errorResponse('Invalid or expired token', 401);
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    return errorResponse('User not found', 404);
  }

  return successResponse({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      address: user.address,
      medicalHistory: user.medicalHistory,
      emergencyContacts: user.emergencyContacts,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
  });
});

export const PUT = asyncHandler(async (req: NextRequest) => {
  await connectDB();

  const token = getTokenFromHeaders(req.headers);
  if (!token) {
    return errorResponse('Authorization token required', 401);
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return errorResponse('Invalid or expired token', 401);
  }

  const body = await req.json();
  const { name, phone, dateOfBirth, gender, address, medicalHistory, emergencyContacts } = body;

  const user = await User.findByIdAndUpdate(
    decoded.userId,
    {
      $set: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(dateOfBirth && { dateOfBirth }),
        ...(gender && { gender }),
        ...(address && { address }),
        ...(medicalHistory && { medicalHistory }),
        ...(emergencyContacts && { emergencyContacts }),
      },
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return errorResponse('User not found', 404);
  }

  return successResponse({
    message: 'Profile updated successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      address: user.address,
      medicalHistory: user.medicalHistory,
      emergencyContacts: user.emergencyContacts,
    },
  });
});
