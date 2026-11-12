import React from 'react';
import { PageRoute } from '../types';
import { BookingForm } from '../components/BookingForm';

interface BookingPageProps {
  initialData?: {
    piercingId: string;
    piercingName: string;
    date: string;
    time: string;
    peopleCount: number;
    notes?: string;
  };
  onBackToCalendar: () => void;
  onViewStatus: (ref: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialData,
  onBackToCalendar,
  onViewStatus
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BookingForm
        initialData={initialData}
        onBackToCalendar={onBackToCalendar}
        onViewStatus={onViewStatus}
      />
    </div>
  );
};
