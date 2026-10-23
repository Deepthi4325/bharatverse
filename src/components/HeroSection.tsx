import React from "react";
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Language, UI_TRANSLATIONS } from "../utils/translations";

interface HeroSectionProps {
  onNavigateTab: (tab: string) => void;
  language?: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateTab,
  language = "en",
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  return (
    <div className="py-4 sm:py-8">
      {/* Main Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#2C1810] via-[#5A151B] to-[#7A1C22] text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-[#D4AF37]/35">

        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E06D14]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#D4AF37]/40 text-[#F5C48E] text-xs font-semibold tracking-widest uppercase backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E06D14]" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-6xl font-black text-[#FDFBF7] tracking-tight leading-tight sm:leading-snug">
            {t.heroTitle}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#EAD8C3] font-sans font-light leading-relaxed max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          {/* Explore India Button */}
          <div className="flex justify-center pt-4">
           <button
            onClick={() => onNavigateTab("map")}
            className="px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#E06D14] to-[#F08B32] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
           >
            <span>{t.exploreIndia}</span>
            <ArrowRight className="w-4 h-4" />
           </button>
         </div>
        </div>
      </section>
    </div>
  );
};
