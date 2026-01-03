import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Doctor from '@/models/Doctor';
import { successResponse, errorResponse, asyncHandler } from '@/lib/api-utils';

// GET all doctors (with filters)
export const GET = asyncHandler(async (req: NextRequest) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get('specialization');
  const isOnline = searchParams.get('isOnline');
  const minRating = searchParams.get('minRating');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  // Build query
  const query: any = { isApproved: true };

  if (specialization && specialization !== 'all') {
    query.specialization = specialization;
  }

  if (isOnline === 'true') {
    query.isOnline = true;
  }

  if (minRating) {
    query.rating = { $gte: parseFloat(minRating) };
  }

  const skip = (page - 1) * limit;

  const [doctors, total] = await Promise.all([
    Doctor.find(query)
      .select('-userId')
      .sort({ isOnline: -1, rating: -1 })
      .skip(skip)
      .limit(limit),
    Doctor.countDocuments(query),
  ]);

  return successResponse({
    doctors,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});
