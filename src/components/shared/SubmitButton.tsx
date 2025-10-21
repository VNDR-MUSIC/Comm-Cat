
'use client';

import { useFormStatus } from 'react-dom';
import GlowingButton from './GlowingButton';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
    idleText: string;
    submittingText: string;
}

export function SubmitButton({ idleText, submittingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <GlowingButton type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          <span>{submittingText}</span>
        </>
      ) : (
        <span>{idleText}</span>
      )}
    </GlowingButton>
  );
}
