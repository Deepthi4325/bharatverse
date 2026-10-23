import React from "react";
import {
  Bookmark,
  X,
  Trash2,
  ExternalLink,
  Compass,
  Landmark,
  Palette,
  Music,
  Utensils
} from "lucide-react";
import { UserFavorite } from "../types";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: UserFavorite[];
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onOpenItinerary: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearAll,
  onOpenItinerary,
}) => {
  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "monument":
        return <Landmark className="w-3.5 h-3.5 text-[#7A1C22]" />;
      case "craft":
        return <Palette className="w-3.5 h-3.5 text-[#E06D14]" />;
      case "dance":
        return <Music className="w-3.5 h-3.5 text-[#8B5E3C]" />;
      case "recipe":
        return <Utensils className="w-3.5 h-3.5 text-[#A04508]" />;
      default:
        return <Bookmark className="w-3.5 h-3.5 text-[#7A1C22]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#D4AF37]/50 relative animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 bg-[#7A1C22] text-white flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-[#E06D14]" />
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Saved Heritage
              </h3>
              <p className="text-xs text-[#F2E4D2]">
                {favorites.length} {favorites.length === 1 ? "item" : "items"} bookmarked
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Bookmark className="w-10 h-10 text-[#D8C7A5] mx-auto" />
              <h4 className="font-cinzel text-base font-semibold text-[#2C1810]">
                Your Heritage Vault is Empty
              </h4>
              <p className="text-xs text-[#8B6E58] max-w-xs mx-auto">
                Bookmark architectural marvels, GI crafts, dance forms, or royal recipes as you voyage through BharatVerse.
              </p>
            </div>
          ) : (
            favorites.map((fav) => (
              <div
                key={fav.id}
                className="bg-white rounded-2xl p-3 border border-[#E8DCC4] flex items-center justify-between gap-3 shadow-xs hover:border-[#D4AF37] transition-all"
              >
                {fav.image && (
                  <img
                    src={fav.image}
                    alt={fav.title}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {getTypeIcon(fav.type)}
                    <span className="text-[10px] uppercase font-bold text-[#8B6E58]">
                      {fav.type} • {fav.stateName}
                    </span>
                  </div>
                  <h4 className="font-cinzel text-xs font-bold text-[#2C1810] truncate">
                    {fav.title}
                  </h4>
                  {fav.subtitle && (
                    <p className="text-[11px] text-[#6E5848] truncate">
                      {fav.subtitle}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onRemoveFavorite(fav.id)}
                  className="p-2 text-[#8B6E58] hover:text-red-700 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E8DCC4] space-y-2">
            <button
              onClick={() => {
                onClose();
                onOpenItinerary();
              }}
              className="w-full py-3 bg-[#7A1C22] text-white rounded-xl text-xs font-bold font-cinzel hover:bg-[#92222A] flex items-center justify-center gap-2 shadow-xs"
            >
              <Compass className="w-4 h-4 text-[#E06D14]" />
              <span>Turn Saved Items into Itinerary</span>
            </button>

            <button
              onClick={onClearAll}
              className="w-full py-2 text-center text-xs font-medium text-[#8B6E58] hover:text-red-700 transition-colors"
            >
              Clear All Saved Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
