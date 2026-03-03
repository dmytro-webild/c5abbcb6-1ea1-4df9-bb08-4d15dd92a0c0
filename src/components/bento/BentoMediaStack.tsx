"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";
import MediaContent from "@/components/shared/MediaContent";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

export type MediaStackItem = {
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
};

interface BentoMediaStackProps {
    items: [MediaStackItem, MediaStackItem, MediaStackItem];
    useInvertedBackground: InvertedBackground;
    className?: string;
}

const BentoMediaStack = ({
    items,
    className = "",
}: BentoMediaStackProps) => {
    return (
        <div
            className={cls("group/stack relative w-full h-full card shadow rounded-theme-capped flex items-center justify-center select-none", className)}
        >
            <div
                className={cls(
                    "absolute! w-3/5 2xl:w-1/2 aspect-[4/3] p-1 rounded-theme-capped overflow-hidden primary-button z-[1]",
                    "rotate-8 translate-x-[12%] -translate-y-[8%] transition-all duration-500 ease-out",
                    "2xl:translate-x-[8%] 2xl:-translate-y-[6%]",
                    "group-hover/stack:translate-x-[22%] group-hover/stack:rotate-12 group-hover/stack:-translate-y-[14%]",
                    "2xl:group-hover/stack:translate-x-[16%] 2xl:group-hover/stack:-translate-y-[10%]"
                )}
            >
                <MediaContent
                    imageSrc={items[2].imageSrc}
                    videoSrc={items[2].videoSrc}
                    imageAlt={items[2].imageAlt}
                    imageClassName="h-full rounded-[calc(var(--radius-theme-capped)*0.95)]!"
                />
            </div>
            <div
                className={cls(
                    "absolute! w-3/5 2xl:w-1/2 aspect-[4/3] p-1 rounded-theme-capped overflow-hidden primary-button z-[2]",
                    "-rotate-8 -translate-x-[12%] -translate-y-[8%] transition-all duration-500 ease-out",
                    "2xl:-translate-x-[8%] 2xl:-translate-y-[6%]",
                    "group-hover/stack:-translate-x-[22%] group-hover/stack:-rotate-12 group-hover/stack:-translate-y-[14%]",
                    "2xl:group-hover/stack:-translate-x-[16%] 2xl:group-hover/stack:-translate-y-[10%]"
                )}
            >
                <MediaContent
                    imageSrc={items[1].imageSrc}
                    videoSrc={items[1].videoSrc}
                    imageAlt={items[1].imageAlt}
                    imageClassName="h-full rounded-[calc(var(--radius-theme-capped)*0.95)]!"
                />
            </div>
            <div
                className={cls(
                    "absolute! w-3/5 2xl:w-1/2 aspect-[4/3] p-1 rounded-theme-capped overflow-hidden primary-button z-30",
                    "translate-y-[10%] transition-all duration-500 ease-out",
                    "2xl:translate-y-[7%]",
                    "group-hover/stack:translate-y-[20%]",
                    "2xl:group-hover/stack:translate-y-[14%]"
                )}
            >
                <MediaContent
                    imageSrc={items[0].imageSrc}
                    videoSrc={items[0].videoSrc}
                    imageAlt={items[0].imageAlt}
                    imageClassName="h-full rounded-[calc(var(--radius-theme-capped)*0.95)]!"
                />
            </div>
        </div>
    );
};

BentoMediaStack.displayName = "BentoMediaStack";

export default memo(BentoMediaStack);
