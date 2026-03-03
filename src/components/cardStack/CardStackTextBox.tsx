"use client";

import { memo, useMemo } from "react";
import TextBox from "@/components/Textbox";
import { cls } from "@/lib/utils";
import type { TextBoxProps } from "./types";

const CardStackTextBox = ({
    title,
    titleSegments,
    description,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    textboxLayout,
    useInvertedBackground,
    textBoxClassName = "",
    titleClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
}: TextBoxProps) => {
    const styles = useMemo(() => {
        if (textboxLayout === "default") {
            return {
                className: cls("flex flex-col gap-3 md:gap-2", textBoxClassName),
                titleClassName: cls("text-6xl font-medium text-center", titleClassName),
                descriptionClassName: cls("text-lg leading-tight text-center md:max-w-6/10", descriptionClassName),
                tagClassName: cls("w-fit px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-0 mx-auto", tagClassName),
                buttonContainerClassName: cls("flex flex-wrap gap-4 max-md:justify-center mt-1 md:mt-3 justify-center", buttonContainerClassName),
                center: true,
            };
        }

        if (textboxLayout === "inline-image") {
            return {
                className: cls("flex flex-col gap-3 md:gap-2", textBoxClassName),
                titleClassName: cls("text-4xl md:text-5xl font-medium text-center", titleClassName),
                descriptionClassName: cls("text-lg leading-tight text-center", descriptionClassName),
                tagClassName: cls("w-fit px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-0 mx-auto", tagClassName),
                buttonContainerClassName: cls("flex flex-wrap gap-4 max-md:justify-center mt-1 md:mt-3 justify-center", buttonContainerClassName),
                center: true,
            };
        }

        return {
            className: textBoxClassName,
            titleClassName: cls("text-6xl font-medium", titleClassName),
            descriptionClassName: cls("text-lg leading-tight", descriptionClassName),
            tagClassName: cls("px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2", tagClassName),
            buttonContainerClassName: cls("flex flex-wrap gap-4 max-md:justify-center", buttonContainerClassName),
            center: false,
        };
    }, [textboxLayout, textBoxClassName, titleClassName, descriptionClassName, tagClassName, buttonContainerClassName]);

    if (!title && !titleSegments && !description) return null;

    return (
        <TextBox
            title={title!}
            titleSegments={titleSegments}
            description={description!}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            textboxLayout={textboxLayout}
            useInvertedBackground={useInvertedBackground}
            className={styles.className}
            titleClassName={styles.titleClassName}
            titleImageWrapperClassName={titleImageWrapperClassName}
            titleImageClassName={titleImageClassName}
            descriptionClassName={styles.descriptionClassName}
            tagClassName={styles.tagClassName}
            buttonContainerClassName={styles.buttonContainerClassName}
            buttonClassName={buttonClassName}
            buttonTextClassName={buttonTextClassName}
            center={styles.center}
        />
    );
};

CardStackTextBox.displayName = "CardStackTextBox";

export default memo(CardStackTextBox);
