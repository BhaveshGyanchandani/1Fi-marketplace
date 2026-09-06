import { Button } from '../ui/Button';

interface ProceedCTAProps {
  disabled: boolean;
  monthlyAmountInr?: number;
  onProceed: () => void;
}

export function ProceedCTA({ disabled, monthlyAmountInr, onProceed }: ProceedCTAProps) {
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
          aria-label="Share"
          className="w-11 h-11 rounded-full border border-primary flex items-center justify-center flex-shrink-0 text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="18" cy="5" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="19" r="2.5" />
            <path d="m8.2 10.7 7.6-4.4M8.2 13.3l7.6 4.4" />
          </svg>
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
