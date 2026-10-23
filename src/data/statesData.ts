export const indianStatesData: any[] = [
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    code: "AP",
    zone: "South",
    capital: "Amaravati",
    officialLanguages: ["Telugu"],
    emblemTagline: "Where ancient temples meet living traditions",
    description: "Where ancient temples, sacred hills and timeless crafts shape the rhythm of life.",
    culturalEssence: "Cradled by the Krishna and Godavari rivers, Andhra Pradesh is a sacred realm of floating stone pillars, cosmic Kuchipudi rhythms, GI-tagged Srikalahasti Kalamkari, and devotion echoing across the Seven Hills of Tirumala.",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010e42e1281?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 15.9129, lng: 79.7400 },
    heritageSitesCount: 7,
    craftsCount: 22,
    unescoSites: ["Monuments of Lepakshi (Tentative List)", "Nagarjunakonda Buddhist Ensembles"],
    iconicMonuments: [
      {
        id: "lepakshi-temple",
        name: "Veerabhadra Temple & Hanging Pillar, Lepakshi",
        stateId: "andhra-pradesh",
        stateName: "Andhra Pradesh",
        periodEra: "1530 CE",
        dynasty: "Vijayanagara Empire (Virupanna & Veeranna)",
        architectureStyle: "Vijayanagara Sculptural Granite Architecture",
        unescoStatus: false,
        description: "An architectural marvel featuring 70 intricately chiseled granite pillars, including the legendary Hanging Pillar that defies gravity without touching the temple floor.",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 13.8042, lng: 77.6053 },
        acousticOrAstronomicalSecrets: "One of the 70 pillars does not touch the ground at its base; a piece of cloth or thin paper can be passed freely beneath its foundation.",
        audioNarrationScript: "Step into the Natya Mandapa of Lepakshi. Look at the ceiling: medieval vegetable-dye frescoes stretch above you, while nearby, the monolithic 27-foot Nandi and the 7-headed hooded Naga Linga stand carved from single granite boulders.",
        virtualTourHighlights: ["Defying Gravity Hanging Pillar", "Monolithic 27-foot Granite Nandi", "7-Headed Nagalinga Monolith", "Medieval Vijayanagara Ceiling Frescoes"],
        historicalSignificance: "Celebrated in the Ramayana as the spot where Lord Rama comforted the wounded Jatayu with the words 'Le Pakshi' (Rise, O bird).",
        tags: ["Vijayanagara", "Hanging Pillar", "Granite", "Fresco"],
        nearestAirport: "Kempegowda International Airport Bengaluru (100 km)",
        nearestRailwayStation: "Hindupur Railway Station (14 km)"
      },
      {
        id: "tirumala-venkateswara",
        name: "Tirumala Venkateswara Temple",
        stateId: "andhra-pradesh",
        stateName: "Andhra Pradesh",
        periodEra: "300 CE onwards",
        dynasty: "Pallava, Chola, Pandya & Vijayanagara Royal Patrons",
        architectureStyle: "Dravidian Gold-Plated Vimana Architecture",
        unescoStatus: false,
        description: "Situated atop the sacred Seven Hills of Seshachalam, this ancient temple is crowned by the shimmering gold-plated Ananda Nilayam tower and holds unbroken millennia of devotional worship.",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 13.6833, lng: 79.3500 },
        acousticOrAstronomicalSecrets: "The sacred deity idol (Moola Virat) maintains a perennial internal temperature of 110 degrees, with the back of the idol whispering the sound of rushing ocean waves.",
        audioNarrationScript: "Ascend the Seven Hills of Tirumala. The golden dome of Ananda Nilayam catches the morning rays, radiating a peaceful spiritual resonance felt by millions of pilgrims arriving on foot.",
        virtualTourHighlights: ["Ananda Nilayam Golden Spire", "Dwajasthambham Gold Flagstaff", "Swami Pushkarini Holy Tank", "Silathoranam Natural Rock Arch"],
        historicalSignificance: "The foremost pilgrimage sanctuary of Sanatana Dharma with recorded royal endowments spanning two thousand years.",
        tags: ["Spiritual", "Gold Vimana", "Sacred Hills"],
        nearestAirport: "Tirupati International Airport (35 km)",
        nearestRailwayStation: "Tirupati Main Railway Station (22 km)"
      },
      {
        id: "undavalli-caves",
        name: "Undavalli Rock-Cut Caves",
        stateId: "andhra-pradesh",
        stateName: "Andhra Pradesh",
        periodEra: "4th-7th Century CE",
        dynasty: "Vishnukundina Dynasty",
        architectureStyle: "Rock-Cut Sandstone Monolithic Architecture",
        unescoStatus: false,
        description: "Four-storey rock-cut hillside caves carved out of solid sandstone hills, housing a colossal 16-foot reclining Lord Padmanabha carved from living rock.",
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 16.4975, lng: 80.5822 },
        acousticOrAstronomicalSecrets: "Tiered facade conduits channel breezes off the Krishna river, creating natural subterranean acoustic reverberation chambers.",
        audioNarrationScript: "Walk through the four tiers of Undavalli chiseled directly into the mountain face, capturing the fusion of early Buddhist vihara layout and Vishnukundina sculpture.",
        virtualTourHighlights: ["Colossal Reclining Anantasayana Rock Monolith", "Four-Tiered Sandstone Facade", "Carved Lion Pillars", "Krishna River Valley View"],
        historicalSignificance: "Pivotal rock-cut monastery showing the architectural transition from Buddhist viharas to Hindu cave sanctuaries.",
        tags: ["Caves", "Rock-Cut", "Krishna River"],
        nearestAirport: "Vijayawada International Airport (28 km)",
        nearestRailwayStation: "Vijayawada Junction (6 km)"
      }
    ],
    craftsAndArts: [
      {
        id: "srikalahasti-kalamkari",
        name: "Srikalahasti Freehand Kalamkari",
        stateId: "andhra-pradesh",
        stateName: "Andhra Pradesh",
        category: "Painting",
        giTagged: true,
        giYear: "2006",
        rawMaterials: ["Bamboo reed pen (Kalam)", "Natural indigo, madder root, fermented iron rust", "Myrobalan milk bath", "Handloom cotton"],
        ancientTechnique: "Freehand drawing with bamboo pens and 100% plant-based organic vegetable dyes; each artwork undergoes up to 17 stages of washing in the flowing Swarnamukhi river.",
        historicalOriginEra: "Ancient temple scroll painting tradition flourishing under Vijayanagara royal courts",
        description: "Sacred storytelling art on fabric depicting Ramayana, Mahabharata, and Tree of Life with intricate natural dye detailing that never fades.",
        image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Srikalahasti Kalamkari Craft Guild",
        howItsMadeSteps: [
          "Cotton fabric treated in buffalo milk and Myrobalan fruit extract.",
          "Outlines drawn freehand using a bamboo Kalam loaded with fermented iron and jaggery.",
          "Vegetable colors filled in using natural alum mordants.",
          "Washed in the mineral-rich waters of the Swarnamukhi river and sun-dried on river sand."
        ]
      },
      {
        id: "kondapalli-toys",
        name: "Kondapalli Wooden Craft (Bommala Koluvu)",
        stateId: "andhra-pradesh",
        stateName: "Andhra Pradesh",
        category: "Woodwork",
        giTagged: true,
        giYear: "2006",
        rawMaterials: ["Tella Poniki softwood (Wrightia tinctoria)", "Tamarind seed glue (Makku)", "Natural lacquer and enamel pigments"],
        ancientTechnique: "Lightweight local softwood is hand-chiseled piece by piece and assembled using boiled tamarind paste, creating expressive village life figurines.",
        historicalOriginEra: "400-year-old tradition tracing lineage to Sage Muktaharishi",
        description: "Famed for Ambari (Royal Elephant with Howdah), village farmers, and Dasa Avatar festive collections.",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Kondapalli Nakarshalu Guild",
        howItsMadeSteps: [
          "Soft Tella Poniki wood seasoned and cut with fine chisels.",
          "Individual anatomical parts carved separately.",
          "Joined together using natural Makku paste made of boiled tamarind seeds.",
          "Painted with fine squirrel-hair brushes."
        ]
      }
    ],
    dancesAndMusic: [
      {
        id: "kuchipudi-dance",
        name: "Kuchipudi Classical Dance",
        stateId: "andhra-pradesh",
        stateName: "Andhra Pradesh",
        type: "Classical Dance",
        description: "Where storytelling comes alive through movement. Renowned for dramatic theatrical expression (Natya), fast-paced rhythmic footwork, and the breathtaking Tarangam.",
        costumeDetails: "Vibrant pleated Kanchipuram silk costume, brass waist belt (Oddiyanam), head ornaments representing the sun and moon, and ghungroo ankle bells.",
        instrumentsUsed: ["Mridangam", "Nattuvangam (Cymbals)", "Carnatic Flute", "Veena", "Violin"],
        mudrasAndMovements: ["Tarangam brass plate balance", "Tribhanga postures", "Expressive Navarasa abhinaya", "Manduka Shabdam jumps"],
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
        rhythmBeat: "Dynamic Carnatic Talas (Adi, Rupaka) accompanied by melodic Sollukattus",
        originEra: "Originated in the village of Kuchelapuram through Siddhendra Yogi in 14th Century"
      }
    ],
    culinaryDelicacies: [
      {
        id: "pootharekulu-gongura",
        name: "Atreyapuram Pootharekulu & Gongura Delicacy",
        stateId: "andhra-pradesh",
        stateName: "Andhra Pradesh",
        type: "Sweet / Dessert",
        description: "Pootharekulu (Paper Sweet) is made from paper-thin rice batter sheets rolled with pure desi ghee and powdered jaggery/dry fruits, paired with Andhra's legendary tangy Gongura (sorrel leaves) pachadi.",
        keyIngredients: ["Jaya rice starch film", "Pure Desi Ghee", "Organic Jaggery & Pistachio", "Gongura (Red sorrel leaves)", "Byadagi chillies & garlic"],
        ayurvedicProperty: "High iron from Gongura leaves boosts immunity; ghee and jaggery provide instant restorative vitality.",
        historicalLore: "Crafted in the Godavari village of Atreyapuram for over three centuries as a royal wedding confectionery.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    livingArtisans: [
      {
        id: "lakshmi-devi-kalamkari",
        name: "Lakshmi Devi",
        craftName: "Kalamkari Master Artist",
        villageLocation: "Srikalahasti",
        stateName: "Andhra Pradesh",
        experienceYears: 36,
        awards: "National Master Craftsman Award",
        story: "Keeping a centuries-old art alive through every brushstroke. Lakshmi hand-draws intricate Ramayana epic panels using natural bamboo pens and fermented plant dyes.",
        avatar: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Freehand bamboo pen drawing with natural fermented iron and myrobalan mordants.",
        patronAction: "Support Srikalahasti Women Weavers & Artists Guild"
      },
      {
        id: "srikanth-kondapalli",
        name: "K. Srikanth Achari",
        craftName: "Kondapalli Toy Sculptor",
        villageLocation: "Kondapalli, Krishna District",
        stateName: "Andhra Pradesh",
        experienceYears: 32,
        awards: "State Heritage Master Award",
        story: "Carving village memories and epics out of sacred Tella Poniki wood for three decades, ensuring eco-friendly non-toxic toy making thrives for the next generation.",
        avatar: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Hand-chiseling Tella Poniki wood with boiled tamarind seed Makku paste assembly.",
        patronAction: "Order Direct from Kondapalli Craft Cooperative"
      }
    ],
    ancientLegends: [
      {
        id: "legend-jatayu-lepakshi",
        title: "The Legend of Jatayu at Lepakshi",
        stateName: "Andhra Pradesh",
        category: "Legends",
        monumentOrEntity: "Veerabhadra Temple, Lepakshi",
        era: "Treta Yuga / Ramayana Era",
        shortTagline: "A tale of courage that continues to echo through time.",
        narrative: "When Ravana abducted Devi Sita in his celestial chariot, the venerable divine bird Jatayu flew fearlessly into the sky to fight him. Fatally wounded in the valiant duel, Jatayu fell to the rocky soil of this hilltop. When Lord Rama arrived and found the dying eagle, he held him with tears of gratitude, whispering the compassionate words 'Le Pakshi' (Rise, O bird), bestowing divine liberation upon his heroic soul.",
        moralPhilosophicalCore: "Supreme courage and duty in standing up for righteousness, regardless of mortal outcome.",
        audioMinutes: 4,
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    code: "RJ",
    zone: "North",
    capital: "Jaipur",
    officialLanguages: ["Hindi", "Rajasthani", "Marwari"],
    emblemTagline: "The Land of Maharajas & Timeless Chivalry",
    description: "A desert kingdom of sandstone hill forts, mirrored palaces, vibrant block prints, and desert balladeers carrying thousand-year-old epics.",
    culturalEssence: "Where golden desert dunes meet impenetrable hill citadels, vibrant leheriya silks, and royal valor celebrated in timeless folk ballads under starry night skies.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    heritageSitesCount: 8,
    craftsCount: 24,
    unescoSites: ["Hill Forts of Rajasthan", "Jantar Mantar Jaipur", "Keoladeo National Park"],
    iconicMonuments: [
      {
        id: "amber-fort",
        name: "Amber Fort & Sheesh Mahal",
        stateId: "rajasthan",
        stateName: "Rajasthan",
        periodEra: "1592 CE",
        dynasty: "Kachwaha Rajput Dynasty",
        architectureStyle: "Rajput & Mughal Syncretic Architecture",
        unescoStatus: true,
        description: "Perched majestically atop the rugged Aravalli hills, Amber Fort houses the legendary Sheesh Mahal where a single candle flame reflects into thousands of celestial stars across Belgian crystal inlays.",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 26.9855, lng: 75.8513 },
        acousticOrAstronomicalSecrets: "Subterranean ventilation conduits channeled cooled desert air through water cascading down carved marble jaali screens.",
        audioNarrationScript: "Step across the Sun Gate where royal cavalry once rode. Look up at the Sheesh Mahal ceiling: concave crystal mirrors simulate a starry galaxy without stepping into the night chill.",
        virtualTourHighlights: ["Sheesh Mahal Starry Vault", "Ganesh Pol Painted Archway", "Sukh Niwas Air-Cooled Chambers", "Maota Lake Reflection Point"],
        historicalSignificance: "Strategic seat of the Kachwahas and pivotal military citadel safeguarding the Amber kingdom for centuries.",
        tags: ["Fort", "Palace", "Mirrors", "Rajput"],
        nearestAirport: "Jaipur International Airport (22 km)",
        nearestRailwayStation: "Jaipur Junction Railway Station (13 km)"
      },
      {
        id: "jantar-mantar-jaipur",
        name: "Jantar Mantar Astronomical Observatory",
        stateId: "rajasthan",
        stateName: "Rajasthan",
        periodEra: "1734 CE",
        dynasty: "Maharaja Sawai Jai Singh II",
        architectureStyle: "Astronomical Stone Masonry",
        unescoStatus: true,
        description: "A monumental collection of 19 architectural astronomical instruments, including the world's largest stone sundial accurate to within 2 seconds of local solar time.",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 26.9248, lng: 75.8246 },
        acousticOrAstronomicalSecrets: "The 27-meter tall gnomon casts a shadow moving at 1 millimeter per second, measuring celestial azimuths and eclipse predictions without optical lenses.",
        audioNarrationScript: "Maharaja Sawai Jai Singh II erected these monumental stone geometries to calculate heavenly movements with uncanny mathematical precision.",
        virtualTourHighlights: ["Vrihat Samrat Yantra (Giant Sundial)", "Jai Prakash Yantra (Inverted Hemispheres)", "Rama Yantra for Altitude & Azimuth"],
        historicalSignificance: "The peak of medieval Indian astronomy synthesizing Hindu, Islamic, and European astronomical systems.",
        tags: ["Astronomy", "UNESCO", "Science"],
        nearestAirport: "Jaipur International Airport (12 km)",
        nearestRailwayStation: "Jaipur Junction (5 km)"
      }
    ],
    craftsAndArts: [
      {
        id: "blue-pottery-jaipur",
        name: "Jaipur Blue Pottery",
        stateId: "rajasthan",
        stateName: "Rajasthan",
        category: "Pottery",
        giTagged: true,
        giYear: "2008",
        rawMaterials: ["Quartz stone powder", "Fuller's earth (Multani Mitti)", "Natural gum (Gond)", "Copper oxide & Cobalt"],
        ancientTechnique: "The only pottery in the world crafted without clay; ground quartz paste is molded, painted with squirrel-hair brushes, and glazed at low firing temperatures.",
        historicalOriginEra: "Turko-Persian craft brought to Amber in 19th Century",
        description: "Characterized by radiant turquoise blue and cobalt floral motifs, producing delicate vases and tiles that never develop cracks.",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Kripal Kumbh & Sanganer Guilds",
        howItsMadeSteps: [
          "Quartz, glass, Multani mitti, and gum ground into paste.",
          "Formed inside open plaster molds and smoothed with river sand.",
          "Master painters trace arabesques using cobalt brushes.",
          "Fired in wood-fired kilns for 8 hours."
        ]
      }
    ],
    dancesAndMusic: [
      {
        id: "ghoomar-dance",
        name: "Ghoomar & Kalbelia Dance",
        stateId: "rajasthan",
        stateName: "Rajasthan",
        type: "Folk Dance",
        description: "Ghoomar is a graceful royal circle dance where women in swirling mirrored ghaghras pirouette in devotional harmony. Kalbelia is UNESCO-recognized for its sinuous snake-charmer rhythm.",
        costumeDetails: "80-kali flowing mirrored ghagra, kanchli bodice, and sheer odhani veil with gold gota-patti border.",
        instrumentsUsed: ["Dholak", "Manjira", "Pungi (Been)", "Morchang", "Kamaicha"],
        mudrasAndMovements: ["Chakkar (whirling pirouette)", "Lahanga swirl", "Sinuous wrist ripples"],
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
        rhythmBeat: "Kaherva transitioning to rapid Dhad whirls",
        originEra: "Bhil Tribe origins adopted by Rajput royal courts in 14th Century"
      }
    ],
    culinaryDelicacies: [
      {
        id: "dal-baati-churma",
        name: "Dal Baati Churma",
        stateId: "rajasthan",
        stateName: "Rajasthan",
        type: "Main Dish",
        description: "Hard wheat dough balls baked over dried cow-dung embers, submerged in pure golden desi ghee, accompanied by five-lentil spicy dal and sweet crushed churma.",
        keyIngredients: ["Coarse wheat flour", "Panchmel Dal", "Desi Ghee", "Jaggery / Bura sugar", "Green chili tadka"],
        ayurvedicProperty: "High endurance, warming energy suited for arid climates with long shelf-life.",
        historicalLore: "Invented during the Rawal Ratan Singh era in Chittorgarh as warrior rations buried beneath warm desert sands at sunrise and eaten baked at dusk.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    livingArtisans: [
      {
        id: "mahesh-sharma-meenakari",
        name: "Ustad Mahesh Sharma",
        craftName: "Kundan Meenakari Enameler",
        villageLocation: "Johari Bazaar, Jaipur",
        stateName: "Rajasthan",
        experienceYears: 42,
        awards: "National Master Craftsman Award",
        story: "Carrying 5 generations of royal jeweler lineage, Ustad Mahesh hand-engraves pure gold ornaments with mineral glass enamels fired in miniature charcoal kilns.",
        avatar: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Microscopic engraving with diamond-tipped burins and natural ruby-red enamel fusion.",
        patronAction: "Support Direct Artisan Apprentice Guild"
      }
    ],
    ancientLegends: [
      {
        id: "legend-padmini-mirror",
        title: "The Mirror of Chittorgarh",
        stateName: "Rajasthan",
        category: "Historical Stories",
        monumentOrEntity: "Chittorgarh Fort",
        era: "1303 CE",
        shortTagline: "Where royal honor transcended mortal conquest.",
        narrative: "When Sultan Alauddin Khilji laid siege to Chittorgarh desiring to glimpse Queen Padmini, a delicate compromise allowed him to view only her reflection in a bronze water mirror inside the lake palace. Struck by her majesty, the ensuing battle tested the indomitable soul of Rajput honor.",
        moralPhilosophicalCore: "Unwavering dignity, self-sacrifice, and honor surpassing mortal conquest.",
        audioMinutes: 4,
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    code: "TN",
    zone: "South",
    capital: "Chennai",
    officialLanguages: ["Tamil"],
    emblemTagline: "The Cradle of Dravidian Temple Splendor",
    description: "Soaring granite Gopurams piercing the sky, the rhythmic resonance of Bharatanatyam, and pure mulberry Kanchipuram silks.",
    culturalEssence: "Home to the world's oldest continuous classical language, Chola lost-wax bronze mastery, and monumental granite temples built with millimeter precision.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    heritageSitesCount: 11,
    craftsCount: 38,
    unescoSites: ["Great Living Chola Temples", "Group of Monuments at Mahabalipuram", "Nilgiri Mountain Railway"],
    iconicMonuments: [
      {
        id: "brihadisvara-temple",
        name: "Brihadisvara Temple (Thanjavur Periya Kovil)",
        stateId: "tamil-nadu",
        stateName: "Tamil Nadu",
        periodEra: "1010 CE",
        dynasty: "Chola Empire (Raja Raja Chola I)",
        architectureStyle: "Pure Dravidian Vimana Architecture",
        unescoStatus: true,
        description: "A monumental 216-foot granite tower constructed entirely of interlocking granite blocks with an 80-tonne single granite capstone placed atop without modern machinery.",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 10.7828, lng: 79.1318 },
        acousticOrAstronomicalSecrets: "The shadow of the central Vimana never touches the outer courtyard boundary at noon on the equinox, and the sanctum maintains an exact resonant acoustic frequency.",
        audioNarrationScript: "Stand before the Periya Kovil. Built over a thousand years ago by Emperor Raja Raja Chola without mortar, more than 130,000 tonnes of granite were hauled across rivers.",
        virtualTourHighlights: ["80-Tonne Monolithic Kumbam", "Massive 20-Tonne Nandi Pavilion", "Ancient Chola Frescoes", "108 Karana Dance Reliefs"],
        historicalSignificance: "The supreme zenith of medieval temple architecture and sovereign Chola imperial engineering.",
        tags: ["Chola", "Granite", "UNESCO", "Dravidian"],
        nearestAirport: "Tiruchirappalli International Airport (58 km)",
        nearestRailwayStation: "Thanjavur Junction (2 km)"
      }
    ],
    craftsAndArts: [
      {
        id: "kanchipuram-silk",
        name: "Kanchipuram Pattu Silk",
        stateId: "tamil-nadu",
        stateName: "Tamil Nadu",
        category: "Textile",
        giTagged: true,
        giYear: "2005",
        rawMaterials: ["Mulberry silk yarn", "Pure silver dipped in 24K gold zari", "Rice starch natural glaze"],
        ancientTechnique: "The legendary Korvai interlocking technique where the pallu and border are woven separately and locked to the main body with three-shuttle manual precision.",
        historicalOriginEra: "Over 400 years old descendant weavers of Sage Markandeya",
        description: "Known as the Queen of Silks, each saree is woven with quadruple-strand silk twist and pure gold-silver zari temple borders.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Kanchi Padmasaliyar Weavers",
        howItsMadeSteps: [
          "Mulberry silk yarn dyed with natural mordants.",
          "Korvai technique interlocks two weavers working synchronized on edges.",
          "Zari motifs inserted with pure silver threads."
        ]
      }
    ],
    dancesAndMusic: [
      {
        id: "bharatanatyam",
        name: "Bharatanatyam",
        stateId: "tamil-nadu",
        stateName: "Tamil Nadu",
        type: "Classical Dance",
        description: "The quintessential Indian classical dance based on the Natya Shastra, characterized by fixed upper torso, bent knees (Aramandi), intricate footwork, and expressive eye gestures.",
        costumeDetails: "Pleated silk Kanchipuram costume with fan that opens in Aramandi, temple jewelry with sun and moon head ornaments.",
        instrumentsUsed: ["Mridangam", "Nattuvangam", "Carnatic Flute", "Veena", "Violin"],
        mudrasAndMovements: ["Pataka", "Tripataka", "Alapadma", "Aramandi demi-plié"],
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
        rhythmBeat: "Adi Tala and complex rhythmic Jatis recited by Nattuvanar",
        originEra: "2000+ years old ancient temple Devadasi dance tradition"
      }
    ],
    culinaryDelicacies: [
      {
        id: "chettinad-feast",
        name: "Chettinad Kozhi Kuzhambu & Idiyappam",
        stateId: "tamil-nadu",
        stateName: "Tamil Nadu",
        type: "Main Dish",
        description: "Aromatic curry ground with 18 freshly roasted whole spices including stone flower (Kalpasi), star anise, and black pepper, served with steamed string hoppers.",
        keyIngredients: ["Kalpasi", "Shallots", "Curry leaves", "Freshly ground black pepper"],
        ayurvedicProperty: "Ignites digestive fire (Agni), clears sinuses, balances Kapha.",
        historicalLore: "Developed by the maritime trading Nattukottai Chettiars who traversed Southeast Asia.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    livingArtisans: [
      {
        id: "radhakrishna-sthapathi",
        name: "Master Sthapathi Radhakrishna",
        craftName: "Chola Lost-Wax Bronze Sculptor",
        villageLocation: "Swamimalai, Thanjavur District",
        stateName: "Tamil Nadu",
        experienceYears: 48,
        awards: "Padma Shri & Shilp Guru Award",
        story: "Direct descendant of the royal sculptors who cast the Brihadisvara icons, preserving the sacred palm-leaf Dhyana Shlokas for casting cosmic Nataraja bronzes.",
        avatar: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Talamana proportion calculations from memory and hand-cast single pour bronze alloy.",
        patronAction: "Order Authentic GI Certified Icon from Guild"
      }
    ],
    ancientLegends: [
      {
        id: "legend-nataraja-chidambaram",
        title: "The Cosmic Dance of Ananda Tandava",
        stateName: "Tamil Nadu",
        category: "Mythological Stories",
        monumentOrEntity: "Chidambaram Nataraja Temple",
        era: "Vedic & Sangam Antiquity",
        shortTagline: "The perpetual cosmic dance of conscious creation and renewal.",
        narrative: "In the sacred mangrove forest of Tillai, Lord Shiva performed the celestial Ananda Tandava dance of bliss, subduing ignorance beneath his lotus foot. The Golden Hall represents the human heart where creation, preservation, destruction, illusion, and liberation pulse continuously.",
        moralPhilosophicalCore: "The universe is a perpetual dance of conscious energy and timeless renewal.",
        audioMinutes: 5,
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "karnataka",
    name: "Karnataka",
    code: "KA",
    zone: "South",
    capital: "Bengaluru",
    officialLanguages: ["Kannada"],
    emblemTagline: "The Jewel of Vijayanagara & Hoysala Stone Poetry",
    description: "The colossal boulder-strewn ruined capital of Hampi, the filigree star-shaped Hoysala shrines of Belur, and fragrant sandalwood hills.",
    culturalEssence: "A land where granite boulders were chiseled into musical pillars and soft soapstone was sculpted so finely that stone lace threads turn with the touch of a hand.",
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 15.3350, lng: 76.4600 },
    heritageSitesCount: 9,
    craftsCount: 22,
    unescoSites: ["Group of Monuments at Hampi", "Sacred Ensembles of the Hoysalas", "Pattadakal"],
    iconicMonuments: [
      {
        id: "vittala-temple-hampi",
        name: "Vittala Temple & Stone Chariot, Hampi",
        stateId: "karnataka",
        stateName: "Karnataka",
        periodEra: "15th-16th Century CE",
        dynasty: "Vijayanagara Empire",
        architectureStyle: "Vijayanagara Imperial Dravidian",
        unescoStatus: true,
        description: "The crown jewel of Hampi featuring the iconic Garuda Stone Chariot with rotatable stone wheels, and the Ranga Mandapa with 56 musical pillars that produce distinct notes when tapped.",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 15.3400, lng: 76.4750 },
        acousticOrAstronomicalSecrets: "The 56 musical pillars are carved from solid granite resonating with the frequencies of Mridangam, Damaru, Veena, and Saptaswara.",
        audioNarrationScript: "You are standing in the center of the Vijayanagara empire. Every wheel and axle of the stone chariot is carved from solid granite.",
        virtualTourHighlights: ["Garuda Stone Chariot", "Musical SaReGaMa Columns", "Carved Yali Balustrades", "Tungabhadra River Sunset"],
        historicalSignificance: "Capital of Krishnadevaraya where diamonds and rubies were once weighed in open street markets.",
        tags: ["Vijayanagara", "UNESCO", "Chariot", "Musical Pillars"],
        nearestAirport: "Jindal Vijayanagar Airport Bellary (35 km)",
        nearestRailwayStation: "Hosapete Junction (13 km)"
      }
    ],
    craftsAndArts: [
      {
        id: "bidriware",
        name: "Bidriware Silver Inlay Metalcraft",
        stateId: "karnataka",
        stateName: "Karnataka",
        category: "Metalwork",
        giTagged: true,
        giYear: "2006",
        rawMaterials: ["Zinc and Copper alloy", "Pure Silver wire and foil", "Soil from Bidar Fort courtyard"],
        ancientTechnique: "Cast alloy is etched with chisels, silver wire inlaid into grooves, and submerged in boiling Bidar Fort soil paste to turn the metal jet-black while silver glows bright.",
        historicalOriginEra: "14th Century Bahmani Sultanate",
        description: "High contrast black and silver hookahs, trays, and jewel caskets that never rust or tarnish.",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Bidri Artisans Guild of Bidar",
        howItsMadeSteps: [
          "Molding and casting in zinc-copper alloy.",
          "Engraving floral Damascene patterns with steel burins.",
          "Pure silver wire hammered into channels.",
          "Boiled in Bidar Fort soil paste for instant oxidation to jet black."
        ]
      }
    ],
    dancesAndMusic: [
      {
        id: "yakshagana",
        name: "Yakshagana",
        stateId: "karnataka",
        stateName: "Karnataka",
        type: "Theatre",
        description: "An electrifying all-night traditional folk theatre combining spoken dialogue, aerial leaps, vigorous footwork, and towering headgear depicting epic tales.",
        costumeDetails: "Gilded headgear (Kedage Mundasu), bright red-orange breastplates, and multi-colored skirts.",
        instrumentsUsed: ["Chande", "Maddale", "Taala", "Harmonium"],
        mudrasAndMovements: ["Kalaripayattu inspired combat steps", "Rapid circular knee-spins"],
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
        rhythmBeat: "Tribhangi step sequences governed by the thunderous beat of the Chande drum",
        originEra: "Over 800 years old Bhakti movement theatre tradition in Coastal Karnataka"
      }
    ],
    culinaryDelicacies: [
      {
        id: "bisi-bele-bath-mysore-pak",
        name: "Bisi Bele Bath & Mysore Pak",
        stateId: "karnataka",
        stateName: "Karnataka",
        type: "Main Dish",
        description: "A comforting slow-cooked medley of rice, toor dal, 14 roasted spices, and fresh vegetables simmered with tamarind pulp and ghee, followed by melt-in-mouth Mysore Pak.",
        keyIngredients: ["Sona Masoori rice", "Byadagi chillies", "Marathi Moggu", "Pure Desi Ghee", "Besan and Sugar syrup"],
        ayurvedicProperty: "Balances Vata with nourishing warm ghee, rich proteins, and complex carbohydrates.",
        historicalLore: "Mysore Pak was created by royal chef Kakasura Madappa in the royal kitchen of Mysore Palace for King Krishnaraja Wadiyar IV in 1935.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    livingArtisans: [
      {
        id: "shah-rasheed-ahmed-quadri",
        name: "Shah Rasheed Ahmed Quadri",
        craftName: "Bidriware Inlay Master",
        villageLocation: "Bidar",
        stateName: "Karnataka",
        experienceYears: 45,
        awards: "Padma Shri & National Award",
        story: "Recognized internationally for modernizing traditional Persian-Bahmani silver floral inlays, Quadri has trained over 400 younger craftsmen to preserve Bidar's living heritage.",
        avatar: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Micro-inlay of 99.9% fine silver wire without adhesive onto hand-cast zinc alloy.",
        patronAction: "Support Direct Bidar Artisan Cooperative"
      }
    ],
    ancientLegends: [
      {
        id: "legend-krishnadevaraya-tenali",
        title: "The Golden Era of Krishnadevaraya",
        stateName: "Karnataka",
        category: "Historical Stories",
        monumentOrEntity: "Hampi Bazaar",
        era: "1520 CE",
        shortTagline: "When diamonds and pearls were weighed in open market squares.",
        narrative: "During the reign of Krishnadevaraya, the empire was so prosperous that travelers recorded rubies, emeralds, and diamonds being traded in open street markets by volume using grain measures. The spirit of artistic patronage made Hampi a beacon of light.",
        moralPhilosophicalCore: "Prosperity is elevated only when paired with learning, music, and profound public welfare.",
        audioMinutes: 4,
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "odisha",
    name: "Odisha",
    code: "OD",
    zone: "East",
    capital: "Bhubaneswar",
    officialLanguages: ["Odia"],
    emblemTagline: "The Soul of Jagannath & the Sun Chariot",
    description: "Kalinga temple spires, the colossal stone sun chariot at Konark, intricate palm-leaf Pattachitra scrolls, and Odissi dance.",
    culturalEssence: "Where ocean waves whisper ancient maritime chronicles, and master Chitrakars etch microscopic epic verses onto seasoned palm leaves with iron needles.",
    heroImage: "https://images.unsplash.com/photo-1609137144820-22e316d997cf?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 19.8876, lng: 86.0945 },
    heritageSitesCount: 6,
    craftsCount: 20,
    unescoSites: ["Konark Sun Temple"],
    iconicMonuments: [
      {
        id: "konark-sun-temple",
        name: "Konark Sun Temple (The Black Pagoda)",
        stateId: "odisha",
        stateName: "Odisha",
        periodEra: "1250 CE",
        dynasty: "Eastern Ganga Dynasty (King Narasimhadeva I)",
        architectureStyle: "Kalinga Deula Architecture",
        unescoStatus: true,
        description: "Conceived as a colossal 24-wheeled chariot of Surya the Sun God, pulled by 7 spirited galloping stone horses across the ocean horizon.",
        image: "https://images.unsplash.com/photo-1609137144820-22e316d997cf?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 19.8876, lng: 86.0945 },
        acousticOrAstronomicalSecrets: "Each of the 24 wheels acts as a precise sundial where the spoke shadows reveal the exact hour, minute, and lunar phase of the day.",
        audioNarrationScript: "Behold the grand chariot of Surya. 1200 sculptors worked for 12 years to raise this temple from the sea.",
        virtualTourHighlights: ["24 Carved Sun Dial Wheels", "7 Galloping Stone Steeds", "Nata Mandira Dancing Pavilion", "Monumental Gajasimha Sculptures"],
        historicalSignificance: "Pinnacle of medieval Kalinga temple engineering and maritime navigational landmark for ancient sailors.",
        tags: ["Sun", "Chariot", "UNESCO", "Kalinga"],
        nearestAirport: "Biju Patnaik International Airport Bhubaneswar (64 km)",
        nearestRailwayStation: "Puri Railway Station (35 km)"
      }
    ],
    craftsAndArts: [
      {
        id: "raghurajpur-pattachitra",
        name: "Raghurajpur Palm-Leaf Pattachitra (Tala Pattachitra)",
        stateId: "odisha",
        stateName: "Odisha",
        category: "Painting",
        giTagged: true,
        giYear: "2008",
        rawMaterials: ["Dried Palm leaves", "Iron stylus", "Conch shell powder", "Lampblack", "Hingula red stone"],
        ancientTechnique: "Palm leaves cured for months, etched with iron stylus needles, and rubbed with black bean paste to reveal microscopic lines of mythological epics.",
        historicalOriginEra: "Ancient temple ritual art dating back to 5th Century BCE Jagannath worship",
        description: "Hyper-detailed narrative scrolls of Dashavatara and Gita Govinda with delicate floral margins and 100% natural organic pigments.",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Chitrakar Heritage Village of Raghurajpur",
        howItsMadeSteps: [
          "Palm leaves stitched with thread into folding panels.",
          "Iron needle incises hair-thin outlines without breaking the leaf.",
          "Black soot rubbed over leaf to darken incisions.",
          "Natural conch and mineral colors applied."
        ]
      }
    ],
    dancesAndMusic: [
      {
        id: "odissi-dance",
        name: "Odissi",
        stateId: "odisha",
        stateName: "Odisha",
        type: "Classical Dance",
        description: "The oldest surviving classical dance form in India based on archaeological temple sculptures, renowned for the Tribhangi (three-bend posture) and fluid upper body waves.",
        costumeDetails: "Sambalpuri handloom silk saree, silver filigree belt (Bengapatia), and Tahia white flower crown made from reed pith.",
        instrumentsUsed: ["Mardala", "Bansuri", "Manjira", "Tanpura", "Sitar"],
        mudrasAndMovements: ["Tribhangi", "Chowka stance"],
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
        rhythmBeat: "Mardala rhythmic Bols based on Jayadeva's Gita Govinda ragas",
        originEra: "2200+ years old origins found in the Udayagiri & Khandagiri cave reliefs"
      }
    ],
    culinaryDelicacies: [
      {
        id: "chhena-poda-dalma",
        name: "Chhena Poda & Dalma",
        stateId: "odisha",
        stateName: "Odisha",
        type: "Sweet / Dessert",
        description: "Chhena Poda is the world's original baked cheesecake made of fresh cottage cheese kneaded with sugar, cardamom, and baked wrapped in Sal leaves until a golden crust forms.",
        keyIngredients: ["Fresh cow milk Chhena", "Sugar & Jaggery", "Green cardamom", "Ghee", "Sal leaves"],
        ayurvedicProperty: "Digestible protein, soothing to Pitta, providing instant energy.",
        historicalLore: "Invented by Sudarsana Sahu in Nayagarh and offered as part of Chhappan Bhog at Jagannath Temple, Puri.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    livingArtisans: [
      {
        id: "bhagawat-chitrakar",
        name: "Bhagawat Chitrakar",
        craftName: "Tala Pattachitra Palm Leaf Etcher",
        villageLocation: "Raghurajpur Heritage Crafts Village",
        stateName: "Odisha",
        experienceYears: 38,
        awards: "National Craft Award Winner",
        story: "Living in India's first heritage artisan village where every single house is an art studio, Bhagawat preserves the rare art of multi-layer folding palm-leaf murals.",
        avatar: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Microscopic engraving with single iron needle on palm leaves without sketching guidelines.",
        patronAction: "Support Raghurajpur Heritage Artisan Village"
      }
    ],
    ancientLegends: [
      {
        id: "legend-dharmapada-konark",
        title: "The Sacrifice of Dharmapada at Konark",
        stateName: "Odisha",
        category: "Legends",
        monumentOrEntity: "Konark Sun Temple",
        era: "1250 CE",
        shortTagline: "A 12-year-old boy's engineering genius and supreme devotion.",
        narrative: "When 1200 master craftsmen could not fix the final magnetic heavy crown stone atop the Konark Temple facing execution by sunset, a 12-year-old boy named Dharmapada climbed the spire and solved the engineering puzzle. To protect his father and fellow artisans from royal wrath, the noble boy leaped into the sea.",
        moralPhilosophicalCore: "Genius guided by supreme love, humility, and selfless devotion to community.",
        audioMinutes: 5,
        image: "https://images.unsplash.com/photo-1609137144820-22e316d997cf?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "kerala",
    name: "Kerala",
    code: "KL",
    zone: "South",
    capital: "Thiruvananthapuram",
    officialLanguages: ["Malayalam"],
    emblemTagline: "God's Own Country - Land of Kathakali & Spice Trails",
    description: "Palm-fringed backwaters, Cardamom Hills, thousand-year-old Ayurvedic healing, and the hypnotic drumming of Kathakali and Theyyam.",
    culturalEssence: "Where the Arabian Sea washes tranquil coconut backwaters, and Kathakali dancers bring ancient epics to life with the quiver of an eye and the thunder of Chenda drums.",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 9.9312, lng: 76.2673 },
    heritageSitesCount: 5,
    craftsCount: 18,
    unescoSites: ["Western Ghats", "Koodiyattam Sanskrit Theatre", "Mudiyettu"],
    iconicMonuments: [
      {
        id: "padmanabhaswamy-temple",
        name: "Sree Padmanabhaswamy Temple",
        stateId: "kerala",
        stateName: "Kerala",
        periodEra: "8th Century CE",
        dynasty: "Travancore Royal Dynasty",
        architectureStyle: "Chera & Dravidian Fusion Architecture",
        unescoStatus: false,
        description: "The world's richest spiritual repository featuring a 100-foot 7-tier Gopuram, a 365-pillar granite corridor, and the sanctum where Lord Vishnu reclines on serpent Anantha.",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 8.4831, lng: 76.9436 },
        acousticOrAstronomicalSecrets: "On both the vernal and autumnal equinoxes, the setting sun aligns directly through every one of the 5 windows in the massive 7-tier Gopuram at exact 5-minute intervals.",
        audioNarrationScript: "Approach the holy Padmatheertham tank. Inside lies the deity carved from 12,008 sacred Shaligrama stones brought from the Gandaki River in Nepal.",
        virtualTourHighlights: ["Ananthasayanam Reclining Sanctum", "365 Monolithic Granite Corridor", "Equinox Sun Alignment Gateway", "Ottakkal Mandapam Single Slab"],
        historicalSignificance: "Spiritual nucleus of Travancore where the Maharaja dedicated the entire kingdom to the deity as Padmanabha Dasa.",
        tags: ["Temple", "Travancore", "Equinox", "Granite"],
        nearestAirport: "Thiruvananthapuram International Airport (4 km)",
        nearestRailwayStation: "Thiruvananthapuram Central (1 km)"
      }
    ],
    craftsAndArts: [
      {
        id: "aranmula-kannadi",
        name: "Aranmula Kannadi (Front-Surface Metal Mirror)",
        stateId: "kerala",
        stateName: "Kerala",
        category: "Metalwork",
        giTagged: true,
        giYear: "2004",
        rawMaterials: ["Copper and Tin secret alloy ratio", "Jute polishing cloth", "Velvet"],
        ancientTechnique: "Front-surface reflection metal alloy mirror cast by a single family guild; unlike glass mirrors with secondary refraction, it produces zero optical distortion.",
        historicalOriginEra: "18th Century royal patronage at Aranmula Parthasarathy Temple",
        description: "Regarded as one of the 8 auspicious items (Ashtamangalya), polished for weeks with velvet to achieve reflective clarity superior to optical glass.",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Viswakarma Guild of Aranmula",
        howItsMadeSteps: [
          "Secret metallurgical ratio of copper and tin melted in clay crucibles.",
          "Cast into flat discs and cooled slowly.",
          "Hand-polished on wooden planks using jute cloth with burnt mud paste for 14 days.",
          "Fitted into ornate brass royal frames."
        ]
      }
    ],
    dancesAndMusic: [
      {
        id: "kathakali-dance",
        name: "Kathakali & Theyyam",
        stateId: "kerala",
        stateName: "Kerala",
        type: "Classical Dance",
        description: "A monumental dance-drama featuring elaborate facial makeup (Chutti), towering headdresses (Kireedam), and expressive eye movements (Navarasas) portraying heroic gods and demons.",
        costumeDetails: "Voluminous billowing white skirts, green Paccha face makeup for divine nobility, red Kathi for villains, and pure silver fingernails.",
        instrumentsUsed: ["Chenda", "Maddalam", "Chengila", "Elathalam"],
        mudrasAndMovements: ["24 Basic Root Mudras", "Rapid rhythmic eye ball rotations", "Stamping foot percussion"],
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
        rhythmBeat: "Complex Chenda Melam talas like Chempata and Adantha",
        originEra: "17th Century evolved from Kottarakkara Thampuran's Ramanattam"
      }
    ],
    culinaryDelicacies: [
      {
        id: "kerala-sadhya",
        name: "Kerala Traditional Onam Sadhya",
        stateId: "kerala",
        stateName: "Kerala",
        type: "Festive Feast",
        description: "A grand vegetarian feast of 26 distinct dishes served on a fresh plantain leaf, balancing all six tastes (Shadrasa) from sweet Payasam to tangy Rasam and bitter Pavakka.",
        keyIngredients: ["Kerala Red Matta rice", "Coconut oil", "Curry leaves", "Green cardamom & black pepper", "Jaggery Payasam"],
        ayurvedicProperty: "Complete digestive harmony balancing Vata, Pitta, and Kapha through sequential course intake.",
        historicalLore: "Celebrates the egalitarian golden rule of King Mahabali where all subjects were equal and prosperous.",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    livingArtisans: [
      {
        id: "gopakumar-aranmula",
        name: "A. Gopakumar Master",
        craftName: "Aranmula Metal Mirror Casting",
        villageLocation: "Aranmula, Pathanamthitta",
        stateName: "Kerala",
        experienceYears: 40,
        awards: "UNESCO Craft Laureate & National Award",
        story: "Preserving the secret 8-generation metallurgical formula of the world's only distortion-free front-surface reflective metal mirrors.",
        avatar: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Hand-polishing non-ferrous metal alloy with natural velvet and alluvial river clay.",
        patronAction: "Support Aranmula Viswakarma Heritage Trust"
      }
    ],
    ancientLegends: [
      {
        id: "legend-parasurama-kerala",
        title: "The Battle-Axe of Sage Parasurama",
        stateName: "Kerala",
        category: "Mythological Stories",
        monumentOrEntity: "Western Ghats & Coastline",
        era: "Puranic Antiquity",
        shortTagline: "The divine reclamation of lush coconut groves from the ocean.",
        narrative: "Seeking penance after his warrior campaigns, Sage Parasurama stood atop the Western Ghats and hurled his divine battle-axe into the southern seas. As the axe flew, the ocean retreated, gifting a lush fertile land of coconuts, rivers, and spices to humanity.",
        moralPhilosophicalCore: "Reclamation of ecological abundance through penance, sacred preservation, and harmony with water.",
        audioMinutes: 3,
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "gujarat",
    name: "Gujarat",
    code: "GJ",
    zone: "West",
    capital: "Gandhinagar",
    officialLanguages: ["Gujarati"],
    emblemTagline: "The Indus Valley, White Desert & Vibrant Garba",
    description: "Subterranean stepped splendor of Rani ki Vav, shimmering salt flats of Kutch, and 400-year-old castor oil Rogan art.",
    culturalEssence: "Where ancient Harappan port dockyards at Lothal meet the breathtaking inverted underground temple architecture of Rani ki Vav.",
    heroImage: "https://images.unsplash.com/photo-1599818985160-c40d6c8b9db8?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 23.2156, lng: 72.6369 },
    heritageSitesCount: 7,
    craftsCount: 26,
    unescoSites: ["Rani ki Vav", "Historic City of Ahmadabad", "Champaner-Pavagadh", "Dholavira"],
    iconicMonuments: [
      {
        id: "rani-ki-vav",
        name: "Rani ki Vav (The Queen's Stepwell)",
        stateId: "gujarat",
        stateName: "Gujarat",
        periodEra: "1063 CE",
        dynasty: "Chaulukya / Solanki Dynasty (Queen Udayamati)",
        architectureStyle: "Maru-Gurjara Inverted Temple Stepwell",
        unescoStatus: true,
        description: "An inverted subterranean temple designed as an ode to water, descending through 7 stepped tiers containing more than 800 masterfully sculpted panels of Lord Vishnu.",
        image: "https://images.unsplash.com/photo-1599818985160-c40d6c8b9db8?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 23.8589, lng: 72.1017 },
        acousticOrAstronomicalSecrets: "Natural geothermal cooling drops air temperatures 6 degrees Celsius per descending tier, protecting water purity from arid desert evaporation.",
        audioNarrationScript: "Descend into the earth. Queen Udayamati built this masterpiece downwards as a sanctuary for water.",
        virtualTourHighlights: ["7 Descending Sculpted Tiers", "Sheshashayi Vishnu Monolithic Relief", "Intricate Geometric Jaali Screens", "Deepest Cistern Reservoir"],
        historicalSignificance: "Supreme masterpiece of Indian subterranean water architecture and engineering.",
        tags: ["Stepwell", "UNESCO", "Solanki", "Water"],
        nearestAirport: "Sardar Vallabhbhai Patel International Airport Ahmedabad (125 km)",
        nearestRailwayStation: "Patan Railway Station (5 km)"
      }
    ],
    craftsAndArts: [
      {
        id: "rogan-art-kutch",
        name: "Rogan Art of Nirona",
        stateId: "gujarat",
        stateName: "Gujarat",
        category: "Painting",
        giTagged: true,
        giYear: "2024",
        rawMaterials: ["Castor seed oil boiled for 48 hours", "Natural mineral pigments", "Cast iron stylus"],
        ancientTechnique: "Boiled castor oil forms a stretchy residue; the artist rubs paint in their palm to create a pliable string that is drawn in mid-air on fabric without the metal needle ever touching the cloth.",
        historicalOriginEra: "400-year-old Persian art preserved exclusively in Nirona village, Kutch",
        description: "Intricate Tree of Life (Kalpavriksha) and floral motifs created in mid-air and mirrored by folding the fabric in half.",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Khatri Family of Nirona, Kutch",
        howItsMadeSteps: [
          "Castor oil boiled continuously for 48 hours until gelatinous paste forms.",
          "Colored with mineral pigments.",
          "Artisan rolls paint on palm using iron stylus, pulling paint into a thread.",
          "Fabric folded in half while wet to produce a flawless mirror image."
        ]
      }
    ],
    dancesAndMusic: [
      {
        id: "garba-dance",
        name: "Garba & Dandiya Raas",
        stateId: "gujarat",
        stateName: "Gujarat",
        type: "Folk Dance",
        description: "UNESCO Intangible Cultural Heritage circle dance celebrating the divine feminine Shakti during the 9 nights of Navaratri.",
        costumeDetails: "Chaniya Choli with mirror-work, Kedia jacket with shell fringes, and oxidised silver jewelry.",
        instrumentsUsed: ["Dhol", "Dholak", "Shehnai", "Dandiya sticks"],
        mudrasAndMovements: ["Be Taali", "Tran Taali", "Rapid circle spins around Garbha lamp"],
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
        rhythmBeat: "Rising crescendo from slow 4-beat Tala to lightning-fast Dandiya clacking",
        originEra: "Ancient Krishna Raas Leela tradition"
      }
    ],
    culinaryDelicacies: [
      {
        id: "gujarati-thali",
        name: "Royal Kathiyawadi & Gujarati Thali",
        stateId: "gujarat",
        stateName: "Gujarat",
        type: "Main Dish",
        description: "An elaborate feast featuring sweet-tangy Dal, Ringna No Oro (smoky roasted eggplant mash), Bajra No Rotlo with fresh white butter, and Khandvi.",
        keyIngredients: ["Pearl millet (Bajra)", "Sesame seeds", "Jaggery (Gor)", "Buttermilk (Chaas)", "Asafoetida & mustard seeds"],
        ayurvedicProperty: "High iron and fiber, cooling buttermilk balances digestive fire under intense dry heat.",
        historicalLore: "Reflects the Ahimsa principles of Jain and Vaishnava cultures prioritizing fresh farm produce.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    livingArtisans: [
      {
        id: "abdul-gafur-khatri",
        name: "Padma Shri Abdul Gafur Khatri",
        craftName: "Rogan Art Custodian",
        villageLocation: "Nirona Village, Kutch",
        stateName: "Gujarat",
        experienceYears: 46,
        awards: "Padma Shri & National Heritage Master",
        story: "Sole family preserving the 400-year-old castor oil Rogan art. Khatri gifted a Rogan 'Tree of Life' to the White House and trains young women across Kutch.",
        avatar: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Freehand drawing in mid-air using malleable heated castor oil thread and iron stylus.",
        patronAction: "Order Authenticated Kutch Rogan Masterpiece"
      }
    ],
    ancientLegends: [
      {
        id: "legend-lothal-maritime",
        title: "The Tidal Dockyard of Lothal",
        stateName: "Gujarat",
        category: "Historical Stories",
        monumentOrEntity: "Lothal Harappan Archaeological Site",
        era: "2400 BCE",
        shortTagline: "4,500 years of naval engineering and maritime civilization.",
        narrative: "4,500 years ago on the Gulf of Khambhat, Harappan naval engineers built the world's earliest known tidal dockyard equipped with sluice gates, lock systems, and bead workshops trading with Mesopotamia and ancient Egypt.",
        moralPhilosophicalCore: "Ancient India's pioneering mastery over hydraulic science, global trade, and peaceful civic urbanism.",
        audioMinutes: 4,
        image: "https://images.unsplash.com/photo-1599818985160-c40d6c8b9db8?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    code: "UP",
    zone: "North",
    capital: "Lucknow",
    officialLanguages: ["Hindi", "Urdu"],
    emblemTagline: "Heart of the Ganga, Avadh Elegance & Classical Kathak",
    description: "Varanasi's eternal ghats, pristine white marble symmetry of the Taj Mahal, and refined culinary poetry of Lucknow.",
    culturalEssence: "The spiritual riverbank of the sacred Ganga, home to the world's oldest living city of Varanasi and exquisite Chikankari shadow-work embroidery.",
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 27.1751, lng: 78.0421 },
    heritageSitesCount: 12,
    craftsCount: 30,
    unescoSites: ["Taj Mahal, Agra", "Agra Fort", "Fatehpur Sikri"],
    iconicMonuments: [
      {
        id: "taj-mahal",
        name: "Taj Mahal (The Crown Palace)",
        stateId: "uttar-pradesh",
        stateName: "Uttar Pradesh",
        periodEra: "1632-1653 CE",
        dynasty: "Mughal Empire (Emperor Shah Jahan)",
        architectureStyle: "Indo-Islamic Symmetrical Marble Architecture",
        unescoStatus: true,
        description: "An ivory-white Makrana marble mausoleum set in formal Charbagh gardens, inlaid with 28 varieties of semi-precious stones (Pietra Dura).",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 27.1751, lng: 78.0421 },
        acousticOrAstronomicalSecrets: "The 4 minarets are tilted slightly outwards by 3 degrees so that in an earthquake they fall away from the central dome.",
        audioNarrationScript: "Look upon the Taj Mahal at dawn. Translucent Makrana marble shifts from soft rose to pearlescent white.",
        virtualTourHighlights: ["Pietra Dura Marble Floral Inlay", "Central Octagonal Cenotaph Screen", "Charbagh Paradise Garden Pools"],
        historicalSignificance: "Universally admired masterpiece of world heritage celebrating eternal devotion and architectural harmony.",
        tags: ["Wonder of World", "Marble", "UNESCO", "Mughal"],
        nearestAirport: "Agra Airport / Delhi IGI Airport (200 km)",
        nearestRailwayStation: "Agra Cantt Railway Station (5 km)"
      }
    ],
    craftsAndArts: [
      {
        id: "banarasi-brocade-silk",
        name: "Banarasi Katan & Zari Brocade",
        stateId: "uttar-pradesh",
        stateName: "Uttar Pradesh",
        category: "Textile",
        giTagged: true,
        giYear: "2009",
        rawMaterials: ["Pure Katan silk", "Gold and Silver electroplated Zari", "Hand-punched Naksha drawloom cards"],
        ancientTechnique: "Kadwa brocading technique where gold zari threads are hand-inserted into the weave to create raised floral bouquets.",
        historicalOriginEra: "Referenced in Buddhist Jataka tales and Mughal court chronicles",
        description: "Opulent royal sarees woven with Mughal motifs like Kalga, Bel, and Jhallar.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Banarasi Ansari Weaver Guilds",
        howItsMadeSteps: [
          "Design plotted on graph paper and transferred onto punched cards.",
          "Weaver operates pedals while throwing gold zari shuttle.",
          "Woven at a pace of 2 to 4 inches per day."
        ]
      }
    ],
    dancesAndMusic: [
      {
        id: "kathak-dance",
        name: "Kathak (Lucknow & Benares Gharana)",
        stateId: "uttar-pradesh",
        stateName: "Uttar Pradesh",
        type: "Classical Dance",
        description: "Derived from 'Katha' (storytelling), famed for lightning-fast footwork (Tatkar), graceful spins (Chakkars), and delicate mime (Bhav).",
        costumeDetails: "Anarkali flowing angarkha with churidar and 200 brass Ghungroos tied to each ankle.",
        instrumentsUsed: ["Tabla", "Sarangi", "Pakhawaj", "Harmonium"],
        mudrasAndMovements: ["Tatkar footwork", "Chakkar 27-spin pirouettes", "Gat Bhav mime"],
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
        rhythmBeat: "Teentaal (16 beats) with intricate Tihai endings stopping on the Sam",
        originEra: "Ancient temple Kathakars transformed in Avadh court"
      }
    ],
    culinaryDelicacies: [
      {
        id: "avadhi-dum-biryani",
        name: "Avadhi Dum Biryani & Galouti Delights",
        stateId: "uttar-pradesh",
        stateName: "Uttar Pradesh",
        type: "Main Dish",
        description: "Aromatic Basmati rice slow-cooked (Dum Pukht) in dough-sealed handis over charcoal embers, perfumed with saffron and screwpine water (Kewra).",
        keyIngredients: ["Aged Basmati", "Saffron", "Kewra water", "Mace & Nutmeg", "Ghee"],
        ayurvedicProperty: "Slow sealed steaming preserves aromatic essential oils and ensures light digestion.",
        historicalLore: "Invented during Nawab Asaf-ud-Daula's reign to feed workers building the Bara Imambara during famine.",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    livingArtisans: [
      {
        id: "haji-munna-ansari",
        name: "Haji Munna Ansari",
        craftName: "Banarasi Kadwa Brocade Master",
        villageLocation: "Pili Kothi, Varanasi",
        stateName: "Uttar Pradesh",
        experienceYears: 52,
        awards: "Sant Kabir National Award",
        story: "Preserving 300-year-old wooden handlooms, Master Ansari weaves heirloom bridal sarees using 100% real silver-gilt Zari.",
        avatar: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Kadwa manual pick-weaving where each floral motif is individually locked by hand.",
        patronAction: "Order Directly from Varanasi Master Weavers Guild"
      }
    ],
    ancientLegends: [
      {
        id: "legend-kashi-shiva-trishul",
        title: "The City Balanced on Shiva's Trident",
        stateName: "Uttar Pradesh",
        category: "Mythological Stories",
        monumentOrEntity: "Varanasi (Kashi)",
        era: "Vedic Eternity",
        shortTagline: "The eternal city of light transcending cosmic time.",
        narrative: "Ancient scriptures say Kashi is not situated on the physical earth, but rests on the tip of Lord Shiva's trident. When the cosmic deluge dissolves the mortal realm, Kashi remains luminous as the eternal city of light and liberation (Moksha).",
        moralPhilosophicalCore: "Inner light transcends cosmic destruction; truth and spiritual wisdom are eternal.",
        audioMinutes: 4,
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "assam",
    name: "Assam",
    code: "AS",
    zone: "North-East",
    capital: "Dispur",
    officialLanguages: ["Assamese", "Bodo"],
    emblemTagline: "The Land of the Red River & Golden Muga Silk",
    description: "Lush tea gardens along the mighty Brahmaputra river, ancient Kamakhya Shakti shrines, and natural golden Muga silk.",
    culturalEssence: "The gateway to the North-East where the golden threads of Muga wild silk outlive generations and the joyful rhythms of Rongali Bihu celebrate harvest renewal.",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 26.2006, lng: 92.9376 },
    heritageSitesCount: 4,
    craftsCount: 16,
    unescoSites: ["Kaziranga National Park", "Manas Wildlife Sanctuary"],
    iconicMonuments: [
      {
        id: "kamakhya-temple",
        name: "Kamakhya Temple, Nilachal Hills",
        stateId: "assam",
        stateName: "Assam",
        periodEra: "8th-16th Century CE",
        dynasty: "Koch Dynasty",
        architectureStyle: "Nilachal Hybrid Shikhara Architecture",
        unescoStatus: false,
        description: "One of the oldest of the 51 Shakti Peethas perched on Nilachal Hill, featuring a beehive-shaped Shikhara and subterranean natural spring cave.",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80",
        coordinates: { lat: 26.1664, lng: 91.7054 },
        acousticOrAstronomicalSecrets: "The inner sanctum is a natural rock cave containing a subterranean perennial water spring.",
        audioNarrationScript: "Ascend the ancient stone steps of Nilachal Hill overlooking the Brahmaputra. Kamakhya celebrates the primordial creative energy of Mother Earth.",
        virtualTourHighlights: ["Beehive Nilachal Shikhara", "Subterranean Natural Spring Cave", "Carved Ganesha Reliefs", "Brahmaputra Viewpoint"],
        historicalSignificance: "The foremost center of Tantric philosophy and ancient Shakti worship in Eastern India.",
        tags: ["Shakti", "Assam", "Cave"],
        nearestAirport: "Lokpriya Gopinath Bordoloi International Airport Guwahati (18 km)",
        nearestRailwayStation: "Guwahati Railway Station (6 km)"
      }
    ],
    craftsAndArts: [
      {
        id: "muga-silk-sualkuchi",
        name: "Sualkuchi Golden Muga Silk",
        stateId: "assam",
        stateName: "Assam",
        category: "Textile",
        giTagged: true,
        giYear: "2007",
        rawMaterials: ["Wild silkworm cocoons", "Som tree foliage", "Natural bamboo looms"],
        ancientTechnique: "The world's only naturally golden-hued wild silk; the fiber is so durable that its golden luster increases with every wash, outliving the wearer.",
        historicalOriginEra: "Patronized by the Ahom Dynasty for 600 years",
        description: "Used to weave the traditional two-piece Mekhela Chador with geometric Kingkhap (royal twin lion) motifs in red and green.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
        artisanCommunity: "Weaving village of Sualkuchi",
        howItsMadeSteps: [
          "Wild Muga caterpillars feed on Som trees.",
          "Cocoons boiled in alkaline bath to extract continuous natural golden filament.",
          "Woven on traditional throw-shuttle looms."
        ]
      }
    ],
    dancesAndMusic: [
      {
        id: "bihu-dance",
        name: "Rongali Bihu & Sattriya Dance",
        stateId: "assam",
        stateName: "Assam",
        type: "Folk Dance",
        description: "Bihu is an exuberant spring harvest dance of rapid hand movements and swaying hips. Sattriya is a classical monastic dance drama created in the 15th century.",
        costumeDetails: "Muga silk Mekhela Chador with red floral borders, Kopou Phool orchid in hair.",
        instrumentsUsed: ["Dhol", "Pepa (Buffalo horn flute)", "Gogona", "Toka", "Khol"],
        mudrasAndMovements: ["Rapid wrist flips", "Swaying hip rhythm", "Jumping knee bounces"],
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
        rhythmBeat: "Infectious Dhol rhythm matching the high-pitched Pepa horn",
        originEra: "Ancient agrarian spring festival celebrating nature's rejuvenation"
      }
    ],
    culinaryDelicacies: [
      {
        id: "masor-tenga-pitha",
        name: "Kaji Nemu Masor Tenga & Til Pitha",
        stateId: "assam",
        stateName: "Assam",
        type: "Main Dish",
        description: "A refreshing, light tangy fish broth infused with GI-tagged Kaji Nemu (Assam lemon), accompanied by crisp roasted sesame rice rolls (Til Pitha).",
        keyIngredients: ["Fresh river fish", "Kaji Nemu (Assam lemon juice & zest)", "Mustard oil", "Fenugreek seeds", "Bora Saul sticky rice"],
        ayurvedicProperty: "Cooling, rich in Vitamin C, digestive appetizer ideal for tropical humid river valleys.",
        historicalLore: "Traditional staple of riverine communities using zero heavy spices.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    livingArtisans: [
      {
        id: "hemprabha-deori",
        name: "Hemprabha Deori",
        craftName: "Muga Silk Master Weaver",
        villageLocation: "Sualkuchi",
        stateName: "Assam",
        experienceYears: 34,
        awards: "National Handloom Award",
        story: "Weaving intricate traditional Kingkhap motifs on natural golden Muga silk, supporting 50 rural women weavers in Sualkuchi.",
        avatar: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
        specialTechnique: "Hand-carding wild silk filaments and shuttle-weaving without chemical bleaches.",
        patronAction: "Support Assam Wild Silk Weavers Guild"
      }
    ],
    ancientLegends: [
      {
        id: "legend-brahmaputra-son-of-brahma",
        title: "The Mighty Brahmaputra - Son of Brahma",
        stateName: "Assam",
        category: "Mythological Stories",
        monumentOrEntity: "Brahmaputra River (Lohit)",
        era: "Puranic Antiquity",
        shortTagline: "The untamed masculine river deity born from celestial springs.",
        narrative: "Unlike almost all other Indian rivers which are feminine deities (Ganga, Yamuna, Kaveri), the mighty Brahmaputra is revered as a masculine force (Nada)—the divine son born from Brahma's creative thought and the sacred spring of Brahmakund.",
        moralPhilosophicalCore: "Reverence for the raw, untamed forces of nature that give life to civilizational valleys.",
        audioMinutes: 3,
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  }
];

export const statesData = indianStatesData;
