import { useState, useEffect } from "react";
import { Camera, RefreshCw, Maximize2, Clock, Leaf } from "lucide-react";

const captures = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=500&fit=crop&auto=format",
    time: "9:30 AM",
    status: "Healthy",
    conf: "92%",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop&auto=format",
    time: "8:00 AM",
    status: "Healthy",
    conf: "89%",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=800&h=500&fit=crop&auto=format",
    time: "6:30 AM",
    status: "Monitor",
    conf: "74%",
  },
];

export default function Webcam() {
  const [scanning, setScanning] = useState(false);
  const [scanY, setScanY] = useState(0);
  const [active, setActive] = useState(0);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    let frame: number;
    let start = performance.now();
    const step = (now: number) => {
      const elapsed = (now - start) % 2000;
      setScanY((elapsed / 2000) * 100);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [scanning]);

  const handleCapture = () => {
    setScanning(true);
    setCaptured(false);
    setTimeout(() => {
      setScanning(false);
      setCaptured(true);
    }, 2000);
  };

  return (
    <div className="min-h-full pb-4" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <p className="text-[10px] tracking-widest uppercase animate-fade-in"
          style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          Live Feed
        </p>
        <h1 className="text-3xl mt-0.5 animate-slide-up" style={{ fontFamily: "Fraunces, serif", color: "var(--cream)" }}>
          Webcam
        </h1>
      </div>

      {/* Live viewer */}
      <div className="mx-5 mb-5 relative overflow-hidden rounded-2xl animate-slide-up delay-100"
        style={{ height: 240, background: "#0a0405" }}>
        <img
          src={captures[active].url}
          alt="Live hydroponics feed"
          className="w-full h-full object-cover"
          style={{ opacity: scanning ? 0.6 : 1, transition: "opacity 0.3s" }}
        />

        {/* Scan line overlay */}
        {scanning && (
          <>
            <div className="absolute inset-0" style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,158,11,0.04) 2px, rgba(245,158,11,0.04) 4px)",
            }} />
            <div className="absolute left-0 right-0 h-0.5 pointer-events-none"
              style={{
                top: `${scanY}%`,
                background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.8), transparent)",
                boxShadow: "0 0 12px rgba(245,158,11,0.6)",
                transition: "top 0.016s linear",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-sm font-bold tracking-widest"
                style={{ color: "var(--gold)", fontFamily: "Space Mono, monospace", textShadow: "0 0 12px rgba(245,158,11,0.8)" }}>
                SCANNING...
              </div>
            </div>
          </>
        )}

        {/* Corner brackets */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map(pos => {
          const [v, h] = pos.split("-");
          return (
            <div key={pos} className="absolute w-5 h-5"
              style={{
                [v]: 10, [h]: 10,
                borderTop: v === "top" ? `2px solid rgba(245,158,11,0.6)` : "none",
                borderBottom: v === "bottom" ? `2px solid rgba(245,158,11,0.6)` : "none",
                borderLeft: h === "left" ? `2px solid rgba(245,158,11,0.6)` : "none",
                borderRight: h === "right" ? `2px solid rgba(245,158,11,0.6)` : "none",
              }}
            />
          );
        })}

        {/* Live badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full"
          style={{ background: "rgba(22,10,12,0.8)", border: "1px solid rgba(245,158,11,0.3)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-breathe" style={{ background: "var(--tangerine)" }} />
          <span className="text-[9px] font-bold tracking-widest" style={{ color: "var(--cream)", fontFamily: "Space Mono, monospace" }}>LIVE</span>
        </div>

        {/* Timestamp */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5"
          style={{ background: "rgba(22,10,12,0.75)", padding: "4px 8px", borderRadius: 6 }}>
          <Clock size={10} style={{ color: "var(--muted)" }} />
          <span className="text-[10px]" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>Today, 9:41 AM</span>
        </div>

        {/* Result badge */}
        {captured && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full animate-slide-up"
            style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.4)" }}>
            <Leaf size={10} style={{ color: "var(--gold)" }} />
            <span className="text-[10px] font-bold" style={{ color: "var(--gold)", fontFamily: "Space Mono, monospace" }}>HEALTHY 92%</span>
          </div>
        )}
      </div>

      {/* Capture button */}
      <div className="flex items-center justify-center gap-6 mb-6 animate-slide-up delay-200">
        <button onClick={() => setActive((active + 1) % captures.length)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ border: "1px solid var(--rim)", background: "var(--faint)" }}>
          <RefreshCw size={16} style={{ color: "var(--muted)" }} />
        </button>

        <button onClick={handleCapture} disabled={scanning}
          className="relative w-18 h-18 rounded-full flex items-center justify-center transition-transform active:scale-90"
          style={{
            width: 72, height: 72,
            background: scanning ? "var(--surface)" : "linear-gradient(135deg, #f59e0b, #f97316)",
            boxShadow: scanning ? "none" : "0 0 32px rgba(245,158,11,0.5)",
          }}>
          {scanning
            ? <RefreshCw size={24} style={{ color: "var(--muted)", animation: "spin 1s linear infinite" }} />
            : <Camera size={24} style={{ color: "#1a0a00" }} />}
          {/* Pulse ring */}
          {!scanning && (
            <span className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(245,158,11,0.4)", animation: "pulse-ring 1.5s ease-out infinite" }} />
          )}
        </button>

        <button
          className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ border: "1px solid var(--rim)", background: "var(--faint)" }}>
          <Maximize2 size={16} style={{ color: "var(--muted)" }} />
        </button>
      </div>

      {/* Recent captures */}
      <div className="px-5 animate-slide-up delay-300">
        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
          Recent Captures
        </p>
        <div className="flex flex-col gap-0">
          {captures.map((cap, i) => (
            <button key={cap.id} onClick={() => setActive(i)}
              className="flex items-center gap-3 py-3 transition-opacity"
              style={{
                borderBottom: i < captures.length - 1 ? "1px solid var(--rim)" : "none",
                opacity: active === i ? 1 : 0.55,
              }}>
              <div className="w-14 h-10 rounded-lg overflow-hidden shrink-0 relative"
                style={{ border: active === i ? "1.5px solid var(--gold)" : "1px solid transparent" }}>
                <img src={cap.url} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium" style={{ color: "var(--cream)" }}>
                  Capture — {cap.time}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
                  CNN: {cap.status} · {cap.conf}
                </p>
              </div>
              {active === i && (
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
