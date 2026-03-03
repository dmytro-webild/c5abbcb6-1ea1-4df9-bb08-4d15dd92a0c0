"use client";

import { useState, useEffect, useCallback } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import Logo from "../Logo";
import HamburgerButton from "../HamburgerButton";
import Button from "@/components/button/Button";
import { NavItem } from "@/types/navigation";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useButtonClick } from "@/components/button/useButtonClick";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { ButtonConfig } from "@/types/button";
import "./NavbarStyleFullscreen.css";

interface NavLinkProps {
  item: NavItem;
  onClose: () => void;
}

const NavLink = ({ item, onClose }: NavLinkProps) => {
  const handleClick = useButtonClick(item.id, onClose);

  return (
    <button
      type="button"
      className="navbar-fullscreen__link text-background font-normal leading-[1.15] no-underline text-9xl bg-transparent border-none cursor-pointer"
      onClick={handleClick}
    >
      <span className="navbar-fullscreen__link-text block relative">{item.name}</span>
    </button>
  );
};

interface NavbarStyleFullscreenProps {
  navItems: NavItem[];
  // logoSrc?: string;
  // logoAlt?: string;
  brandName?: string;
  bottomLeftText?: string;
  bottomRightText?: string;
  topBarClassName?: string;
  button?: ButtonConfig;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const NavbarStyleFullscreen = ({
  navItems,
  // logoSrc,
  // logoAlt = "",
  brandName = "Webild",
  bottomLeftText = "Global Community",
  bottomRightText = "hello@example.com",
  topBarClassName = "",
  button,
  buttonClassName = "",
  buttonTextClassName = "",
}: NavbarStyleFullscreenProps) => {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();
  const lenis = useLenis();

  const handleToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (lenis) {
      if (isActive) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [isActive, lenis]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        setIsActive(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      data-navigation-status={isActive ? "active" : "not-active"}
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      <div className={cls(
        "absolute z-1 w-content-width left-1/2 -translate-x-1/2 top-6 flex justify-between items-center pointer-events-auto",
        topBarClassName
      )}>
        <Logo
          brandName={brandName}
          textClassName={`transition-colors duration-700 ease-[cubic-bezier(0.5,0.5,0,1)] ${isActive ? "text-background" : "text-foreground"}`}
          href="/"
        />
        <div className="flex items-center gap-3">
          {button && (
            <Button
              {...getButtonProps(
                button,
                0,
                theme.defaultButtonVariant,
                buttonClassName,
                buttonTextClassName
              )}
            />
          )}
          <HamburgerButton
              isActive={isActive}
              onClick={handleToggle}
              {...(button && {
                activeBarClassName: "bg-foreground",
                inactiveBarClassName: "bg-foreground",
                styled: true
              })}
            />
        </div>
      </div>

      <div
        id="navigation-menu"
        className="navbar-fullscreen__tile pointer-events-auto bg-foreground backdrop-blur absolute inset-0 flex flex-col justify-center items-center overflow-hidden"
      >
        <ReactLenis className="overflow-y-auto max-h-[70vh] mask-fade-y py-8">
          <ul className="navbar-fullscreen__ul flex flex-col items-center m-0 p-0 list-none">
            {navItems.map((item) => (
              <li key={item.id} className="navbar-fullscreen__li flex justify-center items-center m-0 p-0 relative overflow-hidden">
                <NavLink item={item} onClose={handleClose} />
              </li>
            ))}
          </ul>
        </ReactLenis>

        <div className="absolute bottom-0 w-content-width left-1/2 -translate-x-1/2 flex justify-between items-center py-10">
          <p className="text-background/50 mb-0 text-base relative">{bottomLeftText}</p>
          <p className="text-background/50 mb-0 text-base relative">{bottomRightText}</p>
        </div>
      </div>
    </nav>
  );
};

NavbarStyleFullscreen.displayName = "NavbarStyleFullscreen";

export default NavbarStyleFullscreen;
