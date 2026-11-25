const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const multer = require("multer");
const mysql = require("mysql2/promise");
const { DataTypes, Sequelize, Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ override: true });

const { defaultBlogs, defaultCareers, defaultProjects, defaultProducts } = require("./defaultData");

const app = express();
const PORT = process.env.PORT || 5001;
const SUPPORT_EMAIL = process.env.CONTACT_TO_EMAIL || "support@digitalcrowdtech.in";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@digitalcrowdtech.in";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dct_secret_admin_token_2026_secured";
const JWT_SECRET = process.env.JWT_SECRET || "dct_super_secure_jwt_secret_production_2026_default";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";
const DB_NAME = process.env.DB_NAME || "dct";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT || 3306);

// Global Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (process.env.NODE_ENV === "production" || req.headers["x-forwarded-proto"] === "https") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  next();
});

// Setup uploads directory for project images
const uploadsDir = path.resolve(__dirname, "..", "Frontend", "my-app", "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `project-${sanitizedBase ? sanitizedBase.slice(0, 20) + "-" : ""}${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB strict limit
  fileFilter: (req, file, cb) => {
    const allowedExts = /^\.(jpe?g|png|webp|svg|gif|avif)$/i;
    const allowedMimes = /^image\/(jpeg|png|webp|svg\+xml|gif|avif)$/i;
    const ext = allowedExts.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedMimes.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error("Only valid image files (jpg, png, webp, svg, gif, avif) under 5MB are permitted."));
    }
  },
});

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// Comprehensive Allowed Origins List
const defaultAllowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5000",
  "http://localhost:5001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:5000",
  "http://127.0.0.1:5001",
  "https://dskirana.in",
  "https://www.dskirana.in",
  "https://api.dskirana.in",
  "https://admin.dskirana.in",
  "http://dskirana.in",
  "http://www.dskirana.in",
  "http://api.dskirana.in",
  "https://digitalcrowdtech.in",
  "https://www.digitalcrowdtech.in",
  "https://api.digitalcrowdtech.in",
  "http://digitalcrowdtech.in",
  "http://www.digitalcrowdtech.in",
];

const envOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const allowedOriginsSet = new Set([...defaultAllowedOrigins, ...envOrigins]);

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // Mobile apps, Postman, server-to-server, curl
  const clean = origin.trim().replace(/\/$/, "");

  if (allowedOriginsSet.has(clean) || allowedOriginsSet.has("*")) {
    return true;
  }

  try {
    const parsed = new URL(clean);
    const host = parsed.hostname.toLowerCase();
    if (
      host === "dskirana.in" ||
      host.endsWith(".dskirana.in") ||
      host === "digitalcrowdtech.in" ||
      host.endsWith(".digitalcrowdtech.in") ||
      host === "localhost" ||
      host === "127.0.0.1"
    ) {
      return true;
    }
  } catch (err) {
    // Malformed origin URL
  }

  return false;
};

// Official CORS Middleware Configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback: allow to avoid unexpected CORS blocks on new subdomains
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range", "Authorization"],
  maxAge: 86400, // 24 hours preflight cache
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Explicit Preflight & Header Fallback Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD");
    res.setHeader(
      "Access-Control-Allow-Headers",
      req.headers["access-control-request-headers"] ||
        "Content-Type, Authorization, X-Requested-With, Accept, Origin"
    );
    res.setHeader("Access-Control-Max-Age", "86400");
  } else if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Vary", "Origin, Access-Control-Request-Headers");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

app.use(express.json({ limit: "5mb" }));

// Memory-safe Tiered Rate Limiter with automatic periodic cleanup
const createRateLimiter = (maxLimit = 60, windowMs = 60000, message = "Too many requests. Please wait a moment before trying again.") => {
  const ipMap = new Map();

  // Periodic memory cleanup every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of ipMap.entries()) {
      if (now > value.resetTime) {
        ipMap.delete(key);
      }
    }
  }, 300000).unref();

  return (req, res, next) => {
    const rawIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "local";
    const ip = String(rawIp).split(",")[0].trim();
    const now = Date.now();
    const record = ipMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
    }

    ipMap.set(ip, record);

    if (record.count > maxLimit) {
      return res.status(429).json({
        ok: false,
        message,
      });
    }

    next();
  };
};

const authLimiter = createRateLimiter(20, 15 * 60 * 1000, "Too many login attempts. Please wait a few minutes before trying again.");
const contactLimiter = createRateLimiter(5, 10 * 60 * 1000, "Too many inquiry submissions. Please wait a few minutes before submitting another.");
const apiLimiter = createRateLimiter(120, 60 * 1000);

const sanitize = (value) => {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
};

const escapeHtml = (text) =>
  String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const createId = (prefix) =>
  `${prefix}-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

const verifyPassword = async (password, storedHash) => {
  if (!storedHash || !password) return false;
  if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$") || storedHash.startsWith("$2y$")) {
    return bcrypt.compare(password, storedHash);
  }
  try {
    const legacyHash = crypto.pbkdf2Sync(password, "dct_salt_secure_2026", 10000, 64, "sha512").toString("hex");
    return legacyHash === storedHash;
  } catch {
    return false;
  }
};

// Sequelize Setup
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Models Definition
const Blog = sequelize.define(
  "Blog",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    category: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    readTime: { type: DataTypes.STRING, defaultValue: "5 min read" },
    excerpt: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT("long"), allowNull: false },
    status: { type: DataTypes.ENUM("Published", "Draft"), defaultValue: "Published" },
  },
  { tableName: "blogs" }
);

const Career = sequelize.define(
  "Career",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false, defaultValue: "Full Time" },
    location: { type: DataTypes.STRING, allowNull: false, defaultValue: "Hyderabad" },
    experience: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT("long"), allowNull: false },
    status: { type: DataTypes.ENUM("Open", "Closed"), defaultValue: "Closed" },
  },
  { tableName: "careers" }
);

const Project = sequelize.define(
  "Project",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    client: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING, allowNull: false },
    isInternal: { type: DataTypes.BOOLEAN, defaultValue: false },
    label: { type: DataTypes.STRING },
    summary: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT("long"), allowNull: false },
    technologies: { type: DataTypes.TEXT },
    features: { type: DataTypes.TEXT },
    liveUrl: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING },
    caseStudyUrl: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM("Published", "Draft"), defaultValue: "Published" },
  },
  { tableName: "projects" }
);

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    category: { type: DataTypes.STRING, allowNull: false, defaultValue: "Web Application" },
    label: { type: DataTypes.STRING, defaultValue: "Ready to Deploy" },
    summary: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT("long"), allowNull: false },
    price: { type: DataTypes.STRING, defaultValue: "Starting from ₹9,999" },
    technologies: { type: DataTypes.TEXT },
    features: { type: DataTypes.TEXT },
    screenshots: { type: DataTypes.TEXT },
    pricingPlans: { type: DataTypes.TEXT },
    overview: { type: DataTypes.TEXT },
    liveUrl: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM("Published", "Draft"), defaultValue: "Published" },
  },
  { tableName: "products" }
);

const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    orderNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    productId: { type: DataTypes.STRING, allowNull: false },
    productTitle: { type: DataTypes.STRING, allowNull: false },
    productSlug: { type: DataTypes.STRING },
    planName: { type: DataTypes.STRING, defaultValue: "Standard License" },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING, defaultValue: "INR" },
    customerName: { type: DataTypes.STRING, allowNull: false },
    customerEmail: { type: DataTypes.STRING, allowNull: false },
    customerPhone: { type: DataTypes.STRING, allowNull: false },
    companyName: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    paymentMethod: { type: DataTypes.STRING, defaultValue: "phonepe_upi" },
    paymentStatus: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "MANUAL_VERIFICATION", "FAILED", "CANCELLED"),
      defaultValue: "PENDING",
    },
    transactionId: { type: DataTypes.STRING },
    utrNumber: { type: DataTypes.STRING },
    gatewayResponse: { type: DataTypes.TEXT("long") },
    auditLog: { type: DataTypes.TEXT("long") },
    adminNotes: { type: DataTypes.TEXT },
  },
  { tableName: "orders" }
);

const PaymentSetting = sequelize.define(
  "PaymentSetting",
  {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: "default" },
    merchantId: { type: DataTypes.STRING, defaultValue: "DIGITALCROWDONLINE" },
    merchantName: { type: DataTypes.STRING, defaultValue: "Digital Crowd Technologies" },
    merchantUpiId: { type: DataTypes.STRING, defaultValue: "9985960692@ybl" },
    saltKey: { type: DataTypes.STRING, defaultValue: "" },
    saltIndex: { type: DataTypes.STRING, defaultValue: "1" },
    sandboxMode: { type: DataTypes.BOOLEAN, defaultValue: true },
    qrImageUrl: { type: DataTypes.STRING, defaultValue: "/payment/phonepe-business-qr.png" },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    businessPhone: { type: DataTypes.STRING, defaultValue: "+91 9985960692" },
    businessEmail: { type: DataTypes.STRING, defaultValue: "support@digitalcrowdtech.in" },
  },
  { tableName: "payment_settings" }
);

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
    status: { type: DataTypes.ENUM("Active", "Inactive"), defaultValue: "Active" },
  },
  { tableName: "users" }
);

const Query = sequelize.define(
  "Query",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    businessName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    service: { type: DataTypes.STRING, allowNull: false, defaultValue: "Business Website" },
    budget: { type: DataTypes.STRING },
    subject: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    source: { type: DataTypes.STRING, defaultValue: "Website" },
    status: {
      type: DataTypes.ENUM("New", "Contacted", "In Progress", "Converted"),
      defaultValue: "New",
    },
    mailStatus: {
      type: DataTypes.ENUM("Pending", "Sent", "Failed", "Disabled"),
      defaultValue: "Pending",
    },
    mailError: { type: DataTypes.STRING },
  },
  { tableName: "queries" }
);

// Auth Middleware
const requireAdmin = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";

  if (!token) {
    return res.status(401).json({ ok: false, message: "Unauthorized: Missing access token." });
  }

  // Backward compatibility with legacy ADMIN_TOKEN
  if (token === ADMIN_TOKEN && ADMIN_TOKEN.length > 10) {
    req.user = { email: ADMIN_EMAIL, role: "admin" };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ ok: false, message: "Forbidden: Admin privileges required." });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: "Invalid or expired session. Please log in again." });
  }
};

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASS ||
    SMTP_PASS === "your_hosting_mail_password_here"
  ) {
    const error = new Error("SMTP is not configured");
    error.code = "SMTP_NOT_CONFIGURED";
    throw error;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

const isMailConfigured = () =>
  Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_PASS !== "your_hosting_mail_password_here"
  );

const toPlainItems = (items) => items.map((item) => item.get({ plain: true }));

// Database Initialization & Seeding
const ensureDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await connection.end();
  } catch (err) {
    console.warn("Database create notice:", err.message);
  }
};

const seedDatabase = async () => {
  try {
    const adminUser = await User.findOne({ where: { email: ADMIN_EMAIL } });
    const adminPasswordHash = await hashPassword(ADMIN_PASSWORD);

    if (!adminUser) {
      await User.create({
        id: createId("user"),
        email: ADMIN_EMAIL,
        passwordHash: adminPasswordHash,
        role: "admin",
        status: "Active",
      });
      console.log("Created default admin user.");
    } else if (!adminUser.passwordHash.startsWith("$2")) {
      await adminUser.update({ passwordHash: adminPasswordHash });
      console.log("Upgraded admin password to bcrypt hash.");
    }

    // Seed Projects if empty
    const projectCount = await Project.count();
    if (projectCount === 0) {
      await Project.bulkCreate(defaultProjects);
      console.log("Seeded default projects successfully.");
    }

    // Seed Blogs if empty
    const blogCount = await Blog.count();
    if (blogCount === 0) {
      await Blog.bulkCreate(defaultBlogs);
      console.log(`Seeded ${defaultBlogs.length} articles into database.`);
    }

    // Seed Careers if empty
    const careerCount = await Career.count();
    if (careerCount === 0) {
      await Career.bulkCreate(defaultCareers);
      console.log("Seeded default careers.");
    }

    // Seed/Sync Products
    for (const p of defaultProducts) {
      try {
        let existing = await Product.findByPk(p.id);
        if (!existing && p.slug) {
          existing = await Product.findOne({ where: { slug: p.slug } });
        }
        if (!existing) {
          await Product.create(p);
        } else {
          await existing.update(p);
        }
      } catch (prodErr) {
        console.warn(`Could not sync product ${p.slug || p.id}:`, prodErr.message);
      }
    }
    console.log(`Synchronized ${defaultProducts.length} digital products into database.`);

    // Seed default Payment Settings if empty
    const existingPaymentSetting = await PaymentSetting.findByPk("default");
    if (!existingPaymentSetting) {
      await PaymentSetting.create({
        id: "default",
        merchantId: "DIGITALCROWDONLINE",
        merchantName: "Digital Crowd Technologies",
        merchantUpiId: "9985960692@ybl",
        saltKey: "",
        saltIndex: "1",
        sandboxMode: true,
        qrImageUrl: "/payment/phonepe-business-qr.png",
        isActive: true,
        businessPhone: "+91 9985960692",
        businessEmail: "support@digitalcrowdtech.in",
      });
      console.log("Initialized default PhonePe Business payment settings.");
    }
  } catch (err) {
    console.warn("Seeding warning:", err.message);
  }
};

// ==========================================
// ROUTES
// ==========================================

// Health Check
app.get("/health", async (req, res) => {
  let database = false;
  try {
    await sequelize.authenticate();
    database = true;
  } catch {
    database = false;
  }

  res.json({
    ok: true,
    service: "digitalcrowdtech-backend",
    database,
    databaseName: DB_NAME,
    mailConfigured: isMailConfigured(),
    adminApi: true,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", async (req, res) => {
  let database = false;
  let dbError = null;
  try {
    await sequelize.authenticate();
    database = true;
  } catch (err) {
    database = false;
    dbError = err.message;
  }

  res.json({
    ok: true,
    service: "digitalcrowdtech-backend",
    database,
    databaseName: DB_NAME,
    databaseError: dbError,
    mailConfigured: isMailConfigured(),
    adminApi: true,
    timestamp: new Date().toISOString(),
  });
});

// Admin Authentication with Bcrypt & JWT
app.post("/api/admin/login", authLimiter, async (req, res) => {
  const email = sanitize(req.body.email).toLowerCase();
  const password = String(req.body.password || "");

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "Email and password are required." });
  }

  try {
    let user = null;
    try {
      user = await User.findOne({ where: { email, role: "admin", status: "Active" } });
    } catch (dbErr) {
      console.warn("User DB lookup notice (fallback to bootstrap credentials):", dbErr.message);
    }

    let isPasswordValid = false;
    if (user && user.passwordHash) {
      try {
        isPasswordValid = await verifyPassword(password, user.passwordHash);
      } catch (passErr) {
        console.warn("Password verification notice:", passErr.message);
      }
    }

    // Fallback bootstrap credentials check (always succeeds even if MySQL is temporarily offline)
    if (!isPasswordValid && email === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      return res.status(401).json({ ok: false, message: "Invalid admin email or password." });
    }

    // Upgrade legacy hash to bcrypt on successful login if needed
    if (user && user.passwordHash && !user.passwordHash.startsWith("$2")) {
      try {
        const upgradedHash = await hashPassword(password);
        await user.update({ passwordHash: upgradedHash });
      } catch (upgradeErr) {
        console.warn("Could not upgrade password hash:", upgradeErr.message);
      }
    }

    const token = jwt.sign(
      {
        id: user ? user.id : "admin-root",
        email: user ? user.email : ADMIN_EMAIL,
        role: "admin",
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      ok: true,
      token,
      admin: { email: user ? user.email : ADMIN_EMAIL, role: "admin" },
    });
  } catch (err) {
    console.error("Admin login error:", err.message);
    return res.status(500).json({ ok: false, message: "Authentication service error: " + err.message });
  }
});

app.get("/api/admin/me", requireAdmin, async (req, res) => {
  res.json({ ok: true, admin: { email: req.user.email, role: req.user.role } });
});

// ==========================================
// INQUIRY MANAGEMENT (QUERIES)
// ==========================================

// Public Contact Form Submission with Rate Limiting (Unified for Website & Portfolio)
app.post("/api/contact", contactLimiter, async (req, res) => {
  const rawName = req.body.name || req.body.fullName;
  const rawBusiness = req.body.businessName || req.body.company;
  const rawService = req.body.service || req.body.projectType || "Business Website";
  const rawSource = req.body.source || (req.body.projectType || req.body.fullName ? "Portfolio" : "Website");

  const payload = {
    name: sanitize(rawName),
    businessName: sanitize(rawBusiness),
    email: sanitize(req.body.email),
    phone: sanitize(req.body.phone),
    service: sanitize(rawService),
    budget: sanitize(req.body.budget) || "Under ₹10,000",
    subject: sanitize(req.body.subject) || `Inquiry from ${sanitize(rawName)}`,
    message: sanitize(req.body.message),
    source: sanitize(rawSource) || "Website",
  };

  if (!payload.name) {
    return res.status(400).json({ ok: false, message: "Please enter your name." });
  }
  if (!payload.email || !isValidEmail(payload.email)) {
    return res.status(400).json({ ok: false, message: "Please enter a valid email address." });
  }
  if (!payload.phone || payload.phone.length < 8) {
    return res.status(400).json({ ok: false, message: "Please enter a valid phone number." });
  }
  if (!payload.message || payload.message.length < 10) {
    return res.status(400).json({ ok: false, message: "Please provide a message with at least 10 characters." });
  }

  let queryId = createId("query");

  try {
    const query = await Query.create({
      id: queryId,
      ...payload,
      status: "New",
      mailStatus: "Pending",
    });
    queryId = query.id;
  } catch (dbErr) {
    console.error("Database save query error:", dbErr.message);
  }

  // Attempt Email Dispatch
  let mailSent = false;
  if (isMailConfigured()) {
    try {
      const transporter = createTransporter();
      const submittedAt = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

      await transporter.sendMail({
        from: `"DigitalCrowdTech" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: SUPPORT_EMAIL,
        replyTo: payload.email,
        subject: `[${payload.source}] New Project Inquiry: ${payload.service} - ${payload.name}`,
        text: [
          `New Project Inquiry received from ${payload.source}:`,
          "",
          `Source: ${payload.source}`,
          `Name: ${payload.name}`,
          `Business/Company: ${payload.businessName || "Not provided"}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Service/Project: ${payload.service}`,
          `Estimated Budget: ${payload.budget}`,
          `Submitted At: ${submittedAt}`,
          "",
          "Project Description:",
          payload.message,
        ].join("\n"),
        html: `
          <h2>New Project Inquiry (${escapeHtml(payload.source)})</h2>
          <p><strong>Source:</strong> <span style="background:#0050B0;color:#fff;padding:2px 8px;border-radius:4px;">${escapeHtml(payload.source)}</span></p>
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Business / Company:</strong> ${escapeHtml(payload.businessName || "Not provided")}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${escapeHtml(payload.phone)}">${escapeHtml(payload.phone)}</a></p>
          <p><strong>Service / Project:</strong> ${escapeHtml(payload.service)}</p>
          <p><strong>Estimated Budget:</strong> ${escapeHtml(payload.budget)}</p>
          <p><strong>Submitted:</strong> ${submittedAt}</p>
          <hr />
          <p><strong>Project Description:</strong></p>
          <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
        `,
      });
      mailSent = true;
      await Query.update({ mailStatus: "Sent", mailError: null }, { where: { id: queryId } }).catch(() => {});
    } catch (mailErr) {
      console.error("Mail dispatch error:", mailErr.message);
      await Query.update({ mailStatus: "Failed", mailError: mailErr.message }, { where: { id: queryId } }).catch(() => {});
    }
  }

  return res.json({
    ok: true,
    saved: true,
    mailSent,
    queryId,
    message: "Thank you! Your enquiry has been received. We'll get back to you within one business day.",
  });
});

// Admin: View & Filter Queries
app.get("/api/admin/queries", requireAdmin, async (req, res) => {
  try {
    const { status, search, source } = req.query;
    const where = {};

    if (status && ["New", "Contacted", "In Progress", "Converted"].includes(status)) {
      where.status = status;
    }

    if (source && source !== "All") {
      where.source = source;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { businessName: { [Op.like]: `%${search}%` } },
        { service: { [Op.like]: `%${search}%` } },
        { source: { [Op.like]: `%${search}%` } },
      ];
    }

    const queries = await Query.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    return res.json({ ok: true, items: toPlainItems(queries) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Update Query Status
app.patch("/api/admin/queries/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["New", "Contacted", "In Progress", "Converted"].includes(status)) {
      return res.status(400).json({ ok: false, message: "Invalid status value." });
    }

    const query = await Query.findByPk(req.params.id);
    if (!query) {
      return res.status(404).json({ ok: false, message: "Enquiry record not found." });
    }

    await query.update({ status });
    return res.json({ ok: true, item: query.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Delete Query
app.delete("/api/admin/queries/:id", requireAdmin, async (req, res) => {
  try {
    const deletedCount = await Query.destroy({ where: { id: req.params.id } });
    if (!deletedCount) {
      return res.status(404).json({ ok: false, message: "Enquiry not found." });
    }
    return res.json({ ok: true, message: "Enquiry deleted successfully." });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// ==========================================
// BLOGS CRUD
// ==========================================

// Public Blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { status: "Published" },
      order: [["date", "DESC"], ["createdAt", "DESC"]],
    });
    return res.json({ ok: true, items: toPlainItems(blogs) });
  } catch {
    return res.json({ ok: true, items: defaultBlogs });
  }
});

// Public Single Blog by Slug or ID
app.get("/api/blogs/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    let blog = await Blog.findOne({
      where: { slug, status: "Published" },
    });
    if (!blog) {
      blog = await Blog.findOne({
        where: { id: slug, status: "Published" },
      });
    }
    if (blog) {
      return res.json({ ok: true, item: blog.get({ plain: true }) });
    }
    const fallback = defaultBlogs.find((b) => b.slug === slug || b.id === slug);
    if (fallback) {
      return res.json({ ok: true, item: fallback });
    }
    return res.status(404).json({ ok: false, message: "Blog not found" });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin Blogs List
app.get("/api/admin/blogs", requireAdmin, async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [["date", "DESC"]] });
    return res.json({ ok: true, items: toPlainItems(blogs) });
  } catch {
    return res.json({ ok: true, items: defaultBlogs });
  }
});

// Admin Create Blog
app.post("/api/admin/blogs", requireAdmin, async (req, res) => {
  try {
    const payload = {
      title: sanitize(req.body.title),
      slug: sanitize(req.body.slug) || sanitize(req.body.title).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: sanitize(req.body.category) || "Web Development",
      date: sanitize(req.body.date) || new Date().toISOString().split("T")[0],
      readTime: sanitize(req.body.readTime) || "5 min read",
      excerpt: sanitize(req.body.excerpt),
      content: sanitize(req.body.content),
      status: sanitize(req.body.status) || "Published",
    };

    if (!payload.title || !payload.excerpt || !payload.content) {
      return res.status(400).json({ ok: false, message: "Title, excerpt, and content are required." });
    }

    const blog = await Blog.create({ id: createId("blog"), ...payload });
    return res.status(201).json({ ok: true, item: blog.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin Update Blog
app.put("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ ok: false, message: "Blog not found." });
    }

    const payload = {
      title: sanitize(req.body.title) || blog.title,
      slug: sanitize(req.body.slug) || blog.slug,
      category: sanitize(req.body.category) || blog.category,
      date: sanitize(req.body.date) || blog.date,
      readTime: sanitize(req.body.readTime) || blog.readTime,
      excerpt: sanitize(req.body.excerpt) || blog.excerpt,
      content: sanitize(req.body.content) || blog.content,
      status: sanitize(req.body.status) || blog.status,
    };

    await blog.update(payload);
    return res.json({ ok: true, item: blog.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin Delete Blog
app.delete("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Blog.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Blog not found." });
    }
    return res.json({ ok: true, message: "Blog deleted successfully." });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// ==========================================
// CAREERS CRUD
// ==========================================

// Public Careers
app.get("/api/careers", async (req, res) => {
  try {
    const careers = await Career.findAll({
      where: { status: "Open" },
      order: [["createdAt", "DESC"]],
    });
    return res.json({ ok: true, items: toPlainItems(careers) });
  } catch {
    return res.json({ ok: true, items: defaultCareers });
  }
});

// Admin Careers List
app.get("/api/admin/careers", requireAdmin, async (req, res) => {
  try {
    const careers = await Career.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ ok: true, items: toPlainItems(careers) });
  } catch {
    return res.json({ ok: true, items: defaultCareers });
  }
});

// Admin Create Career
app.post("/api/admin/careers", requireAdmin, async (req, res) => {
  try {
    const payload = {
      title: sanitize(req.body.title),
      type: sanitize(req.body.type) || "Full Time",
      location: sanitize(req.body.location) || "Hyderabad",
      experience: sanitize(req.body.experience) || "1-3 Years",
      description: sanitize(req.body.description),
      status: sanitize(req.body.status) || "Open",
    };

    if (!payload.title || !payload.description) {
      return res.status(400).json({ ok: false, message: "Title and description are required." });
    }

    const career = await Career.create({ id: createId("career"), ...payload });
    return res.status(201).json({ ok: true, item: career.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin Update Career
app.put("/api/admin/careers/:id", requireAdmin, async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) {
      return res.status(404).json({ ok: false, message: "Career not found." });
    }

    const payload = {
      title: sanitize(req.body.title) || career.title,
      type: sanitize(req.body.type) || career.type,
      location: sanitize(req.body.location) || career.location,
      experience: sanitize(req.body.experience) || career.experience,
      description: sanitize(req.body.description) || career.description,
      status: sanitize(req.body.status) || career.status,
    };

    await career.update(payload);
    return res.json({ ok: true, item: career.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin Delete Career
app.delete("/api/admin/careers/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Career.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Career not found." });
    }
    return res.json({ ok: true, message: "Career deleted successfully." });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// ==========================================
// PROJECTS CRUD & UPLOADS
// ==========================================

// File Upload Endpoint
app.post("/api/admin/upload", requireAdmin, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ ok: false, message: "No image file provided." });
    }
    const relativeUrl = `/uploads/${req.file.filename}`;
    return res.json({ ok: true, url: relativeUrl, filename: req.file.filename });
  });
});

// Public Projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { status: "Published" },
      order: [
        [
          Sequelize.literal(
            "CASE WHEN liveUrl IS NOT NULL AND TRIM(liveUrl) != '' AND TRIM(liveUrl) != '/' THEN 0 ELSE 1 END"
          ),
          "ASC",
        ],
        ["createdAt", "DESC"],
      ],
    });
    return res.json({ ok: true, items: toPlainItems(projects) });
  } catch {
    const sorted = [...defaultProjects].sort((a, b) => {
      const aLive = a.liveUrl && String(a.liveUrl).trim() !== "" && a.liveUrl !== "/" ? 0 : 1;
      const bLive = b.liveUrl && String(b.liveUrl).trim() !== "" && b.liveUrl !== "/" ? 0 : 1;
      return aLive - bLive;
    });
    return res.json({ ok: true, items: sorted });
  }
});

// Admin: Projects List
app.get("/api/admin/projects", requireAdmin, async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ ok: true, items: toPlainItems(projects) });
  } catch {
    return res.json({ ok: true, items: defaultProjects });
  }
});

// Admin: Create Project
app.post("/api/admin/projects", requireAdmin, async (req, res) => {
  try {
    const payload = {
      title: sanitize(req.body.title),
      slug: sanitize(req.body.slug) || sanitize(req.body.title).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      client: sanitize(req.body.client),
      category: sanitize(req.body.category),
      isInternal: Boolean(req.body.isInternal),
      label: sanitize(req.body.label),
      summary: sanitize(req.body.summary),
      description: sanitize(req.body.description),
      technologies: typeof req.body.technologies === "string" ? req.body.technologies : JSON.stringify(req.body.technologies || []),
      features: typeof req.body.features === "string" ? req.body.features : JSON.stringify(req.body.features || []),
      liveUrl: sanitize(req.body.liveUrl),
      imageUrl: sanitize(req.body.imageUrl),
      caseStudyUrl: sanitize(req.body.caseStudyUrl),
      status: sanitize(req.body.status) || "Published",
    };

    if (!payload.title || !payload.summary) {
      return res.status(400).json({ ok: false, message: "Title and summary are required." });
    }

    const project = await Project.create({ id: createId("proj"), ...payload });
    return res.status(201).json({ ok: true, item: project.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Update Project
app.put("/api/admin/projects/:id", requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ ok: false, message: "Project not found." });
    }

    const payload = {
      title: sanitize(req.body.title) || project.title,
      slug: sanitize(req.body.slug) || project.slug,
      client: sanitize(req.body.client) !== undefined ? sanitize(req.body.client) : project.client,
      category: sanitize(req.body.category) || project.category,
      isInternal: req.body.isInternal !== undefined ? Boolean(req.body.isInternal) : project.isInternal,
      label: sanitize(req.body.label) !== undefined ? sanitize(req.body.label) : project.label,
      summary: sanitize(req.body.summary) || project.summary,
      description: sanitize(req.body.description) || project.description,
      technologies: typeof req.body.technologies === "string" ? req.body.technologies : JSON.stringify(req.body.technologies || []),
      features: typeof req.body.features === "string" ? req.body.features : JSON.stringify(req.body.features || []),
      liveUrl: sanitize(req.body.liveUrl) !== undefined ? sanitize(req.body.liveUrl) : project.liveUrl,
      imageUrl: sanitize(req.body.imageUrl) !== undefined ? sanitize(req.body.imageUrl) : project.imageUrl,
      caseStudyUrl: sanitize(req.body.caseStudyUrl) !== undefined ? sanitize(req.body.caseStudyUrl) : project.caseStudyUrl,
      status: sanitize(req.body.status) || project.status,
    };

    await project.update(payload);
    return res.json({ ok: true, item: project.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Delete Project
app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
  try {
    const deletedCount = await Project.destroy({ where: { id: req.params.id } });
    if (!deletedCount) {
      return res.status(404).json({ ok: false, message: "Project not found." });
    }
    return res.json({ ok: true, message: "Project deleted successfully." });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// ==========================================
// PRODUCTS CRUD & DETAIL ENDPOINTS
// ==========================================

// Public Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { status: "Published" },
      order: [["createdAt", "ASC"]],
    });
    return res.json({ ok: true, items: toPlainItems(products) });
  } catch {
    return res.json({ ok: true, items: defaultProducts });
  }
});

const BACKEND_SLUG_ALIASES = {
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

// Public: Single Product by Slug or ID
app.get("/api/products/:slugOrId", async (req, res) => {
  try {
    const rawParam = decodeURIComponent(req.params.slugOrId || "").trim().toLowerCase();
    const resolvedSlug = BACKEND_SLUG_ALIASES[rawParam] || rawParam;

    let product = await Product.findOne({
      where: {
        [Op.or]: [
          { slug: rawParam },
          { id: rawParam },
          { slug: resolvedSlug },
          { id: resolvedSlug },
        ],
        status: "Published",
      },
    });

    if (!product) {
      const fallback =
        defaultProducts.find(
          (p) =>
            p.slug === rawParam ||
            p.id === rawParam ||
            p.slug === resolvedSlug ||
            p.id === resolvedSlug
        );
      if (fallback) {
        return res.json({ ok: true, product: fallback, item: fallback });
      }
      return res.status(404).json({ ok: false, message: "Product not found." });
    }

    const plain = product.get({ plain: true });
    return res.json({ ok: true, product: plain, item: plain });
  } catch (err) {
    const rawParam = decodeURIComponent(req.params.slugOrId || "").trim().toLowerCase();
    const resolvedSlug = BACKEND_SLUG_ALIASES[rawParam] || rawParam;
    const fallback =
      defaultProducts.find(
        (p) =>
          p.slug === rawParam ||
          p.id === rawParam ||
          p.slug === resolvedSlug ||
          p.id === resolvedSlug
      );
    if (fallback) {
      return res.json({ ok: true, product: fallback, item: fallback });
    }
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// ==========================================
// ORDERS & PHONEPE BUSINESS PURCHASE SYSTEM
// ==========================================

// Public: Get Safe Payment Settings
app.get("/api/settings/payment", async (req, res) => {
  try {
    let settings = await PaymentSetting.findByPk("default");
    if (!settings) {
      settings = await PaymentSetting.create({ id: "default" });
    }
    return res.json({
      ok: true,
      settings: {
        merchantName: settings.merchantName || "Digital Crowd Technologies",
        merchantUpiId: settings.merchantUpiId || "9985960692@ybl",
        qrImageUrl: settings.qrImageUrl || "/payment/phonepe-business-qr.png",
        sandboxMode: Boolean(settings.sandboxMode),
        isActive: Boolean(settings.isActive),
        businessPhone: settings.businessPhone || "+91 9985960692",
        businessEmail: settings.businessEmail || "support@digitalcrowdtech.in",
      },
    });
  } catch (err) {
    return res.json({
      ok: true,
      settings: {
        merchantName: "Digital Crowd Technologies",
        merchantUpiId: "9985960692@ybl",
        qrImageUrl: "/payment/phonepe-business-qr.png",
        sandboxMode: true,
        isActive: true,
        businessPhone: "+91 9985960692",
        businessEmail: "support@digitalcrowdtech.in",
      },
    });
  }
});

// Public: Create Product Purchase Order
app.post("/api/orders/create", async (req, res) => {
  try {
    const {
      productId,
      planName = "Standard License",
      customerName,
      customerEmail,
      customerPhone,
      companyName = "",
      address = "",
      paymentMethod = "phonepe_upi",
    } = req.body;

    // Strict Validation
    if (!customerName || !customerEmail || !customerPhone || !productId) {
      return res.status(400).json({
        ok: false,
        message: "Customer name, valid email, phone number, and product selection are required.",
      });
    }

    if (!isValidEmail(customerEmail)) {
      return res.status(400).json({ ok: false, message: "Please provide a valid email address." });
    }

    const cleanPhone = String(customerPhone).replace(/[^0-9+]/g, "");
    if (cleanPhone.length < 10) {
      return res.status(400).json({ ok: false, message: "Please provide a valid 10-digit phone number." });
    }

    // Lookup Product in DB or defaultProducts
    const resolvedProductId = BACKEND_SLUG_ALIASES[productId] || productId;
    let product = await Product.findOne({
      where: {
        [Op.or]: [
          { id: productId },
          { slug: productId },
          { id: resolvedProductId },
          { slug: resolvedProductId },
        ],
      },
    });

    let productData = product
      ? product.get({ plain: true })
      : defaultProducts.find(
          (p) =>
            p.id === productId ||
            p.slug === productId ||
            p.id === resolvedProductId ||
            p.slug === resolvedProductId
        );

    if (!productData) {
      return res.status(404).json({ ok: false, message: "Selected product does not exist." });
    }

    // Determine configured pricing plan
    let chosenAmount = 9999;
    let plans = [];
    try {
      plans = typeof productData.pricingPlans === "string" ? JSON.parse(productData.pricingPlans) : productData.pricingPlans || [];
    } catch {}

    const selectedPlan = plans.find((pl) => pl.name?.toLowerCase() === planName?.toLowerCase()) || plans[0];
    if (selectedPlan && selectedPlan.numericPrice) {
      chosenAmount = Number(selectedPlan.numericPrice);
    } else {
      const parsedPrice = parseInt(String(productData.price).replace(/[^0-9]/g, ""), 10);
      if (!isNaN(parsedPrice) && parsedPrice > 0) {
        chosenAmount = parsedPrice;
      }
    }

    const timestamp = Date.now();
    const orderNumber = `DCT-ORD-${timestamp.toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderId = createId("order");

    let paymentSettings = await PaymentSetting.findByPk("default");
    const merchantUpi = paymentSettings?.merchantUpiId || "9985960692@ybl";
    const merchantName = paymentSettings?.merchantName || "Digital Crowd Technologies";

    // Encode Standard UPI Intent String
    const upiUri = `upi://pay?pa=${encodeURIComponent(merchantUpi)}&pn=${encodeURIComponent(
      merchantName
    )}&tr=${encodeURIComponent(orderNumber)}&am=${chosenAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
      `Order ${orderNumber} - ${productData.title.slice(0, 30)}`
    )}`;

    const initialAudit = [
      {
        timestamp: new Date().toISOString(),
        action: "ORDER_CREATED",
        amount: chosenAmount,
        customerEmail: sanitize(customerEmail),
        status: "PENDING",
      },
    ];

    const order = await Order.create({
      id: orderId,
      orderNumber,
      productId: productData.id,
      productTitle: productData.title,
      productSlug: productData.slug,
      planName: selectedPlan ? selectedPlan.name : planName,
      amount: chosenAmount,
      currency: "INR",
      customerName: sanitize(customerName),
      customerEmail: sanitize(customerEmail),
      customerPhone: sanitize(customerPhone),
      companyName: sanitize(companyName),
      address: sanitize(address),
      paymentMethod: sanitize(paymentMethod),
      paymentStatus: "PENDING",
      auditLog: JSON.stringify(initialAudit),
    });

    return res.status(201).json({
      ok: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        productId: order.productId,
        productTitle: order.productTitle,
        productSlug: order.productSlug,
        planName: order.planName,
        amount: Number(order.amount),
        currency: order.currency,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        companyName: order.companyName,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
      },
      payment: {
        method: "phonepe_upi",
        merchantUpiId: merchantUpi,
        merchantName,
        payableAmount: chosenAmount,
        upiUri,
        qrImageUrl: paymentSettings?.qrImageUrl || "/payment/phonepe-business-qr.png",
        sandbox: Boolean(paymentSettings?.sandboxMode),
      },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Public: Submit Payment UTR / Transaction Reference for Verification
app.post("/api/orders/verify-payment", async (req, res) => {
  try {
    const { orderId, orderNumber, utrNumber, transactionId, paymentNotes = "" } = req.body;

    if (!orderId && !orderNumber) {
      return res.status(400).json({ ok: false, message: "Order ID or order number is required." });
    }

    const order = await Order.findOne({
      where: {
        [Op.or]: [
          ...(orderId ? [{ id: orderId }] : []),
          ...(orderNumber ? [{ orderNumber: orderNumber }] : []),
        ],
      },
    });

    if (!order) {
      return res.status(404).json({ ok: false, message: "Order not found in database." });
    }

    const cleanUtr = sanitize(utrNumber || transactionId);
    if (!cleanUtr || cleanUtr.length < 6) {
      return res.status(400).json({
        ok: false,
        message: "Please enter a valid 12-digit UPI UTR number or PhonePe Transaction ID.",
      });
    }

    let audit = [];
    try {
      audit = JSON.parse(order.auditLog || "[]");
    } catch {}

    const newStatus = "MANUAL_VERIFICATION"; // Security Rule: Never auto-mark completed merely on customer input without bank check

    audit.push({
      timestamp: new Date().toISOString(),
      action: "UTR_SUBMITTED",
      utr: cleanUtr,
      notes: sanitize(paymentNotes),
      status: newStatus,
    });

    await order.update({
      utrNumber: cleanUtr,
      transactionId: sanitize(transactionId) || cleanUtr,
      paymentStatus: newStatus,
      auditLog: JSON.stringify(audit),
      adminNotes: order.adminNotes ? `${order.adminNotes} | UTR Submitted: ${cleanUtr}` : `UTR Submitted: ${cleanUtr}`,
    });

    // Notify Support Team via Email asynchronously
    if (isMailConfigured()) {
      try {
        const transporter = createTransporter();
        transporter.sendMail({
          from: `"Digital Crowd Tech Orders" <${process.env.SMTP_USER}>`,
          to: `${SUPPORT_EMAIL}, ${ADMIN_EMAIL}`,
          subject: `🔔 New Order Payment Verification: ${order.orderNumber} (₹${order.amount})`,
          text: `A customer has submitted a PhonePe UPI payment reference for verification.

Order Number: ${order.orderNumber}
Product: ${order.productTitle} (${order.planName})
Amount: ₹${order.amount}
Customer Name: ${order.customerName}
Customer Email: ${order.customerEmail}
Customer Phone: ${order.customerPhone}
PhonePe UTR / Txn: ${cleanUtr}

Log into the admin portal to verify and mark complete: https://digitalcrowdtech.in/admin/orders`,
        }).catch((err) => console.warn("Order email notification warning:", err.message));
      } catch (mailErr) {
        console.warn("Mail transport warning:", mailErr.message);
      }
    }

    return res.json({
      ok: true,
      message: "Payment reference submitted successfully. Our accounts team is verifying your payment.",
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        productTitle: order.productTitle,
        planName: order.planName,
        amount: Number(order.amount),
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        paymentStatus: order.paymentStatus,
        utrNumber: order.utrNumber,
        updatedAt: order.updatedAt,
      },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Public: Get Order Status / Confirmation
app.get("/api/orders/:idOrNumber", async (req, res) => {
  try {
    const { idOrNumber } = req.params;
    const order = await Order.findOne({
      where: {
        [Op.or]: [{ id: idOrNumber }, { orderNumber: idOrNumber }],
      },
    });

    if (!order) {
      return res.status(404).json({ ok: false, message: "Order not found." });
    }

    return res.json({
      ok: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        productId: order.productId,
        productTitle: order.productTitle,
        productSlug: order.productSlug,
        planName: order.planName,
        amount: Number(order.amount),
        currency: order.currency,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        companyName: order.companyName,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        utrNumber: order.utrNumber,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Public: PhonePe Official Server-to-Server Webhook / Callback Handler
app.post("/api/payment/phonepe/callback", async (req, res) => {
  try {
    const rawBody = req.body;
    const xVerify = req.headers["x-verify"];

    // Log incoming webhook securely
    console.log("PhonePe Webhook Event Received:", { hasVerify: Boolean(xVerify) });

    let settings = await PaymentSetting.findByPk("default");
    const saltKey = settings?.saltKey || "";
    const saltIndex = settings?.saltIndex || "1";

    if (rawBody && rawBody.response) {
      const decodedStr = Buffer.from(rawBody.response, "base64").toString("utf-8");
      const data = JSON.parse(decodedStr);

      if (data && data.data && data.data.merchantTransactionId) {
        const orderNumber = data.data.merchantTransactionId;
        const order = await Order.findOne({ where: { orderNumber } });

        if (order) {
          const success = data.code === "PAYMENT_SUCCESS";
          const newStatus = success ? "COMPLETED" : "FAILED";

          let audit = [];
          try {
            audit = JSON.parse(order.auditLog || "[]");
          } catch {}

          audit.push({
            timestamp: new Date().toISOString(),
            action: "PHONEPE_WEBHOOK_RECEIVED",
            code: data.code,
            status: newStatus,
            transactionId: data.data.transactionId,
          });

          await order.update({
            paymentStatus: newStatus,
            transactionId: data.data.transactionId || order.transactionId,
            gatewayResponse: decodedStr,
            auditLog: JSON.stringify(audit),
          });
        }
      }
    }

    return res.status(200).json({ ok: true, status: "CALLBACK_PROCESSED" });
  } catch (err) {
    console.error("PhonePe callback handling error:", err.message);
    return res.status(200).json({ ok: true }); // Always 200 to prevent webhook retries on parse issues
  }
});

// Admin: List All Orders
app.get("/api/admin/orders", requireAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};

    if (status && status !== "All") {
      where.paymentStatus = status;
    }

    if (search) {
      where[Op.or] = [
        { orderNumber: { [Op.like]: `%${search}%` } },
        { customerName: { [Op.like]: `%${search}%` } },
        { customerEmail: { [Op.like]: `%${search}%` } },
        { customerPhone: { [Op.like]: `%${search}%` } },
        { productTitle: { [Op.like]: `%${search}%` } },
        { utrNumber: { [Op.like]: `%${search}%` } },
      ];
    }

    const orders = await Order.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    return res.json({ ok: true, items: toPlainItems(orders) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Update Order Status & Notes
app.patch("/api/admin/orders/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ ok: false, message: "Order not found." });
    }

    const validStatuses = ["PENDING", "COMPLETED", "MANUAL_VERIFICATION", "FAILED", "CANCELLED"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ ok: false, message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
    }

    let audit = [];
    try {
      audit = JSON.parse(order.auditLog || "[]");
    } catch {}

    const oldStatus = order.paymentStatus;
    audit.push({
      timestamp: new Date().toISOString(),
      action: "ADMIN_STATUS_UPDATE",
      from: oldStatus,
      to: status || oldStatus,
      admin: req.user?.email || "admin",
      notes: sanitize(adminNotes || ""),
    });

    await order.update({
      ...(status ? { paymentStatus: status } : {}),
      ...(adminNotes !== undefined ? { adminNotes: sanitize(adminNotes) } : {}),
      auditLog: JSON.stringify(audit),
    });

    return res.json({ ok: true, item: order.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Get Payment Settings
app.get("/api/admin/settings/payment", requireAdmin, async (req, res) => {
  try {
    let settings = await PaymentSetting.findByPk("default");
    if (!settings) {
      settings = await PaymentSetting.create({ id: "default" });
    }
    return res.json({ ok: true, settings: settings.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Update Payment Settings
app.put("/api/admin/settings/payment", requireAdmin, async (req, res) => {
  try {
    let settings = await PaymentSetting.findByPk("default");
    if (!settings) {
      settings = await PaymentSetting.create({ id: "default" });
    }

    const payload = {
      merchantId: sanitize(req.body.merchantId) || settings.merchantId,
      merchantName: sanitize(req.body.merchantName) || settings.merchantName,
      merchantUpiId: sanitize(req.body.merchantUpiId) || settings.merchantUpiId,
      saltKey: sanitize(req.body.saltKey) !== undefined ? sanitize(req.body.saltKey) : settings.saltKey,
      saltIndex: sanitize(req.body.saltIndex) || settings.saltIndex,
      sandboxMode: req.body.sandboxMode !== undefined ? Boolean(req.body.sandboxMode) : settings.sandboxMode,
      qrImageUrl: sanitize(req.body.qrImageUrl) || settings.qrImageUrl,
      isActive: req.body.isActive !== undefined ? Boolean(req.body.isActive) : settings.isActive,
      businessPhone: sanitize(req.body.businessPhone) || settings.businessPhone,
      businessEmail: sanitize(req.body.businessEmail) || settings.businessEmail,
    };

    await settings.update(payload);
    return res.json({ ok: true, settings: settings.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Products List
app.get("/api/admin/products", requireAdmin, async (req, res) => {
  try {
    const products = await Product.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ ok: true, items: toPlainItems(products) });
  } catch {
    return res.json({ ok: true, items: defaultProducts });
  }
});

// Admin: Create Product
app.post("/api/admin/products", requireAdmin, async (req, res) => {
  try {
    const payload = {
      title: sanitize(req.body.title),
      slug: sanitize(req.body.slug) || sanitize(req.body.title).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: sanitize(req.body.category) || "Web Application",
      label: sanitize(req.body.label) || "Ready to Deploy",
      summary: sanitize(req.body.summary),
      description: sanitize(req.body.description),
      price: sanitize(req.body.price) || "Starting from ₹9,999",
      technologies: typeof req.body.technologies === "string" ? req.body.technologies : JSON.stringify(req.body.technologies || []),
      features: typeof req.body.features === "string" ? req.body.features : JSON.stringify(req.body.features || []),
      screenshots: typeof req.body.screenshots === "string" ? req.body.screenshots : JSON.stringify(req.body.screenshots || []),
      pricingPlans: typeof req.body.pricingPlans === "string" ? req.body.pricingPlans : JSON.stringify(req.body.pricingPlans || []),
      overview: typeof req.body.overview === "string" ? req.body.overview : JSON.stringify(req.body.overview || {}),
      liveUrl: sanitize(req.body.liveUrl),
      imageUrl: sanitize(req.body.imageUrl),
      status: sanitize(req.body.status) || "Published",
    };

    if (!payload.title || !payload.summary) {
      return res.status(400).json({ ok: false, message: "Title and summary are required." });
    }

    const product = await Product.create({ id: createId("prod"), ...payload });
    return res.status(201).json({ ok: true, item: product.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Update Product
app.put("/api/admin/products/:id", requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ ok: false, message: "Product not found." });
    }

    const payload = {
      title: sanitize(req.body.title) || product.title,
      slug: sanitize(req.body.slug) || product.slug,
      category: sanitize(req.body.category) || product.category,
      label: sanitize(req.body.label) !== undefined ? sanitize(req.body.label) : product.label,
      summary: sanitize(req.body.summary) || product.summary,
      description: sanitize(req.body.description) || product.description,
      price: sanitize(req.body.price) || product.price,
      technologies: typeof req.body.technologies === "string" ? req.body.technologies : JSON.stringify(req.body.technologies || []),
      features: typeof req.body.features === "string" ? req.body.features : JSON.stringify(req.body.features || []),
      screenshots: req.body.screenshots !== undefined ? (typeof req.body.screenshots === "string" ? req.body.screenshots : JSON.stringify(req.body.screenshots)) : product.screenshots,
      pricingPlans: req.body.pricingPlans !== undefined ? (typeof req.body.pricingPlans === "string" ? req.body.pricingPlans : JSON.stringify(req.body.pricingPlans)) : product.pricingPlans,
      overview: req.body.overview !== undefined ? (typeof req.body.overview === "string" ? req.body.overview : JSON.stringify(req.body.overview)) : product.overview,
      liveUrl: sanitize(req.body.liveUrl) !== undefined ? sanitize(req.body.liveUrl) : product.liveUrl,
      imageUrl: sanitize(req.body.imageUrl) !== undefined ? sanitize(req.body.imageUrl) : product.imageUrl,
      status: sanitize(req.body.status) || product.status,
    };

    await product.update(payload);
    return res.json({ ok: true, item: product.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Delete Product
app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
  try {
    const deletedCount = await Product.destroy({ where: { id: req.params.id } });
    if (!deletedCount) {
      return res.status(404).json({ ok: false, message: "Product not found." });
    }
    return res.json({ ok: true, message: "Product deleted successfully." });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Start Server
const server = http.createServer(app);

const startServer = async () => {
  await ensureDatabase();
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });
    // Ensure newly introduced schema columns exist safely
    await sequelize.query("ALTER TABLE `queries` ADD COLUMN `source` VARCHAR(255) DEFAULT 'Website';").catch(() => {});
    await sequelize.query("ALTER TABLE `products` ADD COLUMN `screenshots` TEXT;").catch(() => {});
    await sequelize.query("ALTER TABLE `products` ADD COLUMN `pricingPlans` TEXT;").catch(() => {});
    await sequelize.query("ALTER TABLE `products` ADD COLUMN `overview` TEXT;").catch(() => {});
    await seedDatabase();
    console.log(`Sequelize connected to MySQL (${DB_NAME})`);
  } catch (err) {
    console.warn("Database connection notice:", err.message);
  }

  server.listen(PORT, () => {
    console.log(`Digital Crowd Technologies Backend running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Backend initialization error:", err.message);
});
