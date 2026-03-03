"use client";

import { memo, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronUp, ChevronDown } from "lucide-react";
import MediaContent from "@/components/shared/MediaContent";
import { usePrevNextButtons } from "@/components/cardStack/hooks/usePrevNextButtons";
import { cls } from "@/lib/utils";

interface ProductDetailGalleryProps {
    images: { src: string; alt: string }[];
    className?: string;
}

const ProductDetailGallery = ({
    images,
    className = "",
}: ProductDetailGalleryProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <div className={cls("relative w-full aspect-square", className)}>
            <div className="relative overflow-hidden rounded-theme-capped cursor-grab h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {images.map((image, index) => (
                        <div key={index} className="flex-none w-full min-w-0 h-full">
                            <MediaContent
                                imageSrc={image.src}
                                imageAlt={image.alt}
                                imageClassName="w-full h-full object-cover rounded-none!"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute left-5 top-0 bottom-5 flex flex-col gap-5">
                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 pt-5 pb-1 mask-fade-y" data-lenis-prevent>
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => onThumbClick(index)}
                            className="h-10 aspect-square rounded-theme overflow-hidden cursor-pointer flex-shrink-0 card p-0.5"
                            type="button"
                            aria-label={`View image ${index + 1}`}
                        >
                            <MediaContent
                                imageSrc={image.src}
                                imageAlt={image.alt}
                                imageClassName={cls(
                                    "w-full h-full object-cover transition-opacity duration-300 rounded-[calc(var(--theme-border-radius-capped)*0.90)]!",
                                    selectedIndex === index ? "opacity-100" : "opacity-50 hover:opacity-75"
                                )}
                            />
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                        className="secondary-button h-10 aspect-square flex items-center justify-center rounded-theme cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        aria-label="Previous image"
                    >
                        <ChevronUp className="h-[40%] w-auto aspect-square text-secondary-cta-text" />
                    </button>
                    <button
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                        className="secondary-button h-10 aspect-square flex items-center justify-center rounded-theme cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        aria-label="Next image"
                    >
                        <ChevronDown className="h-[40%] w-auto aspect-square text-secondary-cta-text" />
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductDetailGallery.displayName = "ProductDetailGallery";

export default memo(ProductDetailGallery);
