"use client";
import { useEffect, useRef } from "react";

export default function BGPointer() {
  const raf = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = document.documentElement;

    const schedule = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        root.style.setProperty("--mx", `${target.current.x}px`);
        root.style.setProperty("--my", `${target.current.y}px`);
      });
    };

    const onMove = (x: number, y: number) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.current.x = (x - cx) * 0.06; // чувствительность
      target.current.y = (y - cy) * 0.06;
      schedule();
    };

    const pm = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const orient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const x = (e.gamma / 45) * (window.innerWidth / 2);
      const y = (e.beta / 45) * (window.innerHeight / 2);
      onMove(x, y);
    };

    window.addEventListener("pointermove", pm, { passive: true });
    window.addEventListener("touchmove", tm, { passive: true });
    window.addEventListener("deviceorientation", orient, { passive: true });

    return () => {
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("deviceorientation", orient);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return null;
}
