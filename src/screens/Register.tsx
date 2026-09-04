import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, ChevronDown } from "lucide-react";

interface Props { onRegister: () => void; onBack: () => void; }

const roles = ["Farmer", "Agronomist", "Researcher", "Administrator"];

function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-widest uppercase mb-1.5"
        style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>
        {label}
      </label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full bg-transparent border-b py-2 text-sm outline-none placeholder:opacity-25"
        style={{ borderColor: value ? "var(--gold)" : "var(--rim)", color: "var(--cream)", transition: "border-color 0.2s" }}
      />
    </div>
  );
}

export default function Register({ onRegister, onBack }: Props) {
  const [form, setForm] = useState({ firstName:"", lastName:"", username:"", email:"", mobile:"", password:"", confirm:"" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState("Farmer");
  const [roleOpen, setRoleOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-5 flex items-center gap-4 animate-fade-in"
        style={{ borderBottom: "1px solid var(--rim)" }}>
        <button onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ background: "var(--faint)", border: "1px solid var(--rim)" }}>
          <ArrowLeft size={17} style={{ color: "var(--cream)" }} />
        </button>
        <div>
          <h1 className="text-2xl leading-none" style={{ fontFamily: "Fraunces, serif", color: "var(--cream)" }}>
            Create Account
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Fill in the details below</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 animate-slide-up delay-100">
          <Field label="First Name" value={form.firstName} onChange={set("firstName")} placeholder="Juan" />
          <Field label="Last Name"  value={form.lastName}  onChange={set("lastName")}  placeholder="Cruz" />
        </div>
        <div className="animate-slide-up delay-150">
          <Field label="Username" value={form.username} onChange={set("username")} placeholder="@farmerjuan" />
        </div>
        <div className="animate-slide-up delay-200">
          <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="juan@example.com" />
        </div>
        <div className="animate-slide-up delay-250">
          <Field label="Mobile" type="tel" value={form.mobile} onChange={set("mobile")} placeholder="+63 9XX XXX XXXX" />
        </div>

        {/* Password */}
        <div className="animate-slide-up delay-300">
          <label className="block text-[10px] tracking-widest uppercase mb-1.5"
            style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>Password</label>
          <div className="relative">
            <input type={showPass ? "text" : "password"} value={form.password} onChange={set("password")}
              placeholder="••••••••"
              className="w-full bg-transparent border-b py-2 text-sm outline-none placeholder:opacity-25 pr-8"
              style={{ borderColor: form.password ? "var(--gold)" : "var(--rim)", color: "var(--cream)", transition: "border-color 0.2s" }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-0 top-2 opacity-40 hover:opacity-100">
              {showPass ? <EyeOff size={15} style={{ color: "var(--cream)" }} /> : <Eye size={15} style={{ color: "var(--cream)" }} />}
            </button>
          </div>
        </div>

        <div className="animate-slide-up delay-350">
          <label className="block text-[10px] tracking-widest uppercase mb-1.5"
            style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>Confirm</label>
          <div className="relative">
            <input type={showConfirm ? "text" : "password"} value={form.confirm} onChange={set("confirm")}
              placeholder="••••••••"
              className="w-full bg-transparent border-b py-2 text-sm outline-none placeholder:opacity-25 pr-8"
              style={{
                borderColor: form.confirm
                  ? form.confirm === form.password ? "var(--gold)" : "var(--tangerine)"
                  : "var(--rim)",
                color: "var(--cream)", transition: "border-color 0.2s"
              }}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-0 top-2 opacity-40 hover:opacity-100">
              {showConfirm ? <EyeOff size={15} style={{ color: "var(--cream)" }} /> : <Eye size={15} style={{ color: "var(--cream)" }} />}
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="animate-slide-up delay-400 relative">
          <label className="block text-[10px] tracking-widest uppercase mb-1.5"
            style={{ color: "var(--muted)", fontFamily: "Space Mono, monospace" }}>Role</label>
          <button type="button" onClick={() => setRoleOpen(!roleOpen)}
            className="w-full flex items-center justify-between border-b py-2 text-sm"
            style={{ borderColor: "var(--rim)", color: "var(--cream)" }}>
            <span>{role}</span>
            <ChevronDown size={14} style={{ color: "var(--muted)", transform: roleOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {roleOpen && (
            <div className="absolute z-20 left-0 right-0 top-full mt-1 overflow-hidden rounded-lg animate-slide-up"
              style={{ background: "var(--surface)", border: "1px solid var(--rim)" }}>
              {roles.map(r => (
                <button key={r} type="button" onClick={() => { setRole(r); setRoleOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm transition-colors"
                  style={{ color: r === role ? "var(--gold)" : "var(--cream)", background: r === role ? "rgba(245,158,11,0.08)" : "transparent" }}>
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer animate-slide-up delay-400">
          <div onClick={() => setAgreed(!agreed)}
            className="mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center transition-all"
            style={{
              background: agreed ? "linear-gradient(135deg, #f59e0b, #f97316)" : "transparent",
              border: `1px solid ${agreed ? "var(--gold)" : "var(--muted)"}`,
            }}>
            {agreed && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#1a0a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            I agree to the{" "}
            <span style={{ color: "var(--gold)" }}>Terms &amp; Conditions</span>
            {" "}and{" "}
            <span style={{ color: "var(--gold)" }}>Privacy Policy</span>
          </span>
        </label>

        <button onClick={onRegister}
          className="animate-slide-up delay-500 w-full py-4 rounded-xl text-sm font-bold tracking-widest uppercase mt-1 transition-transform hover:scale-[0.98] active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #f97316)",
            color: "#1a0a00", fontFamily: "Space Mono, monospace",
            boxShadow: "0 4px 24px rgba(245,158,11,0.3)",
          }}>
          Create Account
        </button>

        <p className="text-center text-sm animate-slide-up delay-500" style={{ color: "var(--muted)" }}>
          Already have an account?{" "}
          <button onClick={onBack} className="font-bold" style={{ color: "var(--gold)" }}>Sign in</button>
        </p>
      </div>
    </div>
  );
}
