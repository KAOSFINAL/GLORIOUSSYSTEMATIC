import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

const daily = {
  temperature: [
    { t: "00:00", v: 25.1 }, { t: "04:00", v: 24.8 }, { t: "08:00", v: 25.9 },
    { t: "12:00", v: 27.2 }, { t: "16:00", v: 26.5 }, { t: "20:00", v: 25.8 }, { t: "24:00", v: 25.2 },
  ],
  humidity: [
    { t: "00:00", v: 70 }, { t: "04:00", v: 72 }, { t: "08:00", v: 69 },
    { t: "12:00", v: 65 }, { t: "16:00", v: 68 }, { t: "20:00", v: 71 }, { t: "24:00", v: 70 },
  ],
  waterLevel: [
    { t: "00:00", v: 78 }, { t: "04:00", v: 76 }, { t: "08:00", v: 75 },
    { t: "12:00", v: 74 }, { t: "16:00", v: 75 }, { t: "20:00", v: 76 }, { t: "24:00", v: 75 },
  ],
  ph: [
    { t: "00:00", v: 6.1 }, { t: "04:00", v: 6.2 }, { t: "08:00", v: 6.3 },
    { t: "12:00", v: 6.2 }, { t: "16:00", v: 6.1 }, { t: "20:00", v: 6.2 }, { t: "24:00", v: 6.2 },
  ],
  ec: [
    { t: "00:00", v: 1.7 }, { t: "04:00", v: 1.8 }, { t: "08:00", v: 1.8 },
    { t: "12:00", v: 1.9 }, { t: "16:00", v: 1.8 }, { t: "20:00", v: 1.7 }, { t: "24:00", v: 1.8 },
  ],
  solar: [
    { t: "00:00", v: 60 }, { t: "04:00", v: 55 }, { t: "08:00", v: 70 },
    { t: "12:00", v: 95 }, { t: "16:00", v: 88 }, { t: "20:00", v: 75 }, { t: "24:00", v: 65 },
  ],
};

const monthly = {
  temperature: Array.from({ length: 30 }, (_, i) => ({ t: `${i+1}`, v: parseFloat((24 + Math.sin(i * 0.4) * 2.5).toFixed(1)) })),
  humidity:    Array.from({ length: 30 }, (_, i) => ({ t: `${i+1}`, v: Math.round(65 + Math.sin(i * 0.3) * 8) })),
  waterLevel:  Array.from({ length: 30 }, (_, i) => ({ t: `${i+1}`, v: Math.round(70 + Math.sin(i * 0.5) * 10) })),
  ph:          Array.from({ length: 30 }, (_, i) => ({ t: `${i+1}`, v: parseFloat((6 + Math.sin(i * 0.2) * 0.3).toFixed(1)) })),
  ec:          Array.from({ length: 30 }, (_, i) => ({ t: `${i+1}`, v: parseFloat((1.6 + Math.sin(i * 0.3) * 0.3).toFixed(1)) })),
  solar:       Array.from({ length: 30 }, (_, i) => ({ t: `${i+1}`, v: Math.round(60 + Math.sin(i * 0.4) * 25) })),
};

const metrics = [
  { key: "temperature", label: "Temperature", unit: "°C",    delta: "+5.2%", up: true,  val: "26.5" },
  { key: "humidity",    label: "Humidity",    unit: "%",     delta: "−2.1%", up: false, val: "68" },
  { key: "waterLevel",  label: "Water Level", unit: "%",     delta: "+3.8%", up: true,  val: "75" },
  { key: "ph",          label: "pH Level",    unit: "",      delta: "+1.3%", up: true,  val: "6.2" },
  { key: "ec",          label: "EC Level",    unit: "mS/cm", delta: "−0.4%", up: false, val: "1.8" },
  { key: "solar",       label: "Solar",       unit: "%",     delta: "+4.7%", up: true,  val: "85" },
];

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-2 py-1.5 rounded-lg text-xs"
      style={{ background: "var(--surface)", border: "1px solid var(--rim)", color: "var(--gold)", fontFamily: "Space Mono, monospace" }}>
      {label}: <strong>{payload[0].value}</strong>
    </div>
  );
};

export default function Reports() {
  const [mode, setMode] = useState<"Daily" | "Monthly">("Daily");
  const [selected, setSelected] = useState("temperature");

  const data = mode === "Daily" ? daily : monthly;
  const current = metrics.find(m => m.key === selected)!;
  const chartData = (data as any)[selected];

  return (
    <div className="min-h-full pb-4" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-widest uppercase animate-fade-in"
            style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
            Sensor Analytics
          </p>
          <h1 className="text-3xl mt-0.5 animate-slide-up" style={{ fontFamily: "Fraunces, serif", color: "var(--cream)" }}>
            Reports
          </h1>
        </div>
        <div className="flex rounded-xl overflow-hidden animate-fade-in"
          style={{ border: "1px solid var(--rim)" }}>
          {(["Daily", "Monthly"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                fontFamily: "Space Mono, monospace",
                background: mode === m ? "linear-gradient(135deg, #f59e0b, #f97316)" : "transparent",
                color: mode === m ? "#1a0a00" : "var(--muted)",
              }}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Metric selector */}
      <div className="px-5 flex gap-2 overflow-x-auto pb-1 mb-4 animate-slide-up delay-100">
        {metrics.map(m => (
          <button key={m.key} onClick={() => setSelected(m.key)}
            className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-all"
            style={{
              background: selected === m.key ? "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.15))" : "var(--faint)",
              border: `1px solid ${selected === m.key ? "rgba(245,158,11,0.4)" : "var(--rim)"}`,
              color: selected === m.key ? "var(--gold)" : "var(--muted)",
              fontFamily: "Space Mono, monospace",
            }}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Big chart */}
      <div className="px-5 mb-5 animate-slide-up delay-200">
        <div className="flex items-end gap-2 mb-1">
          <span className="text-4xl font-semibold" style={{ color: "var(--cream)", fontFamily: "Fraunces, serif" }}>
            {current.val}
          </span>
          <span className="text-base mb-1" style={{ color: "var(--muted)" }}>{current.unit}</span>
          <span className="mb-1 text-sm font-semibold ml-2" style={{ color: current.up ? "var(--gold)" : "var(--tangerine)" }}>
            {current.up ? "▲" : "▼"} {current.delta}
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          {current.label} · {mode}
        </p>
        <div style={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="grad-main" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(253,240,232,0.04)" vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 9, fill: "#7a4a55", fontFamily: "Space Mono, monospace" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 9, fill: "#7a4a55", fontFamily: "Space Mono, monospace" }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={2} fill="url(#grad-main)" dot={false} activeDot={{ r: 4, fill: "#f59e0b" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-5" style={{ height: 1, background: "var(--rim)" }} />

      {/* Mini chart grid */}
      <div className="px-5 mb-3 animate-slide-up delay-300">
        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          All Sensors
        </p>
        <div className="grid grid-cols-2 gap-0"
          style={{ border: "1px solid var(--rim)", borderRadius: 12, overflow: "hidden" }}>
          {metrics.map((m, i) => {
            const d = (data as any)[m.key];
            const col = i % 2;
            const row = Math.floor(i / 2);
            return (
              <button key={m.key} onClick={() => setSelected(m.key)}
                className="p-3 text-left transition-colors"
                style={{
                  background: selected === m.key ? "rgba(245,158,11,0.06)" : "transparent",
                  borderRight: col === 0 ? "1px solid var(--rim)" : "none",
                  borderBottom: row < 2 ? "1px solid var(--rim)" : "none",
                }}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px]" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>{m.label}</span>
                  <span className="text-[10px]" style={{ color: m.up ? "var(--gold)" : "var(--tangerine)", fontFamily: "Space Mono, monospace" }}>
                    {m.up ? "▲" : "▼"}
                  </span>
                </div>
                <div className="flex items-baseline gap-0.5 mb-1.5">
                  <span className="text-lg font-semibold" style={{ color: "var(--cream)", fontFamily: "Fraunces, serif" }}>{m.val}</span>
                  <span className="text-[9px]" style={{ color: "var(--muted)" }}>{m.unit}</span>
                </div>
                <div style={{ height: 36 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={d} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id={`g-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={1.5} fill={`url(#g-${m.key})`} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
