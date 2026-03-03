import { useState, useEffect } from 'react';
import { throttle } from '@/utils/throttle';

export const useResponsive = (breakpoint: number = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = throttle(() => {
            setIsMobile(window.innerWidth < breakpoint);
        }, 150);
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
};