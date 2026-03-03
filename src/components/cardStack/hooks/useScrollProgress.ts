import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

export const useScrollProgress = (emblaApi: EmblaCarouselType | undefined) => {
    const [scrollProgress, setScrollProgress] = useState(0);

    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onScroll(emblaApi);
        emblaApi
            .on("reInit", onScroll)
            .on("scroll", onScroll)
            .on("slideFocus", onScroll);

        return () => {
            emblaApi
                .off("reInit", onScroll)
                .off("scroll", onScroll)
                .off("slideFocus", onScroll);
        };
    }, [emblaApi, onScroll]);

    return scrollProgress;
};
