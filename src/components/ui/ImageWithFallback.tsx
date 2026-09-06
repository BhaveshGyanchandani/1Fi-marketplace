import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  /** Used to build the fallback initials (e.g. product/brand/store name). */
  fallbackLabel: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Drop-in replacement for a plain <img> that never shows a broken-image
 * icon. On load failure (dead URL, blocked host, rate limit, a shut-down
 * third-party API like Clearbit's logo service) it falls back to a
 * deterministic colored initials avatar instead — same box size as the
 * image it replaces, so layout never jumps.
 *
 * Root cause this addresses: several image URLs across this app point at
 * third-party services that can and do go dark (some Unsplash photo IDs
 * were unreachable; logo.clearbit.com was permanently shut down December
 * 2025 — see docs/CHANGELOG.md). Plain <img> tags with no onError handler
 * showed the browser's default broken-image icon in those cases. This
 * component is the actual fix; swap it in wherever a product/brand/store
 * image renders.
 */
function initialsFor(label: string): string {
  const parts = label.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// Small fixed palette, chosen deterministically from the label so the same
// product/brand always gets the same color rather than a random one on
// every render.
const PALETTE = ['#712CDC', '#0EA5E9', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

function colorFor(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

export function ImageWithFallback({
  src,
  alt,
  fallbackLabel,
  className = '',
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center font-semibold text-white ${className}`}
        style={{ backgroundColor: colorFor(fallbackLabel) }}
        role="img"
        aria-label={alt}
      >
        {initialsFor(fallbackLabel)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
