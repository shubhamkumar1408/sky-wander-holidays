import { TourPackage, DestinationInfo } from '../types';
import { DOMESTIC_PACKAGES } from '../data/packages';
import { DOMESTIC_DESTINATIONS } from '../data/destinations';

/**
 * Resolves any destination name, tag, or DestinationInfo into a full, rich TourPackage
 * with full day-by-day itinerary, inclusions, exclusions, hotels, and live booking/payment capabilities.
 */
export function resolveDestinationToPackage(destInput: string | DestinationInfo): TourPackage {
  const destName = typeof destInput === 'string' ? destInput.trim() : destInput.name.trim();
  const q = destName.toLowerCase();

  // 1. Direct match on ID or Title in DOMESTIC_PACKAGES
  const directMatch = DOMESTIC_PACKAGES.find(p => 
    p.id.toLowerCase() === q ||
    p.title.toLowerCase() === q ||
    p.slug.toLowerCase() === q
  );
  if (directMatch) return directMatch;

  // 2. Keyword match in DOMESTIC_PACKAGES
  const keywordMatch = DOMESTIC_PACKAGES.find(p => {
    const titleMatch = p.title.toLowerCase().includes(q) || q.includes(p.title.toLowerCase());
    const destsMatch = p.destinationsCovered.some(d => 
      d.toLowerCase().includes(q) || q.includes(d.toLowerCase())
    );
    const stateMatch = p.state.toLowerCase() === q;
    return titleMatch || destsMatch || stateMatch;
  });
  if (keywordMatch) return keywordMatch;

  // 3. Match from DOMESTIC_DESTINATIONS
  const destObj: DestinationInfo | undefined = typeof destInput === 'object' 
    ? destInput 
    : DOMESTIC_DESTINATIONS.find(d => 
        d.id.toLowerCase() === q || 
        d.name.toLowerCase() === q || 
        d.name.toLowerCase().includes(q) ||
        q.includes(d.name.toLowerCase())
      );

  if (destObj) {
    // Generate a complete, high-quality TourPackage representation
    return createPackageFromDestinationInfo(destObj);
  }

  // 4. Fallback default package
  return DOMESTIC_PACKAGES[0];
}

/**
 * Generates a full handcrafted TourPackage from a DestinationInfo object
 */
export function createPackageFromDestinationInfo(dest: DestinationInfo): TourPackage {
  const days = 5;
  const nights = 4;
  const basePrice = dest.startingPrice || 14999;
  const origPrice = Math.round(basePrice * 1.35);

  const itinerary = [
    {
      day: 1,
      title: `Arrival at ${dest.name} & Scenic Hotel Check-in`,
      description: `Arrive at the destination. Our verified tour executive will welcome you with traditional hospitality. Transfer to your pre-booked premium hotel / resort. Spend the evening relaxing and taking in the panoramic views.`,
      activities: [`Arrival transfer`, `Welcome drink & hotel check-in`, `Evening leisure stroll`],
      meals: 'Dinner Included',
      stay: `Handpicked 4★ Resort in ${dest.name}`
    },
    {
      day: 2,
      title: `${dest.topAttractions[0] || dest.name} Exploration & Sightseeing`,
      description: `After a hearty breakfast, set out in your private sanitized cab to explore ${dest.topAttractions[0] || 'the main attractions'}. Experience guided sightseeing, photography points, and local culinary delights.`,
      activities: dest.topAttractions.slice(0, 2),
      meals: 'Breakfast & Dinner',
      stay: `Handpicked 4★ Resort in ${dest.name}`
    },
    {
      day: 3,
      title: `Scenic Circuit: ${dest.topAttractions[1] || 'Hidden Gems'} & Cultural Heritage`,
      description: `Dive deeper into the beauty of ${dest.name}. Visit iconic monuments, nature viewpoints, and local artisan markets with personal assistance from your dedicated driver-guide.`,
      activities: dest.topAttractions.slice(2, 4).length > 0 ? dest.topAttractions.slice(2, 4) : ['Panoramic sightseeing', 'Local shopping & authentic lunch'],
      meals: 'Breakfast & Dinner',
      stay: `Handpicked 4★ Resort in ${dest.name}`
    },
    {
      day: 4,
      title: `Adventure & Sunset Moments at ${dest.topAttractions[2] || dest.name}`,
      description: `Engage in thrilling activities, leisurely photo walks, and picturesque sunset viewpoints. Experience local folklore, traditional music, and a celebratory evening dinner.`,
      activities: ['Sunset photography session', 'Local handicraft shopping', 'Bonfire / Special dinner'],
      meals: 'Breakfast & Dinner',
      stay: `Handpicked 4★ Resort in ${dest.name}`
    },
    {
      day: 5,
      title: `Memorable Farewell & Departure Transfer`,
      description: `Enjoy your final breakfast overlooking the picturesque landscape. Pack cherished memories as our private cab drops you off at the nearest airport or railway station for your journey home.`,
      activities: ['Morning breakfast', 'Souvenir shopping', 'Departure transfer'],
      meals: 'Breakfast Included',
      stay: 'Check-out'
    }
  ];

  return {
    id: dest.id || `dest-pkg-${dest.name.toLowerCase().replace(/\s+/g, '-')}`,
    slug: dest.name.toLowerCase().replace(/\s+/g, '-'),
    title: `${dest.name} Complete Holiday Circuit: Sightseeing, Stays & Cab`,
    state: dest.state,
    region: dest.region,
    destinationsCovered: [dest.name, ...dest.topAttractions.slice(0, 3)],
    durationDays: days,
    durationNights: nights,
    pricePerPerson: basePrice,
    originalPrice: origPrice,
    rating: 4.9,
    reviewsCount: 142 + (dest.packagesCount * 8),
    tag: dest.tag || 'Bestseller Destination',
    featured: true,
    theme: 'Family Vacation',
    heroImage: dest.image,
    gallery: [
      dest.image,
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    ],
    overview: dest.description || `Experience an unforgettable domestic holiday in ${dest.name}, ${dest.state}. Handcrafted itinerary with verified 3★/4★/5★ hotels, private sanitized chauffeur cabs, and 24x7 trip captain support.`,
    highlights: [
      ...dest.topAttractions,
      `Private AC Dedicated Chauffeur throughout`,
      `Verified 4★ Scenic Stays with Breakfast & Dinner`,
      `24x7 On-ground Sky Wander Tour Assistance`
    ],
    dayItinerary: itinerary,
    inclusions: [
      `4 Nights Accommodation in handpicked 4★ hotels / luxury camps / chalets`,
      `Buffet Breakfast & Dinner daily as specified in itinerary`,
      `Dedicated Private AC Cab (Innova Crysta / Ertiga / Sedan) for all transfers and sightseeing`,
      `Commercial vehicle permits, interstate taxes, toll charges, and driver allowances`,
      `All sightseeing points as per the day-by-day plan`,
      `24x7 Sky Wander Holidays dedicated trip coordinator support`
    ],
    exclusions: [
      `Airfare / Train tickets (Available as instant add-on)`,
      `Personal expenses (Laundry, Telephone calls, Room service)`,
      `Monument entry tickets, boating or adventure sports gear charges`,
      `Any item not explicitly mentioned in the inclusions list`,
      `5% GST as per government travel norms`
    ],
    bestTimeToVisit: dest.bestSeason || 'Throughout the year',
    hotelGrade: 'Deluxe 4★',
    pickupDropCity: `${dest.state} Airport / Railway Station`,
    cabType: 'Dedicated Private AC Sedan / Innova Crysta'
  };
}
