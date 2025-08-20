// frontend/src/components/HeroBackground3D.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // gunakan versi slim agar ringan & stabil

export default function HeroBackground3D() {
  const particlesInit = async (engine) => {
    // loadSlim memastikan tidak ada error checkVersion
    await loadSlim(engine);
  };

  return (
    <Particles
      id="hero-particles"
      init={particlesInit}
      className="absolute inset-0"
      options={{
        background: {
          color: "#1e3a8a", // biru polos (deep blue)
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 100,
            density: { enable: true, area: 800 },
          },
          color: {
            value: ["#38bdf8", "#3b82f6"], // neon blue shades
          },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 4 } },
          links: {
            enable: true,
            color: "#3b82f6",
            distance: 150,
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            outModes: { default: "out" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: {
              distance: 140,
              links: { opacity: 0.4 },
            },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}