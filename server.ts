import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Create the Gemini client only when a key is configured.
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
    });
  }
  return aiClient;
}

// Try the configured models in order when Gemini temporarily rejects a request.
async function callGeminiWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
    models?: string[];
  }
) {
  const models = params.models || [
    "gemini-3.7-flash",
    "gemini-flash-latest",
    "gemini-3.1-flash-lite",
  ];

  let lastError: any = null;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const isTransient =
        err?.status === "UNAVAILABLE" ||
        err?.code === 503 ||
        err?.code === 429 ||
        err?.status === 503 ||
        err?.message?.includes("503") ||
        err?.message?.includes("high demand") ||
        err?.message?.includes("RESOURCE_EXHAUSTED") ||
        err?.message?.includes("overloaded");

      console.warn(`Gemini model ${model} attempt ${i + 1}/${models.length} failed:`, err?.message || err);

      if (isTransient && i < models.length - 1) {
        // Short jitter before trying alternative fallback model
        await new Promise((resolve) => setTimeout(resolve, 300));
        continue;
      }
    }
  }

  throw lastError;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "BharatVerse" });
  });

  // Story generation
  app.post("/api/ai/story", async (req, res) => {
    try {
      const { topic, category, state, tone } = req.body;
      const ai = getAI();

      if (!ai) {
        // Demo response for local runs without a Gemini key.
        return res.json({
          title: `The Living Chronicles of ${topic || "Indian Heritage"}`,
          narrative: `In the sacred soil of ${state || "Bharat"}, ${topic || "this timeless marvel"} stands as a testament to millennia of architectural genius, spiritual devotion, and artistic triumph. Built during a golden epoch where stone met poetry, every carved pillar whispers tales of ancient dynasties, celestial dancers, and visionary master sculptors whose hands shaped eternity.`,
          historicalContext: `Dating back through dynastic annals, this monumental legacy bridges centuries of civilizational grandeur, rooted in the classical Shastras and patronized by visionary rulers.`,
          artisanSecrets: [
            "Crafted using ancient dry-stone interlocking masonry without modern mortar.",
            "Intricate astronomical alignments designed to capture the solstice rays at dawn.",
            "Sacred geometry adhering to the proportions defined in the Vastu Vidya."
          ],
          audioNarrationScript: `Welcome, seeker of stories. Today, we step across centuries to witness ${topic || "a magnificent treasure of India"}, where art and legend intertwine...`,
          funFacts: [
            "Preserved across dynastic shifts and celebrated in classical poetry.",
            "Features motifs that have inspired Indian classical textiles and temple art for over 800 years."
          ]
        });
      }

      const prompt = `You are a renowned Indian cultural historian, art curator, and master storyteller for "BharatVerse - Explore the Soul of India".
Generate an evocative, deeply researched, and captivating narrative about:
Topic: ${topic}
Category: ${category || "Monument / Art / Craft / Tradition"}
Region/State: ${state || "India"}
Tone: ${tone || "Evocative, scholarly yet enchanting"}

Return STRICT JSON with the following schema:
{
  "title": "A poetic evocative title for this heritage wonder",
  "narrative": "A rich 3-4 paragraph immersive story detailing its origins, legend, architectural/artistic brilliance, and cultural soul.",
  "historicalContext": "Key historical era, ruling dynasty, patrons, and timeline details.",
  "artisanSecrets": ["3 specific, fascinating technical or architectural secrets of this craft/monument"],
  "audioNarrationScript": "A lyrical 60-second voiceover narration script that an audio guide would speak to a traveler standing in front of it.",
  "funFacts": ["2 lesser-known astonishing cultural facts"]
}`;

      const response = await callGeminiWithFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "{}";
      const cleanJson = responseText.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleanJson);
      return res.json(parsed);
    } catch (error: any) {
      console.warn("AI Story generation fallback invoked:", error?.message || error);
      const { topic, state } = req.body || {};
      return res.json({
        title: `The Living Chronicles of ${topic || "Indian Heritage"}`,
        narrative: `In the sacred soil of ${state || "Bharat"}, ${topic || "this timeless marvel"} stands as a testament to millennia of architectural genius, spiritual devotion, and artistic triumph. Built during a golden epoch where stone met poetry, every carved pillar whispers tales of ancient dynasties, celestial dancers, and visionary master sculptors whose hands shaped eternity.`,
        historicalContext: `Dating back through dynastic annals, this monumental legacy bridges centuries of civilizational grandeur, rooted in the classical Shastras and patronized by visionary rulers.`,
        artisanSecrets: [
          "Crafted using ancient dry-stone interlocking masonry without modern mortar.",
          "Intricate astronomical alignments designed to capture the solstice rays at dawn.",
          "Sacred geometry adhering to the proportions defined in the Vastu Vidya."
        ],
        audioNarrationScript: `Welcome, seeker of stories. Today, we step across centuries to witness ${topic || "a magnificent treasure of India"}, where art and legend intertwine...`,
        funFacts: [
          "Preserved across dynastic shifts and celebrated in classical poetry.",
          "Features motifs that have inspired Indian classical textiles and temple art for over 800 years."
        ]
      });
    }
  });

  // API Route: Cultural Sage & Living Artisan AI Guide ("Acharya Vani")
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { messages, userQuery, context } = req.body;
      const query = (userQuery || "").trim();
      const ai = getAI();

      const systemInstruction = `You are Sage AI (Acharya Vani), a warm, highly knowledgeable, and versatile guide on all aspects of Indian culture, heritage, lifestyle, and travel. You answer all questions directly with practical details across all domains including:
- Cuisine & Local Food: Direct recommendations for regional foods, spicy dishes (e.g., Andhra curries, Chettinad, Kolhapuri), iconic eateries, and local culinary traditions.
- Performing Arts & Music: Deep insights into classical dances (Bharatanatyam, Kathak, Kathakali), hand mudras, carnatic/hindustani music, folk performances, and where to experience them.
- History, Architecture & Crafts: Detailed explanations of ancient monuments, temple acoustics, Chola bronzes, GI-tagged handicrafts (Rogan art, Kalamkari, Pochampally), and historical lore.
- Travel & Exploration: Actionable guidance on top cultural spots, festival schedules, and regional highlights across all 28 states and 8 UTs.

STRICT RESPONSE STYLE & CONCISENESS CONSTRAINTS:
1. Avoid Information Heavy Text: Keep responses punchy, light, and easy to skim. Never output dense walls of text or long essays.
2. Length Limit: Keep overall answers brief (2–3 short paragraphs maximum OR 3–4 crisp bullet points).
3. Scannable Layout: Use **bold text** for key names, dishes, places, or dates, and bullet points for lists so the user quickly gets actionable answers.
4. Dynamic Suggestions: Provide 3-4 crisp, highly relevant contextual follow-up questions for the "suggestions" array based on the user's specific query.`;

      if (!ai) {
        // Dynamic smart fallback if API key is not configured
        const qLower = query.toLowerCase();
        let fallbackReply = "";
        let fallbackSuggestions = [
          "What are the spiciest regional dishes across India?",
          "Explain the mudras in Bharatanatyam and Kathakali",
          "How are Chola bronzes and Bidriware crafted?",
          "What are the top heritage spots in Rajasthan and Kerala?",
        ];
        let sanskritTerm = "";

        if (qLower.includes("food") || qLower.includes("cuisine") || qLower.includes("spic") || qLower.includes("curry") || qLower.includes("dish") || qLower.includes("eat") || qLower.includes("andhra") || qLower.includes("chettinad") || qLower.includes("kolhapuri")) {
          fallbackReply = `Indian culinary heritage is celebrated for its masterful spice alchemies and regional distinctions:

- **Andhra & Rayalaseema**: Renowned for fiery **Gongura Mutton**, **Natu Kodi Pulusu**, and dry red-chili **Podi** with hot ghee.
- **Chettinad (Tamil Nadu)**: Famous for sun-dried spices, star anise, and stone-ground **Chettinad Pepper Chicken**.
- **Kolhapur (Maharashtra)**: Iconic for chili-infused **Tambada Rassa** (red curry) and aromatic **Pandhra Rassa** (white bone broth).
- **Awadhi & Mughlai**: Subtle perfumed slow-cooked **Dum Biryanis** and **Galouti Kebabs** infused with cardamom and rose petals.`;
          fallbackSuggestions = [
            "What makes Andhra Gongura so uniquely sour and spicy?",
            "What is the history of Chettinad spice trade?",
            "Tell me about Kolhapuri Tambada & Pandhra Rassa",
            "Which state has the best traditional vegetarian thali?"
          ];
          sanskritTerm = "रस (Rasa) — The six sacred tastes of Ayurvedic gastronomy";
        } else if (qLower.includes("dance") || qLower.includes("music") || qLower.includes("mudra") || qLower.includes("bharatanatyam") || qLower.includes("kathak") || qLower.includes("carnatic")) {
          fallbackReply = `Classical Indian performing arts originate from Bharata Muni’s **Natya Shastra**:

- **Bharatanatyam (Tamil Nadu)**: Geometric footwork (*Nritta*), emotive storytelling (*Abhinaya*), and intricate single-hand (*Asamyuta*) mudras like **Pataka** and **Tripataka**.
- **Kathak (North India)**: Fluid spins (*Chakkars*), crisp footwork with ankle bells (*Ghungroos*), and rhythmic *Tatkar*.
- **Kathakali (Kerala)**: Grand stylized facial makeup, epic Mahabharata drama, and powerful eye movements (*Netra Abhinaya*).
- **Music Traditions**: **Carnatic** (rhythmic *Kriti* compositions) and **Hindustani** (microtonal *Ragas* and emotive *Khayals*).`;
          fallbackSuggestions = [
            "Explain the 28 single-hand mudras of Bharatanatyam",
            "What is the difference between Carnatic and Hindustani music?",
            "Where to watch live Kathakali performances in Kerala?",
            "What do the colors in Kathakali makeup symbolize?"
          ];
          sanskritTerm = "नाट्य (Natya) — The confluence of dramatic dance, music, and emotion";
        } else if (qLower.includes("craft") || qLower.includes("monument") || qLower.includes("temple") || qLower.includes("acoustic") || qLower.includes("chola") || qLower.includes("rogan") || qLower.includes("kalamkari")) {
          fallbackReply = `India holds extraordinary architectural and artisanal marvels:

- **Vittala Temple (Hampi)**: 56 carved granite **Musical Pillars** that resonate at natural frequencies when lightly tapped.
- **Chola Bronzes (Thanjavur)**: Crafted via the ancient **Lost-Wax (Cire Perdue)** casting method, epitomized by the cosmic **Nataraja**.
- **Kutch Rogan Art (Gujarat)**: 400-year-old technique where boiled castor oil paste is drawn onto fabric using a metal stylus without touching the cloth.
- **Srikalahasti Kalamkari (Andhra)**: Organic vegetable-dyed mythic murals created using sharpened bamboo pens.`;
          fallbackSuggestions = [
            "How do Hampi's musical pillars generate musical notes?",
            "What is the lost-wax technique in Chola bronze casting?",
            "How is castor oil paste processed in Rogan art?",
            "What are the best GI-tagged textile trails in India?"
          ];
          sanskritTerm = "शिल्प (Shilpa) — The sacred mastery of craft, geometry, and sculpture";
        } else {
          fallbackReply = `Namaste! As **Acharya Vani**, I am delighted to guide your exploration of Indian culture:

- **Cuisine & Flavors**: From fiery **Andhra curries** and **Chettinad roasts** to royal **Awadhi delicacies** and coastal Malabar seafood.
- **Arts & Music**: 8 classical dance forms, sacred hand mudras, **Carnatic** and **Hindustani** musical ragas.
- **Heritage & Crafts**: UNESCO stone wonders, acoustic temple sanctums, and GI-certified crafts like **Pashmina**, **Kalamkari**, and **Bidriware**.
- **Travel Trails**: Curated journeys across all **28 States and 8 Union Territories**.`;
          fallbackSuggestions = [
            "Recommend the best spicy regional dishes across India",
            "Tell me about the secret acoustic pillars of Hampi",
            "What are the top heritage spots in Rajasthan & Tamil Nadu?",
            "Explain the mudras in classical Indian dance"
          ];
          sanskritTerm = "संस्कृति (Sanskriti) — Refined culture and living civilizational heritage";
        }

        return res.json({
          reply: fallbackReply,
          suggestions: fallbackSuggestions,
          sanskritEtymology: sanskritTerm,
        });
      }

      const conversationHistory = Array.isArray(messages)
        ? messages.slice(-6).map((m: any) => `${m.role === "user" ? "User" : "Acharya Vani"}: ${m.content}`).join("\n")
        : "";

      const prompt = `${conversationHistory ? `Conversation history:\n${conversationHistory}\n\n` : ""}User query: ${query}

Respond as Sage AI (Acharya Vani) adhering strictly to the constraints:
- Answer directly and with high practical detail.
- Keep the response short, light, punchy, and scannable (2–3 short paragraphs OR 3–4 bullet points with bold keywords).
- Provide 3–4 highly relevant, contextual follow-up questions in the "suggestions" array.
- Provide a relevant Sanskrit root term in "sanskritEtymology" if applicable.

Return ONLY valid JSON matching this schema:
{
  "reply": "Your brief, punchy, scannable response with **bold keywords** and bullet points.",
  "suggestions": ["Follow-up question 1", "Follow-up question 2", "Follow-up question 3"],
  "sanskritEtymology": "Optional Sanskrit root term and short translation (e.g. 'रस (Rasa) — Essential aesthetic taste or juice')"
}`;

      const response = await callGeminiWithFallback(ai, {
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "{}";
      const cleanJson = responseText.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      return res.json({
        reply: parsed.reply || `Namaste! Regarding your query on **${query}**, India's rich traditions offer deep insights into regional heritage, arts, and lifestyle.`,
        suggestions: Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0
          ? parsed.suggestions
          : [
              "Tell me more about traditional regional foods",
              "What are the iconic classical art forms here?",
              "What are the must-visit heritage monuments?",
            ],
        sanskritEtymology: parsed.sanskritEtymology || undefined,
      });
    } catch (error: any) {
      console.error("AI Chat error:", error);
      const query = req.body?.userQuery || "Indian culture";
      return res.json({
        reply: `Namaste! India's living heritage regarding **${query}** spans centuries of exquisite traditions, regional nuances, and time-honored artisanal mastery.\n\n- **Regional Specialties**: Each state brings unique flavors, craft lineages, and architectural styles.\n- **Living Traditions**: Handed down through generations of master practitioners and folklore.\n- **Exploration**: Ask me about specific regional foods, classical dance mudras, or temple architecture!`,
        suggestions: [
          "What are the spiciest dishes in South India?",
          "Explain the acoustic secrets of Vittala Temple",
          "What is the story behind Chola bronze casting?",
          "Plan a 5-day heritage trip in Rajasthan"
        ],
        sanskritEtymology: "ज्ञान (Jnana) — Deep experiential knowledge and wisdom",
      });
    }
  });

  // API Route: Custom Heritage Trail & Itinerary Planner
  app.post("/api/ai/itinerary", async (req, res) => {
    try {
      const {
        destination,
        region,
        days,
        durationDays,
        interests,
        travelStyle,
        travelStyles,
        budget,
      } = req.body;

      const targetDestination = destination || region || "Rajasthan";
      const targetDays = Number(durationDays || days || 5);
      const targetInterests = Array.isArray(interests)
        ? interests.join(", ")
        : Array.isArray(travelStyles)
        ? travelStyles.join(", ")
        : travelStyles || interests || travelStyle || "Living Crafts & Master Artisans, Ancient Temples & Sacred Architecture";
      const targetBudget = budget || "Comfort Heritage";

      const ai = getAI();

      if (!ai) {
        return res.json({
          title: `${targetDays}-Day Heritage & Living Culture Trail in ${targetDestination}`,
          destination: targetDestination,
          durationDays: targetDays,
          summary: `An enriching expedition tailored through ${targetDestination} discovering ancient stone sanctuaries, UNESCO heritage monuments, GI-tagged artisan craft guilds, and authentic regional culinary feasts.`,
          dailySchedule: Array.from({ length: targetDays }, (_, i) => ({
            day: i + 1,
            title: i === 0
              ? "Arrival & Historic Imperial Quarters"
              : i === 1
              ? "Sacred Architecture & Living Craft Guilds"
              : i === 2
              ? "Folk Rhythms, Epic Legends & Traditional Bazaars"
              : i === 3
              ? "Countryside Villages & Heritage Sanctuaries"
              : `Deep Cultural Immersion & Artisanal Masterpieces (Part ${i + 1})`,
            morning: "Dawn architectural decoding tour of iconic stone monuments and ancient sanctums.",
            afternoon: "Curated masterclass with State/National Award-winning heritage artisans in their ancestral studios.",
            evening: "Sunset musical soiree featuring regional folk or classical ragas and heritage garden walks.",
            artisanHighlight: "UNESCO / GI-tagged textile weaving and traditional handloom collective",
            culinaryDelight: "Authentic slow-cooked thali prepared with cold-pressed oils, heirloom grains, and regional spices",
          })),
          culturalEtiquette: [
            "Dress respectfully with covered shoulders and knees at all sacred shrines and monuments.",
            "Remove footwear before entering temple sanctums and artisan workspace courtyards.",
            "Always seek permission before photographing master artisans and sacred rituals.",
            "Support local heritage ecosystems by purchasing directly from certified artisan cooperatives.",
          ],
        });
      }

      const prompt = `You are a renowned Indian cultural historian and master tour architect.
Create an authentic, culturally deep, day-by-day travel itinerary for a traveler exploring India.

Destination / State: ${targetDestination}
Duration: ${targetDays} Days
Travel Interests & Styles: ${targetInterests}
Budget Tier: ${targetBudget}

Return ONLY valid JSON in this exact structure without markdown backticks:
{
  "title": "Evocative, inspiring title for this trail",
  "destination": "${targetDestination}",
  "durationDays": ${targetDays},
  "summary": "Compelling 2-3 sentence overview of this cultural journey through ${targetDestination}",
  "dailySchedule": [
    {
      "day": 1,
      "title": "Day 1 Theme and Focus",
      "morning": "Detailed morning activity (monument, temple, or historical site with architectural context)",
      "afternoon": "Detailed afternoon activity (craft guild, museum, or workshop experience)",
      "evening": "Detailed evening activity (cultural performance, sunset vista, or bazaar walk)",
      "artisanHighlight": "Specific GI-tagged craft, art form, or artisan community in this area",
      "culinaryDelight": "Authentic regional culinary delicacy or beverage to savor"
    }
  ],
  "culturalEtiquette": [
    "3-4 practical, respectful cultural and travel tips for this specific state/region"
  ]
}`;

      const response = await callGeminiWithFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const cleanJson = (response.text || "{}").replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      // Normalize fields if model returned alternative naming
      const schedule = parsed.dailySchedule || (parsed.days && parsed.days.map((d: any, idx: number) => ({
        day: d.day || d.dayNumber || idx + 1,
        title: d.title || d.theme || `Day ${idx + 1} Exploration`,
        morning: d.morning || (Array.isArray(d.highlights) ? d.highlights[0] : "Morning monument and heritage exploration"),
        afternoon: d.afternoon || (Array.isArray(d.highlights) ? d.highlights[1] : "Afternoon artisan workshop visit"),
        evening: d.evening || (Array.isArray(d.highlights) ? d.highlights[2] : "Evening cultural immersion and sunset"),
        artisanHighlight: d.artisanHighlight || d.artisanSpotlight || "Traditional GI artisan craft guild",
        culinaryDelight: d.culinaryDelight || d.culinaryMustTry || "Traditional regional delicacy",
      }))) || [];

      const etiquette = parsed.culturalEtiquette || parsed.tips || [
        "Dress respectfully when visiting sanctums and sacred heritage sites.",
        "Support local communities by purchasing authentic GI-tagged crafts.",
        "Ask permission before photographing rituals and craftspeople at work.",
      ];

      return res.json({
        title: parsed.title || `${targetDays}-Day Heritage Trail in ${targetDestination}`,
        destination: targetDestination,
        durationDays: targetDays,
        summary: parsed.summary || `A curated expedition uncovering the heritage, artisan lineages, and cuisine of ${targetDestination}.`,
        dailySchedule: schedule.length > 0 ? schedule : Array.from({ length: targetDays }, (_, i) => ({
          day: i + 1,
          title: `Day ${i + 1}: Cultural Splendors`,
          morning: "Explore renowned historical monuments and sacred architecture.",
          afternoon: "Visit living craft studios and witness master artisans at work.",
          evening: "Experience evening cultural arts and traditional night markets.",
          artisanHighlight: "Heritage handloom and traditional folk arts",
          culinaryDelight: "Signature regional delicacies and herbal refreshments",
        })),
        culturalEtiquette: etiquette,
      });
    } catch (error: any) {
      console.error("AI Itinerary error:", error);
      const targetDestination = req.body?.destination || req.body?.region || "India";
      const targetDays = Number(req.body?.durationDays || req.body?.days || 5);

      return res.json({
        title: `${targetDays}-Day Heritage Trail in ${targetDestination}`,
        destination: targetDestination,
        durationDays: targetDays,
        summary: `A carefully designed expedition through the monuments, master craftsmen, and flavors of ${targetDestination}.`,
        dailySchedule: Array.from({ length: targetDays }, (_, i) => ({
          day: i + 1,
          title: i === 0 ? "Arrival & Historical Heritage" : i === 1 ? "Sacred Shrines & Craft Quarters" : `Cultural Immersion & Regional Wonders (Day ${i + 1})`,
          morning: "Guided exploration of ancient architectural wonders and historic royal quarters.",
          afternoon: "Interactive demonstration with master artisans preserving centuries-old craft traditions.",
          evening: "Evening cultural recital, illuminated heritage walk, and regional dinner feast.",
          artisanHighlight: "Award-winning craft cooperative and GI-certified artisanal workshop",
          culinaryDelight: "Authentic multi-course regional feast showcasing local spices and heirloom recipes",
        })),
        culturalEtiquette: [
          "Maintain modest attire when visiting temple sanctums and heritage monuments.",
          "Seek consent before taking portraits of artisans and cultural practitioners.",
          "Always buy crafts directly from certified weaver and artisan cooperatives.",
        ],
      });
    }
  });

  // API Route: Dynamic Heritage Quiz generator
  app.post("/api/ai/quiz", async (req, res) => {
    try {
      const { category, difficulty } = req.body;
      const ai = getAI();

      if (!ai) {
        return res.json({
          questions: [
            {
              question: "Which Indian temple is renowned for its musical stone pillars that produce distinct musical notes when tapped?",
              options: ["Brihadisvara Temple, Thanjavur", "Vittala Temple, Hampi", "Konark Sun Temple, Odisha", "Meenakshi Temple, Madurai"],
              correctIndex: 1,
              explanation: "The Vittala Temple in Hampi, Karnataka features 56 musical pillars (SaReGaMa pillars) built in the 16th century under the Vijayanagara Empire.",
              heritageFact: "British engineers were so astonished that they cut two pillars open to inspect for hollow metal pipes, only to discover solid granite!"
            },
            {
              question: "The GI-tagged Rogan art of Kutch, Gujarat uses paint uniquely prepared from which natural ingredient?",
              options: ["Mustard oil and clay", "Boiled castor seed oil and natural pigments", "Turmeric and rice paste", "Beeswax and safflower"],
              correctIndex: 1,
              explanation: "Rogan art involves boiling castor oil for over 48 hours until it forms a thick jelly-like paste, blended with mineral pigments and applied using an iron stylus.",
              heritageFact: "Only one single family in Nirona village, Gujarat preserves the authentic 400-year-old Rogan art technique today."
            }
          ]
        });
      }

      const prompt = `Generate 3 brilliant, engaging multiple-choice trivia questions on Indian Cultural Heritage.
Category: ${category || "Mixed (Monuments, Crafts, Dance, Folklore, Architecture)"}
Difficulty: ${difficulty || "Medium"}

Return strict JSON:
{
  "questions": [
    {
      "question": "Clear, fascinating question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Why this answer is correct and historical context",
      "heritageFact": "An astonishing lesser-known trivia fact"
    }
  ]
}`;

      const response = await callGeminiWithFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      });

      const cleanJson = (response.text || "{}").replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleanJson);
      return res.json(parsed);
    } catch (error: any) {
      console.warn("AI Quiz fallback invoked:", error?.message || error);
      return res.json({
        questions: [
          {
            question: "Which Indian temple is renowned for its 56 musical stone pillars that resonate when tapped?",
            options: ["Brihadisvara Temple, Thanjavur", "Vittala Temple, Hampi", "Konark Sun Temple, Odisha", "Meenakshi Temple, Madurai"],
            correctIndex: 1,
            explanation: "The Vittala Temple in Hampi, Karnataka features 56 musical pillars built in the 16th century under the Vijayanagara Empire.",
            heritageFact: "British engineers once cut two pillars open to inspect for hollow resonant metal pipes, only to find solid granite!"
          },
          {
            question: "The GI-tagged Rogan art of Kutch, Gujarat uses paint uniquely prepared from which natural ingredient?",
            options: ["Mustard oil and clay", "Boiled castor seed oil and mineral pigments", "Turmeric and rice paste", "Beeswax and safflower"],
            correctIndex: 1,
            explanation: "Rogan art involves boiling castor oil for over 48 hours until it forms a thick jelly-like paste, blended with mineral pigments and applied using a metal stylus.",
            heritageFact: "Only a single family in Nirona village, Gujarat preserves the authentic 400-year-old Rogan art lineage today."
          },
          {
            question: "Which classical Indian dance form is celebrated for dramatic facial makeup, eye gestures, and the green-painted Paccha character archetype?",
            options: ["Kathak", "Kathakali", "Bharatanatyam", "Odissi"],
            correctIndex: 1,
            explanation: "Kathakali from Kerala utilizes specialized facial pigments where Paccha (green) symbolizes nobility and divine heroes.",
            heritageFact: "Kathakali performers train their facial and eye muscles for years using Ayurvedic ghee eye treatments."
          }
        ]
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BharatVerse Server running on port ${PORT}`);
  });
}

startServer();
