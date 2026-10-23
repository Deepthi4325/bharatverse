import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  User,
  Volume2,
  VolumeX,
  Loader2,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import Markdown from "react-markdown";
import { speakNarrative } from "../utils/audioSynth";

interface SageAIProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "sage";
  content: string;
  sanskritEtymology?: string;
  suggestions?: string[];
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  "What are the spiciest traditional regional dishes in India?",
  "Explain the hand mudras in Bharatanatyam & Kathakali",
  "Tell me about the acoustic musical pillars of Hampi",
  "How is 400-year-old Rogan art created in Kutch using castor oil?",
];

export const SageAI: React.FC<SageAIProps> = ({
  isOpen,
  onClose,
  initialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "sage",
      content:
        "**Namaste!** I am **Acharya Vani**, your living guide through the rich civilizational heritage, cuisines, performing arts, architecture, and lifestyle of Bharat.\n\nWhether you wish to explore **fiery regional curries**, decode **temple acoustics & mudras**, or discover **ancient GI-tagged craft lineages**—how may I guide your exploration today?",
      suggestions: INITIAL_SUGGESTIONS,
      timestamp: "Just now",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechController, setActiveSpeechController] = useState<{ stop: () => void } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const handleSendMessage = async (queryText: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Add user message immediately & clear input
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputQuery("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuery: q,
          messages: updatedMessages.slice(-6),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error status: ${response.status}`);
      }

      const data = await response.json();

      const dynamicReply = data.reply || `Namaste! Regarding **${q}**, India's traditions offer extraordinary depth across regional cuisines, master craftsmanship, and timeless sacred lore.`;

      const sageMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "sage",
        content: dynamicReply,
        sanskritEtymology: data.sanskritEtymology || undefined,
        suggestions: Array.isArray(data.suggestions) && data.suggestions.length > 0
          ? data.suggestions
          : [
              "What are the top regional dishes to taste in India?",
              "Explain classical dance mudras and postures",
              "Tell me about Chola bronze casting techniques",
              "What are the best cultural spots in Rajasthan & Kerala?"
            ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, sageMsg]);
    } catch (e) {
      console.error("Sage AI Chat fetch error:", e);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "sage",
        content: `Namaste! Regarding **${q}**:\n\n- **Living Culture**: Each region of India preserves deeply specialized knowledge passed down through master practitioners and ancient treatises.\n- **Practical Exploration**: From spicy regional culinary secrets (like Andhra and Chettinad) to classical Natya Shastra dance mudras and UNESCO stone sanctuaries, India's heritage is alive.\n- **Next Steps**: Select one of the related inquiries below to dive deeper!`,
        suggestions: [
          "What are the spiciest curries in Andhra and Maharashtra?",
          "Explain the 8 classical dances of India",
          "What are the acoustic secrets of Vittala Temple in Hampi?",
          "How is GI-tagged Kutch Rogan art painted with castor oil?"
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = (text: string) => {
    if (isSpeaking) {
      activeSpeechController?.stop();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*_#]/g, "");
    const controller = speakNarrative(
      cleanText,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
    setActiveSpeechController(controller);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#D4AF37]/50 relative animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#7A1C22] via-[#8B263E] to-[#A03038] text-white flex items-center justify-between border-b border-[#D4AF37]/40 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center border-2 border-[#D4AF37] shrink-0 shadow-inner">
              <span className="font-rozha text-xl text-[#7A1C22]">ॐ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-wide text-white">
                  Acharya Vani
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E06D14] text-white uppercase tracking-wider">
                  Sage AI
                </span>
              </div>
              <p className="text-[11px] text-[#F2E4D2]">
                Living Indian Heritage, Cuisine, Arts & Travel Oracle
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isSpeaking) activeSpeechController?.stop();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Sage AI"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "sage" && (
                <div className="w-8 h-8 rounded-full bg-[#7A1C22] text-white flex items-center justify-center shrink-0 border border-[#D4AF37] shadow-xs mt-1">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              )}

              <div
                className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-3 ${
                  msg.role === "user"
                    ? "bg-[#7A1C22] text-white rounded-br-none shadow-xs"
                    : "bg-white text-[#2C1810] border border-[#E8DCC4] rounded-bl-none shadow-xs"
                }`}
              >
                {/* Content rendered with markdown */}
                <div className="prose prose-sm max-w-none text-[#2C1810] leading-relaxed [&>p]:mb-2.5 [&>p:last-child]:mb-0 [&>ul]:my-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:mb-1.5 [&>strong]:text-[#7A1C22] [&>strong]:font-bold">
                  {msg.role === "user" ? (
                    <p className="text-white whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div>
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  )}
                </div>

                {/* Sanskrit Etymology Card */}
                {msg.sanskritEtymology && (
                  <div className="p-2.5 rounded-xl bg-[#FAF0DC] border border-[#D4AF37]/40 text-xs text-[#7A1C22] font-medium flex items-center gap-2">
                    <span className="font-rozha text-sm shrink-0">संस्कृत</span>
                    <span className="leading-snug">{msg.sanskritEtymology}</span>
                  </div>
                )}

                {/* Audio readout & timestamp */}
                <div className="flex items-center justify-between pt-1 text-[10px] text-[#8B6E58]">
                  <span>{msg.timestamp}</span>
                  {msg.role === "sage" && (
                    <button
                      onClick={() => handleSpeech(msg.content)}
                      className="p-1 rounded-md hover:bg-[#FAF0DC] text-[#7A1C22] transition-colors flex items-center gap-1 cursor-pointer font-medium"
                      title="Listen to Sage Narration"
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-3.5 h-3.5 text-[#E06D14]" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-[#E06D14]" />
                      )}
                      <span>{isSpeaking ? "Mute" : "Listen"}</span>
                    </button>
                  )}
                </div>

                {/* Follow-up Suggestion Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="pt-2.5 border-t border-[#F0E6D2] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#8B6E58] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#E06D14]" />
                      Related Inquiries:
                    </span>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSendMessage(sug)}
                          disabled={loading}
                          className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#FAF0DC] hover:border-[#7A1C22] text-[#7A1C22] text-[11px] font-medium border border-[#DCCDB0] transition-all text-left flex items-center gap-1.5 shadow-2xs group cursor-pointer disabled:opacity-50"
                        >
                          <ArrowRight className="w-3 h-3 text-[#E06D14] group-hover:translate-x-0.5 transition-transform shrink-0" />
                          <span className="leading-snug">{sug}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#E06D14] text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 animate-in fade-in">
              <div className="w-8 h-8 rounded-full bg-[#7A1C22] text-white flex items-center justify-center shrink-0 border border-[#D4AF37]">
                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" />
              </div>
              <div className="bg-white p-3.5 rounded-2xl rounded-bl-none border border-[#E8DCC4] flex items-center gap-2.5 text-xs text-[#7A1C22] font-semibold shadow-xs">
                <Loader2 className="w-4 h-4 animate-spin text-[#E06D14]" />
                <span>Acharya Vani is formulating insights on Indian heritage...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Query Input Box */}
        <div className="p-4 bg-white border-t border-[#E8DCC4]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about spicy regional curries, dance mudras, GI crafts, temple acoustics..."
              className="flex-1 px-4 py-3 bg-[#FAF7F2] border border-[#DCCDB0] rounded-xl text-xs sm:text-sm text-[#2C1810] placeholder-[#8B6E58] focus:outline-hidden focus:border-[#7A1C22] focus:ring-1 focus:ring-[#7A1C22]/30"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || loading}
              className="p-3 bg-gradient-to-r from-[#7A1C22] to-[#8B263E] text-white rounded-xl hover:from-[#8B263E] hover:to-[#92222A] disabled:opacity-50 transition-all shadow-xs cursor-pointer"
              aria-label="Send Query to Sage AI"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const CulturalSageAI = SageAI;
export default SageAI;
