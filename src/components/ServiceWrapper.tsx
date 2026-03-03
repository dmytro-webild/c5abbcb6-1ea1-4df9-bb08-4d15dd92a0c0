'use client';

import Script from 'next/script';

export function ServiceWrapper({ children }: { children: React.ReactNode }) {
    const websiteId = process.env.NEXT_PUBLIC_WEBSITE_ANALYTICS_ID;
    
    return (
        <>
            {websiteId && (
                <Script
                    async
                    defer
                    data-website-id={websiteId}
                    src="https://analytics.webild.io/script.js"
                    strategy="afterInteractive"
                />
            )}
            {children}
        </>
    );
}
