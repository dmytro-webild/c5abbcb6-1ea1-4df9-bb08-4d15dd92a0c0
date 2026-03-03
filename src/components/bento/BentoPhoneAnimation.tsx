"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

export type PhoneApp = {
  name: string;
  icon: LucideIcon;
};

export type PhoneApps8 = [PhoneApp, PhoneApp, PhoneApp, PhoneApp, PhoneApp, PhoneApp, PhoneApp, PhoneApp];

interface BentoPhoneAnimationProps {
  statusIcon: LucideIcon;
  alertIcon: LucideIcon;
  alertTitle: string;
  alertMessage: string;
  apps: PhoneApps8;
  useInvertedBackground: InvertedBackground;
  className?: string;
}

const BentoPhoneAnimation = ({
  statusIcon: StatusIcon,
  alertIcon: AlertIcon,
  alertTitle,
  alertMessage,
  apps,
  className = "",
}: BentoPhoneAnimationProps) => {
  return (
    <div
      className={cls(
        "group/phone relative h-full flex flex-auto items-center justify-center overflow-hidden cursor-pointer",
        className
      )}
      style={{
        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
      }}
    >
      <div
        className={cls(
          "absolute inset-x-0 top-0 h-full overflow-hidden isolate",
          "pt-8 transition-[padding] duration-500 ease-out group-hover/phone:pt-0",
        )}
      >
        <div
          className={cls(
            "relative mx-auto card shadow h-100 w-[calc(100%-var(--vw-2)*2)] rounded-[3vw] p-2",
          )}
        >
          <div className="w-full min-w-0 relative h-full overflow-hidden secondary-button rounded-[2.6vw] p-8 pt-6" >
            <div
              className="relative z-10 mx-auto h-7 w-auto aspect-square card shadow flex items-center justify-center rounded-full"
            >
              <StatusIcon className="h-4/10 w-4/10 text-foreground transition-colors duration-300 group-hover/phone:text-primary-cta" />
            </div>
            <div
              className={cls(
                "absolute! left-8 right-8 z-2 gap-[0.5vw] p-3 card flex flex-row items-center rounded-theme-capped",
                "-translate-y-30 scale-90 blur-[2px] opacity-50",
                "transition-all duration-500 ease-out",
                "group-hover/phone:translate-y-0 group-hover/phone:scale-100 group-hover/phone:blur-none group-hover/phone:opacity-100",
              )}
              style={{ top: "calc(var(--vw-1_5) + var(--height-7) + var(--vw-1_5))" }}
            >
              <div
                className={cls(
                  "relative h-8 w-auto aspect-square primary-button flex shrink-0 items-center justify-center rounded-theme",
                )}
              >
                <AlertIcon className="h-4/10 w-4/10 text-primary-cta-text" />
              </div>
              <div className="min-w-0 flex flex-col gap-0">
                <h3
                  className={cls(
                    "text-sm leading-tight text-foreground",
                  )}
                >
                  {alertTitle}
                </h3>
                <p
                  className={cls(
                    "text-xs text-foreground/75 leading-tight truncate",
                  )}
                >
                  {alertMessage}
                </p>
              </div>
            </div>
            <div className="w-full min-w-0 grid grid-cols-4 gap-6 mt-6">
              {apps.map(({ name, icon: Icon }) => (
                <div key={name} className="w-full min-w-0 flex flex-col items-center gap-2">
                  <div className="aspect-square w-full primary-button rounded-theme-capped flex items-center justify-center">
                    <Icon className="h-2/5 w-2/5 text-primary-cta-text" strokeWidth={1.5} />
                  </div>
                  <p className="w-full text-xs text-foreground text-center truncate">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BentoPhoneAnimation.displayName = "BentoPhoneAnimation";

export default memo(BentoPhoneAnimation);
