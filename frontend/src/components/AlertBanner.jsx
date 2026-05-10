import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function AlertBanner({ alert, threshold, infectionPercent }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (alert && !dismissed) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [alert, dismissed]);

  useEffect(() => {
    setDismissed(false);
  }, [infectionPercent]);

  if (!visible) return null;

  return (
    <div className="rounded-[var(--radius-md)] bg-[var(--color-error-soft)] border border-[var(--color-error)]/20 px-4 py-3 flex items-center gap-3 animate-fade-up">
      <AlertTriangle size={14} className="text-[var(--color-error)] shrink-0" />
      <div className="flex-1">
        <p className="text-[13px] font-medium text-[var(--color-error)]">
          High infection detected — {infectionPercent}% exceeds {threshold}% threshold.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 p-1 rounded-[var(--radius-sm)] hover:bg-[var(--color-error)]/10 transition-colors"
      >
        <X size={12} className="text-[var(--color-error)]" />
      </button>
    </div>
  );
}
