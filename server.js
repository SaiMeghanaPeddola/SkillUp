/**
 * server.js — minimal Express dev/API server for SkillUp
 *
 * Provides the /api/chat endpoint that proxies to Google Gemini.
 * The GEMINI_API_KEY is read from .env.local (never sent to the browser).
 *
 * Usage:
 *   node server.js          (after creating .env.local)
 *
 * In development run both this and `npm run dev` (Vite proxies /api/* here).
 * The package.json "dev:server" script starts this server.
 */

import "dotenv/config";
import express from "express";
import chatHandler from "./api/chat.js";

const app = express();
const PORT = process.env.API_PORT ?? 3001;

app.use(express.json());

// Allow requests from the Vite dev server origin during development.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.post("/api/chat", chatHandler);

// Health check — useful for verifying the server is running.
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`SkillUp API server running on http://localhost:${PORT}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn(
      "\n⚠️  GEMINI_API_KEY is not set. " +
        "Create .env.local with GEMINI_API_KEY=<your-key>.\n"
    );
  }
});
