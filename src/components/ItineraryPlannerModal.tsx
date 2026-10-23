import React, { useState, useEffect } from "react";
import {
  Compass,
  Sparkles,
  X,
  Clock,
  Utensils,
  Palette,
  Loader2,
  Share2,
  Check,
  RotateCcw,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  ShieldAlert,
  Info
} from "lucide-react";
import { ItineraryPlan } from "../types";
import {
  ALL_28_STATES,
  ALL_8_UNION_TERRITORIES,
  EXPERIENCE_STYLES,
  generateFallbackItinerary
} from "../utils/itineraryData";

interface ItineraryPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export const ItineraryPlannerModal: React.FC<ItineraryPlannerModalProps> = ({
  isOpen,
  onClose,
  initialDestination,
}) => {
  // Destination selection with support for initial state
  const [destination, setDestination] = useState<string>("Andhra Pradesh");
  const [durationDays, setDurationDays] = useState<number>(5);
  // Multi-select experience styles
  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    "Ancient Temples & Sacred Architecture",
    "Living Crafts & Master Artisans",
  ]);
  const [budget, setBudget] = useState<string>("Comfort Heritage");
  const [loading, setLoading] = useState<boolean>(false);
  const [planResult, setPlanResult] = useState<ItineraryPlan | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync initialDestination when modal opens
  useEffect(() => {
    if (initialDestination) {
      // Find matching state or fallback to initialDestination
      const matched =
        ALL_28_STATES.find(
          (s) =>
            s.name.toLowerCase() === initialDestination.toLowerCase() ||
            initialDestination.toLowerCase().includes(s.name.toLowerCase())
        ) ||
        ALL_8_UNION_TERRITORIES.find(
          (u) =>
            u.name.toLowerCase() === initialDestination.toLowerCase() ||
            initialDestination.toLowerCase().includes(u.name.toLowerCase())
        );

      if (matched) {
        setDestination(matched.value);
      } else {
        setDestination(initialDestination);
      }
    }
  }, [initialDestination, isOpen]);

  // Toggle selection for experience style pills
  const toggleStyle = (styleLabel: string) => {
    setSelectedStyles((prev) => {
      if (prev.includes(styleLabel)) {
        // Keep at least one selected
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== styleLabel);
      } else {
        return [...prev, styleLabel];
      }
    });
  };

  const handleGenerateItinerary = async () => {
    setLoading(true);
    try {
      const payload = {
        destination,
        region: destination,
        durationDays,
        days: durationDays,
        interests: selectedStyles,
        travelStyles: selectedStyles,
        travelStyle: selectedStyles.join(", "),
        budget,
      };

      const res = await fetch("/api/ai/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }

      const data = await res.json();

      // Normalize response safely
      if (data && typeof data === "object") {
        const rawSchedule = data.dailySchedule || data.days || [];
        const normalizedSchedule = Array.isArray(rawSchedule)
          ? rawSchedule.map((d: any, idx: number) => ({
              day: typeof d.day === "number" ? d.day : idx + 1,
              title: d.title || d.theme || `Day ${idx + 1}: Cultural Exploration`,
              morning:
                d.morning ||
                (Array.isArray(d.highlights) && d.highlights[0]) ||
                "Morning monument and architectural decoding walk.",
              afternoon:
                d.afternoon ||
                (Array.isArray(d.highlights) && d.highlights[1]) ||
                "Afternoon master artisan workshop and living craft guild visit.",
              evening:
                d.evening ||
                (Array.isArray(d.highlights) && d.highlights[2]) ||
                "Evening cultural performance, sacred temple lamp-lighting, or sunset walk.",
              artisanHighlight:
                d.artisanHighlight ||
                d.artisanSpotlight ||
                "Traditional GI-certified handloom & craft guild",
              culinaryDelight:
                d.culinaryDelight ||
                d.culinaryMustTry ||
                "Authentic regional multi-course heritage delicacy",
            }))
          : [];

        if (normalizedSchedule.length > 0) {
          setPlanResult({
            title: data.title || `${durationDays}-Day Heritage Trail in ${destination}`,
            destination: data.destination || destination,
            durationDays: data.durationDays || durationDays,
            summary:
              data.summary ||
              `An enriching journey through ${destination} uncovering monuments, craft lineages, and culinary heritage.`,
            dailySchedule: normalizedSchedule,
            culturalEtiquette:
              Array.isArray(data.culturalEtiquette) && data.culturalEtiquette.length > 0
                ? data.culturalEtiquette
                : Array.isArray(data.tips) && data.tips.length > 0
                ? data.tips
                : [
                    "Dress respectfully with covered shoulders and knees at all sacred sites.",
                    "Remove footwear before entering temple sanctums and artisan workspaces.",
                    "Support the living cultural heritage by purchasing directly from certified artisan cooperatives.",
                  ],
          });
          return;
        }
      }

      // Fallback if data was malformed
      const fallback = generateFallbackItinerary(destination, durationDays, selectedStyles, budget);
      setPlanResult(fallback);
    } catch (e) {
      console.warn("Using resilient client-side fallback itinerary:", e);
      // Guarantee zero blank screen
      const fallback = generateFallbackItinerary(destination, durationDays, selectedStyles, budget);
      setPlanResult(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!planResult || !planResult.dailySchedule) return;
    const text = `${planResult.title}\n\nDestination: ${planResult.destination} (${planResult.durationDays} Days)\n\nOverview:\n${planResult.summary}\n\n` +
      planResult.dailySchedule
        .map(
          (d) =>
            `-------------------------\nDAY ${d.day}: ${d.title}\n-------------------------\n🌅 Morning: ${d.morning}\n☀️ Afternoon: ${d.afternoon}\n🌙 Evening: ${d.evening}\n🎨 Artisan Spotlight: ${d.artisanHighlight}\n🍲 Culinary Delight: ${d.culinaryDelight}`
        )
        .join("\n\n") +
      `\n\nSACRED TRAVELER ETIQUETTE:\n` +
      (planResult.culturalEtiquette || []).map((t) => `• ${t}`).join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#7A1C22] via-[#8B263E] to-[#A03038] text-white flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center border-2 border-[#D4AF37] shrink-0 shadow-inner">
              <Compass className="w-5 h-5 text-[#E06D14]" />
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wide">
                Heritage Trail Planner
              </h3>
              <p className="text-xs text-[#F2E4D2]">
                Curated voyages through monuments, living crafts, and sacred culinary roots
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Itinerary Planner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!planResult ? (
            /* Parameter Configuration Form */
            <div className="space-y-6">
              {/* 1. Destination Selection (28 States & 8 UTs Grouped) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E06D14]" />
                    Select Cultural Region / State (28 States & 8 UTs):
                  </label>
                  <span className="text-[10px] font-semibold text-[#8B263E] bg-[#FAF0DC] px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                    All India Coverage
                  </span>
                </div>

                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 bg-white border border-[#DCCDB0] rounded-xl text-xs sm:text-sm font-medium text-[#2C1810] shadow-xs focus:outline-hidden focus:border-[#7A1C22] focus:ring-1 focus:ring-[#7A1C22]/30 cursor-pointer"
                >
                  <optgroup label="── 28 STATES OF INDIA ──" className="font-bold text-[#7A1C22]">
                    {ALL_28_STATES.map((st) => (
                      <option key={st.value} value={st.name} className="text-[#2C1810] font-normal py-1">
                        {st.label}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="── 8 UNION TERRITORIES ──" className="font-bold text-[#8B263E]">
                    {ALL_8_UNION_TERRITORIES.map((ut) => (
                      <option key={ut.value} value={ut.name} className="text-[#2C1810] font-normal py-1">
                        {ut.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* 2. Voyage Duration Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E06D14]" />
                  Voyage Duration:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { days: 3, label: "3 Days", sub: "Highlights & Icons" },
                    { days: 5, label: "5 Days", sub: "Classic Immersion" },
                    { days: 7, label: "7 Days", sub: "Grand Heritage Trail" },
                    { days: 10, label: "10 Days", sub: "Deep Cultural Odyssey" },
                  ].map((item) => (
                    <button
                      key={item.days}
                      type="button"
                      onClick={() => setDurationDays(item.days)}
                      className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                        durationDays === item.days
                          ? "bg-[#7A1C22] text-white border-[#7A1C22] shadow-sm shadow-[#7A1C22]/30"
                          : "bg-white text-[#5C4535] border-[#DCCDB0] hover:bg-[#FAF0DC]"
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{item.label}</div>
                      <div
                        className={`text-[10px] truncate ${
                          durationDays === item.days ? "text-[#F2E4D2]" : "text-[#8C7667]"
                        }`}
                      >
                        {item.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Multi-Select Experience Styles (Toggle Chips/Badges) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#E06D14]" />
                    Travel Experience Styles (Multi-Select):
                  </label>
                  <span className="text-[11px] font-medium text-[#7A1C22]">
                    {selectedStyles.length} selected
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6A5A]">
                  Select one or more cultural dimensions to tailor your day-by-day expedition:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {EXPERIENCE_STYLES.map((style) => {
                    const isSelected = selectedStyles.includes(style.label);
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => toggleStyle(style.label)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#8B263E] text-white border-[#8B263E] shadow-sm shadow-[#8B263E]/20 font-medium"
                            : "bg-white text-[#4A382C] border-[#DCCDB0] hover:bg-[#FAF0DC]"
                        }`}
                      >
                        <span className="text-base shrink-0">{style.icon}</span>
                        <span className="flex-1 leading-tight">{style.label}</span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? "bg-white border-white text-[#8B263E]"
                              : "border-[#C4B298] bg-[#FAF7F2]"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Action Button */}
              <button
                onClick={handleGenerateItinerary}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#7A1C22] via-[#8B263E] to-[#92222A] text-white rounded-2xl font-cinzel font-bold text-sm tracking-wider shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Curating Custom Heritage Trail for {destination}...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    <span>Craft My Custom Heritage Trail</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Result Structured Day-by-Day Itinerary View */
            <div className="space-y-6 animate-in fade-in">
              {/* Result Header Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF0DC] to-[#F5E5C9] border border-[#D4AF37]/60 space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D2B5] pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-[#7A1C22] text-white">
                        {planResult.durationDays} Days Trail
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-white text-[#7A1C22] border border-[#D4AF37]/50">
                        {planResult.destination}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#7A1C22] mt-1.5">
                      {planResult.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-3.5 py-2 rounded-xl bg-white border border-[#DCCDB0] text-xs font-semibold text-[#5C4535] hover:bg-[#FAF7F2] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-700" />
                          <span className="text-green-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4 text-[#8B263E]" />
                          <span>Copy Itinerary</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A382C] leading-relaxed">
                  {planResult.summary}
                </p>

                {/* Selected Style Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedStyles.map((style, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/80 border border-[#DCCDB0] text-[11px] font-medium text-[#7A1C22]"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Cards */}
              <div className="space-y-4">
                <h4 className="font-cinzel text-sm font-bold text-[#2C1810] uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#E06D14]" />
                  Day-by-Day Expedition Schedule:
                </h4>

                {(planResult.dailySchedule || []).map((day) => (
                  <div
                    key={day.day}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DCC4] shadow-xs space-y-3.5 hover:border-[#D4AF37] transition-all"
                  >
                    <div className="flex items-center justify-between border-b border-[#F0E6D2] pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#7A1C22] text-white font-cinzel font-bold text-xs flex items-center justify-center shrink-0">
                          {day.day}
                        </div>
                        <span className="font-cinzel text-sm sm:text-base font-bold text-[#7A1C22]">
                          Day {day.day}: {day.title}
                        </span>
                      </div>
                    </div>

                    {/* Time Segments */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-[#5C4535]">
                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE5D5] space-y-1.5">
                        <span className="font-bold text-[#7A1C22] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                          <Clock className="w-3.5 h-3.5 text-[#E06D14]" /> Morning
                        </span>
                        <p className="leading-relaxed text-[#3E2B20]">{day.morning}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE5D5] space-y-1.5">
                        <span className="font-bold text-[#7A1C22] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                          <Clock className="w-3.5 h-3.5 text-[#E06D14]" /> Afternoon
                        </span>
                        <p className="leading-relaxed text-[#3E2B20]">{day.afternoon}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE5D5] space-y-1.5">
                        <span className="font-bold text-[#7A1C22] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                          <Clock className="w-3.5 h-3.5 text-[#E06D14]" /> Evening
                        </span>
                        <p className="leading-relaxed text-[#3E2B20]">{day.evening}</p>
                      </div>
                    </div>

                    {/* Artisan & Culinary Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div className="p-2.5 bg-[#FAF0DC] rounded-xl text-xs text-[#2C1810] flex items-start gap-2 border border-[#EADBBF]">
                        <Palette className="w-4 h-4 text-[#E06D14] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#7A1C22] block text-[11px] uppercase tracking-wide">
                            Artisan Spotlight:
                          </strong>
                          <span className="text-xs">{day.artisanHighlight}</span>
                        </div>
                      </div>
                      <div className="p-2.5 bg-[#FAF0DC] rounded-xl text-xs text-[#2C1810] flex items-start gap-2 border border-[#EADBBF]">
                        <Utensils className="w-4 h-4 text-[#A04508] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#7A1C22] block text-[11px] uppercase tracking-wide">
                            Must-Taste Delicacy:
                          </strong>
                          <span className="text-xs">{day.culinaryDelight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cultural Etiquette Guidelines */}
              {(planResult.culturalEtiquette || []).length > 0 && (
                <div className="p-4 rounded-2xl bg-[#FAF0DC] border border-[#D4AF37]/50 text-xs text-[#3E2B20] space-y-2">
                  <span className="font-bold text-[#7A1C22] uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#E06D14]" />
                    Sacred Etiquette & Traveler Guidelines:
                  </span>
                  <ul className="list-disc list-inside space-y-1.5 leading-relaxed text-[#4A382C]">
                    {planResult.culturalEtiquette.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons: Modify Preferences & Back */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setPlanResult(null)}
                  className="flex-1 py-3 rounded-xl bg-[#8B263E] text-white text-xs sm:text-sm font-cinzel font-bold hover:bg-[#7A1C22] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Modify Preferences</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-white border border-[#DCCDB0] text-xs sm:text-sm font-semibold text-[#5C4535] hover:bg-[#FAF0DC] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
