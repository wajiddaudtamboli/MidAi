import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import EmergencySOS from '@/models/EmergencySOS';
import { verifyToken, getTokenFromHeaders, successResponse, errorResponse, asyncHandler } from '@/lib/api-utils';

// GET single emergency
export const GET = asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB();

  const token = getTokenFromHeaders(req.headers);
  if (!token) {
    return errorResponse('Authorization token required', 401);
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return errorResponse('Invalid or expired token', 401);
  }

  const emergency = await EmergencySOS.findOne({
    _id: params.id,
    userId: decoded.userId,
  });

  if (!emergency) {
    return errorResponse('Emergency record not found', 404);
  }

  return successResponse({ emergency });
});

// PUT update emergency status
export const PUT = asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
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
  const { status, notes } = body;

  const emergency = await EmergencySOS.findOne({
    _id: params.id,
    userId: decoded.userId,
  });

  if (!emergency) {
    return errorResponse('Emergency record not found', 404);
  }

  // Update status
  if (status) {
    emergency.status = status;
    if (status === 'resolved') {
      emergency.resolvedAt = new Date();
    }
    if (status === 'responded') {
      emergency.respondedAt = new Date();
    }
  }

  if (notes) {
    emergency.notes = notes;
  }

  await emergency.save();

  return successResponse({
    message: 'Emergency status updated',
    emergency,
  });
});
