import React, { useState } from "react";
import {
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Heart,
  ChevronRight,
  Info,
  Compass
} from "lucide-react";
import { Festival } from "../types";

interface FestivalCalendarProps {
  festivals: Festival[];
  onAskSage: (query: string) => void;
  onPlanItineraryForFestival: (festival: Festival) => void;
}

export const FestivalCalendar: React.FC<FestivalCalendarProps> = ({
  festivals,
  onAskSage,
  onPlanItineraryForFestival,
}) => {
  const [selectedFestival, setSelectedFestival] = useState<Festival>(festivals[0] || null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E06D14]/10 text-[#A04508] text-xs font-semibold uppercase tracking-wider mb-1">
          <Calendar className="w-3.5 h-3.5 text-[#E06D14]" />
          <span>Cycles of Sun, Moon & Season</span>
        </div>
        <h1 className="font-cinzel text-3xl font-bold text-[#2C1810]">
          The Great Festivals of Bharat
        </h1>
        <p className="text-xs sm:text-sm text-[#6E5848] font-sans">
          From the million lamps of Dev Deepawali in Varanasi to the colorful tribal dances of the Hornbill Festival.
        </p>
      </div>

      {/* Featured Festival Detail Stage */}
      {selectedFestival && (
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E8DCC4] shadow-md grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 relative h-80 lg:h-auto min-h-[360px]">
            <img
              src={selectedFestival.image}
              alt={selectedFestival.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#7A1C22]/90 backdrop-blur-xs text-white text-xs font-bold border border-[#D4AF37]/50">
                {selectedFestival.monthSeason}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#E06D14]/90 backdrop-blur-xs text-white text-xs font-semibold">
                {selectedFestival.celebrationType}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="font-cinzel text-2xl font-bold text-white">
                {selectedFestival.name}
              </h2>
              <p className="text-xs text-[#EAD8C3]">
                Celebrated across: {selectedFestival.states.join(", ")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#7A1C22] uppercase tracking-wider">
                  Mythological & Cosmic Significance:
                </span>
                <p className="text-xs sm:text-sm text-[#4A382C] leading-relaxed mt-1">
                  {selectedFestival.significance}
                </p>
              </div>

              {/* Rituals */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#2C1810] uppercase tracking-wider">
                  Sacred Rituals & Traditional Observances:
                </span>
                <ul className="space-y-1 text-xs text-[#5C4535]">
                  {selectedFestival.rituals.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E06D14] font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sweets & Feast Delicacies */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#2C1810] uppercase tracking-wider">
                  Festive Prasadams & Sweets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFestival.sweetsDelicacies.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#FAF0DC] border border-[#D4AF37]/30 text-[#7A1C22] text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Travel immersion tip */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E0D4BB] text-xs text-[#5C4535] space-y-0.5">
                <span className="font-bold text-[#7A1C22]">Cultural Traveler Tip:</span>
                <p>{selectedFestival.travelTips}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DCC4] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onPlanItineraryForFestival(selectedFestival)}
                className="px-4 py-2 rounded-xl bg-[#7A1C22] text-white text-xs font-semibold hover:bg-[#92222A] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Plan Festival Heritage Itinerary</span>
              </button>

              <button
                onClick={() =>
                  onAskSage(
                    `Tell me the deeper esoteric mythology, regional folklore variations, and sacred mantras associated with ${selectedFestival.name}.`
                  )
                }
                className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#FAF0DC] text-[#7A1C22] hover:bg-[#F2E4C4] border border-[#D4AF37]/40 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E06D14]" />
                <span>Ask Sage AI</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Festival Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {festivals.map((fest) => {
          const isSelected = selectedFestival?.id === fest.id;
          return (
            <div
              key={fest.id}
              onClick={() => setSelectedFestival(fest)}
              className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 bg-white flex flex-col justify-between ${
                isSelected
                  ? "border-[#7A1C22] ring-2 ring-[#7A1C22]/20 shadow-md"
                  : "border-[#E8DCC4] hover:border-[#D4AF37] shadow-xs"
              }`}
            >
              <div className="relative h-44">
                <img
                  src={fest.image}
                  alt={fest.name}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#7A1C22]/90 text-white text-[10px] font-bold">
                  {fest.monthSeason}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-cinzel text-base font-bold text-white">
                    {fest.name}
                  </h3>
                  <p className="text-[11px] text-[#F0C05A] italic">
                    {fest.celebrationType}
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-xs text-[#5C4535] line-clamp-2">
                  {fest.significance}
                </p>
                <div className="pt-2 border-t border-[#F0E6D2] flex items-center justify-between text-xs text-[#7A1C22] font-semibold">
                  <span>Explore Rituals & Feasts</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
