const INTERVALS = [
  { value: '10', label: '10s' },
  { value: '30', label: '30s' },
  { value: '60', label: '1m' },
  { value: '300', label: '5m' },
];

export default function ControlPanel({ settings, onSettingsChange }) {
  const autoScan = settings.auto_scan === 'true';
  const scanInterval = settings.scan_interval || '30';
  const alertThreshold = parseInt(settings.alert_threshold || '50');

  const handleToggle = () => {
    onSettingsChange({ auto_scan: autoScan ? 'false' : 'true' });
  };

  const handleInterval = (value) => {
    onSettingsChange({ scan_interval: value });
  };

  const handleThreshold = (e) => {
    onSettingsChange({ alert_threshold: e.target.value });
  };

  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] shadow-[var(--shadow-sm)] p-5">
      <span className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-mute)]">
        Controls
      </span>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Auto-Scan */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[var(--color-body)]">Auto-scan</span>
          <button
            onClick={handleToggle}
            className={`relative w-[44px] h-[24px] rounded-full transition-colors duration-200 ${
              autoScan ? 'bg-[var(--color-ink)]' : 'bg-[var(--color-hairline)]'
            }`}
          >
            <div className={`absolute top-[2px] left-[2px] w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
              autoScan ? 'translate-x-[20px]' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Interval */}
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[var(--color-body)] shrink-0">Interval</span>
          <div className="flex gap-[2px] bg-[var(--color-canvas-soft-2)] rounded-[var(--radius-sm)] p-[2px]">
            {INTERVALS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleInterval(value)}
                className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono transition-all ${
                  scanInterval === value
                    ? 'bg-[var(--color-canvas)] text-[var(--color-ink)] shadow-[var(--shadow-sm)]'
                    : 'text-[var(--color-mute)] hover:text-[var(--color-body)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Threshold */}
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[var(--color-body)] shrink-0">Alert at</span>
          <input
            type="range"
            min="10"
            max="90"
            value={alertThreshold}
            onChange={handleThreshold}
            className="flex-1 h-[4px] bg-[var(--color-hairline)] rounded-full appearance-none cursor-pointer accent-[var(--color-ink)]"
          />
          <span className="text-[11px] font-mono text-[var(--color-mute)] w-[32px] text-right">{alertThreshold}%</span>
        </div>
      </div>
    </div>
  );
}
