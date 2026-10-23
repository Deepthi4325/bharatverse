import React, { useState } from "react";
import {
  Music,
  Sparkles,
  Info,
  Bookmark,
  BookmarkCheck,
  Play,
  Volume2,
  ChevronRight,
  Disc,
  Feather
} from "lucide-react";
import { PerformingArt, UserFavorite } from "../types";

interface PerformingArtsHubProps {
  arts: PerformingArt[];
  favorites: UserFavorite[];
  onToggleFavorite: (item: UserFavorite) => void;
  onAskSage: (query: string) => void;
}

export const PerformingArtsHub: React.FC<PerformingArtsHubProps> = ({
  arts,
  favorites,
  onToggleFavorite,
  onAskSage,
}) => {
  const [selectedArt, setSelectedArt] = useState<PerformingArt>(arts[0] || null);
  const [activeMudraIndex, setActiveMudraIndex] = useState<number>(0);

  const isFav = (id: string) => favorites.some((f) => f.id === id);

  const classicalMudras = [
    {
      name: "Pataka (Flag Gesture)",
      sanskrit: "पताक",
      symbolism: "Forests, clouds, night, river, sword, blessing of kings",
      description: "All fingers extended straight and joined together with thumb bent touching the palm base. The primary root gesture in Bharatanatyam & Kathakali.",
    },
    {
      name: "Tripataka (Three-Part Flag)",
      sanskrit: "त्रिपताक",
      symbolism: "Crown of deity, thunderbolt (Vajra), tree branches, sacred flames",
      description: "From Pataka, the ring finger is bent downwards. Used to depict royal coronations and Indra's lightning bolt.",
    },
    {
      name: "Alapadma (Full-Blossomed Lotus)",
      sanskrit: "अलपद्म",
      symbolism: "Fully bloomed lotus, circular beauty, mirror, fruit, celestial beauty",
      description: "All fingers separated and curled outwards starting with little finger, resembling a blossoming water lily in dawn sunlight.",
    },
    {
      name: "Mayura (The Peacock)",
      sanskrit: "मयूर",
      symbolism: "Peacock feather, applying sacred Tilak, gentle stroke of hair, wiping tears",
      description: "Tip of the ring finger joins the tip of the thumb while index, middle, and little fingers are extended upwards like peacock plumage.",
    },
    {
      name: "Shikhara (The Peak / Spire)",
      sanskrit: "शिखर",
      symbolism: "Holding a bow (Dhanush), firmness, Shivalinga, ringing a temple bell",
      description: "Fingers curled into a tight fist with thumb extended vertically upwards.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A1C22]/10 text-[#7A1C22] text-xs font-semibold uppercase tracking-wider mb-1">
            <Music className="w-3.5 h-3.5 text-[#E06D14]" />
            <span>Natya Shastra & Cosmic Rhythms</span>
          </div>
          <h1 className="font-cinzel text-3xl font-bold text-[#2C1810]">
            The 8 Classical Dances & Rhythmic Soul
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5848] font-sans">
            From the sculptured geometry of Bharatanatyam to Kathakali's divine epics and Kathak's 27-spin Chakkars.
          </p>
        </div>
      </div>

      {/* Main Feature Dance Stage */}
      {selectedArt && (
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E8DCC4] shadow-md grid grid-cols-1 lg:grid-cols-12">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative h-80 lg:h-auto min-h-[380px] overflow-hidden">
            <img
              src={selectedArt.image}
              alt={selectedArt.name}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
              }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#7A1C22]/90 backdrop-blur-xs text-white text-xs font-bold border border-[#D4AF37]/50">
                {selectedArt.stateName}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#E06D14]/90 backdrop-blur-xs text-white text-xs font-semibold">
                {selectedArt.type}
              </span>
            </div>

            <button
              onClick={() =>
                onToggleFavorite({
                  id: selectedArt.id,
                  type: "dance",
                  title: selectedArt.name,
                  subtitle: `${selectedArt.type} • ${selectedArt.stateName}`,
                  image: selectedArt.image,
                  stateName: selectedArt.stateName,
                  savedAt: new Date().toISOString(),
                })
              }
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-all ${
                isFav(selectedArt.id)
                  ? "bg-[#E06D14] text-white"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              {isFav(selectedArt.id) ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[#F0C05A] font-bold">
                Origin: {selectedArt.originEra}
              </span>
              <h2 className="font-cinzel text-2xl font-bold text-white">
                {selectedArt.name}
              </h2>
            </div>
          </div>

          {/* Right Info Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#4A382C] leading-relaxed">
                {selectedArt.description}
              </p>

              {/* Costume & Adornment Breakdown */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D4BB] space-y-2">
                <span className="text-xs font-bold text-[#7A1C22] uppercase tracking-wider flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-[#E06D14]" />
                  <span>Sacred Costume, Ghungroos & Jewelry:</span>
                </span>
                <p className="text-xs text-[#5C4535] leading-relaxed">
                  {selectedArt.costumeDetails}
                </p>
              </div>

              {/* Instruments Used */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#2C1810] uppercase tracking-wider flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-[#E06D14]" />
                  <span>Classical Accompanying Instruments:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedArt.instrumentsUsed.map((inst, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#FAF0DC] text-[#7A1C22] text-xs font-semibold border border-[#D4AF37]/30"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tala / Rhythm info */}
              <div className="p-3 bg-gradient-to-r from-[#FAF0DC] to-[#F5E6CC] rounded-xl border border-[#D4AF37]/40 text-xs text-[#5C4535]">
                <span className="font-bold text-[#7A1C22]">Rhythmic Beat & Tala: </span>
                <span>{selectedArt.rhythmBeat}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E8DCC4] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() =>
                  onAskSage(
                    `Explain the Navarasas, Mudras, and spiritual philosophy encoded in ${selectedArt.name} of ${selectedArt.stateName}.`
                  )
                }
                className="px-4 py-2 rounded-xl bg-[#7A1C22] text-white text-xs font-semibold hover:bg-[#92222A] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Ask AI Sage Abhinaya Secrets</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Hand Mudras Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCC4] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E06D14]/10 text-[#A04508] text-[11px] font-bold uppercase tracking-wider mb-1">
              <span>Asamyuta Hastas (Single Hand Gestures)</span>
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#2C1810]">
              The Secret Language of Natya Shastra Mudras
            </h3>
          </div>
          <span className="text-xs text-[#8B6E58]">
            Codified by Sage Bharata in 200 BCE
          </span>
        </div>

        {/* Mudra selection tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {classicalMudras.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMudraIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeMudraIndex === idx
                  ? "bg-[#7A1C22] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-[#5C4535] border border-[#E0D4BB] hover:bg-[#EFE7D5]"
              }`}
            >
              <span className="font-rozha text-sm">✋</span>
              <span>{m.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Selected Mudra Display Box */}
        {classicalMudras[activeMudraIndex] && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FAF7F2] via-[#FAF0DC] to-[#F5E6CC] border border-[#D4AF37]/40 space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-cinzel text-lg font-bold text-[#7A1C22]">
                {classicalMudras[activeMudraIndex].name}
              </h4>
              <span className="font-rozha text-lg text-[#A04508]">
                {classicalMudras[activeMudraIndex].sanskrit}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#4A382C] leading-relaxed">
              {classicalMudras[activeMudraIndex].description}
            </p>

            <div className="p-3 bg-white/80 rounded-xl border border-[#D4AF37]/30 text-xs text-[#2C1810]">
              <span className="font-bold text-[#A04508]">Storytelling Symbolism (Viniyoga): </span>
              <span>{classicalMudras[activeMudraIndex].symbolism}</span>
            </div>
          </div>
        )}
      </div>

      {/* Dance Form Grid Cards */}
      <div className="space-y-3">
        <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
          Classical & Folk Traditions of India ({arts.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {arts.map((art) => {
            const isSelected = selectedArt?.id === art.id;
            return (
              <div
                key={art.id}
                onClick={() => setSelectedArt(art)}
                className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isSelected
                    ? "border-[#7A1C22] ring-2 ring-[#7A1C22]/20 shadow-md scale-102 bg-white"
                    : "border-[#E8DCC4] hover:border-[#D4AF37] bg-[#FAF7F2] hover:bg-white"
                }`}
              >
                <div className="relative h-36">
                  <img
                    src={art.image}
                    alt={art.name}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#7A1C22]/90 text-white text-[10px] font-bold">
                    {art.stateName}
                  </span>
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <h4 className="font-cinzel text-xs font-bold truncate text-white">
                      {art.name}
                    </h4>
                    <p className="text-[10px] text-[#EAD8C3] truncate">{art.type}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
