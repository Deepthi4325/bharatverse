import React, { useState } from "react";
import {
  Palette,
  Sparkles,
  Award,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Heart,
  ChevronRight,
  ChevronLeft,
  PenTool,
  Camera,
  Feather,
  Scissors,
  Plus,
  X,
  Send,
  MessageSquare,
  UserCheck,
  MapPin,
  Search
} from "lucide-react";
import { CraftArt, ArtisanProfile, UserFavorite, CommunityArtPiece } from "../types";
import { Language, UI_TRANSLATIONS } from "../utils/translations";

interface ArtisanCraftVaultProps {
  crafts: CraftArt[];
  artisans: ArtisanProfile[];
  favorites: UserFavorite[];
  onToggleFavorite: (item: UserFavorite) => void;
  onAskSage: (query: string) => void;
  language?: Language;
}

export const ArtisanCraftVault: React.FC<ArtisanCraftVaultProps> = ({
  crafts,
  artisans,
  favorites,
  onToggleFavorite,
  onAskSage,
  language = "en",
}) => {
  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanProfile | null>(null);
  const [selectedCraft, setSelectedCraft] = useState<CraftArt | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedState, setSelectedState] = useState("All");
  const [pledgedArtisans, setPledgedArtisans] = useState<{ [id: string]: boolean }>({});

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Community Submissions State
  const [communityTab, setCommunityTab] = useState<"Poetry" | "Artwork" | "Photography" | "Craft">("Poetry");
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [communityWorks, setCommunityWorks] = useState<CommunityArtPiece[]>([
    {
      id: "poem-1",
      author: "Ananya Iyer",
      location: "Lepakshi & Bengaluru",
      category: "Poetry",
      title: "Pillars of the Sky",
      content: `Beneath the canopy of carved stone lace,\nA hanging pillar floats without a base.\nThe wind whispers what the chisel knew:\nThat faith holds more than gravity can view.\nFrom Swarnamukhi banks to Godavari flow,\nThe dyes of Kalamkari gently glow.`,
      inspiration: "Inspired by the Hanging Pillar of Veerabhadra Temple, Lepakshi",
      likes: 48,
      timestamp: "2 hours ago",
    },
    {
      id: "poem-2",
      author: "Vikramaditya Rathore",
      location: "Jaipur, Rajasthan",
      category: "Poetry",
      title: "Echoes in the Hall of Mirrors",
      content: `A solitary candle glows inside the night,\nTen thousand convex crystals catch the light.\nNo palace walls could cage the desert wind,\nWhere kings and poets danced and sinned.\nIn golden sand and mirrored stone,\nA timeless spirit sits the throne.`,
      inspiration: "Inspired by Sheesh Mahal at Amber Fort",
      likes: 62,
      timestamp: "1 day ago",
    },
    {
      id: "art-1",
      author: "Meera Kulkarni",
      location: "Varanasi",
      category: "Artwork",
      title: "Ganga Aarti at Twilight",
      content: "Traditional watercolor depicting the brass tiered fire lamps on the stone steps of Dashashwamedh Ghat.",
      imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
      inspiration: "Varanasi Ghats at Sunset",
      likes: 39,
      timestamp: "3 days ago",
    },
    {
      id: "photo-1",
      author: "Rohan Sen",
      location: "Konark, Odisha",
      category: "Photography",
      title: "The Chariot Wheel of Time",
      content: "Morning sunlight casting an exact shadow across the sundial spokes of Konark Sun Temple.",
      imageUrl: "https://images.unsplash.com/photo-1609137144820-22e316d997cf?auto=format&fit=crop&w=800&q=80",
      inspiration: "Konark Sun Temple Dawn Alignment",
      likes: 54,
      timestamp: "4 days ago",
    },
    {
      id: "craft-1",
      author: "Devendra Rathore",
      location: "Kutch, Gujarat",
      category: "Craft",
      title: "Practicing Freehand Rogan Painting",
      content: "Spent a week in Nirona with the Khatri masters. Pulling the castor oil thread on fabric with an iron stylus without touching the cloth feels like pure meditation.",
      imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      inspiration: "Preserving the 400-year-old castor oil Rogan art of Kutch",
      likes: 67,
      timestamp: "1 week ago",
    },
    {
      id: "art-2",
      author: "Siddharth Verma",
      location: "Raghurajpur, Odisha",
      category: "Artwork",
      title: "Tala Pattachitra Palm Leaf Etchings",
      content: "Detailed iron stylus engraving on cured palm leaves, shaded with natural lamp soot and conch white.",
      imageUrl: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
      inspiration: "Ancient Jagannath Tala Pattachitra Scroll Traditions",
      likes: 82,
      timestamp: "2 weeks ago",
    }
  ]);

  // New Submission Form
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCategory, setNewCategory] = useState<"Poetry" | "Artwork" | "Photography" | "Craft">("Poetry");
  const [newContent, setNewContent] = useState("");
  const [newInspiration, setNewInspiration] = useState("");
  const [likedPosts, setLikedPosts] = useState<{ [id: string]: boolean }>({});

  const handleLike = (id: string) => {
    if (likedPosts[id]) return;
    setCommunityWorks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
    setLikedPosts((prev) => ({ ...prev, [id]: true }));
  };

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityArtPiece = {
      id: `comm-${Date.now()}`,
      author: newAuthor.trim() || "Anonymous Traveler",
      location: newLocation.trim() || "Bharat",
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      inspiration: newInspiration.trim() || "Indian Heritage & Traditions",
      likes: 1,
      timestamp: "Just now",
    };

    setCommunityWorks([newPost, ...communityWorks]);
    setShowSubmitModal(false);
    setNewTitle("");
    setNewAuthor("");
    setNewLocation("");
    setNewContent("");
    setNewInspiration("");
  };

  const categories = ["All", "Textile", "Painting", "Metalwork", "Pottery", "Woodwork"];

  const filteredCrafts = crafts.filter(
  (craft) =>
    (selectedCategory === "All" || craft.category === selectedCategory) &&
    (selectedState === "All" || craft.stateName === selectedState)
);

  // Unique, alphabetically sorted states from the artisan dataset
  const indianStatesAndUTs = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
  const filteredArtisans = artisans.filter(
    (artisan) => selectedState === "All" || artisan.stateName === selectedState
  );

  return (
    <div className="space-y-16 py-2">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0DC] border border-[#D4AF37]/50 text-[#7A1C22] text-xs font-bold uppercase tracking-widest">
          <Palette className="w-3.5 h-3.5 text-[#E06D14]" />
          <span>{t.artisansBadge}</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-[#2C1810]">
          {t.artisansTitle}
        </h1>
        <p className="text-sm sm:text-base text-[#6E5848] font-sans leading-relaxed">
          {t.artisansSubtitle}
        </p>
      </div>

      {/* Featured Master Artisans Carousel / Clean Cards */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-cinzel text-2xl font-bold text-[#2C1810]">
              {t.allArtisans}
            </h2>
            <p className="text-xs text-[#8B6E58] font-serif italic">
              {t.artisansSubtitle}
            </p>
          </div>

          {/* State Filter */}
          <div className="relative w-full sm:w-auto min-w-[220px]">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A1C22] pointer-events-none" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#E8DCC4] bg-[#FAF6ED] py-3 pl-11 pr-10 text-sm font-semibold text-[#3D2B1F] shadow-sm outline-none transition focus:border-[#7A1C22] focus:ring-2 focus:ring-[#7A1C22]/10 cursor-pointer"
              aria-label="Filter artisans by state"
            >
              <option value="All">All States & UTs</option>
              {indianStatesAndUTs.map((state) => (
               <option key={state} value={state}>
                {state}
              </option>
           ))}
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-[#8B6E58] pointer-events-none" />
          </div>
        </div>

        {/* Clean Responsive Artisan Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.length > 0 ? (
            filteredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              onClick={() => setSelectedArtisan(artisan)}
              className="bg-white rounded-3xl p-6 border border-[#E8DCC4] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={artisan.avatar}
                    alt={artisan.name}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-sm group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#E06D14] text-white flex items-center justify-center text-[10px]">
                    ★
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E06D14] block truncate">
                    {artisan.stateName}
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-[#2C1810] group-hover:text-[#7A1C22] transition-colors truncate">
                    {artisan.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#8B4513] truncate">
                    {artisan.craftName}
                  </p>
                </div>
              </div>

              {/* Artisan 1-Line Story */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DCC4]/70">
                <p className="text-xs font-serif italic text-[#5C4535] line-clamp-2 leading-relaxed">
                  "{artisan.story}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#E8DCC4] flex items-center justify-between text-xs">
                <span className="text-[#8B6E58] font-medium">
                  {artisan.experienceYears} Years Master
                </span>
                <span className="text-[#7A1C22] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Technique</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <Search size={28} className="mx-auto mb-4 text-[#8B6F47]" />
              <h3 className="text-xl font-semibold text-[#3D2B1F]">
                No artisans found
              </h3>
              <p className="mt-2 text-sm text-[#7A6A5A]">
                No artisans are currently available for this state.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* GI-Tagged Indigenous Crafts Exploration */}
      <div className="space-y-6 pt-6 border-t border-[#E8DCC4]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-cinzel text-2xl font-bold text-[#2C1810]">
              GI-Tagged Indigenous Crafts
            </h2>
            <p className="text-xs text-[#8B6E58] font-serif italic">
              Authentic geographical indication arts rooted in earth, minerals, and silk
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#7A1C22] text-[#FDFBF7] shadow-xs"
                    : "bg-white text-[#5C4535] border border-[#E0D5C1] hover:bg-[#F2E8D3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Crafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrafts.map((craft) => {
            const isFav = favorites.some((f) => f.id === craft.id);
            return (
              <div
                key={craft.id}
                onClick={() => setSelectedCraft(craft)}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DCC4] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={craft.image}
                    alt={craft.name}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#7A1C22] text-white">
                      {craft.stateName}
                    </span>
                    {craft.giTagged && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-[#E06D14] text-white">
                        GI TAGGED
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite({
                        id: craft.id,
                        type: "craft",
                        title: craft.name,
                        subtitle: `${craft.stateName} • ${craft.category}`,
                        image: craft.image,
                        stateName: craft.stateName,
                        savedAt: new Date().toLocaleDateString(),
                      });
                    }}
                    className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-xs transition-colors ${
                      isFav
                        ? "bg-[#D4AF37] text-[#2C1810]"
                        : "bg-black/40 text-white hover:bg-black/60"
                    }`}
                    title={isFav ? "Saved" : "Save"}
                  >
                    {isFav ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  </button>

                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <span className="text-xs font-serif italic text-[#F0C05A]">
                      {craft.artisanCommunity}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-cinzel text-lg font-bold text-[#2C1810] group-hover:text-[#7A1C22] transition-colors">
                      {craft.name}
                    </h3>
                    <p className="text-xs text-[#5C4535] font-sans line-clamp-2 leading-relaxed">
                      {craft.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8DCC4] flex items-center justify-between text-xs font-semibold text-[#7A1C22]">
                    <span>Explore Ancient Technique</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* COMMUNITY SHOWCASE & THE PEOPLE'S VERSE */}
      <div className="bg-gradient-to-br from-[#FAF0DC] via-[#FAF7F2] to-[#F5EAD6] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/50 shadow-md space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#7A1C22]">
              <Feather className="w-3.5 h-3.5 text-[#E06D14]" />
              <span>Community Showcase</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#2C1810]">
              BharatVerse — The People's Verse
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5848] font-sans max-w-xl">
              Write a poem, share a craft tribute, or showcase artistic photography inspired by India's places, traditions, and memories.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-6 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-[#7A1C22] to-[#A03038] text-white shadow-md hover:shadow-lg hover:scale-102 transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Showcase Your Art / Poem</span>
          </button>
        </div>

        {/* Medium Filter Pills */}
        <div className="flex items-center gap-2 border-b border-[#D4AF37]/30 pb-3">
          {[
            { id: "Poetry", label: "✍️ Poetry & Verses" },
            { id: "Artwork", label: "🎨 Artworks" },
            { id: "Photography", label: "📷 Photography" },
            { id: "Craft", label: "🧵 Textile & Craft" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCommunityTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                communityTab === tab.id
                  ? "bg-[#7A1C22] text-white shadow-xs"
                  : "bg-white/80 text-[#5C4535] hover:bg-[#F2E8D3]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Community Pieces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communityWorks
            .filter((work) => work.category === communityTab)
            .map((work) => (
              <div
                key={work.id}
                className="bg-white rounded-2xl p-6 border border-[#E8DCC4] shadow-sm space-y-4 relative flex flex-col justify-between"
              >
                {/* Visual Image if any */}
                {work.imageUrl && (
                  <div className="rounded-xl overflow-hidden aspect-16/9 mb-2 shadow-xs">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#FAF0DC] text-[#7A1C22]">
                      {work.category}
                    </span>
                    <span className="text-[11px] text-[#8B6E58] font-sans">
                      {work.timestamp}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-[#2C1810]">
                    {work.title}
                  </h3>

                  {work.category === "Poetry" ? (
                    <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DCC4] font-serif text-xs sm:text-sm text-[#4A3326] leading-relaxed whitespace-pre-line italic">
                      {work.content}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-[#5C4535] font-sans leading-relaxed">
                      {work.content}
                    </p>
                  )}

                  <p className="text-[11px] text-[#8B6E58] font-serif italic">
                    "{work.inspiration}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DCC4] flex items-center justify-between text-xs">
                  <div className="font-semibold text-[#2C1810]">
                    By {work.author} <span className="font-normal text-[#8B6E58]">({work.location})</span>
                  </div>

                  <button
                    onClick={() => handleLike(work.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                      likedPosts[work.id]
                        ? "bg-[#E06D14]/10 text-[#E06D14] border-[#E06D14]/30"
                        : "bg-[#FAF7F2] text-[#6E5848] border-[#E8DCC4] hover:bg-[#F2E8D3]"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedPosts[work.id] ? "fill-current" : ""}`} />
                    <span>{work.likes}</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Community Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8DCC4] pb-3">
              <div className="flex items-center gap-2">
                <Feather className="w-5 h-5 text-[#E06D14]" />
                <h3 className="font-cinzel text-xl font-bold text-[#2C1810]">
                  Submit to The People's Verse
                </h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCommunitySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5C4535] mb-1">
                  Choose Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["Poetry", "Artwork", "Photography", "Craft"] as const).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setNewCategory(cat)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        newCategory === cat
                          ? "bg-[#7A1C22] text-white border-[#7A1C22]"
                          : "bg-white text-[#5C4535] border-[#E8DCC4]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C4535] mb-1">
                  Title of Your Creation / Poem *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Hymn to the Red River, Echoes of Hampi..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DCCDB0] rounded-xl text-xs sm:text-sm text-[#2C1810] focus:outline-hidden focus:border-[#7A1C22]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5C4535] mb-1">
                    Your Name / Pen Name
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Radhika M."
                    className="w-full px-3.5 py-2 bg-white border border-[#DCCDB0] rounded-xl text-xs text-[#2C1810]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4535] mb-1">
                    Your City / Region
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Madurai, Tamil Nadu"
                    className="w-full px-3.5 py-2 bg-white border border-[#DCCDB0] rounded-xl text-xs text-[#2C1810]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C4535] mb-1">
                  {newCategory === "Poetry" ? "Poetic Verses *" : "Description / Story *"}
                </label>
                <textarea
                  required
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={
                    newCategory === "Poetry"
                      ? "Write your poem stanza by stanza...\nEchoes in the evening bells,\nWhere the sacred river swells..."
                      : "Describe the artwork, technique, or cultural tribute..."
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DCCDB0] rounded-xl text-xs sm:text-sm text-[#2C1810] focus:outline-hidden focus:border-[#7A1C22]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C4535] mb-1">
                  Place / Tradition Inspired By
                </label>
                <input
                  type="text"
                  value={newInspiration}
                  onChange={(e) => setNewInspiration(e.target.value)}
                  placeholder="e.g. Srikalahasti Kalamkari, Konark Sun Temple..."
                  className="w-full px-3.5 py-2 bg-white border border-[#DCCDB0] rounded-xl text-xs text-[#2C1810]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6E5848] hover:bg-[#EFE7D5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#7A1C22] text-white hover:bg-[#5A151B] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Showcase</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Artisan Detail Modal */}
      {selectedArtisan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedArtisan.avatar}
                  alt={selectedArtisan.name}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E06D14]">
                    {selectedArtisan.stateName}
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-[#2C1810]">
                    {selectedArtisan.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#7A1C22]">
                    {selectedArtisan.craftName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedArtisan(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-white rounded-2xl border border-[#E8DCC4] space-y-2">
                <h4 className="font-cinzel text-sm font-bold text-[#2C1810]">
                  Artisan Journey & Ancestral Lineage
                </h4>
                <p className="text-xs sm:text-sm text-[#5C4535] font-serif italic leading-relaxed">
                  "{selectedArtisan.story}"
                </p>
                <p className="text-xs text-[#7A1C22] font-semibold">
                  National Honors: {selectedArtisan.awards}
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E8DCC4] space-y-1">
                <h4 className="font-cinzel text-sm font-bold text-[#2C1810]">
                  Ancient Guild Technique
                </h4>
                <p className="text-xs sm:text-sm text-[#5C4535]">
                  {selectedArtisan.specialTechnique}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#FAF0DC] rounded-2xl border border-[#D4AF37]/40 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#2C1810]">Direct Guild Patronage</p>
                <p className="text-[11px] text-[#6E5848]">{selectedArtisan.patronAction}</p>
              </div>

              <button
                onClick={() => setPledgedArtisans((prev) => ({ ...prev, [selectedArtisan.id]: true }))}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  pledgedArtisans[selectedArtisan.id]
                    ? "bg-[#2C1810] text-[#D4AF37]"
                    : "bg-[#7A1C22] text-white hover:bg-[#5A151B]"
                }`}
              >
                {pledgedArtisans[selectedArtisan.id] ? "Pledge Recorded ✓" : "Pledge Support"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Craft Detail Modal */}
      {selectedCraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E06D14]">
                  {selectedCraft.stateName} • {selectedCraft.category}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#2C1810]">
                  {selectedCraft.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCraft(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-16/9 shadow-xs">
              <img
                src={selectedCraft.image}
                alt={selectedCraft.name}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-[#5C4535] leading-relaxed">
                {selectedCraft.description}
              </p>

              <div className="p-4 bg-white rounded-2xl border border-[#E8DCC4] space-y-2">
                <h4 className="font-cinzel text-xs font-bold text-[#7A1C22] uppercase tracking-wider">
                  Raw Materials & Natural Elements
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCraft.rawMaterials.map((mat, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] text-[#5C4535]">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E8DCC4] space-y-2">
                <h4 className="font-cinzel text-xs font-bold text-[#7A1C22] uppercase tracking-wider">
                  How It's Made (Guild Steps)
                </h4>
                <ol className="space-y-1.5 list-decimal list-inside text-xs text-[#5C4535]">
                  {selectedCraft.howItsMadeSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};