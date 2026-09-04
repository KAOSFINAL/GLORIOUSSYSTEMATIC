import { useState } from "react";
import { Home, Camera, BarChart2, Settings } from "lucide-react";

const items = [
  { key: "home",     icon: Home,     label: "Home" },
  { key: "webcam",   icon: Camera,   label: "Webcam" },
  { key: "reports",  icon: BarChart2, label: "Reports" },
  { key: "settings", icon: Settings, label: "Settings" },
];

interface Props { active: string; onChange: (key: string) => void; }

export default function BottomNav({ active, onChange }: Props) {
  const [popped, setPopped] = useState<string | null>(null);

  const handle = (key: string) => {
    setPopped(key);
    setTimeout(() => setPopped(null), 500);
    onChange(key);
  };

  return (
    <div className="shrink-0 flex items-center justify-around px-2 pt-2 pb-3"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--rim)",
      }}>
      {items.map(({ key, icon: Icon, label }) => {
        const isActive = active === key;
        const isPop = popped === key;
        return (
          <button key={key} onClick={() => handle(key)}
            className="flex flex-col items-center gap-1 px-4 py-1 relative"
            style={{
              animation: isPop ? "navPop 0.5s cubic-bezier(0.22,1,0.36,1)" : "none",
            }}>
            {/* Active indicator dot */}
            {isActive && (
              <span className="absolute -top-1 w-1 h-1 rounded-full"
                style={{ background: "var(--gold)", left: "50%", transform: "translateX(-50%)" }} />
            )}
            <div className="relative">
              <Icon
                size={22}
                strokeWidth={isActive ? 2 : 1.5}
                style={{ color: isActive ? "var(--gold)" : "var(--muted)", transition: "color 0.2s" }}
              />
              {/* Active glow */}
              {isActive && (
                <span className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)",
                    transform: "scale(1.8)",
                  }}
                />
              )}
            </div>
            <span
              className="text-[9px] tracking-wider uppercase font-medium"
              style={{
                color: isActive ? "var(--gold)" : "var(--muted)",
                fontFamily: "Space Mono, monospace",
                transition: "color 0.2s",
              }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
