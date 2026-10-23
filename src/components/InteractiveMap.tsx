import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Landmark,
  Palette,
  BookOpen,
  Flame,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Layers,
  X,
  Compass,
  Info
} from "lucide-react";
import { IndianState } from "../types";
import { Language, UI_TRANSLATIONS } from "../utils/translations";
import {
  INDIA_MAP_REGIONS,
  STATE_28_GRADIENT_PALETTE,
  UT_COLOR,
  MapRegion,
} from "../data/indiaMapPaths";
import { ACCURATE_MAP_PATHS } from "../data/accurateIndiaMapPaths";

interface InteractiveMapProps {
  states: IndianState[];
  onSelectState: (state: IndianState) => void;
  onExploreCategory: (category: string, filterVal?: string) => void;
  onAskSage: (query: string) => void;
  language?: Language;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  states,
  onSelectState,
  onExploreCategory,
  onAskSage,
  language = "en",
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedZone, setSelectedZone] = useState<string>("All");
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string>("andhra-pradesh");

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const zones = [
    { id: "All", label: t.allRegions },
    { id: "South", label: t.southIndia },
    { id: "North", label: t.northIndia },
    { id: "West", label: t.westIndia },
    { id: "East", label: t.eastIndia },
    { id: "North-East", label: t.northeastIndia },
  ];

  // Helper to resolve an IndianState from MapRegion
  const resolveStateObj = (region: MapRegion): IndianState => {
    const existing = states.find(
      (s) => s.id === region.id || s.code.toLowerCase() === region.code.toLowerCase()
    );
    if (existing) return existing;

    // Fallback synthesized IndianState for full coverage of all 28 states + 8 UTs
    return {
      id: region.id,
      name: region.name,
      code: region.code,
      zone: region.zone,
      capital: region.capital,
      officialLanguages: ["Hindi", "English"],
      emblemTagline: region.tagline,
      description: region.description,
      culturalEssence: region.description,
      heroImage: region.heroImage,
      coordinates: { lat: 20.5937, lng: 78.9629 },
      heritageSitesCount: region.isUT ? 6 : 14,
      craftsCount: region.isUT ? 4 : 12,
      unescoSites: [region.primaryMonument],
      iconicMonuments: [
        {
          id: `${region.id}-monument`,
          name: region.primaryMonument,
          stateId: region.id,
          stateName: region.name,
          periodEra: "Ancient / Classical Era",
          dynasty: "Indigenous Heritage",
          architectureStyle: "Traditional Indian Architecture",
          unescoStatus: true,
          description: `A celebrated cultural monument in ${region.name}.`,
          image: region.heroImage,
          coordinates: { lat: 20.5937, lng: 78.9629 },
          acousticOrAstronomicalSecrets: "Renowned for ancient stone acoustics and astrological alignments.",
          audioNarrationScript: `Welcome to ${region.primaryMonument} in the historic realm of ${region.name}.`,
          virtualTourHighlights: ["Main Sanctum", "Sculpted Carvings", "Historic Gateway"],
          historicalSignificance: region.tagline,
          tags: ["Heritage", "Architecture", "Sacred Sites"],
          googleMapsUrl:
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(`${region.primaryMonument}, ${region.name}`),
        },
      ],
      craftsAndArts: [
        {
          id: `${region.id}-craft`,
          name: region.primaryCraft,
          stateId: region.id,
          stateName: region.name,
          category: "Folk Craft",
          giTagged: true,
          rawMaterials: ["Natural Fibers", "Earthen Pigments", "Local Wood/Metal"],
          ancientTechnique: "Generational hand-crafting technique",
          historicalOriginEra: "Ancient Heritage",
          description: `Masterpiece artisan craft unique to ${region.name}.`,
          image: region.heroImage,
          artisanCommunity: "Indigenous Master Guilds",
          howItsMadeSteps: ["Material Gathering", "Artisan Modeling", "Traditional Curing"],
        },
      ],
      dancesAndMusic: [
        {
          id: `${region.id}-dance`,
          name: region.primaryTradition,
          stateId: region.id,
          stateName: region.name,
          type: "Folk Dance",
          description: `Vibrant performing art celebrating the soul and festivals of ${region.name}.`,
          costumeDetails: "Traditional silk/cotton attire with symbolic ornamentation",
          instrumentsUsed: ["Dhol", "Flute", "Cymbals"],
          mudrasAndMovements: ["Rhythmic Footwork", "Expressive Mudras"],
          image: region.heroImage,
          rhythmBeat: "Energetic Folk Rhythm",
          originEra: "Classical / Folk Era",
        },
      ],
      culinaryDelicacies: [
        {
          id: `${region.id}-food`,
          name: `${region.name} Traditional Feast`,
          stateId: region.id,
          stateName: region.name,
          type: "Festive Feast",
          description: `Authentic regional flavors and centuries-old culinary wisdom of ${region.name}.`,
          keyIngredients: ["Indigenous Spices", "Grains", "Clarified Butter"],
          ayurvedicProperty: "Balances Tridoshas through seasonal ingredients",
          historicalLore: region.primaryLore,
          image: region.heroImage,
        },
      ],
      livingArtisans: [],
      ancientLegends: [
        {
          id: `${region.id}-lore`,
          title: region.primaryLore,
          stateName: region.name,
          category: "Legends",
          monumentOrEntity: region.primaryMonument,
          era: "Ancient Lore",
          shortTagline: region.tagline,
          narrative: region.description,
          moralPhilosophicalCore: "Harmony with nature and veneration of cultural roots.",
          audioMinutes: 4,
          image: region.heroImage,
        },
      ],
    };
  };

  // State filtering logic
  const filteredRegions = useMemo(() => {
    return INDIA_MAP_REGIONS.filter((region) => {
      const matchZone = selectedZone === "All" || region.zone === selectedZone;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        region.name.toLowerCase().includes(q) ||
        region.code.toLowerCase().includes(q) ||
        region.capital.toLowerCase().includes(q) ||
        region.tagline.toLowerCase().includes(q) ||
        region.primaryMonument.toLowerCase().includes(q) ||
        region.primaryCraft.toLowerCase().includes(q);

      return matchZone && matchSearch;
    });
  }, [selectedZone, searchQuery]);

  // Active region calculation (Hovered or explicitly selected or first filtered)
  const activeRegion: MapRegion = useMemo(() => {
    if (hoveredRegionId) {
      const found = INDIA_MAP_REGIONS.find((r) => r.id === hoveredRegionId);
      if (found) return found;
    }
    const selected = INDIA_MAP_REGIONS.find((r) => r.id === selectedRegionId);
    if (selected) return selected;
    return filteredRegions[0] || INDIA_MAP_REGIONS[0];
  }, [hoveredRegionId, selectedRegionId, filteredRegions]);

  const activeStateObj = useMemo(() => resolveStateObj(activeRegion), [activeRegion, states]);

  // Filter 28 states list for indexing gradient colors
  const nonUTStates = useMemo(() => INDIA_MAP_REGIONS.filter((r) => !r.isUT), []);

  const getRegionFillColor = (region: MapRegion) => {
    if (region.isUT) {
      // Give each UT its own warm accent so the smaller territories remain legible.
      const utIndex = INDIA_MAP_REGIONS.filter((r) => r.isUT).findIndex((r) => r.id === region.id);
      const utPalette = ["#7C3F35", "#8F5E4E", "#A56B4F", "#9B513C", "#B47758", "#7A514A", "#C18461", "#94624A"];
      return utPalette[utIndex] || UT_COLOR;
    }
    const stateIndex = nonUTStates.findIndex((s) => s.id === region.id);
    if (stateIndex >= 0 && stateIndex < STATE_28_GRADIENT_PALETTE.length) {
      return STATE_28_GRADIENT_PALETTE[stateIndex];
    }
    return "#77212A";
  };

  const lightenHex = (hex: string, amount: number) => {
    const value = hex.replace("#", "");
    const number = Number.parseInt(value, 16);
    const r = (number >> 16) & 255;
    const g = (number >> 8) & 255;
    const b = number & 255;
    const mix = (channel: number) => Math.round(channel + (255 - channel) * amount);
    return `#${[mix(r), mix(g), mix(b)].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  };

  const getRegionGradient = (region: MapRegion) => {
    const base = getRegionFillColor(region);
    return { start: lightenHex(base, 0.12), end: lightenHex(base, 0.48) };
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#E06D14]">
          {t.exploreIndia}
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#2C1810]">
          {t.exploreIndia}
        </h1>
        <p className="text-sm text-[#6E5848] font-sans">
          {t.heroSubtitle}
        </p>
      </div>

      {/* Search & Region Filter Bar */}
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8B6E58] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchStatePlaceholder}
            className="w-full pl-11 pr-10 py-3 bg-white border border-[#DCCDB0] rounded-2xl text-sm text-[#2C1810] placeholder-[#8B6E58] shadow-xs focus:outline-hidden focus:border-[#7A1C22] focus:ring-1 focus:ring-[#7A1C22]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Region Pills */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 pt-1">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedZone === zone.id
                  ? "bg-[#7A1C22] text-[#FDFBF7] shadow-xs"
                  : "bg-white/80 text-[#5C4535] border border-[#E0D5C1] hover:bg-[#F2E8D3]"
              }`}
            >
              {zone.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Map Stage (Left / Center) */}
        <div className="lg:col-span-8 bg-gradient-to-b from-[#FAF0DC]/60 via-white/90 to-[#F5EAD6]/60 rounded-3xl p-4 sm:p-7 border border-[#D4AF37]/35 shadow-sm relative min-h-[540px] flex flex-col items-center justify-between overflow-hidden">

          {/* Top Map Legend & Indicators */}
          <div className="w-full flex items-center justify-between text-xs text-[#6E5848] px-2 py-1 z-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs border border-white shadow-2xs" style={{ background: "linear-gradient(to right, #4E1016, #DA7551)" }}></span>
                <span className="text-[11px] font-medium text-[#4A3222]">28 States (Terracotta Gradient)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#8F5E4E] border border-amber-300 shadow-2xs"></span>
                <span className="text-[11px] font-medium text-[#4A3222]">8 Union Territories</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#8B6E58]">
              <Compass className="w-3.5 h-3.5 text-[#E06D14]" />
              <span>Interactive Choropleth</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full max-w-[720px] aspect-[800/880] flex items-center justify-center my-2 select-none">
            <svg
              viewBox="0 0 800 880"
              className="w-full h-full drop-shadow-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#E06D14" floodOpacity="0.8" />
                </filter>
                <filter id="stateShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#2C1810" floodOpacity="0.16" />
                </filter>
                {INDIA_MAP_REGIONS.map((region) => {
                  const gradient = getRegionGradient(region);
                  return (
                    <linearGradient
                      key={`${region.id}-gradient`}
                      id={`gradient-${region.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={gradient.start} />
                      <stop offset="100%" stopColor={gradient.end} />
                    </linearGradient>
                  );
                })}
              </defs>

              {/* Precise GeoJSON-derived boundaries: each visible region owns its own hover target. */}
              <g>
                {INDIA_MAP_REGIONS.map((region) => {
                  const isMatchingFilter = filteredRegions.some((r) => r.id === region.id);
                  const isHovered = hoveredRegionId === region.id;
                  const isSelected = activeRegion.id === region.id;
                  const fillColor = isHovered || isSelected ? "#E06D14" : `url(#gradient-${region.id})`;
                  const opacity = isMatchingFilter ? 1 : 0.22;

                  return (
                    <g key={region.id} className="cursor-pointer transition-all duration-200">
                      <path
                        id={`map-state-${region.id}`}
                        d={ACCURATE_MAP_PATHS[region.id] || region.path}
                        fill={fillColor}
                        stroke={isHovered || isSelected ? "#FFFDF5" : "#FFF9EE"}
                        strokeWidth={isHovered || isSelected ? 3 : 1}
                        vectorEffect="non-scaling-stroke"
                        strokeLinejoin="round"
                        opacity={opacity}
                        filter={isHovered || isSelected ? "url(#activeGlow)" : "url(#stateShadow)"}
                        className="transition-all duration-200 hover:brightness-110"
                        onMouseEnter={() => setHoveredRegionId(region.id)}
                        onMouseLeave={() => setHoveredRegionId(null)}
                        onClick={() => {
                          setSelectedRegionId(region.id);
                          onSelectState(resolveStateObj(region));
                        }}
                      />

                    </g>
                  );
                })}
              </g>

              {/* Floating Active State Badge on Map */}
              {activeRegion && (
                <g
                  transform={`translate(${Math.min(Math.max(activeRegion.center.x, 90), 710)}, ${Math.max(activeRegion.center.y - 30, 45)})`}
                  pointerEvents="none"
                  className="transition-all duration-200"
                >
                  <rect
                    x="-65"
                    y="-16"
                    width="130"
                    height="24"
                    rx="12"
                    fill="#2C1810"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    opacity="0.95"
                    filter="url(#stateShadow)"
                  />
                  <text
                    x="0"
                    y="-2"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#FDFBF7"
                    fontSize="10.5"
                    fontWeight="700"
                    className="font-cinzel"
                  >
                    {activeRegion.name}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Map Status Hint */}
          <div className="w-full text-center pt-2 pb-1 border-t border-[#E8DCC4]/60">
            <span className="text-xs text-[#8B6E58] font-serif italic">
              Click any state or Union Territory to view regional heritage • Select "Explore {activeRegion.name}" for the complete cultural journey
            </span>
          </div>
        </div>

        {/* Dynamic State Preview Panel (Right Side) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 border border-[#EADCC9] shadow-lg space-y-5 transition-all">
              {/* State Image Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden aspect-16/9 shadow-xs group">
              <img
                src={activeRegion.heroImage}
                alt={`${activeRegion.name} cultural heritage`}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 text-[#7A1C22] shadow-xs">
                  {activeRegion.isUT ? "Union Territory" : `${activeRegion.code}`}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#E06D14]">
                  {activeStateObj.zone} India • Capital: {activeRegion.capital}
                </span>
                <h3 className="font-cinzel text-xl font-bold mt-1 text-[#FDFBF7]">
                  {activeStateObj.name}
                </h3>
              </div>
            </div>

            {/* Poetic Tagline & Description */}
            <div className="space-y-3 px-1">
             <p className="text-sm font-serif italic text-[#8B4513] font-medium leading-relaxed">
              "{activeStateObj.emblemTagline}"
            </p>

            <p className="text-sm text-[#5C4535] font-sans leading-relaxed">
             {activeStateObj.culturalEssence || activeStateObj.description}
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
