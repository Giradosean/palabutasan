export type PiercingCategory = 'ear' | 'facial' | 'other';

export type AvailabilityStatus = 'available' | 'limited' | 'consultation_only' | 'closed';

export interface PiercingDetail {
  about: string;
  prepChecklist: string[];
  aftercareNotes: string[];
  jewelryMaterials: string[];
  anatomyNote: string;
  painLevelDescription: string;
}

export interface Piercing {
  id: string;
  name: string;
  category: PiercingCategory;
  shortDescription: string;
  placement: string;
  healingPeriod: string;
  jewelryInfo: string;
  startingPrice: number;
  formattedPrice: string;
  availabilityStatus: AvailabilityStatus;
  painLevel: 'Mild' | 'Moderate' | 'Noticeable';
  details: PiercingDetail;
  coordinates?: { x: number; y: number }; // for ear anatomy diagram
}

export interface TimeSlot {
  id: string;
  time: string;
  status: 'available' | 'limited' | 'booked';
}

export interface Appointment {
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  piercingId: string;
  piercingName: string;
  date: string; // YYYY-MM-DD or formatted
  time: string;
  peopleCount: number;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'procedure' | 'aftercare' | 'policy';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ear' | 'facial' | 'jewelry' | 'studio';
  description: string;
  image: string;
}

export type PageRoute =
  | 'home'
  | 'about'
  | 'piercings'
  | 'piercing-detail'
  | 'instructions'
  | 'aftercare'
  | 'availability'
  | 'booking'
  | 'status'
  | 'safety'
  | 'pricing'
  | 'gallery'
  | 'faqs'
  | 'contact'
  | 'admin'
  | 'privacy'
  | 'terms';
