export const PROJECTS = [
  {
    id: "ruchi-bazzar",
    slug: "ruchi-bazzar",
    title: "Ruchi Bazaar",
    client: "Ruchi Bazaar Hyperlocal Retail",
    category: "Food Delivery & Restaurant Management Platform",
    shortCategory: "Food Delivery & SaaS",
    isInternal: false,
    label: "Flagship Turnkey Ecosystem",
    summary:
      "A complete food delivery and restaurant management ecosystem connecting customers, restaurants, delivery riders, and administrators in real time.",
    description:
      "Ruchi Bazaar is a full-stack hyperlocal food ordering ecosystem. Engineered as a high-efficiency monorepo, it features a customer-facing storefront, restaurant partner portal, delivery fleet application, and a centralized superadmin control center backed by Node.js, Express, MySQL, and Socket.io for live order state transitions.",
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
    architectureLayers: [
      {
        title: "Customer Storefront & Kitchen KOT",
        desc: "Next.js 16 mobile ordering, real-time cart calculations, and kitchen display tablet management.",
      },
      {
        title: "Node.js & Express 5 API Backend",
        desc: "Socket.io live order state pipeline (<25ms latency), JWT auth & Sequelize connection pooling.",
      },
      {
        title: "Delivery Dispatch & SuperAdmin Console",
        desc: "Driver fleet route tracking, commission splitting, and MySQL transactional order ledgers.",
      },
    ],
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
    highlights: [
      "Real-time Socket.io synchronization across 4 stakeholder portals",
      "Sequelize ORM with normalized relational MySQL schema",
      "Zero aggregator commissions: 100% merchant data ownership",
    ],
    caseStudyUrl: "/projects/ruchi-bazzar",
    liveDemoAvailable: true,
    liveUrl: "https://ruchibazzar.com",
    imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&auto=format&fit=crop&q=80",
    hasScreenshots: true,
    logoUrl: "/projects/ruchi-logo.png",
  },
  {
    id: "ruchi-store",
    slug: "ruchi-store",
    title: "Ruchi Store",
    client: "Retail Merchants & Supermarket Chains",
    category: "Merchant Inventory & Grocery Store Management",
    shortCategory: "Retail & Grocery SaaS",
    isInternal: false,
    label: "Merchant Retail Suite",
    summary:
      "A complete cloud-based store inventory, billing, multi-counter POS, and supplier ledger suite for grocery retailers and supermarkets.",
    description:
      "Ruchi Store equips retail supermarket merchants with real-time barcode inventory scanning, low-stock threshold triggers, multi-counter Point of Sale (POS) terminals, and vendor purchasing ledgers integrated with GST-compliant invoicing.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Barcode SDK",
      "REST APIs",
    ],
    architectureLayers: [
      {
        title: "Barcode Scanner & POS Interface",
        desc: "Sub-50ms product lookup across 20,000+ SKUs with thermal receipt printer integration.",
      },
      {
        title: "Offline-Resilient Sync Engine",
        desc: "IndexedDB local cache queuing offline billing orders that auto-sync to MySQL upon reconnection.",
      },
      {
        title: "Inventory & Supplier Ledger",
        desc: "Automated low-stock threshold triggers, perishable expiry tracking, and GST purchase invoices.",
      },
    ],
    features: [
      "Real-time SKU barcode scanning and instant price lookups",
      "Multi-counter Point of Sale (POS) with split cash/UPI payment settlement",
      "Automated low-stock threshold alerts and supplier purchase order generation",
      "Batch expiry date tracking for perishables and dairy products",
      "Daily revenue reports, profit margin analytics, and GST tax filing exports",
    ],
    challenges: [
      {
        challenge: "Handling network dropouts during peak rush hours at checkout counters",
        solution: "Integrated local IndexedDB client caching that queues transactions offline and auto-reconciles them with the MySQL server once network connectivity restores.",
      },
    ],
    highlights: [
      "Offline-resilient POS queue syncing with central MySQL backend",
      "Sub-50ms product catalog lookups across 20,000+ grocery SKUs",
      "Direct integration with thermal receipt printers and cash drawers",
    ],
    caseStudyUrl: "/products#ruchi-bazzar-food-delivery",
    liveDemoAvailable: true,
    liveUrl: "https://ruchibazzar.com",
    imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80",
    hasScreenshots: true,
  },
  {
    id: "task-digital-crowd",
    slug: "task-digital-crowd",
    title: "TaskDigitalCrowd",
    client: "Internal Agency & Remote Engineering Teams",
    category: "Agile Task & Team Project Management SaaS",
    shortCategory: "Project Management SaaS",
    isInternal: true,
    label: "Agency Enterprise Tool",
    summary:
      "Internal collaborative task and sprint management platform engineered for agency milestone tracking, Git branch linking, and client deliverables.",
    description:
      "TaskDigitalCrowd streamlines project delivery across software developers, UI designers, and QA testers. Features real-time drag-and-drop Kanban boards, milestone roadmaps, automated sprint velocity tracking, and client progress portals.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Socket.io",
      "JWT RBAC",
    ],
    architectureLayers: [
      {
        title: "60fps Drag-and-Drop Kanban Boards",
        desc: "Optimistic UI task transitions across Backlog, In-Progress, Review, and Deployed states.",
      },
      {
        title: "Real-Time WebSocket Sync",
        desc: "Instant collaborative multi-user updates, comment threads, and sprint velocity burn-down metrics.",
      },
      {
        title: "Self-Hosted MySQL Architecture",
        desc: "Zero third-party SaaS license fees, role-based client approval access, and full audit logs.",
      },
    ],
    features: [
      "Interactive 60fps drag-and-drop Kanban task boards with status lifecycles",
      "Milestone roadmap timeline with automated sprint burn-down charts",
      "Real-time task comment threads and collaborative team mentions",
      "Client view-only access for transparent delivery milestone approvals",
      "Time tracking logs with developer hour estimations vs actuals",
    ],
    challenges: [
      {
        challenge: "Synchronizing high-frequency board movements without visual stutter",
        solution: "Utilized optimistic local state transitions coupled with debounced WebSocket broadcast batches to maintain a steady 60fps frame rate.",
      },
    ],
    highlights: [
      "Zero third-party SaaS license recurring fees",
      "Instant WebSocket board synchronization across remote engineering teams",
      "100% data privacy and localized MySQL audit trails",
    ],
    caseStudyUrl: "/portfolio",
    liveDemoAvailable: true,
    liveUrl: "https://task.digitalcrowdtech.in/",
    imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format&fit=crop&q=80",
    hasScreenshots: true,
  },
  {
    id: "ruchi-food-sharing",
    slug: "ruchi-food-sharing",
    title: "Ruchi Food Sharing",
    client: "Community NGOs & Food Rescue Network",
    category: "Surplus Food Redistribution & Community Network",
    shortCategory: "CSR & Community SaaS",
    isInternal: false,
    label: "Community Impact Platform",
    summary:
      "A philanthropic food rescue platform connecting event venues, restaurants, and bakeries with verified NGOs and volunteer pickup drivers.",
    description:
      "Ruchi Food Sharing tackles commercial food waste by enabling caterers and restaurants to post fresh surplus meals. The platform geo-matches donation alerts to nearby verified hunger relief NGOs and dispatches local volunteer delivery drivers.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Geolocation APIs",
      "WhatsApp Cloud API",
    ],
    architectureLayers: [
      {
        title: "1-Click Food Donor Portal",
        desc: "Rapid submission of surplus meals from hotels and bakeries with food safety checklists.",
      },
      {
        title: "Geo-Radius Matching Algorithm",
        desc: "Location-aware matching calculating distance matrices between donors and registered NGOs.",
      },
      {
        title: "WhatsApp Cloud API Dispatch",
        desc: "Automated alerts dispatched to volunteer drivers achieving sub-15 minute pickup confirmations.",
      },
    ],
    features: [
      "1-Click surplus meal posting with food type, shelf life, and quantity",
      "Automated radius-based NGO push notifications and volunteer dispatch",
      "Live GPS tracking for volunteer meal pickups and delivery confirmations",
      "Food safety verification checklist and donor liability protection logging",
      "Public impact leaderboard measuring meals rescued and CO2 emissions saved",
    ],
    challenges: [
      {
        challenge: "Time-critical coordination before perishable meals spoil",
        solution: "Automated WhatsApp Cloud API messaging to registered volunteers within a 5km radius, cutting the matching cycle down to under 15 minutes.",
      },
    ],
    highlights: [
      "Over 10,000+ meals successfully rescued and redistributed",
      "Automated WhatsApp notification dispatch for rapid volunteer mobilization",
      "Sub-15 minute average match time between donor post and NGO pickup",
    ],
    caseStudyUrl: "/services/custom-web-application-development",
    liveDemoAvailable: true,
    liveUrl: "https://foodsharing.ruchibazaar.in/",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    hasScreenshots: true,
  },
  {
    id: "stareggs",
    slug: "stareggs",
    title: "StarEggs",
    client: "Star Eggs Centre (Adilabad, Telangana & Vidarbha)",
    category: "Wholesale & Retail White Egg Distribution Platform",
    shortCategory: "Wholesale & Retail Agro Commerce",
    isInternal: false,
    label: "Live Client Platform",
    summary:
      "A complete wholesale and retail white egg distribution platform for Star Eggs Centre, automating bulk orders, daily NECC pricing, and regional delivery routes.",
    description:
      "StarEggs digitizes wholesale egg distribution across Adilabad, Telangana, and Vidarbha. Features daily NECC egg price tracking, bulk order dispatch for bakeries and supermarkets, crate deposit accounting, and delivery route manifests.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "REST APIs",
    ],
    architectureLayers: [
      {
        title: "Daily NECC Price Index Engine",
        desc: "Live white egg price card synchronizer reflecting regional wholesale market index rates.",
      },
      {
        title: "Bulk Wholesale Order & Crate Accounting",
        desc: "Automated deposit accounting eliminating egg tray loss, and tiered volume discounts.",
      },
      {
        title: "Regional Route Manifest Dispatch",
        desc: "Logistics routing serving bakeries, hotels, and retail merchants across Adilabad, TS & Vidarbha.",
      },
    ],
    features: [
      "Daily NECC white egg pricing index sync with tiered wholesale rate cards",
      "Direct wholesale order booking for retail stores, bakeries, and restaurants",
      "Crate deposit ledger reconciliation eliminating container losses",
      "Fleet delivery manifests with regional route tracking across Telangana and Vidarbha",
      "Customer ledger balances, credit terms, and automated invoice PDF generation",
    ],
    challenges: [
      {
        challenge: "Managing volatile daily NECC price revisions across bulk contracts",
        solution: "Engineered an automatic daily price sync service that locks in rate cards at the moment of order placement and generates GST invoices automatically.",
      },
    ],
    highlights: [
      "Live production deployment serving wholesale merchants across 2 states",
      "Zero crate loss with automated deposit & return tracking",
      "Instant WhatsApp order confirmation and dispatch updates",
    ],
    caseStudyUrl: "https://stareggs3.vercel.app/",
    liveDemoAvailable: true,
    liveUrl: "https://stareggs3.vercel.app/",
    imageUrl: "/projects/stareggs-fresh-eggs.jpg",
    hasScreenshots: true,
  },
  {
    id: "multi-tenant-clinic-management-saas",
    slug: "multi-tenant-clinic-management-saas",
    title: "Multi-Tenant Clinic Management SaaS",
    client: "Multi-Specialty Clinics & Healthcare Centers",
    category: "Healthcare, Telemedicine & Clinical EHR Portal",
    shortCategory: "Healthcare SaaS",
    isInternal: false,
    label: "Healthcare Enterprise SaaS",
    summary:
      "A secure multi-tenant clinical operating system with patient electronic health records (EHR), doctor scheduling, telemedicine, and pharmacy billing.",
    description:
      "Consolidates healthcare operations into a multi-tenant cloud architecture. Supports multi-doctor clinics with appointment booking, OPD/IPD queue tokens, digital prescription pads, diagnostic lab order routing, and GST medical billing.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Socket.io",
      "WebRTC",
    ],
    architectureLayers: [
      {
        title: "Multi-Tenant Clinic Scheduling & OPD Queue",
        desc: "Live token display queue with audio calling announcements and doctor calendar management.",
      },
      {
        title: "Electronic Health Records (EHR) & Rx Builder",
        desc: "HIPAA-inspired encrypted medical history, allergy alerts, and drug dosage autocomplete.",
      },
      {
        title: "WebRTC Telemedicine & Pharmacy Billing",
        desc: "Encrypted peer-to-peer video consultations, diagnostic order routing, and batch expiry tracking.",
      },
    ],
    features: [
      "Multi-tenant schema isolation ensuring 100% patient data confidentiality",
      "Live clinic token display queue with audio calling announcements",
      "Electronic Health Records (EHR) with medical history and allergy tagging",
      "Standardized digital prescription builder with drug dosage autocomplete",
      "Integrated pharmacy billing with stock batch tracking and expiry alerts",
      "Telemedicine video consultations powered by WebRTC peer connections",
    ],
    challenges: [
      {
        challenge: "Strict multi-tenant patient data isolation and HIPAA compliance",
        solution: "Implemented tenant-scoped MySQL connection routing and encrypted medical record payloads so each clinic has complete data isolation.",
      },
    ],
    highlights: [
      "100% paperless clinic workflow from registration to discharge",
      "HIPAA-inspired data encryption and role-based doctor/receptionist access",
      "Sub-second patient history lookup across thousands of medical archives",
    ],
    caseStudyUrl: "/services/custom-web-application-development",
    liveDemoAvailable: false,
    liveUrl: null,
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    hasScreenshots: true,
  },
  {
    id: "upsc-aspirant-learning-portal",
    slug: "upsc-aspirant-learning-portal",
    title: "UPSC Aspirant Learning Portal",
    client: "Civil Services Coaching Institutes & Self-Study Portals",
    category: "Civil Services EdTech & Mock Test Engine",
    shortCategory: "EdTech & Exam Engine",
    isInternal: false,
    label: "EdTech Learning Platform",
    summary:
      "A comprehensive UPSC exam prep portal with timed Prelims mock test engine, Mains answer evaluation workflow, and daily current affairs digests.",
    description:
      "Built for serious Civil Services aspirants and coaching academies. Features a full CBT (Computer-Based Test) Prelims examination engine with negative marking, negative-marking percentile analytics, Mains PDF answer submission with faculty grading, and synchronized syllabus trackers.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "PDF Generation",
      "LaTeX / KaTeX",
    ],
    architectureLayers: [
      {
        title: "Timed Prelims CBT Exam Engine",
        desc: "Real-time countdown timer, negative marking calculation, and instant topic-wise percentile rank.",
      },
      {
        title: "Mains Subjective PDF Evaluation Suite",
        desc: "Encrypted student answer upload portal with faculty annotation tools, scoring, and model answers.",
      },
      {
        title: "50,000+ Bilingual Question Bank & KaTeX",
        desc: "KaTeX mathematical and constitutional rendering with daily PIB and editorial current affairs.",
      },
    ],
    features: [
      "Full-length Prelims CBT test engine with negative marking and timer countdown",
      "Instant topic-wise performance diagnostics (Polity, History, Economy, Science)",
      "Mains subjective answer PDF upload portal with faculty annotation tools",
      "Daily editorial summaries, PIB highlights, and categorized current affairs",
      "Personalized revision bookmarks, flashcards, and syllabus completion tracker",
    ],
    challenges: [
      {
        challenge: "Rendering mathematical expressions and multi-lingual Indian language scripts accurately",
        solution: "Integrated client-side KaTeX rendering with UTF-8 Devanagari typography support for error-free bilingual mock papers.",
      },
    ],
    highlights: [
      "50,000+ question bank with detailed bilingual explanations",
      "Handles concurrent test submissions from thousands of concurrent students",
      "Actionable peer rank benchmarking and historical accuracy analytics",
    ],
    caseStudyUrl: "/projects/school-management-system",
    liveDemoAvailable: false,
    liveUrl: null,
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    hasScreenshots: true,
  },
  {
    id: "unity-credit-cooperative-harmony",
    slug: "unity-credit-cooperative-harmony",
    title: "Unity Credit / Cooperative Harmony",
    client: "Cooperative Credit Societies & Micro-Finance Institutions",
    category: "Cooperative Banking, Micro-Lending & Savings Portal",
    shortCategory: "FinTech & Banking SaaS",
    isInternal: false,
    label: "FinTech & Banking Suite",
    summary:
      "A secure cooperative banking portal managing member share capitals, recurring deposits, loan amortization schedules, and daily field agent collections.",
    description:
      "Engineered for micro-credit societies, cooperative banks, and self-help groups. Automates member KYC, recurring fixed deposit calculations, reducing-balance loan interest amortizations, field agent mobile collection receipts, and double-entry general ledgers.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Redis",
      "JWT RBAC",
    ],
    architectureLayers: [
      {
        title: "ACID Double-Entry Accounting Ledger",
        desc: "Transactional ledger maintaining balanced credit/debit journals, balance sheets, and P&L.",
      },
      {
        title: "Loan Amortization & Deposit Schedules",
        desc: "Reducing-balance EMI calculations, automated default penalties, and recurring deposit interest.",
      },
      {
        title: "Field Agent Mobile Receipts & Audit Trail",
        desc: "Mobile doorstep collection app with instant SMS receipts, daily closing reconciliation, and KYC.",
      },
    ],
    features: [
      "Double-entry accounting general ledger with automated balance sheets and P&L",
      "Member savings accounts, recurring deposits (RD), and fixed deposits (FD)",
      "Loan disbursement lifecycle with reducing interest amortization schedules",
      "Field collection agent mobile interface with instant SMS receipt generation",
      "Default risk prediction, overdue EMI penalty calculation, and recovery alerts",
    ],
    challenges: [
      {
        challenge: "Maintaining strict double-entry balance consistency under concurrent agent deposits",
        solution: "Wrapped all journal entries in serializable MySQL ACID transactions backed by Redis locks to prevent race conditions during end-of-day reconciliation.",
      },
    ],
    highlights: [
      "ACID transactional integrity on every rupee deposited or disbursed",
      "Audited against cooperative society regulatory compliance standards",
      "Bank-grade security with multi-factor authentication and tamper-proof logs",
    ],
    caseStudyUrl: "/services/backend-api-development",
    liveDemoAvailable: true,
    liveUrl: "https://unitycredit.in/",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    hasScreenshots: true,
  },
  {
    id: "school-management-system",
    slug: "school-management-system",
    title: "School Management System",
    client: "Institutional Education ERP",
    category: "Education ERP / School Management",
    shortCategory: "Education & SaaS ERP",
    isInternal: false,
    label: "Institutional ERP",
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
      "Sequelize",
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
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
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
    liveUrl: "https://digitalcrowdtech.in/",
    imageUrl: "/logo.png",
    hasScreenshots: true,
  },
];

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);

export function hasLiveUrl(project) {
  if (!project || !project.liveUrl || typeof project.liveUrl !== "string") return false;
  const clean = project.liveUrl.trim();
  if (clean === "" || clean === "/" || clean === "null" || clean === "undefined") return false;
  return (
    clean.startsWith("http://") ||
    clean.startsWith("https://") ||
    (clean.includes(".") && !clean.startsWith("/"))
  );
}

