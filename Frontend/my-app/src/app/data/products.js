export const PRODUCTS = [
  {
    id: "prod-quickkirana-retail",
    title: "QuickKirana – Retail & E-commerce Management",
    slug: "quickkirana-retail-ecommerce",
    category: "Retail E-Commerce & Grocery SaaS",
    shortCategory: "Retail & Grocery POS",
    label: "Ready-to-Deploy E-Commerce",
    summary:
      "High-speed modern digital storefront engineered for local supermarkets, FMCG retailers, and wholesale distributors with instant product search, cart persistence, and 1-tap WhatsApp ordering.",
    description:
      "QuickKirana bridges the gap between offline store counters and digital commerce. Built for Indian retail supermarkets, grocery distributors, and kirana stores to take inventory online with zero aggregator commissions. Features barcode catalog search, integrated UPI & payment gateway checkouts, real-time stock sync, and automated itemized WhatsApp bills sent directly to merchants and customers.",
    price: "Starting from ₹9,999",
    numericPrice: 9999,
    pricingPlans: [
      {
        name: "Starter Storefront",
        price: "₹9,999",
        numericPrice: 9999,
        description: "Best for single-store retail counters & FMCG kirana businesses.",
        features: [
          "Responsive Customer Web Storefront",
          "1-Tap WhatsApp Order Placement",
          "Up to 2,500 Products & Barcode SKU Search",
          "Merchant Store Control Dashboard",
          "UPI QR & Cash on Delivery (COD)",
          "100% Full Source Code Ownership",
        ],
      },
      {
        name: "Business Hyperlocal",
        price: "₹18,999",
        numericPrice: 18999,
        popular: true,
        description: "For high-volume retail stores & multi-counter supermarkets.",
        features: [
          "Everything in Starter Storefront",
          "Integrated PhonePe & Card Payment Gateway",
          "Automated Inventory Deductions & Low-Stock Alerts",
          "Customer Order Tracking via SMS & WhatsApp",
          "Staff POS Cashier Accounts with RBAC",
          "Delivery Zone Radius & Slot Dispatch",
        ],
      },
      {
        name: "Enterprise Multi-Branch",
        price: "₹34,999",
        numericPrice: 34999,
        description: "For supermarket chains, franchise outlets & wholesale hubs.",
        features: [
          "Everything in Business Hyperlocal",
          "Multi-Warehouse & Multi-Branch Inventory Sync",
          "Custom Android Mobile App (PWA / APK)",
          "B2B Wholesale Price Lists & Credit Ledgers",
          "Dedicated Cloud VPS Deployment & SSL",
          "1 Year Priority SLA & Engineering Support",
        ],
      },
    ],
    overview: {
      whatItDoes:
        "QuickKirana transforms traditional physical retail counters and supermarkets into modern 24/7 digital storefronts. It enables customers to browse local inventory, add items with customized quantities, and checkout via instant UPI or WhatsApp.",
      whoCanUse: [
        "Local Supermarkets & Grocery Stores",
        "FMCG Wholesale Distributors",
        "Organic Produce & Meat Retailers",
        "Neighborhood Pharmacies & Daily Essentials Counters",
      ],
      problemsSolved: [
        "Eliminates 15-30% aggregator platform commissions (Swiggy Minis, Dunzo, Blinkit)",
        "Stops order miscommunication over manual WhatsApp voice notes and scribbled papers",
        "Prevents out-of-stock orders through real-time inventory counter sync",
        "Ensures complete ownership of customer phone numbers and purchase history",
      ],
      businessBenefits: [
        "Immediate +40% increase in repeat order volume from neighborhood customers",
        "Zero monthly platform cut: 100% direct customer revenue into your bank account",
        "Sub-second page load times optimized for 4G cellular devices across India",
        "Lightning-fast product catalog search across thousands of SKUs",
      ],
      whyChoose:
        "Unlike monthly subscription platforms (Shopify, Dukaan) where fees pile up year after year, QuickKirana gives you a complete, standalone full-stack system with 100% source code ownership and zero vendor lock-in.",
    },
    features: [
      "Ultra-fast product catalog with live category filtering & barcode search",
      "1-Tap WhatsApp order forwarding with automated itemized billing",
      "Integrated UPI, cards, and Cash on Delivery (COD) checkout options",
      "Store owner inventory management dashboard with low-stock alerts",
      "Mobile-first responsive design optimized for Core Web Vitals",
      "Google Local SEO ready with structured schema markup",
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "WhatsApp API",
      "PhonePe SDK",
    ],
    screenshots: [
      {
        title: "Customer Mobile Storefront",
        category: "Mobile UI",
        url: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1000&auto=format&fit=crop&q=80",
        caption: "Clean, frictionless mobile storefront with instant category tabs and live cart persistence.",
      },
      {
        title: "Merchant Sales & Order Dashboard",
        category: "Admin Panel",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
        caption: "Live incoming orders stream, dispatch statuses, and daily revenue metrics.",
      },
      {
        title: "Warehouse & SKU Inventory Management",
        category: "Inventory",
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80",
        caption: "Real-time stock deduction, barcode mapping, and automated low-stock warnings.",
      },
      {
        title: "Digital POS & Integrated Billing Receipts",
        category: "Checkout",
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1000&auto=format&fit=crop&q=80",
        caption: "Instant dynamic PhonePe UPI QR generation with automated payment verification.",
      },
    ],
    liveUrl: "https://dskirana.in",
    imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&auto=format&fit=crop&q=80",
    caseStudyUrl: null,
    status: "Published",
  },
  {
    id: "prod-school-erp",
    title: "School Management System",
    slug: "school-management-system",
    category: "Education ERP & Institutional SaaS",
    shortCategory: "Education & Campus ERP",
    label: "Multi-Role Institutional ERP",
    summary:
      "A complete 4-portal campus management platform designed to automate student admissions, daily attendance, fee ledger with PDF invoicing, and real-time parent notifications.",
    description:
      "EduMaster consolidates educational operations into dedicated role-based portals (SuperAdmin, Teacher, Student, Parent) backed by a normalized MySQL schema and secure REST API. Solves paper-based administrative friction, fee collection delays, and fragmented parent communication with one unified platform.",
    price: "Starting from ₹14,999",
    numericPrice: 14999,
    pricingPlans: [
      {
        name: "Standard Campus",
        price: "₹14,999",
        numericPrice: 14999,
        description: "Ideal for schools, junior colleges & coaching institutes up to 500 students.",
        features: [
          "SuperAdmin & Principal Control Dashboard",
          "Student Admission, Bio & Document Records",
          "Daily Teacher Attendance Logging (1-Click)",
          "Automated Fee Ledger & Term Fee Tracking",
          "PDF Fee Receipts with Stamp & Signature",
          "Parent Inquiry & Notice Board Portal",
        ],
      },
      {
        name: "Institutional Pro",
        price: "₹26,999",
        numericPrice: 26999,
        popular: true,
        description: "For established K-12 schools, CBSE/ICSE institutions & degree colleges.",
        features: [
          "Everything in Standard Campus",
          "Exam Management, Report Cards & Grade Calculation",
          "Online Fee Collection via PhonePe UPI Gateway",
          "SMS / WhatsApp Fee Due Reminders to Parents",
          "Teacher Payroll & Staff Leave Management",
          "ID Card & Transfer Certificate (TC) Generator",
        ],
      },
      {
        name: "Trust & Multi-Branch",
        price: "₹49,999",
        numericPrice: 49999,
        description: "For educational trusts, franchise schools & university groups.",
        features: [
          "Everything in Institutional Pro",
          "Multi-Branch Centralized SuperAdmin Console",
          "Library Management & Book Barcoding",
          "School Bus GPS Transport Fleet Tracking",
          "Dedicated Cloud VPS Deployment & DB Backups",
          "Custom Student & Parent Mobile App (APK)",
        ],
      },
    ],
    overview: {
      whatItDoes:
        "EduMaster digitizes and synchronizes the entire administrative and academic lifecycle of educational institutions. From paperless student admissions and automated fee ledgers to one-click staff attendance and instant grade card publication.",
      whoCanUse: [
        "K-12 Private & International Schools",
        "Junior & Degree Colleges",
        "Coaching Institutes & Test Prep Centers",
        "Vocational & Skill Training Academies",
      ],
      problemsSolved: [
        "Eliminates lost fee receipts and untracked partial student dues",
        "Stops time-consuming manual attendance registers and calculation errors",
        "Replaces chaotic WhatsApp groups with official institutional announcement feeds",
        "Prevents unauthorized grade alterations via cryptographic audit logs",
      ],
      businessBenefits: [
        "Accelerates fee collection cycles by over 65% through automated parent alerts",
        "Saves administration staff 20+ hours each week on routine reporting",
        "Eliminates printed paper costs for student admissions and fee receipts",
        "Ensures total data confidentiality with dedicated private database hosting",
      ],
      whyChoose:
        "Unlike commercial EdTech vendors that charge monthly per-student licensing fees that inflate as your school grows, EduMaster is provided as a complete turnkey platform you own forever with zero student headcount penalties.",
    },
    features: [
      "Role-Based Access Control (RBAC) across 4 dedicated stakeholder portals",
      "Automated student admission records, class promotion & document storage",
      "Fee structure management with installment tracking, penalties & PDF receipts",
      "1-Click teacher attendance logging with monthly percentage statistics",
      "Parent portal for fee dues alerts, report cards & academic notices",
      "Multi-branch management support for educational trusts and groups",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Sequelize",
      "PDFKit",
      "PhonePe SDK",
    ],
    screenshots: [
      {
        title: "Campus Administrative Dashboard",
        category: "Admin Suite",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80",
        caption: "Executive bird's eye view of student enrollments, fee collections, and staff attendance.",
      },
      {
        title: "Academic Grade Cards & Attendance",
        category: "Teacher Portal",
        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&auto=format&fit=crop&q=80",
        caption: "Term exam marks entry with automated percentile and grading calculations.",
      },
      {
        title: "Fee Ledger & Instant Invoicing",
        category: "Accounts",
        url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80",
        caption: "Complete audit ledger with installment reconciliation and instant PDF download.",
      },
      {
        title: "Parent Information & Notices Feed",
        category: "Parent Portal",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
        caption: "Dedicated parent portal for attendance tracking, exam timetables, and alerts.",
      },
    ],
    liveUrl: "/projects/school-management-system",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
    caseStudyUrl: "/projects/school-management-system",
    status: "Published",
  },
  {
    id: "prod-hospital-clinic-ehr",
    title: "Hospital & Clinic Management System",
    slug: "hospital-clinic-management-system",
    category: "Healthcare SaaS & Clinical EHR",
    shortCategory: "Hospital & Clinic EHR",
    label: "Healthcare Multi-Branch Platform",
    summary:
      "Enterprise outpatient (OPD) and inpatient clinical suite featuring digital appointments, electronic health records (EHR), multi-doctor schedules, and pharmacy billing.",
    description:
      "CarePulse Clinic EHR is a specialized healthcare management system engineered for polyclinics, diagnostic centers, and multi-specialty hospitals. Manages patient registration, token queue management, ICD-10 medical prescriptions, lab investigation reports, and pharmacy point-of-sale under strict HIPAA-aligned role-based security.",
    price: "Starting from ₹19,999",
    numericPrice: 19999,
    pricingPlans: [
      {
        name: "Doctor Practice",
        price: "₹19,999",
        numericPrice: 19999,
        description: "For private doctors, single-specialty clinics & dental centers.",
        features: [
          "OPD Appointment Booking & Daily Token Queue",
          "Digital Prescription (Rx) Generator with Medicine DB",
          "Patient Medical History & Past Visit Timeline",
          "Consultation Fee Billing & Thermal Print Receipts",
          "WhatsApp Appointment Confirmation & Reminders",
          "100% On-Premise / Private Cloud Patient Data Isolation",
        ],
      },
      {
        name: "Polyclinic Suite",
        price: "₹34,999",
        numericPrice: 34999,
        popular: true,
        description: "For multi-specialty clinics, diagnostic labs & day-care centers.",
        features: [
          "Everything in Doctor Practice",
          "Multi-Doctor Rosters & Department Scheduling",
          "Diagnostic Lab Test Ordering & PDF Report Uploads",
          "Integrated Pharmacy Inventory & Expiry Alerts",
          "PhonePe UPI & Card Payment Gateway Integration",
          "Doctor Payout & Commission Calculation Engine",
        ],
      },
      {
        name: "Hospital & Nursing Home",
        price: "₹59,999",
        numericPrice: 59999,
        description: "For 20-100 bed hospitals, nursing homes & surgical facilities.",
        features: [
          "Everything in Polyclinic Suite",
          "IPD Bed Allotment & Ward Management",
          "Nurse Station Round Notes & Vitals Charts",
          "Discharge Summary Generator & Insurance Billing",
          "Multi-Branch Centralized Administration",
          "Telemedicine WebRTC Video Consultation Portal",
        ],
      },
    ],
    overview: {
      whatItDoes:
        "CarePulse provides medical practices and healthcare facilities with an intuitive digital workflow. Doctors can issue verified prescriptions in under 45 seconds, front-desk staff can manage appointment queues, and administrators can track revenue and pharmacy inventory in real time.",
      whoCanUse: [
        "Polyclinics & Outpatient Care Centers",
        "Dental & Eye Clinics",
        "Diagnostic Laboratories & Imaging Centers",
        "Hospitals & Nursing Home Facilities",
      ],
      problemsSolved: [
        "Eliminates unreadable handwriting and prescription errors",
        "Replaces overcrowded clinic waiting rooms with disciplined digital token queues",
        "Prevents medicine stockouts and expired drug losses through automated batch alerts",
        "Stops revenue leakage through synchronized billing and consultation audits",
      ],
      businessBenefits: [
        "Increases daily patient throughput by 35% without staff fatigue",
        "Immediate reduction in patient waiting times from over 45 minutes to under 12 minutes",
        "100% compliant medical record preservation ready for regulatory audits",
        "Zero per-patient consultation commissions: keep all clinic earnings",
      ],
      whyChoose:
        "Medical records contain sensitive personal health data. Our solution runs on your own dedicated database instance with strict zero-knowledge encryption, ensuring your clinic never surrenders patient data to third-party commercial health aggregators.",
    },
    features: [
      "Multi-doctor appointment scheduling with real-time token queue display",
      "Electronic Health Record (EHR) with past diagnosis, vitals & allergies",
      "Fast digital prescription pad with searchable generic medicines library",
      "Pharmacy stock inventory management with batch & expiry tracking",
      "Laboratory test ordering and direct PDF report delivery to patient WhatsApp",
      "PhonePe UPI & card payment processing with itemized billing receipts",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Redis",
      "Socket.io",
      "PhonePe SDK",
    ],
    screenshots: [
      {
        title: "OPD Schedule & Doctor Calendar",
        category: "Doctor Portal",
        url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1000&auto=format&fit=crop&q=80",
        caption: "Intuitive appointment scheduling with token queue tracking and doctor availability.",
      },
      {
        title: "Electronic Health Records (EHR)",
        category: "Clinical Data",
        url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80",
        caption: "Holistic patient timeline containing diagnosis, lab history, and digital prescriptions.",
      },
      {
        title: "Pharmacy Inventory & Batch Control",
        category: "Pharmacy",
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1000&auto=format&fit=crop&q=80",
        caption: "Real-time stock deduction with automated low-stock and upcoming expiry notices.",
      },
      {
        title: "Telemedicine Video Consultation",
        category: "Telehealth",
        url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&auto=format&fit=crop&q=80",
        caption: "Secure WebRTC video consults with in-call prescription creation and document sharing.",
      },
    ],
    liveUrl: "/services/custom-web-application-development",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    caseStudyUrl: "/services/custom-web-application-development",
    status: "Published",
  },
  {
    id: "prod-ruchi-bazzar",
    title: "Restaurant Management System",
    slug: "restaurant-management-system",
    category: "Food Delivery & Multi-Vendor Restaurant SaaS",
    shortCategory: "Restaurant POS & Delivery",
    label: "Flagship Turnkey Platform",
    summary:
      "Complete restaurant ecosystem connecting customer food ordering, live kitchen display (KOT), delivery fleet dispatch, and central superadmin control.",
    description:
      "Ruchi Bazzar is an all-in-one hyperlocal digital commerce and restaurant management platform. Engineered as a high-efficiency monorepo, it features a customer-facing storefront, restaurant partner portal, delivery fleet application, and a centralized superadmin control center backed by Node.js, Express, MySQL, and Socket.io for live order state transitions.",
    price: "Starting from ₹19,999",
    numericPrice: 19999,
    pricingPlans: [
      {
        name: "Single Restaurant Outlet",
        price: "₹19,999",
        numericPrice: 19999,
        description: "For standalone dine-in restaurants, cafes, cloud kitchens & bakeries.",
        features: [
          "Customer QR Table Ordering & Takeaway Web Storefront",
          "Live Kitchen Order Ticket (KOT) Display on Tablet",
          "Table Management & Dine-in Bill Splitting",
          "Menu Builder with Custom Variants, Addons & Combos",
          "PhonePe UPI & Cash on Delivery (COD) Checkouts",
          "Daily Cash Register & End-of-Day Sales Reports",
        ],
      },
      {
        name: "Delivery & Fleet Suite",
        price: "₹34,999",
        numericPrice: 34999,
        popular: true,
        description: "For cloud kitchens & restaurants managing their own delivery fleet.",
        features: [
          "Everything in Single Restaurant Outlet",
          "Dedicated Delivery Partner Mobile Web Application",
          "Live GPS Rider Dispatch & Real-Time Customer Tracking",
          "Automated Delivery Radius Calculation & Fees",
          "SMS / WhatsApp Live Order Milestone Alerts",
          "Customer Loyalty Coupons & Promo Code Matrix",
        ],
      },
      {
        name: "Multi-Brand Food Marketplace",
        price: "₹59,999",
        numericPrice: 59999,
        description: "For food courts, cloud kitchen hubs & regional food delivery startups.",
        features: [
          "Everything in Delivery & Fleet Suite",
          "Multi-Vendor Restaurant Onboarding & Merchant KYC",
          "Automated Vendor Commission Splitting & Payouts",
          "SuperAdmin Central Control & Audit Console",
          "Custom Android APKs (Customer, Merchant, Rider)",
          "Dedicated Production Cloud Server & High-Load Architecture",
        ],
      },
    ],
    overview: {
      whatItDoes:
        "Provides restaurants with complete end-to-end sovereignty over their digital ordering and delivery operations. Replaces exorbitant 25-35% third-party aggregator commissions with a modern platform that routes orders directly into your kitchen.",
      whoCanUse: [
        "Dine-in Restaurants & Bistros",
        "Cloud Kitchens & Dark Kitchen Networks",
        "Cafes, Bakeries & Fast-Food Chains",
        "Regional Hyperlocal Food Delivery Entrepreneurs",
      ],
      problemsSolved: [
        "Stops bleeding 25-35% of every food order to predatory delivery aggregators",
        "Eliminates kitchen miscommunication through real-time electronic KOT timers",
        "Prevents customer order delays through automated driver dispatch",
        "Builds your own customer contact database for targeted promotions",
      ],
      businessBenefits: [
        "Instant margin improvement of 20-30% on every direct delivery order",
        "Faster table turnover in dine-in setups via self-ordering QR menus",
        "Seamless kitchen fulfillment with color-coded preparation status screens",
        "100% direct instant payouts to your bank account via PhonePe Business UPI",
      ],
      whyChoose:
        "Unlike rented POS software with recurring monthly per-device subscriptions, Ruchi Bazzar is delivered as an owned enterprise asset with full database and source code ownership.",
    },
    features: [
      "Customer storefront web app with category navigation, food variants & real-time cart",
      "Dedicated restaurant merchant portal for live kitchen order acceptance & prep timers",
      "Delivery rider fleet interface with route details & payout tracking",
      "SuperAdmin central control for restaurant KYC, commissions & tax compliance",
      "Real-time bidirectional WebSocket event streaming with Socket.io",
      "Zero aggregator commissions: 100% direct restaurant revenue & customer data ownership",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Sequelize",
      "Socket.io",
      "PhonePe SDK",
    ],
    screenshots: [
      {
        title: "Kitchen Display System (KOT)",
        category: "Kitchen KOT",
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80",
        caption: "Color-coded electronic kitchen tickets with real-time preparation timers.",
      },
      {
        title: "Customer Digital Food Menu & Cart",
        category: "Storefront",
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop&q=80",
        caption: "High-conversion customer ordering interface with item customizations and instant checkout.",
      },
      {
        title: "Delivery Fleet Dispatch & GPS",
        category: "Delivery Rider",
        url: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=1000&auto=format&fit=crop&q=80",
        caption: "Delivery driver routing interface with live map tracking and delivery verification.",
      },
      {
        title: "Restaurant Sales & Analytics Hub",
        category: "Analytics",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
        caption: "Comprehensive sales breakdown, top-selling dishes, and daily settlement reports.",
      },
    ],
    liveUrl: "https://ruchibazzar.com",
    imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1200&auto=format&fit=crop&q=80",
    caseStudyUrl: "/projects/ruchi-bazzar",
    status: "Published",
  },
  {
    id: "prod-business-directory",
    title: "Business Directory Platform",
    slug: "business-directory-platform",
    category: "Marketplace & Directory Platform",
    shortCategory: "Business Directory & Leads",
    label: "Local Discovery SaaS",
    summary:
      "Local business discovery and verified merchant directory portal featuring geo-search, inquiry distribution, customer ratings, and premium listing subscriptions.",
    description:
      "LocalConnect is a modern alternative to legacy Yellow Pages and crowded listing portals. Designed for cities, business associations, industrial hubs, and community clusters. Enables verified business owners to claim profiles, showcase products and operational timings, and receive qualified buyer inquiries straight to their phones.",
    price: "Starting from ₹12,999",
    numericPrice: 12999,
    pricingPlans: [
      {
        name: "City Directory Portal",
        price: "₹12,999",
        numericPrice: 12999,
        description: "For city guides, local chambers of commerce & community clusters.",
        features: [
          "Categorized Local Business Listings & Map Geo-Search",
          "Business Claim & Phone Number Verification (OTP)",
          "Interactive Review, Rating & Photo Upload Engine",
          "Customer Direct WhatsApp & Inquiry Forwarding",
          "SEO Semantic Schema for High Google Local Rankings",
          "Admin Approval Queue for Spam Prevention",
        ],
      },
      {
        name: "Commercial Directory SaaS",
        price: "₹24,999",
        numericPrice: 24999,
        popular: true,
        description: "For entrepreneurs monetizing regional business listings & leads.",
        features: [
          "Everything in City Directory Portal",
          "Paid Premium Featured Listing Packages with PhonePe",
          "Banner Advertisement Slots & Impression Tracking",
          "Lead Marketplace: Verified Inquiry Broadcast to Vendors",
          "Vendor Analytics: Profile Views & Phone Click Insights",
          "Automated Subscription Expiry Reminders",
        ],
      },
      {
        name: "Industrial B2B Portal",
        price: "₹44,999",
        numericPrice: 44999,
        description: "For nationwide B2B trade directories & industrial supplier networks.",
        features: [
          "Everything in Commercial Directory SaaS",
          "RFQ (Request for Quotation) Tender Submission Workflow",
          "Supplier Product Catalog & Price Quote Engine",
          "Custom Android Mobile App (PWA / APK)",
          "Multi-City & Nationwide Regional Filtering",
          "Dedicated Cloud Infrastructure & Backup Automation",
        ],
      },
    ],
    overview: {
      whatItDoes:
        "LocalConnect acts as the central digital discovery engine for local businesses and professional services. It bridges local consumers with verified merchants through lightning-fast geo-location searches and verified reviews.",
      whoCanUse: [
        "Regional Media & City Portal Entrepreneurs",
        "Industrial Trade Associations & Export Councils",
        "Niche Professional Directories (Medical, Legal, Construction)",
        "Local Chambers of Commerce & Business Networks",
      ],
      problemsSolved: [
        "Stops outdated contact details and dead listing clutter",
        "Provides small local businesses with an affordable SEO footprint",
        "Prevents fake reviews through verified user authentication",
        "Generates direct recurring revenue through premium featured spots",
      ],
      businessBenefits: [
        "Monetize through recurring subscription tiers and top-rank placement fees",
        "Capture valuable commercial intent and purchase inquiries across industries",
        "High automated organic search traffic from localized Google searches",
        "Fully automated vendor onboarding with zero manual entry friction",
      ],
      whyChoose:
        "Built on modern Next.js App Router and optimized MySQL full-text search, ensuring instant sub-second search responses even with tens of thousands of indexed business profiles.",
    },
    features: [
      "Geo-location radius search with interactive map pins and landmark filters",
      "Verified business profile claims with phone OTP verification",
      "Paid featured listing placement and banner management via PhonePe",
      "Customer inquiry forwarding directly to merchant WhatsApp & email",
      "Customer star ratings, structured reviews, and photo attachments",
      "Comprehensive admin dashboard for KYC verification and ad revenue analytics",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Leaflet / Google Maps",
      "PhonePe SDK",
    ],
    screenshots: [
      {
        title: "Geo-Location Business Directory Search",
        category: "Discovery",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80",
        caption: "Faceted category search with instant live distance radius filtering.",
      },
      {
        title: "Vendor Profile & Verification Badges",
        category: "Merchant Profile",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&auto=format&fit=crop&q=80",
        caption: "Rich business profile showcasing services, photo gallery, working hours, and reviews.",
      },
      {
        title: "Verified Customer Reviews & Ratings",
        category: "Community",
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop&q=80",
        caption: "Trust-building social proof with moderated customer feedback and owner replies.",
      },
      {
        title: "Lead Distribution & Inquiry Analytics",
        category: "Lead Management",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80",
        caption: "Real-time vendor lead portal displaying incoming customer inquiries and click metrics.",
      },
    ],
    liveUrl: "/",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    caseStudyUrl: null,
    status: "Published",
  },
  {
    id: "prod-task-project-management",
    title: "Task & Project Management System",
    slug: "task-project-management-system",
    category: "Agile SaaS & Team Productivity",
    shortCategory: "Agile Task & Project SaaS",
    label: "Agency Workflow Engine",
    summary:
      "Interactive 60fps Kanban boards, sprint tracking, client review milestones, and project velocity analytics with zero recurring monthly subscription fees.",
    description:
      "TaskDigitalCrowd is an agile workflow and project execution platform built for software teams, digital agencies, engineering firms, and consultancies. Eliminates expensive monthly per-seat licensing fees (Jira, Asana, Monday) with an owned, high-performance platform featuring real-time task movement, sprint burndowns, and automated client handover portals.",
    price: "Starting from ₹14,999",
    numericPrice: 14999,
    pricingPlans: [
      {
        name: "Team Edition",
        price: "₹14,999",
        numericPrice: 14999,
        description: "For growing dev shops & agencies up to 25 team members.",
        features: [
          "Interactive 60fps Drag & Drop Kanban Boards",
          "Custom Task Columns, Tags, Priority & Due Dates",
          "Team Member Task Assignment & Time Estimation",
          "Checklists, Markdown Task Notes & File Attachments",
          "Activity Audit Log & Historical Task Change Feed",
          "100% Unlimited Users on Your Own Server",
        ],
      },
      {
        name: "Agency Pro",
        price: "₹27,999",
        numericPrice: 27999,
        popular: true,
        description: "For multi-project agencies managing client deliverables.",
        features: [
          "Everything in Team Edition",
          "Client Portal with Read-Only Project Progress View",
          "Sprint Planning, Velocity Metrics & Burndown Charts",
          "Real-Time WebSocket Synchronization with Socket.io",
          "Team Workload Capacity & Bottleneck Tracking",
          "Milestone Billing & Payment Gateway Integration",
        ],
      },
      {
        name: "Enterprise Multi-Workspace",
        price: "₹49,999",
        numericPrice: 49999,
        description: "For corporate IT departments & multi-client consultancy firms.",
        features: [
          "Everything in Agency Pro",
          "Multi-Workspace & Multi-Department Isolation",
          "Single Sign-On (SSO) & Granular RBAC Permissions",
          "GitHub / GitLab Webhook Commit Integration",
          "Dedicated Private VPS Setup with Automated Backups",
          "1 Year Priority SLA & Engineering Support",
        ],
      },
    ],
    overview: {
      whatItDoes:
        "TaskDigitalCrowd streamlines project execution from initial requirement scoping to final production deployment. Teams visualize workflows on intuitive Kanban boards, collaborate with zero lag, and share progress transparently with clients.",
      whoCanUse: [
        "Software Engineering & Web Development Agencies",
        "Digital Marketing & Creative Studios",
        "Architecture & Construction Project Firms",
        "Internal Enterprise IT & Operations Teams",
      ],
      problemsSolved: [
        "Eliminates crippling \$15-\$30/user/month subscription bills that scale out of control",
        "Stops project delays caused by untracked tasks buried in email and chat threads",
        "Prevents client mistrust through transparent, live progress dashboards",
        "Ensures intellectual property and project notes stay private on your server",
      ],
      businessBenefits: [
        "Saves thousands of dollars annually in third-party SaaS tool subscriptions",
        "Accelerates sprint turnaround by 25% through clear task ownership",
        "Fosters high accountability with detailed audit trails and time records",
        "Unlimited users, teams, and projects without recurring license fees",
      ],
      whyChoose:
        "Built with Next.js App Router, Tailwind CSS, and optimized WebSockets for instant, butter-smooth 60fps drag-and-drop interactions with zero browser lag.",
    },
    features: [
      "Smooth 60fps drag-and-drop Kanban boards with custom workflow stages",
      "Sprint planning milestones, task velocity tracking, and burndown charts",
      "Subtasks, markdown notes, file attachments, and activity history",
      "Role-Based Access Control (Admin, Team Member, Client Guest)",
      "Real-time team synchronization using bidirectional WebSockets",
      "Zero per-user monthly subscription fees: unlimited team members",
    ],
    technologies: [
      "Next.js App Router",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Socket.io",
      "Framer Motion",
    ],
    screenshots: [
      {
        title: "Fluid 60fps Kanban Boards",
        category: "Kanban Board",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
        caption: "Intuitive task workflow with color-coded priority labels, due dates, and assignee avatars.",
      },
      {
        title: "Sprint Burndown & Velocity Analytics",
        category: "Sprint Analytics",
        url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80",
        caption: "Visual sprint completion metrics, team velocity, and overdue task warnings.",
      },
      {
        title: "Collaborative Milestone Timelines",
        category: "Milestones",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
        caption: "Structured project phases ensuring on-time delivery across engineering sprints.",
      },
      {
        title: "Client Progress & Approval Portal",
        category: "Client Review",
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&auto=format&fit=crop&q=80",
        caption: "Branded client portal for transparent project visibility and deliverable sign-offs.",
      },
    ],
    liveUrl: "https://task.digitalcrowdtech.in/",
    imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&auto=format&fit=crop&q=80",
    caseStudyUrl: "https://task.digitalcrowdtech.in/",
    status: "Published",
  },
  {
    id: "prod-food-sharing-platform",
    title: "Food Sharing Platform",
    slug: "food-sharing-platform",
    category: "CSR & Community Sustainability SaaS",
    shortCategory: "Food Rescue & NGO Dispatch",
    label: "Community Impact Platform",
    summary:
      "Zero-waste surplus food redistribution network connecting banquet halls, restaurants, corporate cafeterias, and NGOs for rapid meal rescue.",
    description:
      "Ruchi Food Sharing is a purpose-driven digital platform designed to eradicate edible food wastage. Connects commercial food donors (wedding banquets, corporate pantries, hotels) with verified food rescue volunteers and orphanages within a tight 15-minute dispatch radius.",
    price: "Starting from ₹11,999",
    numericPrice: 11999,
    pricingPlans: [
      {
        name: "Community Network",
        price: "₹11,999",
        numericPrice: 11999,
        description: "For local non-profits, volunteer groups & community trusts.",
        features: [
          "Donor Surplus Meal Post Form with Quantity & Expiry",
          "Volunteer Pickup Alert Broadcasts via WhatsApp",
          "Geo-Location Radius Matching (< 10km)",
          "Food Quality Safety Verification Checklist",
          "Beneficiary NGO Receipt Confirmation",
          "Public Impact Counter (Meals Rescued & CO2 Saved)",
        ],
      },
      {
        name: "Citywide NGO Suite",
        price: "₹21,999",
        numericPrice: 21999,
        popular: true,
        description: "For established food banks & municipal zero-waste organizations.",
        features: [
          "Everything in Community Network",
          "Donor Tier KYC & Food Safety Regulatory Compliance",
          "Dedicated Volunteer Fleet Dispatch & Route Optimization",
          "Automated Donation Tax Exemption Receipts (80G)",
          "Corporate CSR Sponsor Badges & Real-Time Impact Feeds",
          "Admin Central Audit & Dispatch Monitor",
        ],
      },
      {
        name: "Statewide CSR Network",
        price: "₹39,999",
        numericPrice: 39999,
        description: "For corporate foundations, state governments & national NGO alliances.",
        features: [
          "Everything in Citywide NGO Suite",
          "Multi-City Operations Hub with Regional Coordinator Portals",
          "Custom Android Mobile App (PWA / APK)",
          "Cold Chain & Refrigerated Van Temperature Tracking",
          "Corporate CSR Compliance & Sustainability Audit Reports",
          "Dedicated Cloud Infrastructure & SLA Maintenance",
        ],
      },
    ],
    overview: {
      whatItDoes:
        "Ruchi Food Sharing prevents edible meals from ending up in landfills by matching commercial food donors with nearby shelters and volunteers in real time. Features an urgent countdown timer so food is collected and consumed safely.",
      whoCanUse: [
        "Non-Governmental Organizations (NGOs) & Food Banks",
        "Banquet Halls, Convention Centers & Caterers",
        "Corporate Tech Campuses with Large Cafeterias",
        "Hotel Chains, Cloud Kitchens & Municipalities",
      ],
      problemsSolved: [
        "Prevents thousands of kilograms of cooked food from rotting in landfills",
        "Eliminates chaotic last-minute phone calls when surplus food is available",
        "Ensures food safety through strict time-to-consume countdowns",
        "Provides commercial donors with verifiable CSR and ESG impact metrics",
      ],
      businessBenefits: [
        "Automated volunteer notification within 60 seconds of donation post",
        "Verifiable ESG metrics for corporate CSR reporting and tax compliance",
        "Deep community goodwill and high media visibility for donors",
        "Low-maintenance architecture with automated message routing",
      ],
      whyChoose:
        "Engineered with lightweight, low-bandwidth interfaces optimized for volunteers using budget smartphones in field operations with unreliable connectivity.",
    },
    features: [
      "1-Minute surplus food posting with dish count, prep time & expiry timer",
      "Instant automated WhatsApp alerts sent to verified local volunteer fleets",
      "Geo-location matching ensuring pickup dispatch within 15 minutes",
      "Food quality checklist and recipient photo verification handover",
      "Live community impact dashboard showing total meals rescued and carbon saved",
      "Admin verification for donors, volunteers, and certified beneficiary shelters",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "WhatsApp API",
      "Leaflet GeoMaps",
    ],
    screenshots: [
      {
        title: "Instant Surplus Food Donation Listing",
        category: "Donor Portal",
        url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1000&auto=format&fit=crop&q=80",
        caption: "Simple 3-step meal posting with preparation timestamp and safety expiry countdown.",
      },
      {
        title: "Real-Time Volunteer Pickup Dispatch",
        category: "Volunteer Map",
        url: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1000&auto=format&fit=crop&q=80",
        caption: "Geo-fenced volunteer matching within a 15-minute dispatch radius.",
      },
      {
        title: "Shelter Allocation & Handover Proof",
        category: "Beneficiary",
        url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000&auto=format&fit=crop&q=80",
        caption: "Digital delivery confirmation with beneficiary sign-off and photo proof.",
      },
      {
        title: "Community ESG Impact Counter",
        category: "Impact Analytics",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
        caption: "Public real-time counter showing cumulative meals distributed and landfill emissions saved.",
      },
    ],
    liveUrl: "https://foodsharing.ruchibazaar.in/",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80",
    caseStudyUrl: "https://foodsharing.ruchibazaar.in/",
    status: "Published",
  },
  {
    id: "prod-custom-web-mobile-solutions",
    title: "Custom Website & Mobile App Solutions",
    slug: "custom-website-mobile-solutions",
    category: "Full-Stack Engineering & Mobile Apps",
    shortCategory: "Full-Stack Web & Mobile",
    label: "Bespoke Engineering",
    summary:
      "Tailor-made full-stack web platforms, native-quality mobile applications, and high-load REST backend architectures engineered specifically for your business model.",
    description:
      "When off-the-shelf templates and generic SaaS builders fall short, our bespoke engineering service delivers custom software designed around your exact operational parameters. From responsive Next.js web applications to cross-platform mobile apps (Android & iOS) and secure Node.js microservices.",
    price: "Starting from ₹19,999",
    numericPrice: 19999,
    pricingPlans: [
      {
        name: "Custom Web Application",
        price: "₹19,999",
        numericPrice: 19999,
        description: "For bespoke web portals, client dashboards & internal workflow engines.",
        features: [
          "Next.js App Router & Tailwind CSS Frontend",
          "Express.js & Node.js REST API Backend",
          "Normalized MySQL Relational Database Architecture",
          "JWT Authentication & Role-Based Access Control (RBAC)",
          "Integrated PhonePe Payment Gateway & Automated Invoicing",
          "100% Full Source Code Ownership & Deployment",
        ],
      },
      {
        name: "Web + Mobile App Ecosystem",
        price: "₹38,999",
        numericPrice: 38999,
        popular: true,
        description: "For complete digital businesses requiring synchronized web & mobile interfaces.",
        features: [
          "Everything in Custom Web Application",
          "Cross-Platform Mobile Application (Android APK / PWA)",
          "Push Notifications & WhatsApp Transactional Alerts",
          "Real-Time WebSocket Sync for Live Updates",
          "Admin SuperConsole with Data Export & Visual Analytics",
          "Production Cloud VPS Setup & SSL Hardening",
        ],
      },
      {
        name: "Enterprise Custom Architecture",
        price: "₹69,999",
        numericPrice: 69999,
        description: "For high-traffic platforms, FinTech workflows & multi-tenant SaaS products.",
        features: [
          "Everything in Web + Mobile App Ecosystem",
          "High-Concurrency Redis Caching & Queue Workers",
          "Third-Party ERP, CRM & Accounting API Integrations",
          "Automated CI/CD Deployment Pipeline & Staging Environment",
          "Comprehensive Technical Architecture Documentation",
          "1 Year Dedicated Maintenance SLA & Priority Support",
        ],
      },
    ],
    overview: {
      whatItDoes:
        "Delivers end-to-end bespoke software engineering tailored to your operational specifications. We design, develop, test, and deploy unified web and mobile architectures that give your business a decisive competitive advantage.",
      whoCanUse: [
        "Startups Launching Proprietary Digital Products",
        "Medium Enterprises Digitizing Complex Offline Operations",
        "Service Firms Automating Client Quoting & Booking",
        "Manufacturers & Distributors Building Custom B2B Portals",
      ],
      problemsSolved: [
        "Eliminates compromises imposed by generic 'no-code' tools and rigid WordPress templates",
        "Stops paying perpetual monthly SaaS license fees for features you never use",
        "Solves sluggish performance through modern, server-rendered Next.js code",
        "Guarantees that your business owns 100% of its intellectual property and customer records",
      ],
      businessBenefits: [
        "Software built to adapt to your unique workflow, not the other way around",
        "Lightning-fast performance and top Lighthouse Core Web Vitals scores",
        "Zero vendor lock-in: host on any cloud VPS (AWS, DigitalOcean, Hostinger)",
        "Direct integration with Indian payment gateways (PhonePe, Razorpay, UPI)",
      ],
      whyChoose:
        "We are hands-on full-stack engineers based in Madhapur, Hyderabad. We build clean, documented code using battle-tested technologies without outsourcing or cutting corners.",
    },
    features: [
      "Full-stack architecture: Next.js frontend, Express backend, and MySQL database",
      "Native-feel cross-platform mobile apps with offline persistence and push alerts",
      "Clean RESTful APIs with strict validation, rate limiting, and JWT security",
      "Integrated PhonePe Business payment gateway with automated status verification",
      "Production deployment on your private server with automatic SSL and backup cron jobs",
      "Complete source code ownership delivered via private Git repository handover",
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "React Native",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MySQL",
      "Redis",
      "Socket.io",
      "PhonePe SDK",
    ],
    screenshots: [
      {
        title: "Cross-Platform Mobile Application UI",
        category: "Mobile",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&auto=format&fit=crop&q=80",
        caption: "Sleek, responsive native mobile interface designed for iOS and Android.",
      },
      {
        title: "High-Performance Next.js Web Platform",
        category: "Web Platform",
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80",
        caption: "Fast, server-rendered React pages delivering exceptional user experience and SEO.",
      },
      {
        title: "Secure RESTful API Gateway",
        category: "Backend APIs",
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&auto=format&fit=crop&q=80",
        caption: "Modular Express.js endpoints with authentication, rate limiting, and validation.",
      },
      {
        title: "Normalized Relational Database Architecture",
        category: "Database",
        url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1000&auto=format&fit=crop&q=80",
        caption: "Optimized MySQL schema ensuring relational integrity, indexing, and fast queries.",
      },
    ],
    liveUrl: "/services",
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&auto=format&fit=crop&q=80",
    caseStudyUrl: "/services",
    status: "Published",
  },
  {
    id: "prod-enterprise-agency-suite",
    title: "Enterprise Agency Website & Inquiry CMS",
    slug: "enterprise-agency-website-cms",
    category: "Corporate Web Platform & CMS",
    shortCategory: "Agency CMS & Lead Engine",
    label: "Turnkey Agency Suite",
    summary:
      "Production-grade corporate website engine featuring verified lead capture pipelines, dynamic markdown blog publishing, modern dark/light glassmorphic UI, and full admin management.",
    description:
      "A complete digital agency and consulting solution designed for IT service providers, creative studios, and corporate advisory firms. Eliminates slow bloated WordPress setups with a modern Next.js 16 App Router frontend, Express backend, dedicated MySQL database, and automated Nodemailer notification pipelines.",
    price: "Starting from ₹9,999",
    technologies: [
      "Next.js 16",
      "React 19",
      "Node.js",
      "Express.js",
      "MySQL",
      "Tailwind CSS",
      "Nodemailer",
      "JWT Auth",
      "Sequelize ORM",
    ],
    features: [
      "Complete client lead qualification pipeline with instant email alerts",
      "Administrative command suite for inquiries, blogs, portfolio & assets",
      "Dynamic markdown & rich-text blog publishing with reading time & SEO meta",
      "Accessible obsidian dark & corporate light theme system with smooth micro-interactions",
      "Interactive service inquiry workflow with WhatsApp instant chat routing",
      "Zero vendor lock-in: 100% full source code and dedicated MySQL schema ownership",
      "Built-in enterprise security: JWT session auth, bcrypt hashing & DDoS rate limiting",
      "High-performance Lighthouse 95+ score with zero bloated WordPress plugins",
    ],
    overview: {
      whatItDoes:
        "The Enterprise Agency Website & Inquiry CMS delivers a turn-key, high-conversion digital presence for modern software agencies and professional service consultancies. It combines a client-facing corporate storefront with a powerful back-office management suite for processing client inquiries, publishing editorial content, showcasing case studies, and managing service pricing tiers.",
      whoCanUse: [
        "Digital Marketing & Web Agencies",
        "IT Service Providers & Software Consultancies",
        "Corporate Advisory & Management Firms",
        "Creative Design & Branding Studios",
        "Enterprise B2B Technology Startups",
      ],
      problemsSolved: [
        "Eliminates slow, vulnerable WordPress plugins and themes that require constant paid maintenance.",
        "Prevents missed customer leads with real-time SMTP email notifications and direct WhatsApp chat handoff.",
        "Solves proprietary CMS lock-in with clean, normalized MySQL relational database schemas.",
        "Overcomes poor mobile SEO scores with blazing-fast server-side rendered (SSR) Next.js 16 architecture.",
      ],
      businessBenefits: [
        "Instant +320% improvement in lead capture velocity through verified multi-step consultation forms.",
        "100% elimination of monthly recurring SaaS or hosting fees for bloated proprietary platforms.",
        "Complete enterprise ownership of your brand assets, client inquiry database, and intellectual property.",
        "Flawless cross-device responsive performance on mobile phones, tablets, laptops, and ultra-wide displays.",
      ],
      whyChoose: [
        "Customized Solutions: Engineered with scalable enterprise architecture tailored to your specific consulting service lines.",
        "Modern Technology: Built with Next.js 16, React 19, Express.js, and MySQL with zero template bloat.",
        "User-Friendly Experience: Dual Obsidian Dark & Corporate Light theme support with buttery smooth micro-animations.",
        "Complete Digital Solutions: Unified frontend marketing pages, dynamic editorial blog engine, and admin dashboard.",
        "Reliable Support: Full source code repository handover, staging environment provisioning, and technical training.",
        "Business-Focused Approach: Designed to accelerate client trust, demonstrate portfolio authority, and close deals.",
      ],
    },
    pricingPlans: [
      {
        name: "Starter Agency Suite",
        price: "₹9,999",
        numericPrice: 9999,
        description:
          "Perfect for independent digital agencies, boutique consultancies, and specialized professional service firms.",
        features: [
          "Complete Corporate Agency Frontend (Home, About, Services, Contact, Blog)",
          "Client Lead Qualification Form with Instant SMTP Email Alerts",
          "Comprehensive SEO Metadata, OpenGraph Tags & Schema.org JSON-LD",
          "Dedicated MySQL Relational Database Schema & Setup",
          "Obsidian Dark & Corporate Light Theme Toggle",
          "100% Full Source Code Handover & Staging URL Deployment",
        ],
      },
      {
        name: "Business Growth CMS",
        price: "₹18,999",
        numericPrice: 18999,
        popular: true,
        description:
          "For expanding agencies requiring active content marketing, dynamic case studies, and team administrative controls.",
        features: [
          "Everything in Starter Agency Suite",
          "Full Administrative CMS Dashboard (Inquiries, Blog Posts, Portfolio, Careers)",
          "Dynamic Editorial Blog Engine with Categories, Tags & Reading Time",
          "Interactive Scope Estimator & Pricing Calculator Component",
          "WhatsApp Direct Chat Lead Routing & Auto-Responder Integration",
          "Role-Based Staff Access Control (Admin, Editor, Sales)",
          "6 Months Dedicated Technical Maintenance & Engineering Support",
        ],
      },
      {
        name: "Enterprise Custom Agency",
        price: "₹34,999",
        numericPrice: 34999,
        description:
          "Full custom architecture for high-volume agencies needing CRM integrations, payment portals, and priority SLAs.",
        features: [
          "Everything in Business Growth CMS",
          "Multi-Language / International Localization Framework",
          "Custom Webhook & CRM Sync (HubSpot, Salesforce, Zoho, Zapier)",
          "Integrated PhonePe & Card Payment Gateway for Invoices & Retainers",
          "Cloud VPS Provisioning, SSL Installation & Cloudflare DDoS Hardening",
          "1 Year Priority SLA Technical Engineering Support",
        ],
      },
    ],
    screenshots: [
      {
        title: "Enterprise Agency - Main Command Suite",
        description: "High-resolution modern corporate landing page showcasing agency capabilities and verified credentials.",
        url: "/products/enterprise-agency-preview.png",
        tag: "Hero Suite",
      },
      {
        title: "Lead Management & Inquiry Pipeline",
        description: "Real-time administrative console for filtering, inspecting, and converting incoming client inquiries.",
        url: "/products/enterprise-agency-dashboard.png",
        tag: "Inquiries",
      },
      {
        title: "Dynamic Editorial & SEO Blog CMS",
        description: "Full markdown publishing environment with category indexing, cover uploads, and reading time estimation.",
        url: "/products/enterprise-agency-cms.png",
        tag: "Editorial CMS",
      },
      {
        title: "Corporate Services & Conversion Layout",
        description: "High-conversion service breakdown with interactive tech stack tags and client proof cards.",
        url: "/products/enterprise-agency-storefront.png",
        tag: "Services",
      },
      {
        title: "Mobile-Optimized Touch Experience",
        description: "Flawless mobile responsive viewport with drawer navigation, 1-tap WhatsApp chat, and fast loading.",
        url: "/products/enterprise-agency-mobile.png",
        tag: "Mobile UI",
      },
      {
        title: "Inquiry Analytics & Traffic Velocity",
        description: "Visual reporting dashboard displaying lead volume, conversion ratios, and inquiry trends.",
        url: "/products/enterprise-agency-analytics.png",
        tag: "Analytics",
      },
    ],
    liveUrl: "/",
    imageUrl: "/products/enterprise-agency-preview.png",
    caseStudyUrl: "/about",
    status: "Published",
  },
];

export const SLUG_ALIASES = {
  "quickkirana": "quickkirana-retail-ecommerce",
  "retail-ecommerce": "quickkirana-retail-ecommerce",
  "quickkirana-retail": "quickkirana-retail-ecommerce",
  "prod-retail-ecommerce": "quickkirana-retail-ecommerce",
  "prod-quickkirana-retail": "quickkirana-retail-ecommerce",

  "school-management": "school-management-system",
  "school-erp": "school-management-system",
  "edumaster": "school-management-system",
  "edumaster-school-management-erp": "school-management-system",
  "prod-school-erp": "school-management-system",

  "hospital-management-system": "hospital-clinic-management-system",
  "hospital-management": "hospital-clinic-management-system",
  "clinic-management-system": "hospital-clinic-management-system",
  "carepulse-hospital-clinic-ehr": "hospital-clinic-management-system",
  "carepulse": "hospital-clinic-management-system",
  "prod-hospital-clinic-ehr": "hospital-clinic-management-system",

  "restaurant-management": "restaurant-management-system",
  "ruchi-bazzar-food-delivery": "restaurant-management-system",
  "ruchi-bazzar-restaurant-pos": "restaurant-management-system",
  "ruchi-bazzar": "restaurant-management-system",
  "food-delivery": "restaurant-management-system",
  "prod-ruchi-bazzar": "restaurant-management-system",

  "business-directory": "business-directory-platform",
  "localconnect-business-directory": "business-directory-platform",
  "localconnect": "business-directory-platform",
  "prod-business-directory": "business-directory-platform",

  "task-project-management": "task-project-management-system",
  "taskdigitalcrowd-project-management": "task-project-management-system",
  "project-management-system": "task-project-management-system",
  "taskdigitalcrowd": "task-project-management-system",
  "prod-task-project-management": "task-project-management-system",

  "food-sharing": "food-sharing-platform",
  "ruchi-food-rescue-platform": "food-sharing-platform",
  "ruchi-food-rescue": "food-sharing-platform",
  "food-rescue-platform": "food-sharing-platform",
  "prod-food-sharing-platform": "food-sharing-platform",

  "custom-web-mobile-solutions": "custom-website-mobile-solutions",
  "custom-website-mobile": "custom-website-mobile-solutions",
  "custom-solutions": "custom-website-mobile-solutions",
  "prod-custom-web-mobile-solutions": "custom-website-mobile-solutions",

  "enterprise-agency-website-cms": "enterprise-agency-website-cms",
  "agency-website-cms": "enterprise-agency-website-cms",
  "prod-enterprise-agency-suite": "enterprise-agency-website-cms",
};

export const findProductBySlugOrAlias = (rawSlug) => {
  if (!rawSlug || typeof rawSlug !== "string") return null;
  const clean = decodeURIComponent(rawSlug).trim().toLowerCase().replace(/^\/+|\/+$/g, "");

  // 1. Direct match on slug or ID
  let match = PRODUCTS.find(
    (p) => (p.slug && p.slug.toLowerCase() === clean) || (p.id && p.id.toLowerCase() === clean)
  );
  if (match) return match;

  // 2. Alias mapping lookup
  const targetSlug = SLUG_ALIASES[clean];
  if (targetSlug) {
    match = PRODUCTS.find(
      (p) => (p.slug && p.slug.toLowerCase() === targetSlug) || (p.id && p.id.toLowerCase() === targetSlug)
    );
    if (match) return match;
  }

  // 3. Fallback partial/normalized match
  match = PRODUCTS.find((p) => {
    const s = (p.slug || "").toLowerCase();
    return s.includes(clean) || clean.includes(s);
  });
  return match || null;
};

export const getProductBySlug = findProductBySlugOrAlias;

export const getAllProductSlugs = () => {
  const canonicalSlugs = PRODUCTS.map((p) => p.slug).filter(Boolean);
  const aliasKeys = Object.keys(SLUG_ALIASES);
  return Array.from(new Set([...canonicalSlugs, ...aliasKeys]));
};

export const getRelatedProducts = (currentSlug, limit = 4) => {
  const current = findProductBySlugOrAlias(currentSlug);
  return PRODUCTS.filter((p) => p.slug !== current?.slug && p.id !== current?.id).slice(0, limit);
};

