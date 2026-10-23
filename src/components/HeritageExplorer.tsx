import React, { useState, useMemo } from "react";
import {
  Landmark,
  ArrowRight,
  Navigation,
  Bookmark,
  BookmarkCheck,
  Search,
  ChevronRight,
  X,
} from "lucide-react";

import { Monument, UserFavorite } from "../types";
import { MonumentDetailModal } from "./MonumentDetailModal";
import { Language, UI_TRANSLATIONS } from "../utils/translations";
import { unescoSites } from "../data/unescoSitesData";

interface HeritageExplorerProps {
  monuments: Monument[];
  favorites: UserFavorite[];
  onToggleFavorite: (item: UserFavorite) => void;
  onAskSage: (query: string) => void;
  language?: Language;
}

export const HeritageExplorer: React.FC<HeritageExplorerProps> = ({
  monuments: _monuments,
  favorites,
  onToggleFavorite,
  onAskSage,
  language = "en",
}) => {
  const [selectedMonument, setSelectedMonument] =
    useState<Monument | null>(null);

  const [selectedRegion, setSelectedRegion] =
    useState<string>("All");

  const [searchQuery, setSearchQuery] =
    useState<string>("");

  const t =
    UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  /*
   * Convert UNESCO site data into the existing Monument format.
   * This allows the existing modal and favorites system to continue working.
   */
  const allUnescoMonuments = useMemo(() => {
  return unescoSites.map((site): Monument => ({
  id: site.id,
  name: site.name,

  stateId: site.stateName.toLowerCase().replace(/\s+/g, "-"),
  stateName: site.stateName,

  image:
    site.image ||
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",

  periodEra: site.periodEra,

  dynasty: site.dynasty,

  architectureStyle: site.dynasty,

  unescoStatus: true,

  description: site.description,

  coordinates: {
    lat: 0,
    lng: 0,
  },

  acousticOrAstronomicalSecrets: "Historical and architectural secrets waiting to be explored.",

  audioNarrationScript: site.description,

  virtualTourHighlights: [
    "Explore the architectural details",
    "Discover its historical significance",
    "Experience India's cultural heritage",
  ],

  historicalSignificance: site.description,

  tags: ["UNESCO", "Cultural Heritage", site.stateName],

  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(site.name + ", " + site.stateName),
}));
}, []);

  const regions = [
    { id: "All", label: t.allRegions },
    { id: "South", label: t.southIndia },
    { id: "North", label: t.northIndia },
    { id: "West", label: t.westIndia },
    { id: "East", label: t.eastIndia },
    { id: "North-East", label: t.northeastIndia },
  ];

  /*
   * Region-wise classification of UNESCO sites
   */
  const getRegion = (state: string) => {
    const south = [
      "Andhra Pradesh",
      "Telangana",
      "Tamil Nadu",
      "Karnataka",
      "Kerala",
    ];

    const north = [
      "Delhi",
      "Uttar Pradesh",
      "Rajasthan",
      "Himachal Pradesh",
      "Uttarakhand",
      "Haryana",
      "Jammu and Kashmir",
      "Ladakh",
      "Punjab",
    ];

    const west = [
      "Gujarat",
      "Maharashtra",
      "Goa",
      "Madhya Pradesh",
    ];

    const east = [
      "Bihar",
      "Odisha",
      "West Bengal",
      "Jharkhand",
      "Chhattisgarh",
    ];

    const northEast = [
      "Assam",
      "Arunachal Pradesh",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Sikkim",
      "Tripura",
    ];

    if (south.includes(state)) return "South";
    if (north.includes(state)) return "North";
    if (west.includes(state)) return "West";
    if (east.includes(state)) return "East";
    if (northEast.includes(state)) return "North-East";

    return "Other";
  };

  /*
   * Search and region filtering
   */
  const filteredMonuments = useMemo(() => {
    return allUnescoMonuments.filter((m) => {
      const matchRegion =
        selectedRegion === "All" ||
        getRegion(m.stateName) === selectedRegion;

      const q = searchQuery.toLowerCase().trim();

      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.stateName.toLowerCase().includes(q) ||
        m.architectureStyle.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.periodEra.toLowerCase().includes(q);

      return matchRegion && matchSearch;
    });
  }, [
    allUnescoMonuments,
    selectedRegion,
    searchQuery,
  ]);

  /*
   * Featured UNESCO Sites
   */
  const topFeaturedMonuments =
    allUnescoMonuments.slice(0, 3);

  return (
    <div className="space-y-12 py-2">

      {/* Section Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-3">

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0DC] border border-[#D4AF37]/50 text-[#7A1C22] text-xs font-bold uppercase tracking-widest">
          <Landmark className="w-3.5 h-3.5 text-[#E06D14]" />
          <span>{t.sacredArchitecture}</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-[#2C1810]">
          {t.monumentsTitle}
        </h1>

        <p className="text-sm sm:text-base text-[#6E5848] font-sans leading-relaxed">
          {t.monumentsSubtitle}
        </p>

      </div>


      {/* Featured UNESCO Sites */}
      {!searchQuery && selectedRegion === "All" && (
        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <h2 className="font-cinzel text-xl font-bold text-[#2C1810]">
              {t.featuredMasterpieces}
            </h2>

            <span className="text-xs text-[#8B6E58] font-serif italic">
              {t.touchToExplore}
            </span>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {topFeaturedMonuments.map((monument) => (

              <div
                key={monument.id}
                onClick={() =>
                  setSelectedMonument(monument)
                }
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-[#D4AF37]/35 transition-all duration-300 hover:-translate-y-1 flex flex-col h-96"
              >

                <img
                  src={monument.image}
                  alt={monument.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80";
                  }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-[#2C1810]/40 to-transparent" />


                <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">

                  <div className="flex items-center justify-between">

                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#E06D14] text-white">
                      {monument.stateName}
                    </span>

                    {monument.unescoStatus && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/40 border border-[#D4AF37]/40 text-[#F0C05A]">
                        UNESCO
                      </span>
                    )}

                  </div>


                  <div className="space-y-2">

                    <span className="text-xs text-[#F0C05A] font-serif italic">
                      {monument.periodEra}
                    </span>

                    <h3 className="font-cinzel text-xl font-bold text-[#FDFBF7] leading-tight">
                      {monument.name}
                    </h3>

                    <p className="text-xs text-[#EAD8C3] font-sans line-clamp-2 leading-relaxed">
                      {monument.description}
                    </p>

                    <div className="pt-2 flex items-center text-xs font-semibold text-[#F0C05A] group-hover:translate-x-1 transition-transform gap-1">
                      <span>{t.exploreMarvel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
      )}


      {/* Search & Region Filters */}
      <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-[#E8DCC4] shadow-xs space-y-4">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Search */}
          <div className="relative w-full sm:w-80">

            <Search className="w-4 h-4 text-[#8B6E58] absolute left-3.5 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder={t.searchMonumentPlaceholder}
              className="w-full pl-10 pr-10 py-2.5 bg-[#FAF7F2] border border-[#DCCDB0] rounded-xl text-xs sm:text-sm text-[#2C1810] placeholder-[#8B6E58] focus:outline-none focus:border-[#7A1C22]"
            />

            {searchQuery && (
              <button
                onClick={() =>
                  setSearchQuery("")
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}

          </div>


          {/* Regions */}
          <div className="flex items-center gap-1.5 flex-wrap">

            {regions.map((reg) => (

              <button
                key={reg.id}
                onClick={() =>
                  setSelectedRegion(reg.id)
                }
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedRegion === reg.id
                    ? "bg-[#7A1C22] text-[#FDFBF7] shadow-xs"
                    : "bg-[#FAF7F2] text-[#5C4535] border border-[#E0D5C1] hover:bg-[#F2E8D3]"
                }`}
              >
                {reg.label}
              </button>

            ))}

          </div>

        </div>

      </div>


      {/* UNESCO Cultural Heritage Grid */}
      <div className="space-y-4">

        <h2 className="font-cinzel text-xl font-bold text-[#2C1810]">
          INDIA'S CULTURAL HERITAGE TREASURES ({filteredMonuments.length})
        </h2>


        {filteredMonuments.length === 0 ? (

          <div className="text-center py-16 bg-[#FAF7F2] rounded-2xl border border-[#E8DCC4]">

            <Landmark className="w-10 h-10 mx-auto text-[#D4AF37] mb-3" />

            <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
              No Heritage Sites Found
            </h3>

            <p className="text-sm text-[#8B6E58] mt-2">
              Try searching for another monument or region.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredMonuments.map((monument) => {

              const isFav = favorites.some(
                (f) => f.id === monument.id
              );

              return (

                <div
                  key={monument.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC4] shadow-sm hover:shadow-md transition-all flex flex-col group"
                >

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">

                    <img
                      src={monument.image}
                      alt={monument.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />


                    {/* State + UNESCO Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">

                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#7A1C22] text-white">
                        {monument.stateName}
                      </span>

                      {monument.unescoStatus && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-[#E06D14] text-white">
                          UNESCO
                        </span>
                      )}

                    </div>


                    {/* Favorite */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        onToggleFavorite({
                          id: monument.id,
                          type: "monument",
                          title: monument.name,
                          subtitle: `${monument.stateName} • ${monument.periodEra}`,
                          image: monument.image,
                          stateName: monument.stateName,
                          savedAt:
                            new Date().toLocaleDateString(),
                        });
                      }}
                      className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-xs transition-colors ${
                        isFav
                          ? "bg-[#D4AF37] text-[#2C1810]"
                          : "bg-black/40 text-white hover:bg-black/60"
                      }`}
                      title={isFav ? "Saved" : "Save"}
                    >
                      {isFav ? (
                        <BookmarkCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>


                    {/* Period */}
                    <div className="absolute bottom-2 left-3 right-3 text-white">

                      <span className="text-[10px] font-serif italic text-[#F0C05A]">
                        {monument.periodEra} • {monument.dynasty}
                      </span>

                    </div>

                  </div>


                  {/* Card Information */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">

                    <div className="space-y-1.5">

                      <h3 className="font-cinzel text-lg font-bold text-[#2C1810] group-hover:text-[#7A1C22] transition-colors">
                        {monument.name}
                      </h3>

                      <p className="text-xs text-[#5C4535] font-sans line-clamp-2 leading-relaxed">
                        {monument.description}
                      </p>

                    </div>


                    <div className="pt-3 border-t border-[#E8DCC4] flex items-center justify-between">

                      {/* Explore */}
                      <button
                        onClick={() =>
                          setSelectedMonument(monument)
                        }
                        className="text-xs font-semibold text-[#7A1C22] hover:text-[#5A151B] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>{t.exploreMarvel}</span>

                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>


                      {/* Google Maps */}
                      <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${monument.name} ${monument.stateName}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="p-1.5 rounded-lg bg-[#FAF0DC] text-[#7A1C22] hover:bg-[#F2E4C4] border border-[#D4AF37]/40 transition-colors"
  title="Directions in Google Maps"
  onClick={(e) => e.stopPropagation()}
>
  <Navigation className="w-3.5 h-3.5" />
</a>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>


      {/* Monument Detail Modal */}
      {selectedMonument && (

        <MonumentDetailModal
          monument={selectedMonument}
          onClose={() =>
            setSelectedMonument(null)
          }
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onAskSage={onAskSage}
          language={language}
        />

      )}

    </div>
  );
};