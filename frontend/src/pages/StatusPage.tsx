import React from 'react';
import { PageRoute } from '../types';
import { AppointmentTracker } from '../components/AppointmentTracker';

interface StatusPageProps {
  initialReference?: string;
  onBookNew: () => void;
}

export const StatusPage: React.FC<StatusPageProps> = ({
  initialReference,
  onBookNew
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AppointmentTracker
        initialReference={initialReference}
        onBookNew={onBookNew}
      />
    </div>
  );
};
