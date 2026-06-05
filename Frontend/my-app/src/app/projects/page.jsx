"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Calendar,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Eye,
  Code2,
  Figma,
  Server,
  Award,
  Clock,
  ExternalLink,
  Github,
  ZoomIn,
  Filter,
  X,
  Sparkles,
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

const floatingParticles = createFloatingParticles(30, 4);

const ProjectsPage = () => {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: "all", name: "All Projects", icon: Globe },
    { id: "web", name: "Web Development", icon: Code2 },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone },
    { id: "ecommerce", name: "E-commerce", icon: ShoppingCart },
  ];

  const projects = [
    {
      id: 1,
      title: "TechFlow Dashboard",
      category: "web",
      client: "TechFlow Solutions",
      description: "Enterprise analytics dashboard with real-time data visualization, user management, and advanced reporting features.",
      fullDescription: "A comprehensive dashboard solution for TechFlow that transformed how they monitor business metrics. The platform handles millions of data points daily with sub-second response times.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "D3.js"],
      features: ["Real-time Analytics", "Custom Reports", "Team Management", "API Integration"],
      duration: "4 months",
      teamSize: "5 developers",
      outcome: "40% increase in operational efficiency",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "ShopEase Marketplace",
      category: "ecommerce",
      client: "ShopEase Retail",
      description: "Full-featured e-commerce platform with payment gateway integration, inventory management, and customer analytics.",
      fullDescription: "Built a scalable marketplace solution handling 10,000+ products with advanced search, filtering, and secure checkout experience.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=500&fit=crop",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
      features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Customer Reviews"],
      duration: "6 months",
      teamSize: "8 developers",
      outcome: "250% sales growth in first year",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "HealthFirst App",
      category: "mobile",
      client: "HealthFirst Medical",
      description: "Cross-platform mobile app for patient appointment booking, telemedicine, and health records management.",
      fullDescription: "A HIPAA-compliant healthcare app connecting patients with doctors through video consultations and secure messaging.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
      technologies: ["React Native", "Firebase", "WebRTC", "Node.js"],
      features: ["Video Consultations", "Appointment Booking", "Prescriptions", "Health Records"],
      duration: "5 months",
      teamSize: "6 developers",
      outcome: "50,000+ active users",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Finwise Banking",
      category: "web",
      client: "Finwise Financial",
      description: "Secure banking portal with transaction tracking, investment management, and financial planning tools.",
      fullDescription: "Modern banking solution with advanced security features, real-time transaction monitoring, and AI-powered investment recommendations.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop",
      technologies: ["Angular", "Java", "Spring Boot", "Oracle"],
      features: ["Transaction Tracking", "Investment Tools", "Budget Planning", "Secure Authentication"],
      duration: "8 months",
      teamSize: "10 developers",
      outcome: "Secured 100,000+ accounts",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "UrbanEats Delivery",
      category: "mobile",
      client: "UrbanEats",
      description: "Food delivery app with real-time order tracking, restaurant discovery, and loyalty programs.",
      fullDescription: "A comprehensive delivery platform connecting 500+ restaurants with thousands of daily customers through an intuitive mobile experience.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop",
      technologies: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
      features: ["Order Tracking", "Restaurant Discovery", "Loyalty Program", "In-app Chat"],
      duration: "4 months",
      teamSize: "4 developers",
      outcome: "1M+ orders processed",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "FashionHub Store",
      category: "ecommerce",
      client: "FashionHub",
      description: "Premium fashion e-commerce with virtual try-on, size recommendations, and social shopping features.",
      fullDescription: "Luxury fashion platform with AI-powered size recommendations, virtual try-on technology, and integrated social commerce features.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
      technologies: ["Vue.js", "Shopify API", "Python", "TensorFlow"],
      features: ["Virtual Try-on", "Size AI", "Social Shopping", "Wishlist"],
      duration: "5 months",
      teamSize: "7 developers",
      outcome: "180% increase in conversion rate",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const stats = [
    { value: "150+", label: "Projects Delivered", icon: Award, gradient: "from-blue-500 to-cyan-500" },
    { value: "50+", label: "Happy Clients", icon: Users, gradient: "from-purple-500 to-pink-500" },
    { value: "98%", label: "Client Satisfaction", icon: Star, gradient: "from-amber-500 to-orange-500" },
    { value: "24/7", label: "Support Available", icon: Clock, gradient: "from-emerald-500 to-teal-500" },
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
                <span className="text-blue-400 text-sm font-medium">Our Portfolio</span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                Transforming ideas into{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  exceptional digital products
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-xl text-gray-300 leading-relaxed max-w-2xl"
              >
                Explore our portfolio of successful projects across web development, mobile apps, and e-commerce solutions.
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
                  View All Work
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
                    {["150+ Projects", "50+ Clients", "98% Satisfaction", "24/7 Support"].map((item, i) => (
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
                    className={`flex justify-center mb-3`}
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

      {/* Filter Section with Animation */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = filter === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  variants={fadeInScale}
                  onClick={() => setFilter(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid with Animated Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerFast}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden h-56">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/50 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                      >
                        <ZoomIn className="w-6 h-6 text-white" />
                      </motion.div>
                    </motion.div>
                    <div className="absolute top-4 right-4">
                      <motion.span
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800"
                      >
                        {categories.find(c => c.id === project.category)?.name}
                      </motion.span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{project.client}</p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm transition-all"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section with Animation */}
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
              Have a project in mind?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto"
            >
              Let's discuss your next big idea. We're ready to bring it to life.
            </motion.p>
            <motion.button
              variants={fadeInScale}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:shadow-xl transition-all"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Project Modal with Animated Entrance */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                    <p className="text-blue-600 font-medium">{selectedProject.client}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.liveUrl}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition"
                    >
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.githubUrl}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-gray-800 text-white rounded-full text-sm hover:bg-gray-900 transition"
                    >
                      <Github className="w-4 h-4" /> Code
                    </motion.a>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{selectedProject.fullDescription}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Project Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium">{selectedProject.duration}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Team Size:</span>
                        <span className="font-medium">{selectedProject.teamSize}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-500">Outcome:</span>
                        <span className="font-medium text-green-600">{selectedProject.outcome}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
