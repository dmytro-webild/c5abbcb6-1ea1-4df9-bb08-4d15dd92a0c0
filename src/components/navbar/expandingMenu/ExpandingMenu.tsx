"use client";

import { useCallback } from 'react';
import { useResponsiveMenuWidth } from './useResponsiveMenuWidth';
import { useButtonClick } from '@/components/button/useButtonClick';

interface NavItem {
    id: string;
    name: string;
}

interface ExpandingMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    navItems: NavItem[];
    isScrolled?: boolean;
}

const ExpandingMenu = ({
    isOpen,
    onToggle,
    navItems,
    isScrolled = false
}: ExpandingMenuProps) => {
    const { isMounted, menuWidth } = useResponsiveMenuWidth();

    const handleNavClick = useCallback(() => {
        onToggle();
    }, [onToggle]);

    return (
        <div
            className={`
            rounded-theme-capped absolute top-[calc(var(--vw-0_75)-1px)] right-3
            transition-[top] duration-500 ease-in-out
            ${isScrolled ? '' : ''}
            ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}>
            <div
                aria-hidden="true"
                className={`
                    primary-button
                    backdrop-blur-xs
                    transition-all duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]
                    bg-foreground rounded-theme-capped absolute! top-0 right-0
                    ${isOpen
                        ? 'w-full h-full'
                        : 'h-9 w-[var(--height-9)]'
                    }
                `}
            />

            <div className={`
                relative p-6 flex flex-col gap-6
                transition-all duration-500 ease-[cubic-bezier(0.5,0.5,0,1)]
                origin-[100%_0]
                ${isOpen
                    ? 'scale-100 opacity-100 visible pointer-events-auto'
                    : 'scale-[0.15] opacity-0 invisible pointer-events-none'
                }
            `}
                style={{
                    transition: 'all 0.5s cubic-bezier(0.5, 0.5, 0, 1), transform 0.7s cubic-bezier(0.5, 0.5, 0, 1)',
                    width: isMounted ? menuWidth : 'var(--width-20)'
                }}
            >
                <p className="text-xl text-primary-cta-text" aria-hidden="true">Menu</p>
                <ul 
                    role="menu"
                    className="relative list-none flex flex-col gap-3 m-0 p-0"
                >
                    {navItems.map((item) => {
                        const MenuButton = () => {
                            const handleClick = useButtonClick(item.id, handleNavClick);

                            return (
                                <button
                                    aria-label={`Navigate to ${item.name}`}
                                    className={`
                                        text-primary-cta-text flex justify-between items-center
                                        no-underline bg-none border-none cursor-pointer w-full
                                        font-inherit group
                                    `}
                                    onClick={handleClick}
                                >
                                    <span className="text-base">
                                        {item.name}
                                    </span>
                                    <div className="bg-current rounded-theme-capped shrink-0 h-2 aspect-square" />
                                </button>
                            );
                        };

                        return (
                            <li
                                key={item.id}
                                role="menuitem"
                                className="m-0 p-0 list-none"
                            >
                                <MenuButton />
                            </li>
                        );
                    })}
                </ul>
            </div>

            <button
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="navigation-menu"
                className={`
                    transition-transform duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]
                    pointer-events-auto cursor-pointer rounded-theme-capped
                    flex justify-center items-center
                    h-9 w-[var(--height-9)] aspect-square absolute top-0 right-0
                    bg-transparent border-none
                    ${isOpen
                        ? '-translate-x-3 translate-y-3'
                        : 'translate-x-0 translate-y-0'
                    }
                `}
                onClick={onToggle}
            >
                <span 
                    aria-hidden="true"
                    className={`
                    transition-transform duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]
                    bg-background w-[40%] h-0.25 absolute
                    ${isOpen
                        ? 'translate-y-0 rotate-45'
                        : '-translate-y-1 hover:translate-y-1'
                    }
                `} />
                <span 
                    aria-hidden="true"
                    className={`
                    transition-transform duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]
                    bg-background w-[40%] h-0.25 absolute
                    ${isOpen
                        ? 'translate-y-0 -rotate-45'
                        : 'translate-y-1 hover:-translate-y-1'
                    }
                `} />
            </button>
        </div>
    );
};

export default ExpandingMenu;