import { Button } from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
        <span className="text-xl" role="img" aria-label="Error">
          ⚠️
        </span>
      </div>
      <p className="text-gray-700 font-medium mb-1">{message}</p>
      <p className="text-gray-400 text-sm mb-5">Please check your connection and try again.</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
