// Export all models from a single file
export { default as User } from './User';
export { default as Doctor } from './Doctor';
export { default as Consultation } from './Consultation';
export { default as SymptomConversation } from './SymptomConversation';
export { default as EmergencySOS } from './EmergencySOS';

// Export types
export type { IUser } from './User';
export type { IDoctor } from './Doctor';
export type { IConsultation } from './Consultation';
export type { ISymptomConversation, IMessage } from './SymptomConversation';
export type { IEmergencySOS } from './EmergencySOS';
