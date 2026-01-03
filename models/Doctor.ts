import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDoctor extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  specialization: string;
  qualification: string[];
  experience: number; // years
  registrationNumber: string;
  hospital?: string;
  clinicAddress?: string;
  consultationFee: number;
  languages: string[];
  bio?: string;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  isOnline: boolean;
  isVerified: boolean;
  isApproved: boolean;
  rating: number;
  totalReviews: number;
  totalConsultations: number;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    avatar: String,
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      enum: [
        'General Medicine',
        'Cardiology',
        'Dermatology',
        'Pediatrics',
        'Orthopedics',
        'Neurology',
        'Psychiatry',
        'Gynecology',
        'ENT',
        'Ophthalmology',
        'Dentistry',
        'Emergency Medicine',
        'Other',
      ],
    },
    qualification: {
      type: [String],
      required: [true, 'Qualification is required'],
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: 0,
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
    },
    hospital: String,
    clinicAddress: String,
    consultationFee: {
      type: Number,
      required: [true, 'Consultation fee is required'],
      min: 0,
    },
    languages: {
      type: [String],
      default: ['English', 'Hindi'],
    },
    bio: String,
    availability: [
      {
        day: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        startTime: String,
        endTime: String,
        isAvailable: { type: Boolean, default: true },
      },
    ],
    isOnline: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    totalConsultations: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
DoctorSchema.index({ specialization: 1 });
DoctorSchema.index({ isOnline: 1, isApproved: 1 });
DoctorSchema.index({ rating: -1 });

const Doctor: Model<IDoctor> = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;
