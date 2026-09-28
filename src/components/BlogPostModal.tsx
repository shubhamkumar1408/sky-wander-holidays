import React from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Share2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  MessageCircle,
  ExternalLink,
  Sparkles,
  Compass
} from 'lucide-react';
import { TravelBlogPost } from '../data/travelBlogs';
import { TourPackage } from '../types';

interface BlogPostModalProps {
  post: TravelBlogPost | null;
  onClose: () => void;
  onSelectDestination?: (destName: string) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  onClose,
  onSelectDestination
}) => {
  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `${post.title} - Sky Wander Holidays Blog`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Sky Wander Holidays, I was reading your blog "${post.title}" (${post.displayDate}) regarding ${post.destination}. I would like more information and a customized tour package quote.`
    );
    window.open(`https://wa.me/918676928509?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-900">{post.destination}</span>
            <span aria-hidden="true">·</span>
            <span>{post.state}</span>
            <span aria-hidden="true">·</span>
            <span className="font-bold text-[#FF7A00]">{post.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Share News Story"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close Article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Header & Title */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-medium flex items-center gap-1 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-[#1698B4]" />
                {post.displayDate}
              </span>
              <span aria-hidden="true">·</span>
              <span>By {post.author}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed border-l-4 border-[#FF7A00] pl-4 py-1 bg-amber-50/50 rounded-r-xl">
              {post.summary}
            </p>
          </div>

          {/* Hero Feature Image */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span className="flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
                {post.destination}, {post.state}
              </span>
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-md text-[11px] font-bold">
                News Date: {post.displayDate}
              </span>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF7A00]" />
              Key Ground Updates & Advisory Takeaways
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {post.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Article Body Paragraphs */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Expert Traveler Tip Callout */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-0.5">
                Sky Wander Tour Specialist Tip:
              </h4>
              <p className="text-xs sm:text-sm text-amber-800">
                {post.travelerAdvice}
              </p>
            </div>
          </div>

          {/* Direct CTA Action Box Linking to Destination Page & UPI QR */}
          <div className="bg-gradient-to-r from-[#0B2530] via-slate-900 to-purple-950 p-6 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg border border-purple-500/20">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#38BDF8]">
                Explore Verified Packages for this Destination
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Plan Your Trip to {post.destination}
              </h4>
              <p className="text-xs text-slate-300">
                Starting from <strong className="text-[#FF7A00] font-black text-sm">₹{post.startingPrice.toLocaleString('en-IN')}</strong>/person · Includes 4★ Hotels, Dedicated Cab & Driver
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              {onSelectDestination && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectDestination(post.relatedDestinationName || post.destination);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#1698B4] hover:bg-[#0D7E99] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>View Itinerary & Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={handleWhatsApp}
                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Chat with Trip Specialist"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 sm:px-8 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Sky Wander Holidays · Official Destination Travel Desk</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close Story ✕
          </button>
        </div>
      </div>
    </div>
  );
};
