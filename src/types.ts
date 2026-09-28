export type IndiaRegion = 
  | 'North India'
  | 'South India'
  | 'West India'
  | 'East India'
  | 'North-East India'
  | 'Central India'
  | 'Islands & Beaches'
  | 'International Special';

export type TourTheme = 
  | 'All Themes'
  | 'Honeymoon Special'
  | 'Hill Stations & Snow'
  | 'Adventure & Trekking'
  | 'Spiritual & Pilgrimage'
  | 'Royal Heritage & Palaces'
  | 'Beach & Water Sports'
  | 'Wildlife Safari'
  | 'Family Vacation'
  | 'Weekend Gateways'
  | 'International Getaways';

export interface DayPlan {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string;
  stay: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  state: string;
  region: IndiaRegion;
  destinationsCovered: string[];
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  tag: string;
  featured?: boolean;
  theme: TourTheme;
  heroImage: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  dayItinerary: DayPlan[];
  inclusions: string[];
  exclusions: string[];
  bestTimeToVisit: string;
  hotelGrade: 'Standard 3★' | 'Deluxe 4★' | 'Luxury 5★' | 'Heritage Palace / Houseboat';
  pickupDropCity: string;
  cabType: string;
  trendingRank?: number;
}

export interface DestinationInfo {
  id: string;
  name: string;
  state: string;
  region: IndiaRegion;
  image: string;
  tag: string;
  packagesCount: number;
  startingPrice: number;
  bestSeason: string;
  avgTemp: string;
  topAttractions: string[];
  description: string;
}

export interface BookingInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  adultsCount: number;
  childrenCount: number;
  packageId?: string;
  packageTitle?: string;
  departureCity: string;
  hotelCategory: string;
  includeFlights: boolean;
  includeCab: boolean;
  specialRequests?: string;
  estimatedTotal: number;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Contacted';
}

export interface LiveBookingTicker {
  id: string;
  travelerName: string;
  fromCity: string;
  tourName: string;
  duration: string;
  timeAgo: string;
  travelers: number;
}

export interface TravelerReview {
  id: string;
  name: string;
  city: string;
  tour: string;
  rating: number;
  date: string;
  comment: string;
  image?: string;
  verified: boolean;
}

