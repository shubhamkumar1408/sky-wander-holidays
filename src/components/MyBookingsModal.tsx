import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Search, 
  Phone, 
  Calendar, 
  Users, 
  MapPin, 
  Download, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Car, 
  Building2, 
  MessageCircle, 
  PhoneCall, 
  Luggage,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CreditCard,
  UserCheck,
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { 
  BookingItem, 
  getAllBookings, 
  getBookingsByPhoneOrId, 
  normalizePhoneNumber,
  POPULAR_DEMO_NUMBERS 
} from '../data/sampleBookings';
import { generateBookingVoucherPdf } from '../utils/voucherPdfGenerator';
import { getBrochureForPackage, DESTINATION_BROCHURES } from '../data/destinationBrochures';
import { generateBrochurePdf } from '../utils/brochurePdfGenerator';
import { getCurrentUser, UserProfile } from '../utils/userAuth';
import { BrandLogo } from './BrandLogo';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhone?: string;
  onOpenInquiry?: () => void;
  onOpenLogin?: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  initialPhone = '',
  onOpenInquiry,
  onOpenLogin
}) => {
  if (!isOpen) return null;

  const currentUser = getCurrentUser();

  // Search query state: default to initialPhone, or currentUser phone, or default demo phone
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (initialPhone) return initialPhone;
    if (currentUser && currentUser.phone) return currentUser.phone;
    return '8676928509'; // Default official test number
  });

  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingItineraryId, setDownloadingItineraryId] = useState<string | null>(null);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<BookingItem | null>(null);

  // Update query if initialPhone prop changes
  useEffect(() => {
    if (initialPhone) {
      setSearchQuery(initialPhone);
    }
  }, [initialPhone]);

  // Filter bookings based on searchQuery
  const matchingBookings = useMemo(() => {
    return getBookingsByPhoneOrId(searchQuery);
  }, [searchQuery]);

  // Handle clicking on any number pill
  const handleSelectNumber = (phone: string) => {
    setSearchQuery(phone);
  };

  // Download Voucher
  const handleDownloadVoucher = (booking: BookingItem) => {
    setDownloadingId(booking.id);
    try {
      generateBookingVoucherPdf(booking);
    } catch (err) {
      console.error('Error generating voucher PDF:', err);
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  // Download Itinerary PDF
  const handleDownloadItinerary = (booking: BookingItem) => {
    setDownloadingItineraryId(booking.id);
    try {
      // Find brochure using helper
      const brochure = getBrochureForPackage(booking.packageId || booking.brochureSlug || booking.packageTitle || booking.destination) || DESTINATION_BROCHURES['kedarnath'];
      if (brochure) {
        generateBrochurePdf(brochure, booking.fullName);
      }
    } catch (err) {
      console.error('Error generating itinerary PDF:', err);
    } finally {
      setTimeout(() => setDownloadingItineraryId(null), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-50 rounded-3xl max-w-4xl w-full my-6 shadow-2xl border border-slate-200 relative text-slate-900 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#0B2530] via-[#103D4D] to-[#0B2530] text-white p-5 sm:p-6 relative border-b border-[#1698B4]/30 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1698B4]/20 text-[#38BDF8] text-[11px] font-bold border border-[#1698B4]/40">
                <Luggage className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>My Bookings & Trip Dashboard (मेरी बुकिंग्स)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>यात्रा बुकिंग विवरण और वाउचर</span>
              </h2>
              <p className="text-xs text-slate-300">
                किसी भी मोबाइल नंबर या बुकिंग आईडी से अपनी सभी पुष्टीकृत (Confirmed) यात्राओं की जानकारी और वाउचर देखें।
              </p>
            </div>

            {/* Helpline quick strip */}
            <div className="hidden sm:flex flex-col items-end text-xs">
              <span className="text-slate-400">24x7 बुकिंग सहायता:</span>
              <a 
                href="tel:+918676928509" 
                className="text-[#FF7A00] font-black hover:underline flex items-center gap-1 text-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 86769 28509</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter & Clickable Phone Number Strip */}
        <div className="bg-white p-4 sm:p-5 border-b border-slate-200 shrink-0 space-y-3 shadow-xs">
          
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4 text-[#1698B4]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="मोबाइल नंबर (10 अंक) या बुकिंग आईडी (e.g. 8676928509 / SWH-IND-849201) दर्ज करें..."
              className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] focus:border-[#1698B4] font-medium text-slate-900 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-2 px-3 py-1 my-auto text-xs font-bold text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                Clear
              </button>
            )}
          </div>

          {/* Clickable Quick Numbers ("agar koi number click kar ke dekhna chahe to uska booking information dikh paye") */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#1698B4]" />
                क्लिक करके सीधे बुकिंग देखें (Click any number to view bookings):
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                {matchingBookings.length} बुकिंग मिली
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* If user is logged in, show their active number first */}
              {currentUser && (
                <button
                  type="button"
                  onClick={() => handleSelectNumber(currentUser.phone)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs border ${
                    normalizePhoneNumber(searchQuery) === normalizePhoneNumber(currentUser.phone)
                      ? 'bg-[#1698B4] text-white border-[#1698B4] shadow-md shadow-[#1698B4]/20 scale-102'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>मेरा नंबर: {currentUser.phone}</span>
                  <span className="text-[10px] opacity-80">({currentUser.name})</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-200/60 text-emerald-950 font-black">
                    {getBookingsByPhoneOrId(currentUser.phone).length} Bookings
                  </span>
                </button>
              )}

              {/* Demo Numbers */}
              {POPULAR_DEMO_NUMBERS.map((item) => {
                const isSelected = normalizePhoneNumber(searchQuery) === normalizePhoneNumber(item.phone);
                const count = getBookingsByPhoneOrId(item.phone).length;
                return (
                  <button
                    key={item.phone}
                    type="button"
                    onClick={() => handleSelectNumber(item.phone)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs border ${
                      isSelected
                        ? 'bg-[#0B2530] text-white border-[#0B2530] font-bold shadow-md scale-102'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-[#EBF7FA] hover:text-[#1698B4] hover:border-[#1698B4]/40'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#FF7A00] animate-pulse' : 'bg-slate-400'}`}></span>
                    <strong>{item.name}:</strong>
                    <span>{item.phone}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-white/20 text-white font-bold' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {count} {count === 1 ? 'Tour' : 'Tours'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable Booking Cards Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
          {matchingBookings.length > 0 ? (
            matchingBookings.map((booking) => {
              const isDownloadingVoucher = downloadingId === booking.id;
              const isDownloadingItinerary = downloadingItineraryId === booking.id;

              return (
                <div 
                  key={booking.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Card Header Strip */}
                  <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                        ID: {booking.id}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{booking.tripStatus || 'Confirmed'}</span>
                      </span>
                      <span className="text-xs text-slate-500 hidden sm:inline">
                        Booked: {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Main Card Body */}
                  <div className="p-4 sm:p-5 space-y-4">
                    
                    {/* Tour Title & Dates */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-[#1698B4] transition-colors">
                          {booking.packageTitle}
                        </h3>
                        <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                          <span>{booking.destination}</span>
                        </p>
                      </div>

                      {/* Financial Tag */}
                      <div className="sm:text-right shrink-0">
                        <span className="text-[11px] text-slate-500 uppercase font-semibold block">कुल टूर पैकेज राशि</span>
                        <span className="text-lg font-black text-[#1698B4]">
                          ₹{Number(booking.estimatedTotal || 0).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-bold block">
                          ✓ अग्रिम जमा: ₹{Number(booking.advancePaid || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                      {/* Item 1 */}
                      <div>
                        <span className="text-slate-400 block font-semibold text-[10px] uppercase">यात्रा तिथि (Travel Date)</span>
                        <div className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-[#1698B4]" />
                          <span>{new Date(booking.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{booking.duration}</span>
                      </div>

                      {/* Item 2 */}
                      <div>
                        <span className="text-slate-400 block font-semibold text-[10px] uppercase">यात्री (Travelers)</span>
                        <div className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                          <Users className="w-3.5 h-3.5 text-[#1698B4]" />
                          <span>{booking.adultsCount} Adults {booking.childrenCount > 0 ? `+ ${booking.childrenCount} Child` : ''}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">प्रस्थान: {booking.departureCity || 'Self/Local'}</span>
                      </div>

                      {/* Item 3 */}
                      <div>
                        <span className="text-slate-400 block font-semibold text-[10px] uppercase">होटल / रिज़ॉर्ट (Hotel Stay)</span>
                        <div className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-[#FF7A00]" />
                          <span className="truncate">{booking.hotelCategory}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 truncate block">
                          {booking.hotelAssigned || '4★ Verified Deluxe Stay'}
                        </span>
                      </div>

                      {/* Item 4 */}
                      <div>
                        <span className="text-slate-400 block font-semibold text-[10px] uppercase">कैब / ड्राइवर (Assigned Cab)</span>
                        <div className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                          <Car className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{booking.driverName || 'Verified Chauffeur'}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 truncate block">
                          {booking.cabVehicleNumber ? `No: ${booking.cabVehicleNumber}` : booking.cabType}
                        </span>
                      </div>
                    </div>

                    {/* Guest details & Manager strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900">{booking.fullName}</strong>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#1698B4]" />
                          +91 {booking.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                        <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                        <span>समन्वयक: <strong>{booking.assignedManager || 'Mr. Shubham Dutt'}</strong> (+91 86769 28509)</span>
                      </div>
                    </div>

                    {/* Action Buttons: PDF Voucher & Itinerary */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100">
                      
                      {/* Download Official Voucher PDF */}
                      <button
                        type="button"
                        onClick={() => handleDownloadVoucher(booking)}
                        disabled={isDownloadingVoucher}
                        className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B2530] to-[#1698B4] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                      >
                        <FileText className="w-4 h-4 text-[#FF7A00]" />
                        <span>{isDownloadingVoucher ? 'वाउचर बन रहा है...' : 'डाउनलोड बुकिंग वाउचर (PDF)'}</span>
                        <Download className="w-3.5 h-3.5 ml-1" />
                      </button>

                      {/* Download Destination Itinerary PDF */}
                      <button
                        type="button"
                        onClick={() => handleDownloadItinerary(booking)}
                        disabled={isDownloadingItinerary}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#EBF7FA] hover:bg-[#D6F1F7] text-[#1698B4] font-bold text-xs border border-[#1698B4]/30 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Download className="w-3.5 h-3.5 text-[#FF7A00]" />
                        <span>{isDownloadingItinerary ? 'डाउनलोडिंग...' : 'यात्रा विवरण PDF'}</span>
                      </button>

                      {/* Direct WhatsApp Concierge for this booking */}
                      <a
                        href={`https://wa.me/918676928509?text=${encodeURIComponent(`Namaste Sky Wander Holidays! Regarding my Booking ID: ${booking.id} (${booking.packageTitle}) for traveler ${booking.fullName}, please provide an update.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp सहायता</span>
                      </a>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            /* Empty State when no bookings match */
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Luggage className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-black text-slate-900">
                  नंबर <span className="text-[#1698B4] font-mono">{searchQuery || 'दर्ज नंबर'}</span> के लिए कोई सक्रिय बुकिंग नहीं मिली
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  यदि आपने हाल ही में बुकिंग की है, तो ऊपर दिए गए परीक्षण नंबरों (जैसे: <strong className="text-slate-800">8676928509</strong> या <strong className="text-slate-800">9876543210</strong>) पर क्लिक करके देखें।
                </p>
              </div>

              {/* Quick suggestions to click */}
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                {POPULAR_DEMO_NUMBERS.map(n => (
                  <button
                    key={n.phone}
                    type="button"
                    onClick={() => handleSelectNumber(n.phone)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#EBF7FA] text-xs font-semibold text-slate-700 hover:text-[#1698B4] border border-slate-200 transition-all cursor-pointer"
                  >
                    डेमो: {n.name} ({n.phone})
                  </button>
                ))}
              </div>

              {/* Action to create new booking */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                {onOpenInquiry && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenInquiry();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#E56E00] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#FF7A00]/25 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>नया टूर पैकेज बुक करें / Free Quote</span>
                  </button>
                )}

                {onOpenLogin && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenLogin();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                  >
                    लॉगिन प्रोफ़ाइल बदलें
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Strip */}
        <div className="bg-white px-5 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#1698B4]" />
            <span>100% Verified Domestic Bookings • GST Invoiced • Noida Travel Desk</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
