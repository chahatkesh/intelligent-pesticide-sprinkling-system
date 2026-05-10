import { Leaf, Users, GraduationCap, Radio, Moon, Sun } from 'lucide-react';

const TEAM = [
  { name: 'Bhavesh Singh', id: '23106030' },
  { name: 'Chahat Kesharwani', id: '23106032' },
  { name: 'Sadgi Saraswat', id: '23106078' },
  { name: 'Vanshika Soni', id: '23106099' },
];

export default function Sidebar({ isDark, onToggleTheme, esp32Connected, isWsConnected }) {
  return (
    <aside className="w-[280px] h-screen sticky top-0 flex flex-col border-r border-[var(--color-hairline)] bg-[var(--color-canvas)] shrink-0 overflow-y-auto">

      {/* Logo / Title */}
      <div className="px-5 pt-6 pb-5 border-b border-[var(--color-hairline)]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--color-ink)] flex items-center justify-center">
            <Leaf size={16} className="text-[var(--color-on-primary)]" />
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.3px]">Plant Monitor</span>
        </div>
        <p className="text-[12px] text-[var(--color-mute)] leading-[16px] font-mono">
          INTELLIGENT PESTICIDE SPRINKLING SYSTEM
        </p>
      </div>

      {/* Status */}
      <div className="px-5 py-4 border-b border-[var(--color-hairline)]">
        <p className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-mute)] mb-3">Status</p>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[var(--color-body)]">ESP32-CAM</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-[6px] h-[6px] rounded-full ${esp32Connected ? 'bg-[var(--color-green)] animate-pulse-dot' : 'bg-[var(--color-error)]'}`} />
              <span className="text-[11px] font-mono text-[var(--color-mute)]">
                {esp32Connected ? 'online' : 'offline'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[var(--color-body)]">WebSocket</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-[6px] h-[6px] rounded-full ${isWsConnected ? 'bg-[var(--color-green)] animate-pulse-dot' : 'bg-[var(--color-error)]'}`} />
              <span className="text-[11px] font-mono text-[var(--color-mute)]">
                {isWsConnected ? 'connected' : 'disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="px-5 py-4 border-b border-[var(--color-hairline)]">
        <p className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-mute)] mb-3">Project</p>
        <p className="text-[13px] font-medium text-[var(--color-ink)] leading-[18px] mb-2">
          Minor Project Report — Phase II
        </p>
        <p className="text-[12px] text-[var(--color-body)] leading-[16px]">
          B.Tech 6th Semester
        </p>
        <p className="text-[12px] text-[var(--color-mute)]">
          Academic Year 2025–2026
        </p>
      </div>

      {/* Team */}
      <div className="px-5 py-4 border-b border-[var(--color-hairline)]">
        <div className="flex items-center gap-1.5 mb-3">
          <Users size={11} className="text-[var(--color-mute)]" />
          <p className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-mute)]">Team</p>
        </div>
        <div className="space-y-2">
          {TEAM.map((m) => (
            <div key={m.id} className="flex items-center justify-between">
              <span className="text-[13px] text-[var(--color-ink)]">{m.name}</span>
              <span className="text-[11px] font-mono text-[var(--color-mute)]">{m.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Supervisor */}
      <div className="px-5 py-4 border-b border-[var(--color-hairline)]">
        <div className="flex items-center gap-1.5 mb-3">
          <GraduationCap size={11} className="text-[var(--color-mute)]" />
          <p className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-mute)]">Supervisor</p>
        </div>
        <p className="text-[13px] font-medium text-[var(--color-ink)]">Dr. Karan Veer</p>
        <p className="text-[12px] text-[var(--color-body)] mt-0.5">Assistant Professor</p>
        <p className="text-[12px] text-[var(--color-mute)] mt-0.5">Dept. of Instrumentation & Control Engg.</p>
      </div>

      {/* Institute */}
      <div className="px-5 py-4 flex-1">
        <p className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-mute)] mb-2">Institute</p>
        <p className="text-[12px] text-[var(--color-body)] leading-[18px]">
          Dr. B. R. Ambedkar National Institute of Technology, Jalandhar
        </p>
        <p className="text-[11px] text-[var(--color-mute)] mt-1">Punjab — 144008</p>
      </div>

      {/* Theme Toggle */}
      <div className="px-5 py-4 border-t border-[var(--color-hairline)]">
        <button
          onClick={onToggleTheme}
          className="flex items-center gap-2 text-[13px] text-[var(--color-body)] hover:text-[var(--color-ink)] transition-colors"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
          <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </div>
    </aside>
  );
}
