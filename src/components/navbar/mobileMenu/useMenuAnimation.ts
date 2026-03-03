import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const useMenuAnimation = (menuOpen: boolean) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuRef.current) {
            if (menuOpen) {
                gsap.to(menuRef.current, { 
                    y: "0%", 
                    opacity: 1,
                    pointerEvents: "auto", 
                    duration: 0.8, 
                    ease: "power3.out" 
                });
            } else {
                gsap.to(menuRef.current, { 
                    y: "-135%", 
                    opacity: 1,
                    pointerEvents: "none", 
                    duration: 0.8, 
                    ease: "power3.inOut" 
                });
            }
        }
    }, [menuOpen]);

    useEffect(() => {
        if (menuRef.current) {
            gsap.set(menuRef.current, { 
                y: "-135%", 
                opacity: 1, 
                pointerEvents: "none" 
            });
        }
    }, []);

    return menuRef;
};