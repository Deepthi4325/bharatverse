import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { InteractiveMap } from "./components/InteractiveMap";
import { HeritageExplorer } from "./components/HeritageExplorer";
import { ArtisanCraftVault } from "./components/ArtisanCraftVault";
import { StoriesHub } from "./components/StoriesHub";
import { TraditionsHub } from "./components/TraditionsHub";
import { CulturalSageAI } from "./components/CulturalSageAI";
import { HeritageQuizModal } from "./components/HeritageQuizModal";
import { ItineraryPlannerModal } from "./components/ItineraryPlannerModal";
import { StateDetailModal } from "./components/StateDetailModal";
import { FavoritesDrawer } from "./components/FavoritesDrawer";

import { statesData } from "./data/statesData";
import { initialQuizQuestions } from "./data/quizData";
import { IndianState, UserFavorite, LegendStory, Monument } from "./types";
import { Sparkles, Compass, Landmark, Palette, BookOpen, Flame, Heart } from "lucide-react";
import { Language, UI_TRANSLATIONS } from "./utils/translations";

export function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("bharatverse_lang");
      return (saved as Language) || "en";
    } catch {
      return "en";
    }
  });

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem("bharatverse_lang", newLang);
    } catch {}
  };

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<UserFavorite[]>(() => {
    try {
      const saved = localStorage.getItem("bharatverse_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("bharatverse_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const handleToggleFavorite = (item: UserFavorite) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) {
        return prev.filter((f) => f.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const handleClearAllFavorites = () => {
    setFavorites([]);
  };

  // Modals & Drawers States
  const [isSageOpen, setIsSageOpen] = useState(false);
  const [sageQuery, setSageQuery] = useState("");

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [itineraryDestination, setItineraryDestination] = useState<string>("Rajasthan");

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [selectedStateModal, setSelectedStateModal] = useState<IndianState | null>(null);

  // Aggregate collections across all states
  const allMonuments = useMemo(() => {
    return statesData.flatMap((s) => s.iconicMonuments);
  }, []);

  const allCrafts = useMemo(() => {
    return statesData.flatMap((s) => s.craftsAndArts);
  }, []);

  const allArtisans = useMemo(() => {
    return statesData.flatMap((s) => s.livingArtisans);
  }, []);

  const allStories = useMemo(() => {
    return statesData.flatMap((s) => s.ancientLegends);
  }, []);

  const featuredStory: LegendStory = allStories[0] || {
    id: "legend-lepakshi",
    title: "The Legend of Jatayu & The Hanging Pillar",
    stateName: "Andhra Pradesh",
    category: "Legends",
    monumentOrEntity: "Veerabhadra Temple, Lepakshi",
    era: "Treta Yuga & 1530 CE",
    shortTagline: "A tale of courage that continues to echo through time.",
    narrative:
      "When the noble bird Jatayu witnessed the abduction of Devi Sita by Ravana, he fought courageously in the sky despite his age. Fatally wounded, he fell upon the rocky hillocks of Lepakshi. When Lord Rama arrived in search of Sita, he recognized the valor of the dying king of birds and compassionately whispered 'Le Pakshi' (Rise, Bird in Telugu). Centuries later, the Vijayanagara royal sculptors Virupanna and Veeranna carved the monolithic granite temple around this sacred ground.",
    audioMinutes: 3,
    moralPhilosophicalCore:
      "Unyielding duty (Dharma) and moral courage to protect the innocent regardless of the magnitude of odds.",
  };

  const handleAskSage = (query: string) => {
    setSageQuery(query);
    setIsSageOpen(true);
  };

  const handlePlanItineraryForState = (stateName: string) => {
    setItineraryDestination(stateName);
    setIsItineraryOpen(true);
  };

  useEffect(() => {
    const button = document.getElementById("button");
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;
      button.style.setProperty("--mouse-x", x + "px");
      button.style.setProperty("--mouse-y", y + "px");
    };

    button.addEventListener("mousemove", handleMouseMove);
    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1810] flex flex-col font-sans selection:bg-[#E06D14]/20 selection:text-[#7A1C22]">
      {/* Universal Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favorites={favorites}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenItinerary={() => setIsItineraryOpen(true)}
        language={language}
        setLanguage={handleSetLanguage}
      />

      {/* Main View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* 1. HOME VIEW */}
        {activeTab === "home" && (
          <HeroSection
           onNavigateTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
  language={language}
/>
        )}

        {/* 2. EXPLORE INDIA (INTERACTIVE MAP) */}
        {activeTab === "map" && (
          <InteractiveMap
            states={statesData}
            onSelectState={(st) => setSelectedStateModal(st)}
            onExploreCategory={(cat) => setActiveTab(cat)}
            onAskSage={handleAskSage}
            language={language}
          />
        )}

        {/* 3. HERITAGE (MONUMENTS & SACRED ARCHITECTURE) */}
        {activeTab === "heritage" && (
          <HeritageExplorer
            monuments={allMonuments}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAskSage={handleAskSage}
            language={language}
          />
        )}

        {/* 4. ARTISANS (HANDS THAT KEEP HERITAGE ALIVE & THE PEOPLE'S VERSE) */}
        {activeTab === "artisans" && (
          <ArtisanCraftVault
            crafts={allCrafts}
            artisans={allArtisans}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAskSage={handleAskSage}
            language={language}
          />
        )}

        {/* 5. STORIES (ORAL TRADITIONS & SACRED LEGENDS) */}
        {activeTab === "stories" && (
          <StoriesHub
            stories={allStories}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAskSage={handleAskSage}
            language={language}
          />
        )}

        {/* 6. TRADITIONS (DANCES, FESTIVALS & AYURVEDIC WISDOM) */}
        {activeTab === "traditions" && (
          <TraditionsHub
            states={statesData}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAskSage={handleAskSage}
            language={language}
          />
        )}
      </main>

      {/* State Detail / Experience Modal */}
      {selectedStateModal && (
        <StateDetailModal
          state={selectedStateModal}
          onClose={() => setSelectedStateModal(null)}
          onAskSage={handleAskSage}
          onPlanItinerary={handlePlanItineraryForState}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          language={language}
        />
      )}

      {/* Cultural Sage AI Chat Oracle */}
      <CulturalSageAI
        isOpen={isSageOpen}
        onClose={() => setIsSageOpen(false)}
        initialQuery={sageQuery}
      />

      {/* Heritage Quiz Modal */}
      <HeritageQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        initialQuestions={initialQuizQuestions}
      />

      {/* Itinerary Planner Modal */}
      <ItineraryPlannerModal
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        initialDestination={itineraryDestination}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onClearAll={handleClearAllFavorites}
        onOpenItinerary={() => {
          setIsFavoritesOpen(false);
          setIsItineraryOpen(true);
        }}
      />

      {/* Floating Sage AI Action Button in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="button"
          onClick={() => handleAskSage("")}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
            e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
          }}
          className="sage-ai-glow-btn group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#7A1C22] via-[#92222A] to-[#E06D14] text-white rounded-full shadow-xl shadow-[#7A1C22]/35 border-2 border-[#D4AF37]/85 hover:scale-105 active:scale-95 transition-transform duration-300 backdrop-blur-xs cursor-pointer"
          title={t.askSageTitle}
        >
          <div className="relative z-10 w-7 h-7 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#7A1C22] shadow-xs border border-[#D4AF37]">
            <span className="font-rozha text-sm leading-none">ॐ</span>
          </div>
          <div className="relative z-10 flex flex-col items-start text-left pr-1">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-white">
                Sage AI
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-spin" style={{ animationDuration: "5s" }} />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#FDFBF7]/85 font-sans tracking-tight leading-none mt-0.5">
              {t.askSagePlaceholder}
            </span>
          </div>
        </button>
      </div>

      {/* Royal Cultural Footer */}
      <footer className="mt-16 bg-[#2C1810] text-[#FDFBF7] border-t border-[#D4AF37]/35 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#D4AF37]/20">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7A1C22] to-[#E06D14] p-0.5 shadow-md flex items-center justify-center">
                <span className="font-rozha text-2xl text-[#FAF7F2]">ॐ</span>
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-wider text-[#FDFBF7]">
                  BHARAT<span className="text-[#E06D14]">VERSE</span>
                </span>
                <p className="text-xs text-[#D8C7A5] font-serif italic">
                  {t.heroSubtitle}
                </p>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#EAD8C3] font-medium">
              <button onClick={() => setActiveTab("home")} className="hover:text-[#F0C05A] transition-colors cursor-pointer">
                {t.home}
              </button>
              <button onClick={() => setActiveTab("map")} className="hover:text-[#F0C05A] transition-colors cursor-pointer">
                {t.exploreIndia}
              </button>
              <button onClick={() => setActiveTab("heritage")} className="hover:text-[#F0C05A] transition-colors cursor-pointer">
                {t.heritage}
              </button>
              <button onClick={() => setActiveTab("artisans")} className="hover:text-[#F0C05A] transition-colors cursor-pointer">
                {t.artisans}
              </button>
              <button onClick={() => setActiveTab("stories")} className="hover:text-[#F0C05A] transition-colors cursor-pointer">
                {t.stories}
              </button>
              <button onClick={() => setActiveTab("traditions")} className="hover:text-[#F0C05A] transition-colors cursor-pointer">
                {t.traditions}
              </button>
            </div>
          </div>

          {/* Sanskrit Sloka & Bottom Credits */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8B6E58]">
            <p className="font-serif italic text-center sm:text-left text-[#D8C7A5]/80">
              "वसुधैव कुटुम्बकम्" — {t.heroBadge}
            </p>
            <p className="text-center sm:text-right">
              Crafted with devotion for the timeless culture of Bharat.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
