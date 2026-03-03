"use client";

import { memo } from "react";
import Image from "next/image";
import { cls } from "@/lib/utils";

interface MediaContentProps {
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
  imageClassName?: string;
}

const MediaContent = ({
  imageSrc,
  videoSrc,
  imageAlt = "",
  videoAriaLabel = "Video content",
  imageClassName = "",
}: MediaContentProps) => {
  return (
    <>
      {videoSrc ? (
        <video
          src={videoSrc}
          aria-label={videoAriaLabel}
          className={cls("w-full h-auto object-cover rounded-theme-capped", imageClassName)}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1920}
            height={1080}
            className={cls("w-full h-auto object-cover rounded-theme-capped", imageClassName)}
            unoptimized={imageSrc.startsWith('http') || imageSrc.startsWith('//')}
            aria-hidden={imageAlt === ""}
          />
        )
      )}
    </>
  );
};

MediaContent.displayName = "MediaContent";

export default memo(MediaContent);
