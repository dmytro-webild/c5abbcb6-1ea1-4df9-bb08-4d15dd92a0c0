"use client";

import { useState, useCallback } from "react";
import MobileMenu from "../mobileMenu/MobileMenu";
import Button from "@/components/button/Button";
import ButtonTextUnderline from "@/components/button/ButtonTextUnderline";
import Logo from "../Logo";
import { Plus } from "lucide-react";
import { NavbarProps } from "@/types/navigation";
import { useScrollState } from "./useScrollState";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { ButtonConfig } from "@/types/button";

const SCROLL_THRESHOLD = 50;

interface NavbarStyleAppleProps extends NavbarProps {
  button?: ButtonConfig;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const NavbarStyleApple = ({
  navItems,
  // logoSrc,
  // logoAlt = "",
  brandName = "Webild",
  button,
  buttonClassName = "",
  buttonTextClassName = "",
}: NavbarStyleAppleProps) => {
  const isScrolled = useScrollState(SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleMobileNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

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
    <nav
      className={cls(
        "fixed z-[1000] top-0 left-0 w-full transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm h-15"
          : "bg-background/0 backdrop-blur-0 h-20"
      )}
    >
      <div className="relative flex items-center justify-between h-full w-content-width mx-auto">
        <div className="flex items-center transition-all duration-500 ease-in-out">
          <Logo brandName={brandName} href="/" />
        </div>

        <div
          className={cls(
            "hidden md:flex items-center gap-6 transition-all duration-500 ease-in-out",
            button && "absolute left-1/2 -translate-x-1/2"
          )}
          role="navigation"
        >
          {navItems.map((item, index) => (
            <ButtonTextUnderline
              key={index}
              text={item.name}
              href={item.id}
              className="!text-base"
            />
          ))}
          {!button && null}
        </div>

        {button && (
          <div className="hidden md:block">
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
        )}

        <button
          className="flex md:hidden shrink-0 h-8 aspect-square rounded-theme bg-foreground items-center justify-center cursor-pointer"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Plus
            className={cls(
              "w-1/2 h-1/2 text-background transition-transform duration-300",
              menuOpen ? "rotate-45" : "rotate-0"
            )}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </div>

      <MobileMenu
        menuOpen={menuOpen}
        onMenuToggle={handleMenuToggle}
        navItems={navItems}
        onNavClick={handleMobileNavClick}
      >
        {button && (
          <Button
            {...getButtonProps(
              {
                ...button,
                onClick: () => {
                  button.onClick?.();
                  setMenuOpen(false);
                },
                props: { ...button.props, ...getButtonConfigProps() }
              },
              0,
              theme.defaultButtonVariant,
              cls("w-full", buttonClassName),
              buttonTextClassName
            )}
          />
        )}
      </MobileMenu>
    </nav>
  );
};

export default NavbarStyleApple;
