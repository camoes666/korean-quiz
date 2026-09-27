'use client';

interface AdPlaceholderProps {
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  label?: string;
  className?: string;
}

export default function AdPlaceholder({
  format = 'horizontal',
  label = 'Advertisement',
  className = '',
}: AdPlaceholderProps) {
  const getDimensions = () => {
    switch (format) {
      case 'rectangle':
        return 'min-h-[250px] max-w-[336px] w-full';
      case 'in-feed':
        return 'min-h-[100px] w-full';
      case 'horizontal':
      default:
        return 'min-h-[90px] w-full max-w-[728px]';
    }
  };

  return (
    <div
      className={`my-6 mx-auto flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-900/40 text-center transition-all ${getDimensions()} ${className}`}
      aria-label="Advertisement slot"
    >
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        {label} (Google AdSense Slot)
      </div>
      <div className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
        {format === 'rectangle' ? '300x250 Medium Rectangle' : 'Responsive Leaderboard / Banner'}
      </div>
      <p className="text-[10px] text-zinc-400/80 mt-1 max-w-xs">
        Ready for AdSense code snippet <code className="text-zinc-500 font-mono text-[9px]">&lt;ins class=&quot;adsbygoogle&quot;&gt;</code>
      </p>
    </div>
  );
}
