"use client";

import { Fragment } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { NavItem } from '@/types/navigation';
import { useMenuAnimation } from './useMenuAnimation';
import { useButtonClick } from '@/components/button/useButtonClick';

interface MobileMenuProps {
    menuOpen: boolean;
    onMenuToggle: () => void;
    navItems: NavItem[];
    onNavClick: (id: string) => void;
    children?: React.ReactNode;
}

const MobileMenu = ({
    menuOpen,
    onMenuToggle,
    navItems,
    onNavClick,
    children
}: MobileMenuProps) => {
    const menuRef = useMenuAnimation(menuOpen);

    return (
        <div
            id="mobile-menu"
            className="md:hidden z-10 fixed top-3 left-3 right-3 h-fit rounded-theme-capped card p-6 flex flex-col gap-6  opacity-0"
            style={{ width: 'calc(100vw - var(--vw-0_75) * 2)' }}
            ref={menuRef}
            role="navigation"
            aria-label="Mobile navigation menu"
        >
            <div className="w-full flex justify-between items-center">
                <p className="text-xl text-foreground">Menu</p>
                <button 
                    className="shrink-0 h-8 aspect-square rounded-theme bg-foreground flex items-center justify-center cursor-pointer"
                    onClick={onMenuToggle}
                    aria-label="Close menu"
                >
                    <Plus className="w-1/2 h-1/2 text-background rotate-45" strokeWidth={1.5} aria-hidden="true" />
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {navItems.map((item, index) => {
                    const NavButton = () => {
                        const handleClick = useButtonClick(item.id, () => onNavClick(item.id));

                        return (
                            <button
                                className="w-full h-fit flex justify-between items-center cursor-pointer"
                                onClick={handleClick}
                                aria-label={`Navigate to ${item.name}`}
                            >
                                <p className="text-base font-medium">{item.name}</p>
                                <ArrowRight strokeWidth={1.5} className="h-[var(--text-base)] w-auto text-foreground" aria-hidden="true" />
                            </button>
                        );
                    };

                    return (
                        <Fragment key={index}>
                            <NavButton />
                            {index < navItems.length - 1 && (
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
                            )}
                        </Fragment>
                    );
                })}
            </div>
            {children && (
                <div className="flex gap-3 items-center">{children}</div>
            )}
        </div>
    );
};

export default MobileMenu;