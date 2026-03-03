import { useRef, useEffect, useCallback, useState } from "react";

export function useTagEffects<T extends HTMLElement = HTMLButtonElement>() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio("/audio/click.mp3");
    audioRef.current.volume = 0.75;
  }, []);

  useEffect(() => {
    if (window.self !== window.top) {
      try {
        const parentHostname = window.top?.location.hostname;
        if (parentHostname?.includes('webild.io')) {
          setShouldShow(false);
        }
      } catch {
        setShouldShow(true);
      }
    }
  }, []);

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth > 768) {
      playSound();
    }
  }, [playSound]);

  const handleClick = useCallback(
    (e: React.MouseEvent<T>, onClick?: (e: React.MouseEvent<T>) => void) => {
      playSound();
      if (onClick) {
        onClick(e);
      }
    },
    [playSound]
  );

  return {
    shouldShow,
    handleMouseEnter,
    handleClick,
    buttonClassName: "transition-all duration-200 hover:-translate-y-[3px]",
  };
}
