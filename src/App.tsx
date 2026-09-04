import { useState, useEffect } from "react";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Webcam from "./screens/Webcam";
import Reports from "./screens/Reports";
import Settings from "./screens/Settings";
import BottomNav from "./components/BottomNav";

type Screen = "login" | "register" | "home" | "webcam" | "reports" | "settings";
const mainScreens: Screen[] = ["home", "webcam", "reports", "settings"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [prev, setPrev] = useState<Screen | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (next: Screen) => {
    if (next === screen) return;
    setTransitioning(true);
    setTimeout(() => {
      setPrev(screen);
      setScreen(next);
      setTransitioning(false);
    }, 180);
  };

  const isMain = mainScreens.includes(screen);

  return (
    <div
      className="flex flex-col h-full max-w-md mx-auto relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Ambient glow top-left */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
        }}
      />
      {/* Ambient glow bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-48 h-48 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
        }}
      />

      <div
        className="flex-1 overflow-y-auto relative"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateX(16px) scale(0.98)" : "translateX(0) scale(1)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
        }}
      >
        {screen === "login"    && <Login    onLogin={() => navigate("home")} onRegister={() => navigate("register")} />}
        {screen === "register" && <Register onRegister={() => navigate("home")} onBack={() => navigate("login")} />}
        {screen === "home"     && <Home />}
        {screen === "webcam"   && <Webcam />}
        {screen === "reports"  && <Reports />}
        {screen === "settings" && <Settings onLogout={() => navigate("login")} />}
      </div>

      {isMain && (
        <BottomNav active={screen} onChange={(s) => navigate(s as Screen)} />
      )}
    </div>
  );
}
