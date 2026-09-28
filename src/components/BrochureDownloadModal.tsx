import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  Users, 
  MessageCircle,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DestinationBrochure } from '../data/destinationBrochures';
import { generateBrochurePdf } from '../utils/brochurePdfGenerator';
import { dispatchCustomerActivity } from '../utils/googleWorkspace';

interface BrochureDownloadModalProps {
  brochure: DestinationBrochure | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureDownloadModal: React.FC<BrochureDownloadModalProps> = ({
  brochure,
  isOpen,
  onClose
}) => {
  if (!isOpen || !brochure) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelMonth, setTravelMonth] = useState('Upcoming Weekend / This Month');
  const [travelersCount, setTravelersCount] = useState('2 Travelers');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please enter your Name, Phone and Email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Send lead to server API to notify team & record email
      const payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        packageId: brochure.id,
        packageTitle: brochure.title,
        destination: brochure.destination,
        travelMonth,
        travelersCount,
        downloadedAt: new Date().toISOString()
      };

      await fetch('/api/itinerary-download-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.warn('Lead API sync warning:', err));

      // Dispatch to Google Sheets & Email
      dispatchCustomerActivity({
        type: 'BROCHURE_DOWNLOAD',
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        details: {
          id: `LEAD-${Date.now()}`,
          packageTitle: brochure.title,
          destination: brochure.destination,
          travelMonth,
          travelersCount
        }
      }).catch(err => console.warn('Activity dispatch error:', err));

      // 2. Generate and trigger download of the specific destination PDF
      generateBrochurePdf(brochure, fullName.trim());

      // 3. Confetti effect & Success screen
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: still trigger PDF
      generateBrochurePdf(brochure, fullName.trim());
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Hello Sky Wander Holidays! I just downloaded the official itinerary PDF for "${brochure.title}" (${brochure.duration}). My name is ${fullName} (${phone}). Please share batch dates and best group quotation!`
    );
    window.open(`https://wa.me/918676928509?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Strip */}
        <div className="bg-gradient-to-r from-[#0B2530] via-[#0E3544] to-[#1698B4] p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF7A00] text-white text-[10px] font-black uppercase tracking-wider">
              Official Itinerary Dossier
            </span>
            <span className="text-xs text-sky-200 font-semibold">
              {brochure.duration}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {brochure.title}
          </h3>
          <p className="text-xs text-slate-200 mt-1 line-clamp-1 font-medium">
            📍 {brochure.destination} • Starting {brochure.startingPrice}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!isSuccess ? (
            <div>
              <div className="flex items-center gap-3 p-3.5 mb-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900">
                <FileText className="w-6 h-6 text-[#FF7A00] shrink-0" />
                <div className="text-xs leading-relaxed">
                  <span className="font-bold block text-slate-900">Get Instant PDF on Your Device</span>
                  Fill your contact details to download the complete day-by-day plan, hotel details, inclusions & pricing.
                </div>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleDownloadSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] focus:border-[#1698B4] text-slate-900"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] focus:border-[#1698B4] text-slate-900"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (For Notification & Copy) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] focus:border-[#1698B4] text-slate-900"
                    />
                  </div>
                </div>

                {/* Travel Month & Travelers count grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Travel Month
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <select
                        value={travelMonth}
                        onChange={(e) => setTravelMonth(e.target.value)}
                        className="w-full pl-9 pr-2.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] text-slate-800"
                      >
                        <option>This Month / Weekend</option>
                        <option>Next Month</option>
                        <option>April - May 2026</option>
                        <option>June - July 2026</option>
                        <option>August - Sept 2026</option>
                        <option>Festive / Holiday Season</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Travelers
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <select
                        value={travelersCount}
                        onChange={(e) => setTravelersCount(e.target.value)}
                        className="w-full pl-9 pr-2.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] text-slate-800"
                      >
                        <option>1 Solo Traveler</option>
                        <option>2 Travelers (Couple/Friends)</option>
                        <option>3 - 4 Travelers</option>
                        <option>5 - 8 Group Travelers</option>
                        <option>8+ Corporate/College Group</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E56E00] hover:from-[#E56E00] hover:to-[#CC6200] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Preparing Your PDF...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Itinerary (PDF) Now</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400 mt-2">
                  🔒 100% Privacy. Your details are securely dispatched to Sky Wander Holidays Team (Skywander6@gmail.com).
                </p>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900">
                  Itinerary PDF Downloaded!
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>! Your official expedition dossier for <strong className="text-[#1698B4]">{brochure.title}</strong> has been generated.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Destination Code:</span>
                  <span className="font-bold text-slate-800">{brochure.code}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Lead Notification:</span>
                  <span className="font-bold text-emerald-600">Dispatched to Skywander6@gmail.com</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Direct Hotline:</span>
                  <span className="font-bold text-slate-800">+91 8676928509</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Trip Captain on WhatsApp</span>
                </button>

                <button
                  onClick={() => generateBrochurePdf(brochure, fullName)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
