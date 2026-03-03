import { useState, useCallback, useEffect } from 'react';

export const useMenuAnimation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [buttonZIndex, setButtonZIndex] = useState('z-[100]');
    const [animationTimeoutId, setAnimationTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMenuToggle = useCallback(() => {
        const isOpening = !menuOpen;
        setMenuOpen(prev => !prev);

        if (animationTimeoutId) {
            clearTimeout(animationTimeoutId);
        }

        if (isOpening) {
            setButtonZIndex('z-0');
        } else {
            const timeoutId = setTimeout(() => {
                setButtonZIndex('z-[100]');
            }, 800);
            setAnimationTimeoutId(timeoutId);
        }
    }, [menuOpen, animationTimeoutId]);

    useEffect(() => {
        return () => {
            if (animationTimeoutId) {
                clearTimeout(animationTimeoutId);
            }
        };
    }, [animationTimeoutId]);

    return {
        menuOpen,
        buttonZIndex,
        handleMenuToggle,
        setMenuOpen
    };
};