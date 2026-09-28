import { BookingInquiry } from '../types';

export interface BookingItem extends BookingInquiry {
  destination: string;
  duration: string;
  cabType: string;
  advancePaid: number;
  paymentStatus: 'Advance Received (100% Protected)' | 'Paid in Full' | 'Pay on Arrival (Token Done)';
  tripStatus: 'Confirmed' | 'Voucher Issued' | 'In Progress' | 'Completed' | 'Pending Confirmation';
  assignedManager: string;
  managerPhone: string;
  driverName?: string;
  driverPhone?: string;
  cabVehicleNumber?: string;
  hotelAssigned?: string;
  brochureSlug?: string;
}

export const INITIAL_SAMPLE_BOOKINGS: BookingItem[] = [
  {
    id: 'SWH-IND-849201',
    fullName: 'Shubham Dutt',
    phone: '8676928509',
    email: 'shubham.travel@skywander.in',
    packageId: 'kashmir-paradise-special',
    packageTitle: 'Kashmir Paradise: Srinagar, Gulmarg & Pahalgam',
    destination: 'Srinagar, Gulmarg, Pahalgam, Sonamarg (Kashmir)',
    travelDate: '2026-10-14',
    duration: '6 Days / 5 Nights',
    adultsCount: 2,
    childrenCount: 1,
    departureCity: 'Delhi / NCR',
    hotelCategory: 'Deluxe 4★ (Dal Lake Houseboat + Gulmarg Resort)',
    hotelAssigned: 'Grand Mumtaz Resort Gulmarg & Royal Heritage Houseboat Nigeen',
    includeFlights: true,
    includeCab: true,
    cabType: 'Dedicated Private AC Innova Crysta with Chauffeur',
    driverName: 'Bashir Ahmed (Verified Tourist Chauffeur)',
    driverPhone: '+91 94190 88214',
    cabVehicleNumber: 'JK 01 AK 4821',
    assignedManager: 'Rohit Sharma (Senior North India Head)',
    managerPhone: '+91 86769 28509',
    specialRequests: 'Honeymoon flower decor on Day 1 houseboat and Shikara ride at sunset included.',
    estimatedTotal: 34500,
    advancePaid: 15000,
    status: 'Confirmed',
    tripStatus: 'Voucher Issued',
    paymentStatus: 'Advance Received (100% Protected)',
    createdAt: '2026-09-20T10:15:00Z',
    brochureSlug: 'kashmir-paradise'
  },
  {
    id: 'SWH-IND-849202',
    fullName: 'Shubham Dutt',
    phone: '8676928509',
    email: 'shubham.travel@skywander.in',
    packageId: 'kedarnath-badrinath-yatra',
    packageTitle: 'Kedarnath Dham & Badrinath Sacred Do Dham Yatra',
    destination: 'Haridwar, Guptkashi, Kedarnath, Badrinath, Rishikesh',
    travelDate: '2026-10-28',
    duration: '4 Days / 3 Nights',
    adultsCount: 3,
    childrenCount: 0,
    departureCity: 'Haridwar Junction',
    hotelCategory: 'Deluxe Himalayan Retreat & Temple Camps',
    hotelAssigned: 'Kedar Valley Eco Cottages Guptkashi & GMVN Kedarnath',
    includeFlights: false,
    includeCab: true,
    cabType: 'Private AC Commercial Innova (Hill Certified)',
    driverName: 'Rameshwar Singh (Uttarakhand Hill Expert)',
    driverPhone: '+91 98371 45902',
    cabVehicleNumber: 'UK 07 TA 3190',
    assignedManager: 'Pooja Verma (Pilgrimage Coordinator)',
    managerPhone: '+91 86769 28509',
    specialRequests: 'VIP Darshan token slot pre-booked for Kedarnath and evening Ganga Aarti in Rishikesh.',
    estimatedTotal: 29500,
    advancePaid: 10000,
    status: 'Confirmed',
    tripStatus: 'Confirmed',
    paymentStatus: 'Advance Received (100% Protected)',
    createdAt: '2026-09-22T14:30:00Z',
    brochureSlug: 'kedarnath-dham-yatra'
  },
  {
    id: 'SWH-IND-921405',
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul.sharma88@gmail.com',
    packageId: 'goa-beach-bliss',
    packageTitle: 'Goa Coastal Bliss: North & South Beaches with Sunset Cruise',
    destination: 'Calangute, Baga, Candolim, Panjim & Dudhsagar',
    travelDate: '2026-11-05',
    duration: '4 Days / 3 Nights',
    adultsCount: 2,
    childrenCount: 0,
    departureCity: 'Mumbai Airport',
    hotelCategory: '4★ Luxury Beachfront Boutique Resort',
    hotelAssigned: 'Acron Waterfront Resort Baga & Heritage Panjim Villa',
    includeFlights: false,
    includeCab: true,
    cabType: 'Private AC Dzire / Swift with Unlimited City Sightseeing',
    driverName: 'Anthony D’Souza',
    driverPhone: '+91 98221 66190',
    cabVehicleNumber: 'GA 03 T 7781',
    assignedManager: 'Deepak Joshi (Coastal Travel Desk)',
    managerPhone: '+91 86769 28509',
    specialRequests: 'Mandovi river sunset luxury catamaran cruise vouchers included.',
    estimatedTotal: 23999,
    advancePaid: 12000,
    status: 'Confirmed',
    tripStatus: 'Voucher Issued',
    paymentStatus: 'Advance Received (100% Protected)',
    createdAt: '2026-09-23T11:20:00Z',
    brochureSlug: 'goa-coastal-bliss'
  },
  {
    id: 'SWH-IND-921406',
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul.sharma88@gmail.com',
    packageId: 'manali-solang-kasol',
    packageTitle: 'Manali, Solang Valley & Kasol Riverside Escapade',
    destination: 'Kullu, Manali, Solang Valley, Atal Tunnel, Kasol',
    travelDate: '2026-12-18',
    duration: '5 Days / 4 Nights',
    adultsCount: 4,
    childrenCount: 0,
    departureCity: 'Chandigarh / Delhi',
    hotelCategory: 'Apple Orchard Cottages & 4★ Manali View Suites',
    hotelAssigned: 'Solang Valley Resort & Apple Country Retreat Manali',
    includeFlights: false,
    includeCab: true,
    cabType: 'Private AC Innova Crysta (Snow Chain Equipped)',
    driverName: 'Surinder Thakur',
    driverPhone: '+91 94182 11045',
    cabVehicleNumber: 'HP 01 B 9021',
    assignedManager: 'Rohit Sharma (Himachal Specialist)',
    managerPhone: '+91 86769 28509',
    specialRequests: 'Bonfire with light music night at Old Manali riverside camp.',
    estimatedTotal: 42000,
    advancePaid: 42000,
    status: 'Confirmed',
    tripStatus: 'Confirmed',
    paymentStatus: 'Paid in Full',
    createdAt: '2026-09-24T09:10:00Z',
    brochureSlug: 'manali-snow-adventure'
  },
  {
    id: 'SWH-IND-738192',
    fullName: 'Pooja Gupta',
    phone: '9810123456',
    email: 'pooja.gupta.design@gmail.com',
    packageId: 'kerala-backwaters-munnar',
    packageTitle: 'Enchanting Kerala: Munnar Tea Hills & Alleppey Luxury Houseboat',
    destination: 'Cochin, Munnar, Thekkady, Alleppey Backwaters',
    travelDate: '2026-10-22',
    duration: '5 Days / 4 Nights',
    adultsCount: 2,
    childrenCount: 1,
    departureCity: 'Bangalore',
    hotelCategory: '4★ Tea Plantation Resort & Air Conditioned Private Kettuvallam',
    hotelAssigned: 'Blanket Hotel & Spa Munnar + Rainbow Cruises Alleppey',
    includeFlights: false,
    includeCab: true,
    cabType: 'Dedicated Chauffeur Driven AC Sedan (Etios/Dzire)',
    driverName: 'Saji Mathew (English & Hindi Speaking Guide Chauffeur)',
    driverPhone: '+91 94471 23098',
    cabVehicleNumber: 'KL 04 AB 5512',
    assignedManager: 'Sunil Nair (South India Specialist)',
    managerPhone: '+91 86769 28509',
    specialRequests: 'Vegetarian Kerala Sadhya lunch on the houseboat.',
    estimatedTotal: 36000,
    advancePaid: 18000,
    status: 'Confirmed',
    tripStatus: 'Voucher Issued',
    paymentStatus: 'Advance Received (100% Protected)',
    createdAt: '2026-09-21T16:45:00Z',
    brochureSlug: 'kerala-backwaters'
  },
  {
    id: 'SWH-IND-619283',
    fullName: 'Vikram Singh Rathore',
    phone: '9711234567',
    email: 'vikram.rathore@outlook.com',
    packageId: 'ladakh-pangong-khardungla',
    packageTitle: 'Land of High Passes: Leh, Nubra Valley, Turtuk & Pangong Tso',
    destination: 'Leh, Khardung La, Nubra Valley, Turtuk, Pangong Lake',
    travelDate: '2026-10-08',
    duration: '6 Days / 5 Nights',
    adultsCount: 2,
    childrenCount: 0,
    departureCity: 'Leh Kushok Bakula Airport',
    hotelCategory: '4★ Leh Heritage Hotel & Luxury Glamping Dome at Pangong',
    hotelAssigned: 'The Grand Dragon Leh & Pangong Glamping Wooden Haven',
    includeFlights: false,
    includeCab: true,
    cabType: 'High Clearance 4x4 Mahindra Scorpio with Oxygen Cylinder',
    driverName: 'Stanzin Dorje (Ladakh Mountain Certified)',
    driverPhone: '+91 94691 77312',
    cabVehicleNumber: 'LA 02 6190',
    assignedManager: 'Tashi Namgyal (High Altitude Coordinator)',
    managerPhone: '+91 86769 28509',
    specialRequests: 'Inner Line Protected Area Permits (ILP) and Wildlife Fee pre-arranged.',
    estimatedTotal: 49500,
    advancePaid: 25000,
    status: 'Confirmed',
    tripStatus: 'Confirmed',
    paymentStatus: 'Advance Received (100% Protected)',
    createdAt: '2026-09-19T08:00:00Z',
    brochureSlug: 'ladakh-expedition'
  }
];

// Helper to normalize phone numbers (strip +91, 0, spaces, dashes)
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return '';
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(-10);
  }
  return digitsOnly.slice(-10);
}

// Local storage key for persistent bookings
const LOCAL_BOOKINGS_KEY = 'swh_persisted_bookings';

export function getLocalBookings(): BookingItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalBooking(booking: BookingItem): void {
  try {
    const existing = getLocalBookings();
    const updated = [booking, ...existing.filter(b => b.id !== booking.id)];
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save local booking:', err);
  }
}

// Get all bookings combined (Sample + Local + Optional Server)
export function getAllBookings(): BookingItem[] {
  const local = getLocalBookings();
  // Merge avoiding duplicates by ID
  const map = new Map<string, BookingItem>();
  local.forEach(b => map.set(b.id, b));
  INITIAL_SAMPLE_BOOKINGS.forEach(b => {
    if (!map.has(b.id)) {
      map.set(b.id, b);
    }
  });
  return Array.from(map.values());
}

// Get bookings for a specific phone number or ID (Strictly isolated by phone)
export function getBookingsByPhoneOrId(query: string): BookingItem[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const all = getAllBookings();
  const digitsOnly = trimmed.replace(/\D/g, '');
  const isPhoneQuery = digitsOnly.length >= 7;

  if (isPhoneQuery) {
    // STRICT PHONE MATCHING: Sirf usi number ki bookings dikhaye jo number enter ya click kiya gaya hai
    const targetLast10 = digitsOnly.slice(-10);
    return all.filter(booking => {
      const cleanBookingDigits = (booking.phone || '').replace(/\D/g, '');
      const bookingLast10 = cleanBookingDigits.slice(-10);
      return bookingLast10 === targetLast10;
    });
  }

  // If searching by Booking ID (e.g., SWH-IND-849201)
  const lowerTrimmed = trimmed.toLowerCase();
  return all.filter(booking => {
    const matchesId = booking.id.toLowerCase() === lowerTrimmed || booking.id.toLowerCase().includes(lowerTrimmed);
    return matchesId;
  });
}

// Quick demo numbers for test pills
export const POPULAR_DEMO_NUMBERS = [
  { phone: '8676928509', label: 'Office Test (+91 86769 28509)', name: 'Shubham Dutt', count: 2, badge: 'Official & Verified' },
  { phone: '9876543210', label: 'Rahul Sharma (+91 98765 43210)', name: 'Rahul Sharma', count: 2, badge: 'Goa & Manali' },
  { phone: '9810123456', label: 'Pooja Gupta (+91 98101 23456)', name: 'Pooja Gupta', count: 1, badge: 'Kerala Tour' },
  { phone: '9711234567', label: 'Vikram Singh (+91 97112 34567)', name: 'Vikram Singh', count: 1, badge: 'Ladakh Tour' }
];
