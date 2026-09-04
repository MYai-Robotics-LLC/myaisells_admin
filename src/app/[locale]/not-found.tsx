import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Xynexi - Page Not Found',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-linear-to-br from-slate-50 via-primary-50 to-indigo-100 p-4">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-xl lg:p-12">
        <div className="flex flex-col items-center">
          <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-primary-50 shadow-lg ring-8 ring-primary-100/10">
            <svg
              className="size-12 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="11" />
              <line x1="11" y1="14" x2="11.01" y2="14" />
            </svg>
          </div>

          <p className="mb-2 text-sm font-semibold tracking-widest text-sc-05 uppercase">
            Error 404
          </p>
          <h1 className="mb-4 text-3xl font-bold text-sc-09 lg:text-4xl">
            Page not found
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-sc-05">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
