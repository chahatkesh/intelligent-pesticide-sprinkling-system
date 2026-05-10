import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

function formatTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-[var(--radius-sm)] px-3 py-2 shadow-[var(--shadow-lg)]">
      <p className="text-[11px] font-mono text-[var(--color-mute)]">{formatTime(data.timestamp)}</p>
      <p className="text-[13px] font-medium text-[var(--color-ink)]">{data.infection}% infection</p>
    </div>
  );
}

export default function TrendChart({ data }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] shadow-[var(--shadow-sm)] p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-mute)]">
          Infection Trend
        </span>
        <span className="text-[11px] font-mono text-[var(--color-mute)]">
          {data.length} scans
        </span>
      </div>

      {data.length > 1 ? (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
            <defs>
              <linearGradient id="infGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-green)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--color-green)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              tick={{ fontSize: 11, fill: 'var(--color-mute)', fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={{ stroke: 'var(--color-hairline)' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: 'var(--color-mute)', fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="infection"
              stroke="var(--color-green)"
              strokeWidth={1.5}
              fill="url(#infGrad)"
              dot={false}
              activeDot={{ r: 4, fill: 'var(--color-green)', strokeWidth: 0 }}
              animationDuration={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[180px] flex items-center justify-center text-[13px] text-[var(--color-mute)]">
          Need at least 2 scans to display a trend.
        </div>
      )}
    </div>
  );
}
