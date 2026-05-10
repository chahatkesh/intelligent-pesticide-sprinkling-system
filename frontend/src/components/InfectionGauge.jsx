import { useState, useEffect } from 'react';
import { ScanLine, Sprout } from 'lucide-react';

function getColor(percent) {
  if (percent <= 20) return { color: 'var(--color-green)', label: 'Healthy' };
  if (percent <= 50) return { color: 'var(--color-warning)', label: 'Moderate' };
  if (percent <= 75) return { color: '#f97316', label: 'Concerning' };
  return { color: 'var(--color-error)', label: 'Severe' };
}

export default function InfectionGauge({ infectionPercent, plantType, isLeaf, hasScanned, onCapture, isScanning }) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const { color, label } = getColor(infectionPercent);

  useEffect(() => {
    if (!hasScanned) return;
    const duration = 800;
    const start = displayPercent;
    const diff = infectionPercent - start;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayPercent(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [infectionPercent, hasScanned]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = hasScanned
    ? circumference - (displayPercent / 100) * circumference
    : circumference;
  const healthScore = 100 - displayPercent;

  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] shadow-[var(--shadow-md)] p-6 flex flex-col items-center justify-between h-full min-h-[320px]">

      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <span className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-mute)]">
          Plant Health
        </span>
        {plantType && (
          <div className="flex items-center gap-1.5 px-2 py-[2px] rounded-[var(--radius-pill)] bg-[var(--color-green-soft)]">
            <Sprout size={10} className="text-[var(--color-green)]" />
            <span className="text-[11px] font-mono text-[var(--color-green)]">{plantType}</span>
          </div>
        )}
      </div>

      {/* Gauge */}
      <div className="relative flex items-center justify-center">
        <svg width="180" height="180" className="-rotate-90">
          <circle
            cx="90" cy="90" r={radius}
            fill="none"
            stroke="var(--color-hairline)"
            strokeWidth="8"
          />
          <circle
            cx="90" cy="90" r={radius}
            fill="none"
            stroke={hasScanned ? color : 'var(--color-hairline)'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.7s ease-out, stroke 0.3s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {hasScanned ? (
            <>
              <span className="text-[36px] font-semibold tracking-[-2px]" style={{ color }}>
                {displayPercent}%
              </span>
              <span className="text-[11px] font-mono text-[var(--color-mute)] mt-0.5">{label}</span>
            </>
          ) : (
            <>
              <ScanLine size={24} className="text-[var(--color-hairline-strong)] mb-1" />
              <span className="text-[12px] text-[var(--color-mute)]">Awaiting scan</span>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full space-y-3">
        {hasScanned && (
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[var(--color-mute)]">Health score</span>
            <span className="font-mono text-[var(--color-green)]">{healthScore}/100</span>
          </div>
        )}
        <button
          onClick={onCapture}
          disabled={isScanning}
          className="w-full py-2.5 px-4 rounded-[var(--radius-pill)] font-medium text-[14px] tracking-[-0.2px] text-[var(--color-on-primary)] bg-[var(--color-ink)] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity active:scale-[0.98]"
        >
          {isScanning ? 'Scanning...' : 'Scan Now'}
        </button>
      </div>
    </div>
  );
}
