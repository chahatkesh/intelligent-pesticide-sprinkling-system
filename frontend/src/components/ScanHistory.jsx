import { Leaf, Download, ImageOff } from 'lucide-react';

function getInfectionStyle(percent) {
  if (percent <= 20) return 'text-[var(--color-green)] bg-[var(--color-green-soft)]';
  if (percent <= 50) return 'text-[var(--color-warning)] bg-[var(--color-warning)]/10';
  if (percent <= 75) return 'text-[#f97316] bg-[#f97316]/10';
  return 'text-[var(--color-error)] bg-[var(--color-error-soft)]';
}

function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function ScanHistory({ records, onExport }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] shadow-[var(--shadow-sm)] p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-mute)]">
          Scan History
        </span>
        {records.length > 0 && (
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-mute)] hover:text-[var(--color-ink)] transition-colors"
          >
            <Download size={11} />
            export csv
          </button>
        )}
      </div>

      {records.length > 0 ? (
        <div className="space-y-[1px] max-h-[280px] overflow-y-auto">
          {records.map((record) => (
            <div
              key={record.id}
              className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-[var(--radius-sm)] hover:bg-[var(--color-canvas-soft)] transition-colors"
            >
              <div className="shrink-0">
                {record.is_leaf ? (
                  <Leaf size={14} className="text-[var(--color-green)]" />
                ) : (
                  <ImageOff size={14} className="text-[var(--color-mute)]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {record.plant_type ? (
                    <span className="text-[13px] text-[var(--color-ink)]">{record.plant_type}</span>
                  ) : (
                    <span className="text-[13px] text-[var(--color-mute)] italic">
                      {record.is_leaf ? 'Unknown' : 'Not a leaf'}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-[var(--color-mute)]">
                  {formatDate(record.timestamp)}
                </span>
              </div>
              <div className={`px-2 py-[2px] rounded-[var(--radius-pill)] text-[11px] font-mono font-medium ${getInfectionStyle(record.infection_percent)}`}>
                {record.infection_percent}%
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[80px] flex items-center justify-center text-[13px] text-[var(--color-mute)]">
          No scans recorded yet.
        </div>
      )}
    </div>
  );
}
