"use client";

import { ThemeProvider } from "@/providers/themeProvider/ThemeProvider";
import NavbarStyleCentered from '@/components/navbar/NavbarStyleCentered/NavbarStyleCentered';
import FeatureCardSix from '@/components/sections/feature/FeatureCardSix';
import ProductCardThree from '@/components/sections/product/ProductCardThree';
import ContactSplit from '@/components/sections/contact/ContactSplit';
import FooterBaseReveal from '@/components/sections/footer/FooterBaseReveal';
import { Rocket, Home, Users, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
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

      <div id="features-detail" data-section="features-detail">
        <FeatureCardSix
          title="Comprehensive Feature Suite"
          description="Discover the complete set of tools that empower institutions to excel. Each feature is meticulously designed to simplify workflows and maximize impact."
          tag="Core Capabilities"
          features={[
            {
              id: 1,
              title: "Digital Classroom Integration",              description:
                "Seamlessly connect with popular learning management systems and virtual classroom platforms. Enable educators to deliver engaging hybrid and remote learning experiences with integrated assessment and communication tools.",              imageSrc:
                "http://img.b2bpic.net/free-photo/rear-view-young-college-student-paying-attention-listening-her-online-teacher-laptop-home_662251-2487.jpg"},
            {
              id: 2,
              title: "Advanced Assessment Tools",              description:
                "Create, deploy, and analyze comprehensive assessments that provide meaningful insights into student progress. Support multiple question types, adaptive testing, and detailed analytics to inform instructional decisions.",              imageSrc:
                "http://img.b2bpic.net/free-photo/classroom-class-study-academic-schedule_53876-133781.jpg"},
            {
              id: 3,
              title: "Financial Management Module",              description:
                "Manage institutional finances with precision. Track budgets, automate invoicing, monitor accounts payable and receivable, and generate comprehensive financial reports.",              imageSrc:
                "http://img.b2bpic.net/free-photo/empty-modern-office-business-entrepreneur-with-laptop_482257-91248.jpg"},
          ]}
          textboxLayout="default"
          useInvertedBackground={false}
          buttonAnimation="slide-up"
        />
      </div>

      <div id="capabilities" data-section="capabilities">
        <ProductCardThree
          products={[
            {
              id: "1",              name: "Digital Classroom Integration",              price: "From $2,499/year",              imageSrc:
                "http://img.b2bpic.net/free-photo/rear-view-young-college-student-paying-attention-listening-her-online-teacher-laptop-home_662251-2487.jpg",              imageAlt: "Digital classroom interface",              initialQuantity: 1,
            },
            {
              id: "2",              name: "Advanced Assessment Tools",              price: "From $1,999/year",              imageSrc:
                "http://img.b2bpic.net/free-photo/classroom-class-study-academic-schedule_53876-133781.jpg",              imageAlt: "Assessment dashboard",              initialQuantity: 1,
            },
            {
              id: "3",              name: "Financial Management Module",              price: "From $3,299/year",              imageSrc:
                "http://img.b2bpic.net/free-photo/empty-modern-office-business-entrepreneur-with-laptop_482257-91248.jpg",              imageAlt: "Financial management tools",              initialQuantity: 1,
            },
            {
              id: "4",              name: "Mobile Parent App",              price: "From $999/year",              imageSrc:
                "http://img.b2bpic.net/free-photo/medium-shot-kid-parent-with-devices_23-2149610821.jpg",              imageAlt: "Mobile parent application",              initialQuantity: 1,
            },
          ]}
          title="Premium Features Suite"
          description="Every feature crafted for maximum institutional value and seamless integration into your educational operations."
          tag="Comprehensive Modules"
          gridVariant="two-columns-alternating-heights"
          animationType="slide-up"
          textboxLayout="default"
          useInvertedBackground={false}
        />
      </div>

      <div id="cta" data-section="cta">
        <ContactSplit
          tag="Ready to Get Started?"
          title="Experience the Scholaris Difference"
          description="Schedule a personalized demo to see how our platform can transform your institution. Our experts will guide you through features tailored to your school's unique needs."
          tagIcon={Rocket}
          tagAnimation="slide-up"
          background={{ variant: "radial-gradient" }}
          useInvertedBackground={false}
          imageSrc="http://img.b2bpic.net/free-photo/business-meeting-office_1268-21517.jpg"
          imageAlt="Professional consultation"
          mediaAnimation="slide-up"
          mediaPosition="right"
          inputPlaceholder="your.email@school.edu"
          buttonText="Schedule Demo"
          termsText="We respect your privacy and institutional autonomy. Unsubscribe anytime."
        />
      </div>

      <div id="footer" data-section="footer">
        <FooterBaseReveal
          columns={[
            {
              title: "Product",              items: [
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Security", href: "#" },
                { label: "API Documentation", href: "#" },
              ],
            },
            {
              title: "Company",              items: [
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Press", href: "#" },
              ],
            },
            {
              title: "Resources",              items: [
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