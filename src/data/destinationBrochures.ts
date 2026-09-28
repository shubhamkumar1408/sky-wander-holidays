// Official Sky Wander Holidays - Verified Destination Brochures Data
// Transcribed 1:1 from Official Itinerary Documents

export interface BrochureDayPlan {
  dayNumber: string; // e.g. "DAY 0", "DAY 1"
  title: string;
  description: string;
  bullets?: string[];
  meals?: string;
  stay?: string;
}

export interface DestinationBrochure {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  destination: string;
  duration: string;
  pickupPoints: string[];
  startingPrice: string;
  sharingPrices?: {
    quad?: string;
    triple?: string;
    double?: string;
  };
  advanceBookingAmount: string;
  highlights: string[];
  routeSummary: string[];
  itinerary: BrochureDayPlan[];
  inclusions: string[];
  exclusions: string[];
  thingsToPack: string[];
  paymentDetails: {
    accountName: string;
    accountHolder: string;
    bankName: string;
    upiId: string;
    notes: string;
  };
  termsAndConditions: string[];
  cancellationPolicy: string[];
  contactNumber: string;
  contactEmail: string;
  website: string;
  offices: string[];
}

export const DESTINATION_BROCHURES: Record<string, DestinationBrochure> = {
  // 1. KEDARNATH DHAM (3N/4D)
  'kedarnath': {
    id: 'kedarnath',
    code: 'SW-KDR-01',
    title: 'KEDARNATH DHAM YATRA',
    subtitle: 'Journey to the Sacred 11th Jyotirlinga in Himalayas',
    destination: 'Kedarnath, Uttarakhand',
    duration: '3N / 4D',
    pickupPoints: ['Delhi', 'Haridwar', 'Rishikesh'],
    startingPrice: '₹11,500 + 5% GST',
    sharingPrices: {
      quad: 'INR 11,500 + 5% GST',
      triple: 'INR 12,000 + 5% GST',
      double: 'INR 12,500 + 5% GST'
    },
    advanceBookingAmount: 'INR 4,000/- per person',
    highlights: [
      'Holy Kedarnath Jyotirlinga Darshan & Evening Live Aarti',
      'Overnight stay at Kedarnath Top basic dormitory near temple',
      'Trek from Gaurikund with views of Mandakini valley & snow peaks',
      'Visit Bhairavnath Temple atop the mountain ridge',
      'Scenic stopover at Devprayag Holy Sangam (Bhagirathi & Alaknanda)'
    ],
    routeSummary: [
      'Day 1: Departure to Guptkashi overnight journey via Haridwar Rishikesh',
      'Day 2: Reach Guptkashi | Overnight Stay',
      'Day 3: Trek to Kedarnath Dham | Evening Aarti | Overnight Stay at Kedarnath Top',
      'Day 4: Trek Down & Overnight Stay at Guptkashi',
      'Day 5: Departure from Guptkashi via Devprayag to Delhi'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 1',
        title: 'DEPARTURE TO GUPTKASHI',
        description: 'Departure in the evening. The group will assemble at the pickup point. Afterward, you will get a small briefing from the Trip Leader(s). Halt for dinner in between (not on us). Overnight journey to Guptkashi via Haridwar Rishikesh.'
      },
      {
        dayNumber: 'DAY 2',
        title: 'GUPTKASHI ARRIVAL & ACCLIMATIZATION',
        description: 'Reach Haridwar in the morning, where you can rest for a while before starting your onward journey to Guptkashi. Later proceed towards Guptkashi, on the way take a short stopover at Devprayag where you can witness the Holy Sangam of Bhagirathi and Alaknanda that together form Ganga. After this, get back on the way witnessing some of the most beautiful landscapes. On reaching Guptkashi, check-in to the hotel. Overnight stay at Guptkashi.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'GUPTKASHI TO GAURIKUND & KEDARNATH TREK',
        description: 'Wake up & start your day early. Have breakfast and leave for Gaurikund (Kedarnath trek base point). Start your trek to Kedarnath (16 km, 7-8 hours trek). Reach Kedarnath by evening. Check-in to the guest house at Kedarnath and experience live aarti at one of the highest abodes of Lord Shiva. Dinner and overnight stay in Kedarnath top basic dormitory rooms.'
      },
      {
        dayNumber: 'DAY 4',
        title: 'KEDARNATH TO GUPTKASHI DESCENT',
        description: 'Wake up and have your breakfast. Visit Bhairavnath temple then start trek down to Gaurikund. Reach Gaurikund by evening and drive to Guptkashi. Dinner and overnight stay at hotel in Guptkashi.'
      },
      {
        dayNumber: 'DAY 5',
        title: 'DEPARTURE FROM GUPTKASHI TO DELHI',
        description: 'Wake up and have your breakfast. Departure from Guptkashi via Rudraprayag. Enroute visit Dhara Devi temple in Srinagar. On arrival at Rishikesh, explore colorful markets & Ram Jhula if time permits. Have dinner at Rishikesh. Overnight journey to Delhi.'
      }
    ],
    inclusions: [
      'Accommodation (2-night stay in Guptkashi / Sonprayag, 1-night stay at Kedarnath top basic dormitory)',
      '6 Meals (3 breakfast, 3 dinner)',
      'Transfer to/from in Deluxe Tempo Traveller',
      'Trekking to Kedarnath Dham Top',
      'Tour Coordinator throughout the yatra',
      'All permits & green clearance'
    ],
    exclusions: [
      'Expenses on any activities which are not mentioned in the itinerary',
      '5% GST',
      'Early check-in at stay',
      'Taxi charges from Sonprayag to Gaurikund',
      'Helicopter Tickets',
      'Any type of insurance including travel, health, etc.',
      'Expenses of personal nature are not covered',
      'Additional expense added due to landslides, roadblocks, strikes or natural causes'
    ],
    thingsToPack: [
      'Down Jacket / Main Jacket',
      'Thermals (Upper & Lower)',
      'Clothes & Extra Socks',
      'Undergarments & Gloves',
      'Running Shoes / Outdoor Trekking Shoes',
      'Hats / Caps & Daypack',
      'Personal Medication If Any & First Aid Kit',
      'Documents - Govt. ID (Aadhar Card, Driver License, Voter ID)'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank Ltd',
      upiId: '8676928509@pthdfc',
      notes: 'Kindly deposit 4,000/- advance amount to confirm seat. Remaining amount will be collected before boarding.'
    },
    termsAndConditions: [
      'The advance amount is non-refundable under any circumstances.',
      'Full Payment of the trip cost must be made before the trip begins. Pending payments may lead to cancellation.',
      'Valid Govt. ID required before boarding.',
      'Transfer of bookings is strictly not permitted.',
      'Air conditioning will be switched off in hill terrain for passenger safety and vehicle efficiency.',
      'Management is not liable for personal lost/misplaced items.'
    ],
    cancellationPolicy: [
      'Advance deposit is 100% non-refundable under all circumstances.',
      'Cancellations made 7-15 days prior: Adjust full amount for next upcoming trip.',
      'Cancellations made 0-7 days prior: 100% non-refundable.'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['New Delhi (Head Office)', 'Noida (Corporate Office)', 'Dehradun (Uttarakhand)', 'Hyderabad', 'Patna (Bihar)', 'Banaras', 'Pune', 'Bettiah']
  },

  // 2. SANGLA HOLI TRIP (3N/4D)
  'sangla-holi': {
    id: 'sangla-holi',
    code: 'SW-SGL-02',
    title: 'SANGLA HOLI CELEBRATION (FAGULI MELA)',
    subtitle: 'Traditional Himalayan Holi Festival in the Land of Gods',
    destination: 'Kinnaur Valley, Himachal Pradesh',
    duration: '3N / 4D (5 Days)',
    pickupPoints: ['Delhi (Kashmiri Gate)', 'Shimla'],
    startingPrice: '₹12,000/- per person',
    sharingPrices: {
      triple: 'INR 12,000/- per person',
      double: 'INR 13,500/- per person'
    },
    advanceBookingAmount: 'INR 2,000/- per person',
    highlights: [
      'Celebrate traditional Faguli Festival Holi with locals in Sangla Valley',
      'Faag Mela at Sangla Chowk with folk music, dance and Kinnauri attire',
      'Explore Chitkul - the last village on the India-Tibet border',
      'Visit Hindustan Ka Aakhri Dhaba with surreal river valley views',
      'Photo stop at the iconic Rock Tunnel (Gateway to Kinnaur)'
    ],
    routeSummary: [
      'Day 0: Delhi to Shimla | Overnight Journey (Kashmiri Gate)',
      'Day 1: Shimla to Sangla (225 km) via Rock Tunnel',
      'Day 2: Holi Celebration in Sangla Village',
      'Day 3: Chitkul Sightseeing & Faag Mela at Sangla Chowk',
      'Day 4: Sangla to Shimla | Shimla to Delhi Overnight Volvo',
      'Day 5: Early morning arrival in Delhi'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 0',
        title: 'DELHI TO SHIMLA OVERNIGHT JOURNEY',
        description: 'Assemble at Kashmiri Gate Bus Stop before the pickup time. Board our luxury AC Volvo bus for an overnight drive to Shimla. En route brief stop for dinner and refreshments (own expense).'
      },
      {
        dayNumber: 'DAY 1',
        title: 'SHIMLA TO SANGLA (225 KM)',
        description: 'Welcome to Shimla, gateway to Himalayan highs. Enjoy a warm cup of tea, freshen up, and gear up for an enthralling road trip to Sangla. En route, photo stop at the Iconic Rock Tunnel, known as the Gateway to Kinnaur. Reach Sangla, check in to hotel, and enjoy a homely dinner. Overnight stay in Sangla.'
      },
      {
        dayNumber: 'DAY 2',
        title: 'HOLI CELEBRATION IN SANGLA',
        description: 'Happy Holi! Celebrate Faguli Festival marking the arrival of spring. The entire village is draped in vibrant organic colors. In the evening, catch the sunset over Himalayan peaks and indulge in a bonfire and music session under the stars. Dinner and overnight stay in Sangla.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'CHITKUL SIGHTSEEING & FAAG MELA',
        description: 'Head to Chitkul, the last village on the India-Tibet border. Visit Hindustan Ka Aakhri Dhaba. Return to attend Faag Mela at Sangla Chowk with traditional deities, folk dance, and music. Local dinner and overnight stay.'
      },
      {
        dayNumber: 'DAY 4',
        title: 'SANGLA TO SHIMLA & OVERNIGHT TO DELHI',
        description: 'Freshly cooked breakfast, wave goodbye, and board tempo travelers for Shimla. Relish the enchanting views of rivers and gorges. Reach Shimla, board overnight Volvo bus to Delhi with fun activities and conversations.'
      },
      {
        dayNumber: 'DAY 5',
        title: 'ARRIVAL IN DELHI',
        description: 'Reach Delhi early in the morning with a heart full of vibrant festival memories and peace of mind.'
      }
    ],
    inclusions: [
      'Transportation in Tempo Traveller from Shimla to Shimla',
      'AC Volvo Bus from Delhi to Shimla and Shimla to Delhi',
      'Accommodation on sharing basis as per itinerary',
      'Meal Plan: MAP Plan (Breakfast & Dinner)',
      'Organic Colors for Holi Celebration',
      'Traditional Local Dinner on Day 4',
      'Music & Bonfire party during Holi celebration',
      'Complimentary One Veg Snack & Apple Juice during Holi',
      'Dedicated Trip Lead present at all times',
      'All permits required, First Aid Kits, Oxygen Cylinders & Oximeters',
      'Driver Allowance & Night Charges'
    ],
    exclusions: [
      '5% GST',
      'Early check-in & late checkout',
      'Any personal expenses and lunches',
      'Sightseeing monument entry fees',
      'Expenses arising due to landslides/roadblocks'
    ],
    thingsToPack: [
      'Warm clothes & extra changes for Holi',
      'Down jacket & thermals',
      'Comfortable walking shoes',
      'Sunglasses, sun cap & sunscreen',
      'Government ID card copy'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank',
      upiId: '8676928509@pthdfc',
      notes: 'Pay advance 30% to confirm booking. Remaining balance 24 hours before departure.'
    },
    termsAndConditions: [
      'No act of misconduct or indiscipline tolerated.',
      'AC switched off on hill terrain.',
      'Dynamic pricing based on seasonality.',
      'Advance amount is non-refundable.'
    ],
    cancellationPolicy: [
      'Up to 16 days: 10% cancellation fee',
      '15-10 days: 25% cancellation fee',
      '10-3 days: 50% cancellation fee',
      '0-2 days: No refund'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['Noida (Corporate Office)', 'New Delhi', 'Shimla']
  },

  // 3. MEGHALAYA FIXED DEPARTURE (5N/6D)
  'meghalaya': {
    id: 'meghalaya',
    code: 'SW-MEG-03',
    title: 'MEGHALAYA FIXED DEPARTURE',
    subtitle: 'Scotland of the East, Living Root Bridges & Umngot River',
    destination: 'Meghalaya & Assam',
    duration: '5 Nights | 6 Days',
    pickupPoints: ['Guwahati Airport (GAU)'],
    startingPrice: 'INR 19,999/- Per Person',
    sharingPrices: {
      triple: '₹ 20,999/- PP',
      double: '₹ 22,999/- PP'
    },
    advanceBookingAmount: '30% Advance to confirm seat',
    highlights: [
      'Trek to the iconic Double Decker Living Roots Bridge in Nongriat',
      'Boating on crystal clear transparent waters of Umngot River in Dawki',
      'Visit Mawlynnong - Cleanest Village in Asia & Riwai Living Root Bridge',
      'Explore Mawsmai limestone caves & scenic Seven Sisters Waterfall',
      'Experience Krang Suri Waterfall & Phe Phe Falls in Jaintia Hills',
      'Panoramic sunset at Laitlum Grand Canyon'
    ],
    routeSummary: [
      'Day 1: Guwahati Airport Pick up to Shillong (Umiam Lake)',
      'Day 2: Shillong to Cherrapunjee (Sohra) via Mawsmai Caves & Viewpoints',
      'Day 3: Trek to Double Decker Living Roots Bridge (Nongriat)',
      'Day 4: Cherrapunjee to Mawlynnong to Dawki (Shnongpdeng riverside camp)',
      'Day 5: Dawki to Jowai (Krang Suri, Phe Phe Falls) to Shillong',
      'Day 6: Shillong to Guwahati Airport Drop'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 1',
        title: 'GUWAHATI AIRPORT TO SHILLONG',
        description: 'Pick up from Guwahati Airport and have a memorable drive to Shillong (Scotland of the East) through scenic greenery. En route visit Umiam Lake, one of the biggest artificial lakes in Meghalaya. Overnight stay in Shillong hotel.'
      },
      {
        dayNumber: 'DAY 2',
        title: 'SHILLONG TO CHERRAPUNJEE (SOHRA)',
        description: 'Head deeper into the Khasi Hills. Visit Mawphlang Sacred Grove, Mawkdok Dympep Valley Viewpoint, Wha Kaba Falls, and Mawsmai Caves with stunning stalactites. Check in to Cherrapunjee hotel/resort. Overnight stay.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'SINGLE ROOT BRIDGE & DOUBLE DECKER BRIDGE TREK',
        description: 'Visit Seven Sister Falls. Head towards Nongriat village and start the trek to the iconic Double Decker Living Roots Bridge through gushing streams and lush subtropical forests. Overnight stay in Cherrapunjee.'
      },
      {
        dayNumber: 'DAY 4',
        title: 'CHERRAPUNJEE TO MAWLYNNONG & DAWKI (SHNONGPDENG)',
        description: 'Visit Mawlynnong, awarded the cleanest village in Asia. Witness the 100+ year old Living Root Bridge of Riwai. Drive close to India-Bangladesh border to Dawki on the crystal-clear Umngot River. Overnight stay in Alpine/Dome tents at Shnongpdeng.'
      },
      {
        dayNumber: 'DAY 5',
        title: 'DAWKI TO JOWAI TO SHILLONG',
        description: 'Head to Jowai. En route visit Laitlum Grand Canyon and Krang Suri Waterfall. Short trek to Phe Phe Falls in Jaintia Hills. Evening return to Shillong. Overnight stay in Shillong.'
      },
      {
        dayNumber: 'DAY 6',
        title: 'SHILLONG TO GUWAHATI DEPARTURE',
        description: 'After early breakfast, check out and drive back to Guwahati Airport for departure flight.'
      }
    ],
    inclusions: [
      '5 Nights accommodation (2N Hotel Shillong, 2N Hotel Cherrapunjee, 1N Camp at Dawki/Shnongpdeng)',
      'Transportation for local sightseeing in Tempo Traveler / SUV from Guwahati to Guwahati',
      'Meals: 6 Meals (Breakfast on Days 2, 3, 4, 5, 6 and Dinner on Day 4)',
      'Local Guide for Double Decker Living Root Bridge',
      'All inner line permits for the trip',
      'Medical Kit for emergency conditions',
      'Driver Night Charges, Toll Tax & Parking Charges',
      'Dedicated Team Captain throughout the trip'
    ],
    exclusions: [
      'GST @ 5% extra',
      'Personal expenses (laundry, beverages, telephone, shopping)',
      'Meals not specifically mentioned in inclusions',
      'Entry fees, camera/video charges, and water sports tickets',
      'Expenses arising due to landslides or natural calamities'
    ],
    thingsToPack: [
      'Raincoat / Poncho / Umbrella (essential for Meghalaya)',
      'Good quality trekking shoes with firm grip',
      'Light woolens and quick dry clothing',
      'Water bottle & Daypack',
      'Valid Government Photo ID'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank',
      upiId: '8676928509@pthdfc',
      notes: 'Seat confirmation requires 30% advance deposit. Balance payment on day of departure.'
    },
    termsAndConditions: [
      'Strict prohibition on banned substances.',
      'All guests must carry valid government-issued ID card.',
      'Dynamic pricing based on seasonality.'
    ],
    cancellationPolicy: [
      '60 days prior: Full refund (0% fee)',
      '30 days prior: Full refund',
      '15-30 days prior: Full refund',
      '7-15 days prior: Adjust full money for next trip',
      '0-7 days prior: 100% non-refundable'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['Noida (Corporate Office)', 'Guwahati', 'Shillong']
  },

  // 4. MANALI ADVENTURE TOUR (3N/4D)
  'manali': {
    id: 'manali',
    code: 'SW-MNL-04',
    title: 'MANALI ADVENTURE EXPEDITION',
    subtitle: 'Explore the Mountains, Snow & Parvati Valley',
    destination: 'Manali, Solang & Kasol, Himachal Pradesh',
    duration: '3 Nights | 4 Days (6 Days Total)',
    pickupPoints: ['Delhi (Majnu Ka Tilla)', 'Chandigarh'],
    startingPrice: '₹7,499/- Per Person',
    sharingPrices: {
      quad: '₹ 7,499/- PP',
      triple: '₹ 8,499/- PP',
      double: '₹ 9,499/- PP'
    },
    advanceBookingAmount: 'INR 2,000/- per person',
    highlights: [
      'Rohtang Pass / Atal Tunnel & Sissu Lahaul Valley excursion',
      'Adventure activities at Solang Valley (Skiing, Zorbing, ATV riding)',
      'Beas River white-water rafting & paragliding in Kullu',
      'Scenic hike to Jogini Waterfall & holy Vashisht Hot Springs',
      'Visit Hadimba Devi Temple, Old Manali Cafes & Mall Road',
      'Kasol Parvati Valley exploration & holy Manikaran Sahib Gurudwara'
    ],
    routeSummary: [
      'Day 1: Delhi to Manali (530 km | 10-11 hrs) overnight Volvo',
      'Day 2: Vashisht, Jogini Waterfall & Local Sightseeing',
      'Day 3: Solang Valley / Rohtang Pass - Atal Tunnel - Sissu',
      'Day 4: Kullu Adventure (Rafting & Paragliding) - Kasol',
      'Day 5: Kasol - Manikaran Sahib - Overnight departure to Delhi',
      'Day 6: Morning arrival in Delhi'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 1',
        title: 'DELHI TO MANALI OVERNIGHT JOURNEY',
        description: 'Reporting point Majnu Ka Tilla. Board luxury Volvo bus (6:30 PM - 9:00 PM) and start overnight journey from Delhi to Manali (530 km).'
      },
      {
        dayNumber: 'DAY 2',
        title: 'VASHISHT, JOGINI WATERFALL & LOCAL SIGHTSEEING',
        description: 'Reach Manali in morning, check in to hotel. Visit Vashisht Temple & hot sulfur springs, trek to picturesque Jogini Waterfall. Explore ancient Hadimba Devi Temple and Mall Road. Dinner and overnight stay in Manali.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'SOLANG VALLEY, ATAL TUNNEL & SISSU',
        description: 'Visit Solang Valley for snow sports (Skiing, ATV riding, Ropeway). Proceed through the 9 km long engineering marvel Atal Tunnel to Sissu in Lahaul Valley. Evening return to hotel for dinner and stay.'
      },
      {
        dayNumber: 'DAY 4',
        title: 'KULLU ADVENTURE & KASOL',
        description: 'Check out and drive to Kullu for thrilling white-water river rafting in the Beas River and paragliding. Proceed to the hippie haven Kasol. Dinner and overnight stay in Swiss tents / hotel.'
      },
      {
        dayNumber: 'DAY 5',
        title: 'KASOL, MANIKARAN SAHIB & DEPARTURE',
        description: 'Explore Kasol cafes and riverside trail. Visit the holy Manikaran Sahib Gurudwara and natural hot water springs. Evening board overnight Volvo from Bhuntar/Kasol to Delhi.'
      },
      {
        dayNumber: 'DAY 6',
        title: 'ARRIVAL IN DELHI',
        description: 'Reach Delhi early morning with sweet memories of snow and adventure.'
      }
    ],
    inclusions: [
      'Transportation: Surface transfer via luxury Volvo (Delhi-Manali-Delhi) & local cab',
      'Accommodations: 3-Star hotel accommodations / Swiss tents on chosen sharing',
      'Meals: 3 Dinners and 3 Breakfasts',
      'Sightseeing as per itinerary',
      'Toll taxes, parking charges, driver allowances',
      'Medical and mechanical backup & First Aid kits'
    ],
    exclusions: [
      '5% GST',
      'Early check-in at hotel',
      'Personal expenses, laundry, drinks, room heaters',
      'Adventure activity tickets (rafting, paragliding, skiing)',
      'Additional costs due to landslides or roadblocks'
    ],
    thingsToPack: [
      'Down Jacket / Windproof Winter Jacket',
      'Thermals (Upper & Lower)',
      'Waterproof trekking boots with grip',
      'Woolen cap, gloves, woolen socks',
      'Valid Government Photo ID'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank',
      upiId: '8676928509@pthdfc',
      notes: 'Book seat by depositing ₹2,000/- advance per person. Rest collected before boarding.'
    },
    termsAndConditions: [
      'A/C will be switched off on hilly routes.',
      'Photo ID mandatory before boarding.',
      'Seating in vehicle is decided by trip coordinators.'
    ],
    cancellationPolicy: [
      '45-30 days before: 25% of total cost',
      '30-15 days before: 50% of total cost',
      '15-05 days before: 75% of total cost',
      'Same day / No show: 100% of total cost'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['Noida (Corporate Office)', 'New Delhi', 'Manali']
  },

  // 5. SPITI FULL CIRCUIT WITH CHANDRATAL (6N/7D)
  'spiti-circuit': {
    id: 'spiti-circuit',
    code: 'SW-SPI-05',
    title: 'SPITI FULL CIRCUIT WITH CHANDRATAL',
    subtitle: 'The Ultimate Trans-Himalayan Expedition',
    destination: 'Spiti Valley & Lahaul, Himachal Pradesh',
    duration: '6N / 7D (8 Days Total)',
    pickupPoints: ['Delhi', 'Shimla', 'Chandigarh'],
    startingPrice: '₹16,999/- Per Person',
    sharingPrices: {
      quad: '₹ 16,999/- PP',
      triple: '₹ 18,499/- PP',
      double: '₹ 20,499/- PP'
    },
    advanceBookingAmount: 'INR 2,000/- per person',
    highlights: [
      'Camp in Swiss tents beside the pristine crescent Chandratal Lake',
      'Visit Key Gompa & cross Asia’s highest suspension bridge (Chicham Bridge)',
      'Send postcards from Hikkim - World’s Highest Post Office (14,567 ft)',
      'Visit Komik - World’s highest village connected by motorable road',
      'Explore Langza Giant Buddha Statue & 1000-yr old Tabo Monastery',
      'Marvel at 500-year-old preserved Mummy at Gue Monastery'
    ],
    routeSummary: [
      'Day 0: Departure from Delhi | Overnight Journey',
      'Day 1: Shimla to Chitkul (Last Indian Village)',
      'Day 2: Chitkul / Sangla to Tabo via Khab Sangam',
      'Day 3: Tabo to Kaza via Gue & Dhankar Monasteries',
      'Day 4: Visit Key Monastery | Chicham Bridge | Hikkim, Komik & Langza',
      'Day 5: Kaza to Chandratal Lake | Camping under Stars',
      'Day 6: Chandratal to Manali via Atal Tunnel',
      'Day 7: Self explore Manali | Evening departure to Delhi',
      'Day 8: Morning arrival in Delhi'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 0',
        title: 'DELHI TO SHIMLA OVERNIGHT',
        description: 'Leave Delhi by 09:30 PM. Overnight journey to Shimla. Meet trip captain and fellow travelers.'
      },
      {
        dayNumber: 'DAY 1',
        title: 'SHIMLA TO CHITKUL',
        description: 'Reach Shimla in morning, freshen up and breakfast. Board Tempo Traveler / SUV. Head out for Chitkul through Kufri and Narkanda along Sutlej River. Reach Chitkul/Sangla, hotel check-in. Dinner and overnight stay.'
      },
      {
        dayNumber: 'DAY 2',
        title: 'CHITKUL TO TABO',
        description: 'Wake up early, breakfast and explore Chitkul village. Depart for Tabo. Pit stop at Khab, confluence of Sutlej and Spiti rivers. Reach Tabo by evening. Dinner and overnight stay.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'TABO TO KAZA',
        description: 'Visit the 1000-year-old UNESCO Tabo Monastery. Head to Gue village to witness the 500-year-old naturally preserved meditating Lama Mummy. Visit cliffhanging Dhankar Monastery. Reach Kaza in evening. Dinner and overnight stay.'
      },
      {
        dayNumber: 'DAY 4',
        title: 'EXPLORING KAZA HIGHEST VILLAGES',
        description: 'Excursion to Hikkim (World’s Highest Post Office), Komik (Highest motorable village), and Langza (Holy Buddha Statue). Visit iconic Key Gompa and Chicham Bridge. Return to Kaza for dinner and stay.'
      },
      {
        dayNumber: 'DAY 5',
        title: 'KAZA TO CHANDRATAL LAKE',
        description: 'Breakfast, check out. Drive towards Kunzum Pass and trek 1 km to the sacred Chandratal Lake. Check in to Swiss tents. Dinner and stay under the gaze of a million stars and the Milky Way.'
      },
      {
        dayNumber: 'DAY 6',
        title: 'CHANDRATAL TO MANALI',
        description: 'Drive along rugged Batal-Gramphu route, cross Atal Tunnel, and reach Manali by evening. Dinner and stay in Manali.'
      },
      {
        dayNumber: 'DAY 7',
        title: 'EXPLORING MANALI & DEPARTURE',
        description: 'Explore Hadimba Devi Temple, Old Manali, Mall Road. Evening departure to Delhi.'
      },
      {
        dayNumber: 'DAY 8',
        title: 'ARRIVAL IN DELHI',
        description: 'Early morning arrival in Delhi with lifelong mountain memories.'
      }
    ],
    inclusions: [
      'Accommodation for 6 nights (1N Chitkul, 1N Tabo, 2N Kaza, 1N Chandratal Camp, 1N Manali)',
      'Transportation from Delhi to Delhi in high-clearance vehicle',
      'Meals: 6 Breakfasts and 6 Dinners',
      'Hot water facility & Swiss tents at Chandratal',
      'Trip Captain throughout the journey',
      'All inner line permits, driver allowances, toll taxes & parking'
    ],
    exclusions: [
      'Travel or medical insurance',
      'Lunch and meals not mentioned',
      'Monument and monastery entry fees',
      '4x4 vehicle cost in case of heavy unseasonal snow'
    ],
    thingsToPack: [
      'Day backpack (20-30 Ltrs)',
      '1 Heavy Down Jacket & Thermals',
      'Waterproof outdoor trekking shoes',
      'Woolen cap, gloves, sunscreen, lip balm',
      'Government ID proof (Aadhar Card/Passport)'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank',
      upiId: '8676928509@pthdfc',
      notes: 'Book seat with ₹2,000/- advance per person. Remaining balance before boarding.'
    },
    termsAndConditions: [
      'Advance amount is non-refundable.',
      'Air conditioning switched off in hills.',
      'Weather conditions may alter routes for safety.'
    ],
    cancellationPolicy: [
      '1 week before: 50% cancellation fee',
      'On day of departure: 75% fee',
      'No show: 100% non-refundable'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['Noida (Corporate Office)', 'New Delhi', 'Kaza']
  },

  // 6. JIBHI TIRTHAN (2N/3D)
  'jibhi-tirthan': {
    id: 'jibhi-tirthan',
    code: 'SW-JBH-06',
    title: 'JIBHI - JALORI - TIRTHAN VALLEY',
    subtitle: 'The Secret Himalayan Getaway You Have Been Dreaming Of',
    destination: 'Tirthan Valley & Jibhi, Himachal Pradesh',
    duration: '2N / 3D (4 Days Total)',
    pickupPoints: ['Delhi', 'Chandigarh'],
    startingPrice: '₹6,499/- Per Person',
    sharingPrices: {
      triple: '₹ 6,499/- PP',
      double: '₹ 7,499/- PP'
    },
    advanceBookingAmount: 'INR 2,000/- per person',
    highlights: [
      'Explore picturesque Jibhi Waterfall & Mini Thailand rock lagoon',
      'Trek to ancient Raghupur Fort with 360° panoramic views of Kullu & Mandi',
      'Cross scenic Jalori Pass at 3,100 meters altitude',
      'Choiee Waterfall trek in pristine Tirthan Valley alongside trout streams',
      'Cozy riverside homestay, bonfire night with acoustic music'
    ],
    routeSummary: [
      'Day 0: Departure from Delhi / Chandigarh overnight',
      'Day 1: Jibhi Waterfall & Mini Thailand - Cafe Hopping - Bonfire & Music',
      'Day 2: Jalori Pass via Shoja - Raghupur Fort Trek - Back to Stay',
      'Day 3: Reach Tirthan - Choiee Waterfall Trek - Evening Departure',
      'Day 4: Reach back Delhi during early morning'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 0',
        title: 'DEPARTURE TO JIBHI',
        description: 'Departure in the evening to Jibhi. Assemble at pickup point. Introduction to team captain and group. Overnight drive.'
      },
      {
        dayNumber: 'DAY 1',
        title: 'JIBHI EXPLORATION & MINI THAILAND',
        description: 'Reach Jibhi in the morning, check in. By noon leave for Jibhi Waterfall and Mini Thailand rock canyon. Spend peaceful moments by the river. Evening bonfire with light music. Dinner and overnight stay.'
      },
      {
        dayNumber: 'DAY 2',
        title: 'SHOJA, JALORI PASS & RAGHUPUR FORT TREK',
        description: 'Early start with breakfast. Depart for Jalori Pass (3,100m) through alpine Shoja village. Begin the trek to Raghupur Fort for a breathtaking 360° view of snow peaks. Return to stay. Dinner and overnight stay.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'TIRTHAN VALLEY CHOIEE WATERFALL & DEPARTURE',
        description: 'Breakfast, check out. Head to Tirthan Valley for the refreshing Choiee Waterfall hike through dense deodar forests. Evening departure for Delhi/Chandigarh.'
      },
      {
        dayNumber: 'DAY 4',
        title: 'ARRIVAL IN DELHI',
        description: 'Arrive in Delhi early morning with refreshed mind and unforgettable memories.'
      }
    ],
    inclusions: [
      '2-Night Hotel / Riverside homestay in Jibhi-Tirthan',
      '4 Meals (2 Breakfast + 2 Dinner)',
      'Transfer to/from in AC Vehicle Tempo Traveller / Bus depending on group size',
      'All sightseeing mentioned in the itinerary',
      'Bonfire & Music party in evening',
      'Dedicated Tour Curator throughout'
    ],
    exclusions: [
      '5% GST',
      'Early check-in at stay',
      'Any entry tickets to viewpoints',
      '4x4 vehicle cost (in case of winter snow block)',
      'Personal expenses & lunch'
    ],
    thingsToPack: [
      'Down Jacket / Fleece Jacket',
      'Thermals & Warm Socks',
      'Running / Outdoor Shoes with good tread',
      'Daypack & Water Bottle',
      'Original Government ID proof'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank Ltd',
      upiId: '8676928509@pthdfc',
      notes: 'Book seat by depositing ₹2,000/- per person. Balance before boarding.'
    },
    termsAndConditions: [
      'Advance amount is non-refundable.',
      'Full payment required before trip begins.',
      'Air conditioning switched off in hills.'
    ],
    cancellationPolicy: [
      'Advance deposit non-refundable.',
      'Cancellation 7 days prior: 50% refund on balance.',
      '0-3 days prior: 0% refund.'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['Noida (Corporate Office)', 'New Delhi', 'Jibhi']
  },

  // 7. YULLA KANDA (2N/3D)
  'yulla-kanda': {
    id: 'yulla-kanda',
    code: 'SW-YLK-07',
    title: 'YULLA KANDA TREK: WORLD HIGHEST KRISHNA TEMPLE',
    subtitle: 'Mystical 12,000 Ft Holy Lake & Pandava Temple Trek',
    destination: 'Kinnaur, Himachal Pradesh',
    duration: '2N / 3D (Delhi to Delhi)',
    pickupPoints: ['Delhi', 'Chandigarh', 'Shimla'],
    startingPrice: '₹ 6,500/- Per Person',
    sharingPrices: {
      triple: '₹ 6,500/- PP',
      double: '₹ 7,500/- PP'
    },
    advanceBookingAmount: 'INR 2,000/- per person',
    highlights: [
      'Trek to the highest Krishna Temple in the world situated at 12,000 ft',
      'Sacred glacial lake constructed by Pandavas during their exile',
      'Witness the unique floating Kinnauri cap Janmashtami tradition',
      'Authentic traditional Pahadi homestay meal in Yulla Khas village',
      'Night camping under pristine star-studded skies at base camp'
    ],
    routeSummary: [
      'Day 0: Drive from Delhi to Yulla Khas village via Chandigarh & Shimla',
      'Day 1: Shimla to Yulla Kanda (Overnight Stay in Homestay)',
      'Day 2: Yulla Kanda to Krishna Temple (Overnight Camp Stay)',
      'Day 3: Krishna Temple to Yulla Khas and Shimla Drop | Night drive to Delhi'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 0',
        title: 'DELHI DEPARTURE',
        description: 'Drive from Delhi to Yulla Khas village via Chandigarh & Shimla in private tourist transport.'
      },
      {
        dayNumber: 'DAY 1',
        title: 'SHIMLA TO YULLA KANDA HOMESTAY',
        description: 'Depart from Shimla to Yulla Kanda (approx 4-5 hours drive). Arrive at Yulla Kanda by early afternoon. Check in to pre-booked homestay. Village walk, discover Kinnauri culture, relax and enjoy authentic Himachali meal with bonfire.'
      },
      {
        dayNumber: 'DAY 2',
        title: 'YULLA KANDA TO KRISHNA TEMPLE (CAMP STAY)',
        description: 'Morning breakfast. Hike to Krishna Temple (6-7 hours moderate trek). Reach the highest Krishna temple in the world at 12,000 ft with pristine lake. Set up camping gear, campfire dinner, and stargazing.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'DESCENT & RETURN TO DELHI',
        description: 'Breakfast during sunrise descent. Trek back to Yulla Kanda. Lunch and rest. Drive back to Shimla by evening, followed by overnight drive back to Delhi.'
      }
    ],
    inclusions: [
      'Transportation: All applicable transportation Delhi-Delhi, sightseeing & tolls included',
      'Meals: 2 Breakfasts and 2 Dinners (wholesome Pahadi food)',
      'Guidance: Cool Trip Captain to lead and assist throughout the trek',
      'Accommodations: 1 Night in hotel at Tapri + 1 Night camping at Base Camp',
      'Support: 24/7 customer support throughout trip'
    ],
    exclusions: [
      'Medical or evacuation expense',
      'Extra days stay/food in case of delay (₹3000/day)',
      'Personal expenses & items not mentioned in inclusions'
    ],
    thingsToPack: [
      'Backpack 60 Ltrs with rain cover',
      'Full sleeve sweater, windproof jacket, thermals',
      'High-ankle trekking shoes with grip',
      'Cap, balaclava, sunglasses & trekking poles',
      'Original ID Proof & 2 Photographs'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank',
      upiId: '8676928509@pthdfc',
      notes: 'Confirm with ₹2,000/- advance. Remaining amount collected upon arrival.'
    },
    termsAndConditions: [
      'Trekking involves high altitude risks; follow team captain instructions.',
      'Air conditioning switched off in hill driving.'
    ],
    cancellationPolicy: [
      '30 days before: 25% fee',
      '15-30 days before: 50% fee',
      '0-15 days before: 100% cancellation fee'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['Noida (Corporate Office)', 'New Delhi', 'Tapri']
  },

  // 8. UDAIPUR & MOUNT ABU (2N/3D)
  'udaipur': {
    id: 'udaipur',
    code: 'SW-UDP-08',
    title: 'UDAIPUR & MOUNT ABU TOUR PACKAGE',
    subtitle: 'The City of Lakes, Royal Palaces & Aravalli Hills',
    destination: 'Udaipur & Mount Abu, Rajasthan',
    duration: '2 Nights | 3 Days (5 Days Total)',
    pickupPoints: ['Delhi NCR', 'Gurugram', 'Jaipur'],
    startingPrice: '₹ 6,500/- Per Person',
    sharingPrices: {
      triple: '₹ 6,500/- PP',
      double: '₹ 7,500/- PP'
    },
    advanceBookingAmount: 'INR 2,000/- per person',
    highlights: [
      'Sunset views at Lake Pichola & historic City Palace heritage tour',
      'Jagdish Temple, Gangaur Ghat & Dharohar folk art at Bagore Ki Haveli',
      'Mount Abu excursion: Nakki Lake boat ride & Dilwara Jain Temples',
      'Panoramic trek to Bahubali Hills overlooking pristine Badi Lake',
      'Saheliyon Ki Bari royal fountains & Fateh Sagar Lake street food'
    ],
    routeSummary: [
      'Day 1: Departure to Udaipur | Overnight Journey from Delhi/Gurugram',
      'Day 2: Reach Udaipur | Bahubali Hills, Fateh Sagar Lake & Dinner Stay',
      'Day 3: Reach Mt Abu | Nakki Lake, Dilwara Temple & Back to Udaipur',
      'Day 4: City Palace, Lake Pichola, Jagdish Temple | Evening Departure',
      'Day 5: Reach back to Delhi early morning'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 1',
        title: 'DEPARTURE TO UDAIPUR',
        description: 'Departure in AC Deluxe vehicle from Delhi/Gurugram. Overnight journey to Udaipur with dinner stop.'
      },
      {
        dayNumber: 'DAY 2',
        title: 'UDAIPUR ARRIVAL & SIGHTSEEING',
        description: 'Reach Udaipur, check in at hotel, relax and freshen up. Leave for sightseeing: Lake Pichola, Jagdish Temple, Gangaur Ghat. In evening enjoy culture & folk art performance at Bagore Ki Haveli (7-8 PM) or flea market. Dinner and stay at hotel.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'MOUNT ABU DAY EXCURSION',
        description: 'Breakfast, drive to Mount Abu (4-5 hrs). Visit Nakki Lake, world-famous Dilwara Jain marble temples, and Mount Abu Mall Road. Return to Udaipur in evening for dinner and overnight stay.'
      },
      {
        dayNumber: 'DAY 4',
        title: 'BAHUBALI HILLS, CITY PALACE & DEPARTURE',
        description: 'Visit Bahubali Hills Badi Lake, Saheliyon Ki Bari, and Fateh Sagar Lake. Explore City Palace and local Rajasthani cuisine. Depart back to Delhi by 6:00 PM.'
      },
      {
        dayNumber: 'DAY 5',
        title: 'ARRIVAL IN DELHI',
        description: 'Reach Delhi/Gurugram early morning with royal palace memories.'
      }
    ],
    inclusions: [
      'Accommodation (2-Night hotel stay in Udaipur)',
      '4 Meals (2 Breakfast + 2 Dinner)',
      'All transportation and sightseeing to/from Gurugram in AC vehicle',
      'Sightseeing as mentioned in itinerary',
      'Tour Curator'
    ],
    exclusions: [
      'Entrance fees of any monument or activity during sightseeing',
      'GST (5%) extra on booking prices',
      'Personal expenses & lunch',
      'Early check-in subject to availability'
    ],
    thingsToPack: [
      'Comfortable cotton wear and light jacket for evenings',
      'Walking shoes for palace courtyards & Bahubali hill',
      'Sun hat, sunglasses & camera',
      'Government ID card'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank',
      upiId: '8676928509@pthdfc',
      notes: 'Book seat with ₹2,000/- advance per person. Rest paid while boarding.'
    },
    termsAndConditions: [
      'Advance amount is non-refundable.',
      'Full payment required before trip begins.',
      'ID verification mandatory before boarding.'
    ],
    cancellationPolicy: [
      'Full refund if cancelled 30 days prior.',
      '50% refund 15-30 days prior.',
      'No refund 0-7 days prior.'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['Noida (Corporate Office)', 'New Delhi', 'Udaipur']
  },

  // 9. CHOPTA TUNGNATH CHANDRASHILA (2N/3D)
  'chopta-tungnath': {
    id: 'chopta-tungnath',
    code: 'SW-CPT-09',
    title: 'TUNGNATH & CHANDRASHILA TREK',
    subtitle: 'Where Lord Shiva Reigns Eternal (Highest Shiva Temple at 12,000 Ft)',
    destination: 'Chopta, Uttarakhand',
    duration: '2N 3D (4 Days Total)',
    pickupPoints: ['Delhi', 'Haridwar', 'Rishikesh'],
    startingPrice: '₹ 5,999/- Per Person',
    sharingPrices: {
      triple: '₹ 5,999/- PP',
      double: '₹ 6,999/- PP'
    },
    advanceBookingAmount: 'INR 2,000/- per person',
    highlights: [
      'Trek to Tungnath Temple - Highest Shiva Temple in the world (12,000 ft)',
      'Summit Chandrashila Peak (13,000 ft) for 360° views of Nanda Devi & Chaukhamba',
      'Emerald alpine waters of Deoria Tal lake with reflection of Chaukhamba peaks',
      'Experience pristine meadows of Chopta (Mini Switzerland of Uttarakhand)',
      'Visit holy Sangam at Devprayag & Dhari Devi temple in Srinagar'
    ],
    routeSummary: [
      'Day 0: Delhi to Sari Village (Hotel/Camp) overnight journey',
      'Day 1: Sari Village (Deoria Taal Trek 2.5 km) & Homestay stay',
      'Day 2: Sari Village - Chopta - Tungnath (3.5 km) - Chandrashila Summit',
      'Day 3: Chopta - Rishikesh - Delhi (Early Morning Arrival)'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 0',
        title: 'DELHI TO SARI VILLAGE OVERNIGHT',
        description: 'Depart from Delhi, Haridwar & Rishikesh in comfortable tempo traveler. Overnight road journey through the foothills.'
      },
      {
        dayNumber: 'DAY 1',
        title: 'SARI VILLAGE & DEORIA TAL TREK',
        description: 'Reach Rishikesh morning, drive to Sari with Devprayag Sangam stopover. Reach Sari village homestay. Trek 2.5 km to Deoria Tal alpine lake. Descend back to Sari for hot dinner and rest.'
      },
      {
        dayNumber: 'DAY 2',
        title: 'CHOPTA, TUNGNATH & CHANDRASHILA SUMMIT',
        description: 'Early morning breakfast. Drive to Chopta base. Trek 3.5 km to highest Shiva temple Tungnath. Continue to the breathtaking Chandrashila Peak (13,000 ft). Soak in views of Kedarnath, Chaukhamba, Trishul. Descend to Chopta for campfire dinner.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'RISHIKESH & RETURN TO DELHI',
        description: 'Morning breakfast with mountain panorama. Visit Omkareshwar temple in Ukhimath and Dhari Devi temple. Evening reach Rishikesh and continue onward journey to Delhi.'
      }
    ],
    inclusions: [
      'Comfortable stay in hygienic homestay / tents in Chopta & Sari',
      'Meals: 2 Breakfasts and 2 Dinners',
      'Group transfers for sightseeing in Taxi/SUV/Tempo Traveller',
      'Experienced Driver & Mountain Guide / Trek Leader',
      'Complimentary Trek Completion Certificate & Goodies',
      'All permits & tolls'
    ],
    exclusions: [
      'Fee for optional activities & personal expenses',
      'Travel insurance of medical emergencies',
      'Packaged drinking water bottles & room heaters'
    ],
    thingsToPack: [
      'Warm fleece jacket & heavy winter coat',
      'Water resistant trekking pants & thermals',
      'Comfortable waterproof trekking shoes with thick sole',
      'Woolen cap, gloves, woolen socks & daypack',
      'Personal basic medical kit & Photo ID'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank',
      upiId: '8676928509@pthdfc',
      notes: 'Deposit ₹2,000/- per person advance. Full payment before boarding.'
    },
    termsAndConditions: [
      'Advance amount is strictly non-refundable.',
      'Seating in vehicle is organized by trip coordinator.',
      'AC switched off during hill climbs.'
    ],
    cancellationPolicy: [
      '1 week prior: 50% cancellation fee',
      'Day of departure: 75% fee',
      'No show: 100% non-refundable'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['Dehradun (Head Office)', 'Noida (Corporate Office)', 'New Delhi', 'Rishikesh']
  },

  // 10. MCLEODGANJ & TRIUND TREK (2N/3D)
  'mcleodganj': {
    id: 'mcleodganj',
    code: 'SW-MLG-10',
    title: 'MCLEODGANJ & TRIUND TREK',
    subtitle: 'With Dharamshala, Dalai Lama Temple & Starlit Ridge Camping',
    destination: 'McLeodganj & Triund, Himachal Pradesh',
    duration: '2N/3D (4 Days Total)',
    pickupPoints: ['Delhi', 'Chandigarh'],
    startingPrice: '₹ 6,500/- Per Person',
    sharingPrices: {
      quad: 'RS 6,500/- PER PERSON',
      triple: 'RS 7,000/- PER PERSON',
      double: 'RS 7,500/- PER PERSON'
    },
    advanceBookingAmount: 'INR 3,000/- per person',
    highlights: [
      'Trek to Triund Top (9,350 ft) with surreal views of Dhauladhar snow wall',
      'Overnight camping under the stars on the mountain ridge with bonfire',
      'Visit Dalai Lama Monastery (Tsuglagkhang Complex) & Tibet Museum',
      'Explore Bhagsu Waterfall, Shiva Cafe & vibrant McLeodganj flea market',
      'Scenic stopover at Dharamshala International Cricket Stadium & Tea Gardens'
    ],
    routeSummary: [
      'Day 0: Departure from Delhi | Chandigarh overnight',
      'Day 1: McLeodganj Sightseeing - Bhagsu Waterfall - Cafe Hopping',
      'Day 2: Trek from Bhagsu to Triund Top (9 km) - Camping under the Stars',
      'Day 3: Trek Down - Dharamshala Exploration - Evening Departure',
      'Day 4: Reach back Delhi during early morning'
    ],
    itinerary: [
      {
        dayNumber: 'DAY 0',
        title: 'DEPARTURE TO MCLEODGANJ',
        description: 'Departure in the evening from Delhi / Chandigarh. Assemble at pickup point. Team captain introduction. Halt for dinner (not included). Overnight journey.'
      },
      {
        dayNumber: 'DAY 1',
        title: 'MCLEODGANJ EXPLORATION & CAFES',
        description: 'Reach McLeodganj in morning, check in to hotel. Freshen up and rest. Explore McLeodganj flea market, Bhagsu Waterfall, and iconic mountain cafes. Return to hotel for delicious dinner and overnight stay.'
      },
      {
        dayNumber: 'DAY 2',
        title: 'TRIUND TREK & RIDGE CAMPING',
        description: 'Breakfast at hotel. Start scenic 9 km trek to Triund Top (9,350 ft). Enjoy close-up views of the colossal Dhauladhar mountain range and Kangra valley. Check in to alpine tents, enjoy bonfire and music party under the stars. Dinner and overnight stay in camp.'
      },
      {
        dayNumber: 'DAY 3',
        title: 'DHARAMSHALA SIGHTSEEING & DEPARTURE',
        description: 'Wake up to glorious mountain sunrise. Trek down to McLeodganj. Visit Dalai Lama Monastery, HPCA Dharamshala Cricket Stadium, and lush tea gardens. Evening departure to Delhi.'
      },
      {
        dayNumber: 'DAY 4',
        title: 'ARRIVAL IN DELHI',
        description: 'Reach back Delhi early morning with a heart full of memories.'
      }
    ],
    inclusions: [
      '1-Night hotel stay in McLeodganj and 1-Night camp stay in Triund',
      '4 Meals (2 Breakfast + 2 Dinner)',
      'Transfer to/from in AC Deluxe Vehicle',
      'All sightseeing mentioned in itinerary',
      'Bonfire and music party in camp',
      'Experienced Tour Curator & Trek Captain'
    ],
    exclusions: [
      'GST (5%) extra on booking prices',
      'Early check-in at stay',
      'Monument entry fees',
      'Personal expenses & lunch'
    ],
    thingsToPack: [
      'Down Jacket / Main Warm Jacket',
      'Thermals (Upper & Lower)',
      'Outdoor shoes with sturdy grip',
      'Daypack, gloves, sunglasses',
      'Valid Government Photo ID'
    ],
    paymentDetails: {
      accountName: 'Sky Wander Holidays',
      accountHolder: 'Ritesh Kumar',
      bankName: 'Kotak Mahindra Bank',
      upiId: '8676928509@pthdfc',
      notes: 'Deposit ₹3,000/- advance per person. Remaining balance within 24 hrs before boarding.'
    },
    termsAndConditions: [
      'Advance amount is non-refundable.',
      'Full payment required before trip begins.',
      'Air conditioning switched off in hill terrain.'
    ],
    cancellationPolicy: [
      '1 week before: 50% of trip cost',
      'Day of departure: 75% fee',
      'No show: 100% non-refundable'
    ],
    contactNumber: '+91 8676928509',
    contactEmail: 'Skywander6@gmail.com',
    website: 'www.skywanderholidays.com',
    offices: ['Noida (Corporate Office)', 'New Delhi', 'Dharamshala']
  }
};

// Helper to map any package id, slug, or title to its exact brochure
export function getBrochureForPackage(packageIdOrTitle: string): DestinationBrochure | null {
  const query = (packageIdOrTitle || '').toLowerCase();
  
  if (query.includes('keda') || query.includes('swh-kedarnath')) return DESTINATION_BROCHURES['kedarnath'];
  if (query.includes('sangla') || query.includes('holi')) return DESTINATION_BROCHURES['sangla-holi'];
  if (query.includes('megha') || query.includes('shillong') || query.includes('cherra')) return DESTINATION_BROCHURES['meghalaya'];
  if (query.includes('manali') || query.includes('kasol')) return DESTINATION_BROCHURES['manali'];
  if (query.includes('spiti') || query.includes('kaza') || query.includes('chandratal')) return DESTINATION_BROCHURES['spiti-circuit'];
  if (query.includes('jibhi') || query.includes('tirthan') || query.includes('jalori')) return DESTINATION_BROCHURES['jibhi-tirthan'];
  if (query.includes('yulla') || query.includes('kanda')) return DESTINATION_BROCHURES['yulla-kanda'];
  if (query.includes('udai') || query.includes('abu') || query.includes('pichola')) return DESTINATION_BROCHURES['udaipur'];
  if (query.includes('chopta') || query.includes('tungnath') || query.includes('chandras')) return DESTINATION_BROCHURES['chopta-tungnath'];
  if (query.includes('mcleod') || query.includes('triund') || query.includes('dharamshala')) return DESTINATION_BROCHURES['mcleodganj'];

  // Default fallback to Spiti or Kedarnath
  return DESTINATION_BROCHURES['kedarnath'];
}
