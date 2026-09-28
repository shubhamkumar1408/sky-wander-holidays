import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Clock, 
  HeartHandshake,
  Star,
  ExternalLink
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import riteshImg from '../assets/images/ritesh_photo.jpg.png';
import komalImg from '../assets/images/komal_photo_1787665397506.jpg';
import karanImg from '../assets/images/karan_photo.jpg';

export const AboutUsSection: React.FC = () => {
  const leadershipTeam = [
    {
      name: 'Ritesh Kashyap',
      role: 'Owner & Founder',
      designation: 'Managing Director',
      badgeColor: 'bg-[#FF7A00]',
      experience: '12+ Years Experience',
      image: riteshImg,
      fallbackImage: '/images/ritesh_photo.jpg.png',
      imagePosition: 'object-[50%_20%]',
      bio: 'Visionary founder behind Sky Wander Holidays. Dedicated to delivering transparent, luxurious, and hassle-free domestic and international holiday experiences with verified hotel partners and safety protocols.',
      specialty: 'Tour Circuit Strategy & Luxury Stays',
      phone: '8676928509',
      whatsappMsg: 'Namaste Ritesh Sir! I would like to consult regarding a custom tour package with Sky Wander Holidays.'
    },
    {
      name: 'Karan',
      role: 'Team Operational Head',
      designation: 'Operations & Fleet Lead',
      badgeColor: 'bg-[#1698B4]',
      experience: '9+ Years Experience',
      image: karanImg,
      bio: 'Leads 24x7 ground operations, cab chauffeur verification, timing coordination, and round-the-clock trip safety across Himachal, Ladakh, Spiti, Uttarakhand, Kerala, Goa, and international routes.',
      specialty: 'Ground Fleet, Cabs & 24x7 Trip Captains',
      phone: '8676928509',
      whatsappMsg: 'Hello Karan Sir! I need assistance regarding tour coordination and cab arrangements for our upcoming trip.'
    },
    {
      name: 'Komal',
      role: 'Head Consultant',
      designation: 'Chief Travel Strategist',
      badgeColor: 'bg-emerald-600',
      experience: '8+ Years Experience',
      image: komalImg,
      bio: 'Master of bespoke holiday tailoring. Specializes in handcrafted honeymoon packages, multi-generational family tours, budget optimization, and private romantic stays.',
      specialty: 'Custom Itineraries & Guest Delight',
      phone: '8676928509',
      whatsappMsg: 'Hi Komal Mam! Please help me plan a tailor-made vacation itinerary for my family/partner.'
    }
  ];

  return (
    <section id="about-section" className="py-20 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1698B4]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-[2px] w-8 bg-[#FF7A00]"></div>
            <span className="text-[#1698B4] uppercase tracking-[0.25em] text-xs font-black">
              About Sky Wander Holidays
            </span>
            <div className="h-[2px] w-8 bg-[#FF7A00]"></div>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Crafted with Passion by <span className="text-[#FF7A00]">India’s Travel Artisans</span>
          </h2>
          
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Headquartered in Noida, Uttar Pradesh, <strong>Sky Wander Holidays</strong> is dedicated to crafting extraordinary domestic journeys across the snow peaks of Kashmir & Ladakh, the palm lagoons of Kerala, sunny Goa shores, and the royal heritage of Rajasthan.
          </p>
        </div>

        {/* Brand Story & Office Card Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7FA] text-[#1698B4] text-xs font-black uppercase tracking-wider border border-[#1698B4]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              Official Domestic Travel Atelier
            </div>

            <div className="flex items-center">
              <BrandLogo variant="horizontal" size="lg" />
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              At <strong>Sky Wander Holidays</strong>, we believe every Indian holiday should be effortless, authentic, and unforgettable. From our head office in <strong>Sector 49, Noida</strong>, our dedicated team coordinates verified cabs, handpicked premium resorts, and round-the-clock trip managers so you and your loved ones travel with 100% peace of mind.
            </p>

            {/* Core Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-[#1698B4]" />
                  <span>100% Verified Cabs</span>
                </div>
                <p className="text-[11px] text-slate-500">Dedicated private chauffeurs with verified credentials.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <Clock className="w-4 h-4 text-[#FF7A00]" />
                  <span>24x7 Trip Support</span>
                </div>
                <p className="text-[11px] text-slate-500">Live operational desk on WhatsApp and direct call.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Best Price Guarantee</span>
                </div>
                <p className="text-[11px] text-slate-500">Direct hotel rates with zero hidden surcharges.</p>
              </div>
            </div>
          </div>

          {/* Office & Direct Contact Card */}
          <div className="lg:col-span-5 bg-[#0B2530] text-white p-6 sm:p-7 rounded-2xl shadow-xl space-y-5 border border-[#1698B4]/40">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#38BDF8]">
                  Head Office Location
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  Sky Wander Holidays Desk
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FF7A00] text-white flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 animate-[spin_20s_linear_infinite]" />
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 text-xs text-slate-200">
              <MapPin className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-bold mb-0.5">Corporate & Booking Address:</strong>
                <span>Sector 49, Hanuman Mandir Near Sai Apartment, Noida, Uttar Pradesh - 201301</span>
              </div>
            </div>

            {/* Direct Phone */}
            <div className="flex items-start gap-3 text-xs text-slate-200">
              <Phone className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-bold mb-0.5">Helpline & Booking Call:</strong>
                <a href="tel:+918676928509" className="text-sm font-black text-[#FF7A00] hover:underline font-mono">
                  +91 86769 28509
                </a>
                <span className="block text-[10px] text-slate-400">Available 24x7 for all Indian holiday inquiries</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/918676928509?text=Namaste%20Sky%20Wander%20Holidays!%20I%20would%20like%20to%20plan%20a%20domestic%20tour%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (8676928509)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Leadership & Core Team Section */}
        <div className="mb-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#1698B4] text-xs font-black uppercase tracking-wider bg-[#EBF7FA] px-3 py-1 rounded-full border border-[#1698B4]/20">
              Leadership & Tour Architects
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
              Meet Our Leadership Team
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Personalized attention from the founders and specialists guiding every detail of your vacation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {leadershipTeam.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#1698B4]/50"
              >
                {/* Header Profile Photo with Role Tag */}
                <div className="relative h-72 sm:h-80 bg-slate-900 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (member.fallbackImage && e.currentTarget.src !== member.fallbackImage) {
                        e.currentTarget.src = member.fallbackImage;
                      }
                    }}
                    className={`w-full h-full object-cover ${member.imagePosition || 'object-top'} group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md ${member.badgeColor}`}>
                      {member.role}
                    </span>
                  </div>

                  {/* Experience Tag */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] font-bold">
                    {member.experience}
                  </div>

                  {/* Name on Image */}
                  <div className="absolute bottom-3.5 left-4 right-4">
                    <h4 className="text-2xl font-black text-white tracking-tight">
                      {member.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#38BDF8]">
                      {member.designation}
                    </p>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700">Specialty:</span>
                      <span className="font-semibold text-[#1698B4]">{member.specialty}</span>
                    </div>
                  </div>

                  {/* Direct Contact CTAs for this leader */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={`tel:+91${member.phone}`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      title={`Call ${member.name}`}
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                      <span>Call Now</span>
                    </a>
                    
                    <a
                      href={`https://wa.me/91${member.phone}?text=${encodeURIComponent(member.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      title={`WhatsApp ${member.name}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
