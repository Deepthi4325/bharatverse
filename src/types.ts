export type IndianZone = "North" | "South" | "East" | "West" | "Central" | "North-East";

export interface Monument {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  periodEra: string;
  dynasty: string;
  architectureStyle: string;
  unescoStatus: boolean;
  description: string;
  image: string;
  coordinates: { lat: number; lng: number };
  acousticOrAstronomicalSecrets: string;
  audioNarrationScript: string;
  virtualTourHighlights: string[];
  historicalSignificance: string;
  tags: string[];
  nearestAirport?: string;
  nearestRailwayStation?: string;
  googleMapsUrl: string;
}

export interface CraftArt {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  category: "Textile" | "Painting" | "Metalwork" | "Pottery" | "Woodwork" | "Jewelry" | "Sculpture" | "Folk Craft";
  giTagged: boolean;
  giYear?: string;
  rawMaterials: string[];
  ancientTechnique: string;
  historicalOriginEra: string;
  endangeredStatus?: boolean;
  description: string;
  image: string;
  artisanCommunity: string;
  howItsMadeSteps: string[];
}

export interface PerformingArt {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  type: "Classical Dance" | "Folk Dance" | "Classical Music" | "Folk Music" | "Puppetry" | "Theatre";
  description: string;
  costumeDetails: string;
  instrumentsUsed: string[];
  mudrasAndMovements: string[];
  image: string;
  rhythmBeat: string;
  originEra: string;
}

export interface CulinaryItem {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  type: "Main Dish" | "Sweet / Dessert" | "Beverage" | "Street Food" | "Festive Feast";
  description: string;
  keyIngredients: string[];
  ayurvedicProperty: string;
  historicalLore: string;
  image: string;
}

export interface ArtisanProfile {
  id: string;
  name: string;
  craftName: string;
  villageLocation: string;
  stateName: string;
  experienceYears: number;
  awards: string;
  story: string;
  avatar: string;
  specialTechnique: string;
  patronAction: string;
}

export interface LegendStory {
  id: string;
  title: string;
  stateName: string;
  category: "Folklore" | "Mythological Stories" | "Historical Stories" | "Legends" | "Mythological Epics" | "Historical Lore" | "Sacred Legends";
  monumentOrEntity: string;
  era: string;
  shortTagline: string;
  narrative: string;
  fullStoryText?: string;
  audioUrl?: string;
  moralPhilosophicalCore: string;
  audioMinutes: number;
  image?: string;
  tags?: string[];
}

export interface Festival {
  id: string;
  name: string;
  states: string[];
  monthSeason: string;
  significance: string;
  rituals: string[];
  sweetsDelicacies: string[];
  celebrationType: string;
  image: string;
  travelTips: string;
}

export interface IndianState {
  id: string;
  name: string;
  code: string;
  zone: IndianZone;
  capital: string;
  officialLanguages: string[];
  emblemTagline: string;
  description: string;
  culturalEssence?: string;
  heroImage: string;
  coordinates: { lat: number; lng: number };
  heritageSitesCount: number;
  craftsCount: number;
  unescoSites: string[];
  iconicMonuments: Monument[];
  craftsAndArts: CraftArt[];
  dancesAndMusic: PerformingArt[];
  culinaryDelicacies: CulinaryItem[];
  livingArtisans: ArtisanProfile[];
  ancientLegends: LegendStory[];
}

export interface CommunityArtPiece {
  id: string;
  author: string;
  location: string;
  category: "Artwork" | "Photography" | "Poetry" | "Craft";
  title: string;
  content: string; // Text for poetry, or image URL
  imageUrl?: string;
  inspiration: string;
  likes: number;
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  heritageFact: string;
  category: "Monuments" | "Crafts & Textiles" | "Classical Arts" | "Festivals & Mythology" | "Culinary Heritage";
  difficulty: "Easy" | "Medium" | "Scholar";
}

export interface UserFavorite {
  id: string;
  type: "monument" | "craft" | "dance" | "recipe" | "state" | "story" | "culinary" | "festival";
  title: string;
  subtitle: string;
  image?: string;
  stateName: string;
  savedAt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  artisanHighlight: string;
  culinaryDelight: string;
}

export interface ItineraryPlan {
  title: string;
  destination: string;
  durationDays: number;
  summary: string;
  dailySchedule: ItineraryDay[];
  culturalEtiquette: string[];
}
