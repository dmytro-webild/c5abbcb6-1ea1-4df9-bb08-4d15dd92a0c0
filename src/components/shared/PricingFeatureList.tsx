"use client";

import { memo } from "react";
import { Check, LucideIcon } from "lucide-react";
import { cls } from "@/lib/utils";

interface PricingFeatureListProps {
    features: string[];
    icon?: LucideIcon;
    shouldUseLightText?: boolean;
    className?: string;
    featureItemClassName?: string;
    featureIconWrapperClassName?: string;
    featureIconClassName?: string;
    featureTextClassName?: string;
}

const PricingFeatureList = memo(({
    features,
    icon: Icon = Check,
    shouldUseLightText = false,
    className = "",
    featureItemClassName = "",
    featureIconWrapperClassName = "",
    featureIconClassName = "",
    featureTextClassName = "",
}: PricingFeatureListProps) => {
    return (
        <div className={cls("relative z-1 flex flex-col gap-3", className)}>
            {features.map((feature, featureIndex) => (
                <div key={featureIndex} className={cls("flex items-start gap-3", featureItemClassName)}>
                    <div className={cls("h-6 aspect-square primary-button rounded-theme flex items-center justify-center", featureIconWrapperClassName)}>
                        <Icon className={cls("h-4/10 text-primary-cta-text", featureIconClassName)} strokeWidth={1.5} />
                    </div>
                    <span className={cls("text-base", shouldUseLightText ? "text-background" : "text-foreground", featureTextClassName)}>{feature}</span>
                </div>
            ))}
        </div>
    );
});

PricingFeatureList.displayName = "PricingFeatureList";

export default PricingFeatureList;
