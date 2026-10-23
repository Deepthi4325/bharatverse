import React, { useState } from "react";
import {
  X,
  MapPin,
  Landmark,
  Compass,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  Navigation,
  Car,
  Train,
  Plane,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  Info
} from "lucide-react";
import { Monument, UserFavorite } from "../types";
import { speakNarrative } from "../utils/audioSynth";
import { Language, UI_TRANSLATIONS } from "../utils/translations";

interface MonumentDetailModalProps {
  monument: Monument | null;
  onClose: () => void;
  favorites: UserFavorite[];
  onToggleFavorite: (item: UserFavorite) => void;
  onAskSage: (query: string) => void;
  language?: Language;
}

export const MonumentDetailModal: React.FC<MonumentDetailModalProps> = ({
  monument,
  onClose,
  favorites,
  onToggleFavorite,
  onAskSage,
  language = "en",
}) => {
  const [departureCity, setDepartureCity] = useState<string>("Delhi");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechController, setSpeechController] = useState<{ stop: () => void } | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  if (!monument) return null;

  const isFavorited = favorites.some((f) => f.id === monument.id && f.type === "monument");

  const handleFavoriteToggle = () => {
    onToggleFavorite({
      id: monument.id,
      type: "monument",
      title: monument.name,
      subtitle: `${monument.stateName} • ${monument.periodEra}`,
      image: monument.image,
      stateName: monument.stateName,
      savedAt: new Date().toLocaleDateString(),
    });
  };

  const toggleAudioGuide = () => {
    if (isPlayingAudio) {
      speechController?.stop();
      setIsPlayingAudio(false);
      setSpeechController(null);
    } else {
      const fullText = `${monument.name} in ${monument.stateName}. ${monument.description}. Secrets of design: ${monument.acousticOrAstronomicalSecrets}. ${monument.audioNarrationScript}`;
      const controller = speakNarrative(
        fullText,
        () => setIsPlayingAudio(true),
        () => {
          setIsPlayingAudio(false);
          setSpeechController(null);
        },
        () => {
          setIsPlayingAudio(false);
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

  // Travel calculation based on monument and departure city
  const getTravelEstimates = (city: string) => {
    const isNearby =
      (city === "Bengaluru" && (monument.stateName === "Karnataka" || monument.name.includes("Lepakshi"))) ||
      (city === "Delhi" && (monument.stateName === "Uttar Pradesh" || monument.stateName === "Rajasthan")) ||
      (city === "Chennai" && monument.stateName === "Tamil Nadu") ||
      (city === "Kochi" && monument.stateName === "Kerala") ||
      (city === "Bhubaneswar" && monument.stateName === "Odisha") ||
      (city === "Ahmedabad" && monument.stateName === "Gujarat");

    const roadHours = isNearby ? 2.5 : city === "Delhi" ? 18 : 14;
    const trainHours = isNearby ? 3 : city === "Delhi" ? 22 : 16;
    const flightHours = isNearby ? 1 : 2.5;

    return {
      road: {
        duration: isNearby ? `~${roadHours} hrs drive` : `~${roadHours} - 24 hrs`,
        route: `National Highway via ${city} Corridor to ${monument.stateName}`,
        scenic: "Scenic rural landscapes with traditional roadside Dhaba stops.",
      },
      train: {
        duration: isNearby ? `~${trainHours} hrs express` : `~${trainHours} - 26 hrs`,
        station: monument.nearestRailwayStation || "Nearest Central Junction",
        service: "Direct Superfast / Vande Bharat / Express options available.",
      },
      air: {
        duration: `~${flightHours} hrs direct flight`,
        airport: monument.nearestAirport || "Nearest Regional / International Airport",
        transfer: "Prepaid airport taxis & luxury coaches directly connected to the site.",
      },
    };
  };

  const travel = getTravelEstimates(departureCity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Hero Header */}
        <div className="relative h-64 sm:h-72 shrink-0 overflow-hidden">
          <img
            src={monument.image}
            alt={monument.name}
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-[#2C1810]/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors z-10"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {monument.unescoStatus && (
              <span className="px-3 py-1 rounded-full bg-[#E06D14] text-white text-xs font-bold shadow-xs">
                UNESCO World Heritage
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium border border-white/20">
              {monument.periodEra}
            </span>
            <button
              onClick={handleFavoriteToggle}
              className={`p-1.5 rounded-full backdrop-blur-xs border transition-colors ${
                isFavorited
                  ? "bg-[#D4AF37] text-[#2C1810] border-[#D4AF37]"
                  : "bg-black/40 text-white border-white/30 hover:bg-black/60"
              }`}
              title={isFavorited ? "Saved in collection" : "Save monument"}
            >
              {isFavorited ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>

          {/* Monument Title */}
          <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#FDFBF7]">
              {monument.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#F0C05A] font-serif italic">
              {monument.stateName} • {monument.dynasty}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Action Bar (Audio Guide & Get Directions) */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#FAF0DC] rounded-2xl border border-[#D4AF37]/40 shadow-xs">
            {/* Audio Guide Narration */}
            <button
              onClick={toggleAudioGuide}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isPlayingAudio
                  ? "bg-[#7A1C22] text-white shadow-xs"
                  : "bg-white text-[#7A1C22] border border-[#D4AF37]/50 hover:bg-[#F5EAD6]"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-[#E06D14]" />
                  <span>{t.stopNarration}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#E06D14]" />
                  <span>{t.listenNarration}</span>
                </>
              )}
            </button>

            {/* Google Maps Get Directions */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                monument.name + " " + monument.stateName
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#7A1C22] text-white hover:bg-[#5A151B] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.directionsGmaps}</span>
            </a>
          </div>

          {/* Architectural Significance */}
          <div className="space-y-2">
            <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
              Architectural & Historical Significance
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4535] font-sans leading-relaxed">
              {monument.description}
            </p>
            <p className="text-xs text-[#8B6E58] font-sans">
              <span className="font-semibold text-[#2C1810]">Architecture Style: </span>
              {monument.architectureStyle}
            </p>
          </div>

          {/* Astronomical & Acoustic Secrets */}
          <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A1C22]">
              <Sparkles className="w-4 h-4 text-[#E06D14]" />
              <span>Acoustic & Astronomical Secrets</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5C4535] font-serif italic leading-relaxed">
              "{monument.acousticOrAstronomicalSecrets}"
            </p>
          </div>

          {/* Virtual Highlights */}
          <div className="space-y-2">
            <h4 className="font-cinzel text-sm font-bold text-[#2C1810]">
              Key Architectural Marvels to Observe
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {monument.virtualTourHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-white rounded-xl border border-[#E8DCC4] text-xs font-medium text-[#5C4535] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E06D14]"></span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Your Journey / Travel Time Calculator */}
          <div className="bg-gradient-to-br from-[#FAF0DC]/70 to-[#F2E8D3]/70 p-5 rounded-2xl border border-[#D4AF37]/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#E06D14]" />
                <h4 className="font-cinzel text-base font-bold text-[#2C1810]">
                  Plan Your Journey & Travel Time Calculator
                </h4>
              </div>

              {/* City Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#6E5848]">From:</span>
                <select
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-[#DCCDB0] rounded-xl text-xs text-[#2C1810] font-semibold focus:outline-hidden focus:border-[#7A1C22]"
                >
                  <option value="Delhi">Delhi / NCR</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Bhubaneswar">Bhubaneswar</option>
                </select>
              </div>
            </div>

            {/* Travel Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {/* By Road */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E8DCC4] space-y-1 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7A1C22]">
                  <Car className="w-4 h-4 text-[#E06D14]" />
                  <span>By Road</span>
                </div>
                <p className="text-xs font-semibold text-[#2C1810]">{travel.road.duration}</p>
                <p className="text-[11px] text-[#6E5848] leading-tight">{travel.road.route}</p>
              </div>

              {/* By Train */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E8DCC4] space-y-1 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7A1C22]">
                  <Train className="w-4 h-4 text-[#E06D14]" />
                  <span>By Train</span>
                </div>
                <p className="text-xs font-semibold text-[#2C1810]">{travel.train.duration}</p>
                <p className="text-[11px] text-[#6E5848] leading-tight">{travel.train.station}</p>
              </div>

              {/* By Air */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E8DCC4] space-y-1 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7A1C22]">
                  <Plane className="w-4 h-4 text-[#E06D14]" />
                  <span>By Air</span>
                </div>
                <p className="text-xs font-semibold text-[#2C1810]">{travel.air.duration}</p>
                <p className="text-[11px] text-[#6E5848] leading-tight">{travel.air.airport}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DCC4] flex items-center justify-between">
          <button
            onClick={() => onAskSage(`Tell me the secret astronomical and architectural details of ${monument.name}`)}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#FAF0DC] text-[#7A1C22] border border-[#D4AF37]/50 hover:bg-[#F2E4C4] transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E06D14]" />
            <span>Ask Sage About {monument.name}</span>
          </button>

          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-full text-xs font-semibold bg-[#7A1C22] text-white hover:bg-[#5A151B] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
