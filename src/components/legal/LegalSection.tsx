"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";

export type LegalContentItem =
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] }
    | { type: "numbered-list"; items: string[] };

export interface LegalContentSection {
    heading: string;
    content: LegalContentItem[];
}

interface LegalSectionProps {
    layout: "page" | "section";
    title: string;
    subtitle?: string;
    sections: LegalContentSection[];
    className?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    sectionClassName?: string;
    headingClassName?: string;
    contentClassName?: string;
    listClassName?: string;
}

const LegalSection = ({
    layout,
    title,
    subtitle,
    sections,
    className = "",
    titleClassName = "",
    subtitleClassName = "",
    sectionClassName = "",
    headingClassName = "",
    contentClassName = "",
    listClassName = "",
}: LegalSectionProps) => {
    return (
        <article
            className={cls(
                "relative w-content-width mx-auto",
                layout === "page" ? "pt-hero-page-padding pb-20" : "py-20",
                className
            )}
        >
            <div className="md:max-w-1/2 mx-auto flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1
                        className={cls(
                            "text-3xl md:text-4xl font-medium text-foreground leading-tight",
                            titleClassName
                        )}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            className={cls(
                                "text-sm text-foreground/50",
                                subtitleClassName
                            )}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="w-full h-px bg-background-accent" />

                <div className="flex flex-col gap-6">
                    {sections.map((section) => (
                        <section
                            key={section.heading}
                            className={cls("flex flex-col gap-3", sectionClassName)}
                        >
                            <h2
                                className={cls(
                                    "text-xl md:text-2xl font-medium text-foreground leading-tight",
                                    headingClassName
                                )}
                            >
                                {section.heading}
                            </h2>
                            {section.content.map((item, i) => {
                                if (item.type === "paragraph") {
                                    return (
                                        <p
                                            key={i}
                                            className={cls(
                                                "text-sm md:text-base text-foreground/75 leading-tight",
                                                contentClassName
                                            )}
                                        >
                                            {item.text}
                                        </p>
                                    );
                                }

                                const ListTag = item.type === "numbered-list" ? "ol" : "ul";

                                return (
                                    <ListTag
                                        key={i}
                                        className={cls(
                                            "text-sm md:text-base text-foreground/75 leading-tight pl-6 flex flex-col gap-2",
                                            item.type === "numbered-list" ? "list-decimal" : "list-disc",
                                            listClassName
                                        )}
                                    >
                                        {item.items.map((li, j) => (
                                            <li key={j}>{li}</li>
                                        ))}
                                    </ListTag>
                                );
                            })}
                        </section>
                    ))}
                </div>
            </div>
        </article>
    );
};

LegalSection.displayName = "LegalSection";

export default memo(LegalSection);
