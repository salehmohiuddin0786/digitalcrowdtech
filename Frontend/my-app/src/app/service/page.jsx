"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Palette,
  Cloud,
  BarChart3,
  Shield,
  Zap,
  Database,
  Search,
  ShoppingCart,
  Code2,
  Server,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
  Award,
  Sparkles,
  Cpu,
  Layout,
  Mail,
  Phone,
  MapPin,
  Star,
  Rocket,
  Heart,
} from "lucide-react";
import { createFloatingParticles } from "../utils/floatingParticles";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const floatAnimation = {
  y: [0, -15, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
};

const rotateAnimation = {
  rotate: [0, 360],
  transition: { duration: 20, repeat: Infinity, ease: "linear" },
};

const floatingParticles = createFloatingParticles(30, 3);

const ServicesPage = () => {
  const mainServices = [
    {
      title: "Web Development",
      description: "Custom websites, e-commerce platforms, and web applications built with modern technologies for optimal performance.",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      features: ["React/Next.js", "E-commerce Solutions", "CMS Development", "API Integration"],
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver seamless experiences across iOS and Android.",
      icon: Smartphone,
      color: "from-purple-500 to-pink-500",
      features: ["React Native", "iOS & Android", "App Store Deployment", "Push Notifications"],
    },
    {
      title: "UI/UX Design",
      description: "User-centered design that combines aesthetics with functionality to create engaging digital experiences.",
      icon: Palette,
      color: "from-amber-500 to-orange-500",
      features: ["Wireframing", "Prototyping", "User Research", "Design Systems"],
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services to optimize your business operations.",
      icon: Cloud,
      color: "from-sky-500 to-indigo-500",
      features: ["AWS/Azure/GCP", "Cloud Migration", "DevOps", "Serverless Architecture"],
    },
    {
      title: "Digital Marketing",
      description: "Data-driven marketing strategies to boost your online presence and drive measurable growth.",
      icon: BarChart3,
      color: "from-emerald-500 to-teal-500",
      features: ["SEO Optimization", "Social Media", "Content Marketing", "Email Campaigns"],
    },
    {
      title: "Cybersecurity",
      description: "Protect your digital assets with comprehensive security assessments and implementation.",
      icon: Shield,
      color: "from-red-500 to-rose-500",
      features: ["Security Audits", "Penetration Testing", "SSL Implementation", "GDPR Compliance"],
    },
  ];

  const whyChooseUs = [
    {
      title: "Expert Team",
      description: "50+ certified developers and designers with years of industry experience",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Fast Delivery",
      description: "Agile methodology ensuring on-time project completion",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance",
      icon: Clock,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Proven Results",
      description: "98% client satisfaction rate with 150+ successful projects",
      icon: Award,
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const technologies = [
    { name: "React.js", icon: Code2 },
    { name: "Next.js", icon: Code2 },
    { name: "Node.js", icon: Server },
    { name: "Python", icon: Database },
    { name: "Laravel", icon: Server },
    { name: "Vue.js", icon: Layout },
    { name: "AWS", icon: Cloud },
    { name: "MongoDB", icon: Database },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We understand your goals, audience, and requirements through in-depth consultation.",
    },
    {
      step: "02",
      title: "Planning",
      description: "Strategic roadmap creation with timelines, milestones, and technology stack selection.",
    },
    {
      step: "03",
      title: "Design & Dev",
      description: "Iterative development with regular feedback loops and quality assurance.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Seamless deployment, thorough testing, and ongoing maintenance support.",
    },
  ];

  const testimonials = [
    {
      name: "Ananya Reddy",
      role: "Founder, Hyderabad Naturals",
      content: "The web development team delivered an exceptional platform that exceeded our expectations. Our traffic has increased by 200%!",
      rating: 5,
    },
    {
      name: "Rohit Mehta",
      role: "Director, UrbanKart India",
      content: "Their e-commerce solution transformed our business. Sales doubled within 3 months of launch.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "CTO, MedFirst Hyderabad",
      content: "Professional, responsive, and technically excellent. They're now our go-to development partner.",
      rating: 5,
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Parallax Animation */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              x: particle.x,
              y: particle.y,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{ left: particle.left, top: particle.top }}
          />
        ))}

        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInScale}
                className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-blue-400/30"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </motion.div>
                <span className="text-blue-400 text-sm font-medium">Our Services</span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                Digital solutions that{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  drive results
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-xl text-gray-300 leading-relaxed max-w-2xl"
              >
                Comprehensive web development and digital services tailored to help your business grow, scale, and succeed in the digital age.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59,130,246,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-blue-500/30"
                >
                  Start a Project <Rocket className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full font-semibold transition-all duration-300 border border-white/20"
                >
                  View Portfolio
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="relative"
            >
              <motion.div
                animate={floatAnimation}
                className="relative z-10"
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                  <motion.div
                    animate={pulseAnimation}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center"
                  >
                    <Heart className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="space-y-4">
                    {["Expert Team", "Fast Delivery", "24/7 Support", "Proven Results"].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3 text-gray-200"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={rotateAnimation}
                className="absolute -top-10 -right-10 w-32 h-32 border-2 border-blue-500/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -left-10 w-24 h-24 border-2 border-purple-500/30 rounded-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What we offer
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              Comprehensive digital services designed to meet your unique business needs and goals
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerFast}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {mainServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden"
                >
                  {/* Animated gradient background on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.05 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-r ${service.color}`}
                  />
                  
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 shadow-lg transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-1 text-blue-600 font-semibold transition-all"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated decorative elements */}
        <motion.div
          animate={{ x: [0, 100, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ x: [0, -100, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-20"
        />

        <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 mb-4">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-semibold">Why Choose Us</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We're not just developers, we're partners
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              Here's why hundreds of businesses trust us with their digital transformation
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInScale}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our development process
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              A streamlined approach that ensures quality, transparency, and timely delivery
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4"
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {idx < process.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2"
                  >
                    <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies We Use with Marquee Effect */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full"
        />

        <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Modern tech stack</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300">
              We use cutting-edge technologies to build robust, scalable solutions
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6"
          >
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInScale}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  </motion.div>
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-3 py-1 mb-4">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="text-amber-700 text-sm font-semibold">Client Love</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What our clients say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              Don't just take our word for it — hear from our satisfied clients
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: i * 0.1, duration: 1, repeat: Infinity }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInScale}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute right-0 top-0 opacity-10"
            >
              <Cpu className="w-64 h-64" />
            </motion.div>
            <motion.div
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute left-0 bottom-0 opacity-10"
            >
              <Rocket className="w-48 h-48" />
            </motion.div>
            <div className="relative z-10 max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Ready to transform your digital presence?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-blue-100 mb-6 text-lg"
              >
                Get a free consultation and quote for your project. No obligation, just expert advice.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Get Free Quote <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full font-semibold hover:bg-white/20 transition-all"
                >
                  Schedule Call
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="py-8 bg-gray-100 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            className="flex flex-wrap justify-center gap-8 text-sm text-gray-600"
          >
            <motion.div variants={fadeInScale} className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>+91 9985960692</span>
            </motion.div>
            <motion.div variants={fadeInScale} className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>support@digitalcrowdtech.in</span>
            </motion.div>
            <motion.div variants={fadeInScale} className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Madhapur, Hyderabad</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
