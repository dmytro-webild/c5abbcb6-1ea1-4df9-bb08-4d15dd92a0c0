"use client";

import { memo } from "react";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import { Send } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

export type ChatExchange = {
  userMessage: string;
  aiResponse: string;
};

interface BentoChatAnimationProps {
  aiIcon: LucideIcon;
  userIcon: LucideIcon;
  exchanges: ChatExchange[];
  placeholder: string;
  useInvertedBackground: InvertedBackground;
  className?: string;
}

const BentoChatAnimation = ({
  aiIcon: AiIcon,
  userIcon: UserIcon,
  exchanges,
  placeholder,
  useInvertedBackground,
  className = "",
}: BentoChatAnimationProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

  const messages = exchanges.flatMap((exchange) => [
    { content: exchange.userMessage, isUser: true },
    { content: exchange.aiResponse, isUser: false },
  ]);
  const duplicatedMessages = [...messages, ...messages];

  return (
    <div
      className={cls(
        "relative h-full w-full flex flex-col overflow-hidden",
        className
      )}
    >
      <div className="flex-1 overflow-hidden mask-fade-y">
        <div className="flex flex-col animate-marquee-vertical px-4">
          {duplicatedMessages.map((message, index) => (
            <div
              key={index}
              className={cls(
                "flex items-end gap-2 shrink-0 mb-4",
                message.isUser ? "flex-row-reverse" : "flex-row"
              )}
            >
              {message.isUser ? (
                <div className="shrink-0 h-8 aspect-square rounded-theme primary-button flex items-center justify-center">
                  <UserIcon className="h-4/10 w-auto text-primary-cta-text" />
                </div>
              ) : (
                <div className="shrink-0 h-8 aspect-square rounded-theme card shadow flex items-center justify-center">
                  <AiIcon className={cls("h-4/10 w-auto", shouldUseLightText ? "text-background" : "text-foreground")} />
                </div>
              )}
              <div
                className={cls(
                  "max-w-75/100 px-4 py-3 text-sm leading-tight",
                  message.isUser
                    ? "primary-button rounded-theme-capped rounded-br-none text-primary-cta-text"
                    : "card rounded-theme-capped rounded-bl-none",
                  !message.isUser && (shouldUseLightText ? "text-background" : "text-foreground")
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card shadow rounded-theme p-2 pl-5 flex items-center gap-2">
        <p className={cls("flex-1 text-sm truncate", shouldUseLightText ? "text-background/75" : "text-foreground/75")}>
          {placeholder}
        </p>
        <div className="h-7 w-auto aspect-square primary-button rounded-theme flex items-center justify-center">
          <Send className="h-4/10 w-auto text-primary-cta-text" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
};

BentoChatAnimation.displayName = "BentoChatAnimation";

export default memo(BentoChatAnimation);
