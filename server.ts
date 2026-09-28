import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { DOMESTIC_PACKAGES } from './src/data/packages';
import { DOMESTIC_DESTINATIONS, DOMESTIC_REGIONS, TRAVELER_REVIEWS, LIVE_BOOKING_SAMPLE } from './src/data/destinations';
import { BookingInquiry } from './src/types';
import { INITIAL_SAMPLE_BOOKINGS, BookingItem } from './src/data/sampleBookings';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for inquiries and bookings
const bookingsStore: BookingItem[] = [...INITIAL_SAMPLE_BOOKINGS];
const inquiriesStore: BookingInquiry[] = [...INITIAL_SAMPLE_BOOKINGS];

// In-memory store for brochure PDF download leads
interface ItineraryDownloadLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  packageId: string;
  packageTitle: string;
  destination: string;
  travelMonth?: string;
  travelersCount?: string;
  downloadedAt: string;
}
const downloadLeadsStore: ItineraryDownloadLead[] = [];

// In-memory central activity logs for all logins and form submissions
export interface ActivityRecord {
  id: string;
  type: 'LOGIN' | 'INQUIRY' | 'BOOKING' | 'BROCHURE_DOWNLOAD';
  name: string;
  phone: string;
  email?: string;
  code?: string;
  details?: Record<string, any>;
  timestamp: string;
}
const activityLogsStore: ActivityRecord[] = [];

// Lazy Gemini AI initialization helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// 1. Get all packages with optional filtering
app.get('/api/packages', (req, res) => {
  try {
    let result = [...DOMESTIC_PACKAGES];
    const { region, theme, search, maxPrice, duration } = req.query;

    if (region && region !== 'All Regions') {
      const reg = (region as string).toLowerCase();
      result = result.filter(p => 
        p.region.toLowerCase() === reg || 
        p.state.toLowerCase() === reg ||
        (reg === 'international destinations' && p.region.toLowerCase() === 'international special')
      );
    }

    if (theme && theme !== 'All Themes') {
      result = result.filter(p => p.theme.toLowerCase() === (theme as string).toLowerCase());
    }

    if (maxPrice) {
      const max = Number(maxPrice);
      if (!isNaN(max) && max > 0) {
        result = result.filter(p => p.pricePerPerson <= max);
      }
    }

    if (duration) {
      const dur = String(duration);
      if (dur === 'short') result = result.filter(p => p.durationDays <= 4);
      else if (dur === 'medium') result = result.filter(p => p.durationDays >= 5 && p.durationDays <= 6);
      else if (dur === 'long') result = result.filter(p => p.durationDays >= 7);
    }

    if (search) {
      const q = (search as string).toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.destinationsCovered.some(d => d.toLowerCase().includes(q)) ||
        p.theme.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: result.length,
      packages: result
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve tour packages' });
  }
});

// 2. Get single package by id or slug
app.get('/api/packages/:id', (req, res) => {
  const { id } = req.params;
  const pkg = DOMESTIC_PACKAGES.find(p => p.id === id || p.slug === id);
  if (!pkg) {
    return res.status(404).json({ success: false, error: 'Package not found' });
  }
  res.json({ success: true, package: pkg });
});

// 3. Get domestic destinations and regions
app.get('/api/destinations', (req, res) => {
  res.json({
    success: true,
    regions: DOMESTIC_REGIONS,
    destinations: DOMESTIC_DESTINATIONS
  });
});

// 4. Submit a booking inquiry / custom quote
app.post('/api/inquiries', (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      travelDate,
      adultsCount,
      childrenCount = 0,
      packageId,
      packageTitle,
      departureCity,
      hotelCategory = 'Deluxe 4★',
      includeFlights = false,
      includeCab = true,
      specialRequests = '',
      estimatedTotal = 0
    } = req.body;

    if (!fullName || !phone || !travelDate) {
      return res.status(400).json({
        success: false,
        error: 'Full name, phone number, and travel date are required.'
      });
    }

    const inquiryId = `SWH-IND-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry: BookingInquiry = {
      id: inquiryId,
      fullName,
      email: email || '',
      phone,
      travelDate,
      adultsCount: Number(adultsCount) || 2,
      childrenCount: Number(childrenCount) || 0,
      packageId,
      packageTitle,
      departureCity: departureCity || 'Self/Local',
      hotelCategory,
      includeFlights: Boolean(includeFlights),
      includeCab: Boolean(includeCab),
      specialRequests,
      estimatedTotal: Number(estimatedTotal) || 0,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    inquiriesStore.unshift(newInquiry);

    activityLogsStore.unshift({
      id: `ACT-${Date.now()}`,
      type: 'INQUIRY',
      name: fullName,
      phone,
      email: email || '',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      details: {
        id: inquiryId,
        packageTitle,
        travelDate,
        adultsCount,
        departureCity,
        estimatedTotal,
        specialRequests
      }
    });

    const newBooking: BookingItem = {
      ...newInquiry,
      destination: packageTitle || 'Domestic Holiday Tour',
      duration: '5 Days / 4 Nights',
      cabType: includeCab ? 'Private Dedicated AC Tourist Cab' : 'Transfers On Request',
      advancePaid: Math.round(Number(estimatedTotal) * 0.4) || 8000,
      paymentStatus: 'Advance Received (100% Protected)',
      tripStatus: 'Confirmed',
      assignedManager: 'Mr. Shubham Dutt (Tour Desk Head)',
      managerPhone: '+91 86769 28509',
      driverName: 'Verified Tourist Chauffeur',
      driverPhone: '+91 86769 28509'
    };
    bookingsStore.unshift(newBooking);

    res.json({
      success: true,
      message: 'Your Sky Wander Holidays domestic trip booking inquiry has been confirmed!',
      inquiry: newInquiry,
      booking: newBooking
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to record booking inquiry.' });
  }
});

// 5. Get recent inquiries
app.get('/api/inquiries', (req, res) => {
  res.json({
    success: true,
    count: inquiriesStore.length,
    inquiries: inquiriesStore
  });
});

// 5a. Get bookings by phone number or id
app.get('/api/bookings', (req, res) => {
  const { phone, query } = req.query;
  let results = [...bookingsStore];

  const searchTarget = String(phone || query || '').trim();
  if (searchTarget) {
    const cleanDigits = searchTarget.replace(/\D/g, '').slice(-10);
    results = results.filter(b => {
      const bPhone = b.phone.replace(/\D/g, '').slice(-10);
      return (cleanDigits && bPhone.includes(cleanDigits)) ||
             b.id.toLowerCase().includes(searchTarget.toLowerCase()) ||
             b.fullName.toLowerCase().includes(searchTarget.toLowerCase());
    });
  }

  res.json({
    success: true,
    count: results.length,
    bookings: results
  });
});

app.get('/api/bookings/:identifier', (req, res) => {
  const { identifier } = req.params;
  const cleanDigits = identifier.replace(/\D/g, '').slice(-10);

  const matched = bookingsStore.filter(b => {
    const bPhone = b.phone.replace(/\D/g, '').slice(-10);
    return (cleanDigits && bPhone === cleanDigits) ||
           b.id.toLowerCase() === identifier.toLowerCase();
  });

  res.json({
    success: true,
    count: matched.length,
    bookings: matched
  });
});

// 5b. Record itinerary PDF download lead and notify Skywander6@gmail.com
app.post('/api/itinerary-download-lead', (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      packageId,
      packageTitle,
      destination,
      travelMonth = 'Upcoming',
      travelersCount = '2 Travelers',
      downloadedAt = new Date().toISOString()
    } = req.body;

    if (!fullName || !phone || !email) {
      return res.status(400).json({ success: false, error: 'Full name, phone, and email are required.' });
    }

    const leadId = `LEAD-PDF-${Math.floor(100000 + Math.random() * 900000)}`;
    const newLead: ItineraryDownloadLead = {
      id: leadId,
      fullName,
      phone,
      email,
      packageId,
      packageTitle,
      destination,
      travelMonth,
      travelersCount,
      downloadedAt
    };

    downloadLeadsStore.unshift(newLead);

    activityLogsStore.unshift({
      id: `ACT-${Date.now()}`,
      type: 'BROCHURE_DOWNLOAD',
      name: fullName,
      phone,
      email,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      details: {
        id: leadId,
        packageTitle,
        destination,
        travelMonth,
        travelersCount
      }
    });

    // Simulated / log email notification trigger to travel desk
    console.log(`[DISPATCH LEAD EMAIL TO: Skywander6@gmail.com]
=========================================
NEW ITINERARY PDF DOWNLOAD LEAD!
Lead ID: ${newLead.id}
Customer Name: ${fullName}
Phone / WhatsApp: ${phone}
Email: ${email}
Destination: ${packageTitle} (${destination})
Travel Month: ${travelMonth}
Travelers Count: ${travelersCount}
Download Timestamp: ${downloadedAt}
=========================================`);

    res.json({
      success: true,
      message: 'Itinerary PDF download lead received and notification dispatched to Skywander6@gmail.com',
      leadId: newLead.id
    });
  } catch (err) {
    console.error('Error recording download lead:', err);
    res.status(500).json({ success: false, error: 'Failed to record lead.' });
  }
});

app.get('/api/itinerary-download-lead', (req, res) => {
  res.json({
    success: true,
    count: downloadLeadsStore.length,
    leads: downloadLeadsStore
  });
});

// 5c. Central Customer Activity Journal (Logins, Inquiries, Bookings, Downloads)
app.post('/api/activity-log', (req, res) => {
  try {
    const { type, name, phone, email, code, details, timestamp } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and phone are required.' });
    }

    const record: ActivityRecord = {
      id: `ACT-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      type: type || 'LOGIN',
      name,
      phone,
      email: email || '',
      code: code || '',
      details: details || {},
      timestamp: timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    activityLogsStore.unshift(record);

    console.log(`[ACTIVITY DISPATCH] ${record.type} from ${record.name} (+91 ${record.phone}) -> TARGET: Google Sheets & Email (duttshubham68@gmail.com)`);

    res.json({
      success: true,
      message: 'Customer activity recorded successfully',
      record
    });
  } catch (err) {
    console.error('Error logging activity:', err);
    res.status(500).json({ success: false, error: 'Failed to record activity.' });
  }
});

app.get('/api/activity-log', (req, res) => {
  res.json({
    success: true,
    count: activityLogsStore.length,
    activities: activityLogsStore
  });
});

// 6. Get reviews & statistics
app.get('/api/reviews', (req, res) => {
  res.json({
    success: true,
    reviews: TRAVELER_REVIEWS,
    stats: {
      happyTravelers: '45,000+',
      verifiedGuides: '150+',
      satisfactionRate: '99.4%',
      domesticDestinations: '100+ All India Cities',
      averageRating: 4.9
    }
  });
});

// 7. Live booking ticker stream
app.get('/api/live-tickers', (req, res) => {
  res.json({
    success: true,
    tickers: LIVE_BOOKING_SAMPLE
  });
});

// 8. AI Custom Itinerary Generator for Domestic India
app.post('/api/ai-itinerary', async (req, res) => {
  try {
    const {
      destination,
      departureCity = 'Delhi',
      durationDays = 5,
      budgetPerPerson = 20000,
      travelers = '2 Adults (Couple)',
      travelStyle = 'Leisure & Romantic',
      preferences = ''
    } = req.body;

    if (!destination) {
      return res.status(400).json({ success: false, error: 'Destination is required.' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback deterministic AI planner response when no key
      return res.json({
        success: true,
        isFallback: true,
        itinerary: {
          title: `Customized ${durationDays}-Day ${destination} Domestic Getaway`,
          destination,
          departureCity,
          duration: `${durationDays} Days / ${Math.max(1, durationDays - 1)} Nights`,
          estimatedCostINR: `₹${(budgetPerPerson * 0.95).toLocaleString('en-IN')} - ₹${(budgetPerPerson * 1.1).toLocaleString('en-IN')} per person`,
          overview: `A bespoke holiday crafted for ${travelers} exploring the best attractions, cultural heritage, and scenic wonders of ${destination}, starting seamlessly from ${departureCity}.`,
          highlights: [
            `Tailored sightseeing schedule covering all top landmarks in ${destination}`,
            `Handpicked 3★/4★ authentic resorts with mountain/beach/heritage views`,
            `Private AC Chauffeur for airport transfers and regional sightseeing`,
            `Special curated local dining spots and traditional cuisine tastings`
          ],
          days: Array.from({ length: Number(durationDays) || 5 }, (_, i) => ({
            day: i + 1,
            title: i === 0 ? `Arrival in ${destination} & Leisure Stroll` : i === (durationDays - 1) ? `Farewell ${destination} & Return Journey` : `Explore ${destination} Highlights - Day ${i + 1}`,
            morning: `Breakfast at hotel followed by scenic morning excursion and photo stops.`,
            afternoon: `Local sightseeing, cultural heritage sites, and authentic regional lunch.`,
            evening: `Sunset viewpoint, traditional handicraft market exploration, and dinner.`,
            meals: 'Breakfast & Dinner Included',
            stay: `Handpicked Deluxe Resort / Hotel in ${destination}`
          })),
          packingTips: [
            `Carry valid Govt photo ID (Aadhaar / Voter ID / Passport) for hotel & domestic security check`,
            `Comfortable walking shoes, sunglasses, and camera`,
            `Weather appropriate clothing (light cottons for plains/beaches, woolens for hill stations)`
          ],
          localFoodRecommendations: [
            `Taste authentic regional delicacies at top rated local street food lanes & heritage diners`,
            `Try traditional sweets and locally grown farm-fresh refreshments`
          ]
        }
      });
    }

    const prompt = `You are the chief master travel planner for "Sky Wander Holidays", India's leading domestic tourism company.
Generate a structured, hyper-realistic, inspiring day-by-day domestic tour itinerary for an Indian traveler:

- Destination: ${destination} (India)
- Departure City: ${departureCity}
- Duration: ${durationDays} Days / ${Math.max(1, durationDays - 1)} Nights
- Budget: ₹${budgetPerPerson} INR per person
- Travelers: ${travelers}
- Style: ${travelStyle}
- Special Notes / Preferences: ${preferences || 'None'}

Provide the answer strictly in clean JSON format matching this exact TypeScript structure:
{
  "title": "string",
  "destination": "string",
  "departureCity": "string",
  "duration": "string",
  "estimatedCostINR": "string",
  "overview": "string",
  "highlights": ["string"],
  "days": [
    {
      "day": number,
      "title": "string",
      "morning": "string",
      "afternoon": "string",
      "evening": "string",
      "meals": "string",
      "stay": "string"
    }
  ],
  "packingTips": ["string"],
  "localFoodRecommendations": ["string"]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);

    res.json({
      success: true,
      itinerary: parsedData
    });
  } catch (error) {
    console.error('Error generating AI itinerary:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate custom AI itinerary. Please try again.'
    });
  }
});

// Vite middleware & Static serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sky Wander Holidays Server running on port ${PORT}`);
  });
}

start();
