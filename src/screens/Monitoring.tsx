import { useState } from "react";
import { RefreshCw, Thermometer, Droplets, FlaskConical, Zap, Waves } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const tabs = ["All Sensors", "Environment", "Water Quality", "System"];

const allSensors = [
  {
    id: "temp",
    icon: Thermometer,
    label: "Temperature",
    value: "26.5",
    unit: "°C",
    status: "Normal",
    statusOk: true,
    category: "Environment",
    data: [26, 26.2, 26.1, 26.4, 26.5, 26.3, 26.5, 26.6, 26.4, 26.5],
  },
  {
    id: "humidity",
    icon: Droplets,
    label: "Humidity",
    value: "68",
    unit: "%",
    status: "Normal",
    statusOk: true,
    category: "Environment",
    data: [66, 67, 68, 67, 69, 68, 67, 68, 68, 68],
  },
  {
    id: "ph",
    icon: FlaskConical,
    label: "pH Level",
    value: "6.2",
    unit: "",
    status: "Good",
    statusOk: true,
    category: "Water Quality",
    data: [6.1, 6.2, 6.1, 6.3, 6.2, 6.2, 6.1, 6.2, 6.3, 6.2],
  },
  {
    id: "ec",
    icon: Zap,
    label: "EC (Conductivity)",
    value: "1.8",
    unit: "mS/cm",
    status: "Good",
    statusOk: true,
    category: "Water Quality",
    data: [1.7, 1.8, 1.8, 1.9, 1.8, 1.7, 1.8, 1.8, 1.9, 1.8],
  },
  {
    id: "wtemp",
    icon: Thermometer,
    label: "Water Temperature",
    value: "23.4",
    unit: "°C",
    status: "Normal",
    statusOk: true,
    category: "Water Quality",
    data: [23, 23.2, 23.3, 23.4, 23.4, 23.3, 23.4, 23.5, 23.4, 23.4],
  },
  {
    id: "wlevel",
    icon: Waves,
    label: "Water Level",
    value: "75",
    unit: "%",
    status: "Good",
    statusOk: true,
    category: "Water Quality",
    data: [74, 75, 74, 75, 76, 75, 75, 74, 75, 75],
  },
];

export default function Monitoring() {
  const [activeTab, setActiveTab] = useState("All Sensors");
  const [refreshing, setRefreshing] = useState(false);

  const filtered = activeTab === "All Sensors"
    ? allSensors
    : allSensors.filter((s) =>
        activeTab === "Environment"
          ? s.category === "Environment"
          : activeTab === "Water Quality"
          ? s.category === "Water Quality"
          : s.category === "System"
      );

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="min-h-full pb-4" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-5 flex items-start justify-between">
        <div>
          <p
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
          >
            Real-time Sensor Data
          </p>
          <h1
            className="text-3xl leading-none"
            style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
          >
            Monitoring
          </h1>
        </div>
        <button
          onClick={handleRefresh}
          className="mt-1 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "var(--foreground)" }}
        >
          <RefreshCw
            size={20}
            className={refreshing ? "animate-spin" : ""}
            style={{ color: "var(--foreground)" }}
          />
        </button>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-0 px-5 mb-1 overflow-x-auto"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="px-3 pb-3 text-xs whitespace-nowrap font-medium transition-colors relative"
            style={{
              color: activeTab === t ? "var(--primary)" : "var(--muted-foreground)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
            }}
          >
            {t}
            {activeTab === t && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "var(--primary)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Sensor list */}
      <div>
        {filtered.map((sensor, i) => {
          const Icon = sensor.icon;
          const chartData = sensor.data.map((v, idx) => ({ v, idx }));
          return (
            <div
              key={sensor.id}
              className="px-5 py-4 flex items-center gap-4"
              style={{
                borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full"
                style={{
                  background: "rgba(74,222,128,0.07)",
                  border: "1px solid rgba(74,222,128,0.15)",
                }}
              >
                <Icon size={16} style={{ color: "var(--primary)" }} />
              </div>

              {/* Label + value */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs mb-0.5"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
                >
                  {sensor.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
                    {sensor.value}
                  </span>
                  {sensor.unit && (
                    <span
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
                    >
                      {sensor.unit}
                    </span>
                  )}
                </div>
              </div>

              {/* Sparkline */}
              <div className="w-20 h-8 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="rgba(74,222,128,0.5)"
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Status + time */}
              <div className="text-right shrink-0">
                <p
                  className="text-xs font-medium mb-0.5"
                  style={{
                    color: sensor.statusOk ? "var(--primary)" : "var(--accent)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {sensor.status}
                </p>
                <p
                  className="text-[10px]"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
                >
                  9:41 AM
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
