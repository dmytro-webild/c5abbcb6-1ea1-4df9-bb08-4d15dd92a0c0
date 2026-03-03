"use client";

import { useEffect, useState } from "react";
import Button from "../button/Button";
import ButtonTextUnderline from "../button/ButtonTextUnderline";
import Logo from "./Logo";
import { NavItem } from "@/types/navigation";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { ButtonConfig } from "@/types/button";

interface NavbarLayoutFloatingInlineProps {
  navItems: NavItem[];
  brandName?: string;
  button: ButtonConfig;
  animateOnLoad?: boolean;
  className?: string;
  navItemClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const NavbarLayoutFloatingInline = ({
  navItems,
  brandName = "Webild",
  button,
  animateOnLoad = true,
  className = "",
  navItemClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
}: NavbarLayoutFloatingInlineProps) => {
  const theme = useTheme();
  const [entered, setEntered] = useState(!animateOnLoad);
  const [expanded, setExpanded] = useState(!animateOnLoad);
  const [showLinks, setShowLinks] = useState(!animateOnLoad);

  useEffect(() => {
    if (!animateOnLoad) return;

    const t1 = setTimeout(() => setEntered(true), 50);
    const t2 = setTimeout(() => setExpanded(true), 1000);
    const t3 = setTimeout(() => setShowLinks(true), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [animateOnLoad]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed z-[100] top-6 w-full"
      style={animateOnLoad ? {
        transform: entered ? "translateY(0)" : "translateY(calc(-100% - 3rem))",
        transition: "transform 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      } : undefined}
    >
      <div
        className={cls(
          "mx-auto flex items-center justify-between",
          "card rounded-theme",
          "p-3 pl-6 h-fit relative",
          !animateOnLoad && "w-content-width",
          className
        )}
        style={animateOnLoad ? {
          maxWidth: expanded ? "var(--width-content-width)" : "22rem",
          transition: "max-width 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
        } : undefined}
      >
        <Logo brandName={brandName} href="/" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-6 items-center">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={animateOnLoad ? cls(
                "transition-all duration-700 ease-out",
                showLinks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              ) : undefined}
              style={animateOnLoad ? { transitionDelay: `${index * 120}ms` } : undefined}
            >
              <ButtonTextUnderline
                text={item.name}
                href={item.id}
                className={cls("!text-base", navItemClassName)}
              />
            </div>
          ))}
        </div>

        <Button
          {...getButtonProps(
            button,
            0,
            theme.defaultButtonVariant,
            buttonClassName,
            buttonTextClassName
          )}
        />
      </div>
    </nav>
  );
};

export default NavbarLayoutFloatingInline;
