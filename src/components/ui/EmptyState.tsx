interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export function EmptyState({ title, subtitle, icon = '🛍️' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <span className="text-xl" role="img" aria-hidden="true">
          {icon}
        </span>
      </div>
      <p className="text-gray-700 font-medium mb-1">{title}</p>
      {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
    </div>
  );
}
