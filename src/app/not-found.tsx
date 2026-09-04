import Link from 'next/link';

export const metadata = {
  title: 'Xynexi - Page Not Found',
};

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff, #e0e7ff)',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          color: '#1f2937',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '32rem',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.85)',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          }}
        >
          <p
            style={{
              margin: '0 0 0.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#64748b',
            }}
          >
            Error 404
          </p>
          <h1 style={{ margin: '0 0 1rem', fontSize: '1.875rem', fontWeight: 700, color: '#0f172a' }}>
            Page not found
          </h1>
          <p style={{ margin: '0 0 2rem', fontSize: '1.05rem', lineHeight: 1.6, color: '#475569' }}>
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              borderRadius: '0.625rem',
              background: '#2563eb',
              padding: '0.625rem 1.5rem',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
