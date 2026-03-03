"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";
import Image from "next/image";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { ButtonAnimationType } from "@/components/cardStack/types";

export interface Avatar {
  src: string;
  alt: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  text?: string;
  maxVisible?: number;
  animationType?: ButtonAnimationType;
  className?: string;
  avatarClassName?: string;
  avatarImageClassName?: string;
  avatarOverlapClassName?: string;
  textClassName?: string;
  ariaLabel?: string;
}

const AvatarGroup = ({
  avatars,
  text,
  maxVisible = 5,
  animationType = "none",
  className = "",
  avatarClassName = "",
  avatarImageClassName = "",
  avatarOverlapClassName = "-ml-3",
  textClassName = "",
  ariaLabel = "User avatars",
}: AvatarGroupProps) => {
  const { containerRef } = useButtonAnimation({ animationType });
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = Math.max(0, avatars.length - maxVisible);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={ariaLabel}
      className={cls("relative z-1 flex items-center gap-3", className)}
    >
      <div className="flex items-center">
        {visibleAvatars.map((avatar, index) => (
          <div
            key={index}
            className={cls(
              "relative card p-0.5 rounded-theme",
              index !== 0 && avatarOverlapClassName,
              `z-[${visibleAvatars.length - index}]`,
              avatarClassName
            )}
          >
            <div className={cls("relative z-1 h-12 w-auto aspect-square rounded-theme overflow-hidden", avatarImageClassName)}>
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                className="w-full h-full object-cover"
                unoptimized={avatar.src.startsWith('http') || avatar.src.startsWith('//')}
              />
            </div>
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={cls(
              `card p-0.5 rounded-theme ${avatarOverlapClassName} z-0`,
              avatarClassName
            )}
          >
            <div className={cls("relative z-1 h-12 w-auto aspect-square rounded-theme flex items-center justify-center text-xs text-foreground", avatarImageClassName)}>
              +{remainingCount}
            </div>
          </div>
        )}
      </div>
      {text && (
        <p className={cls("relative z-1 text-sm text-foreground text-balance", textClassName)}>
          {text}
        </p>
      )}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";

export default memo(AvatarGroup);
