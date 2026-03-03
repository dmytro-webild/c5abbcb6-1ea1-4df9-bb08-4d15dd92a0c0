"use client";

import React, { useState, useEffect } from "react";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
    ArrowUpRight,
    Bell,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
} from "lucide-react";
import AnimationContainer from "@/components/sections/AnimationContainer";
import Button from "@/components/button/Button";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import MediaContent from "@/components/shared/MediaContent";
import BentoLineChart from "@/components/bento/BentoLineChart/BentoLineChart";
import type { ChartDataItem } from "@/components/bento/BentoLineChart/utils";
import type { ButtonConfig } from "@/types/button";
import { useCardAnimation } from "@/components/cardStack/hooks/useCardAnimation";
import TextNumberCount from "@/components/text/TextNumberCount";

export interface DashboardSidebarItem {
    icon: LucideIcon;
    active?: boolean;
}

export interface DashboardStat {
    title: string;
    titleMobile?: string;
    values: [number, number, number];
    valuePrefix?: string;
    valueSuffix?: string;
    valueFormat?: Omit<Intl.NumberFormatOptions, "notation"> & {
        notation?: Exclude<Intl.NumberFormatOptions["notation"], "scientific" | "engineering">;
    };
    description: string;
}

export interface DashboardListItem {
    icon: LucideIcon;
    title: string;
    status: string;
}

interface DashboardProps {
    title: string;
    stats: [DashboardStat, DashboardStat, DashboardStat];
    logoIcon: LucideIcon;
    sidebarItems: DashboardSidebarItem[];
    searchPlaceholder?: string;
    buttons: ButtonConfig[];
    chartTitle?: string;
    chartData?: ChartDataItem[];
    listItems: DashboardListItem[];
    listTitle?: string;
    imageSrc: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    className?: string;
    containerClassName?: string;
    sidebarClassName?: string;
    statClassName?: string;
    chartClassName?: string;
    listClassName?: string;
}

const Dashboard = ({
    title,
    stats,
    logoIcon: LogoIcon,
    sidebarItems,
    searchPlaceholder = "Search",
    buttons,
    chartTitle = "Revenue Overview",
    chartData,
    listItems,
    listTitle = "Recent Transfers",
    imageSrc,
    videoSrc,
    imageAlt = "",
    videoAriaLabel = "Avatar video",
    className = "",
    containerClassName = "",
    sidebarClassName = "",
    statClassName = "",
    chartClassName = "",
    listClassName = "",
}: DashboardProps) => {
    const theme = useTheme();
    const [activeStatIndex, setActiveStatIndex] = useState(0);
    const [statValueIndex, setStatValueIndex] = useState(0);
    const { itemRefs: statRefs } = useCardAnimation({
        animationType: "slide-up",
        itemCount: 3,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStatValueIndex((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const statCard = (stat: DashboardStat, index: number, withRef = false) => (
        <div
            key={index}
            ref={withRef ? (el) => { statRefs.current[index] = el; } : undefined}
            className={cls(
                "group rounded-theme-capped p-5 flex flex-col justify-between h-40 md:h-50 card shadow",
                statClassName
            )}
        >
            <div className="flex items-center justify-between">
                <p className="text-base font-medium text-foreground">
                    {stat.title}
                </p>
                <div className="h-6 w-auto aspect-square rounded-theme secondary-button flex items-center justify-center transition-transform duration-300 hover:-translate-y-[3px]">
                    <ArrowUpRight className="h-1/2 w-1/2 text-secondary-cta-text transition-transform duration-300 group-hover:rotate-45" />
                </div>
            </div>
            <div className="flex flex-col">
                <TextNumberCount
                    value={stat.values[statValueIndex]}
                    prefix={stat.valuePrefix}
                    suffix={stat.valueSuffix}
                    format={stat.valueFormat}
                    className="text-xl md:text-3xl font-medium text-foreground truncate"
                />
                <p className="text-sm text-foreground/75 truncate">
                    {stat.description}
                </p>
            </div>
        </div>
    );

    return (
        <div
            className={cls(
                "w-content-width flex gap-5 p-5 rounded-theme-capped card shadow",
                className
            )}
        >
            <div
                className={cls(
                    "hidden md:flex gap-5 shrink-0",
                    sidebarClassName
                )}
            >
                <div className="flex flex-col items-center gap-10" >
                    <div className="relative secondary-button h-9 w-auto aspect-square rounded-theme flex items-center justify-center transition-transform duration-300 hover:-translate-y-[3px]">
                        <LogoIcon className="h-4/10 w-4/10 text-secondary-cta-text" />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {sidebarItems.map((item, index) => (
                            <div
                                key={index}
                                className={cls(
                                    "h-9 w-auto aspect-square rounded-theme flex items-center justify-center transition-transform duration-300 hover:-translate-y-[3px]",
                                    item.active
                                        ? "primary-button"
                                        : "secondary-button"
                                )}
                            >
                                <item.icon
                                    className={cls(
                                        "h-4/10 w-4/10",
                                        item.active
                                            ? "text-primary-cta-text"
                                            : "text-secondary-cta-text"
                                    )}
                                    strokeWidth={1.5}
                                />
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="h-full w-px bg-background-accent" />
            </div>
            <div
                className={cls(
                    "flex-1 flex flex-col gap-5 min-w-0",
                    containerClassName
                )}
            >
                <div className="flex items-center justify-between h-9">
                    <div className="h-9 px-6 rounded-theme card shadow flex items-center gap-3 transition-all duration-300 hover:px-8">
                        <Search className="h-(--text-sm) w-auto text-foreground" />
                        <p className="text-sm text-foreground">
                            {searchPlaceholder}
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="h-9 w-auto aspect-square secondary-button rounded-theme flex items-center justify-center transition-transform duration-300 hover:-translate-y-[3px]">
                            <Bell className="h-4/10 w-4/10 text-secondary-cta-text" />
                        </div>
                        <div className="h-9 w-auto aspect-square rounded-theme overflow-hidden transition-transform duration-300 hover:-translate-y-[3px]">
                            <MediaContent
                                imageSrc={imageSrc}
                                videoSrc={videoSrc}
                                imageAlt={imageAlt}
                                videoAriaLabel={videoAriaLabel}
                                imageClassName="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-px bg-background-accent" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <h2 className="text-xl md:text-3xl font-medium text-foreground">
                        {title}
                    </h2>
                    <div className="flex items-center gap-5">
                        {buttons.slice(0, 2).map((button, index) => (
                            <Button
                                key={`${button.text}-${index}`}
                                {...getButtonProps(
                                    button,
                                    index,
                                    theme.defaultButtonVariant
                                )}
                            />
                        ))}
                    </div>
                </div>
                <div className="hidden md:grid grid-cols-3 gap-5">
                    {stats.map((stat, index) => statCard(stat, index, true))}
                </div>
                <div className="flex flex-col gap-3 md:hidden">
                    <AnimationContainer
                        key={activeStatIndex}
                        className="w-full"
                        animationType="fade"
                    >
                        {statCard(stats[activeStatIndex], activeStatIndex)}
                    </AnimationContainer>
                    <div className="w-full flex justify-end gap-3">
                        <button
                            onClick={() => setActiveStatIndex((prev) => (prev - 1 + 3) % 3)}
                            className="secondary-button h-8 aspect-square flex items-center justify-center rounded-theme cursor-pointer transition-transform duration-300 hover:-translate-y-[3px]"
                            type="button"
                            aria-label="Previous stat"
                        >
                            <ChevronLeft className="h-[40%] w-auto aspect-square text-secondary-cta-text" />
                        </button>
                        <button
                            onClick={() => setActiveStatIndex((prev) => (prev + 1) % 3)}
                            className="secondary-button h-8 aspect-square flex items-center justify-center rounded-theme cursor-pointer transition-transform duration-300 hover:-translate-y-[3px]"
                            type="button"
                            aria-label="Next stat"
                        >
                            <ChevronRight className="h-[40%] w-auto aspect-square text-secondary-cta-text" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div
                        className={cls(
                            "group/chart rounded-theme-capped p-3 md:p-4 flex flex-col h-80 card shadow",
                            chartClassName
                        )}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-base font-medium text-foreground">
                                {chartTitle}
                            </p>
                            <div className="h-6 w-auto aspect-square rounded-theme secondary-button flex items-center justify-center transition-transform duration-300 hover:-translate-y-[3px]">
                                <ArrowUpRight className="h-1/2 w-1/2 text-secondary-cta-text transition-transform duration-300 group-hover/chart:rotate-45" />
                            </div>
                        </div>
                        <div className="flex-1 min-h-0">
                            <BentoLineChart
                                data={chartData}
                                metricLabel={chartTitle}
                                useInvertedBackground={false}
                            />
                        </div>
                    </div>
                    <div
                        className={cls(
                            "group/list rounded-theme-capped p-5 flex flex-col h-80 card shadow",
                            listClassName
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-base font-medium text-foreground">
                                {listTitle}
                            </p>
                            <div className="h-6 w-auto aspect-square rounded-theme secondary-button flex items-center justify-center transition-transform duration-300 hover:-translate-y-[3px]">
                                <Plus className="h-1/2 w-1/2 text-secondary-cta-text transition-transform duration-300 group-hover/list:rotate-90" />
                            </div>
                        </div>
                        <div className="overflow-hidden mask-fade-y flex-1 min-h-0 mt-3">
                            <div className="flex flex-col animate-marquee-vertical px-px">
                                {[...listItems, ...listItems, ...listItems, ...listItems].map((item, index) => {
                                    const ItemIcon = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2.5 p-2 rounded-theme bg-foreground/3 border border-foreground/5 flex-shrink-0 mb-2"
                                        >
                                            <div className="h-8 w-auto aspect-square rounded-theme shrink-0 flex items-center justify-center secondary-button">
                                                <ItemIcon className="h-4/10 w-4/10 text-secondary-cta-text" />
                                            </div>
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <p className="text-xs truncate text-foreground">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-foreground/75">
                                                    {item.status}
                                                </p>
                                            </div>
                                            <ChevronRight className="h-(--text-xs) w-auto shrink-0 text-foreground/75" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Dashboard.displayName = "Dashboard";

export default React.memo(Dashboard);
