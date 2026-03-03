"use client";

import { ThemeProvider } from "@/providers/themeProvider/ThemeProvider";
import NavbarStyleCentered from '@/components/navbar/NavbarStyleCentered/NavbarStyleCentered';
import HeroBillboardDashboard from '@/components/sections/hero/HeroBillboardDashboard';
import MediaAbout from '@/components/sections/about/MediaAbout';
import FeatureCardSix from '@/components/sections/feature/FeatureCardSix';
import MetricCardEleven from '@/components/sections/metrics/MetricCardEleven';
import TestimonialCardTwelve from '@/components/sections/testimonial/TestimonialCardTwelve';
import ContactSplit from '@/components/sections/contact/ContactSplit';
import FooterBaseReveal from '@/components/sections/footer/FooterBaseReveal';
import { Sparkles, GraduationCap, Home, Users, Calendar, BookOpen, CheckCircle, Heart, Rocket, Send, ArrowLeftRight, CircleDollarSign, Sprout, Star, Crown } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
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

      <div id="hero" data-section="hero">
        <HeroBillboardDashboard
          title="Elevate Educational Excellence"
          description="Transform your institution with Scholaris—the intelligent school management platform designed for modern educators. Streamline operations, enhance engagement, and unlock unlimited potential for your students and staff."
          tag="Premium EdTech Solution"
          tagIcon={Sparkles}
          tagAnimation="slide-up"
          buttons={[
            { text: "Explore Platform", href: "/features" },
            { text: "View Demo", href: "#" },
          ]}
          buttonAnimation="slide-up"
          background={{ variant: "radial-gradient" }}
          dashboard={{
            title: "Real-Time School Intelligence",            logoIcon: GraduationCap,
            imageSrc: "http://img.b2bpic.net/free-photo/classroom-class-study-academic-schedule_53876-133781.jpg",            searchPlaceholder: "Search students, classes, schedules...",            buttons: [
              { text: "Dashboard", href: "#" },
              { text: "Analytics", href: "#" },
            ],
            sidebarItems: [
              { icon: Home, active: true },
              { icon: Users, active: false },
              { icon: Calendar, active: false },
              { icon: BookOpen, active: false },
            ],
            stats: [
              {
                title: "Active Students",                values: [1240, 1456, 1789],
                description: "Enrolled and engaged"},
              {
                title: "Course Completion",                values: [94, 96, 98],
                valueSuffix: "%",                description: "Success rate across programs"},
              {
                title: "Staff Productivity",                values: [87, 91, 95],
                valueSuffix: "%",                description: "Operational efficiency"},
            ],
            chartTitle: "Enrollment Growth",            chartData: [
              { value: 45 },
              { value: 62 },
              { value: 78 },
              { value: 89 },
              { value: 95 },
            ],
            listTitle: "Recent Activities",            listItems: [
              {
                icon: CheckCircle,
                title: "Term Results Published",                status: "Completed"},
              {
                icon: Users,
                title: "New Enrollment: 45 Students",                status: "Processed"},
              {
                icon: Calendar,
                title: "Academic Calendar Updated",                status: "Active"},
            ],
          }}
        />
      </div>

      <div id="about" data-section="about">
        <MediaAbout
          title="Why Institutions Choose Scholaris"
          description="With over a decade of experience transforming educational institutions, we understand the unique challenges schools face. Our platform combines institutional wisdom with cutting-edge technology to deliver measurable results."
          tag="Our Story"
          buttons={[{ text: "Learn More", href: "/about" }]}
          imageSrc="http://img.b2bpic.net/free-photo/schoolgirl-with-notebook-her-hands-sunset-background-school-goes-school_169016-59085.jpg"
          imageAlt="Modern school building educational campus students learning school environment"
          useInvertedBackground={false}
        />
      </div>

      <div id="features" data-section="features">
        <FeatureCardSix
          title="Four-Pillar Excellence Framework"
          description="Each pillar represents a core dimension of institutional management, working harmoniously to transform your educational environment."
          tag="Platform Architecture"
          features={[
            {
              id: 1,
              title: "Intelligent Student Management",              description:
                "Centralized profiles, progressive tracking, and personalized learning pathways. Monitor academic performance, behavioral development, and holistic growth with real-time insights.",              imageSrc:
                "http://img.b2bpic.net/free-photo/classroom-class-study-academic-schedule_53876-133781.jpg"},
            {
              id: 2,
              title: "Staff Empowerment Suite",              description:
                "Streamlined scheduling, attendance management, and professional development tracking. Empower educators with tools that reduce administrative burden and maximize teaching effectiveness.",              imageSrc:
                "http://img.b2bpic.net/free-photo/medium-shot-people-working-indoors_23-2149831295.jpg"},
            {
              id: 3,
              title: "Parent Engagement Portal",              description:
                "Real-time communication, progress reports, and involvement opportunities. Foster strong home-school partnerships that accelerate student success and satisfaction.",              imageSrc:
                "http://img.b2bpic.net/free-photo/medium-shot-smiley-parents-kid_23-2149610835.jpg"},
            {
              id: 4,
              title: "Advanced Analytics Engine",              description:
                "Actionable insights into institutional performance, trend analysis, and predictive modeling. Make data-driven decisions that enhance operational efficiency and student outcomes.",              imageSrc:
                "http://img.b2bpic.net/free-photo/young-woman-analysing-charts-laptop-start-up-business-meeting-room_482257-5026.jpg"},
          ]}
          textboxLayout="default"
          useInvertedBackground={false}
          buttonAnimation="slide-up"
        />
      </div>

      <div id="metrics" data-section="metrics">
        <MetricCardEleven
          title="Proven Impact Across Institutions"
          description="Our platform has transformed educational experiences for thousands of schools worldwide, delivering measurable improvements in efficiency and student outcomes."
          tag="Success Stories"
          metrics={[
            {
              id: "1",              value: "5,000+",              title: "Active Schools",              description: "Institutions trusting Scholaris globally",              imageSrc:
                "http://img.b2bpic.net/free-photo/high-angle-globe-with-academic-cap-laptop_23-2148756555.jpg"},
            {
              id: "2",              value: "2.5M+",              title: "Student Profiles",              description: "Managed and monitored daily",              imageSrc:
                "http://img.b2bpic.net/free-photo/diversity-students-graduation-success-celebration-concept_53876-26400.jpg"},
            {
              id: "3",              value: "94%",              title: "Administrative Time Saved",              description: "Average reduction in paperwork",              imageSrc:
                "http://img.b2bpic.net/free-photo/time-minute-alarm-duration-hour-schedule-concept_53876-132557.jpg"},
            {
              id: "4",              value: "99.9%",              title: "Platform Uptime",              description: "Reliable infrastructure guarantee",              imageSrc:
                "http://img.b2bpic.net/free-photo/technician-doing-yearly-checkup-using-tablet-preserve-data-center-electronics_482257-122252.jpg"},
          ]}
          animationType="slide-up"
          textboxLayout="default"
          useInvertedBackground={false}
        />
      </div>

      <div id="testimonials" data-section="testimonials">
        <TestimonialCardTwelve
          testimonials={[
            {
              id: "1",              name: "Dr. Elizabeth Morrison",              imageSrc:
                "http://img.b2bpic.net/free-photo/portrait-confident-senior-businessman-office_1262-2396.jpg"},
            {
              id: "2",              name: "James Chen",              imageSrc:
                "http://img.b2bpic.net/free-photo/multi-ethnic-group-three-businesspeople-meeting-modern-o_1139-971.jpg"},
            {
              id: "3",              name: "Sarah Williams",              imageSrc:
                "http://img.b2bpic.net/free-photo/medium-shot-smiley-woman-library_23-2149204753.jpg"},
            {
              id: "4",              name: "Michael Rodriguez",              imageSrc:
                "http://img.b2bpic.net/free-photo/cheerful-female-professional-with-tablet-meeting-table-with-satisfied-customers_74855-8866.jpg"},
            {
              id: "5",              name: "Dr. Amara Okonkwo",              imageSrc:
                "http://img.b2bpic.net/free-photo/smiling-businessman-holding-jacket-shoulder_1262-3853.jpg"},
            {
              id: "6",              name: "Jessica Thompson",              imageSrc:
                "http://img.b2bpic.net/free-photo/businesswoman-using-laptop_1398-1463.jpg"},
          ]}
          cardTitle="Trusted by 5,000+ educational institutions worldwide transforming how schools operate and students thrive"
          cardTag="Educators & Administrators"
          cardTagIcon={Heart}
          cardAnimation="slide-up"
          useInvertedBackground={false}
        />
      </div>

      <div id="contact" data-section="contact">
        <ContactSplit
          tag="Get In Touch"
          title="Ready to Transform Your Institution?"
          description="Join thousands of schools revolutionizing their operations. Our team is ready to discuss how Scholaris can drive excellence at your institution. Let's explore what's possible together."
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