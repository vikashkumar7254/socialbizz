import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === "production" || process.env.npm_lifecycle_event === "start";
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

function rateLimit(maxRequests: number, windowMs: number) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const bucket = rateLimitBuckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (bucket.count >= maxRequests) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    bucket.count += 1;
    return next();
  };
}

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

async function sendChatNotification(userMessage: string, history: any[], clientIp: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const transcript = [
    ...history
      .filter((item) => item?.role === "user" || item?.role === "model")
      .map((item) => `${item.role === "user" ? "Visitor" : "Assistant"}: ${normalizeField(item.text, 1000)}`),
    `Visitor: ${userMessage}`,
  ].join("\n\n");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: contactRecipient,
    subject: "New Chat Message from Socialbizz.in",
    text: `New chat message received.\n\nVisitor IP: ${clientIp}\n\n${transcript}`,
    html: `
      <h3>New Chat Message</h3>
      <p><strong>Visitor IP:</strong> ${escapeHtml(clientIp)}</p>
      <pre style="white-space:pre-wrap;font-family:Arial,sans-serif;line-height:1.5">${escapeHtml(transcript)}</pre>
    `,
  });
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: "20kb" }));

  // API Routes
  app.post("/api/contact", rateLimit(30, 15 * 60 * 1000), async (req, res) => {
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

    // Validate required fields
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
        // Note: Set EMAIL_USER and EMAIL_PASS in .env. For Gmail, use an App Password.
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
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
        };

        await transporter.sendMail(mailOptions);
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

    return res.json({ success: true, message: "Lead sent successfully", emailSent, sheetSaved });
  });

  app.post("/api/chat", rateLimit(20, 15 * 60 * 1000), async (req, res) => {
    const userMessage = normalizeField(req.body.message, 1000);
    const history = Array.isArray(req.body.history) ? req.body.history.slice(-10) : [];

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    sendChatNotification(userMessage, history, req.ip || req.socket.remoteAddress || "unknown").catch((error) => {
      console.error("Chat notification email error:", error);
    });

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        message: "AI chat is not configured yet. Please message us on WhatsApp at +91 89015 09290 or use the contact form, and our team will help you.",
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history
            .filter((item) => item?.role === "user" || item?.role === "model")
            .map((item) => ({
              role: item.role,
              parts: [{ text: normalizeField(item.text, 1000) }],
            })),
          { role: "user", parts: [{ text: userMessage }] },
        ],
        config: {
          systemInstruction:
            "You are a helpful assistant for Socialbizz Technologies, a digital marketing and IT services agency in Noida, India. You help clients with SEO, SMO, Web Development, Ads, and Lead Generation. Be professional, friendly, and concise. Encourage users to contact via WhatsApp (+91 89015 09290) or the contact form for detailed inquiries. Our email is socialbizz.in@gmail.com.",
        },
      });

      res.json({ message: response.text || "Please contact us directly for help with your inquiry." });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Vite middleware for development
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
