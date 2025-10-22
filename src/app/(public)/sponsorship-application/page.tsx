
import { Suspense } from 'react';
import SponsorshipApplicationForm from './form';

export default function SponsorshipApplicationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SponsorshipApplicationForm />
    </Suspense>
  );
}
