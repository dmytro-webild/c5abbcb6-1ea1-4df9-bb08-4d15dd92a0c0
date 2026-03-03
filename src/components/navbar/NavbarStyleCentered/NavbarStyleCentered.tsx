"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import Logo from "../Logo";
import HamburgerButton from "../HamburgerButton";
import Button from "@/components/button/Button";
import { NavItem } from "@/types/navigation";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useButtonClick } from "@/components/button/useButtonClick";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { ButtonConfig } from "@/types/button";
import "./NavbarStyleCentered.css";
import { ArrowUpRight } from "lucide-react";

interface NavLinkProps {
  item: NavItem;
  index: number;
  onClose: () => void;
}

const NavLink = ({ item, index, onClose }: NavLinkProps) => {
  const handleClick = useButtonClick(item.id, onClose);

  return (
    <li
      className="group m-0 p-0 list-none overflow-clip"
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <button
        type="button"
        className="centered-nav__link relative flex justify-between items-center no-underline w-full text-left bg-transparent border-none cursor-pointer"
        onClick={handleClick}
      >
        <div className="centered-nav__link-content flex justify-between items-center gap-3 w-full">
          <p className="m-0 text-xl md:text-2xl text-foreground truncate group-hover:ml-3 transition-[margin] duration-300">{item.name}</p>
          <ArrowUpRight className="h-[var(--text-xl)] md:h-[var(--text-2xl)] w-auto text-foreground group-hover:rotate-45 group-hover:mr-3 transition-all duration-300" strokeWidth={1.5} />
        </div>
      </button>
    </li>
  );
};

interface NavbarStyleCenteredProps {
  navItems: NavItem[];
  button: ButtonConfig;
  topBarButton?: ButtonConfig;
  // logoSrc?: string;
  // logoAlt?: string;
  brandName?: string;
  className?: string;
}

const NavbarStyleCentered = ({
  navItems,
  button,
  topBarButton,
  // logoSrc,
  // logoAlt = "",
  brandName = "Webild",
  className = "",
}: NavbarStyleCenteredProps) => {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  const getButtonConfigProps = () => {
    if (theme.defaultButtonVariant === "hover-bubble") {
      return { bgClassName: "w-full" };
    }
    if (theme.defaultButtonVariant === "icon-arrow") {
      return { className: "justify-between" };
    }
    return {};
  };

  const handleToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsActive(false);
  }, []);

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
      className="fixed inset-0 z-[1000] pointer-events-none"
    >
      <div
        className="centered-nav__overlay absolute inset-0 bg-foreground pointer-events-auto opacity-0 invisible transition-all duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]"
        onClick={handleClose}
      />
      <div className={cls("pointer-events-auto absolute top-6 left-1/2 -translate-x-1/2 w-content-width md:top-8 md:w-35 flex flex-col justify-start items-stretch rounded-theme-capped", className)} >
        <div className="absolute! inset-0 card backdrop-blur-xs rounded-theme-capped" />
        <div className="relative z-10 flex justify-between items-center py-3 px-6">
          <Logo
            brandName={brandName}
            href="/"
          />
          <div className="flex items-center gap-3">
            {topBarButton && (
              <Button
                {...getButtonProps(
                  {
                    ...topBarButton,
                    props: { ...topBarButton.props }
                  },
                  0,
                  theme.defaultButtonVariant,
                  ""
                )}
              />
            )}
            <HamburgerButton
              isActive={isActive}
              onClick={handleToggle}
              activeBarClassName="bg-foreground"
              inactiveBarClassName="bg-foreground"
              styled={!!topBarButton}
            />
          </div>
        </div>
        <div className="centered-nav__content relative overflow-hidden rounded-b-theme-capped grid transition-[grid-template-rows] duration-600 ease-[cubic-bezier(0.625,0.05,0,1)]">
          <div className="centered-nav__inner flex flex-col justify-start items-center w-full relative overflow-hidden gap-6">
            <div className="w-full px-6" >
              <ul className="relative w-full card p-6 rounded-theme-capped flex flex-col gap-3 justify-start items-stretch m-0 list-none">
                {navItems.map((item, index) => (
                  <Fragment key={item.id}>
                    <NavLink item={item} index={index} onClose={handleClose} />
                    {index < navItems.length - 1 && <div className="centered-nav__separator h-px bg-accent/50" />}
                  </Fragment>
                ))}
              </ul>
            </div>
            <div className="w-full px-6 pb-6">
              <Button
                {...getButtonProps(
                  {
                    ...button,
                    onClick: () => {
                      button.onClick?.();
                      handleClose();
                    },
                    props: { ...button.props, ...getButtonConfigProps() }
                  },
                  0,
                  theme.defaultButtonVariant,
                  "w-full"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

NavbarStyleCentered.displayName = "NavbarStyleCentered";

export default NavbarStyleCentered;
