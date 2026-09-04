import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dailyData = {
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

const monthlyData = {
  temperature: Array.from({ length: 30 }, (_, i) => ({ t: `D${i + 1}`, v: 24 + Math.sin(i * 0.4) * 2 + Math.random() * 0.5 })),
  humidity: Array.from({ length: 30 }, (_, i) => ({ t: `D${i + 1}`, v: 65 + Math.sin(i * 0.3) * 5 + Math.random() })),
  waterLevel: Array.from({ length: 30 }, (_, i) => ({ t: `D${i + 1}`, v: 70 + Math.sin(i * 0.5) * 8 })),
  ph: Array.from({ length: 30 }, (_, i) => ({ t: `D${i + 1}`, v: 6 + Math.sin(i * 0.2) * 0.3 })),
  ec: Array.from({ length: 30 }, (_, i) => ({ t: `D${i + 1}`, v: 1.6 + Math.sin(i * 0.3) * 0.3 })),
  solar: Array.from({ length: 30 }, (_, i) => ({ t: `D${i + 1}`, v: 60 + Math.sin(i * 0.4) * 25 })),
};

const metrics = [
  { key: "temperature", label: "Temperature", unit: "°C", delta: "+5.2%", up: true },
  { key: "humidity", label: "Humidity", unit: "%", delta: "−2.1%", up: false },
  { key: "waterLevel", label: "Water Level", unit: "%", delta: "+3.8%", up: true },
  { key: "ph", label: "pH Level", unit: "", delta: "+1.3%", up: true },
  { key: "ec", label: "EC Level", unit: "mS/cm", delta: "−0.4%", up: false },
  { key: "solar", label: "Solar Battery", unit: "%", delta: "+4.7%", up: true },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-2 py-1.5 text-xs rounded"
        style={{
          background: "var(--secondary)",
          border: "1px solid var(--border)",
          color: "var(--primary)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>{label}: </span>
        <span className="font-semibold">{payload[0].value}</span>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [mode, setMode] = useState<"Daily" | "Monthly">("Daily");
  const data = mode === "Daily" ? dailyData : monthlyData;

  return (
    <div className="min-h-full pb-4" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-5 flex items-start justify-between">
        <div>
          <p
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
          >
            Sensor Data Analytics
          </p>
          <h1
            className="text-3xl leading-none"
            style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
          >
            Analytics
          </h1>
        </div>
        {/* Toggle */}
        <div
          className="flex mt-2 rounded overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {(["Daily", "Monthly"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                background: mode === m ? "var(--primary)" : "transparent",
                color: mode === m ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2">
        {metrics.map((metric, i) => {
          const chartData = (data as any)[metric.key];
          const lastVal = chartData[chartData.length - 1].v;
          const col = i % 2;
          const row = Math.floor(i / 2);
          const totalRows = Math.ceil(metrics.length / 2);

          return (
            <div
              key={metric.key}
              className="px-4 pt-4 pb-3"
              style={{
                borderRight: col === 0 ? "1px solid var(--border)" : "none",
                borderBottom: row < totalRows - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div className="flex items-start justify-between mb-1">
                <span
                  className="text-xs leading-tight"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
                >
                  {metric.label}
                  {metric.unit && ` (${metric.unit})`}
                </span>
                <span
                  className="text-[10px] font-semibold"
                  style={{
                    color: metric.up ? "var(--primary)" : "var(--accent)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {metric.up ? "▲" : "▼"} {metric.delta}
                </span>
              </div>
              <p
                className="text-2xl font-semibold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                {typeof lastVal === "number" ? lastVal.toFixed(metric.key === "ec" || metric.key === "ph" ? 1 : 0) : lastVal}
                <span
                  className="text-xs ml-0.5"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
                >
                  {metric.unit}
                </span>
              </p>
              <div style={{ height: 60 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id={`grad-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" hide />
                    <YAxis hide domain={["auto", "auto"]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#4ade80"
                      strokeWidth={1.5}
                      fill={`url(#grad-${metric.key})`}
                      dot={false}
                      activeDot={{ r: 3, fill: "#4ade80" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
