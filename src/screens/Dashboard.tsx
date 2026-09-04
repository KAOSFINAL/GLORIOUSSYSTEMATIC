import { Bell, MapPin, Wind, Droplets, CloudRain, Zap, Leaf, Thermometer, FlaskConical, Waves, Sun, Fan, Camera } from "lucide-react";

const sensors = [
  { icon: Thermometer, label: "Temperature", value: "26.5", unit: "°C", status: "Normal", statusOk: true },
  { icon: Droplets, label: "Humidity", value: "68", unit: "%", status: "Normal", statusOk: true },
  { icon: Thermometer, label: "Water Temp", value: "23.4", unit: "°C", status: "Normal", statusOk: true },
  { icon: Waves, label: "Water Level", value: "75", unit: "%", status: "Good", statusOk: true },
  { icon: FlaskConical, label: "pH Level", value: "6.2", unit: "", status: "Good", statusOk: true },
  { icon: Zap, label: "EC Level", value: "1.8", unit: "mS/cm", status: "Good", statusOk: true },
  { icon: Sun, label: "Solar Battery", value: "85", unit: "%", status: "Charging", statusOk: true },
  { icon: Zap, label: "Pump", value: "ON", unit: "", status: "Running", statusOk: true },
  { icon: Fan, label: "Fan", value: "ON", unit: "", status: "Running", statusOk: true },
  { icon: Droplets, label: "Misting", value: "OFF", unit: "", status: "Stopped", statusOk: false },
  { icon: Sun, label: "LED Grow", value: "ON", unit: "", status: "Running", statusOk: true },
  { icon: Leaf, label: "CNN Predict", value: "Healthy", unit: "", status: "92% confidence", statusOk: true },
];

export default function Dashboard() {
  return (
    <div className="min-h-full pb-4" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-5 flex items-start justify-between">
        <div>
          <p
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
          >
            Smart Hydroponics System
          </p>
          <h1
            className="text-3xl leading-none"
            style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
          >
            Dashboard
          </h1>
        </div>
        <div className="relative mt-1">
          <Bell size={22} style={{ color: "var(--foreground)" }} />
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            3
          </span>
        </div>
      </div>

      {/* Weather strip */}
      <div
        className="mx-5 mb-6 px-4 py-4"
        style={{
          borderLeft: "2px solid var(--primary)",
          background: "rgba(74,222,128,0.04)",
          borderRadius: "0 4px 4px 0",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-light" style={{ color: "var(--foreground)" }}>28°C</span>
            <div>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Partly Cloudy</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={10} style={{ color: "var(--primary)" }} />
                <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>
                  Green Farm, Nueva Ecija
                </span>
              </div>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1.5 justify-end">
              <Droplets size={11} style={{ color: "var(--primary)" }} />
              <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>Humidity 65%</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <Wind size={11} style={{ color: "var(--primary)" }} />
              <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>Wind 12 km/h</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <CloudRain size={11} style={{ color: "var(--primary)" }} />
              <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>Rain 20%</span>
            </div>
          </div>
        </div>
        <p
          className="text-xs"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
        >
          Today, 9:41 AM
        </p>
      </div>

      {/* Section heading */}
      <div className="px-5 mb-4 flex items-center justify-between">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
        >
          System Overview
        </span>
        <span
          className="text-xs"
          style={{ color: "var(--primary)", fontFamily: "var(--font-mono)" }}
        >
          Live ●
        </span>
      </div>

      {/* Sensor grid */}
      <div className="px-5 grid grid-cols-3 gap-0">
        {sensors.map((s, i) => {
          const Icon = s.icon;
          const col = i % 3;
          const row = Math.floor(i / 3);
          const totalRows = Math.ceil(sensors.length / 3);
          return (
            <div
              key={s.label}
              className="py-4 px-2 flex flex-col gap-1"
              style={{
                borderRight: col < 2 ? "1px solid var(--border)" : "none",
                borderBottom: row < totalRows - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={12} style={{ color: "var(--muted-foreground)" }} />
                <span
                  className="text-[10px] truncate"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
                >
                  {s.label}
                </span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span
                  className="text-lg font-semibold leading-none"
                  style={{ color: "var(--foreground)" }}
                >
                  {s.value}
                </span>
                {s.unit && (
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
                  >
                    {s.unit}
                  </span>
                )}
              </div>
              <span
                className="text-[10px]"
                style={{
                  color: s.statusOk ? "var(--primary)" : "var(--accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {s.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Latest capture */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
          >
            Latest Capture
          </span>
          <div className="flex items-center gap-1.5">
            <Camera size={11} style={{ color: "var(--muted-foreground)" }} />
            <span
              className="text-xs"
              style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
            >
              Today, 9:30 AM
            </span>
          </div>
        </div>
        <div className="relative overflow-hidden" style={{ borderRadius: "4px", height: 180 }}>
          <img
            src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=400&fit=crop&auto=format"
            alt="Hydroponics lettuce growing under LED lights"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center gap-2"
            style={{ background: "linear-gradient(180deg, transparent, rgba(5,10,5,0.85))" }}
          >
            <Leaf size={12} style={{ color: "var(--primary)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>Healthy</span>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>· CNN Confidence 92%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
