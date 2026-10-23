import React, { useState, useRef, useEffect } from "react";
import {
  Compass,
  Bookmark,
  Award,
  Landmark,
  Palette,
  BookOpen,
  Flame,
  MapPin,
  Menu,
  X,
  Globe,
  ChevronDown,
  Check
} from "lucide-react";
import { UserFavorite } from "../types";
import { Language, LANGUAGES, UI_TRANSLATIONS } from "../utils/translations";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favorites: UserFavorite[];
  onOpenFavorites: () => void;
  onOpenQuiz: () => void;
  onOpenItinerary: () => void;
  language?: Language;
  setLanguage?: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favorites,
  onOpenFavorites,
  onOpenQuiz,
  onOpenItinerary,
  language = "en",
  setLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { id: "home", label: t.home, icon: Compass },
    { id: "map", label: t.exploreIndia, icon: MapPin },
    { id: "heritage", label: t.heritage, icon: Landmark },
    { id: "artisans", label: t.artisans, icon: Palette },
    { id: "stories", label: t.stories, icon: BookOpen },
    { id: "traditions", label: t.traditions, icon: Flame },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DCC4] shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#5A151B] via-[#7A1C22] to-[#5A151B] text-[#FDFBF7] text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium tracking-wide border-b border-[#D4AF37]/30">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E06D14] animate-pulse"></span>
        <span className="font-serif italic text-[#FDFBF7]/90 text-[11px] sm:text-xs">
          {t.tagline}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#7A1C22] via-[#A83236] to-[#E06D14] p-0.5 shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full bg-[#FAF7F2] rounded-[10px] flex items-center justify-center border border-[#D4AF37]/40">
                <span className="font-rozha text-2xl text-[#7A1C22]">ॐ</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#2C1810] group-hover:text-[#7A1C22] transition-colors leading-none flex items-center gap-1.5">
                BHARAT<span className="text-[#E06D14]">VERSE</span>
                <sup className="text-[8px] sm:text-[9px] uppercase font-bold tracking-wider px-1 py-0.5 rounded-[3px] bg-[#E06D14]/12 text-[#A04508] border border-[#E06D14]/25 -top-2.5 inline-block leading-none">
                  INDIA
                </sup>
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#7A1C22] text-[#FDFBF7] shadow-sm shadow-[#7A1C22]/20"
                      : "text-[#5C4535] hover:bg-[#EDE3CE]/60 hover:text-[#2C1810]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#D4AF37]" : "text-[#8B5E3C]"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Heritage Trail Planner */}
            <button
              onClick={onOpenItinerary}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#FAF0DC] text-[#7A1C22] border border-[#D4AF37]/40 hover:bg-[#F2E4C4] transition-all flex items-center gap-1"
              title="Plan a Custom Heritage Itinerary"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E06D14]" />
              <span className="hidden md:inline">{t.itinerary}</span>
            </button>

            {/* Quiz Trigger */}
            <button
              onClick={onOpenQuiz}
              className="p-2 rounded-full text-[#7A1C22] bg-[#FAF0DC] hover:bg-[#F2E4C4] border border-[#D4AF37]/40 transition-all relative"
              title="Play Cultural Trivia Quiz"
            >
              <Award className="w-4 h-4 text-[#A04508]" />
            </button>

            {/* Favorites Bookmarks */}
            <button
              onClick={onOpenFavorites}
              className="p-2 rounded-full text-[#7A1C22] bg-[#FAF0DC] hover:bg-[#F2E4C4] border border-[#D4AF37]/40 transition-all relative"
              title="View Bookmarked Heritage"
            >
              <Bookmark className="w-4 h-4 text-[#7A1C22]" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E06D14] text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Language Selector (Rightmost after bookmarks - perfectly aligned with royal aesthetic) */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="bg-[#FAF0DC] hover:bg-[#F2E4C4] text-[#7A1C22] border border-[#D4AF37]/50 rounded-full px-3 py-1.5 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer group"
                title="Select Website Language"
              >
                <Globe className="w-4 h-4 text-[#E06D14] group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight">
                  {currentLangObj.nativeLabel}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#7A1C22]/70 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Language Dropdown Menu */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#FAF7F2] rounded-xl shadow-xl border border-[#D4AF37]/40 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {LANGUAGES.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage?.(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#FAF0DC] text-[#7A1C22] font-bold"
                            : "text-[#2C1810] hover:bg-[#F2E8D3] font-medium"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.nativeLabel}</span>
                          {lang.code !== "en" && (
                            <span className="text-[10px] text-[#8B6E58] font-normal">({lang.label})</span>
                          )}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#7A1C22]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger & Mobile Lang */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Button */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="bg-[#FAF0DC] border border-[#D4AF37]/50 rounded-full px-2.5 py-1 shadow-xs flex items-center gap-1.5 text-xs font-semibold text-[#7A1C22]"
              >
                <Globe className="w-3.5 h-3.5 text-[#E06D14]" />
                <span>{currentLangObj.nativeLabel}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-[#FAF7F2] rounded-xl shadow-lg border border-[#D4AF37]/40 py-1 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage?.(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                        language === lang.code ? "bg-[#FAF0DC] text-[#7A1C22] font-bold" : "text-[#2C1810] hover:bg-[#F2E8D3]"
                      }`}
                    >
                      <span>{lang.nativeLabel}</span>
                      {language === lang.code && <Check className="w-3 h-3 text-[#7A1C22]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2C1810] hover:bg-[#EDE3CE]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E8DCC4] flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 text-left ${
                    isActive ? "bg-[#7A1C22] text-white" : "text-[#5C4535] hover:bg-[#EDE3CE]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#E8DCC4] flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="px-3 py-2 rounded-lg text-xs bg-[#FAF0DC] text-[#7A1C22] font-semibold flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>{t.quiz}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenItinerary();
                }}
                className="px-3 py-2 rounded-lg text-xs bg-[#FAF0DC] text-[#7A1C22] font-semibold flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4" />
                <span>{t.itinerary}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFavorites();
                }}
                className="px-3 py-2 rounded-lg text-xs bg-[#FAF0DC] text-[#7A1C22] font-semibold flex items-center gap-1.5"
              >
                <Bookmark className="w-4 h-4" />
                <span>{t.saved} ({favorites.length})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
