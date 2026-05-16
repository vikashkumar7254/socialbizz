import nodemailer from "nodemailer";

const contactRecipient = process.env.CONTACT_TO_EMAIL || "socialbizz.in@gmail.com";
const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

type LeadPayload = {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  source: string;
  message: string;
  raw: Record<string, string>;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeField(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizePayload(body: Record<string, unknown> | undefined) {
  const raw: Record<string, string> = {};

  for (const [key, value] of Object.entries(body ?? {})) {
    raw[key] = normalizeField(value, 2000);
  }

  return raw;
}

function isRateLimited(key: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (bucket.count >= maxRequests) {
    return true;
  }

  bucket.count += 1;
  return false;
}

async function saveLeadToGoogleSheet(lead: LeadPayload) {
  if (!googleSheetsWebhookUrl) return;

  const response = await fetch(googleSheetsWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets webhook failed with ${response.status}`);
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(clientIp, 30, 15 * 60 * 1000)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const raw = normalizePayload(req.body);
  const name = normalizeField(raw.name, 120);
  const email = normalizeField(raw.email, 160);
  const phone = normalizeField(raw.phone, 40);
  const service = normalizeField(raw.service, 180);
  const message = normalizeField(raw.message, 2000);
  const source = normalizeField(raw.source, 160);
  const lead: LeadPayload = {
    timestamp: new Date().toISOString(),
    name,
    email,
    phone,
    service,
    source,
    message,
    raw,
  };

  if (!name || !isValidEmail(email)) {
    return res.status(400).json({ error: "Valid name and email are required" });
  }

  const canSendEmail = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

  if (!canSendEmail && !googleSheetsWebhookUrl) {
    return res.status(500).json({ error: "Lead capture is not configured" });
  }

  let emailSent = false;
  let sheetSaved = false;
  const errors: unknown[] = [];

  if (canSendEmail) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        replyTo: email,
        to: contactRecipient,
        subject: `New Lead from Socialbizz.in - ${source || "Contact Form"}`,
        text: `
New Inquiry Details:
-------------------
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service || "Not specified"}
Source: ${source || "General Contact"}

Message:
${message || "No message provided"}
      `,
        html: `
        <h3>New Inquiry Details</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || "Not specified")}</p>
        <p><strong>Source:</strong> ${escapeHtml(source || "General Contact")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message || "No message provided")}</p>
      `,
      });
      emailSent = true;
    } catch (error) {
      errors.push(error);
      console.error("Error sending email:", error);
    }
  }

  if (googleSheetsWebhookUrl) {
    try {
      await saveLeadToGoogleSheet(lead);
      sheetSaved = true;
    } catch (error) {
      errors.push(error);
      console.error("Google Sheets lead save error:", error);
    }
  }

  if (!emailSent && !sheetSaved) {
    console.error("Lead capture failed:", errors);
    return res.status(500).json({ error: "Failed to submit inquiry" });
  }

  return res.status(200).json({ success: true, message: "Lead sent successfully", emailSent, sheetSaved });
}
