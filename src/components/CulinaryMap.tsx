import React, { useState } from "react";
import {
  Utensils,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Flame,
  ShieldCheck,
  Heart,
  Leaf,
  Info,
  Clock
} from "lucide-react";
import { CulinaryItem, UserFavorite } from "../types";

interface CulinaryMapProps {
  dishes: CulinaryItem[];
  favorites: UserFavorite[];
  onToggleFavorite: (item: UserFavorite) => void;
  onAskSage: (query: string) => void;
}

export const CulinaryMap: React.FC<CulinaryMapProps> = ({
  dishes,
  favorites,
  onToggleFavorite,
  onAskSage,
}) => {
  const [selectedDish, setSelectedDish] = useState<CulinaryItem>(dishes[0] || null);
  const [selectedType, setSelectedType] = useState<string>("All");

  const types = ["All", "Main Dish", "Sweet / Dessert", "Festive Feast"];

  const filteredDishes = dishes.filter(
    (d) => selectedType === "All" || d.type === selectedType
  );

  const isFav = (id: string) => favorites.some((f) => f.id === id);

  const ayurvedicSpices = [
    {
      name: "Haldi (Turmeric / Curcuma)",
      sanskrit: "हरिद्रा (Haridra)",
      dosha: "Balances Vata, Pitta & Kapha",
      property: "Natural anti-inflammatory, detoxifies liver (Rakta Shodhaka), purifies blood.",
    },
    {
      name: "Kali Mirch (Black Pepper)",
      sanskrit: "मरिच (Maricha)",
      dosha: "Pacifies Kapha & Vata, kindles Agni",
      property: "Bio-enhancer (Yogavahi), destroys toxins (Ama), cleanses respiratory tracts.",
    },
    {
      name: "Elaichi (Green Cardamom)",
      sanskrit: "एला (Ela)",
      dosha: "Tridoshic, cooling to Pitta",
      property: "Digestive aromatic, calms stomach acidity, refreshes breath and heart spirit.",
    },
    {
      name: "Hing (Asafoetida)",
      sanskrit: "हिङ्गु (Hingu)",
      dosha: "Balances Vata & Kapha",
      property: "Eliminates gas, prevents bloat, aids heavy lentil digestion in temple kitchens.",
    },
    {
      name: "Kalpasi (Black Stone Flower)",
      sanskrit: "शैलेय (Shaileya)",
      dosha: "Cooling aromatic",
      property: "Rare lichen yielding deep earthy umami in Chettinad and Hyderabadi biryanis.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E06D14]/10 text-[#A04508] text-xs font-semibold uppercase tracking-wider mb-1">
            <Utensils className="w-3.5 h-3.5 text-[#E06D14]" />
            <span>Ayurvedic Gastronomy & Royal Feasts</span>
          </div>
          <h1 className="font-cinzel text-3xl font-bold text-[#2C1810]">
            Flavors of Bharat: Six Tastes of Wisdom
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5848] font-sans">
            Ancient temple prasadams, royal Nizami & Rajput kitchens, and Ayurvedic digestive alchemy.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedType === t
                  ? "bg-[#7A1C22] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-[#5C4535] border border-[#E0D4BB] hover:bg-[#EFE7D5]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Dish Stage */}
      {selectedDish && (
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E8DCC4] shadow-md grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative h-80 lg:h-auto min-h-[360px] overflow-hidden">
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
              }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#7A1C22]/90 backdrop-blur-xs text-white text-xs font-bold border border-[#D4AF37]/50">
                {selectedDish.stateName}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#E06D14]/90 backdrop-blur-xs text-white text-xs font-semibold">
                {selectedDish.type}
              </span>
            </div>

            <button
              onClick={() =>
                onToggleFavorite({
                  id: selectedDish.id,
                  type: "recipe",
                  title: selectedDish.name,
                  subtitle: `${selectedDish.type} • ${selectedDish.stateName}`,
                  image: selectedDish.image,
                  stateName: selectedDish.stateName,
                  savedAt: new Date().toISOString(),
                })
              }
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-all ${
                isFav(selectedDish.id)
                  ? "bg-[#E06D14] text-white"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              {isFav(selectedDish.id) ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[#F0C05A] font-bold">
                Culinary Heritage
              </span>
              <h2 className="font-cinzel text-2xl font-bold text-white">
                {selectedDish.name}
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#4A382C] leading-relaxed">
                {selectedDish.description}
              </p>

              {/* Key Ingredients */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#2C1810] uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-green-700" />
                  <span>Key Ingredients & Native Spices:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDish.keyIngredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-[#FAF0DC] border border-[#D4AF37]/30 text-[#7A1C22] text-xs font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ayurvedic Wisdom Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF0DC] to-[#F5E6CC] border border-[#D4AF37]/50 space-y-1.5 text-xs text-[#3E2B20]">
                <div className="flex items-center gap-1.5 font-bold text-[#7A1C22] text-xs uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-[#E06D14]" />
                  <span>Ayurvedic Shadrasa & Dosha Property:</span>
                </div>
                <p className="leading-relaxed">{selectedDish.ayurvedicProperty}</p>
              </div>

              {/* Historical Lore */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E0D4BB] text-xs text-[#5C4535] space-y-1">
                <span className="font-bold text-[#2C1810]">Historical Origin Lore:</span>
                <p>{selectedDish.historicalLore}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DCC4] flex items-center justify-between">
              <button
                onClick={() =>
                  onAskSage(
                    `Share the authentic traditional recipe, spice secrets, and cultural history of ${selectedDish.name} from ${selectedDish.stateName}.`
                  )
                }
                className="px-4 py-2 rounded-xl bg-[#7A1C22] text-white text-xs font-semibold hover:bg-[#92222A] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Ask AI Sage Recipe Secret</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ayurvedic Spice Cabinet Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCC4] shadow-xs space-y-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E06D14]/10 text-[#A04508] text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>Ayurvedic Spice Alchemy</span>
          </div>
          <h3 className="font-cinzel text-xl font-bold text-[#2C1810]">
            The 5 Master Healing Spices of Indian Cooking
          </h3>
          <p className="text-xs text-[#6E5848]">
            In Indian culinary philosophy, food is medicine (Ahara is Aushadha).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ayurvedicSpices.map((spice, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D4BB] space-y-2 hover:border-[#D4AF37] transition-all"
            >
              <div className="flex items-baseline justify-between">
                <h4 className="font-cinzel text-xs font-bold text-[#7A1C22]">
                  {spice.name}
                </h4>
                <span className="font-rozha text-xs text-[#A04508]">
                  {spice.sanskrit}
                </span>
              </div>
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#FAF0DC] text-[#7A1C22] text-[10px] font-bold border border-[#D4AF37]/30">
                {spice.dosha}
              </span>
              <p className="text-xs text-[#5C4535] leading-relaxed">
                {spice.property}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dishes Thumbnail Grid */}
      <div className="space-y-3">
        <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
          Iconic Regional Feasts of Bharat ({filteredDishes.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDishes.map((dish) => {
            const isSelected = selectedDish?.id === dish.id;
            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isSelected
                    ? "border-[#7A1C22] ring-2 ring-[#7A1C22]/20 shadow-md scale-102 bg-white"
                    : "border-[#E8DCC4] hover:border-[#D4AF37] bg-[#FAF7F2] hover:bg-white"
                }`}
              >
                <div className="relative h-36">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#7A1C22]/90 text-white text-[10px] font-bold">
                    {dish.stateName}
                  </span>
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <h4 className="font-cinzel text-xs font-bold truncate text-white">
                      {dish.name}
                    </h4>
                    <p className="text-[10px] text-[#EAD8C3] truncate">{dish.type}</p>
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
