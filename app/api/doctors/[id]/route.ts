import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Doctor from '@/models/Doctor';
import { successResponse, errorResponse, asyncHandler } from '@/lib/api-utils';

// GET single doctor by ID
export const GET = asyncHandler(async (req: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB();

  const doctor = await Doctor.findById(params.id).select('-userId');

  if (!doctor) {
    return errorResponse('Doctor not found', 404);
  }

  return successResponse({ doctor });
});
