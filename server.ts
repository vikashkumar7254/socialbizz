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
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

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

async function startServer() {
  const app = express();

  app.use(express.json({ limit: "20kb" }));

  // API Routes
  app.post("/api/contact", rateLimit(5, 15 * 60 * 1000), async (req, res) => {
    const name = normalizeField(req.body.name, 120);
    const email = normalizeField(req.body.email, 160);
    const phone = normalizeField(req.body.phone, 40);
    const service = normalizeField(req.body.service, 180);
    const message = normalizeField(req.body.message, 2000);
    const source = normalizeField(req.body.source, 160);

    // Validate required fields
    if (!name || !isValidEmail(email)) {
      return res.status(400).json({ error: "Valid name and email are required" });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ error: "Email service is not configured" });
    }

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
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  app.post("/api/chat", rateLimit(20, 15 * 60 * 1000), async (req, res) => {
    const userMessage = normalizeField(req.body.message, 1000);
    const history = Array.isArray(req.body.history) ? req.body.history.slice(-10) : [];

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

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
