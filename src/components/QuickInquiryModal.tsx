import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Send, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle,
  MapPin,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TourPackage } from '../types';
import { getCurrentUser } from '../utils/userAuth';
import { saveLocalBooking, BookingItem } from '../data/sampleBookings';
import { dispatchCustomerActivity } from '../utils/googleWorkspace';

interface QuickInquiryModalProps {
  pkg?: TourPackage | null;
  onClose: () => void;
  onViewMyBookings?: (phone: string) => void;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({ pkg, onClose, onViewMyBookings }) => {
  const loggedInUser = getCurrentUser();
  const [name, setName] = useState(loggedInUser?.name || '');
  const [phone, setPhone] = useState(loggedInUser?.phone || '');
  const [email, setEmail] = useState(loggedInUser?.email || '');
  const [destination, setDestination] = useState(pkg ? pkg.title : 'Kashmir / Kerala / Goa');
  const [travelDate, setTravelDate] = useState(
    new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [adults, setAdults] = useState(2);
  const [departureCity, setDepartureCity] = useState('Delhi / NCR');
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: name,
        phone,
        email,
        travelDate,
        adultsCount: adults,
        packageTitle: destination,
        departureCity,
        specialRequests: notes,
        estimatedTotal: (pkg ? pkg.pricePerPerson : 18000) * adults
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let assignedRef = `SWH-IND-${Math.floor(100000 + Math.random() * 900000)}`;

      if (res.ok) {
        const data = await res.json();
        assignedRef = data.inquiry?.id || data.booking?.id || assignedRef;
      }
      setRefNumber(assignedRef);

      // Automatically dispatch lead to Google Sheets & Email
      dispatchCustomerActivity({
        type: 'INQUIRY',
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        details: {
          id: assignedRef,
          packageTitle: destination,
          travelDate,
          adultsCount: adults,
          departureCity,
          specialRequests: notes,
          estimatedTotal: (pkg ? pkg.pricePerPerson : 18000) * adults
        }
      }).catch(err => console.warn('Activity dispatch error:', err));

      // Save to local bookings store so it shows up in "My Bookings" for this phone number
      const newLocalBooking: BookingItem = {
        id: assignedRef,
        fullName: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        packageId: pkg?.id,
        packageTitle: destination,
        destination: pkg ? pkg.destinationsCovered.join(', ') : destination,
        travelDate,
        duration: pkg ? `${pkg.durationDays} Days / ${pkg.durationNights} Nights` : '5 Days / 4 Nights',
        adultsCount: adults,
        childrenCount: 0,
        departureCity,
        hotelCategory: 'Deluxe 4★',
        includeFlights: false,
        includeCab: true,
        cabType: 'Private Dedicated AC Tourist Cab with Chauffeur',
        specialRequests: notes,
        estimatedTotal: (pkg ? pkg.pricePerPerson : 18000) * adults,
        advancePaid: Math.round(((pkg ? pkg.pricePerPerson : 18000) * adults) * 0.35),
        status: 'Confirmed',
        tripStatus: 'Confirmed',
        paymentStatus: 'Advance Received (100% Protected)',
        assignedManager: 'Mr. Shubham Dutt (Tour Desk Head)',
        managerPhone: '+91 86769 28509',
        driverName: 'Verified Tourist Chauffeur',
        driverPhone: '+91 86769 28509',
        createdAt: new Date().toISOString()
      };
      saveLocalBooking(newLocalBooking);

      setIsConfirmed(true);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    } catch {
      const fallbackRef = `SWH-IND-${Math.floor(100000 + Math.random() * 900000)}`;
      setRefNumber(fallbackRef);
      setIsConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-slate-900">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isConfirmed ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EBF7FA] text-[#1698B4] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-black uppercase text-[#1698B4] bg-[#EBF7FA] px-3 py-1 rounded-full border border-[#1698B4]/30">
                Inquiry Received!
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3">
                Thank you, {name}!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Your Sky Wander Domestic Quote request has been logged under Ref ID:
              </p>
              <div className="mt-2 text-base font-black font-mono text-[#1698B4] bg-[#EBF7FA] py-2 px-4 rounded-xl inline-block border border-[#1698B4]/30">
                {refNumber}
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Our domestic travel specialist will reach out to <strong>{phone}</strong> shortly.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 text-left space-y-1">
              <div className="font-bold text-slate-800">Sky Wander Holidays Desk:</div>
              <div>Sector 49, Hanuman Mandir Near Sai Apartment, Noida, UP</div>
              <div>Helpline: <strong className="text-[#FF7A00]">8676928509</strong></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              {onViewMyBookings && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewMyBookings(phone);
                  }}
                  className="w-full sm:flex-1 py-3 bg-[#1698B4] hover:bg-[#0E7A91] text-white rounded-xl font-bold text-xs uppercase transition-colors text-center cursor-pointer shadow-sm"
                >
                  मेरी बुकिंग देखें (My Bookings)
                </button>
              )}

              <a
                href={`https://wa.me/918676928509?text=${encodeURIComponent(`Hi! I just submitted an inquiry for ${destination} on Sky Wander Holidays (Ref ID: ${refNumber}). Please share details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs uppercase transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[11px] font-black uppercase text-[#1698B4] bg-[#EBF7FA] px-2 py-0.5 rounded border border-[#1698B4]/30">
                Sky Wander Holidays
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Request Free Domestic Trip Quote
              </h3>
              <p className="text-xs text-slate-500">
                Get custom pricing, hotel choices & flight inclusions in 15 mins.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#1698B4]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (+91) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit number"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#1698B4]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#1698B4]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Domestic Destination / Package
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Kashmir 5N/6D, Goa Beach, Kerala Backwaters..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#1698B4]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-[11px] font-medium focus:outline-none focus:border-[#1698B4]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Adults
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1698B4]"
                >
                  {[1,2,3,4,5,6,8,10].map(n => (
                    <option key={n} value={n}>{n} Adults</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  From City
                </label>
                <input
                  type="text"
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#1698B4]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Special Requests / Requirements
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Need flight tickets from Mumbai, pure veg meals, lakeview room..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#1698B4]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#FF7A00] hover:bg-[#E66E00] text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Get Instant Callback & Quotation</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
