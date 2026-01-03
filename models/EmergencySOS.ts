import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEmergencySOS extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  status: 'triggered' | 'active' | 'responded' | 'resolved' | 'cancelled';
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    accuracy?: number;
  };
  emergencyType: 'medical' | 'accident' | 'cardiac' | 'breathing' | 'other';
  description?: string;
  contactsNotified: {
    name: string;
    phone: string;
    notifiedAt: Date;
    response?: string;
  }[];
  nearbyHospitals?: {
    name: string;
    distance: number;
    phone?: string;
    address?: string;
  }[];
  responderInfo?: {
    name: string;
    type: string;
    eta?: number;
    phone?: string;
  };
  triggeredAt: Date;
  respondedAt?: Date;
  resolvedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmergencySOSSchema = new Schema<IEmergencySOS>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['triggered', 'active', 'responded', 'resolved', 'cancelled'],
      default: 'triggered',
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: String,
      accuracy: Number,
    },
    emergencyType: {
      type: String,
      enum: ['medical', 'accident', 'cardiac', 'breathing', 'other'],
      default: 'medical',
    },
    description: String,
    contactsNotified: [
      {
        name: String,
        phone: String,
        notifiedAt: Date,
        response: String,
      },
    ],
    nearbyHospitals: [
      {
        name: String,
        distance: Number,
        phone: String,
        address: String,
      },
    ],
    responderInfo: {
      name: String,
      type: String,
      eta: Number,
      phone: String,
    },
    triggeredAt: {
      type: Date,
      default: Date.now,
    },
    respondedAt: Date,
    resolvedAt: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
EmergencySOSSchema.index({ userId: 1, createdAt: -1 });
EmergencySOSSchema.index({ status: 1 });
EmergencySOSSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });

const EmergencySOS: Model<IEmergencySOS> =
  mongoose.models.EmergencySOS || mongoose.model<IEmergencySOS>('EmergencySOS', EmergencySOSSchema);

export default EmergencySOS;
