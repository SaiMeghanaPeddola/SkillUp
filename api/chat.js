/**
 * Server-side handler for POST /api/chat
 *
 * Calls the Google Gemini REST API using the key stored in GEMINI_API_KEY.
 * The key NEVER reaches the browser — this module only runs on the server.
 *
 * Expected request body:
 *   { question: string, level: string, topic: string }
 *
 * Response body on success:
 *   { answer: string }
 *
 * Response body on error:
 *   { error: string }
 */

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function chatHandler(req, res) {
  const { question, level, topic } = req.body ?? {};

  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "question is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error:
        "GEMINI_API_KEY is not configured on the server. " +
        "Create a .env.local file with GEMINI_API_KEY=<your-key>.",
    });
  }

  // Build a system-style prompt so Gemini responds as an educational tutor.
  const systemPrompt =
    `You are SkillUp AI Tutor, a friendly and knowledgeable educational assistant. ` +
    `The student's learning level is ${level ?? "Beginner"} and their current topic is ${topic ?? "General"}. ` +
    `Give a clear, concise, well-structured answer. Use plain text only — no markdown symbols like **, ##, or *.` +
    ` Keep the response under 200 words unless a longer answer is genuinely needed.`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nStudent question: ${question.trim()}` }],
      },
    ],
  };

  try {
    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
      const errBody = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errBody);
      return res.status(502).json({
        error: `AI service returned an error (${geminiRes.status}). Please try again.`,
      });
    }

    const data = await geminiRes.json();
    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't generate a response. Please try again.";

    return res.json({ answer });
  } catch (err) {
    console.error("Gemini fetch failed:", err);
    return res.status(503).json({
      error: "Could not reach the AI service. Check your network connection.",
    });
  }
}

export default chatHandler;
