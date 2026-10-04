// Site-wide data constants

export const SITE = {
  name: 'Digital Crowd Technologies',
  shortName: 'DCT',
  tagline: 'Build Digital. Grow Smarter.',
  description:
    'Digital Crowd Technologies builds modern websites, e-commerce platforms, ERP systems, school management software and custom digital solutions for businesses and organizations.',
  url: 'https://digitalcrowdtech.in',
  email: 'support@digitalcrowdtech.in',
  location: 'Hyderabad, Telangana, India',
  foundedYear: 2024,
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES = [
  {
    id: 'web-development',
    icon: 'Globe',
    title: 'Web Development',
    description:
      'Modern responsive websites and web applications designed around business goals — from landing pages to complex multi-feature platforms.',
    tags: ['Next.js', 'React', 'Node.js', 'Tailwind CSS'],
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingCart',
    title: 'E-Commerce',
    description:
      'Complete online commerce platforms with product management, customer accounts, order processing, payment integration and administration dashboards.',
    tags: ['Next.js', 'Node.js', 'MySQL', 'Payment Gateways'],
  },
  {
    id: 'erp',
    icon: 'LayoutGrid',
    title: 'ERP Solutions',
    description:
      'Custom business management systems designed to simplify operations, automate workflows and give teams a clear view of business data.',
    tags: ['Node.js', 'MySQL', 'React', 'REST APIs'],
  },
  {
    id: 'school-management',
    icon: 'GraduationCap',
    title: 'School Management Systems',
    description:
      'Digital platforms for educational institutions covering students, teachers, parents, attendance, fees, timetables, notices and administration.',
    tags: ['Next.js', 'Node.js', 'MySQL', 'Multi-role Access'],
  },
  {
    id: 'mobile-apps',
    icon: 'Smartphone',
    title: 'Mobile Applications',
    description:
      'Modern mobile experiences for customers, teams and businesses — designed to be fast, intuitive and purpose-built for real user needs.',
    tags: ['React Native', 'Node.js', 'REST APIs'],
  },
  {
    id: 'api-backend',
    icon: 'Server',
    title: 'API & Backend Development',
    description:
      'Secure, structured and scalable backend systems and APIs built with authentication, validation, proper error handling and clean architecture.',
    tags: ['Node.js', 'Express.js', 'MySQL', 'REST APIs'],
  },
];

export const WHAT_WE_BUILD = [
  { icon: 'Globe', label: 'Business Websites' },
  { icon: 'MonitorSmartphone', label: 'Web Applications' },
  { icon: 'ShoppingCart', label: 'E-Commerce Platforms' },
  { icon: 'LayoutGrid', label: 'ERP Systems' },
  { icon: 'GraduationCap', label: 'School Management Systems' },
  { icon: 'Smartphone', label: 'Mobile Applications' },
  { icon: 'Server', label: 'APIs & Backend Systems' },
];

export const TECH_STACK = {
  Frontend: [
    { name: 'React', icon: '⚛' },
    { name: 'Next.js', icon: '▲' },
    { name: 'JavaScript', icon: 'JS' },
    { name: 'Tailwind CSS', icon: '🎨' },
  ],
  Backend: [
    { name: 'Node.js', icon: '⬡' },
    { name: 'Express.js', icon: '⚡' },
  ],
  Database: [
    { name: 'MySQL', icon: '🗄' },
    { name: 'Sequelize', icon: '📋' },
  ],
  'Tools & Infrastructure': [
    { name: 'Git', icon: '⑂' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'Postman', icon: '📬' },
    { name: 'Hostinger', icon: '🌐' },
    { name: 'VPS / Cloud', icon: '☁' },
  ],
};

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business, its operations, users and core requirements before any design or code begins.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Define the system architecture, feature set, technology choices and development roadmap.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Create the interface structure, user experience flows and visual design language.',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Build the frontend, backend, database and integrations with clean, maintainable code.',
  },
  {
    number: '05',
    title: 'Test',
    description: 'Validate functionality, performance, security and cross-device compatibility.',
  },
  {
    number: '06',
    title: 'Deploy',
    description: 'Launch the product to a production environment with proper configuration and setup.',
  },
  {
    number: '07',
    title: 'Support',
    description: 'Maintain, monitor and improve the solution after launch based on real usage and evolving needs.',
  },
];

export const WHY_US = [
  {
    icon: 'Target',
    title: 'Business Focused',
    description: 'Solutions are designed around actual workflows, user needs and business requirements — not generic templates.',
  },
  {
    icon: 'Code2',
    title: 'Modern Development',
    description: 'Current web technologies and development practices that produce clean, maintainable and scalable codebases.',
  },
  {
    icon: 'Layers',
    title: 'Scalable Architecture',
    description: 'Systems are built with future expansion in mind — easy to add features, users and data as businesses grow.',
  },
  {
    icon: 'Layout',
    title: 'Clean User Experience',
    description: 'Interfaces that are simple, responsive and straightforward — reducing training time and user friction.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Security Mindset',
    description: 'Authentication, authorization, input validation and secure API practices are considered from the start.',
  },
  {
    icon: 'Wrench',
    title: 'Long-Term Support',
    description: 'Products can be maintained, updated and improved after launch as requirements change and businesses grow.',
  },
];

export const PRODUCTS = [
  {
    id: 'ruchi-bazzar',
    name: 'Ruchi Bazzar',
    category: 'Food Delivery & E-Commerce Platform',
    description:
      'A multi-role food delivery and commerce platform connecting customers, restaurants and partners, delivery operations and administrators through a unified system.',
    features: [
      'Customer ordering and cart management',
      'Restaurant and partner management portal',
      'Delivery management and assignment',
      'Order tracking and status management',
      'Admin dashboard and reporting',
      'Authentication and role-based access',
      'Real-time order status updates',
      'Location and delivery area management',
    ],
    tech: ['Next.js', 'Node.js', 'Express', 'MySQL', 'Socket.IO'],
    accent: '#f97316',
  },
  {
    id: 'school-management',
    name: 'School Management System',
    category: 'School ERP / Management Platform',
    description:
      'A centralized school management solution designed to connect administration, teachers, students and parents through a single organized platform.',
    features: [
      'Student enrollment and profile management',
      'Teacher management and assignments',
      'Parent portal and communication',
      'Attendance tracking and reporting',
      'Fee management and payment records',
      'Timetable scheduling',
      'Notice and announcement board',
      'Syllabus and curriculum management',
      'Transport management',
      'Academic reports and progress tracking',
      'Multi-role administration access',
    ],
    tech: ['Next.js', 'Node.js', 'MySQL'],
    accent: '#6366f1',
    pricing: {
      label: '₹9,999',
      note: 'Lifetime software license',
    },
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What services does Digital Crowd Technologies provide?',
    answer:
      'We provide web development, e-commerce platform development, ERP solutions, school management systems, mobile application development and API/backend development for businesses and organizations.',
  },
  {
    question: 'Can you build custom software?',
    answer:
      'Yes. We build custom software solutions tailored to specific business workflows and requirements. We start by understanding your needs and design a system around them rather than forcing your business into a generic template.',
  },
  {
    question: 'Do you develop e-commerce websites?',
    answer:
      'Yes. We develop complete e-commerce platforms including product management, customer accounts, order processing and payment integration. Each platform is built around the specific requirements of the business.',
  },
  {
    question: 'Can you customize an ERP system?',
    answer:
      'Yes. We build custom ERP systems designed around actual business processes. If you already have a system in place, we can also discuss integration or extension options depending on the technology involved.',
  },
  {
    question: 'Do you provide school management software?',
    answer:
      'Yes. We have built a School Management System that covers student management, teacher management, parent portal, attendance, fees, timetable, notices, syllabus, transport and reports. It is available as a licensed product and can also be customized to fit specific institutional requirements.',
  },
  {
    question: 'Do you provide hosting?',
    answer:
      'We can assist with deployment to hosting environments. Domain and hosting costs are separate from software development costs and depend on the chosen provider and plan. We are transparent about all costs involved.',
  },
  {
    question: 'How long does development take?',
    answer:
      'Development timelines depend on the scope and complexity of the project. A simple business website may take a few weeks, while a full platform with multiple roles and features will take longer. We provide a realistic timeline estimate after understanding your requirements.',
  },
  {
    question: 'Do you provide maintenance after launch?',
    answer:
      'Yes. We can provide ongoing maintenance and support after launch — including bug fixes, updates, feature additions and performance improvements. Maintenance arrangements are discussed and agreed upon for each project.',
  },
  {
    question: 'Can you integrate third-party APIs?',
    answer:
      'Yes. We can integrate third-party services including payment gateways, SMS providers, email services, mapping services and other APIs depending on what your project needs.',
  },
  {
    question: 'How can I request a quotation?',
    answer:
      'You can use the contact form on our website or email us at support@digitalcrowdtech.in with a brief description of your project. We will review it and get back to you to discuss requirements and provide a quote.',
  },
];
