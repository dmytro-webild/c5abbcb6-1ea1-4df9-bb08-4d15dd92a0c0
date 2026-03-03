"use client";

import { ThemeProvider } from "@/providers/themeProvider/ThemeProvider";
import NavbarStyleCentered from '@/components/navbar/NavbarStyleCentered/NavbarStyleCentered';
import MediaAbout from '@/components/sections/about/MediaAbout';
import MetricCardEleven from '@/components/sections/metrics/MetricCardEleven';
import TestimonialCardTwelve from '@/components/sections/testimonial/TestimonialCardTwelve';
import FooterBaseReveal from '@/components/sections/footer/FooterBaseReveal';
import { Heart } from 'lucide-react';

export default function AboutPage() {
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

      <div id="about" data-section="about">
        <MediaAbout
          title="Our Mission: Transform Education Through Technology"
          description="Scholaris was founded on a simple belief: every educational institution deserves access to world-class management technology. Over a decade of dedicated innovation has positioned us as the trusted partner for schools seeking excellence, efficiency, and meaningful impact."
          tag="About Scholaris"
          buttons={[{ text: "Explore Our Story", href: "#" }]}
          imageSrc="http://img.b2bpic.net/free-photo/schoolgirl-with-notebook-her-hands-sunset-background-school-goes-school_169016-59085.jpg?_wi=2"
          imageAlt="Modern school building educational campus students learning school environment"
          useInvertedBackground={false}
        />
      </div>

      <div id="impact" data-section="impact">
        <MetricCardEleven
          title="A Legacy of Educational Excellence"
          description="Our commitment to institutional success is reflected in the measurable impact we've delivered across hundreds of schools worldwide. Every statistic represents real schools, real educators, and real student success."
          tag="Our Impact"
          metrics={[
            {
              id: "1",
              value: "5,000+",
              title: "Active Schools",
              description: "Institutions trusting Scholaris globally",
              imageSrc:
                "http://img.b2bpic.net/free-photo/high-angle-globe-with-academic-cap-laptop_23-2148756555.jpg?_wi=2",
            },
            {
              id: "2",
              value: "2.5M+",
              title: "Student Profiles",
              description: "Managed and monitored daily",
              imageSrc:
                "http://img.b2bpic.net/free-photo/diversity-students-graduation-success-celebration-concept_53876-26400.jpg?_wi=2",
            },
            {
              id: "3",
              value: "94%",
              title: "Administrative Time Saved",
              description: "Average reduction in paperwork",
              imageSrc:
                "http://img.b2bpic.net/free-photo/time-minute-alarm-duration-hour-schedule-concept_53876-132557.jpg?_wi=2",
            },
          ]}
          animationType="slide-up"
          textboxLayout="default"
          useInvertedBackground={false}
        />
      </div>

      <div id="trust" data-section="trust">
        <TestimonialCardTwelve
          testimonials={[
            {
              id: "1",
              name: "Dr. Elizabeth Morrison",
              imageSrc:
                "http://img.b2bpic.net/free-photo/portrait-confident-senior-businessman-office_1262-2396.jpg?_wi=2",
            },
            {
              id: "2",
              name: "James Chen",
              imageSrc:
                "http://img.b2bpic.net/free-photo/multi-ethnic-group-three-businesspeople-meeting-modern-o_1139-971.jpg?_wi=2",
            },
            {
              id: "3",
              name: "Sarah Williams",
              imageSrc:
                "http://img.b2bpic.net/free-photo/medium-shot-smiley-woman-library_23-2149204753.jpg?_wi=2",
            },
            {
              id: "4",
              name: "Michael Rodriguez",
              imageSrc:
                "http://img.b2bpic.net/free-photo/cheerful-female-professional-with-tablet-meeting-table-with-satisfied-customers_74855-8866.jpg?_wi=2",
            },
          ]}
          cardTitle="Trusted by educators and administrators who share our vision of educational transformation"
          cardTag="Educational Leaders"
          cardTagIcon={Heart}
          cardAnimation="slide-up"
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