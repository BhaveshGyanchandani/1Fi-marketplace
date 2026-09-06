import { useState } from 'react';
import { Button } from '../ui/Button';

interface ProceedCTAProps {
  disabled: boolean;
  monthlyAmountInr?: number;
  onProceed: () => void;
  /** Used by the Share button — falls back to the current page URL if omitted. */
  shareTitle?: string;
}

/**
 * Full-width primary CTA, pinned above the bottom nav. Disabled until both a
 * variant and an EMI plan are selected (ARCHITECTURE.md section 5). Styled
 * after the circular-icon-button + pill-CTA pairing on the real "Pay using
 * 1Fi" screen (reference Image 3) — a share icon on the left, an arrow on
 * the CTA — without copying that screen's amount-entry flow itself, since
 * this is a plan-first flow per the assignment brief, not an any-amount
 * payment flow.
 *
 * The Share button previously had no onClick at all — it rendered with a
 * share icon and an aria-label but did nothing when pressed. Fixed to use
 * the native Web Share API (real share sheet on mobile/supporting browsers)
 * with a copy-link-to-clipboard fallback everywhere else, so it's never a
 * dead control.
 */
export function ProceedCTA({ disabled, monthlyAmountInr, onProceed, shareTitle }: ProceedCTAProps) {
  const [justCopied, setJustCopied] = useState(false);

  async function handleShare() {
    const shareData = { title: shareTitle ?? '1Fi Marketplace', url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User dismissed the share sheet — not an error, do nothing.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    } catch {
      // Clipboard API unavailable/blocked — silently no-op rather than throw.
    }
  }

  return (
    <div className="fixed bottom-[80px] inset-x-0 bg-white border-t border-gray-100 px-4 py-3 z-10">
      <div className="max-w-[500px] mx-auto flex items-center gap-3">
        {monthlyAmountInr != null && (
          <div className="flex-shrink-0">
            <p className="text-[11px] text-gray-400 leading-none">Monthly</p>
            <p className="text-[15px] font-bold text-gray-900 leading-tight">
              ₹{monthlyAmountInr.toLocaleString('en-IN')}
            </p>
          </div>
        )}

        <button
          type="button"
          aria-label={justCopied ? 'Link copied' : 'Share'}
          onClick={handleShare}
          className="w-11 h-11 rounded-full border border-primary flex items-center justify-center flex-shrink-0 text-primary"
        >
          {justCopied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="18" cy="5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="19" r="2.5" />
              <path d="m8.2 10.7 7.6-4.4M8.2 13.3l7.6 4.4" />
            </svg>
          )}
        </button>

        <Button fullWidth disabled={disabled} onClick={onProceed} className="flex-1 min-w-0">
          Proceed
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
