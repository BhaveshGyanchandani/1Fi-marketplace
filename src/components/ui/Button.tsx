import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-pill font-semibold text-[15px] px-6 py-3.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300';

  const variants = {
    primary: disabled
      ? 'bg-primary-200 text-white cursor-not-allowed'
      : 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
    secondary: disabled
      ? 'border border-gray-200 text-gray-300 cursor-not-allowed'
      : 'border border-primary text-primary hover:bg-primary-50 active:bg-primary-100',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
