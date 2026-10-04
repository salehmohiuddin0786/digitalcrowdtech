const express = require("express");
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

const { defaultBlogs, defaultCareers, defaultProjects } = require("./defaultData");

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

const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  "http://localhost:3000,http://localhost:3001,https://digitalcrowdtech.in"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""));

app.use(express.json({ limit: "5mb" }));

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && (allowedOrigins.includes(origin) || allowedOrigins.includes("*"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

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

const authLimiter = createRateLimiter(5, 15 * 60 * 1000, "Too many login attempts. Please wait 15 minutes before trying again.");
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
    technologies: { type: DataTypes.TEXT, defaultValue: "[]" },
    features: { type: DataTypes.TEXT, defaultValue: "[]" },
    liveUrl: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING },
    caseStudyUrl: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM("Published", "Draft"), defaultValue: "Published" },
  },
  { tableName: "projects" }
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

// Admin Authentication with Bcrypt & JWT
app.post("/api/admin/login", authLimiter, async (req, res) => {
  const email = sanitize(req.body.email).toLowerCase();
  const password = String(req.body.password || "");

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ where: { email, role: "admin", status: "Active" } });

    let isPasswordValid = false;
    if (user) {
      isPasswordValid = await verifyPassword(password, user.passwordHash);
    }

    // Fallback bootstrap credentials check
    if (!isPasswordValid && email === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      return res.status(401).json({ ok: false, message: "Invalid admin email or password." });
    }

    // Upgrade legacy hash to bcrypt on successful login if needed
    if (user && !user.passwordHash.startsWith("$2")) {
      const upgradedHash = await hashPassword(password);
      await user.update({ passwordHash: upgradedHash });
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
    return res.status(500).json({ ok: false, message: "Authentication service error." });
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
      order: [["date", "DESC"]],
    });
    return res.json({ ok: true, items: toPlainItems(blogs) });
  } catch {
    return res.json({ ok: true, items: defaultBlogs });
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
      order: [["createdAt", "ASC"]],
    });
    return res.json({ ok: true, items: toPlainItems(projects) });
  } catch {
    return res.json({ ok: true, items: defaultProjects });
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

// Start Server
const server = http.createServer(app);

const startServer = async () => {
  await ensureDatabase();
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // Ensure newly introduced schema columns exist safely
    await sequelize.query("ALTER TABLE `queries` ADD COLUMN `source` VARCHAR(255) DEFAULT 'Website';").catch(() => {});
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
