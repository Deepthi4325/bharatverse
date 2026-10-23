import React, { useState } from "react";
import {
  Flame,
  Music,
  Utensils,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  Heart,
  Bookmark,
  BookmarkCheck,
  Search,
  Layers,
  ArrowRight
} from "lucide-react";
import { PerformingArt, CulinaryItem, IndianState, UserFavorite } from "../types";
import { Language, UI_TRANSLATIONS } from "../utils/translations";
import { IndianDancerIcon } from "./icons/IndianDancerIcon";

interface TraditionsHubProps {
  states: IndianState[];
  favorites: UserFavorite[];
  onToggleFavorite: (item: UserFavorite) => void;
  onAskSage: (query: string) => void;
  language?: Language;
}

export const TraditionsHub: React.FC<TraditionsHubProps> = ({
  states,
  favorites,
  onToggleFavorite,
  onAskSage,
  language = "en",
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"dances" | "festivals" | "culinary">("dances");

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Aggregate all dances & culinary traditions
  const allDances: (PerformingArt & { stateName: string })[] = [];
  const allCulinary: (CulinaryItem & { stateName: string })[] = [];

  states.forEach((st) => {
    st.dancesAndMusic.forEach((d) => allDances.push({ ...d, stateName: st.name }));
    st.culinaryDelicacies.forEach((c) => allCulinary.push({ ...c, stateName: st.name }));
  });

  const seasonalFestivals = [
    {
      id: "fest-1",
      name: "Pongal / Makar Sankranti",
      stateName: "Tamil Nadu & Pan-India",
      month: "January (Thai / Magh)",
      deityOrTheme: "Surya (Sun God) & Agricultural Bounty",
      description: "Four-day harvest festival celebrating agricultural abundance with boiling sweet rice in clay pots, cattle honoring, and Kolam floor geometries.",
      rituals: ["Boiling fresh harvest rice in decorated clay pots", "Jallikattu bull celebration", "Intricate rice-powder Kolam designs"],
      spiritualSignificance: "Gratitude to solar energy and cattle that sustain human civilization.",
    },
    {
      id: "fest-2",
      name: "Navratri & Durga Puja",
      stateName: "Gujarat, West Bengal & Pan-India",
      month: "September - October (Ashwin)",
      deityOrTheme: "Goddess Durga & Cosmic Shakti",
      description: "Nine nights of devotion celebrating the victory of the Goddess over darkness, characterized by rhythmic Garba-Raas circles and elaborate clay pandals.",
      rituals: ["9 nights of Garba circles with Dandiya sticks", "Elaborate clay Pratima invocations", "Fasting and Ayurvedic Satvik cuisine"],
      spiritualSignificance: "Awakening the primordial feminine divine power within every seeker.",
    },
    {
      id: "fest-3",
      name: "Rath Yatra of Puri",
      stateName: "Odisha",
      month: "June - July (Ashadha)",
      deityOrTheme: "Lord Jagannath, Balabhadra & Subhadra",
      description: "The grand cosmic chariot journey where deities leave temple sanctums to meet all devotees on the Grand Road of Puri.",
      rituals: ["Pulling giant wooden chariots with sacred ropes", "Chhera Panhara (King sweeps chariot floor)", "Special Chhappan Bhog culinary offerings"],
      spiritualSignificance: "Demonstrates that the Supreme descends among ordinary humans without distinction of caste or creed.",
    },
    {
      id: "fest-4",
      name: "Onam",
      stateName: "Kerala",
      month: "August - September (Chingam)",
      deityOrTheme: "King Mahabali & Lord Vamana",
      description: "Harvest carnival celebrating the homecoming of benevolent King Mahabali with boat races, floral carpets (Pookkalam), and the lavish 26-dish Onasadya feast.",
      rituals: ["Vallam Kali snake boat races on backwaters", "Pookkalam fresh floral mandala carpets", "Grand 26-course Onasadya on banana leaves"],
      spiritualSignificance: "Symbolizes universal equality, prosperity, and ecological harmony.",
    },
    {
      id: "fest-5",
      name: "Bohag Bihu",
      stateName: "Assam",
      month: "April (Baisakh)",
      deityOrTheme: "Spring Equinox & New Agricultural Cycle",
      description: "The spring festival marking the Assamese New Year with lively Bihu dances, handwoven Gamosa gifts, and fragrant coconut Pitha treats.",
      rituals: ["Bihu dancing to Pepa buffalo-horn trumpets", "Presenting handloom Gamosas to elders", "Making sticky-rice Til Pithas"],
      spiritualSignificance: "Celebrates vitality, romance, and renewal of life in nature.",
    },
    {
      id: "fest-6",
      name: "Dev Deepawali of Kashi",
      stateName: "Uttar Pradesh",
      month: "November (Kartik Purnima)",
      deityOrTheme: "Lord Shiva & Descent of Gods on Earth",
      description: "Over one million earthenware lamps light up the 84 crescent ghats of Varanasi on full moon night as Gods descend to bathe in the holy Ganges.",
      rituals: ["Lighting millions of oil lamps across Ganga ghats", "Maha Aarti at Dashashwamedh Ghat", "Floating oil diyas on the river currents"],
      spiritualSignificance: "Illumination of consciousness over ignorance and darkness.",
    },
  ];

  return (
    <div className="space-y-12 py-2">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0DC] border border-[#D4AF37]/50 text-[#7A1C22] text-xs font-bold uppercase tracking-widest">
          <Flame className="w-3.5 h-3.5 text-[#E06D14]" />
          <span>{t.traditionsBadge}</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-[#2C1810]">
          {t.traditionsTitle}
        </h1>
        <p className="text-sm sm:text-base text-[#6E5848] font-sans leading-relaxed">
          {t.traditionsSubtitle}
        </p>
      </div>

      {/* Sub-Pill Navigation */}
      <div className="flex items-center justify-center gap-3 border-b border-[#E8DCC4] pb-4 flex-wrap">
        {[
          {
            id: "dances",
            label: t.performingArts || "Dance",
            icon: (
              <IndianDancerIcon className="w-5 h-5 inline-block shrink-0 -mt-0.5 drop-shadow-sm" />
            ),
          },
          {
            id: "festivals",
            label: t.festivalsRituals || "Festivals",
            icon: <span className="text-base">🪔</span>,
          },
          {
            id: "culinary",
            label: t.ayurvedicCulinary || "Culinary",
            icon: <span className="text-base">🍲</span>,
          },
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#7A1C22] text-white shadow-sm shadow-[#7A1C22]/30"
                  : "bg-white text-[#5C4535] border border-[#E0D5C1] hover:bg-[#F2E8D3]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. PERFORMING ARTS & DANCES */}
      {activeSubTab === "dances" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDances.map((dance) => {
              const isFav = favorites.some((f) => f.id === dance.id);
              return (
                <div
                  key={dance.id}
                  className="bg-white rounded-3xl p-6 border border-[#E8DCC4] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <IndianDancerIcon className="w-4 h-4 shrink-0" />
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#E06D14]">
                            {dance.stateName} • {dance.type}
                          </span>
                        </div>
                        <h3 className="font-cinzel text-xl font-bold text-[#2C1810] group-hover:text-[#7A1C22] transition-colors mt-0.5">
                          {dance.name}
                        </h3>
                      </div>

                      <button
                        onClick={() =>
                          onToggleFavorite({
                            id: dance.id,
                            type: "dance",
                            title: dance.name,
                            subtitle: `${dance.stateName} • ${dance.type}`,
                            stateName: dance.stateName,
                            savedAt: new Date().toLocaleDateString(),
                          })
                        }
                        className={`p-1.5 rounded-full border transition-colors ${
                          isFav
                            ? "bg-[#D4AF37] text-[#2C1810] border-[#D4AF37]"
                            : "bg-[#FAF7F2] text-[#6E5848] border-[#E8DCC4] hover:bg-[#EFE7D5]"
                        }`}
                        title={isFav ? "Saved" : "Save"}
                      >
                        {isFav ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5 text-[#8B6E58]" />}
                      </button>
                    </div>

                    <p className="text-xs text-[#5C4535] font-sans leading-relaxed">
                      {dance.description}
                    </p>

                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DCC4] space-y-1 text-xs">
                      <div className="text-[#8B4513] font-serif">
                        <span className="font-bold text-[#2C1810]">Costume & Tradition: </span>
                        {dance.costumeDetails}
                      </div>
                      <div className="text-[#6E5848]">
                        <span className="font-semibold text-[#2C1810]">Key Mudras: </span>
                        {dance.mudrasAndMovements.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8DCC4] flex items-center justify-between text-xs">
                    <span className="text-[#8B6E58]">
                      {dance.instrumentsUsed.slice(0, 2).join(", ")}
                    </span>
                    <button
                      onClick={() => onAskSage(`Explain the sacred mudras and Natya Shastra origin of ${dance.name} from ${dance.stateName}`)}
                      className="font-semibold text-[#7A1C22] hover:text-[#5A151B] flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E06D14]" />
                      <span>Ask Sage</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. SACRED FESTIVALS & RITUALS */}
      {activeSubTab === "festivals" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonalFestivals.map((fest) => (
              <div
                key={fest.id}
                className="bg-white rounded-3xl p-6 border border-[#E8DCC4] shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E06D14]">
                      {fest.month} • {fest.stateName}
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-[#2C1810] mt-0.5">
                      {fest.name}
                    </h3>
                    <p className="text-xs font-serif italic text-[#8B4513]">
                      Theme: {fest.deityOrTheme}
                    </p>
                  </div>

                  <p className="text-xs text-[#5C4535] leading-relaxed">
                    {fest.description}
                  </p>

                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DCC4] space-y-1.5 text-xs">
                    <span className="font-bold text-[#7A1C22] uppercase tracking-wider text-[10px]">
                      Sacred Rituals & Offerings
                    </span>
                    <ul className="space-y-1 text-[#5C4535]">
                      {fest.rituals.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#E06D14]">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8DCC4] text-xs text-[#8B6E58] font-serif italic">
                  "{fest.spiritualSignificance}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. AYURVEDIC CULINARY WISDOM */}
      {activeSubTab === "culinary" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCulinary.map((dish) => {
              const isFav = favorites.some((f) => f.id === dish.id);
              return (
                <div
                  key={dish.id}
                  className="bg-white rounded-3xl p-6 border border-[#E8DCC4] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#E06D14]">
                          {dish.stateName} • {dish.type}
                        </span>
                        <h3 className="font-cinzel text-xl font-bold text-[#2C1810] group-hover:text-[#7A1C22] transition-colors mt-0.5">
                          {dish.name}
                        </h3>
                      </div>

                      <button
                        onClick={() =>
                          onToggleFavorite({
                            id: dish.id,
                            type: "culinary",
                            title: dish.name,
                            subtitle: `${dish.stateName} • Culinary Heritage`,
                            stateName: dish.stateName,
                            savedAt: new Date().toLocaleDateString(),
                          })
                        }
                        className={`p-1.5 rounded-full border transition-colors ${
                          isFav
                            ? "bg-[#D4AF37] text-[#2C1810] border-[#D4AF37]"
                            : "bg-[#FAF7F2] text-[#6E5848] border-[#E8DCC4] hover:bg-[#EFE7D5]"
                        }`}
                        title={isFav ? "Saved" : "Save"}
                      >
                        {isFav ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5 text-[#8B6E58]" />}
                      </button>
                    </div>

                    <p className="text-xs text-[#5C4535] font-sans leading-relaxed">
                      {dish.description}
                    </p>

                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DCC4] space-y-1 text-xs">
                      <div className="text-[#7A1C22] font-semibold">
                        Ayurvedic Healing Property:
                      </div>
                      <p className="text-[#8B4513] font-serif italic">
                        "{dish.ayurvedicProperty}"
                      </p>
                      <div className="pt-1 text-[#6E5848]">
                        <span className="font-semibold text-[#2C1810]">Key Ingredients: </span>
                        {dish.keyIngredients.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8DCC4] flex items-center justify-between text-xs">
                    <span className="text-[#8B6E58] font-serif italic">
                      Traditional Kitchen Heritage
                    </span>
                    <button
                      onClick={() => onAskSage(`Explain the Ayurvedic benefits, history and authentic recipe of ${dish.name} from ${dish.stateName}`)}
                      className="font-semibold text-[#7A1C22] hover:text-[#5A151B] flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E06D14]" />
                      <span>Ask Sage</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
