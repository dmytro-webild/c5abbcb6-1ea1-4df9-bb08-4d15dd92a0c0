"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";

interface RayConfig {
    width: number;
    opacity: number;
    rotation: number;
    scale?: number;
    animationDuration: number;
    animationDelay: number;
}

interface LightSourceConfig {
    width: number;
    height?: number;
    opacity: number;
    top: number;
}

interface DownwardRaysBackgroundProps {
    animated: boolean;
    showGrid: boolean;
    className?: string;
    containerClassName?: string;
}

const rays: RayConfig[] = [
    { width: 35, opacity: 1, rotation: -20, animationDuration: 4, animationDelay: 0 },
    { width: 35, opacity: 0.6, rotation: -12, animationDuration: 3.5, animationDelay: 0.5 },
    { width: 20, opacity: 0.45, rotation: -5, scale: 0.90, animationDuration: 5, animationDelay: 1.2 },
    { width: 15, opacity: 0.625, rotation: -3, animationDuration: 3, animationDelay: 0.3 },
    { width: 40, opacity: 0.1, rotation: 0, scale: 0.79, animationDuration: 4.5, animationDelay: 0.8 },
    { width: 20, opacity: 0.525, rotation: 3, animationDuration: 3.2, animationDelay: 1.5 },
    { width: 15, opacity: 0.725, rotation: 5, scale: 0.90, animationDuration: 4.2, animationDelay: 0.2 },
    { width: 35, opacity: 0.6, rotation: 12, animationDuration: 3.8, animationDelay: 1 },
    { width: 35, opacity: 1, rotation: 20, animationDuration: 4, animationDelay: 0.7 },
];

const lightSources: LightSourceConfig[] = [
    { width: 1198, opacity: 0.025, top: -352 },
    { width: 865, height: 929, opacity: 0.1, top: -252 },
    { width: 865, height: 929, opacity: 0.1, top: -252 },
];

const DownwardRaysBackground = ({
    animated,
    showGrid,
    className = "",
    containerClassName = "",
}: DownwardRaysBackgroundProps) => {
    return (
        <div
            className={cls("absolute inset-0 z-0 overflow-hidden pointer-events-none select-none", className)}
            aria-hidden="true"
        >
            {animated && (
                <style>
                    {`
                        @keyframes rayPulse {
                            0%, 100% { opacity: 0; }
                            50% { opacity: var(--target-opacity); }
                        }
                    `}
                </style>
            )}

            {showGrid && (
                <div
                    className="absolute inset-0 -z-10 bg-background [mask-image:radial-gradient(50%_50%_at_50%_0%,white_0%,transparent_100%)]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, color-mix(in srgb, var(--color-background-accent) 20%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-background-accent) 10%, transparent) 1px, transparent 1px)",
                        backgroundSize: "10vw 10vw",
                        backgroundRepeat: "repeat",
                    }}
                />
            )}

            <div
                className={cls(
                    "absolute overflow-hidden w-[1142px] h-[129vh] -top-[400px] left-1/2 -translate-x-1/2",
                    "blur-[16px]",
                    "[mask:radial-gradient(50%_109%,#000_0%,#000000f6_0%,transparent_96%)]",
                    containerClassName
                )}
            >
                {rays.map((ray, index) => (
                    <div
                        key={`ray-${index}`}
                        className="absolute overflow-hidden origin-top -top-[352px] -bottom-[920px] [background:radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
                        style={{
                            width: `${ray.width}px`,
                            left: `calc(50% - ${ray.width / 2}px)`,
                            transform: `${ray.scale ? `scale(${ray.scale})` : ""} rotate(${ray.rotation}deg)`,
                            ...(animated
                                ? {
                                    "--target-opacity": ray.opacity,
                                    animation: `rayPulse ${ray.animationDuration}s ease-in-out ${ray.animationDelay}s infinite both`,
                                }
                                : {
                                    opacity: ray.opacity,
                                }),
                        } as React.CSSProperties}
                    />
                ))}

                {lightSources.map((source, index) => (
                    <div
                        key={`light-source-${index}`}
                        className="absolute overflow-hidden [background:radial-gradient(50%_50%_at_50%_50%,var(--color-background-accent)_0%,transparent_100%)]"
                        style={{
                            width: `${source.width}px`,
                            height: source.height ? `${source.height}px` : undefined,
                            top: `${source.top}px`,
                            bottom: source.height ? undefined : "-46px",
                            left: `calc(50% - ${source.width / 2}px)`,
                            opacity: source.opacity,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

DownwardRaysBackground.displayName = "DownwardRaysBackground";

export default memo(DownwardRaysBackground);
