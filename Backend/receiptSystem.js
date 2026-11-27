/**
 * receiptSystem.js — Digital Crowd Technologies
 * Automated payment receipt generation, PDF creation, and email delivery.
 * Idempotent: safe to call multiple times for the same order.
 */

"use strict";

require("dotenv").config({ override: true });
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

// ─── Storage ───────────────────────────────────────────────────────────────
const RECEIPTS_DIR = path.join(__dirname, "storage", "receipts");
if (!fs.existsSync(RECEIPTS_DIR)) {
  fs.mkdirSync(RECEIPTS_DIR, { recursive: true });
}

// ─── Branding ──────────────────────────────────────────────────────────────
const BRAND = {
  navy:    "#0B1220",
  blue:    "#3B82F6",
  orange:  "#F97316",
  green:   "#22C55E",
  darkText:"#1E293B",
  midText: "#475569",
  lightBg: "#F8FAFC",
  border:  "#E2E8F0",
  company: "Digital Crowd Technologies",
  address: "Madhapur, Hyderabad – 500081, Telangana",
  support: "support@digitalcrowdtech.in",
  phone:   "+91 9985960692",
  website: "https://digitalcrowdtech.in",
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtCurrency(amount) {
  return "₹" + Number(amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

function fmtDate(d) {
  const date = d ? new Date(d) : new Date();
  return date.toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
  }) + " IST";
}

function generateId() {
  return "rcpt-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}

// ─── Sequelize Model (injected via init) ───────────────────────────────────
let PaymentReceipt = null;

function initModel(sequelize, DataTypes) {
  PaymentReceipt = sequelize.define(
    "PaymentReceipt",
    {
      id:                   { type: DataTypes.STRING, primaryKey: true },
      receiptNumber:        { type: DataTypes.STRING, allowNull: false, unique: true },
      orderId:              { type: DataTypes.STRING, allowNull: false, unique: true },
      orderNumber:          { type: DataTypes.STRING, allowNull: false },
      customerEmail:        { type: DataTypes.STRING },
      customerName:         { type: DataTypes.STRING },
      productTitle:         { type: DataTypes.STRING },
      planName:             { type: DataTypes.STRING },
      amount:               { type: DataTypes.DECIMAL(10, 2) },
      originalAmount:       { type: DataTypes.DECIMAL(10, 2) },
      discountAmount:       { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
      couponCode:           { type: DataTypes.STRING },
      currency:             { type: DataTypes.STRING, defaultValue: "INR" },
      transactionId:        { type: DataTypes.STRING },
      utrNumber:            { type: DataTypes.STRING },
      pdfPath:              { type: DataTypes.STRING },
      pdfFilename:          { type: DataTypes.STRING },
      status: {
        type: DataTypes.ENUM("PENDING", "GENERATED", "FAILED"),
        defaultValue: "PENDING",
      },
      customerEmailStatus: {
        type: DataTypes.ENUM("PENDING", "SENT", "FAILED"),
        defaultValue: "PENDING",
      },
      customerEmailSentAt:  { type: DataTypes.DATE },
      customerEmailError:   { type: DataTypes.TEXT },
      adminEmailStatus: {
        type: DataTypes.ENUM("PENDING", "SENT", "FAILED"),
        defaultValue: "PENDING",
      },
      adminEmailSentAt:     { type: DataTypes.DATE },
      adminEmailError:      { type: DataTypes.TEXT },
      emailRetryCount:      { type: DataTypes.INTEGER, defaultValue: 0 },
      resendLog:            { type: DataTypes.TEXT },
    },
    { tableName: "payment_receipts" }
  );
  return PaymentReceipt;
}

// ─── Receipt Number Generator ───────────────────────────────────────────────
async function generateReceiptNumber() {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = Math.random().toString(36).toUpperCase().slice(2, 8).padEnd(6, "0");
    const number = `DCT-RCPT-${today}-${suffix}`;
    const existing = await PaymentReceipt.findOne({ where: { receiptNumber: number } });
    if (!existing) return number;
  }
  // Ultimate fallback
  return `DCT-RCPT-${today}-${Date.now().toString(36).toUpperCase()}`;
}

// ─── PDF Generator ─────────────────────────────────────────────────────────
async function generateReceiptPDF(order, receipt) {
  return new Promise((resolve, reject) => {
    try {
      const filename = `${receipt.receiptNumber}.pdf`;
      const pdfPath = path.join(RECEIPTS_DIR, filename);

      const doc = new PDFDocument({
        size: "A4",
        margin: 0,
        info: {
          Title: `Receipt ${receipt.receiptNumber}`,
          Author: BRAND.company,
          Subject: `Payment Receipt for ${order.orderNumber}`,
        },
      });

      const buffers = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        try {
          fs.writeFileSync(pdfPath, Buffer.concat(buffers));
          resolve({ pdfPath, pdfFilename: filename });
        } catch (writeErr) {
          reject(writeErr);
        }
      });
      doc.on("error", reject);

      const pageW = doc.page.width;   // 595
      const pageH = doc.page.height;  // 842
      const margin = 48;
      const contentW = pageW - margin * 2;

      // ── Background ──────────────────────────────────────────────────────
      doc.rect(0, 0, pageW, pageH).fill("#FFFFFF");

      // ── Navy Header Bar ─────────────────────────────────────────────────
      doc.rect(0, 0, pageW, 110).fill(BRAND.navy);

      // ── Orange accent line ───────────────────────────────────────────────
      doc.rect(0, 110, pageW, 4).fill(BRAND.orange);

      // ── Company name ─────────────────────────────────────────────────────
      doc.font("Helvetica-Bold").fontSize(22).fillColor("#FFFFFF")
        .text(BRAND.company, margin, 30, { width: contentW - 120 });

      doc.font("Helvetica").fontSize(10).fillColor("#94A3B8")
        .text(BRAND.website, margin, 58);

      // ── PAID badge (top right) ────────────────────────────────────────────
      const badgeX = pageW - margin - 90;
      const badgeY = 25;
      doc.roundedRect(badgeX, badgeY, 90, 30, 6).fill(BRAND.green);
      doc.font("Helvetica-Bold").fontSize(13).fillColor("#FFFFFF")
        .text("✓  PAID", badgeX, badgeY + 8, { width: 90, align: "center" });

      // ── RECEIPT label ─────────────────────────────────────────────────────
      doc.font("Helvetica-Bold").fontSize(11).fillColor("#94A3B8")
        .text("PAYMENT RECEIPT", margin, 75);

      // ── Blue card: receipt info ───────────────────────────────────────────
      let y = 130;
      doc.rect(margin, y, contentW, 70).fill(BRAND.blue);

      const col1 = margin + 16;
      const col2 = margin + contentW / 2;

      doc.font("Helvetica").fontSize(9).fillColor("rgba(255,255,255,0.75)")
        .text("RECEIPT NUMBER", col1, y + 10)
        .text("ORDER NUMBER", col2, y + 10);

      doc.font("Helvetica-Bold").fontSize(12).fillColor("#FFFFFF")
        .text(receipt.receiptNumber, col1, y + 23)
        .text(order.orderNumber, col2, y + 23);

      doc.font("Helvetica").fontSize(9).fillColor("rgba(255,255,255,0.75)")
        .text("PAYMENT DATE", col1, y + 42)
        .text("TRANSACTION ID", col2, y + 42);

      doc.font("Helvetica").fontSize(10).fillColor("#FFFFFF")
        .text(fmtDate(order.updatedAt || new Date()), col1, y + 54)
        .text(order.transactionId || "—", col2, y + 54);

      y += 90;

      // ── Helper to draw a section ─────────────────────────────────────────
      function section(title, rows, startY) {
        // Section heading
        doc.font("Helvetica-Bold").fontSize(10).fillColor(BRAND.blue)
          .text(title.toUpperCase(), margin, startY);
        doc.moveTo(margin, startY + 14).lineTo(margin + contentW, startY + 14)
          .strokeColor(BRAND.border).lineWidth(1).stroke();

        let rowY = startY + 20;
        const labelW = 165;
        for (const [label, value] of rows) {
          doc.font("Helvetica").fontSize(10).fillColor(BRAND.midText)
            .text(label, margin, rowY, { width: labelW });
          doc.font("Helvetica").fontSize(10).fillColor(BRAND.darkText)
            .text(String(value || "—"), margin + labelW, rowY, { width: contentW - labelW });
          rowY += 18;
        }
        return rowY + 10;
      }

      // ── Customer Info ────────────────────────────────────────────────────
      y = section("Customer Information", [
        ["Full Name",        order.customerName || "—"],
        ["Email Address",    order.customerEmail || "—"],
        ["Phone Number",     order.customerPhone || "—"],
        ["Company / Org.",   order.companyName || "—"],
        ["Address",          order.address || "—"],
      ], y);

      // ── Purchase Details ─────────────────────────────────────────────────
      y = section("Purchase Details", [
        ["Service / Product", order.productTitle || "—"],
        ["Plan / Package",    order.planName || "Standard License"],
        ["Coupon Code",       order.couponCode || "None"],
      ], y);

      // ── Payment Summary (table-style) ─────────────────────────────────────
      doc.font("Helvetica-Bold").fontSize(10).fillColor(BRAND.blue)
        .text("PAYMENT SUMMARY", margin, y);
      doc.moveTo(margin, y + 14).lineTo(margin + contentW, y + 14)
        .strokeColor(BRAND.border).lineWidth(1).stroke();
      y += 20;

      const colA = margin;
      const colB = margin + contentW - 110;
      const lineH = 20;

      function summaryRow(label, value, bold, colorVal) {
        doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(10)
          .fillColor(bold ? BRAND.darkText : BRAND.midText)
          .text(label, colA, y, { width: 200 });
        doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(10)
          .fillColor(colorVal || (bold ? BRAND.darkText : BRAND.midText))
          .text(value, colB, y, { width: 110, align: "right" });
        y += lineH;
      }

      const originalAmt = Number(order.originalAmount || order.amount);
      const discountAmt  = Number(order.discountAmount || 0);
      const finalAmt     = Number(order.amount);

      summaryRow("Original Price", fmtCurrency(originalAmt), false);
      if (discountAmt > 0) {
        summaryRow("Discount Applied", "– " + fmtCurrency(discountAmt), false, BRAND.green);
      }

      // Divider line
      doc.moveTo(colB, y).lineTo(margin + contentW, y).strokeColor(BRAND.border).lineWidth(0.5).stroke();
      y += 6;

      summaryRow("TOTAL PAID", fmtCurrency(finalAmt), true, BRAND.orange);

      doc.rect(colB - 8, y - lineH * 1.5, 118, lineH + 10).fill("#FFF7ED");

      y += 16;

      // UTR
      if (order.utrNumber) {
        doc.font("Helvetica").fontSize(9).fillColor(BRAND.midText)
          .text(`UTR Number: ${order.utrNumber}`, margin, y);
        y += 14;
      }

      // ── Footer ────────────────────────────────────────────────────────────
      const footerY = pageH - 80;
      doc.rect(0, footerY, pageW, 80).fill(BRAND.navy);

      doc.font("Helvetica-Bold").fontSize(10).fillColor("#FFFFFF")
        .text(BRAND.company, margin, footerY + 12, { width: contentW, align: "center" });

      doc.font("Helvetica").fontSize(9).fillColor("#94A3B8")
        .text(`${BRAND.address}`, margin, footerY + 28, { width: contentW, align: "center" });

      doc.font("Helvetica").fontSize(9).fillColor("#94A3B8")
        .text(`Support: ${BRAND.support}  |  Phone: ${BRAND.phone}`, margin, footerY + 42, { width: contentW, align: "center" });

      doc.font("Helvetica").fontSize(8).fillColor("#64748B")
        .text("This is an electronically generated receipt and does not require a signature.", margin, footerY + 58, { width: contentW, align: "center" });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ─── Customer Email HTML ────────────────────────────────────────────────────
function buildCustomerEmailHTML(order, receipt) {
  const orderUrl = `${BRAND.website}/order-confirmation?orderNumber=${encodeURIComponent(order.orderNumber)}`;
  const originalAmt = Number(order.originalAmount || order.amount);
  const discountAmt  = Number(order.discountAmount || 0);
  const finalAmt     = Number(order.amount);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Payment Confirmed – ${escHtml(order.orderNumber)}</title></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F1F5F9;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:#0B1220;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
    <div style="font-size:24px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">${escHtml(BRAND.company)}</div>
    <div style="font-size:13px;color:#94A3B8;margin-top:4px;">${BRAND.website}</div>
    <div style="display:inline-block;margin-top:16px;padding:8px 24px;background:#22C55E;border-radius:20px;font-size:14px;font-weight:700;color:#FFFFFF;">✓ Payment Confirmed</div>
  </td></tr>

  <!-- Orange accent -->
  <tr><td style="background:#F97316;height:4px;padding:0;line-height:4px;font-size:0;">&nbsp;</td></tr>

  <!-- Body -->
  <tr><td style="background:#FFFFFF;padding:36px 40px;">

    <h2 style="margin:0 0 8px 0;font-size:22px;color:#0B1220;">Hi ${escHtml(order.customerName)},</h2>
    <p style="margin:0 0 24px 0;font-size:15px;color:#475569;line-height:1.6;">
      Your payment of <strong style="color:#F97316;">${fmtCurrency(finalAmt)}</strong> has been verified and your order is confirmed.
      A PDF receipt is attached to this email for your records.
    </p>

    <!-- Receipt card -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;margin-bottom:28px;">
      <tr><td style="background:#3B82F6;padding:14px 20px;border-radius:10px 10px 0 0;">
        <span style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.75);letter-spacing:1px;">RECEIPT NUMBER</span><br>
        <span style="font-size:16px;font-weight:800;color:#FFFFFF;">${escHtml(receipt.receiptNumber)}</span>
      </td></tr>
      <tr><td style="padding:20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding:6px 0;font-size:14px;color:#64748B;width:170px;">Order Number</td>
            <td style="padding:6px 0;font-size:14px;color:#1E293B;font-weight:600;">${escHtml(order.orderNumber)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:14px;color:#64748B;">Service</td>
            <td style="padding:6px 0;font-size:14px;color:#1E293B;font-weight:600;">${escHtml(order.productTitle)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:14px;color:#64748B;">Plan</td>
            <td style="padding:6px 0;font-size:14px;color:#1E293B;">${escHtml(order.planName || "Standard License")}</td>
          </tr>
          ${discountAmt > 0 ? `
          <tr>
            <td style="padding:6px 0;font-size:14px;color:#64748B;">Discount</td>
            <td style="padding:6px 0;font-size:14px;color:#22C55E;font-weight:600;">– ${fmtCurrency(discountAmt)}${order.couponCode ? ` (${escHtml(order.couponCode)})` : ""}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:10px 0 6px 0;font-size:14px;color:#64748B;border-top:1px solid #E2E8F0;">Transaction ID</td>
            <td style="padding:10px 0 6px 0;font-size:13px;color:#1E293B;border-top:1px solid #E2E8F0;font-family:monospace;">${escHtml(order.transactionId || "—")}</td>
          </tr>
          ${order.utrNumber ? `<tr>
            <td style="padding:6px 0;font-size:14px;color:#64748B;">UTR Number</td>
            <td style="padding:6px 0;font-size:13px;color:#1E293B;font-family:monospace;">${escHtml(order.utrNumber)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:10px 0 0 0;font-size:16px;font-weight:800;color:#1E293B;border-top:1px solid #E2E8F0;">Total Paid</td>
            <td style="padding:10px 0 0 0;font-size:18px;font-weight:800;color:#F97316;border-top:1px solid #E2E8F0;">${fmtCurrency(finalAmt)}</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- CTA Button -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      <tr><td align="center">
        <a href="${orderUrl}" style="display:inline-block;padding:14px 36px;background:#3B82F6;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:700;border-radius:8px;">View Your Order →</a>
      </td></tr>
    </table>

    <p style="font-size:14px;color:#475569;line-height:1.6;margin:0 0 16px 0;">
      Our team at Madhapur, Hyderabad is now preparing your staging environment, deployment walkthrough, and full source code handover.
      You'll receive a follow-up within 24 hours.
    </p>
    <p style="font-size:14px;color:#475569;line-height:1.6;margin:0;">
      If you have any questions, reply to this email or reach us at
      <a href="mailto:${BRAND.support}" style="color:#3B82F6;">${BRAND.support}</a> or
      <a href="tel:${BRAND.phone.replace(/\s/g,"")}" style="color:#3B82F6;">${BRAND.phone}</a>.
    </p>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#0B1220;padding:24px 40px;border-radius:0 0 12px 12px;text-align:center;">
    <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#FFFFFF;">${escHtml(BRAND.company)}</p>
    <p style="margin:0 0 6px 0;font-size:12px;color:#94A3B8;">${BRAND.address}</p>
    <p style="margin:0;font-size:12px;color:#64748B;">
      <a href="mailto:${BRAND.support}" style="color:#94A3B8;">${BRAND.support}</a> | ${BRAND.phone}
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Admin Email HTML ───────────────────────────────────────────────────────
function buildAdminEmailHTML(order, receipt) {
  const adminUrl = `${BRAND.website}/admin/orders`;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Payment – ${escHtml(order.orderNumber)}</title></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F1F5F9;padding:24px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

  <tr><td style="background:#0B1220;border-radius:10px 10px 0 0;padding:24px 32px;text-align:center;">
    <div style="font-size:18px;font-weight:800;color:#FFFFFF;">${escHtml(BRAND.company)}</div>
    <div style="margin-top:10px;padding:6px 18px;display:inline-block;background:#22C55E;border-radius:16px;font-size:13px;font-weight:700;color:#FFFFFF;">💰 New Payment Received</div>
  </td></tr>
  <tr><td style="background:#F97316;height:3px;padding:0;font-size:0;">&nbsp;</td></tr>

  <tr><td style="background:#FFFFFF;padding:28px 32px;">
    <h3 style="margin:0 0 20px 0;font-size:16px;color:#0B1220;">Payment Summary</h3>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E2E8F0;border-radius:8px;">
      <tr style="background:#F8FAFC;">
        <td style="padding:10px 16px;font-size:13px;color:#64748B;width:160px;">Receipt #</td>
        <td style="padding:10px 16px;font-size:13px;color:#1E293B;font-weight:700;">${escHtml(receipt.receiptNumber)}</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#64748B;border-top:1px solid #E2E8F0;">Order #</td>
        <td style="padding:10px 16px;font-size:13px;color:#1E293B;border-top:1px solid #E2E8F0;">${escHtml(order.orderNumber)}</td>
      </tr>
      <tr style="background:#F8FAFC;">
        <td style="padding:10px 16px;font-size:13px;color:#64748B;border-top:1px solid #E2E8F0;">Customer</td>
        <td style="padding:10px 16px;font-size:13px;color:#1E293B;border-top:1px solid #E2E8F0;">${escHtml(order.customerName)} &lt;${escHtml(order.customerEmail)}&gt;</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#64748B;border-top:1px solid #E2E8F0;">Phone</td>
        <td style="padding:10px 16px;font-size:13px;color:#1E293B;border-top:1px solid #E2E8F0;">${escHtml(order.customerPhone || "—")}</td>
      </tr>
      <tr style="background:#F8FAFC;">
        <td style="padding:10px 16px;font-size:13px;color:#64748B;border-top:1px solid #E2E8F0;">Service</td>
        <td style="padding:10px 16px;font-size:13px;color:#1E293B;border-top:1px solid #E2E8F0;">${escHtml(order.productTitle)} – ${escHtml(order.planName || "Standard")}</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#64748B;border-top:1px solid #E2E8F0;">Transaction ID</td>
        <td style="padding:10px 16px;font-size:13px;color:#1E293B;border-top:1px solid #E2E8F0;font-family:monospace;">${escHtml(order.transactionId || "—")}</td>
      </tr>
      ${order.utrNumber ? `<tr style="background:#F8FAFC;">
        <td style="padding:10px 16px;font-size:13px;color:#64748B;border-top:1px solid #E2E8F0;">UTR</td>
        <td style="padding:10px 16px;font-size:13px;color:#1E293B;border-top:1px solid #E2E8F0;font-family:monospace;">${escHtml(order.utrNumber)}</td>
      </tr>` : ""}
      <tr style="${order.utrNumber ? "background:#F8FAFC;" : ""}">
        <td style="padding:12px 16px;font-size:15px;font-weight:800;color:#1E293B;border-top:1px solid #E2E8F0;">Amount</td>
        <td style="padding:12px 16px;font-size:18px;font-weight:800;color:#F97316;border-top:1px solid #E2E8F0;">${fmtCurrency(order.amount)}</td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
      <tr><td align="center">
        <a href="${adminUrl}" style="display:inline-block;padding:12px 28px;background:#3B82F6;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:700;border-radius:7px;">View in Admin Dashboard →</a>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="background:#0B1220;padding:16px 32px;border-radius:0 0 10px 10px;text-align:center;">
    <p style="margin:0;font-size:12px;color:#64748B;">${escHtml(BRAND.company)} · Admin Notification</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Plain Text Fallback ────────────────────────────────────────────────────
function buildPlainText(order, receipt) {
  return [
    `${BRAND.company} – Payment Receipt`,
    "=".repeat(50),
    `Receipt Number : ${receipt.receiptNumber}`,
    `Order Number   : ${order.orderNumber}`,
    `Customer       : ${order.customerName} <${order.customerEmail}>`,
    `Service        : ${order.productTitle} – ${order.planName || "Standard"}`,
    `Amount Paid    : ${fmtCurrency(order.amount)}`,
    `Transaction ID : ${order.transactionId || "—"}`,
    order.utrNumber ? `UTR Number     : ${order.utrNumber}` : "",
    "",
    `View your order: ${BRAND.website}/order-confirmation?orderNumber=${order.orderNumber}`,
    "",
    `Support: ${BRAND.support} | ${BRAND.phone}`,
    BRAND.address,
  ].filter((l) => l !== undefined).join("\n");
}

// ─── Mail Transporter ───────────────────────────────────────────────────────
function getTransporter() {
  const host  = process.env.SMTP_HOST;
  const port  = Number(process.env.SMTP_PORT || 465);
  const user  = process.env.SMTP_USER;
  const pass  = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE !== "false";

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

function isMailReady() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER &&
    (process.env.SMTP_PASSWORD || process.env.SMTP_PASS));
}

// ─── Main: processPaymentSuccess ───────────────────────────────────────────
/**
 * Idempotent handler — call after every successful PhonePe confirmation.
 * Returns the PaymentReceipt record (existing or newly created).
 */
async function processPaymentSuccess(order, transactionId, utr) {
  if (!PaymentReceipt) {
    throw new Error("receiptSystem not initialised — call receiptSystem.init(sequelize, DataTypes) first");
  }

  // 1. Idempotency check
  const existing = await PaymentReceipt.findOne({ where: { orderId: order.id } });
  if (existing) {
    console.log(`[receipts] Existing receipt ${existing.receiptNumber} for order ${order.orderNumber}`);
    return existing;
  }

  // 2. Generate receipt number
  const receiptNumber = await generateReceiptNumber();
  const receiptId = generateId();

  // 3. Create record (status: PENDING)
  const receipt = await PaymentReceipt.create({
    id:            receiptId,
    receiptNumber,
    orderId:       order.id,
    orderNumber:   order.orderNumber,
    customerEmail: order.customerEmail,
    customerName:  order.customerName,
    productTitle:  order.productTitle,
    planName:      order.planName,
    amount:        order.amount,
    originalAmount:order.originalAmount,
    discountAmount:order.discountAmount || 0,
    couponCode:    order.couponCode,
    currency:      order.currency || "INR",
    transactionId: transactionId || order.transactionId,
    utrNumber:     utr || order.utrNumber,
    status:        "PENDING",
  });

  // 4. Generate PDF
  let pdfResult = null;
  try {
    pdfResult = await generateReceiptPDF(order, receipt);
    await receipt.update({ status: "GENERATED", pdfPath: pdfResult.pdfPath, pdfFilename: pdfResult.pdfFilename });
    console.log(`[receipts] PDF generated: ${pdfResult.pdfFilename}`);
  } catch (pdfErr) {
    console.warn("[receipts] PDF generation failed:", pdfErr.message);
    await receipt.update({ status: "FAILED" });
  }

  // 5. Send customer email
  if (isMailReady()) {
    try {
      const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "support@digitalcrowdtech.in";
      const transporter = getTransporter();
      const mailOpts = {
        from:    `"${BRAND.company}" <${fromEmail}>`,
        to:      order.customerEmail,
        subject: `✅ Payment Confirmed – Receipt ${receiptNumber} | ${order.orderNumber}`,
        html:    buildCustomerEmailHTML(order, receipt),
        text:    buildPlainText(order, receipt),
      };
      if (pdfResult && fs.existsSync(pdfResult.pdfPath)) {
        mailOpts.attachments = [{
          filename: pdfResult.pdfFilename,
          path:     pdfResult.pdfPath,
          contentType: "application/pdf",
        }];
      }
      await transporter.sendMail(mailOpts);
      await receipt.update({ customerEmailStatus: "SENT", customerEmailSentAt: new Date() });
      console.log(`[receipts] Customer email sent to ${order.customerEmail}`);
    } catch (mailErr) {
      console.warn("[receipts] Customer email failed:", mailErr.message);
      await receipt.update({ customerEmailStatus: "FAILED", customerEmailError: mailErr.message });
    }
  }

  // 6. Send admin email
  const adminTo = process.env.CONTACT_TO_EMAIL || process.env.ADMIN_EMAIL || "support@digitalcrowdtech.in";
  if (isMailReady()) {
    try {
      const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "support@digitalcrowdtech.in";
      const transporter = getTransporter();
      const adminOpts = {
        from:    `"${BRAND.company} Payments" <${fromEmail}>`,
        to:      adminTo,
        subject: `💰 New Payment: ${fmtCurrency(order.amount)} – ${order.orderNumber}`,
        html:    buildAdminEmailHTML(order, receipt),
        text:    `New payment received.\nOrder: ${order.orderNumber}\nCustomer: ${order.customerName}\nAmount: ${fmtCurrency(order.amount)}\nReceipt: ${receiptNumber}`,
      };
      if (pdfResult && fs.existsSync(pdfResult.pdfPath)) {
        adminOpts.attachments = [{
          filename: pdfResult.pdfFilename,
          path:     pdfResult.pdfPath,
          contentType: "application/pdf",
        }];
      }
      await transporter.sendMail(adminOpts);
      await receipt.update({ adminEmailStatus: "SENT", adminEmailSentAt: new Date() });
      console.log(`[receipts] Admin email sent to ${adminTo}`);
    } catch (adminMailErr) {
      console.warn("[receipts] Admin email failed:", adminMailErr.message);
      await receipt.update({ adminEmailStatus: "FAILED", adminEmailError: adminMailErr.message });
    }
  }

  await receipt.reload();
  return receipt;
}

// ─── Resend Receipt Email ───────────────────────────────────────────────────
/**
 * @param {string} receiptId
 * @param {"customer"|"admin"} type
 * @param {object} [adminUser]
 */
async function resendReceiptEmail(receiptId, type, adminUser) {
  const receipt = await PaymentReceipt.findByPk(receiptId);
  if (!receipt) throw new Error("Receipt not found");
  if (!isMailReady()) throw new Error("Mail is not configured on this server");

  // Load order-like object from receipt fields
  const order = {
    id:            receipt.orderId,
    orderNumber:   receipt.orderNumber,
    customerName:  receipt.customerName,
    customerEmail: receipt.customerEmail,
    productTitle:  receipt.productTitle,
    planName:      receipt.planName,
    amount:        receipt.amount,
    originalAmount:receipt.originalAmount,
    discountAmount:receipt.discountAmount,
    couponCode:    receipt.couponCode,
    transactionId: receipt.transactionId,
    utrNumber:     receipt.utrNumber,
  };

  // Regenerate PDF if missing
  if (!receipt.pdfPath || !fs.existsSync(receipt.pdfPath)) {
    try {
      const pdfResult = await generateReceiptPDF(order, receipt);
      await receipt.update({ status: "GENERATED", pdfPath: pdfResult.pdfPath, pdfFilename: pdfResult.pdfFilename });
    } catch (e) {
      console.warn("[receipts] PDF regen failed on resend:", e.message);
    }
  }

  const transporter = getTransporter();
  const attachment = receipt.pdfPath && fs.existsSync(receipt.pdfPath)
    ? [{ filename: receipt.pdfFilename, path: receipt.pdfPath, contentType: "application/pdf" }]
    : [];

  const resendEntry = {
    at: new Date().toISOString(),
    type,
    by: adminUser?.email || "admin",
  };

  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "support@digitalcrowdtech.in";
  if (type === "customer") {
    await transporter.sendMail({
      from:    `"${BRAND.company}" <${fromEmail}>`,
      to:      receipt.customerEmail,
      subject: `✅ Payment Receipt – ${receipt.receiptNumber} | ${receipt.orderNumber}`,
      html:    buildCustomerEmailHTML(order, receipt),
      text:    buildPlainText(order, receipt),
      attachments: attachment,
    });
    await receipt.update({ customerEmailStatus: "SENT", customerEmailSentAt: new Date() });
  } else {
    const adminTo = process.env.CONTACT_TO_EMAIL || process.env.ADMIN_EMAIL || "support@digitalcrowdtech.in";
    await transporter.sendMail({
      from:    `"${BRAND.company} Payments" <${fromEmail}>`,
      to:      adminTo,
      subject: `💰 Payment Receipt (Resend): ${receipt.orderNumber}`,
      html:    buildAdminEmailHTML(order, receipt),
      text:    `Resent admin receipt for order ${receipt.orderNumber}.`,
      attachments: attachment,
    });
    await receipt.update({ adminEmailStatus: "SENT", adminEmailSentAt: new Date() });
  }

  // Append to resend log
  let log = [];
  try { log = JSON.parse(receipt.resendLog || "[]"); } catch {}
  log.push(resendEntry);
  await receipt.update({ resendLog: JSON.stringify(log) });

  return receipt;
}

// ─── Regenerate PDF only ────────────────────────────────────────────────────
async function regeneratePDF(receiptId) {
  const receipt = await PaymentReceipt.findByPk(receiptId);
  if (!receipt) throw new Error("Receipt not found");

  const order = {
    id:            receipt.orderId,
    orderNumber:   receipt.orderNumber,
    customerName:  receipt.customerName,
    customerEmail: receipt.customerEmail,
    productTitle:  receipt.productTitle,
    planName:      receipt.planName,
    amount:        receipt.amount,
    originalAmount:receipt.originalAmount,
    discountAmount:receipt.discountAmount,
    couponCode:    receipt.couponCode,
    transactionId: receipt.transactionId,
    utrNumber:     receipt.utrNumber,
  };

  const pdfResult = await generateReceiptPDF(order, receipt);
  await receipt.update({ status: "GENERATED", pdfPath: pdfResult.pdfPath, pdfFilename: pdfResult.pdfFilename });
  return receipt;
}

// ─── Exports ────────────────────────────────────────────────────────────────
module.exports = {
  /**
   * Call once during server startup, after sequelize.sync().
   */
  init(sequelize, DataTypes) {
    return initModel(sequelize, DataTypes);
  },

  /** Returns the Sequelize model (after init). */
  get model() { return PaymentReceipt; },

  processPaymentSuccess,
  resendReceiptEmail,
  regeneratePDF,
  generateReceiptPDF,
  RECEIPTS_DIR,
};
