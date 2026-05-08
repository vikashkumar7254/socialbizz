import nodemailer from "nodemailer";

const contactRecipient = process.env.CONTACT_TO_EMAIL || "socialbizz.in@gmail.com";
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(clientIp, 5, 15 * 60 * 1000)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const name = normalizeField(req.body?.name, 120);
  const email = normalizeField(req.body?.email, 160);
  const phone = normalizeField(req.body?.phone, 40);
  const service = normalizeField(req.body?.service, 180);
  const message = normalizeField(req.body?.message, 2000);
  const source = normalizeField(req.body?.source, 160);

  if (!name || !isValidEmail(email)) {
    return res.status(400).json({ error: "Valid name and email are required" });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: "Email service is not configured" });
  }

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

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
