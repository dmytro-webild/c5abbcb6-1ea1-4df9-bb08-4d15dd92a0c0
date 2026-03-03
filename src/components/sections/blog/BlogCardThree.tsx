"use client";

import { memo } from "react";
import Image from "next/image";
import CardStack from "@/components/cardStack/CardStack";
import Tag from "@/components/shared/Tag";
import MediaContent from "@/components/shared/MediaContent";
import OverlayArrowButton from "@/components/shared/OverlayArrowButton";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { BlogPost } from "@/lib/api/blog";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type BlogCard = BlogPost;

interface BlogCardThreeProps {
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
    cardContentClassName?: string;
    categoryTagClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    authorContainerClassName?: string;
    authorAvatarClassName?: string;
    authorNameClassName?: string;
    dateClassName?: string;
    mediaWrapperClassName?: string;
    mediaClassName?: string;
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
    useInvertedBackground: boolean;
    cardClassName?: string;
    cardContentClassName?: string;
    categoryTagClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    authorContainerClassName?: string;
    authorAvatarClassName?: string;
    authorNameClassName?: string;
    dateClassName?: string;
    mediaWrapperClassName?: string;
    mediaClassName?: string;
}

const BlogCardItem = memo(({
    blog,
    useInvertedBackground,
    cardClassName = "",
    cardContentClassName = "",
    categoryTagClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    authorContainerClassName = "",
    authorAvatarClassName = "",
    authorNameClassName = "",
    dateClassName = "",
    mediaWrapperClassName = "",
    mediaClassName = "",
}: BlogCardItemProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <article
            className={cls(
                "relative h-full card group flex flex-col justify-between gap-6 p-6 cursor-pointer rounded-theme-capped overflow-hidden",
                cardClassName
            )}
            onClick={blog.onBlogClick}
            role="article"
            aria-label={blog.title}
        >
            <div className={cls("relative z-1 flex flex-col gap-3", cardContentClassName)}>
                <Tag
                    text={blog.category}
                    useInvertedBackground={useInvertedBackground}
                    className={categoryTagClassName}
                />

                <h3 className={cls(
                    "text-3xl md:text-4xl font-medium leading-tight line-clamp-2",
                    shouldUseLightText ? "text-background" : "text-foreground",
                    cardTitleClassName
                )}>
                    {blog.title}
                </h3>

                <p className={cls(
                    "text-base leading-tight line-clamp-2",
                    shouldUseLightText ? "text-background/75" : "text-foreground/75",
                    excerptClassName
                )}>
                    {blog.excerpt}
                </p>

                {(blog.authorName || blog.date) && (
                    <div className={cls(
                        "flex",
                        blog.authorAvatar ? "items-center gap-3" : "flex-row justify-between items-center",
                        authorContainerClassName
                    )}>
                        {blog.authorAvatar && (
                            <Image
                                src={blog.authorAvatar}
                                alt={blog.authorName || "Author"}
                                width={40}
                                height={40}
                                className={cls("h-9 w-auto aspect-square rounded-theme object-cover", authorAvatarClassName)}
                                unoptimized={blog.authorAvatar.startsWith('http') || blog.authorAvatar.startsWith('//')}
                            />
                        )}
                        {blog.authorAvatar ? (
                            <div className="flex flex-col">
                                {blog.authorName && (
                                    <p className={cls("text-sm font-medium", shouldUseLightText ? "text-background" : "text-foreground", authorNameClassName)}>
                                        {blog.authorName}
                                    </p>
                                )}
                                {blog.date && (
                                    <p className={cls("text-xs", shouldUseLightText ? "text-background/75" : "text-foreground/75", dateClassName)}>
                                        {blog.date}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <>
                                {blog.authorName && (
                                    <p className={cls("text-sm font-medium", shouldUseLightText ? "text-background" : "text-foreground", authorNameClassName)}>
                                        {blog.authorName}
                                    </p>
                                )}
                                {blog.date && (
                                    <p className={cls("text-xs", shouldUseLightText ? "text-background/75" : "text-foreground/75", dateClassName)}>
                                        {blog.date}
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className={cls("relative z-1 w-full aspect-square", mediaWrapperClassName)}>
                <MediaContent
                    imageSrc={blog.imageSrc}
                    imageAlt={blog.imageAlt || blog.title}
                    imageClassName={cls("absolute inset-0 w-full h-full object-cover", mediaClassName)}
                />
                <OverlayArrowButton ariaLabel={`Read ${blog.title}`} />
            </div>
        </article>
    );
});

BlogCardItem.displayName = "BlogCardItem";

const BlogCardThree = ({
    blogs = [],
    carouselMode = "buttons",
    uniformGridCustomHeightClasses = "min-h-none",
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
    cardContentClassName = "",
    categoryTagClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    authorContainerClassName = "",
    authorAvatarClassName = "",
    authorNameClassName = "",
    dateClassName = "",
    mediaWrapperClassName = "",
    mediaClassName = "",
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
}: BlogCardThreeProps) => {
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
                    useInvertedBackground={useInvertedBackground}
                    cardClassName={cardClassName}
                    cardContentClassName={cardContentClassName}
                    categoryTagClassName={categoryTagClassName}
                    cardTitleClassName={cardTitleClassName}
                    excerptClassName={excerptClassName}
                    authorContainerClassName={authorContainerClassName}
                    authorAvatarClassName={authorAvatarClassName}
                    authorNameClassName={authorNameClassName}
                    dateClassName={dateClassName}
                    mediaWrapperClassName={mediaWrapperClassName}
                    mediaClassName={mediaClassName}
                />
            ))}
        </CardStack>
    );
};

BlogCardThree.displayName = "BlogCardThree";

export default BlogCardThree;
