"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  Server,
  Activity,
  Lock,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
  Twitter,
  Github,
  Linkedin,
  Cloud,
  Database,
  MessageSquare,
  Terminal,
  GitBranch,
} from "lucide-react";
import Image from "next/image";
// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const partners = [
  { name: 'Alea', logo: '/trusted/alea.webp' },
  { name: 'Approvely', logo: '/trusted/approvely.svg' },
  { name: 'AWS', logo: '/trusted/aws.png' },
  { name: 'Chargebacks911', logo: '/trusted/chargebacks911.svg' },
  { name: 'Customer.io', logo: '/trusted/customerio.svg' },
  { name: 'Finix', logo: '/trusted/Finix.png' },
  { name: 'GeoComply', logo: '/trusted/geocomply.png' },
  { name: 'Hacksaw', logo: '/trusted/hacksaw.png' },
  { name: 'Iconic21', logo: '/trusted/iconic21.svg' },
  { name: 'Intercom', logo: '/trusted/intercom.jpg' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Reordered sections to match the new menu order and page layout
      const sections = ["platform", "compliance", "integrations", "solutions"];
      // Offset to trigger active state slightly before the section hits the top
      const scrollPosition = window.scrollY + 200;

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          return (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          );
        }
        return false;
      });

      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120; // Header height + gap
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 flex justify-center pointer-events-none"
    >
      <nav className="w-full max-w-6xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-full px-6 pr-2 pointer-events-auto">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div
            className="flex items-center space-x-2 pl-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img src="/logo.svg" alt="Gamma Sweep" className="h-6 w-auto" />
            </motion.div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["Platform", "Compliance", "Integrations", "Solutions"].map(
              (item) => {
                const sectionId = item.toLowerCase();
                return (
                  <a
                    key={item}
                    href={`#${sectionId}`}
                    onClick={(e) => scrollToSection(e, sectionId)}
                    className={`relative text-sm font-medium transition-colors ${
                      activeSection === sectionId
                        ? "text-[#485BFF]"
                        : "text-slate-600 hover:text-[#485BFF]"
                    }`}
                  >
                    {item}
                    {activeSection === sectionId && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#485BFF] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              }
            )}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#485BFF] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#3848cc] transition-colors shadow-lg shadow-blue-500/20"
            >
              Start Building
            </motion.button>
          </div>

          <div className="md:hidden pr-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-[#485BFF] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="md:hidden overflow-hidden pb-4"
            >
              <div className="px-2 space-y-2">
                {["Platform", "Compliance", "Integrations", "Solutions"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => scrollToSection(e, item.toLowerCase())}
                      className="block px-4 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-[#485BFF] rounded-lg"
                    >
                      {item}
                    </a>
                  )
                )}
                <div className="pt-2">
                  <button className="w-full bg-[#485BFF] text-white py-3 rounded-xl text-base font-medium shadow-lg shadow-blue-500/20">
                    Start Building
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
};

const MockDashboard = () => (
  <motion.div
    initial={{ opacity: 0, rotateY: -10, x: 50 }}
    animate={{ opacity: 1, rotateY: 0, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="relative w-full max-w-lg mx-auto lg:mx-0 perspective-1000"
  >
    {/* Background Decorative Blobs */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-20 -right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
    />
    <motion.div
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
      className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
    />

    {/* Main Interface Card */}
    <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500"
          />
          <span className="text-xs font-medium text-emerald-600">
            System Operational
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Total Requests
            </div>
            <div className="text-3xl font-bold text-slate-900">24.8M</div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            className="text-emerald-500 text-sm font-medium bg-emerald-50 px-2 py-1 rounded"
          >
            +12.4%
          </motion.div>
        </div>

        {/* Mock Chart Area */}
        <div className="h-32 flex items-end space-x-2">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex-1 bg-slate-900/5 hover:bg-[#485BFF] transition-colors rounded-t-sm"
            />
          ))}
        </div>

        {/* Status Rows */}
        <div className="space-y-3">
          {[
            { label: "US-East-1", status: "Healthy", lat: "12ms" },
            { label: "EU-West-2", status: "Healthy", lat: "24ms" },
            { label: "AP-South-1", status: "Rerouting", lat: "45ms" },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    row.status === "Healthy" ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <span className="text-sm font-medium text-slate-700">
                  {row.label}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-slate-500">{row.lat}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    row.status === "Healthy"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {row.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Floating Element */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -right-6 top-24 bg-white p-4 rounded-xl shadow-xl border border-slate-100 w-48"
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Shield className="w-5 h-5 text-[#485BFF]" />
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500">Compliance</div>
          <div className="text-sm font-bold text-slate-900">SOC2 Ready</div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Hero = () => (
  <section className="relative pt-48 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left Column */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12 lg:mb-0 max-w-2xl"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold tracking-wide uppercase mb-6"
          >
            v2.0 Now Available
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
          >
            Infrastructure for the <br />
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-[#485BFF] via-emerald-500 to-[#485BFF] bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Next Generation
            </motion.span>
            <br /> of Scale.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg"
          >
            Deploy, manage, and scale your application infrastructure with the
            reliability of a bank and the speed of a startup. Designed for
            operators who demand control.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-[#485BFF] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#3848cc] transition-colors shadow-lg shadow-blue-500/25 flex items-center"
            >
              Start Deploying
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-600 font-medium px-8 py-4 border border-[#15F5BA] rounded-full hover:bg-[#15F5BA]/10 hover:text-slate-900 transition-colors"
            >
              Read the Documentation
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex items-center space-x-6 text-sm text-slate-500"
          >
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
              99.99% Uptime
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
              SOC2 Type II
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <MockDashboard />
      </div>
    </div>
  </section>
);

const LogoTicker = () => (
  <section className="py-10 border-y border-slate-100 bg-[#F0F3FF] overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm font-medium text-slate-400 mb-8 uppercase tracking-wider">
        Trusted by high-growth teams at
      </p>

      <div className="relative w-full overflow-hidden">
        {/* Blur Effects on Edges */}
        <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-[#F0F3FF] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-[#F0F3FF] to-transparent pointer-events-none" />

        <motion.div
          className="flex items-center gap-16 w-max"
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Duplicate list 4 times to ensure infinite scroll fills wide screens */}
       {[...Array(4)].map((_, groupIndex) => (
  <React.Fragment key={groupIndex}>
    {partners.map((partner, i) => (
      <div
        key={`${groupIndex}-${i}`}
        className="flex items-center justify-center font-bold text-xl text-slate-800 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
      >
        <img 
          src={partner.logo} 
          alt={partner.name}
          className="h-8 w-auto object-contain"
        />
      </div>
    ))}
  </React.Fragment>
))}
        </motion.div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="platform" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl font-bold text-slate-900 mb-4"
        >
          Built for the Modern Operator
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-lg text-slate-600">
          We abstracted the complexity of traditional cloud providers into a
          unified control plane. Powerful enough for experts, accessible enough
          for everyone.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: <Globe className="w-6 h-6 text-[#485BFF]" />,
            title: "Global Edge Network",
            desc: "Deploy your logic to 35+ regions instantly. We handle the routing and replication automatically.",
          },
          {
            icon: <Zap className="w-6 h-6 text-amber-500" />,
            title: "Instant Rollbacks",
            desc: "Mistakes happen. Revert deployments in sub-second timeframes with zero downtime.",
          },
          {
            icon: <Activity className="w-6 h-6 text-emerald-500" />,
            title: "Real-time Observability",
            desc: "Metrics, logs, and traces are integrated out of the box. No external agents required.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="group p-8 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Compliance = () => (
  <section
    id="compliance"
    className="py-24 bg-[#F0F3FF] border-t border-slate-100"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-slate-900 mb-6"
          >
            Security is not an afterthought.
            <br />
            It's our foundation.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-8">
            Enterprises trust GAMMA SWEEP because we prioritize compliance and
            security at every layer of the stack.
          </motion.p>

          <div className="space-y-4">
            {[
              "SOC2 Type II Certified",
              "ISO 27001 Compliant",
              "GDPR & HIPAA Ready",
              "Automated Penetration Testing",
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <Shield className="w-5 h-5 text-emerald-500 mr-3" />
                <span className="font-medium text-slate-900">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-12 lg:mt-0 grid grid-cols-2 gap-4"
        >
          {[
            { icon: Lock, label: "End-to-End Encryption" },
            { icon: Server, label: "Isolated VPCs", offset: true },
            { icon: Globe, label: "DDoS Protection" },
            { icon: Activity, label: "99.99% SLA", offset: true },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className={`bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center aspect-square hover:shadow-lg transition-shadow ${
                item.offset ? "translate-y-8" : ""
              }`}
            >
              <item.icon className="w-10 h-10 text-slate-300 mb-4" />
              <div className="font-bold text-slate-900">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

const IntegrationEcosystem = () => {
  const integrations = [
    {
      icon: GitBranch,
      title: "CI/CD Pipelines",
      desc: "Native integration with GitHub Actions, GitLab CI, and CircleCI for automated deployments.",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: Cloud,
      title: "Multi-Cloud",
      desc: "Unified control plane for AWS, Google Cloud, and Azure resources.",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Database,
      title: "Managed Data",
      desc: "One-click provisioning for PostgreSQL, Redis, and MongoDB clusters.",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      icon: Activity, // Reuse
      title: "Observability",
      desc: "Forward logs and metrics to Datadog, New Relic, or Prometheus instantly.",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      icon: MessageSquare,
      title: "Notifications",
      desc: "Real-time alerts via Slack, Microsoft Teams, or PagerDuty.",
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
    {
      icon: Terminal,
      title: "Infrastructure as Code",
      desc: "Full support for Terraform, Pulumi, and Ansible playbooks.",
      color: "text-slate-500",
      bg: "bg-slate-50",
    },
  ];

  return (
    <section
      id="integrations"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#F0F3FF] rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#F0F3FF] rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-slate-900 mb-4"
          >
            Integration Ecosystem
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-600">
            Connect your existing stack with a few clicks. We play nice with
            everyone.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {integrations.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              }}
              className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg} group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const UseCase = () => {
  const [activeTab, setActiveTab] = useState("Developers");

  const data = {
    Developers: {
      challenge:
        "Managing Kubernetes clusters, VPC peering, and database replication across multiple regions was draining engineering resources and slowing down feature velocity.",
      solution:
        "GAMMA SWEEP unified our deployment pipeline. We reduced DevOps overhead by 60% and improved global latency by 200ms within the first week of migration.",
      author: "Sarah Jenkins",
      role: "CTO at FinTech Global",
      initials: "SJ",
    },
    "Platform Engineers": {
      challenge:
        "Inconsistent environments between staging and production led to 'it works on my machine' syndrome, causing deployment failures and increasing MTTR significantly.",
      solution:
        "Immutable infrastructure definitions and automated drift detection ensured 100% environment parity. Our rollback rate dropped to near zero.",
      author: "Mark Chen",
      role: "VP of Engineering at StreamLine",
      initials: "MC",
    },
    "C-Suite": {
      challenge:
        "Cloud costs were spiraling out of control with no visibility into unit economics per customer, making it impossible to forecast margins accurately.",
      solution:
        "Granular cost allocation and automated resource rightsizing reduced our cloud bill by 40% while maintaining 99.99% uptime guarantees.",
      author: "Elena Rodriguez",
      role: "COO at DataFlow Inc",
      initials: "ER",
    },
  };

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden px-6 py-20 md:px-16 md:py-24 text-center text-white shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #485BFF 0%, #15F5BA 100%)",
          }}
        >
          {/* Abstract Background Shapes inside the card */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[80px]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-900 rounded-full blur-[80px]"
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Designed for scale,
              <br />
              engineered for peace of mind.
            </h2>
            <p className="text-blue-50 text-lg max-w-2xl mx-auto mb-12 font-medium">
              Whether you are migrating a legacy monolith or building
              cloud-native microservices, we provide the primitives you need to
              succeed.
            </p>

            <div className="inline-flex flex-wrap justify-center gap-2 rounded-xl bg-white/10 p-1.5 backdrop-blur-sm border border-white/20 mb-12">
              {Object.keys(data).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300"
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-lg shadow-md"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      activeTab === tab
                        ? "text-[#485BFF]"
                        : "text-blue-50 hover:text-white"
                    }`}
                  >
                    {tab}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-left bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto hover:bg-white/15 transition-colors"
              >
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-white/80 font-bold uppercase tracking-wider text-xs mb-3">
                      The Challenge
                    </h4>
                    <p className="text-white text-lg leading-relaxed font-medium">
                      "{data[activeTab].challenge}"
                    </p>
                  </div>
                  <div>
                    <h4 className="text-emerald-100 font-bold uppercase tracking-wider text-xs mb-3">
                      The Nexus Solution
                    </h4>
                    <p className="text-white text-lg leading-relaxed font-medium">
                      "{data[activeTab].solution}"
                    </p>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-white/10 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white text-[#485BFF] flex items-center justify-center font-bold text-lg mr-4 shadow-lg">
                    {data[activeTab].initials}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">
                      {data[activeTab].author}
                    </div>
                    <div className="text-sm text-blue-100">
                      {data[activeTab].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the migration process work?",
      answer:
        "We provide automated tools to scan your existing Terraform or CloudFormation state. Our migration engine then generates the equivalent GAMMA SWEEP configuration, which you can preview and apply incrementally with zero downtime.",
    },
    {
      question: "Is there a free tier for developers?",
      answer:
        "Yes! We offer a generous free tier that includes 3 global regions, 10GB of egress, and unlimited builds. It's perfect for side projects and early-stage startups validation.",
    },
    {
      question: "Do you support on-premise deployments?",
      answer:
        "Absolutely. Our Enterprise plan includes the 'Nexus Edge' agent which allows you to manage bare metal, VMWare, and OpenStack environments alongside your public cloud resources from a single pane of glass.",
    },
    {
      question: "How do you handle data residency requirements?",
      answer:
        "We allow you to pin data and compute resources to specific geographic regions. You can enforce policies that prevent data from ever leaving the EU, US, or other specific jurisdictions to comply with GDPR, CCPA, and other regulations.",
    },
    {
      question: "What is your SLA guarantee?",
      answer:
        "We offer a 99.99% uptime SLA for our Pro plan and a 99.999% SLA for Enterprise customers. We are financially backed and provide automated credits for any violation of these terms.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#F0F3FF]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about the platform and billing.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={index}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <span className="font-semibold text-slate-900 text-lg">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ml-4 ${
                    openIndex === index ? "text-[#485BFF]" : "text-slate-400"
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterCTA = () => (
  <section className="py-32 bg-white text-center">
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Ready to stabilize your stack?
        </h2>
        <p className="text-xl text-slate-600 mb-10">
          Join the infrastructure platform that powers the next generation of
          industry leaders.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#485BFF] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#3848cc] transition-colors shadow-xl"
          >
            Start Your Free Trial
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-slate-600 font-medium px-8 py-4 border border-[#15F5BA] rounded-full hover:bg-[#15F5BA]/10 hover:text-slate-900 transition-colors"
          >
            Talk to Sales
          </motion.button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <section className="px-4 pb-4 bg-white">
    <div className="relative bg-[#F0F3FF] rounded-[3rem] overflow-hidden pt-20 pb-10">
      {/* Ambient Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [-50, 50, -50],
            y: [-20, 20, -20],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#15F5BA] rounded-full mix-blend-multiply filter blur-[80px] opacity-40"
        />
        <motion.div
          animate={{
            x: [50, -50, 50],
            y: [20, -20, 20],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#485BFF] rounded-full mix-blend-multiply filter blur-[80px] opacity-20"
        />
        <motion.div
          animate={{
            x: [-30, 30, -30],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-64 bg-[#15F5BA] rounded-full mix-blend-multiply filter blur-[100px] opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/logo.svg" alt="Gamma Sweep" className="h-6 w-auto" />
            </div>
            <p className="text-slate-600 leading-relaxed mb-8 max-w-sm">
              The infrastructure platform for the modern era. We provide the
              primitives to build, scale, and secure your applications with
              banking-grade reliability.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: "#485BFF" }}
                  className="w-10 h-10 rounded-full bg-white text-slate-500 flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "Product",
                links: ["Features", "Integrations", "Pricing", "Changelog"],
              },
              {
                title: "Resources",
                links: [
                  "Documentation",
                  "API Reference",
                  "Community",
                  "Status",
                ],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "Cookies"],
              },
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-slate-900 mb-6">
                  {column.title}
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-[#485BFF] transition-colors inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <div className="mb-4 md:mb-0">
            © 2024 GAMMA SWEEP Inc. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const App = () => {
  return (
    <div className="font-sans antialiased text-slate-900 bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <LogoTicker />
      <Features />
      <Compliance />
      <IntegrationEcosystem />
      <UseCase />
      <FAQ />
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default App;
