import React from 'react';
import { Star, CheckCircle, Quote, MapPin, Sparkles } from 'lucide-react';
import { TRAVELER_REVIEWS } from '../data/destinations';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-18 bg-[#0B2530] text-white relative overflow-hidden">
      {/* Ambient teal glow */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#1698B4]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#FF7A00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-8 bg-[#FF7A00]"></div>
              <span className="text-[#38BDF8] uppercase tracking-[0.3em] text-[10px] sm:text-xs font-black">
                Guest Chronicles
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Unforgettable Memories, <span className="text-[#FF7A00]">Shared by Travelers</span>
            </h2>
            <p className="mt-3 text-slate-300 text-sm max-w-xl leading-relaxed">
              Over 45,000+ satisfied travelers across India have made lifelong memories with Sky Wander Holidays bespoke circuits.
            </p>
          </div>

          {/* Rating Badge */}
          <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-[#1698B4]/30 flex items-center gap-5 shrink-0 shadow-xl">
            <div className="text-center border-r border-slate-700 pr-5">
              <div className="text-3xl font-black text-[#FF7A00]">4.9</div>
              <div className="flex items-center gap-0.5 text-[#FF7A00] mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#FF7A00]" />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Google & Trip Verified</p>
              <p className="text-[11px] text-[#38BDF8] font-bold mt-0.5">99.4% Exceptional Rating</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAVELER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/[0.04] backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:bg-white/[0.08] hover:border-[#1698B4]/50 transition-all duration-300 relative group shadow-lg"
            >
              <div>
                {/* Stars & Date */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1 text-[#FF7A00]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#FF7A00]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
                </div>

                {/* Tour Name */}
                <div className="text-xs font-bold text-[#38BDF8] mb-2.5 line-clamp-1">
                  ✦ {rev.tour}
                </div>

                {/* Review text */}
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author (Bina photo ke - displaying who reviewed) */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1698B4] to-[#0B2530] border border-[#1698B4]/40 flex items-center justify-center text-white text-xs font-black shadow-inner shrink-0">
                  {rev.name.replace(/^(Col\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '').split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('') || 'SW'}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                    <span className="truncate">{rev.name}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" title="Verified Traveler" />
                    )}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-[#FF7A00] shrink-0" />
                    <span className="truncate">{rev.city}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-emerald-400 text-[10px] font-semibold">Verified Traveler</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
