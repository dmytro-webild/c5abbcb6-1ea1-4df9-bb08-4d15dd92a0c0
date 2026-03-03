"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

const AuroraBackground = ({
  className = "",
}: AuroraBackgroundProps) => {
  return (
    <div className={cls("fixed inset-0 z-0 w-full h-full bg-background", className)}>
      <div className="absolute top-0 left-0 w-full h-full z-10 backdrop-blur-3xl" ></div>
      {/* top center */}
      <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-[120%] w-[9vw] h-[110vh] bg-background-accent/15   -rotate-[52.5deg] rounded-[100%]" />
      {/* top right */}
      <div className="absolute top-[-20vh] right-[2.5vw] -translate-x-[0%] w-[12.5vw] h-[100vh] bg-background-accent/15   -rotate-[60deg] rounded-[100%]" />
      {/* center left */}
      <div className="absolute top-[-20vh] left-[2vw] -translate-x-[0%] w-[15vw] h-[150vh] bg-background-accent/20   -rotate-[45deg] rounded-[100%]" />
      {/* top left */}
      <div className="absolute top-[-30vh] left-0 -translate-x-[0%] w-[10vw] h-[70vh] bg-background-accent/15   -rotate-[45deg] rounded-[100%]" />
      {/* bottom center */}
      <div className="absolute bottom-[-40vh] left-0 -translate-x-[0%] w-[120vw] h-[50vh] bg-background-accent/10   -rotate-[20deg] rounded-[100%]" />
    </div>
  );
};

AuroraBackground.displayName = "AuroraBackground";

export default memo(AuroraBackground);
