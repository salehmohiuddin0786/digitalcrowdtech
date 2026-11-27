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
  timezone: "+05:30",
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
    originalAmount: { type: DataTypes.DECIMAL(10, 2) },
    discountAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
    couponCode: { type: DataTypes.STRING(100) },
    offerId: { type: DataTypes.STRING },
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
    merchantId: { type: DataTypes.STRING, defaultValue: "M23NO5H2OWJEL" },
    clientId: { type: DataTypes.STRING, defaultValue: "M23NO5H2OWJEL_2611271819" },
    clientSecret: { type: DataTypes.STRING, defaultValue: "Zjg3YTc3MjQtNmE1NS00OTUwLTgwNDgtNmZmMTIwYjliODU5" },
    clientVersion: { type: DataTypes.STRING, defaultValue: "1" },
    merchantName: { type: DataTypes.STRING, defaultValue: "Digital Crowd Technologies" },
    merchantUpiId: { type: DataTypes.STRING, defaultValue: "9985960692@ybl" },
    saltKey: { type: DataTypes.STRING, defaultValue: "f87a7724-6a55-4950-8048-6ff120b9b859" },
    saltIndex: { type: DataTypes.STRING, defaultValue: "1" },
    sandboxMode: { type: DataTypes.BOOLEAN, defaultValue: true },
    qrImageUrl: { type: DataTypes.STRING, defaultValue: "/payment/phonepe-business-qr.png" },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    businessPhone: { type: DataTypes.STRING, defaultValue: "+91 9985960692" },
    businessEmail: { type: DataTypes.STRING, defaultValue: "support@digitalcrowdtech.in" },
  },
  { tableName: "payment_settings" }
);

// OFFERS & COUPONS MODULE MODELS
const Offer = sequelize.define(
  "Offer",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    discountType: {
      type: DataTypes.ENUM("PERCENTAGE", "FIXED", "FREE_SERVICE"),
      allowNull: false,
      defaultValue: "PERCENTAGE",
    },
    discountValue: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.0 },
    maxDiscountAmount: { type: DataTypes.DECIMAL(10, 2) },
    minOrderValue: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
    isAutomatic: { type: DataTypes.BOOLEAN, defaultValue: false },
    customerEligibility: {
      type: DataTypes.ENUM("ALL", "NEW_CUSTOMERS", "EXISTING_CUSTOMERS"),
      defaultValue: "ALL",
    },
    firstOrderOnly: { type: DataTypes.BOOLEAN, defaultValue: false },
    totalUsageLimit: { type: DataTypes.INTEGER },
    perCustomerLimit: { type: DataTypes.INTEGER, defaultValue: 1 },
    usedCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    startDate: { type: DataTypes.DATE, allowNull: false },
    expiryDate: { type: DataTypes.DATE, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    bannerText: { type: DataTypes.STRING },
  },
  { tableName: "offers" }
);

const Coupon = sequelize.define(
  "Coupon",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    offerId: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    totalUsageLimit: { type: DataTypes.INTEGER },
    perCustomerLimit: { type: DataTypes.INTEGER },
    usedCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    expiryDate: { type: DataTypes.DATE },
  },
  { tableName: "coupons" }
);

const OfferServiceMapping = sequelize.define(
  "OfferServiceMapping",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    offerId: { type: DataTypes.STRING, allowNull: false },
    productId: { type: DataTypes.STRING, allowNull: false },
    productTitle: { type: DataTypes.STRING },
  },
  { tableName: "offer_service_mappings" }
);

const CouponRedemption = sequelize.define(
  "CouponRedemption",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    couponId: { type: DataTypes.STRING },
    offerId: { type: DataTypes.STRING, allowNull: false },
    orderId: { type: DataTypes.STRING, allowNull: false },
    orderNumber: { type: DataTypes.STRING, allowNull: false },
    customerEmail: { type: DataTypes.STRING, allowNull: false },
    customerPhone: { type: DataTypes.STRING, allowNull: false },
    originalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discountAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    finalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM("RESERVED", "COMPLETED", "FAILED", "RELEASED"),
      defaultValue: "RESERVED",
    },
    reservedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    completedAt: { type: DataTypes.DATE },
  },
  { tableName: "coupon_redemptions" }
);

const PaymentOfferDetail = sequelize.define(
  "PaymentOfferDetail",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    orderNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    offerId: { type: DataTypes.STRING },
    couponCode: { type: DataTypes.STRING(100) },
    discountType: { type: DataTypes.STRING, defaultValue: "PERCENTAGE" },
    discountValue: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
    originalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discountAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    finalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    phonepeTxnId: { type: DataTypes.STRING },
    settlementStatus: { type: DataTypes.STRING, defaultValue: "PENDING" },
    auditNotes: { type: DataTypes.TEXT },
  },
  { tableName: "payment_offer_details" }
);

// Establish Model Associations
Offer.hasMany(Coupon, { foreignKey: "offerId", as: "coupons", onDelete: "CASCADE" });
Coupon.belongsTo(Offer, { foreignKey: "offerId", as: "offer" });

Offer.hasMany(OfferServiceMapping, { foreignKey: "offerId", as: "serviceMappings", onDelete: "CASCADE" });
OfferServiceMapping.belongsTo(Offer, { foreignKey: "offerId", as: "offer" });

Offer.hasMany(CouponRedemption, { foreignKey: "offerId", as: "redemptions", onDelete: "CASCADE" });
CouponRedemption.belongsTo(Offer, { foreignKey: "offerId", as: "offer" });

Coupon.hasMany(CouponRedemption, { foreignKey: "couponId", as: "redemptions", onDelete: "SET NULL" });
CouponRedemption.belongsTo(Coupon, { foreignKey: "couponId", as: "coupon" });

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

// In-memory token cache for PhonePe V2 Standard Checkout
let phonePeTokenCache = { token: null, expiresAt: 0, clientId: null };

// Helper: Resolve PhonePe Gateway Configuration (V2 OAuth & V1 Checksum support)
function getPhonePeConfig(settings) {
  const isSandbox = settings ? Boolean(settings.sandboxMode) : true;
  const configuredMid = settings?.merchantId ? String(settings.merchantId).trim() : "";
  const configuredSalt = settings?.saltKey ? String(settings.saltKey).trim() : "";
  const saltIndex = settings?.saltIndex ? String(settings.saltIndex).trim() : "1";
  const clientId = settings?.clientId ? String(settings.clientId).trim() : "";
  const clientSecret = settings?.clientSecret ? String(settings.clientSecret).trim() : "";
  const clientVersion = settings?.clientVersion ? String(settings.clientVersion).trim() : "1";

  // Active Merchant ID and Salt Key (UUID)
  const mid = configuredMid || "M23NO5H2OWJEL";
  const saltKey = configuredSalt || "f87a7724-6a55-4950-8048-6ff120b9b859";

  const baseUrl = isSandbox
    ? "https://api-preprod.phonepe.com/apis/pg-sandbox"
    : "https://api.phonepe.com/apis/pg";

  const isV2 = Boolean(clientId && clientSecret);

  return { isSandbox, mid, saltKey, saltIndex, clientId, clientSecret, clientVersion, baseUrl, isV2 };
}

// Helper: Obtain OAuth 2.0 Bearer Token from PhonePe V2 Identity Manager
async function getPhonePeOAuthToken(config) {
  const now = Date.now();
  if (
    phonePeTokenCache.token &&
    phonePeTokenCache.clientId === config.clientId &&
    phonePeTokenCache.expiresAt > now + 60000
  ) {
    return phonePeTokenCache.token;
  }

  const bodyParams = new URLSearchParams();
  bodyParams.append("client_id", config.clientId);
  bodyParams.append("client_version", config.clientVersion || "1");
  bodyParams.append("client_secret", config.clientSecret);
  bodyParams.append("grant_type", "client_credentials");

  const oauthUrl = config.isSandbox
    ? "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token"
    : "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";

  const res = await fetch(oauthUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: bodyParams.toString(),
  });

  const rawText = await res.text();
  let data = null;
  try {
    data = JSON.parse(rawText);
  } catch {}

  if (!res.ok || !data?.access_token) {
    throw new Error(
      `PhonePe OAuth failed (${res.status}): ${data?.message || data?.code || rawText || "Invalid credentials"}`
    );
  }

  const expiresInMs = (Number(data.expires_in) || 3600) * 1000;
  phonePeTokenCache = {
    token: data.access_token,
    clientId: config.clientId,
    expiresAt: now + expiresInMs,
  };

  return data.access_token;
}

// Helper: Send Automated Order Success Email
function sendOrderSuccessEmail(order) {
  if (!isMailConfigured()) return;
  try {
    const transporter = createTransporter();
    transporter
      .sendMail({
        from: `"Digital Crowd Tech Orders" <${process.env.SMTP_USER}>`,
        to: order.customerEmail,
        cc: `${SUPPORT_EMAIL}, ${ADMIN_EMAIL}`,
        subject: `✅ Payment Verified & Order Confirmed: ${order.orderNumber}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
            <div style="background: #0B1220; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Digital Crowd Tech</h1>
              <p style="color: #10B981; margin: 8px 0 0 0; font-weight: bold; font-size: 14px;">✓ Payment Verified via PhonePe</p>
            </div>
            <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px; background: #ffffff;">
              <h2 style="color: #0A2540; margin-top: 0;">Order Confirmed!</h2>
              <p>Hi <strong>${escapeHtml(order.customerName)}</strong>,</p>
              <p>Your payment for <strong>${escapeHtml(order.productTitle)}</strong> (${escapeHtml(order.planName)}) has been verified automatically by PhonePe.</p>
              
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="margin: 4px 0;"><strong>Order Number:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${escapeHtml(order.orderNumber)}</code></p>
                <p style="margin: 4px 0;"><strong>PhonePe Transaction ID:</strong> ${escapeHtml(order.transactionId || "Verified")}</p>
                <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ₹${Number(order.amount).toLocaleString("en-IN")}</p>
                <p style="margin: 4px 0;"><strong>Payment Status:</strong> <span style="color: #10B981; font-weight: bold;">COMPLETED</span></p>
              </div>

              <p style="font-size: 14px; color: #475569;">Our engineering team at Madhapur, Hyderabad is now preparing your staging environment, deployment walkthrough, and full source code handover.</p>
              
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
                <p style="margin: 2px 0;">Digital Crowd Technologies • Madhapur, Hyderabad - 500081</p>
                <p style="margin: 2px 0;">Support: <a href="mailto:support@digitalcrowdtech.in" style="color: #2563eb;">support@digitalcrowdtech.in</a> | Phone: <a href="tel:+919985960692" style="color: #2563eb;">+91 9985960692</a></p>
              </div>
            </div>
          </div>
        `,
      })
      .catch((err) => console.warn("Order email send warning:", err.message));
  } catch (err) {
    console.warn("Mail transporter error:", err.message);
  }
}

// Helper: Call PhonePe Standard Checkout API (Supports V2 OAuth & V1 Fallback)
async function initiatePhonePePayPage({ order, amount, paymentSettings, req }) {
  const config = getPhonePeConfig(paymentSettings);
  const hostHeader = req.headers["x-forwarded-host"] || req.headers.host || "localhost:3000";
  const proto = req.headers["x-forwarded-proto"] || "http";
  const frontendUrl = `${proto}://${hostHeader.replace(":5001", ":3000")}`;
  const amountInPaise = Math.round(Number(amount) * 100);
  let lastError = null;

  // METHOD 1: PhonePe V2 Standard Checkout via OAuth (Primary when Client ID & Secret present)
  if (config.isV2) {
    try {
      const accessToken = await getPhonePeOAuthToken(config);
      const v2Payload = {
        merchantOrderId: order.orderNumber,
        amount: amountInPaise,
        expireAfter: 600, // Exactly 10 minutes session validity
        paymentFlow: {
          type: "PG_CHECKOUT",
          message: `Order ${order.orderNumber} - ${order.productTitle.slice(0, 30)}`,
          merchantUrls: {
            redirectUrl: `${frontendUrl}/order-confirmation?orderNumber=${encodeURIComponent(order.orderNumber)}`,
          },
        },
      };

      const v2Res = await fetch(`${config.baseUrl}/checkout/v2/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `O-Bearer ${accessToken}`,
          accept: "application/json",
        },
        body: JSON.stringify(v2Payload),
      });

      const v2Data = await v2Res.json();
      if (v2Res.ok && v2Data?.redirectUrl) {
        return {
          success: true,
          redirectUrl: v2Data.redirectUrl,
          phonepeTxnId: v2Data.orderId || null,
          merchantTransactionId: order.orderNumber,
          isSandbox: config.isSandbox,
          version: "v2",
        };
      } else {
        console.warn("PhonePe V2 Pay error, attempting fallback:", v2Data);
        lastError = v2Data?.message || v2Data?.code || "PhonePe V2 payment initiation rejected.";
      }
    } catch (v2Err) {
      console.warn("PhonePe V2 Checkout Pay exception:", v2Err.message);
      lastError = v2Err.message;
    }
  }

  // METHOD 2: PhonePe V1 Fallback with SHA256 Checksum
  if (!config.mid || !config.saltKey) {
    return { success: false, error: lastError || "PhonePe credentials not configured." };
  }

  // PhonePe requires a valid public HTTPS webhook callback URL
  const callbackUrl =
    process.env.PHONEPE_CALLBACK_URL ||
    (proto === "https" ? `${proto}://${hostHeader}/api/payment/phonepe/callback` : "https://digitalcrowdtech.in/api/payment/phonepe/callback");

  const cleanPhone = String(order.customerPhone).replace(/[^0-9]/g, "").slice(-10) || "9985960692";

  const payload = {
    merchantId: config.mid,
    merchantTransactionId: order.orderNumber,
    merchantUserId: `CUST-${cleanPhone}`,
    amount: amountInPaise,
    redirectUrl: `${frontendUrl}/order-confirmation?orderNumber=${encodeURIComponent(order.orderNumber)}`,
    redirectMode: "REDIRECT",
    callbackUrl,
    mobileNumber: cleanPhone,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
  const stringToHash = base64Payload + "/pg/v1/pay" + config.saltKey;
  const sha256 = crypto.createHash("sha256").update(stringToHash).digest("hex");
  const xVerify = `${sha256}###${config.saltIndex}`;

  try {
    const response = await fetch(`${config.baseUrl}/pg/v1/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        accept: "application/json",
      },
      body: JSON.stringify({ request: base64Payload }),
    });

    const rawText = await response.text();
    let data = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.warn("PhonePe Pay API non-JSON response:", response.status, rawText);
    }
    if (data && data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      return {
        success: true,
        redirectUrl: data.data.instrumentResponse.redirectInfo.url,
        phonepeTxnId: data.data.transactionId || null,
        merchantTransactionId: order.orderNumber,
        isSandbox: config.isSandbox,
        version: "v1",
      };
    } else {
      console.warn("PhonePe Pay API response not successful:", data?.code, data?.message);
      return { success: false, error: data?.message || data?.code || lastError || "PhonePe gateway session rejected." };
    }
  } catch (err) {
    console.error("PhonePe Pay API call failed:", err.message);
    return { success: false, error: err.message || lastError || "PhonePe gateway call failed." };
  }
}

// Helper: Check PhonePe Status API (Supports V2 OAuth & V1 Fallback)
async function checkPhonePeOrderStatus(orderNumber, paymentSettings) {
  const config = getPhonePeConfig(paymentSettings);

  // METHOD 1: V2 Standard Checkout Status Check
  if (config.isV2) {
    try {
      const accessToken = await getPhonePeOAuthToken(config);
      const res = await fetch(`${config.baseUrl}/checkout/v2/order/${orderNumber}/status?details=false`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `O-Bearer ${accessToken}`,
          accept: "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        const isSuccess = data.state === "COMPLETED";
        const isExpired =
          data.state === "EXPIRED" ||
          data.state === "TIMED_OUT" ||
          data.detailedErrorCode === "SESSION_EXPIRED" ||
          data.errorCode === "SESSION_EXPIRED";
        const isCancelled =
          data.state === "CANCELLED" ||
          data.state === "USER_DROPPED" ||
          data.errorCode === "USER_DROPPED";
        const isFailed = (data.state === "FAILED" || !isSuccess) && !isExpired && !isCancelled;

        const rawCode =
          data.detailedErrorCode ||
          data.errorCode ||
          data.paymentDetails?.[0]?.detailedErrorCode ||
          data.paymentDetails?.[0]?.errorCode ||
          "";

        let failureReason = null;
        if (rawCode === "INSUFFICIENT_BALANCE" || data.errorCode === "INSUFFICIENT_BALANCE") {
          failureReason = "Insufficient balance in account";
        } else if (rawCode === "SESSION_EXPIRED" || isExpired) {
          failureReason = "Payment session expired";
        } else if (rawCode === "USER_DROPPED" || isCancelled) {
          failureReason = "Payment cancelled by user";
        } else if (rawCode === "BAD_REQUEST" || rawCode === "PAYMENT_DECLINED") {
          failureReason = "Transaction declined by bank";
        } else if (isFailed) {
          failureReason = rawCode && rawCode !== "PAYMENT_ERROR" ? `Payment declined (${rawCode})` : "Payment session timed out or declined";
        }

        return {
          ok: true,
          data,
          code: isSuccess ? "PAYMENT_SUCCESS" : data.state,
          state: data.state,
          isSuccess,
          isFailed,
          isExpired,
          isCancelled,
          failureReason,
          transactionId: data.orderId || data.paymentDetails?.[0]?.transactionId,
          utr: data.paymentDetails?.[0]?.splitInstruments?.[0]?.rail?.utr || data.paymentDetails?.[0]?.transactionId,
        };
      }
    } catch (v2Err) {
      console.warn("PhonePe V2 status check fallback:", v2Err.message);
    }
  }

  // METHOD 2: V1 Status Check fallback
  if (!config.mid || !config.saltKey) {
    return { ok: false, message: "Payment gateway credentials not configured." };
  }

  const statusPath = `/pg/v1/status/${config.mid}/${orderNumber}`;
  const stringToHash = statusPath + config.saltKey;
  const sha256 = crypto.createHash("sha256").update(stringToHash).digest("hex");
  const xVerify = `${sha256}###${config.saltIndex}`;

  try {
    const res = await fetch(`${config.baseUrl}${statusPath}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": config.mid,
        accept: "application/json",
      },
    });

    if (res.status === 204) {
      return { ok: true, status: "PENDING", code: "PAYMENT_NOT_FOUND" };
    }

    const data = await res.json();
    return { ok: true, data, code: data?.code, state: data?.data?.state };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

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

// ==========================================
// OFFERS & COUPON MANAGEMENT ENGINE
// ==========================================

// Helper: Centralized Backend Discount Calculation & Offer Validation
async function calculateAndValidateOffer({
  couponCode = "",
  productId = "",
  amount = 0,
  customerEmail = "",
  customerPhone = "",
}) {
  const numAmount = Number(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    return { valid: false, message: "Invalid order amount for discount calculation." };
  }

  const cleanCode = couponCode ? String(couponCode).trim().toUpperCase() : "";
  const cleanEmail = customerEmail ? String(customerEmail).trim().toLowerCase() : "";
  const cleanPhone = customerPhone ? String(customerPhone).replace(/\D/g, "") : "";
  const now = new Date();

  let targetOffer = null;
  let targetCoupon = null;

  if (cleanCode) {
    targetCoupon = await Coupon.findOne({
      where: { code: cleanCode },
      include: [
        {
          model: Offer,
          as: "offer",
          include: [{ model: OfferServiceMapping, as: "serviceMappings" }],
        },
      ],
    });

    if (!targetCoupon) {
      return { valid: false, message: `Coupon code "${cleanCode}" is invalid.` };
    }

    if (!targetCoupon.isActive) {
      return { valid: false, message: `Coupon code "${cleanCode}" has been disabled.` };
    }

    if (targetCoupon.expiryDate && new Date(targetCoupon.expiryDate) < now) {
      return {
        valid: false,
        message: `Coupon code "${cleanCode}" expired on ${new Date(targetCoupon.expiryDate).toLocaleDateString("en-IN")}.`,
      };
    }

    targetOffer = targetCoupon.offer;
  } else {
    // Check for active automatic discount matching productId and amount
    const activeAutoOffers = await Offer.findAll({
      where: {
        isAutomatic: true,
        isActive: true,
        startDate: { [Op.lte]: now },
        expiryDate: { [Op.gte]: now },
        minOrderValue: { [Op.lte]: numAmount },
      },
      include: [{ model: OfferServiceMapping, as: "serviceMappings" }],
      order: [["discountValue", "DESC"]],
    });

    for (const autoOff of activeAutoOffers) {
      const mappings = autoOff.serviceMappings || [];
      if (mappings.length > 0 && productId) {
        const resolvedId = BACKEND_SLUG_ALIASES[productId] || productId;
        const matches = mappings.some(
          (m) =>
            m.productId === productId ||
            m.productId === resolvedId ||
            m.productId.toLowerCase() === productId.toLowerCase()
        );
        if (!matches) continue;
      }
      targetOffer = autoOff;
      break;
    }

    if (!targetOffer) {
      return { valid: false, message: "No applicable promotion found." };
    }
  }

  if (!targetOffer || !targetOffer.isActive) {
    return { valid: false, message: "This promotional offer is no longer active." };
  }

  if (new Date(targetOffer.startDate) > now) {
    return {
      valid: false,
      message: `This promotion starts on ${new Date(targetOffer.startDate).toLocaleDateString("en-IN")}.`,
    };
  }

  if (new Date(targetOffer.expiryDate) < now) {
    return {
      valid: false,
      message: `This promotion expired on ${new Date(targetOffer.expiryDate).toLocaleDateString("en-IN")}.`,
    };
  }

  // Minimum Order Value
  if (numAmount < Number(targetOffer.minOrderValue)) {
    return {
      valid: false,
      message: `Minimum order value of ₹${Number(targetOffer.minOrderValue).toLocaleString(
        "en-IN"
      )} required for this discount (Current: ₹${numAmount.toLocaleString("en-IN")}).`,
    };
  }

  // Service / Product Restriction Check
  const mappings = targetOffer.serviceMappings || [];
  if (mappings.length > 0 && productId) {
    const resolvedProductId = BACKEND_SLUG_ALIASES[productId] || productId;
    const isServiceAllowed = mappings.some(
      (m) =>
        m.productId === productId ||
        m.productId === resolvedProductId ||
        m.productId.toLowerCase() === productId.toLowerCase()
    );

    if (!isServiceAllowed) {
      const allowedNames = mappings.map((m) => m.productTitle || m.productId).join(", ");
      return {
        valid: false,
        message: `This offer is restricted to: ${allowedNames}. It is not applicable to the selected product.`,
      };
    }
  }

  // Customer Eligibility: First Order Only & New vs Existing Customers
  if (targetOffer.firstOrderOnly || targetOffer.customerEligibility === "NEW_CUSTOMERS") {
    if (cleanEmail || cleanPhone) {
      const priorOrderCount = await Order.count({
        where: {
          [Op.or]: [
            ...(cleanEmail ? [{ customerEmail: cleanEmail }] : []),
            ...(cleanPhone ? [{ customerPhone: cleanPhone }] : []),
          ],
          paymentStatus: "COMPLETED",
        },
      });

      if (priorOrderCount > 0) {
        return {
          valid: false,
          message: "This coupon is exclusively reserved for first-time customer orders.",
        };
      }
    }
  } else if (targetOffer.customerEligibility === "EXISTING_CUSTOMERS") {
    if (cleanEmail || cleanPhone) {
      const priorOrderCount = await Order.count({
        where: {
          [Op.or]: [
            ...(cleanEmail ? [{ customerEmail: cleanEmail }] : []),
            ...(cleanPhone ? [{ customerPhone: cleanPhone }] : []),
          ],
          paymentStatus: "COMPLETED",
        },
      });

      if (priorOrderCount === 0) {
        return {
          valid: false,
          message: "This special loyalty offer is available only to existing clients.",
        };
      }
    }
  }

  // Total Usage Limit
  if (targetOffer.totalUsageLimit && targetOffer.usedCount >= targetOffer.totalUsageLimit) {
    return {
      valid: false,
      message: "This promotional offer has reached its maximum total usage limit.",
    };
  }

  if (targetCoupon && targetCoupon.totalUsageLimit && targetCoupon.usedCount >= targetCoupon.totalUsageLimit) {
    return {
      valid: false,
      message: `Coupon code "${cleanCode}" has reached its maximum total redemption limit.`,
    };
  }

  // Per-Customer Usage Limit
  const perCustomerLimit = targetCoupon?.perCustomerLimit || targetOffer.perCustomerLimit || 1;
  if (cleanEmail || cleanPhone) {
    const customerRedemptionCount = await CouponRedemption.count({
      where: {
        offerId: targetOffer.id,
        status: "COMPLETED",
        [Op.or]: [
          ...(cleanEmail ? [{ customerEmail: cleanEmail }] : []),
          ...(cleanPhone ? [{ customerPhone: cleanPhone }] : []),
        ],
      },
    });

    if (customerRedemptionCount >= perCustomerLimit) {
      return {
        valid: false,
        message: `You have already redeemed this offer the maximum allowed limit (${perCustomerLimit} time${
          perCustomerLimit > 1 ? "s" : ""
        }).`,
      };
    }
  }

  // Calculation Engine
  let discountAmount = 0;
  if (targetOffer.discountType === "PERCENTAGE") {
    const rawDiscount = (numAmount * Number(targetOffer.discountValue)) / 100;
    if (targetOffer.maxDiscountAmount && Number(targetOffer.maxDiscountAmount) > 0) {
      discountAmount = Math.min(rawDiscount, Number(targetOffer.maxDiscountAmount));
    } else {
      discountAmount = rawDiscount;
    }
  } else if (targetOffer.discountType === "FIXED") {
    discountAmount = Math.min(numAmount, Number(targetOffer.discountValue));
  } else if (targetOffer.discountType === "FREE_SERVICE") {
    discountAmount = numAmount;
  }

  discountAmount = Math.round(discountAmount * 100) / 100;
  const finalAmount = Math.max(1, Math.round((numAmount - discountAmount) * 100) / 100);

  return {
    valid: true,
    offer: targetOffer,
    coupon: targetCoupon,
    originalAmount: numAmount,
    discountAmount,
    finalAmount,
    couponCode: targetCoupon ? targetCoupon.code : null,
    isAutomatic: Boolean(targetOffer.isAutomatic),
    savingsText: `You save ₹${discountAmount.toLocaleString("en-IN")}${
      targetCoupon ? ` with coupon ${targetCoupon.code}` : " with promotional discount"
    }`,
  };
}

// 1. Public: Validate Offer / Coupon
app.post("/api/offers/validate", async (req, res) => {
  try {
    const { couponCode, productId, planName, amount, customerEmail, customerPhone } = req.body;

    const result = await calculateAndValidateOffer({
      couponCode,
      productId,
      amount,
      customerEmail,
      customerPhone,
    });

    if (!result.valid) {
      return res.status(400).json({ ok: false, message: result.message });
    }

    return res.json({
      ok: true,
      valid: true,
      offer: {
        id: result.offer.id,
        title: result.offer.title,
        description: result.offer.description,
        discountType: result.offer.discountType,
        discountValue: Number(result.offer.discountValue),
        maxDiscountAmount: result.offer.maxDiscountAmount ? Number(result.offer.maxDiscountAmount) : null,
        minOrderValue: Number(result.offer.minOrderValue),
        couponCode: result.couponCode,
        bannerText: result.offer.bannerText,
        isAutomatic: result.isAutomatic,
      },
      breakdown: {
        originalAmount: result.originalAmount,
        discountAmount: result.discountAmount,
        finalAmount: result.finalAmount,
        savingsText: result.savingsText,
      },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// 2. Public: Get Active Promotions for Checkout
app.get("/api/offers/active", async (req, res) => {
  try {
    const now = new Date();
    const offers = await Offer.findAll({
      where: {
        isActive: true,
        startDate: { [Op.lte]: now },
        expiryDate: { [Op.gte]: now },
      },
      include: [
        { model: Coupon, as: "coupons", where: { isActive: true }, required: false },
        { model: OfferServiceMapping, as: "serviceMappings", required: false },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formatted = offers.map((off) => ({
      id: off.id,
      title: off.title,
      description: off.description,
      discountType: off.discountType,
      discountValue: Number(off.discountValue),
      maxDiscountAmount: off.maxDiscountAmount ? Number(off.maxDiscountAmount) : null,
      minOrderValue: Number(off.minOrderValue),
      isAutomatic: Boolean(off.isAutomatic),
      firstOrderOnly: Boolean(off.firstOrderOnly),
      customerEligibility: off.customerEligibility,
      bannerText: off.bannerText,
      expiryDate: off.expiryDate,
      couponCode: off.coupons?.[0]?.code || null,
      restrictedProducts: (off.serviceMappings || []).map((m) => m.productId),
    }));

    return res.json({ ok: true, offers: formatted });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// 3. Admin: List All Offers
app.get("/api/admin/offers", requireAdmin, async (req, res) => {
  try {
    const offers = await Offer.findAll({
      include: [
        { model: Coupon, as: "coupons" },
        { model: OfferServiceMapping, as: "serviceMappings" },
        {
          model: CouponRedemption,
          as: "redemptions",
          attributes: ["id", "status", "discountAmount", "finalAmount", "createdAt"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const enriched = offers.map((off) => {
      const redemptions = off.redemptions || [];
      const completedRedemptions = redemptions.filter((r) => r.status === "COMPLETED");
      const totalDiscountGiven = completedRedemptions.reduce(
        (sum, r) => sum + Number(r.discountAmount || 0),
        0
      );
      const totalRevenue = completedRedemptions.reduce(
        (sum, r) => sum + Number(r.finalAmount || 0),
        0
      );

      return {
        id: off.id,
        title: off.title,
        description: off.description,
        discountType: off.discountType,
        discountValue: Number(off.discountValue),
        maxDiscountAmount: off.maxDiscountAmount ? Number(off.maxDiscountAmount) : null,
        minOrderValue: Number(off.minOrderValue),
        isAutomatic: Boolean(off.isAutomatic),
        customerEligibility: off.customerEligibility,
        firstOrderOnly: Boolean(off.firstOrderOnly),
        totalUsageLimit: off.totalUsageLimit,
        perCustomerLimit: off.perCustomerLimit,
        usedCount: off.usedCount,
        startDate: off.startDate,
        expiryDate: off.expiryDate,
        isActive: Boolean(off.isActive),
        bannerText: off.bannerText,
        createdAt: off.createdAt,
        updatedAt: off.updatedAt,
        coupon: off.coupons?.[0]
          ? {
              id: off.coupons[0].id,
              code: off.coupons[0].code,
              usedCount: off.coupons[0].usedCount,
              isActive: off.coupons[0].isActive,
            }
          : null,
        serviceMappings: (off.serviceMappings || []).map((m) => ({
          productId: m.productId,
          productTitle: m.productTitle,
        })),
        metrics: {
          totalRedemptions: completedRedemptions.length,
          totalDiscountGiven: Math.round(totalDiscountGiven * 100) / 100,
          totalRevenue: Math.round(totalRevenue * 100) / 100,
        },
      };
    });

    return res.json({ ok: true, offers: enriched });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// 4. Admin: Create New Offer & Coupon
app.post("/api/admin/offers", requireAdmin, async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      title,
      description = "",
      discountType = "PERCENTAGE",
      discountValue = 0,
      maxDiscountAmount = null,
      minOrderValue = 0,
      isAutomatic = false,
      couponCode = "",
      customerEligibility = "ALL",
      firstOrderOnly = false,
      totalUsageLimit = null,
      perCustomerLimit = 1,
      startDate,
      expiryDate,
      isActive = true,
      bannerText = "",
      restrictedProductIds = [],
    } = req.body;

    if (!title || !title.trim()) {
      await t.rollback();
      return res.status(400).json({ ok: false, message: "Offer title is required." });
    }

    if (!isAutomatic && (!couponCode || !couponCode.trim())) {
      await t.rollback();
      return res.status(400).json({ ok: false, message: "Coupon code is required for non-automatic offers." });
    }

    const cleanCode = couponCode ? couponCode.trim().toUpperCase() : null;

    if (cleanCode) {
      const existingCoupon = await Coupon.findOne({ where: { code: cleanCode }, transaction: t });
      if (existingCoupon) {
        await t.rollback();
        return res.status(400).json({ ok: false, message: `Coupon code "${cleanCode}" already exists. Please choose another code.` });
      }
    }

    const offerId = createId("offer");
    const offer = await Offer.create(
      {
        id: offerId,
        title: title.trim(),
        description: description.trim(),
        discountType,
        discountValue: Number(discountValue),
        maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
        minOrderValue: Number(minOrderValue) || 0,
        isAutomatic: Boolean(isAutomatic),
        customerEligibility,
        firstOrderOnly: Boolean(firstOrderOnly),
        totalUsageLimit: totalUsageLimit ? Number(totalUsageLimit) : null,
        perCustomerLimit: Number(perCustomerLimit) || 1,
        usedCount: 0,
        startDate: startDate ? new Date(startDate) : new Date(),
        expiryDate: expiryDate ? new Date(expiryDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: Boolean(isActive),
        bannerText: bannerText ? bannerText.trim() : null,
      },
      { transaction: t }
    );

    // Create associated coupon if code provided
    if (cleanCode) {
      await Coupon.create(
        {
          id: createId("coupon"),
          offerId: offer.id,
          code: cleanCode,
          totalUsageLimit: totalUsageLimit ? Number(totalUsageLimit) : null,
          perCustomerLimit: Number(perCustomerLimit) || 1,
          usedCount: 0,
          isActive: Boolean(isActive),
          expiryDate: expiryDate ? new Date(expiryDate) : null,
        },
        { transaction: t }
      );
    }

    // Create service restrictions
    if (Array.isArray(restrictedProductIds) && restrictedProductIds.length > 0) {
      for (const pId of restrictedProductIds) {
        const prodMatch = defaultProducts.find((p) => p.id === pId || p.slug === pId);
        await OfferServiceMapping.create(
          {
            id: createId("map"),
            offerId: offer.id,
            productId: pId,
            productTitle: prodMatch ? prodMatch.title : pId,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
    return res.json({ ok: true, message: "Offer created successfully.", offerId: offer.id });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// 5. Admin: Update Offer
app.put("/api/admin/offers/:id", requireAdmin, async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id, { transaction: t });
    if (!offer) {
      await t.rollback();
      return res.status(404).json({ ok: false, message: "Offer not found." });
    }

    const {
      title,
      description,
      discountType,
      discountValue,
      maxDiscountAmount,
      minOrderValue,
      isAutomatic,
      couponCode,
      customerEligibility,
      firstOrderOnly,
      totalUsageLimit,
      perCustomerLimit,
      startDate,
      expiryDate,
      isActive,
      bannerText,
      restrictedProductIds,
    } = req.body;

    await offer.update(
      {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(description !== undefined ? { description: description.trim() } : {}),
        ...(discountType !== undefined ? { discountType } : {}),
        ...(discountValue !== undefined ? { discountValue: Number(discountValue) } : {}),
        ...(maxDiscountAmount !== undefined ? { maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null } : {}),
        ...(minOrderValue !== undefined ? { minOrderValue: Number(minOrderValue) || 0 } : {}),
        ...(isAutomatic !== undefined ? { isAutomatic: Boolean(isAutomatic) } : {}),
        ...(customerEligibility !== undefined ? { customerEligibility } : {}),
        ...(firstOrderOnly !== undefined ? { firstOrderOnly: Boolean(firstOrderOnly) } : {}),
        ...(totalUsageLimit !== undefined ? { totalUsageLimit: totalUsageLimit ? Number(totalUsageLimit) : null } : {}),
        ...(perCustomerLimit !== undefined ? { perCustomerLimit: Number(perCustomerLimit) || 1 } : {}),
        ...(startDate !== undefined ? { startDate: new Date(startDate) } : {}),
        ...(expiryDate !== undefined ? { expiryDate: new Date(expiryDate) } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
        ...(bannerText !== undefined ? { bannerText: bannerText ? bannerText.trim() : null } : {}),
      },
      { transaction: t }
    );

    // Update or Create Coupon Code
    if (couponCode !== undefined) {
      const cleanCode = couponCode ? couponCode.trim().toUpperCase() : null;
      let existingCoupon = await Coupon.findOne({ where: { offerId: offer.id }, transaction: t });

      if (cleanCode) {
        const codeClash = await Coupon.findOne({
          where: { code: cleanCode, offerId: { [Op.ne]: offer.id } },
          transaction: t,
        });
        if (codeClash) {
          await t.rollback();
          return res.status(400).json({ ok: false, message: `Coupon code "${cleanCode}" is in use by another offer.` });
        }

        if (existingCoupon) {
          await existingCoupon.update(
            {
              code: cleanCode,
              isActive: isActive !== undefined ? Boolean(isActive) : existingCoupon.isActive,
              expiryDate: expiryDate ? new Date(expiryDate) : existingCoupon.expiryDate,
              totalUsageLimit: totalUsageLimit ? Number(totalUsageLimit) : null,
              perCustomerLimit: Number(perCustomerLimit) || 1,
            },
            { transaction: t }
          );
        } else {
          await Coupon.create(
            {
              id: createId("coupon"),
              offerId: offer.id,
              code: cleanCode,
              totalUsageLimit: totalUsageLimit ? Number(totalUsageLimit) : null,
              perCustomerLimit: Number(perCustomerLimit) || 1,
              usedCount: 0,
              isActive: isActive !== undefined ? Boolean(isActive) : true,
              expiryDate: expiryDate ? new Date(expiryDate) : null,
            },
            { transaction: t }
          );
        }
      }
    }

    // Update Service Restrictions
    if (restrictedProductIds !== undefined && Array.isArray(restrictedProductIds)) {
      await OfferServiceMapping.destroy({ where: { offerId: offer.id }, transaction: t });
      for (const pId of restrictedProductIds) {
        const prodMatch = defaultProducts.find((p) => p.id === pId || p.slug === pId);
        await OfferServiceMapping.create(
          {
            id: createId("map"),
            offerId: offer.id,
            productId: pId,
            productTitle: prodMatch ? prodMatch.title : pId,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
    return res.json({ ok: true, message: "Offer updated successfully." });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// 6. Admin: Delete Offer
app.delete("/api/admin/offers/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ ok: false, message: "Offer not found." });
    }

    await Coupon.destroy({ where: { offerId: id } });
    await OfferServiceMapping.destroy({ where: { offerId: id } });
    await offer.destroy();

    return res.json({ ok: true, message: "Offer deleted successfully." });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// 7. Admin: Toggle Offer Active Status
app.patch("/api/admin/offers/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ ok: false, message: "Offer not found." });
    }

    const nextStatus = isActive !== undefined ? Boolean(isActive) : !offer.isActive;
    await offer.update({ isActive: nextStatus });
    await Coupon.update({ isActive: nextStatus }, { where: { offerId: id } });

    return res.json({
      ok: true,
      message: `Offer ${nextStatus ? "activated" : "deactivated"} successfully.`,
      isActive: nextStatus,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// 8. Admin: Offers & Coupon Analytics
app.get("/api/admin/offers/analytics", requireAdmin, async (req, res) => {
  try {
    const now = new Date();

    const [
      totalActiveOffers,
      totalCouponsCreated,
      completedRedemptions,
      allCoupons,
    ] = await Promise.all([
      Offer.count({ where: { isActive: true } }),
      Coupon.count(),
      CouponRedemption.findAll({
        where: { status: "COMPLETED" },
        include: [{ model: Coupon, as: "coupon" }],
      }),
      Coupon.findAll({
        include: [{ model: Offer, as: "offer" }],
      }),
    ]);

    const couponsRedeemed = completedRedemptions.length;
    const totalDiscountGiven = completedRedemptions.reduce(
      (sum, r) => sum + Number(r.discountAmount || 0),
      0
    );
    const revenueGenerated = completedRedemptions.reduce(
      (sum, r) => sum + Number(r.finalAmount || 0),
      0
    );

    // Ranked most-used coupons
    const couponUsageMap = {};
    for (const r of completedRedemptions) {
      const code = r.coupon?.code || "DIRECT_PROMO";
      if (!couponUsageMap[code]) {
        couponUsageMap[code] = {
          code,
          count: 0,
          totalDiscount: 0,
          totalRevenue: 0,
        };
      }
      couponUsageMap[code].count += 1;
      couponUsageMap[code].totalDiscount += Number(r.discountAmount || 0);
      couponUsageMap[code].totalRevenue += Number(r.finalAmount || 0);
    }

    const mostUsedCoupons = Object.values(couponUsageMap).sort((a, b) => b.count - a.count);

    // Expired and unused coupons
    const expiredAndUnused = allCoupons.filter((c) => {
      const isExpired =
        (c.expiryDate && new Date(c.expiryDate) < now) ||
        (c.offer?.expiryDate && new Date(c.offer.expiryDate) < now);
      return isExpired && c.usedCount === 0;
    });

    return res.json({
      ok: true,
      analytics: {
        totalActiveOffers,
        totalCouponsCreated,
        couponsRedeemed,
        totalDiscountGiven: Math.round(totalDiscountGiven * 100) / 100,
        revenueGenerated: Math.round(revenueGenerated * 100) / 100,
        mostUsedCoupons: mostUsedCoupons.slice(0, 10),
        expiredAndUnusedCoupons: {
          count: expiredAndUnused.length,
          items: expiredAndUnused.map((c) => ({
            id: c.id,
            code: c.code,
            offerTitle: c.offer?.title || "N/A",
            expiryDate: c.expiryDate || c.offer?.expiryDate,
          })),
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// 9. Admin: Coupon Redemption History
app.get("/api/admin/offers/redemptions", requireAdmin, async (req, res) => {
  try {
    const redemptions = await CouponRedemption.findAll({
      include: [
        { model: Coupon, as: "coupon", attributes: ["code", "id"] },
        { model: Offer, as: "offer", attributes: ["title", "discountType", "discountValue"] },
      ],
      order: [["createdAt", "DESC"]],
      limit: 200,
    });

    return res.json({
      ok: true,
      redemptions: redemptions.map((r) => ({
        id: r.id,
        orderNumber: r.orderNumber,
        customerEmail: r.customerEmail,
        customerPhone: r.customerPhone,
        couponCode: r.coupon?.code || "DIRECT",
        offerTitle: r.offer?.title || "Promotion",
        originalAmount: Number(r.originalAmount),
        discountAmount: Number(r.discountAmount),
        finalAmount: Number(r.finalAmount),
        status: r.status,
        reservedAt: r.reservedAt,
        completedAt: r.completedAt,
        createdAt: r.createdAt,
      })),
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
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
      couponCode = "",
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

    // Calculate final payable amount & validate coupon / promotional discount on backend
    let originalAmount = chosenAmount;
    let discountAmount = 0;
    let payableAmount = chosenAmount;
    let appliedCouponCode = null;
    let appliedOfferId = null;
    let offerValidation = null;

    if (couponCode && String(couponCode).trim()) {
      offerValidation = await calculateAndValidateOffer({
        couponCode,
        productId: productData.id,
        amount: chosenAmount,
        customerEmail,
        customerPhone: cleanPhone,
      });

      if (!offerValidation.valid) {
        return res.status(400).json({ ok: false, message: offerValidation.message });
      }

      discountAmount = offerValidation.discountAmount;
      payableAmount = offerValidation.finalAmount;
      appliedCouponCode = offerValidation.couponCode || String(couponCode).trim().toUpperCase();
      appliedOfferId = offerValidation.offer.id;
    } else {
      // Check for active automatic offer
      const autoOffer = await calculateAndValidateOffer({
        couponCode: "",
        productId: productData.id,
        amount: chosenAmount,
        customerEmail,
        customerPhone: cleanPhone,
      });

      if (autoOffer.valid) {
        discountAmount = autoOffer.discountAmount;
        payableAmount = autoOffer.finalAmount;
        appliedOfferId = autoOffer.offer.id;
        appliedCouponCode = autoOffer.couponCode;
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
    )}&tr=${encodeURIComponent(orderNumber)}&am=${payableAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
      `Order ${orderNumber} - ${productData.title.slice(0, 30)}`
    )}`;

    const initialAudit = [
      {
        timestamp: new Date().toISOString(),
        action: "ORDER_CREATED",
        amount: payableAmount,
        originalAmount,
        discountAmount,
        couponCode: appliedCouponCode,
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
      amount: payableAmount,
      originalAmount,
      discountAmount,
      couponCode: appliedCouponCode,
      offerId: appliedOfferId,
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

    // Create Coupon Reservation & Payment Offer Details records
    if (appliedOfferId) {
      try {
        await CouponRedemption.create({
          id: createId("redemption"),
          couponId: offerValidation?.coupon?.id || null,
          offerId: appliedOfferId,
          orderId: order.id,
          orderNumber: order.orderNumber,
          customerEmail: sanitize(customerEmail).toLowerCase(),
          customerPhone: cleanPhone,
          originalAmount,
          discountAmount,
          finalAmount: payableAmount,
          status: "RESERVED",
          reservedAt: new Date(),
        });

        await PaymentOfferDetail.create({
          id: createId("pod"),
          orderNumber: order.orderNumber,
          offerId: appliedOfferId,
          couponCode: appliedCouponCode,
          discountType: offerValidation?.offer?.discountType || "PERCENTAGE",
          discountValue: offerValidation?.offer?.discountValue || 0,
          originalAmount,
          discountAmount,
          finalAmount: payableAmount,
          settlementStatus: "PENDING",
          auditNotes: `Reserved during order creation with discount ₹${discountAmount}`,
        });
      } catch (reserveErr) {
        console.warn("Coupon reservation record warning:", reserveErr.message);
      }
    }

    // Call PhonePe Payment Gateway to initialize session using final payable amount
    const pgResult = await initiatePhonePePayPage({
      order,
      amount: payableAmount,
      paymentSettings,
      req,
    });

    if (pgResult?.phonepeTxnId) {
      await order.update({ transactionId: pgResult.phonepeTxnId });
    }

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
        originalAmount: Number(originalAmount),
        discountAmount: Number(discountAmount),
        couponCode: appliedCouponCode,
        currency: order.currency,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        companyName: order.companyName,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
      },
      payment: {
        method: pgResult?.redirectUrl ? "phonepe_pg" : "phonepe_upi",
        hasPgRedirect: Boolean(pgResult?.redirectUrl),
        redirectUrl: pgResult?.redirectUrl || null,
        phonepeTxnId: pgResult?.phonepeTxnId || null,
        pgError: pgResult?.error || null,
        merchantUpiId: merchantUpi,
        merchantName,
        payableAmount,
        originalAmount,
        discountAmount,
        couponCode: appliedCouponCode,
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
        originalAmount: order.originalAmount ? Number(order.originalAmount) : Number(order.amount),
        discountAmount: Number(order.discountAmount || 0),
        couponCode: order.couponCode || null,
        offerId: order.offerId || null,
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

// Public: Real-Time PhonePe Order Status & Automated Verification
app.get("/api/payment/phonepe/status/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const order = await Order.findOne({
      where: {
        [Op.or]: [{ orderNumber }, { id: orderNumber }],
      },
    });

    if (!order) {
      return res.status(404).json({ ok: false, message: "Order not found." });
    }

    // If order is already completed, return immediately
    if (order.paymentStatus === "COMPLETED") {
      return res.json({
        ok: true,
        verified: true,
        status: "COMPLETED",
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          productTitle: order.productTitle,
          planName: order.planName,
          amount: Number(order.amount),
          originalAmount: order.originalAmount ? Number(order.originalAmount) : Number(order.amount),
          discountAmount: Number(order.discountAmount || 0),
          couponCode: order.couponCode || null,
          offerId: order.offerId || null,
          currency: order.currency,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: order.customerPhone,
          companyName: order.companyName,
          paymentStatus: order.paymentStatus,
          transactionId: order.transactionId,
          utrNumber: order.utrNumber,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        },
      });
    }

    // Call PhonePe status API directly to verify
    let settings = await PaymentSetting.findByPk("default");
    const checkResult = await checkPhonePeOrderStatus(order.orderNumber, settings);

    if (checkResult.ok) {
      const data = checkResult.data;
      const isSuccess =
        Boolean(checkResult.isSuccess) ||
        data?.state === "COMPLETED" ||
        data?.code === "PAYMENT_SUCCESS" ||
        data?.data?.state === "COMPLETED";

      const isExpired =
        Boolean(checkResult.isExpired) ||
        data?.state === "EXPIRED" ||
        data?.state === "TIMED_OUT" ||
        data?.detailedErrorCode === "SESSION_EXPIRED" ||
        data?.errorCode === "SESSION_EXPIRED";

      const isCancelled =
        Boolean(checkResult.isCancelled) ||
        data?.state === "CANCELLED" ||
        data?.state === "USER_DROPPED" ||
        data?.errorCode === "USER_DROPPED";

      const isFailed =
        (Boolean(checkResult.isFailed) ||
          data?.state === "FAILED" ||
          data?.code === "PAYMENT_ERROR" ||
          data?.code === "PAYMENT_FAILED" ||
          data?.data?.state === "FAILED") &&
        !isExpired &&
        !isCancelled;

      const failureReason =
        checkResult.failureReason ||
        (isExpired
          ? "Payment session expired"
          : isCancelled
          ? "Payment cancelled by user"
          : isFailed
          ? "Payment failed at bank / UPI"
          : null);

      if (isSuccess) {
        let audit = [];
        try {
          audit = JSON.parse(order.auditLog || "[]");
        } catch {}

        const txnId =
          data?.orderId ||
          data?.paymentDetails?.[0]?.transactionId ||
          data?.data?.transactionId ||
          order.transactionId;

        const utr =
          data?.paymentDetails?.[0]?.splitInstruments?.[0]?.rail?.utr ||
          data?.data?.paymentInstrument?.utr ||
          order.utrNumber;

        audit.push({
          timestamp: new Date().toISOString(),
          action: "PHONEPE_AUTO_VERIFIED",
          transactionId: txnId,
          code: data?.code || "COMPLETED",
          status: "COMPLETED",
        });

        await order.update({
          paymentStatus: "COMPLETED",
          transactionId: txnId || `TXN-${Date.now()}`,
          utrNumber: utr,
          gatewayResponse: JSON.stringify(data),
          auditLog: JSON.stringify(audit),
        });

        // Atomic settlement of coupon redemption & usage count increment
        try {
          const redemption = await CouponRedemption.findOne({
            where: { orderId: order.id, status: "RESERVED" },
          });
          if (redemption) {
            await redemption.update({
              status: "COMPLETED",
              completedAt: new Date(),
            });
            if (redemption.offerId) {
              await Offer.increment("usedCount", { by: 1, where: { id: redemption.offerId } });
            }
            if (redemption.couponId) {
              await Coupon.increment("usedCount", { by: 1, where: { id: redemption.couponId } });
            }
          }
          await PaymentOfferDetail.update(
            { settlementStatus: "COMPLETED", verifiedAt: new Date() },
            { where: { orderId: order.id } }
          );
        } catch (offerErr) {
          console.warn("Coupon redemption completion hook warning:", offerErr.message);
        }

        sendOrderSuccessEmail(order);
      } else if (isFailed || isExpired || isCancelled) {
        const newStatus = isExpired ? "EXPIRED" : isCancelled ? "CANCELLED" : "FAILED";
        let audit = [];
        try {
          audit = JSON.parse(order.auditLog || "[]");
        } catch {}

        audit.push({
          timestamp: new Date().toISOString(),
          action: `PHONEPE_${newStatus}`,
          reason: failureReason,
          status: newStatus,
        });

        await order.update({
          paymentStatus: newStatus,
          gatewayResponse: JSON.stringify(data),
          auditLog: JSON.stringify(audit),
          adminNotes: failureReason,
        });

        // Release reserved coupon redemption so quota is not locked
        try {
          const redemption = await CouponRedemption.findOne({
            where: { orderId: order.id, status: "RESERVED" },
          });
          if (redemption) {
            await redemption.update({
              status: isExpired ? "EXPIRED" : isCancelled ? "CANCELLED" : "FAILED",
            });
          }
          await PaymentOfferDetail.update(
            { settlementStatus: isExpired ? "EXPIRED" : isCancelled ? "CANCELLED" : "FAILED" },
            { where: { orderId: order.id } }
          );
        } catch (releaseErr) {
          console.warn("Coupon reservation release warning:", releaseErr.message);
        }
      }
    }

    const currentFailureReason =
      order.paymentStatus === "FAILED" ||
      order.paymentStatus === "EXPIRED" ||
      order.paymentStatus === "CANCELLED"
        ? checkResult.failureReason || order.adminNotes
        : null;

    return res.json({
      ok: true,
      verified: order.paymentStatus === "COMPLETED",
      status: order.paymentStatus,
      failureReason: currentFailureReason,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        productId: order.productId,
        productTitle: order.productTitle,
        productSlug: order.productSlug,
        planName: order.planName,
        amount: Number(order.amount),
        originalAmount: order.originalAmount ? Number(order.originalAmount) : Number(order.amount),
        discountAmount: Number(order.discountAmount || 0),
        couponCode: order.couponCode || null,
        offerId: order.offerId || null,
        currency: order.currency,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        companyName: order.companyName,
        paymentStatus: order.paymentStatus,
        failureReason: currentFailureReason,
        transactionId: order.transactionId,
        utrNumber: order.utrNumber,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Public: Retry Payment for Failed / Expired Order (with 10-Minute Validity)
app.post("/api/payment/phonepe/retry/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const existingOrder = await Order.findOne({
      where: {
        [Op.or]: [{ orderNumber }, { id: orderNumber }],
      },
    });

    if (!existingOrder) {
      return res.status(404).json({ ok: false, message: "Original order not found." });
    }

    const timestamp = Date.now();
    const newOrderNumber = `DCT-ORD-${timestamp.toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrderId = createId("order");

    let paymentSettings = await PaymentSetting.findByPk("default");

    const newOrder = await Order.create({
      id: newOrderId,
      orderNumber: newOrderNumber,
      productId: existingOrder.productId,
      productTitle: existingOrder.productTitle,
      productSlug: existingOrder.productSlug,
      planName: existingOrder.planName,
      amount: existingOrder.amount,
      originalAmount: existingOrder.originalAmount || existingOrder.amount,
      discountAmount: existingOrder.discountAmount || 0,
      couponCode: existingOrder.couponCode || null,
      offerId: existingOrder.offerId || null,
      currency: "INR",
      customerName: existingOrder.customerName,
      customerEmail: existingOrder.customerEmail,
      customerPhone: existingOrder.customerPhone,
      companyName: existingOrder.companyName,
      address: existingOrder.address,
      paymentMethod: "phonepe_upi",
      paymentStatus: "PENDING",
      adminNotes: `Retried from ${existingOrder.orderNumber}`,
      auditLog: JSON.stringify([
        {
          timestamp: new Date().toISOString(),
          action: "ORDER_RETRIED",
          fromOrder: existingOrder.orderNumber,
          amount: existingOrder.amount,
        },
      ]),
    });

    if (existingOrder.couponCode) {
      try {
        const coupon = await Coupon.findOne({ where: { code: existingOrder.couponCode.toUpperCase() } });
        if (coupon) {
          await CouponRedemption.create({
            id: createId("redemption"),
            couponId: coupon.id,
            offerId: coupon.offerId,
            orderId: newOrderId,
            customerEmail: existingOrder.customerEmail,
            customerPhone: existingOrder.customerPhone,
            discountAmount: existingOrder.discountAmount,
            orderAmount: existingOrder.amount,
            status: "RESERVED",
          });
        }
      } catch (retryCouponErr) {
        console.warn("Retry coupon reservation warning:", retryCouponErr.message);
      }
    }

    const payResult = await initiatePhonePePayPage({
      order: newOrder,
      amount: newOrder.amount,
      paymentSettings,
      req,
    });

    return res.json({
      ok: true,
      message: "New 10-minute PhonePe payment session initialized.",
      order: {
        id: newOrder.id,
        orderNumber: newOrder.orderNumber,
        productTitle: newOrder.productTitle,
        productSlug: newOrder.productSlug,
        planName: newOrder.planName,
        amount: Number(newOrder.amount),
        customerName: newOrder.customerName,
        customerEmail: newOrder.customerEmail,
        customerPhone: newOrder.customerPhone,
        paymentStatus: newOrder.paymentStatus,
      },
      payment: {
        redirectUrl: payResult?.redirectUrl || null,
        phonepeTxnId: payResult?.phonepeTxnId || null,
        merchantTransactionId: newOrder.orderNumber,
        expiresInSeconds: 600, // 10 minutes
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

    console.log("PhonePe Webhook Event Received:", { hasVerify: Boolean(xVerify) });

    let settings = await PaymentSetting.findByPk("default");
    const config = getPhonePeConfig(settings);

    if (rawBody && rawBody.response) {
      // Validate signature if configured
      if (config.saltKey && xVerify) {
        const expectedHash = crypto
          .createHash("sha256")
          .update(rawBody.response + config.saltKey)
          .digest("hex");
        const expectedXVerify = `${expectedHash}###${config.saltIndex}`;
        if (xVerify !== expectedXVerify) {
          console.warn("PhonePe Webhook X-VERIFY signature mismatch. Ignoring untrusted payload.");
          return res.status(400).json({ ok: false, message: "Invalid signature" });
        }
      }

      const decodedStr = Buffer.from(rawBody.response, "base64").toString("utf-8");
      const data = JSON.parse(decodedStr);

      if (data && data.data && data.data.merchantTransactionId) {
        const orderNumber = data.data.merchantTransactionId;
        const order = await Order.findOne({ where: { orderNumber } });

        if (order) {
          const success = data.code === "PAYMENT_SUCCESS" || data.data?.state === "COMPLETED";
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

          if (success) {
            try {
              const redemption = await CouponRedemption.findOne({
                where: { orderId: order.id, status: "RESERVED" },
              });
              if (redemption) {
                await redemption.update({
                  status: "COMPLETED",
                  completedAt: new Date(),
                });
                if (redemption.offerId) {
                  await Offer.increment("usedCount", { by: 1, where: { id: redemption.offerId } });
                }
                if (redemption.couponId) {
                  await Coupon.increment("usedCount", { by: 1, where: { id: redemption.couponId } });
                }
              }
              await PaymentOfferDetail.update(
                { settlementStatus: "COMPLETED", verifiedAt: new Date() },
                { where: { orderId: order.id } }
              );
            } catch (whErr) {
              console.warn("Webhook coupon settlement error:", whErr.message);
            }
            sendOrderSuccessEmail(order);
          } else {
            try {
              const redemption = await CouponRedemption.findOne({
                where: { orderId: order.id, status: "RESERVED" },
              });
              if (redemption) {
                await redemption.update({ status: "FAILED" });
              }
              await PaymentOfferDetail.update(
                { settlementStatus: "FAILED" },
                { where: { orderId: order.id } }
              );
            } catch (whErr) {
              console.warn("Webhook coupon release error:", whErr.message);
            }
          }
        }
      }
    }

    return res.status(200).json({ ok: true, status: "CALLBACK_PROCESSED" });
  } catch (err) {
    console.error("PhonePe callback handling error:", err.message);
    return res.status(200).json({ ok: true }); // Always 200 to acknowledge webhook
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
      clientId: sanitize(req.body.clientId) !== undefined ? sanitize(req.body.clientId) : settings.clientId,
      clientSecret: sanitize(req.body.clientSecret) !== undefined ? sanitize(req.body.clientSecret) : settings.clientSecret,
      clientVersion: sanitize(req.body.clientVersion) || settings.clientVersion || "1",
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
    // Clear token cache on settings change
    phonePeTokenCache = { token: null, expiresAt: 0, clientId: null };
    return res.json({ ok: true, settings: settings.get({ plain: true }) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// Admin: Test PhonePe Payment Gateway Connectivity
app.post("/api/admin/settings/payment/test", requireAdmin, async (req, res) => {
  try {
    let settings = await PaymentSetting.findByPk("default");
    const config = getPhonePeConfig(settings);

    // TEST V2: Standard Checkout OAuth Handshake
    if (config.isV2) {
      try {
        const token = await getPhonePeOAuthToken(config);
        if (token) {
          return res.json({
            ok: true,
            authenticated: true,
            protocol: "PhonePe Standard Checkout (V2 OAuth 2.0)",
            environment: config.isSandbox ? "Sandbox (UAT Testing)" : "Live (Production)",
            merchantId: config.mid,
            clientId: config.clientId,
            message: `Successfully authenticated with PhonePe ${
              config.isSandbox ? "Sandbox (UAT)" : "Live (Production)"
            } via OAuth 2.0! Client ID and Client Secret verified.`,
          });
        }
      } catch (v2Err) {
        return res.status(400).json({
          ok: false,
          authenticated: false,
          protocol: "PhonePe Standard Checkout (V2 OAuth 2.0)",
          message: `PhonePe OAuth authentication failed: ${v2Err.message}`,
        });
      }
    }

    // TEST V1: Checksum Handshake
    if (!config.mid || !config.saltKey) {
      return res.status(400).json({
        ok: false,
        message: "Merchant ID and Salt Key (or Client ID & Secret) must be configured before testing.",
      });
    }

    const testTxn = `DCT-PROBE-${Date.now()}`;
    const statusPath = `/pg/v1/status/${config.mid}/${testTxn}`;
    const stringToHash = statusPath + config.saltKey;
    const sha256 = crypto.createHash("sha256").update(stringToHash).digest("hex");
    const xVerify = `${sha256}###${config.saltIndex}`;

    const phonepeRes = await fetch(`${config.baseUrl}${statusPath}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": config.mid,
        accept: "application/json",
      },
    });

    const httpStatus = phonepeRes.status;
    let data = null;
    try {
      data = await phonepeRes.json();
    } catch {}

    const isAuthed =
      httpStatus === 200 ||
      httpStatus === 204 ||
      (data && data.code !== "KEY_NOT_CONFIGURED" && data.code !== "UNAUTHORIZED" && data.code !== "BAD_REQUEST");

    return res.json({
      ok: true,
      authenticated: isAuthed,
      protocol: "PhonePe PG (V1 Checksum)",
      httpStatus,
      environment: config.isSandbox ? "Sandbox (UAT Testing)" : "Live (Production)",
      merchantId: config.mid,
      message: isAuthed
        ? `Successfully connected to PhonePe ${config.isSandbox ? "Sandbox (UAT)" : "Live (Production)"} Gateway! Authentication handshake verified.`
        : `PhonePe API responded with error: ${data?.message || data?.code || "Authentication failed"}. Please check your credentials.`,
      details: data,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: `Failed to connect to PhonePe: ${err.message}` });
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
