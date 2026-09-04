import { useEffect, useState } from "react";
import { Bell, MapPin, Droplets, Wind, Thermometer, Zap, FlaskConical, Waves, Sun, Leaf } from "lucide-react";

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target * 10) / 10);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

const sensors = [
  { icon: Thermometer, label: "Temp",    value: 26.5, unit: "°C",    status: "Normal",   ok: true },
  { icon: Droplets,    label: "Humidity",value: 68,   unit: "%",     status: "Normal",   ok: true },
  { icon: FlaskConical,label: "pH",      value: 6.2,  unit: "",      status: "Good",     ok: true },
  { icon: Zap,         label: "EC",      value: 1.8,  unit: "mS/cm", status: "Good",     ok: true },
  { icon: Waves,       label: "Water",   value: 75,   unit: "%",     status: "Good",     ok: true },
  { icon: Sun,         label: "Solar",   value: 85,   unit: "%",     status: "Charging", ok: true },
];

function SensorTile({ sensor, delay }: { sensor: typeof sensors[0]; delay: string }) {
  const Icon = sensor.icon;
  const displayed = useCountUp(sensor.value, 1000);
  return (
    <div
      className={`animate-slide-up ${delay} flex flex-col gap-1.5 py-4 px-3`}
      style={{
        borderRight: "1px solid var(--rim)",
        borderBottom: "1px solid var(--rim)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <Icon size={11} style={{ color: "var(--muted)" }} />
        <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          {sensor.label}
        </span>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-xl font-semibold" style={{ color: "var(--cream)", fontFamily: "Fraunces, serif" }}>
          {displayed % 1 === 0 ? Math.round(displayed) : displayed.toFixed(1)}
        </span>
        {sensor.unit && (
          <span className="text-[10px]" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
            {sensor.unit}
          </span>
        )}
      </div>
      <span className="text-[10px]" style={{ color: sensor.ok ? "var(--gold)" : "var(--tangerine)", fontFamily: "Space Mono, monospace" }}>
        {sensor.status}
      </span>
    </div>
  );
}

export default function Home() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-full pb-4" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest uppercase animate-fade-in"
            style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
            Smart Hydroponics
          </p>
          <h1 className="text-3xl mt-0.5 animate-slide-up"
            style={{ fontFamily: "Fraunces, serif", color: "var(--cream)" }}>
            {greeting} <span className="shimmer-text">Juan</span>
          </h1>
        </div>
        <div className="relative mt-1 animate-fade-in">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "var(--faint)", border: "1px solid var(--rim)" }}>
            <Bell size={18} style={{ color: "var(--cream)" }} />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
            style={{ background: "var(--tangerine)", color: "#1a0500" }}>3</span>
        </div>
      </div>

      {/* Weather banner */}
      <div className="mx-5 mb-5 px-4 py-4 rounded-2xl animate-slide-up delay-100"
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(249,115,22,0.08) 100%)",
          border: "1px solid rgba(245,158,11,0.2)",
        }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-light" style={{ color: "var(--cream)", fontFamily: "Fraunces, serif" }}>28°</span>
              <span className="text-base" style={{ color: "var(--muted)" }}>C</span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Partly Cloudy</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={10} style={{ color: "var(--gold)" }} />
              <span className="text-[10px]" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
                Green Farm, Nueva Ecija
              </span>
            </div>
          </div>
          <div className="text-right space-y-1.5">
            <div className="flex items-center gap-2 justify-end">
              <Droplets size={11} style={{ color: "var(--gold)" }} />
              <span className="text-xs" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>65%</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Wind size={11} style={{ color: "var(--gold)" }} />
              <span className="text-xs" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>12 km/h</span>
            </div>
            <div className="flex items-center gap-1 justify-end">
              <span className="text-[10px] font-semibold" style={{ color: "var(--gold)" }}>● Live</span>
              <span className="w-2 h-2 rounded-full animate-breathe" style={{ background: "var(--gold)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div className="px-5 mb-3 flex items-center justify-between animate-slide-up delay-150">
        <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          System Overview
        </span>
        <span className="text-[10px]" style={{ color: "var(--tangerine)", fontFamily: "Space Mono, monospace" }}>
          9:41 AM
        </span>
      </div>

      {/* Sensor grid — 3 cols, open layout no card backgrounds */}
      <div className="mx-5"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid var(--rim)", borderLeft: "1px solid var(--rim)" }}>
        {sensors.map((s, i) => (
          <SensorTile
            key={s.label}
            sensor={s}
            delay={`delay-${[200,250,300,200,250,300][i]}`}
          />
        ))}
      </div>

      {/* System status */}
      <div className="px-5 mt-5 animate-slide-up delay-400">
        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          System Status
        </p>
        {[
          { label: "Pump",     status: "Running", ok: true },
          { label: "Fan",      status: "Running", ok: true },
          { label: "LED Grow", status: "Running", ok: true },
          { label: "Misting",  status: "Stopped", ok: false },
        ].map((item, i) => (
          <div key={item.label}
            className="flex items-center justify-between py-3"
            style={{ borderBottom: i < 3 ? "1px solid var(--rim)" : "none" }}>
            <span className="text-sm" style={{ color: "var(--cream)" }}>{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{
                background: item.ok ? "var(--gold)" : "var(--muted)",
                animation: item.ok ? "breathe 2s ease-in-out infinite" : "none",
              }} />
              <span className="text-xs" style={{ color: item.ok ? "var(--gold)" : "var(--muted)", fontFamily: "Space Mono, monospace" }}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CNN prediction strip */}
      <div className="mx-5 mt-5 px-4 py-3 rounded-xl animate-slide-up delay-500 flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(245,158,11,0.06))",
          border: "1px solid rgba(249,115,22,0.2)",
        }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(245,158,11,0.15)" }}>
          <Leaf size={16} style={{ color: "var(--gold)" }} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold" style={{ color: "var(--gold)" }}>Crop Health — Healthy</p>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>CNN Confidence: 92%</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold" style={{ color: "var(--tangerine)" }}>92%</p>
        </div>
      </div>
    </div>
  );
}
