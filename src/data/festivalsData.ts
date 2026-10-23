import { Festival } from "../types";

export const festivalsData: Festival[] = [
  {
    id: "diwali",
    name: "Deepawali / Diwali",
    states: ["Pan-India", "Uttar Pradesh", "Gujarat", "Tamil Nadu", "Maharashtra"],
    monthSeason: "October - November (Kartika Amavasya)",
    significance: "The Festival of Lights celebrating the victory of light over darkness, truth over ignorance, and the return of Lord Rama to Ayodhya after 14 years of exile.",
    rituals: [
      "Lighting thousands of earthen clay Diyas with mustard or sesame oil",
      "Drawing vibrant Rangoli and Kolam geometric powders at home thresholds",
      "Lakshmi & Ganesha Puja at dusk with gold coins and fresh lotus blossoms",
      "Exchanging sweets and dry fruits with neighbors and artisans"
    ],
    sweetsDelicacies: ["Kaju Katli", "Besan Ladoo", "Gulab Jamun", "Shakkarpara", "Chivda"],
    celebrationType: "Spiritual, Illumination, Renewal",
    image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1000&q=80",
    travelTips: "Witness the monumental Dev Deepawali on the ghats of Varanasi where over 1 million lamps illuminate the Ganga riverbank."
  },
  {
    id: "holi",
    name: "Holi & Lathmar Holi",
    states: ["Uttar Pradesh (Braj / Mathura)", "Rajasthan", "Madhya Pradesh", "Pan-India"],
    monthSeason: "March (Phalguna Purnima)",
    significance: "The Spring Festival of Colors commemorating the triumph of devotee Prahlada over Holika, and the playful divine love of Radha-Krishna in Vrindavan.",
    rituals: [
      "Holika Dahan sacred bonfire lit on the eve to incinerate negativity",
      "Throwing natural herbal Gulal colors made from Tesu (Palash) flowers and turmeric",
      "Singing traditional Hori folk songs to the rhythmic beat of the Dholak",
      "Lathmar tradition in Barsana where women playfully tap men's shields with sticks"
    ],
    sweetsDelicacies: ["Crisp Gujiya filled with mawa & dry fruits", "Thandai infused with saffron & fennel", "Malpua", "Dahi Bhalla"],
    celebrationType: "Spring Rejuvenation, Harmony, Joyous Play",
    image: "https://images.unsplash.com/photo-1576487248805-cf45f6bf67f7?auto=format&fit=crop&w=1000&q=80",
    travelTips: "Visit Barsana and Nandgaon 5 days before Holi for the authentic heritage Lathmar spectacle."
  },
  {
    id: "durga-puja",
    name: "Durga Puja & Navaratri",
    states: ["West Bengal", "Gujarat", "Odisha", "Tripura", "Pan-India"],
    monthSeason: "September - October (Ashwin Shukla Paksha)",
    significance: "UNESCO Intangible Cultural Heritage celebrating Goddess Durga's victory over Mahishasura, symbolizing the triumph of cosmic feminine energy (Shakti).",
    rituals: [
      "Erection of monumental architectural art pavilions (Pandals)",
      "Chakshu Daan (painting the divine eyes on clay idols on Mahalaya)",
      "Dhunuchi Naach dance with smoking clay censers to thunderous Dhak drumming",
      "Sindoor Khela (vermilion ceremony) and immersion procession (Bisarjan)"
    ],
    sweetsDelicacies: ["Sandesh", "Rosogolla", "Mishti Doi", "Khichuri Bhog with Labra"],
    celebrationType: "UNESCO Cultural Heritage, Public Art, Devotion",
    image: "https://images.unsplash.com/photo-1601055903647-87e2213768fb?auto=format&fit=crop&w=1000&q=80",
    travelTips: "Take a walking tour of North Kolkata's heritage pandals at Kumartuli where generations of potters sculpt clay idols from river silt."
  },
  {
    id: "onam",
    name: "Onam & Vallam Kali",
    states: ["Kerala"],
    monthSeason: "August - September (Chingam Month)",
    significance: "The harvest festival of Kerala welcoming the benevolent King Mahabali, celebrated with floral carpets (Pookkalam) and snake-boat races.",
    rituals: [
      "Creating intricate circular flower carpets (Athapookkalam) at doorsteps",
      "Nehru Trophy Snake Boat Race (Vallam Kali) on Punnamada Lake",
      "Pulikali tiger dance and Thiruvathira women's circular clap dance",
      "26-dish grand Onam Sadhya served on fresh banana leaves"
    ],
    sweetsDelicacies: ["Palada Payasam", "Sharkara Varatti (Jaggery banana chips)", "Ada Pradhaman"],
    celebrationType: "Harvest, Maritime Glory, Egalitarian Harmony",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
    travelTips: "Book houseboats along Alappuzha during the snake boat race season to experience 100-oared canoes slicing through backwaters."
  },
  {
    id: "hornbill",
    name: "Hornbill Festival (Festival of Festivals)",
    states: ["Nagaland"],
    monthSeason: "December 1 - 10",
    significance: "A grand cultural confluence of all 17 indigenous Naga tribes showcasing rich warrior dances, woodcraft, traditional folk songs, and indigenous sports.",
    rituals: [
      "Tribal Morung village displays with towering carved wood totems",
      "Indigenous archery, spear throwing, and high-kick warrior competitions",
      "Traditional tribal choir harmonies and log-drum ceremonial beating",
      "Tasting organic bamboo-steamed delicacies and smoked meats"
    ],
    sweetsDelicacies: ["Bamboo shoot preparations", "Roasted rice cakes with forest honey", "Black sticky rice pudding"],
    celebrationType: "Tribal Unity, Indigenous Arts, Music",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    travelTips: "Head to Kisama Heritage Village near Kohima for the festival and explore the scenic Dzukou Valley nearby."
  },
  {
    id: "pushkar-camel-fair",
    name: "Pushkar Camel & Heritage Fair",
    states: ["Rajasthan"],
    monthSeason: "November (Kartik Purnima)",
    significance: "One of the world's largest livestock and cultural fairs where thousands of colorfully decorated camels gather beside the holy Pushkar Lake.",
    rituals: [
      "Sacred holy dip in Pushkar Lake at full moon dawn",
      "Camel beauty contests with shaved fur patterns, colorful tassels, and bells",
      "Traditional turban-tying and longest-mustache competitions",
      "Desert folk music recitals under the full desert moon"
    ],
    sweetsDelicacies: ["Pushkar Malpua drenched in saffron syrup", "Rabdi Falooda", "Gwarpatha ki Sabzi"],
    celebrationType: "Desert Nomadic Heritage, Cultural Fair",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
    travelTips: "Camp under the Thar desert stars on the outer dunes and wake up at sunrise to see camel caravans moving across morning mist."
  }
];
