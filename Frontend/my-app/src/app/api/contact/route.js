import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name || body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const service = String(body.service || body.projectType || "Business Website").trim();
    const budget = String(body.budget || "Under ₹10,000").trim();
    const businessName = String(body.businessName || body.company || "").trim();
    const message = String(body.message || "").trim();
    const source = String(body.source || (body.projectType || body.fullName ? "Portfolio" : "Website")).trim();

    if (!name) {
      return NextResponse.json({ ok: false, message: "Please enter your name." }, { status: 400 });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
    }
    if (!phone || phone.length < 8) {
      return NextResponse.json({ ok: false, message: "Please enter a valid phone number." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ ok: false, message: "Please describe your project (at least 10 characters)." }, { status: 400 });
    }

    const newQuery = {
      id: `query-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      businessName,
      email,
      phone,
      service,
      budget,
      subject: `${service} Inquiry - ${name}`,
      message,
      source,
      status: "New",
      mailStatus: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Try forwarding to local Express backend if available
    try {
      const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5001";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const backendRes = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          name,
          businessName,
          service,
          source,
          budget,
          message,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json(data);
      }
    } catch {
      // Backend not running, fallback to persistent JSON storage in Backend/data
    }

    // Persistent storage fallback in project directory
    try {
      const dataDir = path.resolve(process.cwd(), "..", "..", "Backend", "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const queriesFile = path.join(dataDir, "queries.json");
      let existing = [];
      if (fs.existsSync(queriesFile)) {
        try {
          existing = JSON.parse(fs.readFileSync(queriesFile, "utf-8")) || [];
        } catch {
          existing = [];
        }
      }
      existing.unshift(newQuery);
      fs.writeFileSync(queriesFile, JSON.stringify(existing, null, 2), "utf-8");
    } catch (saveErr) {
      console.warn("Local query file save notice:", saveErr.message);
    }

    return NextResponse.json({
      ok: true,
      saved: true,
      queryId: newQuery.id,
      message: "Thank you! Your enquiry has been received. We'll get back to you within one business day.",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "An unexpected error occurred. Please contact us directly." },
      { status: 500 }
    );
  }
}
