"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type MarqueeItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "text"; text: string }
  | { type: "text-icon"; text: string; icon: LucideIcon };

interface LogoMarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  showCard?: boolean;
  className?: string;
  itemClassName?: string;
  cardClassName?: string;
  imageClassName?: string;
  textClassName?: string;
  iconClassName?: string;
}

const LogoMarquee = ({
  items,
  speed = 30,
  showCard = true,
  className = "",
  itemClassName = "",
  cardClassName = "",
  imageClassName = "",
  textClassName = "",
  iconClassName = "",
}: LogoMarqueeProps) => {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className={cls("mask-padding-x", className)}>
      <Marquee gradient={false} speed={speed}>
        {repeatedItems.map((item, i) => {
          const hasCard = item.type !== "image" && showCard;
          return (
            <div className={cls(hasCard ? "mx-2" : "mx-6", itemClassName)} key={i}>
              <div className={cls(hasCard ? "card px-4 py-3 mb-1 rounded-theme" : "", cardClassName)}>
                {item.type === "image" && (
                  <Image
                    width={500}
                    height={500}
                    src={item.src}
                    alt={item.alt || `Logo ${i + 1}`}
                    className={cls("relative z-1 h-6 w-auto", imageClassName)}
                    unoptimized={item.src.startsWith("http") || item.src.startsWith("//")}
                  />
                )}
                {item.type === "text" && (
                  <p className={cls("relative z-1 text-foreground text-sm", textClassName)}>
                    {item.text}
                  </p>
                )}
                {item.type === "text-icon" && (
                  <span className={cls("relative z-1 flex items-center gap-2 text-foreground text-sm", textClassName)}>
                    <item.icon className={cls("h-[1em] w-auto", iconClassName)} strokeWidth={1.5} />
                    {item.text}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

LogoMarquee.displayName = "LogoMarquee";

export default LogoMarquee;
