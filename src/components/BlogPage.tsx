import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ArrowUpDown, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  Newspaper,
  ChevronRight,
  Home
} from 'lucide-react';
import { TRAVEL_NEWS_BLOGS, TravelBlogPost } from '../data/travelBlogs';
import { BlogPostModal } from './BlogPostModal';

interface BlogPageProps {
  onBackToHome: () => void;
  onSelectDestination: (destName: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onBackToHome,
  onSelectDestination
}) => {
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc'); // desc = newest first
  const [readingPost, setReadingPost] = useState<TravelBlogPost | null>(null);

  // Unique destinations list for filter tabs
  const destinationsList = useMemo(() => {
    const set = new Set<string>();
    TRAVEL_NEWS_BLOGS.forEach(b => set.add(b.destination));
    return ['All', ...Array.from(set)];
  }, []);

  const categoriesList = ['All', 'Travel Advisory', 'Weather & Road', 'Seasonal Highlight', 'Festival & Culture', 'Tourist Guidelines'];

  // Filtered and sorted blogs
  const filteredBlogs = useMemo(() => {
    return TRAVEL_NEWS_BLOGS.filter(post => {
      // 1. Destination filter
      if (selectedDestinationFilter !== 'All' && post.destination !== selectedDestinationFilter) {
        return false;
      }

      // 2. Category filter
      if (selectedCategoryFilter !== 'All' && post.category !== selectedCategoryFilter) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchDest = post.destination.toLowerCase().includes(q);
        const matchState = post.state.toLowerCase().includes(q);
        const matchSummary = post.summary.toLowerCase().includes(q);
        const matchCategory = post.category.toLowerCase().includes(q);
        if (!matchTitle && !matchDest && !matchState && !matchSummary && !matchCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [selectedDestinationFilter, selectedCategoryFilter, searchQuery, sortOrder]);

  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const gridPosts = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : (filteredBlogs.length === 1 ? [] : []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-[#0B2530] text-white py-3.5 px-4 sm:px-6 lg:px-8 border-b border-[#1698B4]/30 sticky top-[60px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="font-bold text-[#FF7A00]">Blog</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-400 hidden sm:inline">Destination News & Ground Updates</span>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer active:scale-95 border border-white/20"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Back to Home / Packages</span>
          </button>
        </div>
      </div>

      {/* Blog Page Hero Banner */}
      <div className="bg-gradient-to-b from-[#0B2530] via-slate-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1698B4]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF7A00]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#38BDF8]">
              <span className="bg-[#1698B4]/20 border border-[#1698B4]/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Official Travel Desk
              </span>
              <span>Past 30 Days (August – September 2026)</span>
              <span>·</span>
              <span className="text-emerald-400 font-bold">Updated: 27 Sep 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Sky Wander <span className="text-[#FF7A00]">Blog</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Daily verified ground news, weather advisories, mountain pass reports, festival schedules, and local guidelines for Kedarnath, Spiti, Valley of Flowers, Kashmir, Ladakh, Goa, Kerala, and Rajasthan.
            </p>

            {/* Quick Stats Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {TRAVEL_NEWS_BLOGS.length} Published Field Reports
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <MapPin className="w-4 h-4 text-[#FF7A00]" /> 12+ Major Destinations Covered
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <Clock className="w-4 h-4 text-[#38BDF8]" /> Chronologically Arranged (Date-Wise)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Blog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        
        {/* Search, Filter & Sort Controls Card */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blog news: Kedarnath closing, Spiti Chandratal, Gulmarg Gondola, Goa shacks, Pushkar fair..."
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Toggle Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#1698B4]" />
                <span>{sortOrder === 'desc' ? 'Newest Date First (Today → Aug)' : 'Oldest Date First (Aug → Sep)'}</span>
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1">
              Category:
            </span>
            {categoriesList.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Destination Filter Scrollable Strip */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#1698B4]" />
              Destination:
            </span>
            {destinationsList.map(dest => (
              <button
                key={dest}
                onClick={() => setSelectedDestinationFilter(dest)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDestinationFilter === dest
                    ? 'bg-[#1698B4] text-white shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Lead / Featured Breaking News Story */}
        {featuredPost && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Featured Image */}
              <div 
                className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto min-h-[320px] overflow-hidden bg-slate-900 cursor-pointer group"
                onClick={() => setReadingPost(featuredPost)}
              >
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                    Latest Lead Story
                  </span>
                  <span className="bg-slate-900/90 backdrop-blur-sm text-[#38BDF8] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#1698B4]/30">
                    {featuredPost.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="font-bold flex items-center gap-1 text-[#FF7A00]">
                    <MapPin className="w-3.5 h-3.5" />
                    {featuredPost.destination}, {featuredPost.state}
                  </span>
                </div>
              </div>

              {/* Featured Content Details */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#1698B4]" />
                      {featuredPost.displayDate}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>By {featuredPost.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h2 
                    onClick={() => setReadingPost(featuredPost)}
                    className="text-xl sm:text-2xl font-black text-slate-900 hover:text-[#1698B4] transition-colors leading-snug cursor-pointer"
                  >
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {featuredPost.summary}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5 text-xs text-slate-700">
                    {featuredPost.keyTakeaways.slice(0, 2).map((pt, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons for Lead Story */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setReadingPost(featuredPost)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <span>Read Full Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectDestination(featuredPost.relatedDestinationName || featuredPost.destination)}
                      className="px-3.5 py-2.5 rounded-xl bg-[#1698B4] hover:bg-[#0D7E99] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Open Tour Package Itinerary"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>View Tour</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Grid of Date-Wise Blog Articles */}
        {gridPosts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Recent Stories ({gridPosts.length})</span>
                <span className="text-xs text-slate-400 font-normal">Sorted date-wise</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map(post => (
                <div 
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 group"
                >
                  {/* Top Image Container */}
                  <div 
                    className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setReadingPost(post)}
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Category Chip */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-slate-900/90 backdrop-blur-md text-[#38BDF8] text-[10px] font-bold uppercase tracking-wider border border-[#1698B4]/30">
                      {post.category}
                    </span>

                    {/* Date Badge Top Right */}
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5 text-[#1698B4]" />
                      {post.displayDate}
                    </span>

                    {/* Destination Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF7A00]" />
                        {post.destination}
                      </span>
                      <span className="text-[10px] text-slate-300 font-normal">{post.readTime}</span>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-500 font-medium">
                        By {post.author} · {post.state}
                      </div>

                      <h4 
                        onClick={() => setReadingPost(post)}
                        className="text-base font-bold text-slate-900 group-hover:text-[#1698B4] transition-colors line-clamp-2 leading-snug cursor-pointer"
                      >
                        {post.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setReadingPost(post)}
                        className="text-xs font-bold text-[#1698B4] hover:text-[#FF7A00] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Read Story</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectDestination(post.relatedDestinationName || post.destination)}
                          className="px-3 py-1.5 rounded-lg bg-[#1698B4] hover:bg-[#0D7E99] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                          title="View Destination Tour"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>View Tour</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          filteredBlogs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No blog stories match your current filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for another keyword or resetting destination and category filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDestinationFilter('All');
                  setSelectedCategoryFilter('All');
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase cursor-pointer"
              >
                Reset Blog Filters
              </button>
            </div>
          )
        )}

      </div>

      {/* Reading Article Modal */}
      {readingPost && (
        <BlogPostModal
          post={readingPost}
          onClose={() => setReadingPost(null)}
          onSelectDestination={onSelectDestination}
        />
      )}

    </div>
  );
};
