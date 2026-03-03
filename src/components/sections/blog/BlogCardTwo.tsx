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

type BlogCard = Omit<BlogPost, 'category'> & {
    category: string | string[];
};

interface BlogCardTwoProps {
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
    authorAvatarClassName?: string;
    authorDateClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    categoryClassName?: string;
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
    authorAvatarClassName?: string;
    authorDateClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    categoryClassName?: string;
}

const BlogCardItem = memo(({
    blog,
    shouldUseLightText,
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    authorAvatarClassName = "",
    authorDateClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    categoryClassName = "",
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
                    <div className="flex items-center gap-2">
                        {blog.authorAvatar && (
                            <Image
                                src={blog.authorAvatar}
                                alt={blog.authorName}
                                width={24}
                                height={24}
                                className={cls("h-[var(--text-xs)] w-auto aspect-square rounded-theme object-cover bg-background-accent", authorAvatarClassName)}
                                unoptimized={blog.authorAvatar.startsWith('http') || blog.authorAvatar.startsWith('//')}
                            />
                        )}
                        <p className={cls("text-xs", shouldUseLightText ? "text-background" : "text-foreground", authorDateClassName)}>
                            {blog.authorName} • {blog.date}
                        </p>
                    </div>

                    <h3 className={cls("text-2xl font-medium leading-[1.25]", shouldUseLightText ? "text-background" : "text-foreground", cardTitleClassName)}>
                        {blog.title}
                    </h3>

                    <p className={cls("text-base leading-[1.25]", shouldUseLightText ? "text-background" : "text-foreground", excerptClassName)}>
                        {blog.excerpt}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {Array.isArray(blog.category) ? (
                        blog.category.map((cat, index) => (
                            <Badge key={`${cat}-${index}`} text={cat} variant="primary" className={categoryClassName} />
                        ))
                    ) : (
                        <Badge text={blog.category} variant="primary" className={categoryClassName} />
                    )}
                </div>
            </div>
        </article>
    );
});

BlogCardItem.displayName = "BlogCardItem";

const BlogCardTwo = ({
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
    authorAvatarClassName = "",
    authorDateClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    categoryClassName = "",
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
}: BlogCardTwoProps) => {
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
                    authorAvatarClassName={authorAvatarClassName}
                    authorDateClassName={authorDateClassName}
                    cardTitleClassName={cardTitleClassName}
                    excerptClassName={excerptClassName}
                    categoryClassName={categoryClassName}
                />
            ))}
        </CardStack>
    );
};

BlogCardTwo.displayName = "BlogCardTwo";

export default BlogCardTwo;
