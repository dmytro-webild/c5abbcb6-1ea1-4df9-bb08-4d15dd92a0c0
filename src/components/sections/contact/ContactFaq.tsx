"use client";

import { useState, Fragment } from "react";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import Accordion from "@/components/Accordion";
import Button from "@/components/button/Button";
import { useCardAnimation } from "@/components/cardStack/hooks/useCardAnimation";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";
import type { CardAnimationType } from "@/components/cardStack/types";
import type { ButtonConfig } from "@/types/button";

interface FaqItem {
  id: string;
  title: string;
  content: string;
}

interface ContactFaqProps {
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: ButtonConfig;
  ctaIcon: LucideIcon;
  useInvertedBackground: InvertedBackground;
  animationType: CardAnimationType;
  accordionAnimationType?: "smooth" | "instant";
  showCard?: boolean;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  ctaPanelClassName?: string;
  ctaIconClassName?: string;
  ctaTitleClassName?: string;
  ctaDescriptionClassName?: string;
  ctaButtonClassName?: string;
  ctaButtonTextClassName?: string;
  faqsPanelClassName?: string;
  faqsContainerClassName?: string;
  accordionClassName?: string;
  accordionTitleClassName?: string;
  accordionIconContainerClassName?: string;
  accordionIconClassName?: string;
  accordionContentClassName?: string;
  separatorClassName?: string;
}

const ContactFaq = ({
  faqs,
  ctaTitle,
  ctaDescription,
  ctaButton,
  ctaIcon: CtaIcon,
  useInvertedBackground,
  animationType,
  accordionAnimationType = "smooth",
  showCard = true,
  ariaLabel = "Contact and FAQ section",
  className = "",
  containerClassName = "",
  ctaPanelClassName = "",
  ctaIconClassName = "",
  ctaTitleClassName = "",
  ctaDescriptionClassName = "",
  ctaButtonClassName = "",
  ctaButtonTextClassName = "",
  faqsPanelClassName = "",
  faqsContainerClassName = "",
  accordionClassName = "",
  accordionTitleClassName = "",
  accordionIconContainerClassName = "",
  accordionIconClassName = "",
  accordionContentClassName = "",
  separatorClassName = "",
}: ContactFaqProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
  const { itemRefs } = useCardAnimation({ animationType, itemCount: 2 });

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getButtonConfigProps = () => {
    if (theme.defaultButtonVariant === "hover-bubble") {
      return { bgClassName: "w-full" };
    }
    if (theme.defaultButtonVariant === "icon-arrow") {
      return { className: "justify-between" };
    }
    return {};
  };

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
    >
      <div className={cls("w-content-width mx-auto", containerClassName)}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div
            ref={(el) => { itemRefs.current[0] = el; }}
            className={cls(
              "md:col-span-4 card rounded-theme-capped p-6 md:p-8 flex flex-col items-center justify-center gap-6 text-center",
              ctaPanelClassName
            )}
          >
            <div className={cls("h-16 w-auto aspect-square rounded-theme primary-button flex items-center justify-center", ctaIconClassName)}>
              <CtaIcon className="h-4/10 w-4/10 text-primary-cta-text" strokeWidth={1.5} />
            </div>

            <div className="flex flex-col" >
              <h2 className={cls(
                "text-2xl md:text-3xl font-medium",
                shouldUseLightText ? "text-background" : "text-foreground",
                ctaTitleClassName
              )}>
                {ctaTitle}
              </h2>

              <p className={cls(
                "text-base",
                shouldUseLightText ? "text-background/70" : "text-foreground/70",
                ctaDescriptionClassName
              )}>
                {ctaDescription}
              </p>
            </div>

            <Button
              {...getButtonProps(
                { ...ctaButton, props: { ...ctaButton.props, ...getButtonConfigProps() } },
                0,
                theme.defaultButtonVariant,
                cls("w-full", ctaButtonClassName),
                ctaButtonTextClassName
              )}
            />
          </div>

          <div
            ref={(el) => { itemRefs.current[1] = el; }}
            className={cls(
              "md:col-span-8 flex flex-col gap-4",
              faqsPanelClassName
            )}
          >
            <div className={cls("flex flex-col gap-4", faqsContainerClassName)}>
              {faqs.map((faq, index) => (
                <Fragment key={faq.id}>
                  <Accordion
                    index={index}
                    isActive={activeIndex === index}
                    onToggle={handleToggle}
                    title={faq.title}
                    content={faq.content}
                    animationType={accordionAnimationType}
                    showCard={showCard}
                    useInvertedBackground={useInvertedBackground}
                    className={accordionClassName}
                    titleClassName={accordionTitleClassName}
                    iconContainerClassName={accordionIconContainerClassName}
                    iconClassName={accordionIconClassName}
                    contentClassName={accordionContentClassName}
                  />
                  {!showCard && index < faqs.length - 1 && (
                    <div className={cls(
                      "w-full border-b",
                      shouldUseLightText ? "border-background/10" : "border-foreground/10",
                      separatorClassName
                    )} />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ContactFaq.displayName = "ContactFaq";

export default ContactFaq;
