"use client";
import { useEffect } from "react";

export default function ParticlesBackground() {
  useEffect(() => {
    const container = document.querySelector("#particles");
    if (!container) return;

    const numParticles = 25;
    for (let i = 0; i < numParticles; i++) {
      const dot = document.createElement("div");
      dot.className = "particle";
      dot.style.width = `${Math.random() * 10 + 4}px`;
      dot.style.height = dot.style.width;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.animationDelay = `${Math.random() * 6}s`;
      container.appendChild(dot);
    }
  }, []);

  return <div id="particles" className="absolute inset-0 overflow-hidden"></div>;
}
