"use client";

import { useRef, useEffect, useState } from "react";
import FillWidthText, { hasDescenders } from "@/components/shared/FillWidthText/FillWidthText";
import ButtonTextUnderline from "@/components/button/ButtonTextUnderline";
import { cls } from "@/lib/utils";

interface FooterLink {
  text: string;
  onClick?: () => void;
  href?: string;
}

interface FooterLogoRevealProps {
  // logoSrc?: string;
  // logoAlt?: string;
  logoText?: string;
  leftLink: FooterLink;
  rightLink: FooterLink;
  ariaLabel?: string;
  className?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  logoClassName?: string;
  linkClassName?: string;
}

const FooterLogoReveal = ({
  // logoSrc,
  // logoAlt = "Logo",
  logoText = "Webild",
  leftLink,
  rightLink,
  ariaLabel = "Site footer",
  className = "",
  wrapperClassName = "",
  containerClassName = "",
  logoClassName = "",
  linkClassName = "",
}: FooterLogoRevealProps) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        setFooterHeight(height);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    const currentFooter = footerRef.current;

    if (currentFooter) {
      resizeObserver.observe(currentFooter);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative z-0 w-full mt-20", className)}
      style={{
        height: footerHeight ? `${footerHeight}px` : "auto",
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div
        className={cls("fixed bottom-0 w-full flex items-center justify-center overflow-hidden", wrapperClassName)}
        style={{ height: footerHeight ? `${footerHeight}px` : "auto" }}
      >
        <div ref={footerRef} className={cls("w-full", containerClassName)}>
          <footer
            role="contentinfo"
            className="relative w-full py-20 card"
          >
            <div className="w-content-width mx-auto flex flex-col relative z-10">
              <div className={cls("relative z-1 w-full", logoClassName)}>
                <FillWidthText className={cls(!hasDescenders(logoText ?? "") && "my-10")}>
                  {logoText}
                </FillWidthText>
              </div>
              <div className="w-full flex justify-between items-center">
                <ButtonTextUnderline
                  text={leftLink.text}
                  onClick={leftLink.onClick}
                  href={leftLink.href}
                  className={cls("text-foreground", linkClassName)}
                />
                <ButtonTextUnderline
                  text={rightLink.text}
                  onClick={rightLink.onClick}
                  href={rightLink.href}
                  className={cls("text-foreground", linkClassName)}
                />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};

FooterLogoReveal.displayName = "FooterLogoReveal";

export default FooterLogoReveal;
