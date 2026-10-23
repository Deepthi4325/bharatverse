import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Compass,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  ArrowRight,
  X
} from "lucide-react";
import { LegendStory, UserFavorite } from "../types";
import { speakNarrative } from "../utils/audioSynth";
import { Language, UI_TRANSLATIONS } from "../utils/translations";

interface StoriesHubProps {
  stories: LegendStory[];
  favorites: UserFavorite[];
  onToggleFavorite: (item: UserFavorite) => void;
  onAskSage: (query: string) => void;
  language?: Language;
}

export const StoriesHub: React.FC<StoriesHubProps> = ({
  stories,
  favorites,
  onToggleFavorite,
  onAskSage,
  language = "en",
}) => {
  const [activeStoryModal, setActiveStoryModal] = useState<LegendStory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [playingStoryId, setPlayingStoryId] = useState<string | null>(null);
  const [speechController, setSpeechController] = useState<{ stop: () => void } | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const categories = [
    { id: "All", label: t.allCategories },
    { id: "Folklore", label: t.folklore },
    { id: "Mythological Epics", label: t.mythology },
    { id: "Historical Lore", label: t.historyLore },
    { id: "Sacred Legends", label: t.sacredLegends },
  ];

  const filteredStories = stories.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.stateName.toLowerCase().includes(q) ||
      s.monumentOrEntity.toLowerCase().includes(q) ||
      s.narrative.toLowerCase().includes(q);

    const matchCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Mythological Epics" && (s.era.includes("Treta") || s.era.includes("Dvapara") || s.title.includes("Jatayu") || s.title.includes("Krishna"))) ||
      (selectedCategory === "Historical Lore" && (s.era.includes("CE") || s.era.includes("Century") || s.title.includes("Amber") || s.title.includes("Chola"))) ||
      (selectedCategory === "Folklore" && (s.monumentOrEntity.includes("Village") || s.narrative.includes("folk") || s.narrative.includes("legend"))) ||
      (selectedCategory === "Sacred Legends" && (s.title.includes("Meenakshi") || s.title.includes("Ganga") || s.title.includes("Jagannath")));

    return matchSearch && matchCategory;
  });

  const toggleStoryAudio = (story: LegendStory) => {
    if (playingStoryId === story.id) {
      speechController?.stop();
      setPlayingStoryId(null);
      setSpeechController(null);
    } else {
      speechController?.stop();
      const fullText = `${story.title}. From ${story.stateName}, ${story.monumentOrEntity}. ${story.narrative}. Philosophical essence: ${story.moralPhilosophicalCore}`;
      const controller = speakNarrative(
        fullText,
        () => setPlayingStoryId(story.id),
        () => {
          setPlayingStoryId(null);
          setSpeechController(null);
        },
        () => {
          setPlayingStoryId(null);
          setSpeechController(null);
        }
      );
      setSpeechController(controller);
    }
  };

  const featuredStory = stories[0] || null;

  return (
    <div className="space-y-12 py-2">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0DC] border border-[#D4AF37]/50 text-[#7A1C22] text-xs font-bold uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5 text-[#E06D14]" />
          <span>{t.storiesBadge}</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-[#2C1810]">
          {t.storiesTitle}
        </h1>
        <p className="text-sm sm:text-base text-[#6E5848] font-sans leading-relaxed">
          {t.storiesSubtitle}
        </p>
      </div>

      {/* Hero Featured Story */}
      {featuredStory && !searchQuery && selectedCategory === "All" && (
        <div className="bg-gradient-to-br from-[#2C1810] via-[#5A151B] to-[#7A1C22] text-white rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/40 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story Visual */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-4/3 shadow-lg border border-[#D4AF37]/30">
              <img
                src={featuredStory.image || "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"}
                alt={featuredStory.title}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-sm bg-[#E06D14]">
                  Featured Epic
                </span>
                <p className="text-xs font-serif italic text-[#FDFBF7] mt-1">
                  {featuredStory.stateName} • {featuredStory.monumentOrEntity}
                </p>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F0C05A]">
                  {featuredStory.era}
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FDFBF7]">
                  {featuredStory.title}
                </h2>
                <p className="text-xs sm:text-sm font-serif italic text-[#EAD8C3]">
                  "{featuredStory.shortTagline || "A tale of valor that echoes across millennia."}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#F5E6D3] font-sans leading-relaxed">
                {featuredStory.narrative}
              </p>

              <div className="p-3.5 bg-black/30 rounded-2xl border border-white/15 text-xs text-[#F0C05A] font-serif italic">
                <span className="font-bold text-white not-italic">Core Essence: </span>
                {featuredStory.moralPhilosophicalCore}
              </div>

              {/* Audio Controls */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => toggleStoryAudio(featuredStory)}
                  className="px-6 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-[#E06D14] to-[#F08B32] text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  {playingStoryId === featuredStory.id ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>{t.stopNarration}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{t.listenNarration} ({featuredStory.audioMinutes}m)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onAskSage(`Tell me the sacred folklore and spiritual meaning of ${featuredStory.title}`)}
                  className="px-5 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#FDFBF7] border border-[#D4AF37]/50 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.askSageTitle}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DCC4] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#8B6E58] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchStoryPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#DCCDB0] rounded-xl text-xs sm:text-sm text-[#2C1810] placeholder-[#8B6E58] focus:outline-hidden focus:border-[#7A1C22]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#7A1C22] text-[#FDFBF7] shadow-xs"
                    : "bg-[#FAF7F2] text-[#5C4535] border border-[#E0D5C1] hover:bg-[#F2E8D3]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="space-y-4">
        <h2 className="font-cinzel text-xl font-bold text-[#2C1810]">
          {t.allStories} ({filteredStories.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => {
            const isFav = favorites.some((f) => f.id === story.id);

            return (
              <div
                key={story.id}
                className="bg-white rounded-3xl p-6 border border-[#E8DCC4] shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between space-y-4 group"
                style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}
              >
                {/* Card Top & Body Content */}
                <div className="space-y-3.5 flex-1 flex flex-col">
                  {/* Card Header: Era / Category on Left, State Name + Bookmark on Right */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#E8DCC4]/60 pb-3">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#E06D14] truncate max-w-[55%]">
                      {story.era || "Ancient Legend"}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-[#8B6E58]">
                        {story.stateName}
                      </span>
                      <button
                        onClick={() =>
                          onToggleFavorite({
                            id: story.id,
                            type: "story",
                            title: story.title,
                            subtitle: `${story.stateName} • ${story.monumentOrEntity}`,
                            image: story.image,
                            stateName: story.stateName,
                            savedAt: new Date().toLocaleDateString(),
                          })
                        }
                        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                          isFav
                            ? "bg-[#D4AF37] text-[#2C1810]"
                            : "text-[#8B6E58] hover:text-[#7A1C1C] hover:bg-[#FAF0DC]"
                        }`}
                        title={isFav ? "Saved in Vault" : "Save to Vault"}
                      >
                        {isFav ? (
                          <BookmarkCheck className="w-4 h-4 fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Location / Monument Subtitle */}
                  <div className="text-[11px] font-semibold text-[#8B6E58] uppercase tracking-wider flex items-center gap-1.5">
                    <span>{story.monumentOrEntity}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#E06D14]" />
                      {story.audioMinutes}m read
                    </span>
                  </div>

                  {/* Heading with strict 2-line clamp */}
                  <h3 className="font-cinzel text-lg font-bold text-[#2C1810] group-hover:text-[#7A1C1C] transition-colors leading-snug line-clamp-2 min-h-[3.25rem]">
                    {story.title}
                  </h3>

                  {/* Narrative Preview with strict 3-line clamp */}
                  <p className="text-xs text-[#5C4535] font-sans line-clamp-3 leading-relaxed">
                    {story.narrative}
                  </p>

                  {/* Essence Box */}
                  {story.moralPhilosophicalCore && (
                    <div className="mt-auto p-3.5 bg-[#FAF6ED] rounded-2xl border border-[#E8DCC4] text-xs text-[#7A1C1C] leading-relaxed">
                      <p className="italic font-serif">
                        <span className="font-bold not-italic text-[#2C1810]">Essence: </span>
                        {story.moralPhilosophicalCore}
                      </p>
                    </div>
                  )}
                </div>

                {/* Primary Button: Full-width solid maroon button labeled "Read Full Story →" */}
                <button
                  onClick={() => setActiveStoryModal(story)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#7A1C1C] hover:bg-[#92222A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer group-hover:shadow-md"
                >
                  <span>Read Full Story</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Preview Modal & "Save to Vault" Integration */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl border border-[#D4AF37]/50 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Top Banner: Maroon gradient banner with state/year badges, full title, location subtitle, and close (X) button */}
            <div className="p-6 sm:p-7 bg-gradient-to-r from-[#7A1C1C] via-[#8B263E] to-[#5C1417] text-white relative border-b border-[#D4AF37]/30">
              <button
                onClick={() => {
                  if (playingStoryId === activeStoryModal.id) {
                    speechController?.stop();
                    setPlayingStoryId(null);
                  }
                  setActiveStoryModal(null);
                }}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close story preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 pr-10">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-sm bg-[#E06D14] text-white">
                    {activeStoryModal.stateName}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-sm bg-white/15 text-[#F0C05A] border border-[#D4AF37]/40">
                    {activeStoryModal.era}
                  </span>
                  <span className="text-xs text-[#EAD8C3] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#F0C05A]" />
                    {activeStoryModal.audioMinutes}m read
                  </span>
                </div>

                <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white leading-tight">
                  {activeStoryModal.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#F2E4D2] font-serif italic">
                  {activeStoryModal.monumentOrEntity}
                  {activeStoryModal.shortTagline ? ` — "${activeStoryModal.shortTagline}"` : ""}
                </p>
              </div>
            </div>

            {/* Action Row: Listen to Story pill + Save to Vault pill */}
            <div className="px-6 py-3.5 bg-white border-b border-[#E8DCC4] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                {/* Listen to Story Audio Pill */}
                <button
                  onClick={() => toggleStoryAudio(activeStoryModal)}
                  className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                    playingStoryId === activeStoryModal.id
                      ? "bg-[#E06D14] text-white hover:bg-[#CA5E0E]"
                      : "bg-[#FAF0DC] text-[#7A1C1C] hover:bg-[#F2E4C4] border border-[#D4AF37]/40"
                  }`}
                >
                  {playingStoryId === activeStoryModal.id ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause Narration</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current text-[#E06D14]" />
                      <span>Listen to Story ({activeStoryModal.audioMinutes}m)</span>
                    </>
                  )}
                </button>

                {/* Save to Vault Pill Button */}
                {(() => {
                  const isModalFav = favorites.some((f) => f.id === activeStoryModal.id);
                  return (
                    <button
                      onClick={() =>
                        onToggleFavorite({
                          id: activeStoryModal.id,
                          type: "story",
                          title: activeStoryModal.title,
                          subtitle: `${activeStoryModal.stateName} • ${activeStoryModal.monumentOrEntity}`,
                          image: activeStoryModal.image,
                          stateName: activeStoryModal.stateName,
                          savedAt: new Date().toLocaleDateString(),
                        })
                      }
                      className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                        isModalFav
                          ? "bg-[#D4AF37] text-[#2C1810] border-[#D4AF37]"
                          : "bg-[#FAF7F2] text-[#5C4535] border-[#DCCDB0] hover:bg-[#FAF0DC] hover:border-[#D4AF37]"
                      }`}
                    >
                      {isModalFav ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5" />
                          <span>Saved in Vault</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5 text-[#E06D14]" />
                          <span>Save to Vault</span>
                        </>
                      )}
                    </button>
                  );
                })()}
              </div>
            </div>

            {/* Content Body: Complete narrative text formatted with clean line spacing, followed by CULTURAL ESSENCE card */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="text-[#3D2817] text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                {activeStoryModal.narrative.split("\n\n").map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* CULTURAL ESSENCE Card */}
              {activeStoryModal.moralPhilosophicalCore && (
                <div className="p-5 bg-[#FAF6ED] rounded-2xl border border-[#D4AF37]/60 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A1C1C]">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Cultural Essence</span>
                  </div>
                  <p className="font-serif italic text-sm text-[#5C321E] leading-relaxed">
                    {activeStoryModal.moralPhilosophicalCore}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Action: Full-width maroon button reading "✨ Ask Sage AI about [Story Title]" */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#E8DCC4]">
              <button
                onClick={() => {
                  onAskSage(`Tell me more about the ancient story and spiritual significance of ${activeStoryModal.title} from ${activeStoryModal.stateName}`);
                  setActiveStoryModal(null);
                }}
                className="w-full py-3 px-6 rounded-2xl bg-[#7A1C1C] hover:bg-[#92222A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>✨ Ask Sage AI about {activeStoryModal.title}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
