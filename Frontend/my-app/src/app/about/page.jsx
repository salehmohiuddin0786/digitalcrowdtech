"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import {
  Rocket,
  Users,
  Trophy,
  Headphones,
  Lightbulb,
  Target,
  Code,
  Eye,
  Award,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Quote,
  Star,
  ChevronRight,
  Sparkles,
  Heart,
  Zap,
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
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

const floatingParticles = createFloatingParticles(20, 1);

const AboutPage = () => {
  const stats = [
    { value: "150+", label: "Projects Completed", icon: Rocket, color: "from-blue-500 to-cyan-500", delay: 0 },
    { value: "50+", label: "Happy Clients", icon: Users, color: "from-purple-500 to-pink-500", delay: 0.1 },
    { value: "8+", label: "Years Experience", icon: Trophy, color: "from-amber-500 to-orange-500", delay: 0.2 },
    { value: "24/7", label: "Support Available", icon: Headphones, color: "from-emerald-500 to-teal-500", delay: 0.3 },
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We embrace cutting-edge technologies to deliver future-ready solutions that give you a competitive edge.",
      icon: Lightbulb,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Client Success",
      description: "Your growth is our success. We measure our performance by your achievements and ROI.",
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Quality Code",
      description: "Clean, scalable, and maintainable code that stands the test of time and scales with your business.",
      icon: Code,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Transparency",
      description: "Honest communication, fair pricing, regular updates, and no hidden surprises.",
      icon: Eye,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "15+ years in web development & digital strategy",
      social: "LinkedIn",
    },
    {
      name: "Priya Sharma",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Full-stack expert & React/Next.js specialist",
      social: "Twitter",
    },
    {
      name: "Amit Verma",
      role: "UI/UX Director",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "Creating beautiful, intuitive interfaces",
      social: "Dribbble",
    },
    {
      name: "Neha Reddy",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      bio: "Delivering projects on time & on budget",
      social: "LinkedIn",
    },
  ];

  const achievements = [
    "500+ Successful Deliveries",
    "98% Client Retention Rate",
    "Industry Award Winner 2024",
    "ISO 27001 Certified",
    "Trusted by Fortune 500s",
    "Global Team of Experts",
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
                <span className="text-blue-400 text-sm font-medium">About Us</span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                We build digital{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  experiences
                </span>{" "}
                that help businesses grow.
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-xl text-gray-300 leading-relaxed max-w-2xl"
              >
                Digital Crowd Tech creates modern websites, applications, and digital
                solutions focused on performance, usability, and long-term business value.
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
                  Start a Project <ArrowRight className="w-4 h-4" />
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
                    {["Innovation First", "Client Success", "Quality Code", "Transparency"].map((item, i) => (
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

      {/* Stats Section with Counter Animation */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInScale}
                  custom={idx}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                    className="text-4xl font-bold text-gray-900 mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 mb-4">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 text-sm font-semibold">Our Story</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                From a small team to a <span className="text-blue-600">global digital powerhouse</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed mb-4">
                Founded in 2016, Digital Crowd Tech began with a simple mission: to help businesses 
                thrive in the digital age through exceptional web experiences. What started as a 
                team of three passionate developers has now grown into a full-service digital agency 
                with over 50 talented professionals.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed mb-6">
                We've helped startups, SMEs, and enterprises transform their digital presence, 
                driving measurable growth through innovative technology solutions.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-blue-600 font-semibold"
              >
                <Calendar className="w-5 h-5" />
                <span>Est. 2016 | 50+ Team Members | Global Reach</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="relative"
            >
              <motion.div
                animate={floatAnimation}
                className="absolute -top-4 -right-4 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20"
              />
              <div className="relative grid grid-cols-2 gap-4">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
                  alt="Team meeting"
                  className="rounded-2xl shadow-xl object-cover w-full h-64"
                />
                <div className="space-y-4">
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"
                    alt="Working session"
                    className="rounded-2xl shadow-xl object-cover w-full h-36"
                  />
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop"
                    alt="Coding"
                    className="rounded-2xl shadow-xl object-cover w-full h-36"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section with Flip Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-3 py-1 mb-4">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-semibold">Core Values</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What drives us every day
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              Our values shape everything we do — from how we work together to how we serve our clients.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-100 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-14 h-14 rounded-xl ${value.bgColor} flex items-center justify-center mb-4 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${value.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className={`h-0.5 bg-gradient-to-r ${value.gradient} mt-4 rounded-full`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section with Animated Icons */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
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
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Our achievements speak for themselves
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-blue-100">
              Recognized for excellence in web development and digital innovation
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: idx * 0.1, duration: 2, repeat: Infinity }}
                >
                  <CheckCircle className="w-5 h-5 text-green-300" />
                </motion.div>
                <span className="font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section with Social Hover */}
      {/* <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-3 py-1 mb-4">
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-semibold">Meet Our Team</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The minds behind the magic
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              A passionate team of designers, developers, and strategists dedicated to your success
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center pb-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="bg-white rounded-full p-2 mx-1 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-blue-600" />
                    </motion.div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Testimonial Section with Floating Animation */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInScale}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 opacity-5"
            >
              <Quote className="w-48 h-48" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative z-10 max-w-3xl mx-auto text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex justify-center mb-6"
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl leading-relaxed mb-6"
              >
                "Digital Crowd Tech transformed our online presence completely. Their understanding of 
                the Indian market and innovative approach delivered results beyond our expectations. Our 
                conversion rates have doubled since launch!"
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-semibold text-lg">Ananya Reddy</p>
                <p className="text-gray-400">Founder, Hyderabad Naturals</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Animated Button */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to build something amazing together?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto mb-8">
              Let's discuss your next project and see how we can help bring your ideas to life.
            </motion.p>
            <motion.button
              variants={fadeInScale}
              whileHover={{ scale: 1.08, boxShadow: "0 25px 40px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-blue-500/30"
            >
              Get in Touch <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}><ChevronRight className="w-4 h-4" /></motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
