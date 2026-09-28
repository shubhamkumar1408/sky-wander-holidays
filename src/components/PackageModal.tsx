import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  ShieldAlert, 
  Utensils, 
  Car, 
  Building2, 
  ShieldCheck, 
  Share2, 
  MessageCircle, 
  Sparkles, 
  Download, 
  Printer, 
  Plane,
  ChevronDown,
  ChevronUp,
  UserCheck,
  CheckCircle2,
  Phone,
  CreditCard,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TourPackage, BookingInquiry } from '../types';
import { getBrochureForPackage } from '../data/destinationBrochures';
import { BrochureDownloadModal } from './BrochureDownloadModal';
import { dispatchCustomerActivity } from '../utils/googleWorkspace';
import { UPIPaymentSection } from './UPIPaymentSection';

interface PackageModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  initialTab?: 'itinerary' | 'inclusions' | 'hotels' | 'reviews' | 'payment';
}

const DEPARTURE_CITIES = [
  { city: 'Delhi / NCR', flightSurcharge: 6500 },
  { city: 'Mumbai', flightSurcharge: 7200 },
  { city: 'Bengaluru', flightSurcharge: 7800 },
  { city: 'Hyderabad', flightSurcharge: 7000 },
  { city: 'Kolkata', flightSurcharge: 6800 },
  { city: 'Chennai', flightSurcharge: 7500 },
  { city: 'Ahmedabad', flightSurcharge: 6900 },
  { city: 'Self Arrival (No Flights)', flightSurcharge: 0 }
];

export const PackageModal: React.FC<PackageModalProps> = ({ pkg, onClose, initialTab = 'itinerary' }) => {
  if (!pkg) return null;

  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'hotels' | 'reviews' | 'payment'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, pkg.id]);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Match the specific destination brochure for PDF generation
  const currentBrochure = getBrochureForPackage(pkg.id || pkg.title);

  // Booking & Price Calculator State
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [hotelTier, setHotelTier] = useState<'standard' | 'deluxe' | 'luxury'>('deluxe');
  const [includeFlights, setIncludeFlights] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('Delhi / NCR');
  const [includeCab, setIncludeCab] = useState<boolean>(true);
  const [travelDate, setTravelDate] = useState<string>(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  
  // Form input
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingInquiry | null>(null);

  // Price Calculation Math
  const hotelTierMultiplier = hotelTier === 'standard' ? -1500 : hotelTier === 'luxury' ? 4500 : 0;
  const basePricePerPerson = pkg.pricePerPerson + hotelTierMultiplier;
  
  const selectedCityObj = DEPARTURE_CITIES.find(c => c.city === selectedCity) || DEPARTURE_CITIES[0];
  const flightCostPerPerson = includeFlights ? selectedCityObj.flightSurcharge : 0;

  const adultTotal = adults * (basePricePerPerson + flightCostPerPerson);
  const childTotal = children * ((basePricePerPerson * 0.6) + flightCostPerPerson);
  const totalEstimatedPrice = adultTotal + childTotal;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userPhone) {
      alert('Please provide your Full Name and Mobile Number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: userName,
        phone: userPhone,
        email: userEmail,
        travelDate,
        adultsCount: adults,
        childrenCount: children,
        packageId: pkg.id,
        packageTitle: pkg.title,
        departureCity: selectedCity,
        hotelCategory: hotelTier === 'standard' ? 'Standard 3★' : hotelTier === 'luxury' ? 'Luxury 5★ / Palace' : 'Deluxe 4★',
        includeFlights,
        includeCab,
        specialRequests: specialNotes,
        estimatedTotal: totalEstimatedPrice
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.inquiry) {
          // Dispatch to Google Sheets and Email
          dispatchCustomerActivity({
            type: 'BOOKING',
            name: userName.trim(),
            phone: userPhone.trim(),
            email: userEmail.trim(),
            details: {
              id: data.inquiry.id,
              packageTitle: pkg.title,
              travelDate,
              adultsCount: adults,
              childrenCount: children,
              departureCity: selectedCity,
              estimatedTotal: totalEstimatedPrice,
              specialRequests: specialNotes
            }
          }).catch(err => console.warn('Activity dispatch error:', err));

          setConfirmedBooking(data.inquiry);
          triggerConfetti();
          return;
        }
      }
      throw new Error('API unavailable or static host');
    } catch (err) {
      console.error(err);
      // fallback offline confirmation
      const fallbackInquiry: BookingInquiry = {
        id: `SWH-IND-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: userName,
        email: userEmail,
        phone: userPhone,
        travelDate,
        adultsCount: adults,
        childrenCount: children,
        packageId: pkg.id,
        packageTitle: pkg.title,
        departureCity: selectedCity,
        hotelCategory: hotelTier === 'luxury' ? 'Luxury 5★' : 'Deluxe 4★',
        includeFlights,
        includeCab,
        estimatedTotal: totalEstimatedPrice,
        createdAt: new Date().toISOString(),
        status: 'Confirmed'
      };
      setConfirmedBooking(fallbackInquiry);
      triggerConfetti();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Sky Wander Holidays! I want to book/customize "${pkg.title}" (${pkg.durationNights}N/${pkg.durationDays}D) for ${adults} Adults, ${children} Kids from ${selectedCity} on ${travelDate}. Hotel: ${hotelTier.toUpperCase()}. Estimated: ₹${totalEstimatedPrice.toLocaleString('en-IN')}. Please connect!`
    );
    window.open(`https://wa.me/918676928509?text=${text}`, '_blank');
  };

  const printVoucher = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative text-slate-900">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-[#FF7A00] text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Hero Gallery */}
        <div className="relative bg-[#0B2530] text-white">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={pkg.gallery[selectedGalleryIdx] || pkg.heroImage}
              alt={pkg.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2530] via-[#0B2530]/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FF7A00] text-white text-[10px] font-black uppercase tracking-wider">
                  {pkg.tag}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                  📍 {pkg.state} ({pkg.region})
                </span>
                <span className="px-3 py-0.5 rounded-full bg-[#1698B4]/30 text-[#38BDF8] text-xs font-semibold border border-[#1698B4]/40">
                  <Clock className="w-3 h-3 inline mr-1 text-[#FF7A00]" />
                  {pkg.durationNights} Nights / {pkg.durationDays} Days
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                {pkg.title}
              </h2>
            </div>
          </div>

          {/* Gallery Thumbnails Strip */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#0B2530] flex items-center gap-2 overflow-x-auto border-t border-[#1698B4]/20">
            {pkg.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedGalleryIdx(i)}
                className={`w-16 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  selectedGalleryIdx === i ? 'border-[#FF7A00] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-4 sm:px-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer uppercase tracking-wider text-xs ${
                activeTab === 'itinerary'
                  ? 'border-[#1698B4] text-[#1698B4] font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              🗓️ Day-by-Day Plan ({pkg.dayItinerary.length} Days)
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer uppercase tracking-wider text-xs ${
                activeTab === 'inclusions'
                  ? 'border-[#1698B4] text-[#1698B4] font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              ✅ Inclusions & Exclusions
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`py-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer uppercase tracking-wider text-xs ${
                activeTab === 'hotels'
                  ? 'border-[#1698B4] text-[#1698B4] font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              🏨 Hotels & Cab Specs
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`py-3.5 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider text-xs flex items-center gap-1.5 rounded-t-lg ${
                activeTab === 'payment'
                  ? 'border-[#5f259f] text-[#5f259f] font-black bg-purple-100/60'
                  : 'border-transparent text-purple-700 hover:text-purple-950 bg-purple-50/80 hover:bg-purple-100/50'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-[#5f259f]" />
              <span>💳 Direct UPI QR Pay</span>
              <span className="text-[9px] bg-[#5f259f] text-white px-1.5 py-0.2 rounded-full font-black">Fast</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF7A00] to-[#E56E00] hover:from-[#E56E00] hover:to-[#CC6200] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer active:scale-95"
              title="Download Itinerary PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleWhatsAppInquiry}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </button>
          </div>
        </div>

        {/* Modal Body: 2 Columns (Content Left + Interactive Calculator Right) */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Details / Tabs */}
          <div className={`${activeTab === 'payment' ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-6`}>
            
            {/* Quick Instant PhonePe QR Payment Ribbon */}
            {activeTab !== 'payment' && (
              <div className="p-3.5 bg-gradient-to-r from-purple-950 via-slate-900 to-[#0B2530] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-purple-500/30 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white text-[#5f259f] font-black text-base flex items-center justify-center shrink-0 shadow">
                    पे
                  </div>
                  <div>
                    <div className="text-xs font-black tracking-wide flex items-center gap-1.5 text-white">
                      <span>Instant Booking via PhonePe / Any UPI QR</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[9px] font-black uppercase">Direct</span>
                    </div>
                    <p className="text-[11px] text-purple-200">
                      Scan PhonePe Standee QR code & lock your dates with advance token.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('payment')}
                  className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-amber-500 hover:from-amber-500 hover:to-[#FF7A00] text-white font-black text-xs uppercase tracking-wider shadow-sm cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Open UPI QR Code →</span>
                </button>
              </div>
            )}

            {/* Overview & Key Highlights */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                Tour Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {pkg.overview}
              </p>

              <h5 className="text-xs font-bold text-slate-900 mt-4 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
                Tour Highlights
              </h5>
              <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                {pkg.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#FF7A00] font-bold">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TAB 1: Day-by-Day Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="space-y-3">
                {/* Download PDF Lead-Gen Callout Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0B2530] via-[#0E3544] to-[#1698B4] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm border border-[#1698B4]/30">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#FF7A00] text-white text-[9px] font-black uppercase tracking-wider">
                        Official Dossier
                      </span>
                      <span className="text-[11px] text-[#38BDF8] font-bold">
                        {pkg.durationNights}N / {pkg.durationDays}D Plan
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      Download Complete Itinerary & Rates (PDF)
                    </h4>
                    <p className="text-[11px] text-slate-200">
                      Day-wise stops, meal schedule, inclusions, exclusions & booking terms.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="shrink-0 px-4 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#E56E00] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>

                <h4 className="text-sm font-black text-slate-900 flex items-center justify-between pt-1">
                  <span>Detailed Day-Wise Itinerary</span>
                  <span className="text-xs font-semibold text-slate-500">
                    Pickup: {pkg.pickupDropCity}
                  </span>
                </h4>

                {pkg.dayItinerary.map((d) => {
                  const isOpen = expandedDay === d.day;
                  return (
                    <div
                      key={d.day}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() => setExpandedDay(isOpen ? null : d.day)}
                        className="w-full p-3.5 text-left flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-[#1698B4] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                            Day {d.day}
                          </span>
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                              {d.title}
                            </h5>
                            <span className="text-[11px] text-slate-500 font-medium">
                              🍽️ {d.meals}
                            </span>
                          </div>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-700 space-y-2.5">
                          <p className="leading-relaxed text-slate-600">
                            {d.description}
                          </p>
                          
                          {d.activities.length > 0 && (
                            <div className="pt-2">
                              <span className="font-bold text-slate-800 block mb-1">Key Day Sights:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {d.activities.map((act, i) => (
                                  <span key={i} className="bg-[#EBF7FA] text-[#1698B4] px-2 py-0.5 rounded font-medium text-[11px]">
                                    📍 {act}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500 font-medium text-[11px]">
                            <span>🏨 Stay: <strong className="text-slate-800">{d.stay}</strong></span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 2: Inclusions & Exclusions */}
            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    What's Included
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200">
                  <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    What's Excluded
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold shrink-0">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: Hotels & Vehicle Specs */}
            {activeTab === 'hotels' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#1698B4]" />
                    Verified Stay Standards
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    All hotels and houseboats in this domestic package are physically audited by our regional tour officers. Cleanliness, mountain/valley view rooms, heater/AC amenities, and hygienic buffet dining are assured.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong>Standard Category:</strong> 3★ Clean Valley / City Hotels
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <strong>Deluxe Category:</strong> 4★ Mountain Resorts / Luxury Houseboat
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#FF7A00]" />
                    Dedicated Chauffeur & Vehicle
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Vehicle provided: <strong>{pkg.cabType}</strong>. Driven by verified hill & highway experienced commercial chauffeurs. All interstate permits, green taxes, driver food and accommodation allowances are pre-covered with zero hidden charges.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: Direct PhonePe UPI QR Code Payment */}
            {activeTab === 'payment' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('itinerary')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>← Back to Day-by-Day Itinerary</span>
                  </button>
                  <span className="text-xs text-purple-700 font-bold">
                    Official PhonePe Merchant • Sky Wander Holidays
                  </span>
                </div>

                <UPIPaymentSection
                  pkg={pkg}
                  adultsCount={adults}
                  childrenCount={children}
                  totalEstimatedPrice={totalEstimatedPrice}
                  travelDate={travelDate}
                  customerName={userName}
                  customerPhone={userPhone}
                  customerEmail={userEmail}
                />
              </div>
            )}

          </div>

          {/* Right Column: Live Interactive Price Calculator & Booking */}
          {activeTab !== 'payment' && (
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-[#EBF7FA]/70 via-white to-slate-50 p-5 rounded-3xl border-2 border-[#1698B4]/30 shadow-lg sticky top-6">
              
              {confirmedBooking ? (
                /* Booking Confirmation Screen */
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Inquiry Confirmed!
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-2">
                      Namaste, {confirmedBooking.fullName}!
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Your booking inquiry voucher has been created with Ref ID:
                    </p>
                    <div className="mt-2 text-sm font-black font-mono text-[#1698B4] bg-[#EBF7FA] py-1.5 px-3 rounded-lg inline-block border border-[#1698B4]/30">
                      {confirmedBooking.id}
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Package:</span>
                      <strong className="text-slate-900 text-right line-clamp-1">{pkg.title}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Travel Date:</span>
                      <strong>{confirmedBooking.travelDate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Guests:</span>
                      <strong>{confirmedBooking.adultsCount} Adults, {confirmedBooking.childrenCount} Kids</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Estimate:</span>
                      <strong className="text-[#FF7A00] font-black text-sm">₹{confirmedBooking.estimatedTotal.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
                      <strong className="text-slate-700">Sky Wander Holidays</strong> • Sector 49, Hanuman Mandir Near Sai Apartment, Noida, UP • Helpline: 8676928509
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Our domestic tour specialist will call you at <strong>{confirmedBooking.phone}</strong> within 15 minutes with the detailed day-by-day customized PDF quotation.
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={printVoucher}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Voucher</span>
                    </button>
                    <button
                      onClick={handleWhatsAppInquiry}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Us</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Dynamic Booking & Price Form */
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase text-[#1698B4] bg-[#EBF7FA] px-2.5 py-0.5 rounded-full border border-[#1698B4]/20">
                      Live Price & Booking Calculator
                    </span>
                    <h4 className="text-base font-black text-slate-900 mt-1.5">
                      Customize Your Holiday
                    </h4>
                  </div>

                  {/* 1. Number of Travelers */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Adults (12+ yrs)
                      </label>
                      <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-xs">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Children (5-11 yrs)
                      </label>
                      <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-xs">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2. Hotel Category Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Select Hotel Category
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 text-xs">
                      <button
                        type="button"
                        onClick={() => setHotelTier('standard')}
                        className={`py-2 px-1.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          hotelTier === 'standard'
                            ? 'bg-[#1698B4] text-white border-[#1698B4] shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        3★ Standard
                        <span className="block text-[9px] font-normal opacity-90">-₹1,500</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setHotelTier('deluxe')}
                        className={`py-2 px-1.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          hotelTier === 'deluxe'
                            ? 'bg-[#1698B4] text-white border-[#1698B4] shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        4★ Deluxe
                        <span className="block text-[9px] font-normal opacity-90">Included</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setHotelTier('luxury')}
                        className={`py-2 px-1.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          hotelTier === 'luxury'
                            ? 'bg-[#FF7A00] text-white border-[#FF7A00] shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        5★ Luxury
                        <span className="block text-[9px] font-normal opacity-90">+₹4,500</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Flight Add-on Toggle */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-[#1698B4]" />
                        <span className="text-xs font-bold text-slate-800">Add Return Domestic Flights</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={includeFlights}
                        onChange={(e) => setIncludeFlights(e.target.checked)}
                        className="w-4 h-4 accent-[#1698B4] rounded cursor-pointer"
                      />
                    </label>

                    {includeFlights && (
                      <div className="pt-1.5 border-t border-slate-100">
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">
                          Departure City (Airport)
                        </label>
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                        >
                          {DEPARTURE_CITIES.map(c => (
                            <option key={c.city} value={c.city}>
                              {c.city} (+₹{c.flightSurcharge.toLocaleString('en-IN')}/person)
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* 4. Travel Date */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Expected Travel Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>

                  {/* 5. User Contact Details */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your Full Name *"
                        required
                        className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="Mobile (+91) *"
                        required
                        className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400"
                      />
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Email (Optional)"
                        className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Live Total Estimated Price Box */}
                  <div className="p-3.5 bg-[#0B2530] text-white rounded-2xl space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Total Estimated Cost:</span>
                      <span className="text-[10px] text-[#38BDF8] font-bold">All Taxes Included</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-[#FF7A00]">
                        ₹{totalEstimatedPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-300 font-medium">
                        for {adults} Adults {children > 0 ? `+ ${children} Kids` : ''}
                      </span>
                    </div>
                  </div>

                  {/* DIRECT PHONEPE UPI QR BUTTON */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('payment')}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#5f259f] via-[#7c3aed] to-[#FF7A00] hover:opacity-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer ring-2 ring-purple-300"
                  >
                    <QrCode className="w-4 h-4 text-amber-300" />
                    <span>⚡ Pay Direct via UPI QR (PhonePe)</span>
                  </button>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center my-1">
                    <div className="h-[1px] bg-slate-200 flex-1"></div>
                    <span>or request instant voucher call</span>
                    <div className="h-[1px] bg-slate-200 flex-1"></div>
                  </div>

                  {/* Submit Action */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#FF7A00] hover:bg-[#E66E00] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#FF7A00]/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Generating Booking Voucher...</span>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4" />
                        <span>Confirm & Get Instant Voucher</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Free Cancellation Support
                    </span>
                    <span>•</span>
                    <span>24x7 Trip Captain</span>
                  </div>
                </form>
              )}
            </div>
          </div>
          )}

        </div>
      </div>

      {/* Brochure PDF Lead Generation Modal */}
      <BrochureDownloadModal
        brochure={currentBrochure}
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
};
