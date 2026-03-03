"use client";

import ExpandingMenu from "../expandingMenu/ExpandingMenu";
import Button from "../../button/Button";
import Logo from "../Logo";
import { useScrollDetection } from "./useScrollDetection";
import { useMenuAnimation } from "./useMenuAnimation";
import { useResponsive } from "./useResponsive";
import type { NavItem } from "@/types/navigation";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { ButtonConfig } from "@/types/button";

interface NavbarLayoutFloatingOverlayProps {
  navItems: NavItem[];
  // logoSrc?: string;
  // logoAlt?: string;
  className?: string;
  brandName?: string;
  button: ButtonConfig;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const NavbarLayoutFloatingOverlay = ({
  navItems,
  // logoSrc,
  // logoAlt = "",
  className = "",
  brandName = "Webild",
  button,
  buttonClassName = "",
  buttonTextClassName = "",
}: NavbarLayoutFloatingOverlayProps) => {
    const theme = useTheme();
    const isScrolled = useScrollDetection(50);
    const { menuOpen, buttonZIndex, handleMenuToggle } =
      useMenuAnimation();
    const isMobile = useResponsive(768);

    return (
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed z-[100] top-6 w-full transition-all duration-500 ease-in-out"
      >
        <div
          className={cls(
            "w-content-width mx-auto",
            "flex items-center justify-between",
            "card rounded-theme backdrop-blur-xs",
            "px-6 md:pr-3",
            className
          )}
          style={{
            height: "calc(var(--vw-0_75) + var(--vw-0_75) + var(--height-9))",
          }}
        >
          <Logo brandName={brandName} href="/" />
          <div
            className="flex items-center transition-all duration-500 ease-in-out"
            style={{ paddingRight: "calc(var(--height-9) + var(--vw-0_75))" }}
          >
            {!isMobile && (
              <div className="hidden md:flex">
                <Button
                  {...getButtonProps(
                    button,
                    0,
                    theme.defaultButtonVariant,
                    cls(buttonZIndex, buttonClassName),
                    buttonTextClassName
                  )}
                />
              </div>
            )}
            <ExpandingMenu
              isOpen={menuOpen}
              onToggle={handleMenuToggle}
              navItems={navItems}
              isScrolled={isScrolled}
            />
          </div>
        </div>
      </nav>
  );
};

export default NavbarLayoutFloatingOverlay;
