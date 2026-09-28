import React from 'react';
import { 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  ArrowUp,
  CreditCard,
  CheckCircle,
  MessageCircle,
  Users
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectRegion: (region: string) => void;
  onSelectTheme: (theme: string) => void;
  onOpenBlogPage?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectRegion, onSelectTheme, onOpenBlogPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const elem = document.getElementById('about-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B2530] text-slate-300 border-t border-[#1698B4]/30 pt-16 pb-12 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1698B4]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Official Brand Logo & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <BrandLogo variant="horizontal" size="lg" lightText={true} />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              <strong>Sky Wander Holidays</strong> is India's premier domestic travel atelier, curating bespoke circuits across Kashmir, Himachal, Kerala, Goa, Ladakh, Andaman, and Rajasthan with verified private chauffeurs, heritage sanctuaries, and 24x7 trip captains.
            </p>

            {/* Direct Contact Hotline & WhatsApp */}
            <div className="p-4 bg-white/5 rounded-2xl border border-[#1698B4]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#FF7A00] font-bold text-xs uppercase tracking-wider">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call & WhatsApp Booking:</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  24x7 Live
                </span>
              </div>
              
              <a 
                href="tel:+918676928509" 
                className="text-xl font-black text-white hover:text-[#38BDF8] transition-colors block font-mono"
              >
                +91 86769 28509
              </a>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://wa.me/918676928509?text=Namaste%20Sky%20Wander%20Holidays!%20I%20am%20interested%20in%20a%20domestic%20tour%20package."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: 8676928509</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Top Domestic Circuits */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-[#FF7A00] mb-4">
              Signature Circuits
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectRegion('North India')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  🏔️ Kashmir Paradise Tour
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRegion('North India')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  ❄️ Himachal & Manali Snow
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRegion('South India')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  🌴 Kerala Backwaters & Munnar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRegion('West India')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  🏖️ Goa Beach Resorts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRegion('North India')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  🏍️ Ladakh Pangong & Nubra
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRegion('West India')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  🏰 Royal Rajasthan Heritage
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRegion('Islands & Beaches')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  🏝️ Andaman Island Escape
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Holiday Themes & About Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-[#FF7A00] mb-4">
              Explore & Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={scrollToAbout} className="text-[#38BDF8] font-bold hover:underline transition-colors text-left cursor-pointer flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#FF7A00]" />
                  <span>About Us & Leadership</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onOpenBlogPage) {
                      onOpenBlogPage();
                    }
                  }} 
                  className="text-amber-400 font-bold hover:underline transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>📰 Blog</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTheme('Honeymoon')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  ❤️ Honeymoon Specials
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTheme('Family Special')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  👨‍👩‍👧‍👦 Family Vacation Packages
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTheme('Spiritual')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  🛕 Char Dham & Sacred Yatras
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTheme('Adventure')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  ⛷️ Adventure & Snow Sports
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTheme('Luxury Heritage')} className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer">
                  👑 Palace Stays & Luxury Villas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Company Address & Leadership */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-[#FF7A00] mb-4">
              Office & Leadership
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <div>
                <strong className="text-white block flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
                  Registered Office:
                </strong>
                <span className="text-slate-300 leading-snug block mt-0.5">
                  Sector 49, Hanuman Mandir Near Sai Apartment, Noida, Uttar Pradesh - 201301
                </span>
              </div>

              <div className="pt-1 border-t border-slate-800 space-y-1">
                <strong className="text-white block text-[11px] uppercase tracking-wider text-[#38BDF8]">
                  Leadership Team:
                </strong>
                <div className="text-[11px] text-slate-300 space-y-0.5">
                  <p>• <strong>Ritesh Kashyap</strong> — Owner & Founder</p>
                  <p>• <strong>Karan</strong> — Team Operational Head</p>
                  <p>• <strong>Komal</strong> — Head Consultant</p>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <strong className="text-white block">Email Inquiries:</strong>
                <a href="mailto:support@skywanderholidays.com" className="text-[#38BDF8] hover:underline text-[11px]">
                  support@skywanderholidays.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Badges & Accreditations Strip */}
        <div className="py-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-[#38BDF8]">
              <CheckCircle className="w-3.5 h-3.5" />
              Ministry of Tourism Approved
            </span>
            <span className="flex items-center gap-1 text-[#38BDF8]">
              <CheckCircle className="w-3.5 h-3.5" />
              IATO Recognized Domestic Tour Operator
            </span>
            <span className="flex items-center gap-1 text-[#38BDF8]">
              <CheckCircle className="w-3.5 h-3.5" />
              256-bit SSL Secure Booking
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Accepted:</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-white font-bold">UPI / GPay</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-white font-bold">RuPay / Visa / Master</span>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] text-white font-bold">No-Cost EMI</span>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sky Wander Holidays Pvt. Ltd. (Sector 49, Noida). All rights reserved. Crafted for Incredible India.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#FF7A00] hover:text-white text-slate-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
