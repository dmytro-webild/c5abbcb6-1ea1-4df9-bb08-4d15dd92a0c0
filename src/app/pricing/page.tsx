"use client";

import { ThemeProvider } from "@/providers/themeProvider/ThemeProvider";
import NavbarStyleCentered from '@/components/navbar/NavbarStyleCentered/NavbarStyleCentered';
import PricingCardTwo from '@/components/sections/pricing/PricingCardTwo';
import FaqBase from '@/components/sections/faq/FaqBase';
import FooterBaseReveal from '@/components/sections/footer/FooterBaseReveal';
import { Sprout, Star, Crown } from 'lucide-react';

export default function PricingPage() {
  return (
    <ThemeProvider
      defaultButtonVariant="shift-hover"
      defaultTextAnimation="reveal-blur"
      borderRadius="rounded"
      contentWidth="medium"
      sizing="mediumLargeSizeLargeTitles"
      background="none"
      cardStyle="layered-gradient"
      primaryButtonStyle="shadow"
      secondaryButtonStyle="glass"
      headingFontWeight="normal"
    >
      <div id="nav" data-section="nav">
        <NavbarStyleCentered
          navItems={[
            { name: "Home", id: "/" },
            { name: "Features", id: "/features" },
            { name: "Pricing", id: "/pricing" },
            { name: "About", id: "/about" },
            { name: "Contact", id: "/contact" },
          ]}
          button={{ text: "Get Started", href: "/contact" }}
          brandName="Scholaris"
        />
      </div>

      <div id="pricing" data-section="pricing">
        <PricingCardTwo
          plans={[
            {
              id: "1",
              badge: "Growing Schools",
              badgeIcon: Sprout,
              price: "$4,999",
              subtitle: "Per Month",
              buttons: [
                { text: "Get Started", href: "#" },
                { text: "Contact Sales", href: "/contact" },
              ],
              features: [
                "Up to 500 students",
                "Basic reporting tools",
                "Email support",
                "Monthly administrator training",
              ],
            },
            {
              id: "2",
              badge: "Established Institutions",
              badgeIcon: Star,
              price: "$9,999",
              subtitle: "Per Month",
              buttons: [
                { text: "Get Started", href: "#" },
                { text: "Contact Sales", href: "/contact" },
              ],
              features: [
                "Up to 2,500 students",
                "Advanced analytics suite",
                "Priority support",
                "Bi-weekly training sessions",
                "Custom integrations",
              ],
            },
            {
              id: "3",
              badge: "Enterprise Excellence",
              badgeIcon: Crown,
              price: "Custom",
              subtitle: "Tailored Solutions",
              buttons: [
                { text: "Schedule Demo", href: "/contact" },
                { text: "Speak to Expert", href: "/contact" },
              ],
              features: [
                "Unlimited students",
                "White-label options",
                "Dedicated account manager",
                "24/7 premium support",
                "Custom development",
                "Multi-campus management",
              ],
            },
          ]}
          title="Transparent, Scalable Pricing"
          description="Choose the plan that perfectly fits your institution's size and aspirations. All plans include premium support and regular feature updates."
          tag="Investment in Excellence"
          animationType="slide-up"
          textboxLayout="default"
          useInvertedBackground={false}
        />
      </div>

      <div id="faq" data-section="faq">
        <FaqBase
          faqs={[
            {
              id: "1",
              title: "How long does implementation typically take?",
              content:
                "Our implementation timeline varies based on school size and complexity. Most institutions go live within 4-8 weeks. This includes data migration, staff training, and comprehensive system setup. Our dedicated implementation team works closely with your IT department to ensure smooth transition.",
            },
            {
              id: "2",
              title: "What security measures protect student data?",
              content:
                "We employ enterprise-grade security including end-to-end encryption, role-based access controls, regular penetration testing, and GDPR/FERPA compliance. All data is backed up hourly with redundant systems. We're SOC 2 Type II certified and maintain the highest industry security standards.",
            },
            {
              id: "3",
              title: "Can Scholaris integrate with existing systems?",
              content:
                "Yes. Scholaris integrates seamlessly with popular education platforms including Google Classroom, Microsoft Teams, learning management systems, and accounting software. Our API documentation supports custom integrations. Our technical team can work with your vendors.",
            },
          ]}
          title="Frequently Asked Questions"
          description="Find comprehensive answers to common questions about Scholaris implementation, features, and support."
          tag="Support Center"
          faqsAnimation="slide-up"
          textboxLayout="default"
          useInvertedBackground={false}
        />
      </div>

      <div id="footer" data-section="footer">
        <FooterBaseReveal
          columns={[
            {
              title: "Product",
              items: [
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Security", href: "#" },
                { label: "API Documentation", href: "#" },
              ],
            },
            {
              title: "Company",
              items: [
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Press", href: "#" },
              ],
            },
            {
              title: "Resources",
              items: [
                { label: "Support", href: "#" },
                { label: "Community", href: "#" },
                { label: "Contact", href: "/contact" },
                { label: "Partners", href: "#" },
              ],
            },
          ]}
          copyrightText="© 2025 Scholaris. All rights reserved."
        />
      </div>
    </ThemeProvider>
  );
}