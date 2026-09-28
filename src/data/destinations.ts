import { DestinationInfo, IndiaRegion } from '../types';

export interface StateGroupInfo {
  id: string;
  name: string;
  shortCode: string;
  emoji: string;
  tagline: string;
  description: string;
  region: IndiaRegion;
  circuitCategory: 'High Alpine & Snow' | 'Spiritual & Yatras' | 'Coastal & Backwaters' | 'Royal Heritage & Desert' | 'International Wonders';
  highlightText: string;
  bgGradient: string;
  badgeColor: string;
}

export const STATE_GROUPS: StateGroupInfo[] = [
  {
    id: 'state-hp',
    name: 'Himachal Pradesh',
    shortCode: 'HP',
    emoji: '🏔️',
    tagline: 'Devbhoomi & High Alpine Valleys',
    description: 'Snow-clad Himalayan passes, pine-covered Parvati valley, cold desert monasteries of Spiti, and riverside chalets in Jibhi & Manali.',
    region: 'North India',
    circuitCategory: 'High Alpine & Snow',
    highlightText: 'Spiti, Manali, Kasol, Jibhi & Dharamshala',
    bgGradient: 'from-sky-900/90 via-slate-900 to-slate-950',
    badgeColor: 'bg-[#1698B4]'
  },
  {
    id: 'state-uk',
    name: 'Uttarakhand',
    shortCode: 'UK',
    emoji: '🕉️',
    tagline: 'Land of the Gods & Glacial Trails',
    description: 'Holiest Char Dham & Kedarnath shrines, UNESCO floral meadows in Valley of Flowers, Tungnath highest Shiva temple, and snow summit treks.',
    region: 'North India',
    circuitCategory: 'Spiritual & Yatras',
    highlightText: 'Kedarnath, Valley of Flowers, Char Dham, Chopta & Kedarkantha',
    bgGradient: 'from-amber-950/90 via-slate-900 to-slate-950',
    badgeColor: 'bg-[#FF7A00]'
  },
  {
    id: 'state-ladakh',
    name: 'Ladakh (UT)',
    shortCode: 'LA',
    emoji: '❄️',
    tagline: 'Land of High Mountain Passes',
    description: 'Dramatic high-altitude moonscape, turquoise Pangong Tso lake, double-humped camel dunes in Nubra, and world-famous Khardung La pass.',
    region: 'North India',
    circuitCategory: 'High Alpine & Snow',
    highlightText: 'Leh, Pangong Tso, Nubra Valley & Khardung La (17,982 ft)',
    bgGradient: 'from-blue-950/90 via-slate-900 to-slate-950',
    badgeColor: 'bg-indigo-600'
  },
  {
    id: 'state-jk',
    name: 'Jammu & Kashmir',
    shortCode: 'JK',
    emoji: '🌸',
    tagline: 'Paradise on Earth',
    description: 'Iconic Dal Lake wooden houseboats and Shikaras, Gulmarg world-class snow gondola rides, Betaab valley, and scenic Sonmarg glaciers.',
    region: 'North India',
    circuitCategory: 'High Alpine & Snow',
    highlightText: 'Srinagar, Gulmarg Gondola, Pahalgam & Sonmarg',
    bgGradient: 'from-teal-950/90 via-slate-900 to-slate-950',
    badgeColor: 'bg-teal-600'
  },
  {
    id: 'state-rajasthan',
    name: 'Rajasthan',
    shortCode: 'RJ',
    emoji: '🏰',
    tagline: 'Land of Maharajas, Palaces & Desert Dunes',
    description: 'Romantic royal lakes in Udaipur, sacred ghats & camel safaris in Pushkar, golden sandstone fort & dunes in Jaisalmer, and vibrant Pink City forts in Jaipur.',
    region: 'West India',
    circuitCategory: 'Royal Heritage & Desert',
    highlightText: 'Udaipur (₹8,000), Pushkar (₹7,000), Jaisalmer (₹10,000) & Jaipur (₹7,500)',
    bgGradient: 'from-amber-950/90 via-slate-900 to-slate-950',
    badgeColor: 'bg-amber-600'
  },
  {
    id: 'state-kerala',
    name: 'Kerala',
    shortCode: 'KL',
    emoji: '🌴',
    tagline: 'God’s Own Country',
    description: 'Emerald tea plantations of Munnar, tranquil palm-shaded backwaters of Alleppey with luxury houseboats, and aromatic spice hill trails.',
    region: 'South India',
    circuitCategory: 'Coastal & Backwaters',
    highlightText: 'Munnar, Alleppey Houseboats, Thekkady & Cochin',
    bgGradient: 'from-emerald-950/90 via-slate-900 to-slate-950',
    badgeColor: 'bg-emerald-600'
  },
  {
    id: 'state-goa',
    name: 'Goa',
    shortCode: 'GA',
    emoji: '🏖️',
    tagline: 'Sun, Sand & Coastal Adventures',
    description: 'Golden sandy beaches of North & South Goa, historic Portuguese forts, Mandovi sunset cruises, and water sports adventures.',
    region: 'West India',
    circuitCategory: 'Coastal & Backwaters',
    highlightText: 'Baga, Calangute, Aguada Fort & Mandovi Cruises',
    bgGradient: 'from-orange-950/90 via-slate-900 to-slate-950',
    badgeColor: 'bg-[#FF7A00]'
  },
  {
    id: 'state-intl',
    name: 'International Destinations',
    shortCode: 'INT',
    emoji: '🌏',
    tagline: 'Exotic Global Holidays',
    description: 'Ba Na Hills Golden Hands in Vietnam, tropical coral beaches of Thailand, clifftop sunset temples of Bali, and Tiger’s Nest in Bhutan.',
    region: 'International Special',
    circuitCategory: 'International Wonders',
    highlightText: 'Vietnam, Thailand, Bali (Indonesia) & Bhutan',
    bgGradient: 'from-violet-950/90 via-slate-900 to-slate-950',
    badgeColor: 'bg-violet-600'
  }
];

export const LOCATION_CIRCUITS = [
  {
    id: 'circuit-all',
    name: 'All Locations & States',
    icon: '🗺️',
    description: 'Browse complete collection across India and abroad'
  },
  {
    id: 'circuit-alpine',
    name: 'High Alpine & Snow Circuits',
    icon: '🏔️',
    description: 'Himachal Pradesh, Ladakh & Jammu Kashmir'
  },
  {
    id: 'circuit-spiritual',
    name: 'Spiritual Devbhoomi & Yatras',
    icon: '🕉️',
    description: 'Uttarakhand Char Dham, Kedarnath & Himalayan Summits'
  },
  {
    id: 'circuit-coastal',
    name: 'Tropical Beaches & Backwaters',
    icon: '🌴',
    description: 'Kerala Houseboats & Goa Coastal Escapes'
  },
  {
    id: 'circuit-heritage',
    name: 'Royal Heritage & Desert Dunes',
    icon: '🏰',
    description: 'Rajasthan: Udaipur, Pushkar, Jaisalmer & Jaipur'
  },
  {
    id: 'circuit-intl',
    name: 'International Wonders',
    icon: '🌏',
    description: 'Vietnam, Thailand, Bali & Bhutan'
  }
];

export const DOMESTIC_REGIONS: IndiaRegion[] = [
  'North India',
  'South India',
  'West India',
  'East India',
  'North-East India',
  'Central India',
  'Islands & Beaches',
  'International Special'
];

export const HOLIDAY_THEMES = [
  'Honeymoon',
  'Family Special',
  'Snow & Mountain',
  'Trekking & Adventure',
  'Spiritual & Yatra',
  'Beach & Coastal',
  'Royal Heritage',
  'International Getaway'
];

export const DOMESTIC_DESTINATIONS: DestinationInfo[] = [
  {
    id: 'dest-spiti',
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    tag: 'Middle Land of Monasteries',
    packagesCount: 6,
    startingPrice: 20000,
    bestSeason: 'May - Oct',
    avgTemp: '5°C - 18°C',
    topAttractions: ['Key Monastery', 'Chandratal Lake', 'Hikkim Highest Post Office', 'Kaza & Pin Valley'],
    description: 'High-altitude cold mountain desert with 1000-year-old cliffside monasteries, fossil villages, and milky way skies.'
  },
  // Ladakh UT Destinations
  {
    id: 'dest-ladakh',
    name: 'Leh & Khardung La Pass',
    state: 'Ladakh',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tag: 'Land of High Mountain Passes',
    packagesCount: 12,
    startingPrice: 35000,
    bestSeason: 'May - Oct',
    avgTemp: '8°C - 18°C',
    topAttractions: ['Khardung La Pass 17,982 ft', 'Leh Palace & Shanti Stupa', 'Magnetic Hill', 'Sangam Indus-Zanskar'],
    description: 'Ancient royal capital of Ladakh with dramatic mountain vistas, Buddhist stupas, Tibetan monasteries, and the world’s highest motorable pass.'
  },
  {
    id: 'dest-nubra-turtuk',
    name: 'Nubra Valley & Turtuk',
    state: 'Ladakh',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    tag: 'Cold Desert Dunes & Silk Route',
    packagesCount: 8,
    startingPrice: 28000,
    bestSeason: 'May - Oct',
    avgTemp: '10°C - 22°C',
    topAttractions: ['Hunder White Sand Dunes', 'Double-Humped Bactrian Camels', 'Diskit 100ft Buddha', 'Turtuk Border Village'],
    description: 'Enchanting valley of flowers in the high mountains with double-humped camel rides on sand dunes and historic Baltic villages on the Indo-Pak border.'
  },
  {
    id: 'dest-pangong-tso',
    name: 'Pangong Tso & Hanle',
    state: 'Ladakh',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tag: 'Changing Color Glacial Lake & Stargazing',
    packagesCount: 10,
    startingPrice: 32000,
    bestSeason: 'May - Oct',
    avgTemp: '2°C - 15°C',
    topAttractions: ['Pangong Tso Lake (4350m)', 'Hanle Dark Sky Sanctuary', 'Chang La Pass 17,590 ft', 'Tso Moriri High Lake'],
    description: 'World-famous 134km long transboundary saltwater lake that changes shades from turquoise to cobalt blue, plus world-class dark-sky stargazing.'
  },
  {
    id: 'dest-chardham',
    name: 'Char Dham Yatra',
    state: 'Uttarakhand',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    tag: 'Moksha Pilgrimage Circuit',
    packagesCount: 8,
    startingPrice: 23500,
    bestSeason: 'May - Jun & Sep - Nov',
    avgTemp: '8°C - 20°C',
    topAttractions: ['Yamunotri', 'Gangotri', 'Kedarnath Jyotirlinga', 'Badrinath Temple'],
    description: 'The holiest Himalayan pilgrimage covering four divine sacred abodes nestled amidst Himalayan glaciers.'
  },
  {
    id: 'dest-manali-kasol',
    name: 'Manali & Kasol',
    state: 'Himachal Pradesh',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    tag: 'Snow & Parvati Valley Vibe',
    packagesCount: 16,
    startingPrice: 7000,
    bestSeason: 'Round the Year',
    avgTemp: '10°C - 22°C',
    topAttractions: ['Solang Valley', 'Atal Tunnel', 'Kasol Manikaran Sahib', 'Tosh & Old Manali'],
    description: 'Snow viewpoints, thrilling pine forest riverside cafes, hot water sulfur springs, and vibrant hippie trails.'
  },
  {
    id: 'dest-jibhi-sojha',
    name: 'Jibhi & Sojha',
    state: 'Himachal Pradesh',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tag: 'Hidden Tirthan Gem',
    packagesCount: 5,
    startingPrice: 7000,
    bestSeason: 'Mar - Nov',
    avgTemp: '12°C - 22°C',
    topAttractions: ['Jibhi Waterfall', 'Jalori Pass 3120m', 'Serolsar Lake Trek', 'Chehni Kothi Fort'],
    description: 'Unspoiled Victorian pine woods, crystal clear freshwater trout streams, traditional wooden chalets, and alpine meadows.'
  },
  {
    id: 'dest-kedarnath',
    name: 'Kedarnath Dham',
    state: 'Uttarakhand',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?auto=format&fit=crop&w=800&q=80',
    tag: 'Lord Shiva Holy Jyotirlinga',
    packagesCount: 10,
    startingPrice: 8000,
    bestSeason: 'May - Jun & Sep - Nov',
    avgTemp: '4°C - 16°C',
    topAttractions: ['Kedarnath Temple', 'Mandakini River', 'Bhairavnath Temple', 'Gaurikund Base'],
    description: 'One of the twelve supreme Jyotirlingas, situated near Mandakini river with majestic snow-covered Kedarnath peak backdrop.'
  },
  {
    id: 'dest-chopta-tungnath',
    name: 'Chopta & Tungnath',
    state: 'Uttarakhand',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    tag: 'Mini Switzerland of India',
    packagesCount: 6,
    startingPrice: 5000,
    bestSeason: 'Round the Year',
    avgTemp: '8°C - 19°C',
    topAttractions: ['Tungnath Highest Shiva Temple', 'Chandrashila Summit 4000m', 'Deoria Tal Lake', 'Ukhimath'],
    description: 'Highest Shiva temple in the world with jaw-dropping 360-degree panorama of Nanda Devi, Trishul, and Chaukhamba peaks.'
  },
  {
    id: 'dest-valley-of-flowers',
    name: 'Valley of Flowers',
    state: 'Uttarakhand',
    region: 'North India',
    image: '/images/valley_of_flowers.jpg',
    tag: 'UNESCO Alpine Floral Wonder',
    packagesCount: 4,
    startingPrice: 8000,
    bestSeason: 'Jul - Sep',
    avgTemp: '12°C - 20°C',
    topAttractions: ['Valley of Flowers National Park', 'Hemkund Sahib Gurudwara 4329m', 'Govindghat', 'Ghangaria'],
    description: 'Enchanting UNESCO World Heritage alpine valley blanketed with hundreds of rare endemic wildflower species and glacial streams.'
  },
  {
    id: 'dest-mcleodganj',
    name: 'Mcleodganj & Dharamshala',
    state: 'Himachal Pradesh',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    tag: 'Little Lhasa & Triund',
    packagesCount: 7,
    startingPrice: 7000,
    bestSeason: 'Round the Year',
    avgTemp: '14°C - 25°C',
    topAttractions: ['Dalai Lama Temple', 'Triund Trek', 'Bhagsunag Waterfall', 'Namgyal Monastery'],
    description: 'Tibetan cultural capital with pine forests, serene Buddhist prayer wheels, mountain monasteries, and stunning Dhauladhar views.'
  },
  {
    id: 'dest-kedarkantha',
    name: 'Kedarkantha Trek',
    state: 'Uttarakhand',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    tag: 'Queen of Winter Snow Treks',
    packagesCount: 6,
    startingPrice: 6000,
    bestSeason: 'Dec - Apr & Oct - Nov',
    avgTemp: '-5°C - 15°C',
    topAttractions: ['Kedarkantha Summit 3810m', 'Juda Ka Talab Frozen Lake', 'Sankri Village Base', 'Snow Campfire'],
    description: 'India’s most loved snow summit trek with gorgeous 360-degree Himalayan sunrise views from 12,500 ft elevation.'
  },
  {
    id: 'dest-hampta-pass',
    name: 'Hampta Pass Trek',
    state: 'Himachal Pradesh',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    tag: 'Crossover Alpine Trek',
    packagesCount: 5,
    startingPrice: 6000,
    bestSeason: 'Jun - Oct',
    avgTemp: '5°C - 16°C',
    topAttractions: ['Hampta Pass 4270m', 'Chandratal Lake', 'Shea Goru Campsite', 'Jobra Pine Woods'],
    description: 'Dramatic crossover trek transitioning from lush green Kullu valleys to the barren moonscape of Spiti and Chandratal.'
  },
  // International Destinations
  {
    id: 'dest-vietnam',
    name: 'Vietnam',
    state: 'Southeast Asia',
    region: 'International Special',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    tag: 'Halong Bay & Golden Bridge',
    packagesCount: 8,
    startingPrice: 38000,
    bestSeason: 'Oct - Apr',
    avgTemp: '20°C - 28°C',
    topAttractions: ['Halong Bay Cruise', 'Da Nang Golden Giant Hand Bridge', 'Hoi An Lantern Town', 'Hanoi Old Quarter'],
    description: 'Limestone emerald sea karsts, Ba Na hills giant stone hands bridge, lantern-lit riverside ancient towns, and mouth-watering culinary street food.'
  },
  {
    id: 'dest-thailand',
    name: 'Thailand',
    state: 'Southeast Asia',
    region: 'International Special',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    tag: 'Bangkok, Pattaya & Phuket',
    packagesCount: 10,
    startingPrice: 24999,
    bestSeason: 'Nov - Apr',
    avgTemp: '24°C - 32°C',
    topAttractions: ['Coral Island Speedboat', 'Phuket James Bond Island', 'Chao Phraya Dinner Cruise', 'Safari World Bangkok'],
    description: 'Golden Buddhist temples, crystal coral speedboating, tropical beaches, luxury island catamarans, and lively shopping night markets.'
  },
  {
    id: 'dest-bali',
    name: 'Bali (Indonesia)',
    state: 'Indonesia',
    region: 'International Special',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    tag: 'Island of the Gods',
    packagesCount: 9,
    startingPrice: 32000,
    bestSeason: 'Apr - Oct',
    avgTemp: '25°C - 31°C',
    topAttractions: ['Nusa Penida Kelingking T-Rex Beach', 'Ubud Jungle Swing & Rice Terraces', 'Tanah Lot Sunset Temple', 'Uluwatu Kecak Dance'],
    description: 'Paradise island with clifftop ocean temples, lush emerald rainforest swings, volcanic black sands, and private luxury pool villas.'
  },
  {
    id: 'dest-bhutan',
    name: 'Bhutan',
    state: 'Himalayan Kingdom',
    region: 'International Special',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    tag: 'Land of the Thunder Dragon',
    packagesCount: 6,
    startingPrice: 28500,
    bestSeason: 'Mar - May & Sep - Nov',
    avgTemp: '10°C - 20°C',
    topAttractions: ['Paro Taktsang (Tiger’s Nest)', 'Thimphu Tashichho Dzong', 'Punakha Suspension Bridge', 'Dochula 108 Chortens'],
    description: 'Pure Himalayan bliss with cliff-hanging Tiger’s Nest monastery, fortress dzongs, gross national happiness, and pristine carbon-negative valleys.'
  },
  // Jammu & Kashmir Destinations
  {
    id: 'dest-srinagar',
    name: 'Srinagar & Dal Lake',
    state: 'Jammu & Kashmir',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    tag: 'Dal Lake & Mughal Heritage',
    packagesCount: 14,
    startingPrice: 16999,
    bestSeason: 'Mar - Nov & Dec - Feb',
    avgTemp: '12°C - 24°C',
    topAttractions: ['Dal Lake Shikara Rides', 'Luxury Carved Houseboats', 'Mughal Gardens (Nishat & Shalimar)', 'Floating Flower Market'],
    description: 'Heart of the Kashmir valley with romantic wooden Shikara rides on the placid Dal Lake, royal Mughal terraced gardens, and floating markets.'
  },
  {
    id: 'dest-gulmarg',
    name: 'Gulmarg Snow Paradise',
    state: 'Jammu & Kashmir',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tag: 'World’s 2nd Highest Gondola 🚠',
    packagesCount: 10,
    startingPrice: 18500,
    bestSeason: 'Dec - Apr (Snow) & May - Sep',
    avgTemp: '-4°C - 16°C',
    topAttractions: ['Gulmarg Gondola Phase 1 & 2', 'Apharwat Peak 4200m', 'St. Mary’s Church & Golf Course', 'Snow Skiing & Sledging'],
    description: 'Premier ski resort of Asia featuring lush flower meadows in summer and powdered snow wonderland in winter with cable car rides up to 13,780 ft.'
  },
  {
    id: 'dest-pahalgam-sonmarg',
    name: 'Pahalgam & Sonmarg',
    state: 'Jammu & Kashmir',
    region: 'North India',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    tag: 'Valley of Shepherds & Golden Glaciers',
    packagesCount: 9,
    startingPrice: 17500,
    bestSeason: 'Apr - Oct',
    avgTemp: '10°C - 20°C',
    topAttractions: ['Betaab Valley', 'Aru Valley & Chandanwari', 'Baisaran Mini Switzerland', 'Thajiwas Glacier Sonmarg'],
    description: 'Lush alpine valleys framed by Lidder river rapids, pine slopes, Bollywood film shooting spots, pony treks, and shimmering golden glaciers.'
  },

  // Kerala Destinations
  {
    id: 'dest-munnar-thekkady',
    name: 'Munnar & Thekkady Hills',
    state: 'Kerala',
    region: 'South India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    tag: 'Emerald Tea Estates & Spice Wildlife',
    packagesCount: 14,
    startingPrice: 14499,
    bestSeason: 'Sep - May',
    avgTemp: '15°C - 25°C',
    topAttractions: ['Munnar Tea Plantations', 'Mattupetty Dam & Echo Point', 'Periyar Wildlife Sanctuary', 'Spice Plantation Walks'],
    description: 'Rolling mist-covered tea gardens, aromatic cardamom & pepper plantations, elephant sanctuaries, and spice tours in God’s Own Country.'
  },
  {
    id: 'dest-alleppey-kumarakom',
    name: 'Alleppey & Kumarakom',
    state: 'Kerala',
    region: 'South India',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    tag: 'Luxury Houseboats & Palm Canals',
    packagesCount: 12,
    startingPrice: 16500,
    bestSeason: 'Oct - Mar',
    avgTemp: '23°C - 31°C',
    topAttractions: ['Luxury Kettuvallam Houseboat Stay', 'Vembanad Lake Cruise', 'Kumarakom Bird Sanctuary', 'Ayurvedic Rejuvenation Spa'],
    description: 'Tranquil network of shimmering canals, lagoons, and backwater lakes lined with coconut palms, traditional fishing nets, and luxury houseboats.'
  },
  {
    id: 'dest-wayanad-kovalam',
    name: 'Wayanad & Kovalam Coast',
    state: 'Kerala',
    region: 'South India',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    tag: 'Waterfalls, Caves & Golden Cliffs',
    packagesCount: 8,
    startingPrice: 15000,
    bestSeason: 'Sep - Apr',
    avgTemp: '20°C - 30°C',
    topAttractions: ['Chembra Peak Heart Lake', 'Edakkal Prehistoric Caves', 'Kovalam Lighthouse Beach', 'Varkala Clifftop Sunset'],
    description: 'Lush rainforest waterfalls and prehistoric petroglyphs in the Western Ghats paired with dramatic red sea cliffs and golden Arabian beaches.'
  },

  // Goa Destinations
  {
    id: 'dest-north-goa',
    name: 'North Goa Beaches & Vibes',
    state: 'Goa',
    region: 'West India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    tag: 'Baga, Calangute & Watersports',
    packagesCount: 10,
    startingPrice: 10999,
    bestSeason: 'Oct - May',
    avgTemp: '24°C - 32°C',
    topAttractions: ['Baga & Calangute Beach', 'Aguada Fort & Lighthouse', 'Chapora Fort (Dil Chahta Hai)', 'Parasailing & Jet Skiing'],
    description: 'Vibrant golden sands, energetic beach shacks, historic cliffside Portuguese forts, lively flea markets, and thrilling water sports.'
  },
  {
    id: 'dest-south-goa',
    name: 'South Goa Serenity & Heritage',
    state: 'Goa',
    region: 'West India',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tag: 'Palolem Beach & UNESCO Heritage',
    packagesCount: 8,
    startingPrice: 12500,
    bestSeason: 'Oct - May',
    avgTemp: '23°C - 31°C',
    topAttractions: ['Palolem & Colva Beach', 'Old Goa Basilica of Bom Jesus', 'Dudhsagar Waterfalls Trek', 'Sahakari Spice Farm'],
    description: 'Tranquil crescent white beaches, palm-shaded luxury resorts, 400-year-old Portuguese cathedrals, and towering four-tiered Dudhsagar falls.'
  },
  {
    id: 'dest-goa-cruises',
    name: 'Goa Cruises & Island Tours',
    state: 'Goa',
    region: 'West India',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    tag: 'Grand Island Scuba & Sunset Sails',
    packagesCount: 6,
    startingPrice: 9500,
    bestSeason: 'Oct - May',
    avgTemp: '25°C - 32°C',
    topAttractions: ['Grand Island Scuba Diving', 'Mandovi River Sunset Cruise', 'Dolphin Spotting Safari', 'Luxury Casino Catamarans'],
    description: 'Exciting underwater marine reefs with scuba diving, dolphin boat safaris, sunset dinner cruises with Goan folk dance, and mangrove kayaking.'
  },

  // Rajasthan Destinations
  {
    id: 'dest-udaipur',
    name: 'Udaipur - City of Lakes',
    state: 'Rajasthan',
    region: 'West India',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
    tag: 'Lake Pichola & Royal Palaces 🏰',
    packagesCount: 8,
    startingPrice: 8000,
    bestSeason: 'Oct - Mar',
    avgTemp: '16°C - 28°C',
    topAttractions: ['City Palace Complex', 'Lake Pichola Boat Cruise', 'Jag Mandir & Saheliyon ki Bari', 'Bagore Ki Haveli Folk Show'],
    description: 'The Venice of the East adorned with royal marble palaces, romantic lake boat rides on Lake Pichola, heritage rooftop havelis, and Aravali mountain sunsets.'
  },
  {
    id: 'dest-pushkar',
    name: 'Pushkar - Holy Lake & Desert Oasis',
    state: 'Rajasthan',
    region: 'West India',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    tag: 'Brahma Temple & Camel Safari 🐪',
    packagesCount: 6,
    startingPrice: 7000,
    bestSeason: 'Oct - Mar',
    avgTemp: '15°C - 27°C',
    topAttractions: ['Lord Brahma Temple (Only in World)', 'Pushkar Sarovar 52 Sacred Ghats', 'Savitri Devi Temple Cable Car', 'Thar Desert Camel & Jeep Safari'],
    description: 'Spiritual desert town nestled around the holy sacred lake, famous for the world’s rare Brahma temple, vibrant Maha Aarti, rose gardens, and desert camps.'
  },
  {
    id: 'dest-jaisalmer',
    name: 'Jaisalmer - The Golden City',
    state: 'Rajasthan',
    region: 'West India',
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80',
    tag: 'Living Fort & Sam Dunes Camp ⛺',
    packagesCount: 9,
    startingPrice: 10000,
    bestSeason: 'Oct - Mar',
    avgTemp: '12°C - 26°C',
    topAttractions: ['Jaisalmer Sonar Qila (Living Fort)', 'Sam Sand Dunes Desert Safari', 'Luxury Swiss Tent Camping with Kalbelia Dance', 'Patwon Ki Haveli & Gadisar Lake'],
    description: 'Mesmerizing golden sandstone kingdom in the heart of Thar desert with a bustling living fort, thrilling dune bashing, camel safaris, and starlit campfire nights.'
  },
  {
    id: 'dest-jaipur',
    name: 'Jaipur - The Royal Pink City',
    state: 'Rajasthan',
    region: 'West India',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    tag: 'Hawa Mahal & Amer Fort 👑',
    packagesCount: 10,
    startingPrice: 7500,
    bestSeason: 'Oct - Mar',
    avgTemp: '14°C - 28°C',
    topAttractions: ['Amer Fort Elephant / Jeep Ascent', 'Hawa Mahal (Palace of Winds)', 'City Palace & Jantar Mantar', 'Jal Mahal & Johari Bazaar Shopping'],
    description: 'Capital of Rajput royalty featuring pink terracotta facades, majestic hilltop Amer fort, astronomical stone observatories, and vibrant colorful handicraft bazaars.'
  }
];

export const LIVE_BOOKING_SAMPLE: { name: string; city: string; tour: string; duration: string; travelers: number }[] = [
  { name: 'Amit & Ritika Rawat', city: 'Delhi NCR', tour: 'Spiti Valley Complete Circuit Tour', duration: '6N / 7D', travelers: 2 },
  { name: 'Harshit Sharma', city: 'Chandigarh', tour: 'Leh Ladakh Pangong & Khardung La', duration: '9N / 10D', travelers: 4 },
  { name: 'Dr. Mukund Trivedi', city: 'Ahmedabad', tour: 'Sacred Char Dham Yatra Kedarnath Badrinath', duration: '10N / 11D', travelers: 5 },
  { name: 'Shreya & Rohan Sen', city: 'Kolkata', tour: 'Manali Kasol & Manikaran Snow Trip', duration: '3N / 4D', travelers: 2 },
  { name: 'Vikas Deshmukh', city: 'Pune', tour: 'Kedarnath Dham Holy Yatra with Haridwar', duration: '3N / 4D', travelers: 3 },
  { name: 'Aditya Mathur', city: 'Jaipur', tour: 'Chopta Tungnath & Chandrashila Summit', duration: '2N / 3D', travelers: 4 },
  { name: 'Ananya & Sahil', city: 'Bengaluru', tour: 'Vietnam Halong Bay & Da Nang Golden Bridge', duration: '5N / 6D', travelers: 2 },
  { name: 'Pooja Nair', city: 'Mumbai', tour: 'Bali Nusa Penida & Ubud Villa Escape', duration: '5N / 6D', travelers: 2 }
];

export const TRAVELER_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Sunil & Preeti Verma',
    city: 'Delhi NCR',
    tour: 'Spiti Valley Circuit 6N/7D',
    rating: 5,
    date: '12 Aug 2026',
    comment: 'Sky Wander Holidays made our Spiti road trip flawless! Chandratal Lake camping and Key Monastery views were magical. Chauffeur was exceptionally skilled on high altitude mountain passes. Unbeatable price for ₹20,000!',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Col. Rajesh Deshmukh & Family',
    city: 'Pune',
    tour: 'Char Dham Yatra 10N/11D',
    rating: 5,
    date: '05 Aug 2026',
    comment: 'Took my senior citizen parents for Char Dham Yatra. Hotel stays and VIP darshan coordination at Kedarnath and Badrinath were super comfortable. 24x7 support on WhatsApp was comforting!',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Ankita Bose & Friends',
    city: 'Kolkata',
    tour: 'Manali & Kasol 3N/4D',
    rating: 5,
    date: '28 Jul 2026',
    comment: 'Our weekend college trip to Kasol & Solang valley was wonderful! Parvati river cafe stays and bonfire nights arranged by Sky Wander Holidays at just ₹7,000 per head was a steal deal.',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Raghavender Reddy',
    city: 'Hyderabad',
    tour: 'Bali Nusa Penida & Ubud 5N/6D',
    rating: 5,
    date: '18 Jul 2026',
    comment: 'Our international Bali holiday went seamless! The private pool villa in Seminyak and Nusa Penida speedboat tour was world-class. Sky Wander Holidays handled everything with perfection.',
    verified: true
  }
];
