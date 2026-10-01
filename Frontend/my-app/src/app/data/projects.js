export const PROJECTS = [
  {
    id: "ruchi-bazzar",
    slug: "ruchi-bazzar",
    title: "Ruchi Bazzar",
    client: "Ruchi Bazaar Hyperlocal Retail",
    category: "Food Delivery & Restaurant Management Platform",
    shortCategory: "Food Delivery & E-Commerce",
    isInternal: false,
    label: null,
    summary:
      "A complete food delivery and restaurant management platform connecting customers, restaurants, delivery riders, and administrators in real time.",
    description:
      "Ruchi Bazzar is a full-stack hyperlocal food and grocery ordering ecosystem. Engineered as a high-efficiency monorepo, it features a customer-facing storefront, restaurant partner portal, delivery fleet application, and a centralized superadmin control center backed by Node.js, Express, MySQL, and Socket.io.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Sequelize",
      "Socket.io",
      "JWT Auth",
    ],
    architecture: {
      clientApps: [
        {
          name: "Customer Storefront (ruchi)",
          tech: "Next.js, React, Tailwind CSS",
          desc: "Fast, mobile-optimized ordering interface with live search, restaurant menus, dish variants, cart preservation, coupon redemption, and order tracking.",
        },
        {
          name: "Restaurant Merchant Portal (admin)",
          tech: "Next.js Dashboard",
          desc: "Dedicated kitchen interface for managing food menus, toggle item availability, live order acceptance, preparation timers, and revenue reports.",
        },
        {
          name: "Delivery Fleet Portal (delivery)",
          tech: "Next.js Web App",
          desc: "Rider dispatch interface with active order acceptance, route details, delivery status milestones, and daily payout telemetry.",
        },
        {
          name: "SuperAdmin Control Console (mainadmin)",
          tech: "Next.js Enterprise Suite",
          desc: "Comprehensive platform management for restaurant onboarding, commission settings, GST compliance, service zone mapping, and dispute resolution.",
        },
      ],
      backend: "Node.js & Express 5 REST API with Sequelize ORM, connection pooling, and Socket.io for live order state transitions.",
      database: "MySQL 8.0 relational schema maintaining order ledgers, merchant catalogs, customer carts, and location zones.",
    },
    features: [
      "Customer mobile OTP authentication and secure profile management",
      "Multi-restaurant browsing with category filtering (Biryani, Chinese, Bakery, Groceries)",
      "Dynamic food item customization, add-ons, and real-time cart calculations",
      "Coupon code discounts and delivery fee matrix based on order value",
      "Merchant order confirmation, kitchen preparation timer, and dispatch handoff",
      "Delivery partner active order assignment and status updates",
      "Real-time WebSocket event streaming (Order Placed → Accepted → Cooking → Picked Up → Delivered)",
      "Comprehensive SuperAdmin oversight for vendor KYC, compliance, and earnings",
    ],
    challenges: [
      {
        challenge: "Real-time state synchronization across four distinct user roles",
        solution: "Implemented Socket.io event rooms keyed by order ID, broadcasting status changes instantly to customer, restaurant, rider, and admin without polling.",
      },
      {
        challenge: "Monorepo modularity and shared database models",
        solution: "Structured a clean backend service layer in Express with Sequelize ORM that safely services requests across all 4 frontend portals.",
      },
    ],
    caseStudyUrl: "/projects/ruchi-bazzar",
    liveDemoAvailable: false,
    liveUrl: null,
    hasScreenshots: true,
    logoUrl: "/projects/ruchi-logo.png",
  },
  {
    id: "school-management-system",
    slug: "school-management-system",
    title: "School Management System",
    client: "Institutional Education ERP",
    category: "Education ERP / School Management",
    shortCategory: "Education & SaaS ERP",
    isInternal: false,
    label: null,
    summary:
      "A complete multi-portal school management platform designed to simplify campus administration, student records, teacher management, attendance, fee collection, and parent communication.",
    description:
      "Educational institutions face administrative friction with paper attendance, fragmented fee spreadsheets, and scattered parent updates. This School Management System consolidates institutional operations into four dedicated portals (Super Admin, Business/Admin, Staff/Teacher, and Student/Parent), backed by a normalized MySQL relational database and RESTful Node.js backend.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Prisma / Sequelize",
      "Socket.io",
      "REST APIs",
    ],
    architecture: {
      portals: [
        {
          name: "Super Admin & Management Portal",
          desc: "Multi-branch oversight, institutional fee ledger, teacher allocation, class configuration, and forensic audit logging.",
        },
        {
          name: "Teacher & Staff Portal",
          desc: "Daily one-click attendance marking, exam mark entries, syllabus tracking, homework distribution, and leave requests.",
        },
        {
          name: "Parent Portal",
          desc: "Real-time visibility into student attendance %, fee dues alerts, digital fee receipt downloads, and exam report cards.",
        },
        {
          name: "Student Portal",
          desc: "Timetable schedules, pending homework submissions, library records, and school bulletin notices.",
        },
      ],
      backend: "Node.js REST API with RBAC authorization middleware protecting over 50 endpoints.",
      database: "Relational MySQL schema structured for academic sessions, fee structures, class rosters, and student transcripts.",
    },
    features: [
      "Role-Based Access Control (RBAC) with granular permissions across roles",
      "Student admission lifecycle, profile documentation, and class promotion management",
      "Teacher profiles, subject allocation, and daily class timetables",
      "Daily biometric/manual attendance tracking with monthly percentage analytics",
      "Fee structure management with installment tracking, penalty rules, and PDF invoice generation",
      "Digital bulletin board for urgent notifications, holiday schedules, and event announcements",
      "Comprehensive student progress reports and exam score tabulation",
      "Audit logging for state changes (admissions, fee payments, score updates)",
    ],
    challenges: [
      {
        challenge: "Handling complex academic fee installment structures and balance reconciliation",
        solution: "Engineered transactional database procedures ensuring fee payments, discounts, and outstanding balances are atomically recorded without discrepancies.",
      },
      {
        challenge: "Designing intuitive interfaces for non-technical teachers and parents",
        solution: "Built clean, touch-friendly responsive screens with high visual clarity, large buttons, and zero extraneous clutter.",
      },
    ],
    caseStudyUrl: "/projects/school-management-system",
    liveDemoAvailable: false,
    liveUrl: null,
    hasScreenshots: true,
  },
  {
    id: "digital-crowd-technologies-website",
    slug: "digital-crowd-technologies-website",
    title: "Digital Crowd Technologies",
    client: "Internal Agency Platform",
    category: "Modern Agency Website & Admin CMS",
    shortCategory: "Company Website",
    isInternal: true,
    label: "Company Website / Internal Project",
    summary:
      "The official high-performance agency website for Digital Crowd Technologies featuring server-side rendering, client inquiry management, and an authenticated administration suite.",
    description:
      "Built to demonstrate our core full-stack principles: modern frontend architecture with Next.js and React 19, a custom dark theme design system, secure REST APIs, and an integrated MySQL administration dashboard for managing customer inquiries, blogs, and portfolio entries.",
    technologies: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Nodemailer",
    ],
    architecture: {
      frontend: "Next.js App Router with server-side rendered metadata, accessible interactive components, and responsive dark design system.",
      backend: "Node.js Express API server with PBKDF2 authentication, CORS policy, input sanitization, and Nodemailer integration.",
      database: "MySQL database storing customer inquiries with status lifecycles, published articles, and administrative records.",
    },
    features: [
      "Production-ready Next.js App Router architecture",
      "Full inquiry capture pipeline with server validation and email dispatch",
      "Custom administrative dashboard for lead management and status tracking",
      "Dynamic blog publishing engine with categories and read-time calculations",
      "Strict compliance with honest representation and zero fake metrics",
      "High performance optimization for Core Web Vitals (LCP, CLS, INP)",
    ],
    challenges: [
      {
        challenge: "Building a technically superior agency platform without relying on exaggerated corporate statistics",
        solution: "Focused purely on engineering excellence, real code demonstrations, verified project architectures, and transparent starting pricing.",
      },
    ],
    caseStudyUrl: null,
    liveDemoAvailable: true,
    liveUrl: "/",
    hasScreenshots: true,
  },
];

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
