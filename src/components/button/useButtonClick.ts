"use client";

import { useLenis } from "lenis/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useButtonClick = (
  href?: string,
  onClick?: () => void,
  scrollToSection?: boolean
) => {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToElement = (sectionId: string, delay: number = 100) => {
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(`#${sectionId}`, { offset: 0 });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, delay);
  };

  const handleClick = () => {
    if (href) {
      const isExternalLink = /^(https?:\/\/|www\.)/.test(href);

      if (isExternalLink) {
        window.open(
          href.startsWith("www.") ? `https://${href}` : href,
          "_blank",
          "noopener,noreferrer"
        );
      } else if (href.startsWith("/")) {
        const [path, hash] = href.split("#");

        if (path !== pathname) {
          router.push(path);
          if (hash) {
            setTimeout(() => {
              window.location.hash = hash;
              scrollToElement(hash, 100);
            }, 100);
          }
        } else {
          if (hash) {
            window.location.hash = hash;
            scrollToElement(hash, 50);
          } else if (scrollToSection) {
            const sectionId = path.replace(/^\//, "").replace(/\//g, "-");
            scrollToElement(sectionId, 50);
          }
        }
      } else {
        scrollToElement(href, 50);
      }
    }
    onClick?.();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      scrollToElement(hash, 300);
    }
  }, [pathname]);

  return handleClick;
};
