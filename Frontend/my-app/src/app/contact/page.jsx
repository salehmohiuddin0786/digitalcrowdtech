"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  User,
  CheckCircle,
  Globe,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  Headphones,
  ArrowRight,
  Heart,
  Rocket,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
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

const floatingParticles = createFloatingParticles(30, 2);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.digitalcrowdtech.in";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Unable to send your message right now.");
      }

      setSubmitStatus("success");
      setSubmitMessage(result.message || "Thank you! Your message was saved and sent successfully. Our team will contact you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(error.message || "Sorry, we could not send your query right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 9985960692"],
      color: "from-blue-500 to-cyan-500",
      action: "tel:+919985960692",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["support@digitalcrowdtech.in"],
      color: "from-purple-500 to-pink-500",
      action: "mailto:support@digitalcrowdtech.in",
    },
    {
      icon: MapPin,
      title: "Office Location",
      details: ["Unit No 203, 2nd Floor Suite No.806,", "SBR CV Towers, Madhapur, Hyderabad - TG"],
      color: "from-emerald-500 to-teal-500",
      action: "#",
    },
  ];

  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on complexity. A typical website takes 4-8 weeks, while complex applications may take 3-6 months. We'll provide a detailed timeline during consultation.",
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Yes! We provide comprehensive post-launch support including maintenance, updates, and 24/7 technical assistance for all our projects.",
    },
    {
      question: "How do you handle project pricing?",
      answer: "We offer flexible pricing models including fixed-cost projects and hourly rates. Each project is custom-quoted based on your specific requirements.",
    },
    {
      question: "Can you work with our existing team?",
      answer: "Absolutely! We collaborate seamlessly with in-house teams, providing additional expertise and resources as needed.",
    },
  ];

  const stats = [
    { value: "150+", label: "Projects Delivered", icon: Award, gradient: "from-blue-500 to-cyan-500" },
    { value: "98%", label: "Client Satisfaction", icon: Users, gradient: "from-purple-500 to-pink-500" },
    { value: "24/7", label: "Support Available", icon: Headphones, gradient: "from-emerald-500 to-teal-500" },
    { value: "50+", label: "Expert Team", icon: Globe, gradient: "from-amber-500 to-orange-500" },
  ];

  // const socialLinks = [
  //   { icon: Facebook, name: "Facebook", color: "bg-[#1877f2]", href: "#" },
  //   { icon: Twitter, name: "Twitter", color: "bg-[#1da1f2]", href: "#" },
  //   { icon: Linkedin, name: "LinkedIn", color: "bg-[#0a66c2]", href: "#" },
  //   { icon: Instagram, name: "Instagram", color: "bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]", href: "#" },
  // ];

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
                <span className="text-blue-400 text-sm font-medium">Get in Touch</span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                Let's talk about{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  your next project
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-xl text-gray-300 leading-relaxed max-w-2xl"
              >
                Have a question or ready to start? We're here to help. Reach out and let's create something amazing together.
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
                    {["24/7 Support", "Fast Response", "Free Consultation", "Expert Team"].map((item, i) => (
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

      {/* Stats Section with Animation */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInScale}
                  whileHover={{ y: -8 }}
                  className="group text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex justify-center mb-3"
                  >
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-gray-900"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className={`h-0.5 bg-gradient-to-r ${stat.gradient} mt-4 rounded-full mx-auto w-0 group-hover:w-full transition-all duration-300`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            className="grid md:grid-cols-3 gap-6"
          >
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInScale}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-4 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm mb-1">{detail}</p>
                  ))}
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={info.action}
                    className="inline-flex items-center gap-1 mt-3 text-blue-600 font-medium text-sm transition-all"
                  >
                    Contact <ChevronRight className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Lottie Animation Section - This comes before the contact form */}
      <section className="py-10 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Let's Start a Conversation
            </h2>
            <p className="text-gray-600 mb-8">
              We're excited to hear about your project. Fill out the form below and we'll get back to you within 24 hours.
            </p>
            <div className="flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80">
                <DotLottieReact
                  src="https://lottie.host/cc75e072-4c16-44dc-9d0b-020045347530/uX1aGqGktP.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </motion.div>

              <motion.form variants={staggerContainer} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="John Doe"
                      />
                    </div>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="+91 9985960692"
                      />
                    </div>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Project Inquiry"
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </motion.div>

                <motion.button
                  variants={fadeInScale}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {submitMessage}
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                    >
                      <MessageSquare className="w-5 h-5" />
                      {submitMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </motion.div>

            {/* Map & Business Hours */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Business Hours
                </h3>
                <div className="space-y-3 bg-gray-50 rounded-2xl p-6">
                  <motion.div variants={fadeInUp} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold text-gray-900">9:00 AM - 7:00 PM</span>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold text-gray-900">10:00 AM - 4:00 PM</span>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="flex justify-between py-2">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-gray-900">Closed</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div variants={fadeInUp} className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Find Us Here</h3>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl overflow-hidden shadow-lg h-64"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15225.82958847903!2d78.383426!3d17.448457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c7ad4cae91%3A0x8c62e0c9ad95384c!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  ></iframe>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>
                {/* <div className="flex gap-3">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={idx}
                        href={social.href}
                        variants={fadeInScale}
                        whileHover={{ scale: 1.15, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-white shadow-md hover:shadow-xl transition-all duration-300`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div> */}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 mb-4">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-semibold">FAQ</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">
              Everything you need to know about working with us
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            className="space-y-4"
          >
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
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
        
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Ready to start your project?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto"
            >
              Get a free consultation and quote. Our team is ready to help you succeed.
            </motion.p>
            <motion.button
              variants={fadeInScale}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:shadow-xl transition-all"
            >
              Request a Callback <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
