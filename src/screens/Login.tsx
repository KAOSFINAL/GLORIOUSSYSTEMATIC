import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

export default function Login({ onLogin, onRegister }: Props) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pressed, setPressed] = useState(false);

  const handleLogin = () => {
    setPressed(true);
    setTimeout(() => { setPressed(false); onLogin(); }, 300);
  };

  return (
    <div className="relative min-h-full flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <div className="relative h-72 shrink-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format"
          alt="Hydroponics farm"
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.7)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(22,10,12,0.35) 0%, rgba(22,10,12,0.75) 65%, #160a0c 100%)",
          }}
        />
        {/* Logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 gap-2">
          <div
            className="animate-float w-14 h-14 rounded-2xl flex items-center justify-center mb-1"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              boxShadow: "0 8px 32px rgba(245,158,11,0.4)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4C14 4 6 10 6 17a8 8 0 0016 0c0-7-8-13-8-13z" fill="white" opacity="0.9"/>
              <path d="M14 10v12M10 15l4-5 4 5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1
            className="text-3xl tracking-tight animate-slide-up"
            style={{ fontFamily: "Fraunces, serif", color: "var(--cream)" }}
          >
            HydroSense
          </h1>
          <p
            className="text-xs tracking-widest uppercase animate-slide-up delay-100"
            style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}
          >
            Smart Farm · AI Powered
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-6 pb-8 flex flex-col">
        <h2
          className="text-2xl mb-1 animate-slide-up delay-150"
          style={{ fontFamily: "Fraunces, serif", color: "var(--cream)" }}
        >
          Welcome back
        </h2>
        <p className="text-sm mb-7 animate-slide-up delay-200" style={{ color: "var(--muted)" }}>
          Sign in to monitor your farm
        </p>

        <div className="animate-slide-up delay-200 mb-5">
          <label className="block text-[10px] tracking-widest uppercase mb-2"
            style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>Email</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="farmer@example.com"
            className="w-full bg-transparent border-b py-2.5 text-sm outline-none placeholder:opacity-30"
            style={{ borderColor: email ? "var(--gold)" : "var(--rim)", color: "var(--cream)", transition: "border-color 0.2s" }}
          />
        </div>

        <div className="animate-slide-up delay-250 mb-7">
          <label className="block text-[10px] tracking-widest uppercase mb-2"
            style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent border-b py-2.5 text-sm outline-none placeholder:opacity-30 pr-8"
              style={{ borderColor: password ? "var(--gold)" : "var(--rim)", color: "var(--cream)", transition: "border-color 0.2s" }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-0 top-2.5 opacity-50 hover:opacity-100 transition-opacity">
              {showPass
                ? <EyeOff size={16} style={{ color: "var(--cream)" }} />
                : <Eye size={16} style={{ color: "var(--cream)" }} />}
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <button className="text-xs" style={{ color: "var(--gold)" }}>Forgot password?</button>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleLogin}
          className="animate-slide-up delay-300 w-full py-4 rounded-xl text-sm font-bold tracking-widest uppercase relative overflow-hidden mb-4"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #f97316)",
            color: "#1a0a00",
            fontFamily: "Space Mono, monospace",
            transform: pressed ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s ease",
            boxShadow: "0 4px 24px rgba(245,158,11,0.35)",
          }}
        >
          {pressed && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-full h-full absolute rounded-xl"
                style={{ background: "rgba(255,255,255,0.25)", animation: "ripple 0.4s ease-out" }} />
            </span>
          )}
          Sign In
        </button>

        <div className="flex items-center gap-3 mb-4 animate-slide-up delay-350">
          <div className="flex-1 h-px" style={{ background: "var(--rim)" }} />
          <span className="text-xs" style={{ color: "var(--muted)" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "var(--rim)" }} />
        </div>

        <button
          className="animate-slide-up delay-400 w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 mb-8 transition-opacity hover:opacity-80"
          style={{ border: "1px solid var(--rim)", color: "var(--cream)", background: "var(--faint)" }}
        >
          <GoogleIcon /> Continue with Google
        </button>

        <p className="text-center text-sm animate-slide-up delay-500" style={{ color: "var(--muted)" }}>
          No account?{" "}
          <button onClick={onRegister} className="font-bold" style={{ color: "var(--gold)" }}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2a10.34 10.34 0 00-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.658 14.252 17.64 11.945 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}
