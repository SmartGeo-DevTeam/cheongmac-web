'use client';

import { Toaster } from 'sonner';

export default function TreatmentCaseToaster() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        duration: 2200,
      }}
    />
  );
}
