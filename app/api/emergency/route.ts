import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import EmergencySOS from '@/models/EmergencySOS';
import User from '@/models/User';
import { verifyToken, getTokenFromHeaders, successResponse, errorResponse, asyncHandler } from '@/lib/api-utils';
import { v4 as uuidv4 } from 'uuid';

// GET user's emergency history
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

  const [emergencies, total] = await Promise.all([
    EmergencySOS.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    EmergencySOS.countDocuments(query),
  ]);

  return successResponse({
    emergencies,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// POST trigger new emergency SOS
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
  const { latitude, longitude, address, emergencyType, description } = body;

  // Validate location
  if (!latitude || !longitude) {
    return errorResponse('Location coordinates are required', 400);
  }

  // Get user's emergency contacts
  const user = await User.findById(decoded.userId);
  const emergencyContacts = user?.emergencyContacts || [];

  // Create emergency record
  const emergency = await EmergencySOS.create({
    userId: decoded.userId,
    status: 'triggered',
    location: {
      latitude,
      longitude,
      address,
    },
    emergencyType: emergencyType || 'medical',
    description,
    contactsNotified: emergencyContacts.map((contact: any) => ({
      name: contact.name,
      phone: contact.phone,
      notifiedAt: new Date(),
    })),
    // Mock nearby hospitals (in production, this would be from a real API)
    nearbyHospitals: [
      {
        name: 'City General Hospital',
        distance: 2.5,
        phone: '+91 1234567890',
        address: 'Main Road, City Center',
      },
      {
        name: 'Apollo Emergency Care',
        distance: 4.2,
        phone: '+91 9876543210',
        address: 'Health Avenue, Medical District',
      },
    ],
    triggeredAt: new Date(),
  });

  // In production, this would:
  // 1. Send SMS/push notifications to emergency contacts
  // 2. Alert nearby hospitals
  // 3. Potentially call emergency services

  return successResponse(
    {
      message: 'Emergency SOS triggered successfully',
      emergency,
      alertsSent: emergencyContacts.length,
    },
    201
  );
});
