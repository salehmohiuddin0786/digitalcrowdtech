const express = require("express");
const http = require("http");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const mysql = require("mysql2/promise");
const { DataTypes, Sequelize } = require("sequelize");
require("dotenv").config({ override: true });

const app = express();
const PORT = process.env.PORT || 5000;
const SUPPORT_EMAIL = process.env.CONTACT_TO_EMAIL || "support@digitalcrowdtech.in";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@digitalcrowdtech.in";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || crypto.randomBytes(32).toString("hex");
const DB_NAME = process.env.DB_NAME || "dct";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT || 3306);

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || allowedOrigins[0]);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

const Blog = sequelize.define(
  "Blog",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
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
    location: { type: DataTypes.STRING, allowNull: false },
    experience: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT("long"), allowNull: false },
    status: { type: DataTypes.ENUM("Open", "Closed"), defaultValue: "Open" },
  },
  { tableName: "careers" }
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
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    subject: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT("long"), allowNull: false },
    mailStatus: { type: DataTypes.ENUM("Pending", "Sent", "Failed"), defaultValue: "Pending" },
    mailError: { type: DataTypes.TEXT },
  },
  { tableName: "queries" }
);

const defaultBlogs = [
  {
    id: "blog-1",
    title: "How a modern website helps local businesses win more leads",
    category: "Web Development",
    date: "June 2026",
    excerpt: "A practical look at speed, mobile design, trust signals, and clear calls to action for Indian businesses.",
    content: "Modern websites help customers understand your services quickly, trust your brand, and contact your team without friction.",
    status: "Published",
  },
  {
    id: "blog-2",
    title: "SEO basics every growing brand should fix first",
    category: "SEO",
    date: "June 2026",
    excerpt: "Start with pages, keywords, metadata, local search, and content that answers real customer questions.",
    content: "A good SEO foundation begins with clear page titles, useful content, local listings, and fast mobile performance.",
    status: "Draft",
  },
];

const defaultCareers = [
  {
    id: "career-1",
    title: "Frontend Developer",
    type: "Full Time",
    location: "Hyderabad",
    experience: "1-3 Years",
    description: "Build responsive web interfaces using React, Next.js, and Tailwind CSS.",
    status: "Open",
  },
  {
    id: "career-2",
    title: "UI/UX Designer",
    type: "Full Time",
    location: "Hyderabad / Remote",
    experience: "1-2 Years",
    description: "Design clean, practical web and mobile experiences for business users.",
    status: "Open",
  },
];

const requiredFields = ["name", "email", "subject", "message"];
const sanitize = (value) => String(value || "").trim();
const createId = (prefix) => `${prefix}-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const hashPassword = (password) =>
  crypto.pbkdf2Sync(password, "dct-admin-salt", 100000, 64, "sha512").toString("hex");

const verifyPassword = (password, passwordHash) => hashPassword(password) === passwordHash;

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, message: "Unauthorized admin request." });
  }

  next();
};

const cleanBlogPayload = (body) => ({
  title: sanitize(body.title),
  category: sanitize(body.category),
  date: sanitize(body.date),
  excerpt: sanitize(body.excerpt),
  content: sanitize(body.content),
  status: sanitize(body.status) || "Published",
});

const cleanCareerPayload = (body) => ({
  title: sanitize(body.title),
  type: sanitize(body.type) || "Full Time",
  location: sanitize(body.location),
  experience: sanitize(body.experience),
  description: sanitize(body.description),
  status: sanitize(body.status) || "Open",
});

const hasMissingValues = (payload, fields) => fields.find((field) => !payload[field]);

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || SMTP_PASS === "your_hosting_mail_password_here") {
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

const ensureDatabase = async () => {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await connection.end();
};

const seedDatabase = async () => {
  const blogCount = await Blog.count();
  if (blogCount === 0) {
    await Blog.bulkCreate(defaultBlogs);
  }

  const careerCount = await Career.count();
  if (careerCount === 0) {
    await Career.bulkCreate(defaultCareers);
  }

  const adminUser = await User.findOne({ where: { email: ADMIN_EMAIL } });
  const adminPasswordHash = hashPassword(ADMIN_PASSWORD);

  if (!adminUser) {
    await User.create({
      id: createId("user"),
      email: ADMIN_EMAIL,
      passwordHash: adminPasswordHash,
      role: "admin",
      status: "Active",
    });
    return;
  }

  if (adminUser.passwordHash !== adminPasswordHash || adminUser.role !== "admin") {
    await adminUser.update({ passwordHash: adminPasswordHash, role: "admin", status: "Active" });
  }
};

const toPlainItems = (items) => items.map((item) => item.get({ plain: true }));

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
  });
});

app.post("/api/admin/login", async (req, res) => {
  const email = sanitize(req.body.email);
  const password = String(req.body.password || "");
  const user = await User.findOne({ where: { email, role: "admin", status: "Active" } });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ ok: false, message: "Invalid admin email or password." });
  }

  return res.json({
    ok: true,
    token: ADMIN_TOKEN,
    admin: { email: user.email, role: user.role },
  });
});

app.get("/api/admin/me", requireAdmin, async (req, res) => {
  const user = await User.findOne({ where: { email: ADMIN_EMAIL, role: "admin" } });
  res.json({ ok: true, admin: { email: user?.email || ADMIN_EMAIL, role: "admin" } });
});

app.get("/api/admin/blogs", requireAdmin, async (req, res) => {
  const blogs = await Blog.findAll({ order: [["createdAt", "DESC"]] });
  res.json({ ok: true, items: toPlainItems(blogs) });
});

app.post("/api/admin/blogs", requireAdmin, async (req, res) => {
  const payload = cleanBlogPayload(req.body);
  const missingField = hasMissingValues(payload, ["title", "category", "date", "excerpt", "content"]);

  if (missingField) {
    return res.status(400).json({ ok: false, message: `Please enter blog ${missingField}.` });
  }

  const blog = await Blog.create({ id: createId("blog"), ...payload });
  res.status(201).json({ ok: true, item: blog.get({ plain: true }) });
});

app.put("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
  const payload = cleanBlogPayload(req.body);
  const missingField = hasMissingValues(payload, ["title", "category", "date", "excerpt", "content"]);

  if (missingField) {
    return res.status(400).json({ ok: false, message: `Please enter blog ${missingField}.` });
  }

  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    return res.status(404).json({ ok: false, message: "Blog not found." });
  }

  await blog.update(payload);
  res.json({ ok: true, item: blog.get({ plain: true }) });
});

app.delete("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
  const deletedCount = await Blog.destroy({ where: { id: req.params.id } });

  if (!deletedCount) {
    return res.status(404).json({ ok: false, message: "Blog not found." });
  }

  res.json({ ok: true });
});

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll({ where: { status: "Published" }, order: [["createdAt", "DESC"]] });
  res.json({ ok: true, items: toPlainItems(blogs) });
});

app.get("/api/admin/careers", requireAdmin, async (req, res) => {
  const careers = await Career.findAll({ order: [["createdAt", "DESC"]] });
  res.json({ ok: true, items: toPlainItems(careers) });
});

app.post("/api/admin/careers", requireAdmin, async (req, res) => {
  const payload = cleanCareerPayload(req.body);
  const missingField = hasMissingValues(payload, ["title", "type", "location", "experience", "description"]);

  if (missingField) {
    return res.status(400).json({ ok: false, message: `Please enter career ${missingField}.` });
  }

  const career = await Career.create({ id: createId("career"), ...payload });
  res.status(201).json({ ok: true, item: career.get({ plain: true }) });
});

app.put("/api/admin/careers/:id", requireAdmin, async (req, res) => {
  const payload = cleanCareerPayload(req.body);
  const missingField = hasMissingValues(payload, ["title", "type", "location", "experience", "description"]);

  if (missingField) {
    return res.status(400).json({ ok: false, message: `Please enter career ${missingField}.` });
  }

  const career = await Career.findByPk(req.params.id);

  if (!career) {
    return res.status(404).json({ ok: false, message: "Career opening not found." });
  }

  await career.update(payload);
  res.json({ ok: true, item: career.get({ plain: true }) });
});

app.delete("/api/admin/careers/:id", requireAdmin, async (req, res) => {
  const deletedCount = await Career.destroy({ where: { id: req.params.id } });

  if (!deletedCount) {
    return res.status(404).json({ ok: false, message: "Career opening not found." });
  }

  res.json({ ok: true });
});

app.get("/api/careers", async (req, res) => {
  const careers = await Career.findAll({ where: { status: "Open" }, order: [["createdAt", "DESC"]] });
  res.json({ ok: true, items: toPlainItems(careers) });
});

app.get("/api/admin/queries", requireAdmin, async (req, res) => {
  const queries = await Query.findAll({ order: [["createdAt", "DESC"]] });
  res.json({ ok: true, items: toPlainItems(queries) });
});

app.get("/api/admin/users", requireAdmin, async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "email", "role", "status", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]],
  });
  res.json({ ok: true, items: toPlainItems(users) });
});

app.post("/api/contact", async (req, res) => {
  const payload = {
    name: sanitize(req.body.name),
    email: sanitize(req.body.email),
    phone: sanitize(req.body.phone),
    subject: sanitize(req.body.subject),
    message: sanitize(req.body.message),
  };

  const missingField = requiredFields.find((field) => !payload[field]);

  if (missingField) {
    return res.status(400).json({
      ok: false,
      message: `Please enter your ${missingField}.`,
    });
  }

  if (!isValidEmail(payload.email)) {
    return res.status(400).json({
      ok: false,
      message: "Please enter a valid email address.",
    });
  }

  const query = await Query.create({
    id: createId("query"),
    ...payload,
    mailStatus: "Pending",
  });

  try {
    const transporter = createTransporter();
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    await transporter.sendMail({
      from: `"DigitalCrowdTech Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: SUPPORT_EMAIL,
      replyTo: payload.email,
      subject: `New Quote Query: ${payload.subject}`,
      text: [
        "New quote/contact query from DigitalCrowdTech website",
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone || "Not provided"}`,
        `Subject: ${payload.subject}`,
        `Submitted: ${submittedAt}`,
        "",
        "Message:",
        payload.message,
      ].join("\n"),
      html: `
        <h2>New quote/contact query</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(payload.phone || "Not provided")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
        <p><strong>Submitted:</strong> ${submittedAt}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
      `,
    });

    await query.update({ mailStatus: "Sent", mailError: null });

    return res.json({
      ok: true,
      saved: true,
      mailSent: true,
      queryId: query.id,
      message: "Thank you! Your message was saved and sent successfully. Our team will contact you soon.",
    });
  } catch (error) {
    console.error("Contact email failed:", error.message);
    await query.update({ mailStatus: "Failed", mailError: error.message });

    if (error.code === "SMTP_NOT_CONFIGURED") {
      return res.status(500).json({
        ok: false,
        message: "Mail is not configured yet. Please add SMTP details in Backend/.env.",
      });
    }

    return res.status(500).json({
      ok: false,
      message: "Sorry, we could not send your query right now. Please call us or email support@digitalcrowdtech.in.",
    });
  }
});

const server = http.createServer(app);
global.digitalCrowdTechServer = server;

server.on("error", (error) => {
  console.error("Backend server error:", error.message);
  process.exitCode = 1;
});

server.on("close", () => {
  console.warn("Backend server closed.");
});

const startServer = async () => {
  await ensureDatabase();
  await sequelize.authenticate();
  await sequelize.sync();
  await seedDatabase();

  server.listen(PORT, () => {
    console.log(`DigitalCrowdTech backend running on http://localhost:${PORT}`);
    console.log(`Database connected: ${DB_NAME}`);

    if (!isMailConfigured()) {
      console.warn("Mail is not configured. Add hosting SMTP details in Backend/.env.");
    }
  });
};

startServer().catch((error) => {
  console.error("Failed to start backend:", error.message);
  process.exit(1);
});

setInterval(() => {}, 60 * 60 * 1000);
