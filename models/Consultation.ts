import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IConsultation extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  type: 'instant' | 'scheduled';
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  scheduledAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
  duration?: number; // in minutes
  symptoms?: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
  fee: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentId?: string;
  videoSessionId?: string;
  rating?: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<IConsultation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    type: {
      type: String,
      enum: ['instant', 'scheduled'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    scheduledAt: Date,
    startedAt: Date,
    endedAt: Date,
    duration: Number,
    symptoms: String,
    diagnosis: String,
    prescription: String,
    notes: String,
    fee: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    paymentId: String,
    videoSessionId: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
ConsultationSchema.index({ userId: 1, createdAt: -1 });
ConsultationSchema.index({ doctorId: 1, status: 1 });
ConsultationSchema.index({ status: 1 });

const Consultation: Model<IConsultation> =
  mongoose.models.Consultation || mongoose.model<IConsultation>('Consultation', ConsultationSchema);

export default Consultation;
