import { useState, useEffect } from 'react';

export const useResponsiveMenuWidth = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [menuWidth, setMenuWidth] = useState('var(--width-20)');

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            setMenuWidth(
                window.innerWidth >= 768 
                    ? 'var(--width-20)' 
                    : 'calc(var(--width-80) - var(--vw-0_75) * 2)'
            );
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMounted, menuWidth };
};