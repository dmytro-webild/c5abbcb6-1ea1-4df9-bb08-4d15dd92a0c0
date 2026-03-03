import { useEffect, RefObject } from "react";

export const useCharAnimation = (
    buttonRef: RefObject<HTMLButtonElement | null>,
    text: string | undefined,
    selector: string = "[data-button-animate-chars]",
    staggerDelay: number = 0
) => {
    useEffect(() => {
        const buttonElement = buttonRef.current?.querySelector(selector);
        if (!buttonElement) return;

        const textContent = text || buttonElement.textContent || "";
        buttonElement.innerHTML = "";

        [...textContent].forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char;

            if (staggerDelay > 0) {
                span.style.transitionDelay = `${index * staggerDelay}s`;
            }

            if (char === " ") {
                span.style.whiteSpace = "pre";
            }

            buttonElement.appendChild(span);
        });
    }, [buttonRef, text, selector, staggerDelay]);
};
