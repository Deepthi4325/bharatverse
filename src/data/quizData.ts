import { QuizQuestion } from "../types";

export const initialQuizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which Indian temple features 56 monolithic stone pillars that produce distinct musical notes when gently tapped?",
    options: ["Brihadisvara Temple, Thanjavur", "Vittala Temple, Hampi", "Sun Temple, Konark", "Meenakshi Temple, Madurai"],
    correctIndex: 1,
    explanation: "The Vittala Temple in Hampi, Karnataka features 56 musical pillars (SaReGaMa pillars) built in the 16th century under the Vijayanagara Empire.",
    heritageFact: "British engineers were so perplexed by the hollow resonance that they cut two pillars open, only to find solid granite with tuned mineral densities.",
    category: "Monuments",
    difficulty: "Medium"
  },
  {
    id: "q2",
    question: "The GI-tagged Rogan art of Kutch, Gujarat uses paint uniquely prepared from which natural ingredient?",
    options: ["Mustard oil and clay", "Boiled castor seed oil and natural pigments", "Turmeric and rice paste", "Beeswax and safflower"],
    correctIndex: 1,
    explanation: "Rogan art involves boiling castor oil for over 48 hours until it forms a thick jelly-like paste, blended with mineral pigments and applied using an iron stylus in mid-air.",
    heritageFact: "Only one single family in Nirona village, Gujarat preserves the authentic 400-year-old Rogan art technique today.",
    category: "Crafts & Textiles",
    difficulty: "Scholar"
  },
  {
    id: "q3",
    question: "What is the ancient Sanskrit name of the three-bend posture iconic to classical Odissi dance and temple sculptures?",
    options: ["Aramandi", "Tribhangi", "Samapada", "Kataka"],
    correctIndex: 1,
    explanation: "Tribhangi (three-bend posture) deflects the body at the neck, torso, and hip, creating a gentle S-curve representing divine grace.",
    heritageFact: "The Tribhangi stance mirrors the classical sculptures found in the 2nd century BCE cave temples of Udayagiri and Khandagiri in Odisha.",
    category: "Classical Arts",
    difficulty: "Easy"
  },
  {
    id: "q4",
    question: "Which Indian sweet was invented in Nayagarh, Odisha, by baking fresh cottage cheese wrapped in Sal leaves?",
    options: ["Mysore Pak", "Chhena Poda", "Sandesh", "Ghevar"],
    correctIndex: 1,
    explanation: "Chhena Poda (literally 'burnt cheese') is the world's oldest traditional baked cheesecake, created by caramelizing fresh cottage cheese with cardamom.",
    heritageFact: "It is offered daily as part of the Mahaprasad Chhappan Bhog to Lord Jagannath in Puri.",
    category: "Culinary Heritage",
    difficulty: "Easy"
  },
  {
    id: "q5",
    question: "How is the world-famous Aranmula Kannadi metal mirror from Kerala unique compared to standard glass mirrors?",
    options: ["It reflects infrared light only", "It is a front-surface reflective metal alloy with zero secondary ghost refraction", "It is made of polished meteorite iron", "It changes color with room temperature"],
    correctIndex: 1,
    explanation: "Unlike modern glass mirrors which have a reflective coating on the back (causing double refraction and secondary reflection), Aranmula Kannadi reflects light directly off the polished front metal surface with zero distortion.",
    heritageFact: "The exact metallurgical copper-tin ratio is a closely guarded secret known to only a few artisan families in Aranmula village.",
    category: "Crafts & Textiles",
    difficulty: "Scholar"
  },
  {
    id: "q6",
    question: "Which astronomical feature is built into the architecture of the Sun Temple at Konark, Odisha?",
    options: ["A subterranean lunar pool", "24 stone chariot wheels that function as accurate solar dials", "A revolving observatory dome", "Twin star-reflecting mirrors"],
    correctIndex: 1,
    explanation: "The 24 carved wheels act as precise sundials. By observing the shadow cast on the wheel spokes and beads, one can calculate the exact time of day to within a few minutes.",
    heritageFact: "The seven horses pulling the chariot represent the 7 days of the week and the 7 colors of the visible solar spectrum (VIBGYOR).",
    category: "Monuments",
    difficulty: "Medium"
  },
  {
    id: "q7",
    question: "What is the primary natural fiber of Sualkuchi, Assam, that is naturally golden in color and outlives the wearer?",
    options: ["Eri Silk", "Muga Silk", "Tussar Silk", "Mulberry Silk"],
    correctIndex: 1,
    explanation: "Muga silk is the exclusive wild silk of Assam, famous for its natural glossy golden-amber tint and extreme durability that increases with washing.",
    heritageFact: "During the Ahom Dynasty (1228-1826 CE), royal decrees mandated that only royalty could wear full Muga garments in court.",
    category: "Crafts & Textiles",
    difficulty: "Medium"
  },
  {
    id: "q8",
    question: "Which UNESCO-recognized dance form from Kerala features green 'Paccha' facial makeup to denote noble and divine characters?",
    options: ["Mohiniyattam", "Kathakali", "Chhau", "Yakshagana"],
    correctIndex: 1,
    explanation: "Kathakali uses codified color symbolism: Paccha (green) for noble kings and gods like Rama and Krishna, Kathi (red knife) for villains with hubris, and Kari (black) for forest dwellers.",
    heritageFact: "Applying the intricate multi-layered Kathali Chutti makeup made from rice paste and lime can take over 4 hours before each performance.",
    category: "Classical Arts",
    difficulty: "Easy"
  }
];
