"use client";

import { memo } from "react";
import Image from "next/image";
import CardStack from "@/components/cardStack/CardStack";
import Badge from "@/components/shared/Badge";
import OverlayArrowButton from "@/components/shared/OverlayArrowButton";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { BlogPost } from "@/lib/api/blog";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type BlogCard = BlogPost;

interface BlogCardOneProps {
    blogs: BlogCard[];
    carouselMode?: "auto" | "buttons";
    uniformGridCustomHeightClasses?: string;
    animationType: CardAnimationType;
    title: string;
    titleSegments?: TitleSegment[];
    description: string;
    tag?: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    textboxLayout: TextboxLayout;
    useInvertedBackground: InvertedBackground;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    cardClassName?: string;
    imageWrapperClassName?: string;
    imageClassName?: string;
    categoryClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    authorContainerClassName?: string;
    authorAvatarClassName?: string;
    authorNameClassName?: string;
    dateClassName?: string;
    textBoxTitleClassName?: string;
    textBoxTitleImageWrapperClassName?: string;
    textBoxTitleImageClassName?: string;
    textBoxDescriptionClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface BlogCardItemProps {
    blog: BlogCard;
    shouldUseLightText: boolean;
    cardClassName?: string;
    imageWrapperClassName?: string;
    imageClassName?: string;
    categoryClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    authorContainerClassName?: string;
    authorAvatarClassName?: string;
    authorNameClassName?: string;
    dateClassName?: string;
}

const BlogCardItem = memo(({
    blog,
    shouldUseLightText,
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    categoryClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    authorContainerClassName = "",
    authorAvatarClassName = "",
    authorNameClassName = "",
    dateClassName = "",
}: BlogCardItemProps) => {
    return (
        <article
            className={cls("relative h-full card group flex flex-col gap-4 cursor-pointer p-4 rounded-theme-capped", cardClassName)}
            onClick={blog.onBlogClick}
            role="article"
            aria-label={`${blog.title} by ${blog.authorName}`}
        >
            <div className={cls("relative z-1 w-full aspect-[4/3] overflow-hidden rounded-theme-capped", imageWrapperClassName)}>
                <Image
                    src={blog.imageSrc}
                    alt={blog.imageAlt || blog.title}
                    fill
                    className={cls("w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105", imageClassName)}
                    unoptimized={blog.imageSrc.startsWith('http') || blog.imageSrc.startsWith('//')}
                />
                <OverlayArrowButton ariaLabel={`Read ${blog.title}`} />
            </div>

            <div className="relative z-1 flex flex-col justify-between gap-6 flex-1">
                <div className="flex flex-col gap-2">
                    <Badge text={blog.category} variant="primary" className={categoryClassName} />

                    <h3 className={cls("text-2xl font-medium leading-[1.25] mt-1", shouldUseLightText ? "text-background" : "text-foreground", cardTitleClassName)}>
                        {blog.title}
                    </h3>

                    <p className={cls("text-base leading-[1.25]", shouldUseLightText ? "text-background" : "text-foreground", excerptClassName)}>
                        {blog.excerpt}
                    </p>
                </div>

                <div className={cls("flex items-center gap-3", authorContainerClassName)}>
                    <Image
                        src={blog.authorAvatar}
                        alt={blog.authorName}
                        width={40}
                        height={40}
                        className={cls("h-9 w-auto aspect-square rounded-theme object-cover", authorAvatarClassName)}
                        unoptimized={blog.authorAvatar.startsWith('http') || blog.authorAvatar.startsWith('//')}
                    />
                    <div className="flex flex-col">
                        <p className={cls("text-sm font-medium", shouldUseLightText ? "text-background" : "text-foreground", authorNameClassName)}>
                            {blog.authorName}
                        </p>
                        <p className={cls("text-xs", shouldUseLightText ? "text-background/75" : "text-foreground/75", dateClassName)}>
                            {blog.date}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
});

BlogCardItem.displayName = "BlogCardItem";

const BlogCardOne = ({
    blogs = [],
    carouselMode = "buttons",
    uniformGridCustomHeightClasses,
    animationType,
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
    ariaLabel = "Blog section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    categoryClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    authorContainerClassName = "",
    authorAvatarClassName = "",
    authorNameClassName = "",
    dateClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: BlogCardOneProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <CardStack
            mode={carouselMode}
            gridVariant="uniform-all-items-equal"
            uniformGridCustomHeightClasses={uniformGridCustomHeightClasses}
            animationType={animationType}
            
            title={title}
            titleSegments={titleSegments}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            textboxLayout={textboxLayout}
            useInvertedBackground={useInvertedBackground}
            ariaLabel={ariaLabel}
            className={className}
            containerClassName={containerClassName}
            gridClassName={gridClassName}
            carouselClassName={carouselClassName}
            controlsClassName={controlsClassName}
            textBoxClassName={textBoxClassName}
            titleClassName={textBoxTitleClassName}
            titleImageWrapperClassName={textBoxTitleImageWrapperClassName}
            titleImageClassName={textBoxTitleImageClassName}
            descriptionClassName={textBoxDescriptionClassName}
            tagClassName={textBoxTagClassName}
            buttonContainerClassName={textBoxButtonContainerClassName}
            buttonClassName={textBoxButtonClassName}
            buttonTextClassName={textBoxButtonTextClassName}
        >
            {blogs.map((blog) => (
                <BlogCardItem
                    key={blog.id}
                    blog={blog}
                    shouldUseLightText={shouldUseLightText}
                    cardClassName={cardClassName}
                    imageWrapperClassName={imageWrapperClassName}
                    imageClassName={imageClassName}
                    categoryClassName={categoryClassName}
                    cardTitleClassName={cardTitleClassName}
                    excerptClassName={excerptClassName}
                    authorContainerClassName={authorContainerClassName}
                    authorAvatarClassName={authorAvatarClassName}
                    authorNameClassName={authorNameClassName}
                    dateClassName={dateClassName}
                />
            ))}
        </CardStack>
    );
};

BlogCardOne.displayName = "BlogCardOne";

export default BlogCardOne;
