"use client";

import { forwardRef, memo } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import { cls } from "@/lib/utils";

interface FeatureCardThreeItemData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

interface FeatureCardThreeItemProps {
  item: FeatureCardThreeItemData;
  isActive?: boolean;
  onItemClick?: () => void;
  className?: string;
  itemContentClassName?: string;
  itemTitleClassName?: string;
  itemDescriptionClassName?: string;
}

const MASK_GRADIENT = "linear-gradient(to bottom, transparent, black 60%)";

const FeatureCardThreeItem = memo(
  forwardRef<HTMLDivElement, FeatureCardThreeItemProps>(
    (
      {
        item,
        isActive = false,
        onItemClick,
        className = "",
        itemContentClassName = "",
        itemTitleClassName = "",
        itemDescriptionClassName = "",
      },
      ref
    ) => {
      return (
        <div
          ref={ref}
          className={cls(
            "feature-card-three-item relative overflow-hidden h-full rounded-theme-capped group",
            isActive && "is-active",
            className
          )}
          role="article"
          aria-label={`${item.title} - Feature ${item.id}`}
          tabIndex={0}
          onClick={onItemClick}
        >
          <div
            className="feature-card-three-item-box absolute top-6 left-6 z-10 flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]"
          >
            <div
              className="relative h-8 aspect-square rounded-theme bg-background transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              <div
                className="feature-card-three-item-box-front absolute w-full h-full rounded-theme bg-background flex items-center justify-center [backface-visibility:hidden]"
              >
                <p
                  className="feature-card-three-description text-foreground truncate"
                >
                  {item.id}
                </p>
              </div>
              <div
                className="feature-card-three-item-box-back absolute w-full h-full rounded-theme bg-background flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
              >
                <Info
                  className="w-1/2 h-1/2 text-foreground"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <Image
            src={item.imageSrc}
            alt={item.imageAlt || item.title}
            width={1920}
            height={1080}
            className="relative z-1 object-cover rounded-theme-capped h-full w-full  "
            unoptimized={item.imageSrc.startsWith('http') || item.imageSrc.startsWith('//')}
            aria-hidden={item.imageAlt === ""}
          />

          <div
            className="absolute z-10 bottom-0 left-0 right-0 h-30 backdrop-blur-xl opacity-100"
            style={{ maskImage: MASK_GRADIENT }}
            aria-hidden="true"
          />

          <div
            className="feature-card-three-content-wrapper absolute z-20 transition-all duration-400 ease-out flex flex-col gap-2 group-hover:[transform:translateY(var(--hover-translate-y))]"
            style={{
              top: "var(--content-top-position)",
              left: "calc((var(--vw-1_5) * 1.5))",
              width: "calc(100% - (var(--vw-1_5) * 3))",
            }}
          >
            <div className="feature-card-three-title-row">
              <h2
                className={cls(
                  "feature-card-three-title font-semibold leading-[110%] transition-colors text-background group-hover:text-foreground",
                  itemTitleClassName
                )}
              >
                {item.title}
              </h2>
            </div>
            <div
              className="feature-card-three-description-wrapper transition-all duration-400 ease-out opacity-0 group-hover:opacity-100"
            >
              <p
                className={cls("feature-card-three-description leading-[120%] w-full text-foreground", itemDescriptionClassName)}
              >
                {item.description}
              </p>
            </div>
          </div>

          <div
            className={cls(
              "feature-card-three-reveal-bg !absolute left-0 bottom-0 card backdrop-blur-xs z-10 rounded-theme-capped transition-all duration-400 ease-out translate-y-full right-0 group-hover:translate-y-0 group-hover:left-[calc(var(--vw-1_5)*0.75)] group-hover:bottom-[calc(var(--vw-1_5)*0.75)] group-hover:right-[calc(var(--vw-1_5)*0.75)]",
              itemContentClassName
            )}
            style={{
              height: "var(--reveal-bg-height)",
            }}
          ></div>
        </div>
      );
    }
  )
);

FeatureCardThreeItem.displayName = "FeatureCardThreeItem";

export default FeatureCardThreeItem;
