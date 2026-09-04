import type { Metadata } from 'next';
import { Button, Icons } from '@myai-robotics-llc/ui';
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
            <Icons.NotFound className="size-12 text-primary" />
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

          <Link href="/">
            <Button variant="primary">Back to home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
