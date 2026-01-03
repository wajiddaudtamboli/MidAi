import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Consultation from '@/models/Consultation';
import Doctor from '@/models/Doctor';
import { verifyToken, getTokenFromHeaders, successResponse, errorResponse, asyncHandler } from '@/lib/api-utils';

// GET user's consultations
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

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const query: any = { userId: decoded.userId };
  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const [consultations, total] = await Promise.all([
    Consultation.find(query)
      .populate('doctorId', 'name specialization avatar consultationFee')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Consultation.countDocuments(query),
  ]);

  return successResponse({
    consultations,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// POST create new consultation
export const POST = asyncHandler(async (req: NextRequest) => {
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
  const { doctorId, type, scheduledAt, symptoms } = body;

  // Validate doctor exists
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return errorResponse('Doctor not found', 404);
  }

  if (!doctor.isApproved) {
    return errorResponse('This doctor is not available for consultations', 400);
  }

  // Create consultation
  const consultation = await Consultation.create({
    userId: decoded.userId,
    doctorId,
    type: type || 'instant',
    scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
    symptoms,
    fee: doctor.consultationFee,
    status: type === 'scheduled' ? 'pending' : 'confirmed',
  });

  // Increment doctor's consultation count
  await Doctor.findByIdAndUpdate(doctorId, { $inc: { totalConsultations: 1 } });

  return successResponse(
    {
      message: 'Consultation booked successfully',
      consultation,
    },
    201
  );
});
