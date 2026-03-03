import CircleGradientBackground from "@/components/background/CircleGradientBackground";
import AuroraBackground from "@/components/background/AuroraBackground";
import FloatingGradientBackground from "@/components/background/floatingGradientBackground/FloatingGradientBackground";
import NoiseBackground from "@/components/background/NoiseBackground";
import NoiseDiagonalGradientBackground from "@/components/background/NoiseDiagonalGradientBackground";
import FluidBackground from "@/components/background/FluidBackground";
import BlurBottomBackground from "@/components/background/BlurBottomBackground";
import GridBackround from "@/components/background/GridBackround";
import type { BackgroundType } from "./types";

interface BackgroundComponentProps {
  className?: string;
}

export const backgroundComponents: Record<BackgroundType, React.ComponentType<BackgroundComponentProps> | null> = {
  none: null,
  circleGradient: CircleGradientBackground,
  aurora: AuroraBackground,
  floatingGradient: FloatingGradientBackground,
  noise: NoiseBackground,
  noiseDiagonalGradient: NoiseDiagonalGradientBackground,
  fluid: FluidBackground,
  blurBottom: BlurBottomBackground,
  grid: GridBackround,
};
