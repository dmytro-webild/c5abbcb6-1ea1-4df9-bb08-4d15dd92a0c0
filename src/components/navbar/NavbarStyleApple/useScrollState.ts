import { useState, useEffect, useRef } from 'react';

export const useScrollState = (threshold: number = 50) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const rafRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            
            rafRef.current = requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > threshold);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [threshold]);

    return isScrolled;
};