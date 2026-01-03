import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ISymptomConversation extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  sessionId: string;
  messages: IMessage[];
  symptoms: string[];
  aiDiagnosis?: string;
  severity?: 'low' | 'medium' | 'high' | 'emergency';
  recommendedAction?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const SymptomConversationSchema = new Schema<ISymptomConversation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [MessageSchema],
    symptoms: [String],
    aiDiagnosis: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'emergency'],
    },
    recommendedAction: String,
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes (sessionId index is auto-created by unique: true)
SymptomConversationSchema.index({ userId: 1, createdAt: -1 });

const SymptomConversation: Model<ISymptomConversation> =
  mongoose.models.SymptomConversation ||
  mongoose.model<ISymptomConversation>('SymptomConversation', SymptomConversationSchema);

export default SymptomConversation;
