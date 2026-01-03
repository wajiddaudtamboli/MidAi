import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Consultation from '@/models/Consultation';
import { verifyToken, getTokenFromHeaders, successResponse, errorResponse, asyncHandler } from '@/lib/api-utils';

// GET single consultation
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

  const consultation = await Consultation.findOne({
    _id: params.id,
    userId: decoded.userId,
  }).populate('doctorId', 'name specialization avatar phone email');

  if (!consultation) {
    return errorResponse('Consultation not found', 404);
  }

  return successResponse({ consultation });
});

// PUT update consultation (cancel, rate, etc.)
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
  const { status, rating, review } = body;

  const consultation = await Consultation.findOne({
    _id: params.id,
    userId: decoded.userId,
  });

  if (!consultation) {
    return errorResponse('Consultation not found', 404);
  }

  // Update fields
  if (status) consultation.status = status;
  if (rating) consultation.rating = rating;
  if (review) consultation.review = review;

  if (status === 'cancelled') {
    consultation.status = 'cancelled';
  }

  if (status === 'completed' && !consultation.endedAt) {
    consultation.endedAt = new Date();
    if (consultation.startedAt) {
      consultation.duration = Math.round(
        (consultation.endedAt.getTime() - consultation.startedAt.getTime()) / 60000
      );
    }
  }

  await consultation.save();

  return successResponse({
    message: 'Consultation updated successfully',
    consultation,
  });
});
