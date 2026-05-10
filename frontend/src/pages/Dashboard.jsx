import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import LiveFeed from '../components/LiveFeed';
import InfectionGauge from '../components/InfectionGauge';
import TrendChart from '../components/TrendChart';
import ScanHistory from '../components/ScanHistory';
import ControlPanel from '../components/ControlPanel';
import AlertBanner from '../components/AlertBanner';
import { useWebSocket } from '../hooks/useWebSocket';

export default function Dashboard() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [settings, setSettings] = useState({
    auto_scan: 'false',
    scan_interval: '30',
    alert_threshold: '50',
  });
  const [infectionPercent, setInfectionPercent] = useState(0);
  const [latestImage, setLatestImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [trendData, setTrendData] = useState([]);
  const [history, setHistory] = useState([]);
  const [esp32Connected, setEsp32Connected] = useState(false);
  const [alert, setAlert] = useState(false);
  const [plantType, setPlantType] = useState(null);
  const [isLeaf, setIsLeaf] = useState(true);
  const [scanMessage, setScanMessage] = useState(null);
  const [hasScanned, setHasScanned] = useState(false);

  const { lastMessage, isConnected } = useWebSocket();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    fetchSettings();
    fetchHistory();
    fetchStats();
    checkStatus();
    const statusInterval = setInterval(checkStatus, 10000);
    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    if (!lastMessage) return;

    if (lastMessage.type === 'scan_result') {
      setInfectionPercent(lastMessage.infection_percent);
      setLatestImage(lastMessage.image);
      setIsScanning(false);
      setAlert(lastMessage.alert);
      setPlantType(lastMessage.plant_type);
      setIsLeaf(lastMessage.is_leaf);
      setScanMessage(lastMessage.message);
      setHasScanned(true);

      if (!lastMessage.is_leaf && lastMessage.message) {
        toast(lastMessage.message, { duration: 5000, icon: '⚠️' });
      } else if (lastMessage.plant_type) {
        toast.success(
          `${lastMessage.plant_type} — ${lastMessage.infection_percent}% infection`,
          { duration: 4000 }
        );
      }

      if (lastMessage.alert) {
        toast.error(
          `Infection ${lastMessage.infection_percent}% exceeds threshold`,
          { duration: 5000 }
        );
      }

      fetchHistory();
      fetchStats();
    } else if (lastMessage.type === 'error') {
      setIsScanning(false);
      toast.error(lastMessage.message);
    }
  }, [lastMessage]);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
    } catch (e) { /* will retry */ }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history?limit=20');
      const data = await res.json();
      setHistory(data.records);
    } catch (e) { /* will retry */ }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setTrendData(data.trend_data);
    } catch (e) { /* will retry */ }
  };

  const checkStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setEsp32Connected(data.esp32_connected);
    } catch (e) {
      setEsp32Connected(false);
    }
  };

  const handleCapture = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/capture', { method: 'POST' });
      const data = await res.json();
      if (data.type === 'error') {
        toast.error(data.message);
        setIsScanning(false);
      }
    } catch (e) {
      toast.error('Failed to capture image');
      setIsScanning(false);
    }
  };

  const handleSettingsChange = async (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
    } catch (e) {
      toast.error('Failed to update settings');
    }
  };

  const handleExport = () => {
    if (history.length === 0) return;
    const csv = [
      'ID,Timestamp,Plant Type,Infection %,Is Leaf',
      ...history.map(r => `${r.id},${r.timestamp},${r.plant_type || 'N/A'},${r.infection_percent},${r.is_leaf}`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scan_history_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        esp32Connected={esp32Connected}
        isWsConnected={isConnected}
      />

      <main className="flex-1 min-w-0 p-6 lg:p-8 overflow-y-auto">
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'text-[13px]',
            style: {
              background: 'var(--color-canvas)',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
            },
          }}
        />

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-[24px] font-semibold tracking-[-0.96px]">Dashboard.</h1>
          <p className="text-[14px] text-[var(--color-body)] mt-1">
            Monitor plant health and detect leaf infections in real-time.
          </p>
        </div>

        {/* Alert */}
        {alert && (
          <div className="mb-4">
            <AlertBanner
              alert={alert}
              threshold={parseInt(settings.alert_threshold)}
              infectionPercent={infectionPercent}
            />
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
          <LiveFeed
            latestImage={latestImage}
            isScanning={isScanning}
            esp32Connected={esp32Connected}
            plantType={plantType}
            isLeaf={isLeaf}
            message={scanMessage}
          />
          <InfectionGauge
            infectionPercent={infectionPercent}
            plantType={plantType}
            isLeaf={isLeaf}
            hasScanned={hasScanned}
            onCapture={handleCapture}
            isScanning={isScanning}
          />
        </div>

        {/* Trend */}
        <div className="mb-4">
          <TrendChart data={trendData} />
        </div>

        {/* Controls */}
        <div className="mb-4">
          <ControlPanel
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        </div>

        {/* History */}
        <ScanHistory records={history} onExport={handleExport} />
      </main>
    </div>
  );
}
