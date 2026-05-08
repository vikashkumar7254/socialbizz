import { GoogleGenAI } from "@google/genai";

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function normalizeField(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
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

  if (isRateLimited(clientIp, 20, 15 * 60 * 1000)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const userMessage = normalizeField(req.body?.message, 1000);
  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-10) : [];

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      message:
        "AI chat is not configured yet. Please message us on WhatsApp at +91 89015 09290 or use the contact form, and our team will help you.",
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

    return res.status(200).json({ message: response.text || "Please contact us directly for help with your inquiry." });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Failed to process chat message" });
  }
}
