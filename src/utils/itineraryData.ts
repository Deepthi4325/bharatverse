import { ItineraryPlan, ItineraryDay } from "../types";

export interface DestinationOption {
  value: string;
  label: string;
  name: string;
  cities: string;
  isUT?: boolean;
}

export const ALL_28_STATES: DestinationOption[] = [
  {
    value: "Andhra Pradesh",
    name: "Andhra Pradesh",
    cities: "Visakhapatnam, Amaravati, Tirupati, Lepakshi",
    label: "Andhra Pradesh (Visakhapatnam, Amaravati, Tirupati, Lepakshi)",
  },
  {
    value: "Arunachal Pradesh",
    name: "Arunachal Pradesh",
    cities: "Itanagar, Tawang, Ziro Valley, Pasighat",
    label: "Arunachal Pradesh (Itanagar, Tawang, Ziro Valley, Pasighat)",
  },
  {
    value: "Assam",
    name: "Assam",
    cities: "Guwahati, Majuli Island, Kaziranga, Tezpur",
    label: "Assam (Guwahati, Majuli Island, Kaziranga, Tezpur)",
  },
  {
    value: "Bihar",
    name: "Bihar",
    cities: "Patna, Nalanda, Bodh Gaya, Vaishali, Rajgir",
    label: "Bihar (Patna, Nalanda, Bodh Gaya, Vaishali, Rajgir)",
  },
  {
    value: "Chhattisgarh",
    name: "Chhattisgarh",
    cities: "Raipur, Bastar, Sirpur, Jagdalpur, Chitrakote",
    label: "Chhattisgarh (Raipur, Bastar, Sirpur, Jagdalpur, Chitrakote)",
  },
  {
    value: "Goa",
    name: "Goa",
    cities: "Panaji, Old Goa, Margao, Ponda, Divar Island",
    label: "Goa (Panaji, Old Goa, Margao, Ponda, Divar Island)",
  },
  {
    value: "Gujarat",
    name: "Gujarat",
    cities: "Ahmedabad, Kutch, Patan, Vadodara, Somnath, Dwarka",
    label: "Gujarat (Ahmedabad, Kutch, Patan, Vadodara, Somnath)",
  },
  {
    value: "Haryana",
    name: "Haryana",
    cities: "Kurukshetra, Gurugram, Pinjore, Panipat, Sultanpur",
    label: "Haryana (Kurukshetra, Gurugram, Pinjore, Panipat)",
  },
  {
    value: "Himachal Pradesh",
    name: "Himachal Pradesh",
    cities: "Shimla, Dharamshala, Manali, Spiti Valley, Kangra",
    label: "Himachal Pradesh (Shimla, Dharamshala, Manali, Spiti Valley)",
  },
  {
    value: "Jharkhand",
    name: "Jharkhand",
    cities: "Ranchi, Deoghar, Jamshedpur, Hazaribagh, Betla",
    label: "Jharkhand (Ranchi, Deoghar, Jamshedpur, Hazaribagh)",
  },
  {
    value: "Karnataka",
    name: "Karnataka",
    cities: "Bengaluru, Hampi, Mysuru, Belur-Halebidu, Badami",
    label: "Karnataka (Bengaluru, Hampi, Mysuru, Belur-Halebidu)",
  },
  {
    value: "Kerala",
    name: "Kerala",
    cities: "Kochi, Thiruvananthapuram, Alappuzha, Thrissur, Wayanad",
    label: "Kerala (Kochi, Thiruvananthapuram, Alappuzha, Thrissur)",
  },
  {
    value: "Madhya Pradesh",
    name: "Madhya Pradesh",
    cities: "Bhopal, Khajuraho, Gwalior, Ujjain, Orchha, Sanchi",
    label: "Madhya Pradesh (Bhopal, Khajuraho, Gwalior, Ujjain, Orchha)",
  },
  {
    value: "Maharashtra",
    name: "Maharashtra",
    cities: "Mumbai, Pune, Aurangabad / Chhatrapati Sambhajinagar, Ajanta-Ellora",
    label: "Maharashtra (Mumbai, Pune, Aurangabad, Ajanta-Ellora)",
  },
  {
    value: "Manipur",
    name: "Manipur",
    cities: "Imphal, Loktak Lake, Bishnupur, Andro, Keibul Lamjao",
    label: "Manipur (Imphal, Loktak Lake, Bishnupur, Andro)",
  },
  {
    value: "Meghalaya",
    name: "Meghalaya",
    cities: "Shillong, Cherrapunji (Sohra), Mawlynnong, Dawki",
    label: "Meghalaya (Shillong, Cherrapunji, Mawlynnong, Dawki)",
  },
  {
    value: "Mizoram",
    name: "Mizoram",
    cities: "Aizawl, Reiek, Champhai, Vantawng Falls",
    label: "Mizoram (Aizawl, Reiek, Champhai, Vantawng Falls)",
  },
  {
    value: "Nagaland",
    name: "Nagaland",
    cities: "Kohima, Dimapur, Mokokchung, Dzukou Valley, Mon",
    label: "Nagaland (Kohima, Dimapur, Mokokchung, Dzukou Valley)",
  },
  {
    value: "Odisha",
    name: "Odisha",
    cities: "Bhubaneswar, Puri, Konark, Raghurajpur, Chilika",
    label: "Odisha (Bhubaneswar, Puri, Konark, Raghurajpur)",
  },
  {
    value: "Punjab",
    name: "Punjab",
    cities: "Amritsar, Patiala, Anandpur Sahib, Kapurthala",
    label: "Punjab (Amritsar, Patiala, Anandpur Sahib, Kapurthala)",
  },
  {
    value: "Rajasthan",
    name: "Rajasthan",
    cities: "Jaipur, Jodhpur, Udaipur, Jaisalmer, Pushkar, Bikaner",
    label: "Rajasthan (Jaipur, Jodhpur, Udaipur, Jaisalmer, Pushkar)",
  },
  {
    value: "Sikkim",
    name: "Sikkim",
    cities: "Gangtok, Pelling, Yuksom, Ravangla, Rumtek",
    label: "Sikkim (Gangtok, Pelling, Yuksom, Ravangla)",
  },
  {
    value: "Tamil Nadu",
    name: "Tamil Nadu",
    cities: "Chennai, Madurai, Thanjavur, Kanchipuram, Mahabalipuram",
    label: "Tamil Nadu (Chennai, Madurai, Thanjavur, Kanchipuram)",
  },
  {
    value: "Telangana",
    name: "Telangana",
    cities: "Hyderabad, Warangal, Ramappa, Bhongir, Pochampally",
    label: "Telangana (Hyderabad, Warangal, Ramappa, Pochampally)",
  },
  {
    value: "Tripura",
    name: "Tripura",
    cities: "Agartala, Unakoti, Udaipur, Neermahal, Jampui Hills",
    label: "Tripura (Agartala, Unakoti, Udaipur, Neermahal)",
  },
  {
    value: "Uttar Pradesh",
    name: "Uttar Pradesh",
    cities: "Varanasi, Agra, Lucknow, Ayodhya, Mathura, Prayagraj",
    label: "Uttar Pradesh (Varanasi, Agra, Lucknow, Ayodhya)",
  },
  {
    value: "Uttarakhand",
    name: "Uttarakhand",
    cities: "Rishikesh, Haridwar, Dehradun, Badrinath, Kedarnath, Almora",
    label: "Uttarakhand (Rishikesh, Haridwar, Dehradun, Almora)",
  },
  {
    value: "West Bengal",
    name: "West Bengal",
    cities: "Kolkata, Darjeeling, Santiniketan, Bishnupur, Murshidabad",
    label: "West Bengal (Kolkata, Darjeeling, Santiniketan, Bishnupur)",
  },
];

export const ALL_8_UNION_TERRITORIES: DestinationOption[] = [
  {
    value: "Andaman and Nicobar Islands",
    name: "Andaman and Nicobar Islands",
    cities: "Port Blair, Havelock Island (Swaraj Dweep), Neil Island, Cellular Jail",
    label: "Andaman & Nicobar Islands (Port Blair, Havelock, Cellular Jail)",
    isUT: true,
  },
  {
    value: "Chandigarh",
    name: "Chandigarh",
    cities: "The City Beautiful, Le Corbusier Capitol Complex, Rock Garden, Sukhna Lake",
    label: "Chandigarh (Rock Garden, Capitol Complex, Sukhna)",
    isUT: true,
  },
  {
    value: "Dadra and Nagar Haveli and Daman and Diu",
    name: "Dadra & Nagar Haveli and Daman & Diu",
    cities: "Daman Forts, Diu Naida Caves, Silvassa Warli Art Centers",
    label: "Dadra & Nagar Haveli and Daman & Diu (Daman, Diu, Silvassa)",
    isUT: true,
  },
  {
    value: "Delhi",
    name: "Delhi",
    cities: "National Capital Territory - Old Delhi, Red Fort, Qutub Minar, Humayun's Tomb",
    label: "Delhi (Old Delhi, Mehrauli, Red Fort, Nizamuddin)",
    isUT: true,
  },
  {
    value: "Jammu and Kashmir",
    name: "Jammu & Kashmir",
    cities: "Srinagar, Jammu, Gulmarg, Pahalgam, Dachigam, Anantnag",
    label: "Jammu & Kashmir (Srinagar, Jammu, Gulmarg, Pahalgam)",
    isUT: true,
  },
  {
    value: "Ladakh",
    name: "Ladakh",
    cities: "Leh, Nubra Valley, Zanskar, Pangong Tso, Hemis Monastery",
    label: "Ladakh (Leh, Nubra Valley, Pangong, Hemis)",
    isUT: true,
  },
  {
    value: "Lakshadweep",
    name: "Lakshadweep",
    cities: "Kavaratti, Agatti, Minicoy, Bangaram, Kadmat",
    label: "Lakshadweep (Kavaratti, Agatti, Minicoy, Bangaram)",
    isUT: true,
  },
  {
    value: "Puducherry",
    name: "Puducherry",
    cities: "French Quarter (White Town), Auroville, Promenade Beach, Sri Aurobindo Ashram",
    label: "Puducherry (French Quarter, Auroville, White Town)",
    isUT: true,
  },
];

export interface ExperienceStyleOption {
  id: string;
  label: string;
  icon: string;
}

export const EXPERIENCE_STYLES: ExperienceStyleOption[] = [
  { id: "temples", label: "Ancient Temples & Sacred Architecture", icon: "🏛️" },
  { id: "crafts", label: "Living Crafts & Master Artisans", icon: "🎨" },
  { id: "palaces", label: "Royal Palaces & Fortress Legends", icon: "🏰" },
  { id: "dance", label: "Classical Dance & Music Trails", icon: "💃" },
  { id: "culinary", label: "Ayurvedic Wellness & Culinary Feasts", icon: "🍲" },
  { id: "festivals", label: "Sacred Festivals & Folk Rituals", icon: "🪔" },
  { id: "nature", label: "Nature, Sacred Groves & Serene Retreats", icon: "🌿" },
  { id: "lore", label: "Oral Lore, Epics & Heritage Walks", icon: "📜" },
];

/**
 * Resilient deterministic generator that safely produces a rich Day-by-Day Itinerary
 * for ANY Indian State or UT, guaranteeing zero blank screen crashes.
 */
export function generateFallbackItinerary(
  destinationInput: string,
  daysInput: number,
  selectedStyles: string[],
  budget: string = "Comfort Heritage"
): ItineraryPlan {
  const days = Math.max(1, Math.min(daysInput || 5, 14));
  const rawDest = destinationInput || "Rajasthan";
  // Extract pure name if cities were passed in string
  const cleanName = rawDest.split("(")[0].trim() || rawDest;

  const styleNames = selectedStyles.length > 0
    ? selectedStyles
    : ["Ancient Temples & Sacred Architecture", "Living Crafts & Master Artisans"];

  const primaryStyle = styleNames[0] || "Cultural Heritage";

  const dailySchedule: ItineraryDay[] = Array.from({ length: days }, (_, i) => {
    const dayNum = i + 1;
    let title = "";
    let morning = "";
    let afternoon = "";
    let evening = "";
    let artisanHighlight = "";
    let culinaryDelight = "";

    if (dayNum === 1) {
      title = `Arrival & Historic Imperial Heritage in ${cleanName}`;
      morning = `Orientation walk through ${cleanName}'s iconic central heritage quarter, exploring ancient gateways and centuries-old stone architecture.`;
      afternoon = `Private visit to the principal regional museum or royal palace complex, decoding dynastic architectural styles and sacred manuscripts.`;
      evening = `Twilight heritage lamp-lighting ceremony followed by an introductory traditional acoustic music performance.`;
      artisanHighlight = `Heritage handloom weaver collective & Master artisan greeting studio`;
      culinaryDelight = `Welcome multi-course heritage thali served on brass dinnerware with heirloom spices`;
    } else if (dayNum === 2) {
      title = `Sacred Temples, Living Sanctuaries & Acoustic Wonders`;
      morning = `Dawn temple architecture tour decoding intricate stone pillars, sculpted friezes, and ancient Natya Shastra stone mudras.`;
      afternoon = `Hands-on masterclass with national award-winning artisans learning traditional block-printing, metal-casting, or pottery.`;
      evening = `Sunset walk across sacred temple tanks or riverside ghats with classical raga flute recital.`;
      artisanHighlight = `GI-tagged master craft guild & generational metal/terracotta foundry`;
      culinaryDelight = `Sacred temple prasad offering and traditional wood-fired slow-cooked delicacies`;
    } else if (dayNum === 3) {
      title = `Living Craft Guilds & Generational Lineages`;
      morning = `Excursion to a historic artisan village on the outskirts of ${cleanName}, observing raw vegetable-dye extraction and loom warping.`;
      afternoon = `Direct interactive session with generational master weavers and sculptors; purchase certified GI-tagged craft treasures.`;
      evening = `Folk dance performance with rhythmic percussion, community folklore storytelling, and local village campfire.`;
      artisanHighlight = `Ancestral GI-certified textile, woodcraft, or miniature painting guild`;
      culinaryDelight = `Clay-pot simmered spiced curries, millet flatbreads, and churned jaggery buttermilk`;
    } else if (dayNum === 4) {
      title = `Fortress Legends, Oral Lore & Epic Echoes`;
      morning = `Ascent to historic hill ramparts and fortress bastions with breathtaking panoramic views of the cultural landscape.`;
      afternoon = `Curated exploration of ancient stepwells, secret water harvesting tunnels, and astronomical courtyards.`;
      evening = `Sound and light heritage chronicle narrating the heroic dynasties and timeless myths of ${cleanName}.`;
      artisanHighlight = `Traditional sword-making, brass-inlay, or royal jewelry guild`;
      culinaryDelight = `Royal festive sweetmeat enriched with saffron, pistachios, and pure organic ghee`;
    } else if (dayNum === 5) {
      title = `Culinary Secrets, Herbal Bazaars & Ayurvedic Wisdom`;
      morning = `Early morning heritage spice bazaar sensory walk with an Ayurvedic culinary chef, identifying therapeutic botanicals.`;
      afternoon = `Interactive culinary masterclass learning traditional spice-roasting, stone-grinding, and heirloom recipe preservation.`;
      evening = `Rooftop sunset dining overlooking illuminated ancient monuments with classical sitar and tabla accompaniment.`;
      artisanHighlight = `Artisanal stone mortar carvers, brass cookware smiths & organic spice growers`;
      culinaryDelight = `Six-taste (Shadrasa) balanced Ayurvedic seasonal feast with infused medicinal herbal teas`;
    } else {
      title = `Deep Cultural Immersion & Hidden Sanctuaries (Day ${dayNum})`;
      morning = `Off-the-beaten-path exploration of tranquil monastic retreats, stepwells, or ancient rock-cut cave sanctuaries.`;
      afternoon = `Personal mentoring session with folk artists, exploring oral epics, tribal motifs, and sacred geometry.`;
      evening = `Farewell cultural gathering with regional folk musicians and blessing from traditional elder keepers of folklore.`;
      artisanHighlight = `Rural tribal craft collective and certified grassroots artisan preservation trust`;
      culinaryDelight = `Regional heirloom heritage dessert and artisanal filter brew or spiced kahwa`;
    }

    return {
      day: dayNum,
      title,
      morning,
      afternoon,
      evening,
      artisanHighlight,
      culinaryDelight,
    };
  });

  return {
    title: `${days}-Day Cultural Odyssey: Soul of ${cleanName}`,
    destination: cleanName,
    durationDays: days,
    summary: `A curated ${days}-day voyage through ${cleanName} designed for deep immersion in ${primaryStyle.toLowerCase()}, master artisan lineages, sacred architecture, and timeless regional feasts.`,
    dailySchedule,
    culturalEtiquette: [
      `Dress respectfully with covered shoulders and knees when visiting sacred temples and heritage sanctuaries in ${cleanName}.`,
      `Always remove footwear before stepping onto sanctum stones and traditional artisan workshop mats.`,
      `Seek kind permission before photographing master artisans and sacred ceremonial rituals.`,
      `Support the living heritage ecosystem by buying directly from verified GI-tagged artisan cooperatives.`,
    ],
  };
}
