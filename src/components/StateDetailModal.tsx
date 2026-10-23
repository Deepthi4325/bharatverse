import React, { useState } from "react";
import {
  X,
  MapPin,
  Landmark,
  Palette,
  BookOpen,
  Flame,
  Award,
  Sparkles,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Compass,
  Play,
  Pause,
  ExternalLink,
  Navigation
} from "lucide-react";
import { IndianState, UserFavorite, Monument } from "../types";
import { speakNarrative } from "../utils/audioSynth";
import { Language, UI_TRANSLATIONS } from "../utils/translations";
import { IndianDancerIcon } from "./icons/IndianDancerIcon";

interface StateDetailModalProps {
  state: IndianState | null;
  onClose: () => void;
  onSelectMonument?: (monument: Monument) => void;
  onAskSage: (query: string) => void;
  onPlanItinerary: (stateName: string) => void;
  favorites: UserFavorite[];
  onToggleFavorite: (item: UserFavorite) => void;
  language?: Language;
}

export const StateDetailModal: React.FC<StateDetailModalProps> = ({
  state,
  onClose,
  onSelectMonument,
  onAskSage,
  onPlanItinerary,
  favorites,
  onToggleFavorite,
  language = "en",
}) => {
  const [activePillar, setActivePillar] = useState<"heritage" | "artisans" | "stories" | "traditions">("heritage");
  const [playingStoryId, setPlayingStoryId] = useState<string | null>(null);
  const [speechController, setSpeechController] = useState<{ stop: () => void } | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  if (!state) return null;

  const isFavorited = favorites.some((f) => f.id === state.id && f.type === "state");

  const handleFavoriteToggle = () => {
    onToggleFavorite({
      id: state.id,
      type: "state",
      title: state.name,
      subtitle: state.emblemTagline,
      image: state.heroImage,
      stateName: state.name,
      savedAt: new Date().toLocaleDateString(),
    });
  };

  const toggleStoryAudio = (storyId: string, narrativeText: string, title: string) => {
    if (playingStoryId === storyId) {
      speechController?.stop();
      setPlayingStoryId(null);
      setSpeechController(null);
    } else {
      speechController?.stop();
      const controller = speakNarrative(
        `${title}. ${narrativeText}`,
        () => setPlayingStoryId(storyId),
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

  const handleClose = () => {
    speechController?.stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Hero Banner Header */}
        <div className="relative h-60 sm:h-72 shrink-0 overflow-hidden">
          <img
            src={state.heroImage}
            alt={state.name}
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-[#2C1810]/50 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors z-10"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* State Badges & Favorite */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#7A1C22]/90 backdrop-blur-xs text-white text-xs font-bold border border-[#D4AF37]/40">
              {state.zone} India
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#E06D14]/90 backdrop-blur-xs text-white text-xs font-semibold">
              Cap: {state.capital}
            </span>
            <button
              onClick={handleFavoriteToggle}
              className={`p-1.5 rounded-full backdrop-blur-xs border transition-colors ${
                isFavorited
                  ? "bg-[#D4AF37] text-[#2C1810] border-[#D4AF37]"
                  : "bg-black/40 text-white border-white/30 hover:bg-black/60"
              }`}
              title={isFavorited ? "Saved in collection" : "Save state"}
            >
              {isFavorited ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>

          {/* State Titles */}
          <div className="absolute bottom-4 left-5 right-5 text-white space-y-1.5">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black tracking-wide text-[#FDFBF7]">
              {state.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#F0C05A] italic font-serif">
              "{state.emblemTagline}"
            </p>
            <p className="text-xs text-[#EAD8C3] line-clamp-2 max-w-2xl font-sans">
              {state.culturalEssence || state.description}
            </p>
          </div>
        </div>

        {/* 4 Cultural Pillars Tab Navigation */}
        <div className="flex border-b border-[#E8DCC4] bg-[#F4ECDC]/60 px-4 shrink-0 overflow-x-auto">
          {[
            { id: "heritage", label: t.heritage, icon: Landmark, count: state.iconicMonuments.length },
            { id: "artisans", label: t.artisans, icon: Palette, count: state.livingArtisans.length || state.craftsAndArts.length },
            { id: "stories", label: t.stories, icon: BookOpen, count: state.ancientLegends.length },
            { id: "traditions", label: t.traditions, icon: Flame, count: state.dancesAndMusic.length + state.culinaryDelicacies.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePillar === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePillar(tab.id as any)}
                className={`py-3.5 px-4 sm:px-6 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "border-[#7A1C22] text-[#7A1C22] bg-[#FAF7F2]"
                    : "border-transparent text-[#6E5848] hover:text-[#2C1810]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#E06D14]" : "text-[#8B6E58]"}`} />
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#E8DCC4] text-[#5C4535]">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Pillar Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* 1. HERITAGE PILLAR */}
          {activePillar === "heritage" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
                    Architectural Marvels of {state.name}
                  </h3>
                  <p className="text-xs text-[#6E5848] font-sans">
                    Monuments carved from living stone and acoustic geometry.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {state.iconicMonuments.map((monument) => (
                  <div
                    key={monument.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC4] shadow-sm hover:shadow-md transition-all flex flex-col group"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={monument.image}
                        alt={monument.name}
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#7A1C22]">
                          {monument.periodEra}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h4 className="font-cinzel text-base font-bold text-[#2C1810]">
                          {monument.name}
                        </h4>
                        <p className="text-xs text-[#8B4513] font-serif">
                          {monument.dynasty} • {monument.architectureStyle}
                        </p>
                        <p className="text-xs text-[#5C4535] font-sans line-clamp-2 leading-relaxed">
                          {monument.description}
                        </p>
                      </div>

                      {/* Monument Action CTAs */}
                      <div className="pt-2 flex items-center gap-2 border-t border-[#E8DCC4]">
                        {onSelectMonument && (
                          <button
                            onClick={() => onSelectMonument(monument)}
                            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-[#7A1C22] text-white hover:bg-[#5A151B] transition-colors flex items-center justify-center gap-1.5"
                          >
                            <span>Explore Details</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            monument.name + " " + state.name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[#FAF0DC] text-[#7A1C22] hover:bg-[#F2E4C4] border border-[#D4AF37]/40 transition-colors"
                          title="Open in Google Maps"
                        >
                          <Navigation className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. ARTISANS PILLAR */}
          {activePillar === "artisans" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
                  Hands That Keep Heritage Alive
                </h3>
                <p className="text-xs text-[#6E5848] font-sans">
                  Living master craftsmen carrying centuries-old guild secrets.
                </p>
              </div>

              {/* Master Artisans */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {state.livingArtisans.map((artisan) => (
                  <div
                    key={artisan.id}
                    className="bg-white rounded-2xl p-5 border border-[#E8DCC4] shadow-sm space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={artisan.avatar}
                        alt={artisan.name}
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
                        }}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37] shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-cinzel text-base font-bold text-[#2C1810]">
                          {artisan.name}
                        </h4>
                        <p className="text-xs font-semibold text-[#E06D14]">
                          {artisan.craftName}
                        </p>
                        <p className="text-[11px] text-[#8B6E58]">
                          {artisan.villageLocation} • {artisan.experienceYears} Years Master
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DCC4] space-y-1">
                      <p className="text-xs text-[#5C4535] font-serif italic">
                        "{artisan.story}"
                      </p>
                      <p className="text-[11px] text-[#7A1C22] font-semibold">
                        Awards: {artisan.awards}
                      </p>
                    </div>

                    <div className="text-[11px] text-[#6E5848] font-sans">
                      <span className="font-bold text-[#2C1810]">Ancient Technique: </span>
                      {artisan.specialTechnique}
                    </div>

                    <div className="pt-2 border-t border-[#E8DCC4]">
                      <span className="text-xs font-semibold text-[#7A1C22]">
                        {artisan.patronAction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Crafts & Arts */}
              <div className="pt-4 border-t border-[#E8DCC4] space-y-4">
                <h4 className="font-cinzel text-base font-bold text-[#2C1810]">
                  GI-Tagged Crafts & Ancient Techniques
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {state.craftsAndArts.map((craft) => (
                    <div
                      key={craft.id}
                      className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DCC4] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-cinzel text-sm font-bold text-[#7A1C22]">
                          {craft.name}
                        </h5>
                        {craft.giTagged && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#E06D14]/15 text-[#A04508] border border-[#E06D14]/30">
                            GI TAGGED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5C4535] line-clamp-2">
                        {craft.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. STORIES PILLAR */}
          {activePillar === "stories" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
                  Oral Traditions & Sacred Legends
                </h3>
                <p className="text-xs text-[#6E5848] font-sans">
                  Timeless lore carried across generations with voice narration.
                </p>
              </div>

              <div className="space-y-4">
                {state.ancientLegends.map((legend) => {
                  const isPlaying = playingStoryId === legend.id;
                  return (
                    <div
                      key={legend.id}
                      className="bg-white rounded-2xl p-5 border border-[#D4AF37]/40 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#E06D14]">
                            {legend.era} • {legend.monumentOrEntity}
                          </span>
                          <h4 className="font-cinzel text-lg font-bold text-[#2C1810]">
                            {legend.title}
                          </h4>
                        </div>

                        <button
                          onClick={() => toggleStoryAudio(legend.id, legend.narrative, legend.title)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isPlaying
                              ? "bg-[#7A1C22] text-white"
                              : "bg-[#FAF0DC] text-[#7A1C22] border border-[#D4AF37]/50 hover:bg-[#F2E4C4]"
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Pause Narration</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Listen to Story ({legend.audioMinutes}m)</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-[#5C4535] font-sans leading-relaxed">
                        {legend.narrative}
                      </p>

                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DCC4] text-xs text-[#8B4513] font-serif italic">
                        <span className="font-bold text-[#2C1810] not-italic">Core Essence: </span>
                        {legend.moralPhilosophicalCore}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. TRADITIONS PILLAR */}
          {activePillar === "traditions" && (
            <div className="space-y-6">
              {/* Performing Arts */}
              <div className="space-y-3">
                <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
                  Classical & Folk Performing Arts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {state.dancesAndMusic.map((dance) => (
                    <div
                      key={dance.id}
                      className="bg-white rounded-2xl p-4 border border-[#E8DCC4] shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <IndianDancerIcon className="w-4 h-4 shrink-0" />
                          <h4 className="font-cinzel text-base font-bold text-[#7A1C22]">
                            {dance.name}
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-[#FAF0DC] text-[#A04508]">
                          {dance.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C4535] leading-relaxed">
                        {dance.description}
                      </p>
                      <div className="text-[11px] text-[#8B6E58]">
                        <span className="font-semibold text-[#2C1810]">Instruments: </span>
                        {dance.instrumentsUsed.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Culinary Heritage */}
              <div className="space-y-3 pt-4 border-t border-[#E8DCC4]">
                <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
                  Ayurvedic Culinary Wisdom & Delicacies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {state.culinaryDelicacies.map((dish) => (
                    <div
                      key={dish.id}
                      className="bg-white rounded-2xl p-4 border border-[#E8DCC4] shadow-xs space-y-2"
                    >
                      <h4 className="font-cinzel text-base font-bold text-[#2C1810]">
                        {dish.name}
                      </h4>
                      <p className="text-xs text-[#5C4535]">
                        {dish.description}
                      </p>
                      <p className="text-[11px] text-[#8B4513] font-serif italic">
                        {dish.ayurvedicProperty}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DCC4] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onAskSage(`Tell me about the hidden secrets, folklore, and master artisans of ${state.name}`)}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#FAF0DC] text-[#7A1C22] border border-[#D4AF37]/50 hover:bg-[#F2E4C4] transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E06D14]" />
            <span>Ask Sage About {state.name}</span>
          </button>

          <button
            onClick={() => onPlanItinerary(state.name)}
            className="px-5 py-2 rounded-full text-xs font-semibold bg-[#7A1C22] text-white hover:bg-[#5A151B] transition-all flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Plan Heritage Itinerary for {state.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
