'use client';

import { Button } from '@myai-robotics-llc/ui';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-linear-to-br from-slate-50 via-primary-50 to-indigo-100 p-4">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-xl lg:p-12">
        <div className="flex flex-col items-center">
          <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-status-error-10 shadow-lg ring-8 ring-status-error-10/40">
            <svg
              className="size-12 text-error"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <p className="mb-2 text-sm font-semibold tracking-widest text-sc-05 uppercase">
            Something went wrong
          </p>
          <h1 className="mb-4 text-3xl font-bold text-sc-09 lg:text-4xl">
            Unexpected error
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-sc-05">
            An error occurred while loading this page. You can try again, or head back to the dashboard.
          </p>
          {error.digest && (
            <p className="mb-8 font-mono text-xs text-sc-04">
              Reference:
              {' '}
              {error.digest}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" onClick={() => reset()}>
              Try again
            </Button>
            <Button variant="outline" onClick={goHome}>
              Back to home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
