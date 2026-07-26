import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiAvailable: !!process.env.GEMINI_API_KEY });
});

// AI Assistant Chat Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, customerContext } = req.body;
    const client = getGeminiClient();

    if (!client) {
      // Graceful fallback if GEMINI_API_KEY is not configured
      return res.json({
        reply: `[Demo Mode] Here is an automated response for your query: "${message}". To enable live AI intelligence, configure GEMINI_API_KEY in Secrets.`,
        sources: [],
      });
    }

    const systemInstruction = `You are "RetentionPro AI", an expert Customer Success and Retention Advisor.
You analyze customer churn risks, Customer Lifetime Value (CLV), SHAP factor drivers, and provide actionable, executive-ready retention advice.
Be concise, clear, data-driven, and supportive. Use bullet points and bold highlights for key recommendations.
Customer Context if provided: ${JSON.stringify(customerContext || {})}`;

    const response = await client.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || "I have analyzed your request. No further churn risks detected.",
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Failed to generate AI response",
      details: error.message || String(error),
    });
  }
});

// AI Strategy Generation Route for a Customer
app.post("/api/ai-strategy", async (req, res) => {
  try {
    const { customer } = req.body;
    const client = getGeminiClient();

    if (!client) {
      return res.json({
        strategy: `Likely to churn due to technical issues and pricing friction. Recommend immediate outreach via Personal Account Manager with a custom retention offer.`,
        suggestedActions: [
          "Offer 20% renewal discount for 12 months",
          "Schedule executive technical review meeting",
          "Provide priority 24/7 support tier",
        ],
      });
    }

    const prompt = `Analyze this customer for retention strategy:
Name: ${customer.name}
ID: ${customer.id}
Segment: ${customer.segment}
Churn Probability: ${customer.churnProb}%
CLV: $${customer.clv.toLocaleString()}
Top Risk Factors: ${JSON.stringify(customer.riskFactors)}
Recent Activity: ${customer.recentNote || "Decreased logins by 40% in last 14 days."}

Provide a short, 2-sentence executive summary diagnosis and 3 bullet point actions.`;

    const response = await client.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a senior VP of Customer Retention.",
      },
    });

    res.json({
      strategy: response.text,
    });
  } catch (error: any) {
    console.error("Strategy API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Churn Risk Simulation Route
app.post("/api/simulate-churn", async (req, res) => {
  try {
    const { supportTickets, daysToRenewal, weeklyLogins, featureUsage, csatScore } = req.body;
    
    // Calculate algorithmic base risk score
    let baseRisk = 15;
    baseRisk += (supportTickets || 0) * 8;
    if (daysToRenewal < 90) baseRisk += (90 - daysToRenewal) * 0.4;
    baseRisk -= (weeklyLogins || 0) * 2;
    baseRisk -= (featureUsage || 0) * 0.5;
    baseRisk -= (csatScore || 5) * 6;

    const churnProb = Math.min(Math.max(Math.round(baseRisk), 3), 98);

    const client = getGeminiClient();
    let aiNote = "";

    if (client) {
      const prompt = `Simulation Inputs:
- Support Tickets (30d): ${supportTickets}
- Days to Contract Renewal: ${daysToRenewal}
- Weekly Logins: ${weeklyLogins}
- Feature Usage Rate: ${featureUsage}%
- CSAT Score: ${csatScore}/10
Calculated Churn Probability: ${churnProb}%

Write a 1-sentence AI explanation of why the risk is ${churnProb > 50 ? "HIGH" : churnProb > 25 ? "MEDIUM" : "LOW"}.`;

      try {
        const resp = await client.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
        });
        aiNote = resp.text || "";
      } catch (err) {
        aiNote = "AI analysis completed based on parameters.";
      }
    } else {
      aiNote = `Calculated risk based on ${supportTickets} support tickets, ${daysToRenewal} days to renewal, and ${featureUsage}% usage rate.`;
    }

    res.json({
      churnProb,
      aiNote,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
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
    console.log(`RetentionPro AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
