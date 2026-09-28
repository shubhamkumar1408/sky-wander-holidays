import React from 'react';
import { 
  Star, 
  Clock, 
  MapPin, 
  Utensils, 
  Car, 
  Building2, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  MessageCircle,
  Sparkles,
  Share2,
  Download,
  QrCode
} from 'lucide-react';
import { TourPackage } from '../types';

interface PackageCardProps {
  pkg: TourPackage;
  onSelect: (pkg: TourPackage) => void;
  onPayQR?: (pkg: TourPackage) => void;
  onQuickInquiry: (pkg: TourPackage) => void;
  onDownloadBrochure?: (pkg: TourPackage) => void;
  isSaved?: boolean;
  onToggleSave?: (pkgId: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onSelect,
  onPayQR,
  onQuickInquiry,
  onDownloadBrochure,
  isSaved = false,
  onToggleSave
}) => {
  const discountPercent = Math.round(((pkg.originalPrice - pkg.pricePerPerson) / pkg.originalPrice) * 100);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${pkg.title} - Sky Wander Holidays`,
        text: `Check out this domestic package: ${pkg.title} (${pkg.durationNights}N/${pkg.durationDays}D) at just ₹${pkg.pricePerPerson.toLocaleString('en-IN')}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tour link copied to clipboard!');
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Sky Wander Holidays! I am interested in the "${pkg.title}" (${pkg.durationNights}N/${pkg.durationDays}D) starting at ₹${pkg.pricePerPerson.toLocaleString('en-IN')}. Please share custom itinerary and best quotation.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div 
      onClick={() => onSelect(pkg)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 relative hover:border-[#1698B4]/60"
    >
      {/* Top Image Container */}
      <div className="relative h-60 overflow-hidden bg-slate-100">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-md bg-[#FF7A00] text-white text-[10px] font-black tracking-wider uppercase shadow-sm">
              {pkg.tag}
            </span>
            {discountPercent > 0 && (
              <span className="px-2 py-1 rounded-md bg-[#0B2530]/90 text-[#38BDF8] text-[10px] font-extrabold shadow-sm border border-[#1698B4]/40">
                Save {discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-md hover:bg-[#1698B4] text-white flex items-center justify-center transition-colors"
              title="Share Tour"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            {onToggleSave && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(pkg.id);
                }}
                className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                  isSaved 
                    ? 'bg-[#FF7A00] text-white' 
                    : 'bg-slate-900/70 text-white hover:bg-[#FF7A00]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom overlay: Duration & Destinations Covered */}
        <div className="absolute bottom-3.5 left-4 right-4 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold mb-1 text-[#38BDF8]">
            <span className="flex items-center gap-1 bg-slate-950/70 px-2.5 py-0.5 rounded backdrop-blur-sm border border-[#1698B4]/30 text-[11px] uppercase tracking-wider font-bold">
              <Clock className="w-3.5 h-3.5 text-[#FF7A00]" />
              {pkg.durationNights}N / {pkg.durationDays}D
            </span>
            <span className="flex items-center gap-1 bg-slate-950/70 px-2.5 py-0.5 rounded backdrop-blur-sm border border-[#1698B4]/30 text-[11px] uppercase tracking-wider font-bold">
              <Building2 className="w-3.5 h-3.5 text-[#FF7A00]" />
              {pkg.hotelGrade}
            </span>
          </div>
          <p className="text-xs text-slate-200 line-clamp-1 font-medium">
            📍 {pkg.destinationsCovered.join(' • ')}
          </p>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 text-[#FF7A00] font-bold">
              <Star className="w-3.5 h-3.5 fill-[#FF7A00] text-[#FF7A00]" />
              <span>{pkg.rating}</span>
              <span className="text-slate-400 font-normal">({pkg.reviewsCount} reviews)</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1698B4] bg-[#EBF7FA] px-2.5 py-0.5 rounded-full border border-[#1698B4]/20">
              {pkg.theme}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1698B4] transition-colors leading-snug line-clamp-2">
            {pkg.title}
          </h3>

          {/* Quick Highlights */}
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
            {pkg.highlights.slice(0, 2).map((hl, idx) => (
              <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                <span className="text-[#FF7A00] font-bold shrink-0">✦</span>
                <span className="line-clamp-1">{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Feature inclusions strip */}
        <div className="py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-[11px] text-slate-700 font-medium">
          <span className="flex items-center gap-1">
            <Utensils className="w-3.5 h-3.5 text-[#1698B4]" />
            Meals
          </span>
          <span className="flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-[#1698B4]" />
            Private Cab
          </span>
          <span className="flex items-center gap-1 text-slate-900 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A00]" />
            Trip Captain
          </span>
        </div>

        {/* Pricing & CTA Button */}
        <div className="pt-3.5 border-t border-slate-100 flex items-end justify-between gap-3">
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Starting from</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">
                ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
              </span>
              {pkg.originalPrice > pkg.pricePerPerson && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  ₹{pkg.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Per Person • All Taxes</span>
          </div>

          <div className="flex items-center gap-1.5">
            {onDownloadBrochure && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadBrochure(pkg);
                }}
                className="p-2.5 rounded-xl bg-orange-50 text-[#FF7A00] hover:bg-[#FF7A00] hover:text-white border border-orange-200 transition-colors cursor-pointer"
                title="Download Itinerary PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleWhatsApp}
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelect(pkg)}
              className="px-3.5 py-2.5 rounded-xl bg-[#1698B4] hover:bg-[#0D7E99] text-white font-bold text-[11px] uppercase tracking-wider shadow-md shadow-[#1698B4]/25 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>View Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
