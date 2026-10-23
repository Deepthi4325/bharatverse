export interface UnescoSite {
  id: string;
  name: string;
  stateName: string;
  periodEra: string;
  dynasty: string;
  description: string;
  image: string;
  unescoStatus: boolean;
}

export const unescoSites: UnescoSite[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    stateName: "Uttar Pradesh",
    periodEra: "17th Century",
    dynasty: "Mughal Empire",
    description:
      "An ivory-white marble mausoleum in Agra, built by Emperor Shah Jahan as a symbol of eternal love.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar and its Monuments",
    stateName: "Delhi",
    periodEra: "13th Century",
    dynasty: "Delhi Sultanate",
    description:
      "A magnificent complex featuring the tallest brick minaret in the world and remarkable Indo-Islamic architecture.",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "red-fort",
    name: "Red Fort Complex",
    stateName: "Delhi",
    periodEra: "17th Century",
    dynasty: "Mughal Empire",
    description:
      "A monumental red sandstone fort built by Emperor Shah Jahan, representing the grandeur of Mughal architecture.",
    image:
      "https://images.unsplash.com/photo-1585136919277-6d49f8f2a2e5?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    stateName: "Maharashtra",
    periodEra: "2nd Century BCE – 6th Century CE",
    dynasty: "Satavahana & Vakataka",
    description:
      "Ancient Buddhist rock-cut caves famous for their magnificent paintings, sculptures and architectural excellence.",
    image:
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "ellora-caves",
    name: "Ellora Caves",
    stateName: "Maharashtra",
    periodEra: "6th – 10th Century",
    dynasty: "Rashtrakuta",
    description:
      "A spectacular complex of Buddhist, Hindu and Jain rock-cut temples representing religious harmony.",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacde6976540?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "agra-fort",
    name: "Agra Fort",
    stateName: "Uttar Pradesh",
    periodEra: "16th Century",
    dynasty: "Mughal Empire",
    description:
      "A powerful Mughal fortress built primarily from red sandstone along the banks of the Yamuna River.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "fatehpur-sikri",
    name: "Fatehpur Sikri",
    stateName: "Uttar Pradesh",
    periodEra: "16th Century",
    dynasty: "Mughal Empire",
    description:
      "A beautifully preserved Mughal city built by Emperor Akbar and known for its grand palaces and mosques.",
    image:
      "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "konark-sun-temple",
    name: "Sun Temple, Konark",
    stateName: "Odisha",
    periodEra: "13th Century",
    dynasty: "Eastern Ganga Dynasty",
    description:
      "A monumental stone temple designed as a colossal chariot dedicated to Surya, the Sun God.",
    image:
      "https://images.unsplash.com/photo-1599661046289-e9e2d0a6a7e5?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "mahabalipuram",
    name: "Group of Monuments at Mahabalipuram",
    stateName: "Tamil Nadu",
    periodEra: "7th – 8th Century",
    dynasty: "Pallava Dynasty",
    description:
      "A remarkable collection of rock-cut temples and monuments showcasing early Dravidian architecture.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "brihadeeswara-temple",
    name: "Great Living Chola Temples",
    stateName: "Tamil Nadu",
    periodEra: "11th Century",
    dynasty: "Chola Dynasty",
    description:
      "Magnificent Dravidian temples celebrated for their towering vimanas and extraordinary Chola architecture.",
    image:
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "churches-goa",
    name: "Churches and Convents of Goa",
    stateName: "Goa",
    periodEra: "16th – 17th Century",
    dynasty: "Portuguese Colonial Era",
    description:
      "Historic churches and convents representing the influence of Portuguese architecture and Christianity in India.",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "khajuraho",
    name: "Khajuraho Group of Monuments",
    stateName: "Madhya Pradesh",
    periodEra: "10th – 12th Century",
    dynasty: "Chandela Dynasty",
    description:
      "A famous group of Hindu and Jain temples renowned for intricate sculptures and artistic expression.",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacde6976540?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "hampi",
    name: "Group of Monuments at Hampi",
    stateName: "Karnataka",
    periodEra: "14th – 16th Century",
    dynasty: "Vijayanagara Empire",
    description:
      "The magnificent ruins of the Vijayanagara Empire surrounded by dramatic boulder-strewn landscapes.",
    image:
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "pattadakal",
    name: "Group of Monuments at Pattadakal",
    stateName: "Karnataka",
    periodEra: "7th – 8th Century",
    dynasty: "Chalukya Dynasty",
    description:
      "A historic complex where northern and southern Indian temple architectural styles beautifully converge.",
    image:
      "https://images.unsplash.com/photo-1600100397608-f010bc3c1f48?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "sanchi",
    name: "Buddhist Monuments at Sanchi",
    stateName: "Madhya Pradesh",
    periodEra: "3rd Century BCE",
    dynasty: "Maurya Empire",
    description:
      "One of India's oldest Buddhist sanctuaries featuring the iconic Great Stupa commissioned by Emperor Ashoka.",
    image:
      "https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "elephanta-caves",
    name: "Elephanta Caves",
    stateName: "Maharashtra",
    periodEra: "5th – 8th Century",
    dynasty: "Early Medieval India",
    description:
      "Rock-cut cave temples dedicated primarily to Lord Shiva and famous for the magnificent Trimurti sculpture.",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacde6976540?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "humayuns-tomb",
    name: "Humayun's Tomb",
    stateName: "Delhi",
    periodEra: "16th Century",
    dynasty: "Mughal Empire",
    description:
      "A grand garden tomb that became a major architectural inspiration for later Mughal monuments.",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "mountain-railways",
    name: "Mountain Railways of India",
    stateName: "West Bengal",
    periodEra: "19th Century",
    dynasty: "British Colonial Era",
    description:
      "Historic mountain railway systems that demonstrate remarkable engineering achievements in difficult terrain.",
    image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "nalanda",
    name: "Archaeological Site of Nalanda Mahavihara",
    stateName: "Bihar",
    periodEra: "5th – 13th Century",
    dynasty: "Gupta & Pala Period",
    description:
      "The remains of one of the world's earliest great universities and a major centre of Buddhist learning.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "jaipur-city",
    name: "Jaipur City",
    stateName: "Rajasthan",
    periodEra: "18th Century",
    dynasty: "Kachwaha Rajput",
    description:
      "The historic planned city known as the Pink City, combining Rajput architecture with sophisticated urban planning.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "champaner",
    name: "Champaner-Pavagadh Archaeological Park",
    stateName: "Gujarat",
    periodEra: "8th – 16th Century",
    dynasty: "Chaulukya & Gujarat Sultanate",
    description:
      "An extraordinary archaeological landscape featuring forts, palaces, mosques and ancient settlements.",
    image:
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "rani-ki-vav",
    name: "Rani-ki-Vav",
    stateName: "Gujarat",
    periodEra: "11th Century",
    dynasty: "Solanki Dynasty",
    description:
      "An intricately designed stepwell featuring hundreds of exquisite sculptures and architectural details.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "victorian-mumbai",
    name: "Victorian Gothic and Art Deco Ensembles of Mumbai",
    stateName: "Maharashtra",
    periodEra: "19th – 20th Century",
    dynasty: "Colonial & Modern Era",
    description:
      "A remarkable urban collection showcasing Victorian Gothic and Art Deco architectural styles.",
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "kakatiya-rudreshwara",
    name: "Kakatiya Rudreshwara Temple",
    stateName: "Telangana",
    periodEra: "13th Century",
    dynasty: "Kakatiya Dynasty",
    description:
      "Also known as Ramappa Temple, this masterpiece is celebrated for its intricate carvings and engineering brilliance.",
    image:
      "https://images.unsplash.com/photo-1600100397608-f010bc3c1f48?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "dholavira",
    name: "Dholavira: A Harappan City",
    stateName: "Gujarat",
    periodEra: "3000 – 1500 BCE",
    dynasty: "Indus Valley Civilization",
    description:
      "An exceptionally preserved Harappan city demonstrating advanced urban planning and water management.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "santiniketan",
    name: "Santiniketan",
    stateName: "West Bengal",
    periodEra: "19th – 20th Century",
    dynasty: "Modern India",
    description:
      "The cultural and educational centre founded by Rabindranath Tagore, known for its unique philosophy of learning.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "sacred-ensembles-hoysalas",
    name: "Sacred Ensembles of the Hoysalas",
    stateName: "Karnataka",
    periodEra: "12th – 13th Century",
    dynasty: "Hoysala Empire",
    description:
      "Exquisite temples celebrated for their star-shaped plans, intricate carvings and remarkable craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1600100397608-f010bc3c1f48?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "moidams",
    name: "Moidams – Mound-Burial System of the Ahom Dynasty",
    stateName: "Assam",
    periodEra: "13th – 19th Century",
    dynasty: "Ahom Dynasty",
    description:
      "Sacred burial mounds reflecting the funerary traditions and cultural heritage of the Ahom civilization.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "maratha-military-landscapes",
    name: "Maratha Military Landscapes of India",
    stateName: "Maharashtra",
    periodEra: "17th – 19th Century",
    dynasty: "Maratha Empire",
    description:
      "A network of strategically designed forts that demonstrate the military architecture and landscape planning of the Marathas.",
    image:
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
    {
    id: "mahabodhi-temple",
    name: "Mahabodhi Temple Complex at Bodh Gaya",
    stateName: "Bihar",
    periodEra: "3rd Century BCE – Present",
    dynasty: "Mauryan & Later Periods",
    description:
      "One of Buddhism's holiest sites, marking the place where Gautama Buddha is believed to have attained enlightenment.",
    image:
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "bhimbetka-rock-shelters",
    name: "Rock Shelters of Bhimbetka",
    stateName: "Madhya Pradesh",
    periodEra: "Prehistoric Period",
    dynasty: "Prehistoric Civilization",
    description:
      "A remarkable collection of prehistoric rock shelters containing some of India's earliest traces of human life and ancient cave paintings.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "chhatrapati-shivaji-terminus",
    name: "Chhatrapati Shivaji Terminus",
    stateName: "Maharashtra",
    periodEra: "19th Century",
    dynasty: "British Colonial Era",
    description:
      "A magnificent historic railway terminus in Mumbai combining Victorian Gothic Revival architecture with traditional Indian influences.",
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "jantar-mantar-jaipur",
    name: "The Jantar Mantar, Jaipur",
    stateName: "Rajasthan",
    periodEra: "18th Century",
    dynasty: "Kachwaha Rajput",
    description:
      "A monumental astronomical observatory featuring the world's largest stone sundial and remarkable scientific instruments.",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacde6976540?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "hill-forts-rajasthan",
    name: "Hill Forts of Rajasthan",
    stateName: "Rajasthan",
    periodEra: "8th – 18th Century",
    dynasty: "Rajput Kingdoms",
    description:
      "A series of majestic Rajput forts built across the hills of Rajasthan, representing centuries of military architecture and royal power.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "historic-city-ahmedabad",
    name: "Historic City of Ahmedabad",
    stateName: "Gujarat",
    periodEra: "15th Century",
    dynasty: "Gujarat Sultanate",
    description:
      "India's first UNESCO-listed historic city, celebrated for its fortified architecture, traditional houses, mosques and vibrant urban heritage.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "le-corbusier-chandigarh",
    name: "The Architectural Work of Le Corbusier",
    stateName: "Chandigarh",
    periodEra: "20th Century",
    dynasty: "Modern India",
    description:
      "A collection of modern architectural works including the Capitol Complex of Chandigarh, representing a landmark contribution to modern architecture.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
  {
    id: "ancient-buddhist-site-sarnath",
    name: "Ancient Buddhist Site of Sarnath",
    stateName: "Uttar Pradesh",
    periodEra: "3rd Century BCE – Present",
    dynasty: "Mauryan & Gupta Periods",
    description:
      "An important Buddhist pilgrimage site where Gautama Buddha delivered his first sermon, featuring ancient stupas, monasteries and sacred monuments.",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacde6976540?auto=format&fit=crop&w=1200&q=85",
    unescoStatus: true,
  },
];
