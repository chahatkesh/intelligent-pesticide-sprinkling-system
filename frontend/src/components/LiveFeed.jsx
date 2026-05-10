import { useState, useEffect } from 'react';
import { Camera, CameraOff, Loader2, AlertCircle } from 'lucide-react';

export default function LiveFeed({ latestImage, isScanning, esp32Connected, plantType, isLeaf, message }) {
  const [showScanLine, setShowScanLine] = useState(false);

  useEffect(() => {
    if (isScanning) {
      setShowScanLine(true);
      const timer = setTimeout(() => setShowScanLine(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] shadow-[var(--shadow-md)] h-full min-h-[320px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-hairline)]">
        <div className="flex items-center gap-2">
          <Camera size={14} className="text-[var(--color-mute)]" />
          <span className="text-[13px] font-medium tracking-[-0.2px]">Live Feed</span>
          {plantType && (
            <span className="ml-2 px-2 py-[2px] rounded-[var(--radius-pill)] bg-[var(--color-green-soft)] text-[11px] font-mono text-[var(--color-green)]">
              {plantType}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-[6px] h-[6px] rounded-full ${esp32Connected ? 'bg-[var(--color-green)] animate-pulse-dot' : 'bg-[var(--color-error)]'}`} />
          <span className="text-[11px] font-mono text-[var(--color-mute)]">
            {esp32Connected ? 'live' : 'offline'}
          </span>
        </div>
      </div>

      {/* Image Area */}
      <div className="flex-1 relative flex items-center justify-center p-5 bg-[var(--color-canvas-soft-2)]">
        {latestImage ? (
          <>
            <img
              src={`data:image/jpeg;base64,${latestImage}`}
              alt="Plant capture"
              className="max-w-full max-h-[260px] rounded-[var(--radius-md)] object-contain"
            />
            {showScanLine && (
              <div className="absolute inset-5 rounded-[var(--radius-md)] overflow-hidden pointer-events-none">
                <div className="absolute left-0 right-0 h-[2px] bg-[var(--color-green)]/60 scan-animation" />
              </div>
            )}
            {isLeaf === false && message && (
              <div className="absolute bottom-7 left-7 right-7 bg-[var(--color-ink)] rounded-[var(--radius-md)] px-4 py-3 flex items-start gap-2.5 shadow-[var(--shadow-xl)]">
                <AlertCircle size={14} className="text-[var(--color-warning)] shrink-0 mt-0.5" />
                <p className="text-[12px] text-[var(--color-on-primary)] leading-[16px]">{message}</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {isScanning ? (
              <Loader2 size={32} className="animate-spin text-[var(--color-mute)]" />
            ) : (
              <CameraOff size={32} className="text-[var(--color-hairline-strong)]" />
            )}
            <span className="text-[13px] text-[var(--color-mute)]">
              {isScanning ? 'Capturing image...' : 'No image captured yet'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
