"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Globe,
  Smartphone,
  Palette,
  Cloud,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award,
  Clock,
  Zap,
  Code2,
  Rocket,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Sparkles,
  Cpu,
  Layout,
  Server,
  Database,
  // Figma,
  // Github,
} from "lucide-react";

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
};

const HomePage = () => {
  const [isVisible, setIsVisible] = useState({});

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies for optimal performance.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "User-centered design that combines aesthetics with functionality.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services.",
      color: "from-sky-500 to-indigo-500",
    },
    {
      icon: BarChart3,
      title: "Digital Marketing",
      description: "Data-driven strategies to boost your online presence.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security assessments and implementation.",
      color: "from-red-500 to-rose-500",
    },
  ];

  const stats = [
    { value: "150+", label: "Projects Delivered", icon: Award, suffix: "" },
    { value: "50+", label: "Happy Clients", icon: Users, suffix: "" },
    { value: "98%", label: "Client Satisfaction", icon: Star, suffix: "%" },
    { value: "24/7", label: "Support Available", icon: Clock, suffix: "" },
  ];

  const technologies = [
    { name: "React", icon: Code2 },
    { name: "Next.js", icon: Layout },
    { name: "Node.js", icon: Server },
    { name: "Python", icon: Database },
    { name: "Tailwind", icon: Palette },
    // { name: "Figma", icon: Figma },
    { name: "AWS", icon: Cloud },
    // { name: "GitHub", icon: Github },
  ];

  const testimonials = [
    {
      name: "Ananya Reddy",
      role: "Founder, Hyderabad Naturals",
      content: "Digital Crowd Tech transformed our online presence completely. Their team understood our Indian market and delivered results beyond our expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    },
    {
      name: "Rohit Mehta",
      role: "Director, UrbanKart India",
      content: "The team built us a stunning e-commerce platform that increased our sales by 250%. Their support was fast, clear, and reliable.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      name: "Priya Sharma",
      role: "CTO, MedFirst Hyderabad",
      content: "Professional, responsive, and technically excellent. They delivered our mobile app on time and within budget.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
  ];

  const counterAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Parallax Animation */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-blue-400/30"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">Web Development Agency</span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                Build digital products that{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  drive growth
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-xl text-gray-300 leading-relaxed"
              >
                Digital Crowd Tech creates modern websites, applications, and digital solutions focused on performance, usability, and long-term business value.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-blue-500/30"
                >
                  Start a Project <Rocket className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full font-semibold transition-all duration-300 border border-white/20"
                >
                  View Portfolio <ArrowRight className="w-4 h-4" />
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
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                  <Code2 className="w-20 h-20 text-blue-400 mb-6 mx-auto" />
                  <div className="space-y-4">
                    {["Modern Tech Stack", "Responsive Design", "SEO Optimized", "Fast Performance"].map((item, i) => (
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
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={counterAnimation}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-gray-900"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 mb-4">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-semibold">What We Do</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive digital services
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              We offer end-to-end digital solutions to help your business thrive in the modern era
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <button className="mt-4 inline-flex items-center gap-1 text-blue-600 font-semibold hover:gap-2 transition-all">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Technologies Section with Marquee Animation */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Modern Tech Stack</h2>
            <p className="text-gray-600">We use cutting-edge technologies to build robust, scalable solutions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="bg-gray-50 rounded-xl p-4 text-center w-24"
                >
                  <Icon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose Digital Crowd Tech?</h2>
              <p className="text-blue-100 mb-6">
                We combine technical expertise with business understanding to deliver solutions that drive real results.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Users, text: "50+ expert developers and designers" },
                  { icon: Award, text: "150+ successful projects delivered" },
                  { icon: Clock, text: "24/7 dedicated support" },
                  { icon: TrendingUp, text: "98% client satisfaction rate" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span>{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8"
              >
                <Cpu className="w-16 h-16 text-blue-300 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Ready to scale?</h3>
                <p className="text-blue-100">Let's build something amazing together</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-white text-blue-600 rounded-full font-semibold"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
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
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 mb-4">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-semibold">Testimonials</span>
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
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
          >
            <motion.div
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-0 right-0 opacity-10"
            >
              <Rocket className="w-64 h-64" />
            </motion.div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your digital presence?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Let's discuss your project and see how we can help bring your ideas to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg"
                >
                  Get Free Quote <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full font-semibold border border-white/20"
                >
                  <Phone className="w-4 h-4" /> Call Us Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Contact Bar */}
      <section className="py-6 bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+91 9985960692</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>support@digitalcrowdtech.in</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Madhapur, Hyderabad</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
