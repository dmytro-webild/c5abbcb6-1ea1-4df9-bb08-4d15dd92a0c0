import { useState, useEffect } from 'react';
import { throttle } from '@/utils/throttle';

export const useScrollDetection = (threshold: number = 50) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = throttle(() => {
            setIsScrolled(window.scrollY > threshold);
        }, 100);
        
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isScrolled;
};