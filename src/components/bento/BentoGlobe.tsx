"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cls } from "@/lib/utils";
import createGlobe, { COBEOptions } from "cobe";

// Helper function to convert CSS color to RGB array
const getRGBFromCSSVar = (varName: string): [number, number, number] => {
  if (typeof window === "undefined") return [0.5, 0.5, 0.5];

  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

  // Handle CSS named colors by creating a temporary element to get computed RGB
  if (value && !value.startsWith("#") && !value.startsWith("rgb") && !value.includes("%") && !value.match(/^\d+\s+\d+\s+\d+$/)) {
    const temp = document.createElement("div");
    temp.style.color = value;
    document.body.appendChild(temp);
    const computed = getComputedStyle(temp).color;
    document.body.removeChild(temp);

    if (computed && computed.startsWith("rgb")) {
      const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1]) / 255;
        const g = parseInt(match[2]) / 255;
        const b = parseInt(match[3]) / 255;
        return [r, g, b];
      }
    }
  }

  // Handle rgba/rgb format (e.g., "rgba(18, 0, 6, .9)" or "rgb(255, 255, 255)")
  if (value.startsWith("rgb")) {
    const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const r = parseInt(match[1]) / 255;
      const g = parseInt(match[2]) / 255;
      const b = parseInt(match[3]) / 255;
      return [r, g, b];
    }
  }

  // Handle hex format (e.g., "#ffffff", "#ffffffaa", or shorthand "#fff", "#f0f")
  if (value.startsWith("#")) {
    let hex = value.replace("#", "");
    // Expand shorthand hex (e.g., "93f" -> "9933ff")
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split("").map(c => c + c).join("").substring(0, 6);
    }
    // Take only first 6 characters (ignore alpha channel if present)
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    return [r, g, b];
  }

  // Handle HSL format (e.g., "0 0% 100%")
  if (value.includes("%")) {
    const [h, s, l] = value.split(/\s+/).map(v => parseFloat(v));
    // Convert HSL to RGB
    const sNorm = s / 100;
    const lNorm = l / 100;
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lNorm - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    return [(r + m), (g + m), (b + m)];
  }

  // Handle RGB format (e.g., "255 255 255")
  const [r, g, b] = value.split(/\s+/).map(v => parseFloat(v) / 255);
  return [r || 0.5, g || 0.5, b || 0.5];
};

const getGlobeConfig = (): COBEOptions => ({
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: getRGBFromCSSVar("--secondary-cta"),
  markerColor: getRGBFromCSSVar("--primary-cta"),
  glowColor: getRGBFromCSSVar("--card"),
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
});

interface GlobeProps {
  className?: string;
  config?: COBEOptions;
}

const GlobeComponent = ({
  className = "",
  config,
}: GlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<{ destroy: () => void } | null>(null);
  const phiRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [globeConfig, setGlobeConfig] = useState<COBEOptions | null>(null);

  const onRender = useCallback(
    (state: Record<string, number>) => {
      phiRef.current += 0.005;
      state.phi = phiRef.current;
      state.width = dimensions.width * 2;
      state.height = dimensions.width * 2;
    },
    [dimensions]
  );

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      const newWidth = canvasRef.current.offsetWidth;
      setDimensions(prev => {
        if (prev.width === newWidth) return prev;
        return { width: newWidth, height: newWidth };
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  useEffect(() => {
    // Initialize globe config with CSS variables
    const defaultConfig = getGlobeConfig();
    setGlobeConfig(config ? { ...defaultConfig, ...config } : defaultConfig);
  }, [config]);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || !globeConfig) return;

    if (globeRef.current) {
      globeRef.current.destroy();
    }

    globeRef.current = createGlobe(canvasRef.current, {
      ...globeConfig,
      width: dimensions.width * 2,
      height: dimensions.width * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [dimensions, globeConfig, onRender]);

  return (
    <div
      className={cls(
        "absolute inset-0 mx-auto w-full aspect-square",
        className
      )}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
      />
    </div>
  );
};

GlobeComponent.displayName = "BentoGlobe";

export const BentoGlobe = React.memo(GlobeComponent);
