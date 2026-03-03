"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

export type GridCardItem = {
  name: string;
  icon: LucideIcon;
};

interface Bento3DCardGridProps {
  useInvertedBackground: InvertedBackground;
  items: [GridCardItem, GridCardItem, GridCardItem, GridCardItem];
  centerIcon: LucideIcon;
  className?: string;
}

const gridItemStyle = {
  perspective: '1000px',
  transformStyle: 'preserve-3d' as const,
};

const EmptyCell = () => (
  <div
    className="relative aspect-square card shadow rounded-theme-capped opacity-50"
    style={gridItemStyle}
  />
);

const cardTranslateZ = [
  'group-hover:[transform:translateZ(10px)]',
  'group-hover:[transform:translateZ(14px)]',
  'group-hover:[transform:translateZ(18px)]',
  'group-hover:[transform:translateZ(22px)]',
] as const;

const CardCell = ({ name, Icon, cardIndex }: { name: string; Icon: LucideIcon; cardIndex: number }) => (
  <div
    className={cls(
      "relative card shadow aspect-square rounded-theme-capped flex flex-col justify-between p-3 transition-transform duration-500",
      cardTranslateZ[cardIndex]
    )}
    style={gridItemStyle}
  >
    <div className="h-6 w-[var(--height-6)] aspect-square rounded-theme primary-button flex items-center justify-center">
      <Icon className="h-4/10 w-4/10 text-primary-cta-text" strokeWidth={1.5} />
    </div>
    <p className="text-xs text-foreground leading-tight line-clamp-4">{name}</p>
  </div>
);

const CenterCell = ({ Icon }: { Icon: LucideIcon }) => (
  <div
    className="aspect-square flex items-center justify-center bg-transparent border-none overflow-visible"
    style={gridItemStyle}
  >
    <div className="card shadow rounded-full h-6/10 aspect-square flex items-center justify-center">
      <Icon className="h-4/10 w-4/10 text-foreground" strokeWidth={1.25} />
    </div>
  </div>
);

const Bento3DCardGrid = ({
  useInvertedBackground,
  items,
  centerIcon: CenterIcon,
  className = "",
}: Bento3DCardGridProps) => {
  void useInvertedBackground;

  const gridPositions = [
    { type: 'empty' },
    { type: 'card', index: 0 },
    { type: 'empty' },
    { type: 'card', index: 1 },
    { type: 'center' },
    { type: 'card', index: 2 },
    { type: 'empty' },
    { type: 'card', index: 3 },
    { type: 'empty' },
  ] as const;

  return (
    <div
      className={cls("group w-full h-full", className)}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
        WebkitMaskComposite: 'source-in',
      }}
    >
      <div
        className="w-full h-full grid grid-cols-3 gap-4 -translate-y-9 -translate-x-8"
        style={{
          gridAutoRows: '1fr',
          perspective: '5000px',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(45deg) rotateY(20deg) rotate(-25deg) scale(1.1)',
        }}
      >
        {gridPositions.map((pos, index) => {
          switch (pos.type) {
            case 'card':
              const item = items[pos.index];
              return <CardCell key={index} name={item.name} Icon={item.icon} cardIndex={pos.index} />;
            case 'center':
              return <CenterCell key={index} Icon={CenterIcon} />;
            default:
              return <EmptyCell key={index} />;
          }
        })}
      </div>
    </div>
  );
};

Bento3DCardGrid.displayName = "Bento3DCardGrid";

export default memo(Bento3DCardGrid);
