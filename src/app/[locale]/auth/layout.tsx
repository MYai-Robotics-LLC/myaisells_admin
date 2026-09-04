import Image from 'next/image';
import Link from 'next/link';
import { FiActivity, FiBarChart2, FiLock } from 'react-icons/fi';

const FEATURES = [
  { icon: FiActivity, label: 'Real-time audit logs & activity tracking' },
  { icon: FiLock, label: 'Role-based access control for every admin' },
  { icon: FiBarChart2, label: 'Deep analytics across all business accounts' },
];

// Uses the light (white) Xynexi wordmark on the dark brand panel — the
// default xynexi.png's navy-to-cyan gradient is unreadable there.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* Left brand panel (desktop only). Fixed to the viewport height so it
      never grows past it and never scrolls with the form on the right;
      overflow-y-auto is a safety net in case its own content ever runs
      taller than a short viewport. */}
      <aside className="relative hidden h-full flex-col overflow-x-hidden overflow-y-auto bg-linear-to-br from-primary-900 via-primary-800 to-primary-700 lg:flex lg:w-120 xl:w-135">

        {/* Decorative geometry */}
        <div className="absolute -top-40 -left-40 size-140 rounded-full bg-white/4" />
        <div className="absolute top-1/3 -right-24 size-72 rounded-full bg-primary-500/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 size-120 rounded-full bg-primary-600/20 blur-2xl" />

        {/* Dot grid overlay */}
        <div
          className="opacity-0.07 absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <Link href="/" className="inline-flex">
            <Image
              src="/xynexi-light.png"
              alt="Xynexi"
              width={677}
              height={369}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Brand copy */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-10 pb-16">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary-100 uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Admin Portal
          </div>

          <h2 className="text-4xl leading-tight font-bold text-white xl:text-5xl">
            Manage your
            <br />
            <span className="text-primary-300">entire platform</span>
            <br />
            from one place.
          </h2>

          <p className="mt-5 max-w-xs text-base leading-relaxed text-primary-200">
            Full control over businesses, partners, users, tokens, and platform settings, built for the people who run the show.
          </p>

          {/* Feature cards */}
          <div className="mt-12 space-y-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/7 px-4 py-3.5 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary-300" />
                <span className="text-sm font-medium text-primary-100">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="relative z-10 border-t border-white/10 px-10 py-5">
          <p className="text-xs text-primary-300">
            {`© ${new Date().getFullYear()} Xynexi. All rights reserved.`}
          </p>
        </div>
      </aside>

      {/* Right form panel */}
      <main className="flex h-full flex-1 flex-col overflow-hidden bg-snowBlue">

        {/* Mobile header */}
        <div className="flex items-center border-b border-slate-100 bg-white px-6 py-4 lg:hidden">
          <Link href="/" className="inline-flex">
            <Image
              src="/xynexi.png"
              alt="Xynexi"
              width={677}
              height={369}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Form content — top-anchored (not vertically centered) so short
        steps read as an intentional page instead of a small card floating
        in a sea of whitespace; naturally scrolls instead of clipping when
        content is taller than the viewport, since there's no centering to
        fight. */}
        <div className="flex flex-1 justify-center overflow-y-auto px-5 py-12 md:py-16">
          <div className="flex w-full items-center justify-center">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
