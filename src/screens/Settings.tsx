import { useState } from "react";
import { ChevronRight, Bell, Wifi, Moon, LogOut, User, MapPin, Droplets, Thermometer, Info } from "lucide-react";

interface Props { onLogout: () => void; }

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className="w-11 h-6 rounded-full relative transition-colors"
      style={{ background: on ? "linear-gradient(135deg, #f59e0b, #f97316)" : "var(--surface)" }}>
      <span className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
        style={{ left: on ? "calc(100% - 22px)" : 2, background: on ? "#1a0a00" : "var(--muted)" }} />
    </button>
  );
}

function Row({ icon: Icon, label, right, onClick, danger }: {
  icon: any; label: string; right?: React.ReactNode; onClick?: () => void; danger?: boolean;
}) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-3 py-4 transition-opacity hover:opacity-80"
      style={{ borderBottom: "1px solid var(--rim)" }}>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: danger ? "rgba(249,115,22,0.12)" : "rgba(245,158,11,0.1)" }}>
        <Icon size={15} style={{ color: danger ? "var(--tangerine)" : "var(--gold)" }} />
      </div>
      <span className="flex-1 text-sm text-left" style={{ color: danger ? "var(--tangerine)" : "var(--cream)" }}>
        {label}
      </span>
      {right ?? <ChevronRight size={14} style={{ color: "var(--muted)" }} />}
    </button>
  );
}

export default function Settings({ onLogout }: Props) {
  const [notifs, setNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoCapture, setAutoCapture] = useState(true);
  const [wifi, setWifi] = useState(true);

  return (
    <div className="min-h-full pb-4" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-6">
        <p className="text-[10px] tracking-widest uppercase animate-fade-in"
          style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          Configuration
        </p>
        <h1 className="text-3xl mt-0.5 animate-slide-up" style={{ fontFamily: "Fraunces, serif", color: "var(--cream)" }}>
          Settings
        </h1>
      </div>

      {/* Profile */}
      <div className="mx-5 mb-6 px-4 py-4 rounded-2xl flex items-center gap-4 animate-slide-up delay-100"
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(249,115,22,0.06))",
          border: "1px solid rgba(245,158,11,0.2)",
        }}>
        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0"
          style={{ border: "2px solid rgba(245,158,11,0.3)" }}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-base" style={{ color: "var(--cream)", fontFamily: "Fraunces, serif" }}>Juan dela Cruz</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>juan@hydrosense.app</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={9} style={{ color: "var(--gold)" }} />
            <span className="text-[10px]" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
              Green Farm, Nueva Ecija
            </span>
          </div>
        </div>
        <ChevronRight size={16} style={{ color: "var(--muted)" }} />
      </div>

      {/* Farm config */}
      <div className="px-5 mb-1 animate-slide-up delay-200">
        <p className="text-[10px] tracking-widest uppercase mb-1"
          style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          Farm Configuration
        </p>
        <Row icon={Thermometer} label="Sensor Thresholds" />
        <Row icon={Droplets} label="Irrigation Schedule" />
        <Row icon={MapPin} label="Farm Location" />
      </div>

      {/* Preferences */}
      <div className="px-5 mt-5 mb-1 animate-slide-up delay-300">
        <p className="text-[10px] tracking-widest uppercase mb-1"
          style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          Preferences
        </p>
        <Row icon={Bell} label="Push Notifications"
          right={<Toggle on={notifs} onChange={() => setNotifs(!notifs)} />}
          onClick={() => setNotifs(!notifs)}
        />
        <Row icon={Moon} label="Dark Mode"
          right={<Toggle on={darkMode} onChange={() => setDarkMode(!darkMode)} />}
          onClick={() => setDarkMode(!darkMode)}
        />
        <Row icon={Wifi} label="Auto-Connect WiFi"
          right={<Toggle on={wifi} onChange={() => setWifi(!wifi)} />}
          onClick={() => setWifi(!wifi)}
        />
        <Row icon={User} label="Auto Capture"
          right={<Toggle on={autoCapture} onChange={() => setAutoCapture(!autoCapture)} />}
          onClick={() => setAutoCapture(!autoCapture)}
        />
      </div>

      {/* About */}
      <div className="px-5 mt-5 mb-1 animate-slide-up delay-400">
        <p className="text-[10px] tracking-widest uppercase mb-1"
          style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          About
        </p>
        <Row icon={Info} label="App Version — v2.4.1" right={<span className="text-xs" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>v2.4.1</span>} />
      </div>

      {/* Logout */}
      <div className="px-5 mt-5 animate-slide-up delay-500">
        <Row icon={LogOut} label="Sign Out" onClick={onLogout} danger />
      </div>
    </div>
  );
}
