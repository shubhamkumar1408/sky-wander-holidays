import React, { useState, useEffect, useMemo } from 'react';
import { 
  Compass, 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  Calendar, 
  ArrowUpDown, 
  Filter, 
  Heart, 
  PhoneCall, 
  CheckCircle2, 
  ShieldCheck,
  TrendingUp,
  X,
  Palmtree,
  Mountain,
  Sun,
  Flame,
  ArrowRight
} from 'lucide-react';
import { DOMESTIC_PACKAGES } from './data/packages';
import { DOMESTIC_REGIONS, HOLIDAY_THEMES } from './data/destinations';
import { TourPackage, DestinationInfo } from './types';
import { resolveDestinationToPackage } from './utils/destinationPackageResolver';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LiveBookingTicker } from './components/LiveBookingTicker';
import { RegionExplorer } from './components/RegionExplorer';
import { TourCategoriesAutoSlider, TourCategoryItem } from './components/TourCategoriesAutoSlider';
import { PackageCard } from './components/PackageCard';
import { PackageModal } from './components/PackageModal';
import { BrochureDownloadModal } from './components/BrochureDownloadModal';
import { getBrochureForPackage } from './data/destinationBrochures';
import { CustomAITripPlanner } from './components/CustomAITripPlanner';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { LoginModal } from './components/LoginModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { GoogleWorkspacePanel } from './components/GoogleWorkspacePanel';
import { getCurrentUser, logoutUser, UserProfile, onAuthChange } from './utils/userAuth';
import { DomesticPerks } from './components/DomesticPerks';
import { CustomerReviews } from './components/CustomerReviews';
import { AboutUsSection } from './components/AboutUsSection';
import { BlogPage } from './components/BlogPage';
import { WhatsAppChatButton } from './components/WhatsAppChatButton';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [packages, setPackages] = useState<TourPackage[]>(DOMESTIC_PACKAGES);
  const [loading, setLoading] = useState(false);

  // View Routing: 'home' vs 'blogs' with URL Hash synchronization (#blog)
  const [currentView, setCurrentView] = useState<'home' | 'blogs'>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash.toLowerCase().includes('blog') ? 'blogs' : 'home';
    }
    return 'home';
  });

  // URL Hash routing listener (enables real browser URL navigation and Back/Forward buttons)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.toLowerCase().includes('blog')) {
        setCurrentView('blogs');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenBlogPage = () => {
    if (window.location.hash !== '#blog') {
      window.location.hash = 'blog';
    }
    setCurrentView('blogs');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    if (window.location.hash === '#blog') {
      window.location.hash = '';
    }
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  // User Auth & My Bookings state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getCurrentUser());
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showMyBookings, setShowMyBookings] = useState<boolean>(false);
  const [myBookingsPhone, setMyBookingsPhone] = useState<string>('');

  // Modals & Navigation
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'itinerary' | 'inclusions' | 'hotels' | 'reviews' | 'payment'>('itinerary');
  const [showCustomPlanner, setShowCustomPlanner] = useState(false);
  const [showQuickInquiry, setShowQuickInquiry] = useState(false);
  const [inquiryPackage, setInquiryPackage] = useState<TourPackage | null>(null);
  const [downloadBrochurePkg, setDownloadBrochurePkg] = useState<TourPackage | null>(null);
  const [showWorkspacePanel, setShowWorkspacePanel] = useState<boolean>(false);

  // Automatic login popup on website open ("website open karte hi login popup aaye")
  useEffect(() => {
    // If user is not logged in, trigger login popup shortly after website loads
    if (!currentUser) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen to auth changes
  useEffect(() => {
    return onAuthChange((user) => {
      setCurrentUser(user);
    });
  }, []);

  // Filters & State
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedTheme, setSelectedTheme] = useState<string>('All Themes');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [durationFilter, setDurationFilter] = useState<string>('all'); // all, 3-4, 5-6, 7+
  const [sortBy, setSortBy] = useState<string>('featured'); // featured, price-low, price-high, rating, duration
  const [onlySaved, setOnlySaved] = useState<boolean>(false);
  const [maxBudget, setMaxBudget] = useState<number | undefined>(undefined);

  // Saved Wishlist
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('swh_saved_tours');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('swh_saved_tours', JSON.stringify(savedIds));
    } catch {}
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Fetch packages from backend if available
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('/api/packages');
        if (res.ok) {
          const data = await res.json();
          if (data.packages && Array.isArray(data.packages) && data.packages.length > 0) {
            setPackages(data.packages);
          }
        }
      } catch (err) {
        console.log('Using local packages data fallback:', err);
      }
    };
    fetchTours();
  }, []);

  // Filter and Sort Math
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // 1. Saved filter
      if (onlySaved && !savedIds.includes(pkg.id)) return false;

      // 2. Region / State filter
      if (selectedRegion !== 'All Regions') {
        const matchReg = 
          pkg.region === selectedRegion || 
          pkg.state === selectedRegion ||
          (selectedRegion === 'International Destinations' && pkg.region === 'International Special');
        if (!matchReg) return false;
      }

      // 3. Theme filter
      if (selectedTheme !== 'All Themes' && pkg.theme !== selectedTheme) {
        return false;
      }

      // 4. Duration filter
      if (durationFilter === '3-4' && (pkg.durationDays < 3 || pkg.durationDays > 4)) return false;
      if (durationFilter === '5-6' && (pkg.durationDays < 5 || pkg.durationDays > 6)) return false;
      if (durationFilter === '7+' && pkg.durationDays < 7) return false;

      // 5. Max Budget
      if (maxBudget && pkg.pricePerPerson > maxBudget) return false;

      // 6. Text Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = pkg.title.toLowerCase().includes(q);
        const matchState = pkg.state.toLowerCase().includes(q);
        const matchRegion = pkg.region.toLowerCase().includes(q);
        const matchTag = pkg.tag.toLowerCase().includes(q);
        const matchDest = pkg.destinationsCovered.some(d => d.toLowerCase().includes(q));
        const matchHighlights = pkg.highlights.some(h => h.toLowerCase().includes(q));

        if (!matchTitle && !matchState && !matchRegion && !matchTag && !matchDest && !matchHighlights) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerPerson - b.pricePerPerson;
      if (sortBy === 'price-high') return b.pricePerPerson - a.pricePerPerson;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return b.durationDays - a.durationDays;
      // Default: featured (isFeatured first, then reviewsCount)
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [packages, selectedRegion, selectedTheme, searchQuery, durationFilter, sortBy, onlySaved, maxBudget, savedIds]);

  const handleHeroSearch = (params: { region: string; theme: string; search: string; maxPrice?: number }) => {
    setSelectedRegion(params.region);
    setSelectedTheme(params.theme);
    setSearchQuery(params.search);
    setMaxBudget(params.maxPrice);
    setOnlySaved(false);
  };

  const handleSelectQuickTag = (tag: string) => {
    try {
      const resolvedPkg = resolveDestinationToPackage(tag);
      if (resolvedPkg) {
        setModalInitialTab('itinerary');
        setSelectedPackage(resolvedPkg);
        return;
      }
    } catch {}
    setSearchQuery(tag);
    setSelectedRegion('All Regions');
    setSelectedTheme('All Themes');
    const elem = document.getElementById('packages-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectDestination = (destInput: string | DestinationInfo, tab: 'itinerary' | 'payment' = 'itinerary') => {
    const resolvedPkg = resolveDestinationToPackage(destInput);
    setModalInitialTab(tab);
    setSelectedPackage(resolvedPkg);
  };

  const handleCategorySelect = (item: TourCategoryItem) => {
    if (item.filterType === 'destination') {
      const resolvedPkg = resolveDestinationToPackage(item.filterValue);
      setModalInitialTab('itinerary');
      setSelectedPackage(resolvedPkg);
      return;
    } else if (item.filterType === 'theme') {
      setSelectedTheme(item.filterValue);
      setSelectedRegion('All Regions');
      setSearchQuery('');
    } else if (item.filterType === 'region') {
      setSelectedRegion(item.filterValue);
      setSelectedTheme('All Themes');
      setSearchQuery('');
    }
    const elem = document.getElementById('packages-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenInquiry = (pkg?: TourPackage) => {
    setInquiryPackage(pkg || null);
    setShowQuickInquiry(true);
  };

  const handleBookCustomPlan = (title: string, dest: string, estPrice: number) => {
    setShowCustomPlanner(false);
    setShowQuickInquiry(true);
  };

  const resetAllFilters = () => {
    setSelectedRegion('All Regions');
    setSelectedTheme('All Themes');
    setSearchQuery('');
    setDurationFilter('all');
    setSortBy('featured');
    setMaxBudget(undefined);
    setOnlySaved(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Navbar with Hotline & Weather Ticker */}
      <Navbar
        onOpenCustomPlanner={() => setShowCustomPlanner(true)}
        onOpenInquiry={handleOpenInquiry}
        onOpenMyBookings={(ph) => {
          setMyBookingsPhone(ph || (currentUser ? currentUser.phone : ''));
          setShowMyBookings(true);
        }}
        onOpenLogin={() => setShowLoginModal(true)}
        onOpenWorkspaceSync={() => setShowWorkspacePanel(true)}
        onOpenBlogPage={handleOpenBlogPage}
        onBackToHome={handleBackToHome}
        currentView={currentView}
        currentUser={currentUser}
        onLogout={() => {
          logoutUser();
          setCurrentUser(null);
        }}
        selectedRegion={selectedRegion}
        onSelectRegion={(reg) => {
          setSelectedRegion(reg);
          if (currentView === 'blogs') {
            setCurrentView('home');
            setTimeout(() => {
              const elem = document.getElementById('packages-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }, 60);
          } else {
            const elem = document.getElementById('packages-section');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedIds.length}
      />

      {/* Conditional View: Dedicated Blog Page vs Main Home Portal */}
      {currentView === 'blogs' ? (
        <main className="flex-1">
          <BlogPage
            onBackToHome={handleBackToHome}
            onSelectDestination={(destName) => handleSelectDestination(destName, 'itinerary')}
          />
        </main>
      ) : (
        <>
          {/* Hero Banner with Slideshow & Smart Search Filter */}
          <HeroBanner
            onSearch={handleHeroSearch}
            onOpenCustomPlanner={() => setShowCustomPlanner(true)}
            onSelectQuickTag={handleSelectQuickTag}
          />

          {/* Live Animated Booking Popups (Chalta Firta) */}
          <LiveBookingTicker />

          {/* Main Content Area */}
          <main className="flex-1">

        {/* 1. Auto Sliding Tour Categories Section (Matching Design) */}
        <TourCategoriesAutoSlider onSelectCategory={handleCategorySelect} />

        {/* 2. All-India Regional Destination Discovery Section */}
        <RegionExplorer
          onSelectDestination={handleSelectDestination}
          onSelectRegion={(reg) => {
            setSelectedRegion(reg);
            const elem = document.getElementById('packages-section');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Tour Packages Explorer Section */}
        <section id="packages-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-[2px] w-6 bg-[#FF7A00]"></div>
                <span className="text-[#1698B4] text-[10px] font-black uppercase tracking-[0.25em]">
                  Curated Domestic Collections
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  — Showing {filteredPackages.length} of {packages.length} Itineraries
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Handcrafted <span className="text-[#FF7A00]">Domestic Holiday Packages</span>
              </h2>
            </div>

            {/* AI Trip Planner CTA Ribbon */}
            <button
              onClick={() => setShowCustomPlanner(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2530] hover:bg-[#1698B4] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FF7A00]" />
              <span>Need Custom Plan? AI Architect</span>
            </button>
          </div>

          {/* Comprehensive Filter & Sort Control Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm mb-8 space-y-4">
            
            {/* Row 1: Themes horizontal scroll */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Filter by Holiday Theme:
                </span>
                {(selectedRegion !== 'All Regions' || selectedTheme !== 'All Themes' || searchQuery || maxBudget || durationFilter !== 'all' || onlySaved) && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs font-bold text-[#FF7A00] hover:text-[#E66E00] flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reset Filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <button
                  onClick={() => setSelectedTheme('All Themes')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-all cursor-pointer ${
                    selectedTheme === 'All Themes'
                      ? 'bg-[#1698B4] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Themes
                </button>
                {HOLIDAY_THEMES.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-all cursor-pointer ${
                      selectedTheme === theme
                        ? 'bg-[#FF7A00] text-white shadow-sm font-extrabold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: Region, Duration, Sort & Wishlist Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100 items-center">
              
              {/* Region / State Filter Dropdown */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  State / Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1698B4]"
                >
                  <option value="All Regions">All States & Regions</option>
                  <optgroup label="Popular States & Destinations">
                    <option value="Himachal Pradesh">🏔️ Himachal Pradesh</option>
                    <option value="Uttarakhand">🕉️ Uttarakhand (Devbhoomi)</option>
                    <option value="Ladakh">❄️ Ladakh (UT)</option>
                    <option value="Jammu & Kashmir">🌸 Jammu & Kashmir</option>
                    <option value="Rajasthan">🏰 Rajasthan (Udaipur, Jaipur, Jaisalmer)</option>
                    <option value="Kerala">🌴 Kerala Backwaters</option>
                    <option value="Goa">🏖️ Goa Beaches</option>
                    <option value="International Destinations">🌏 International Special</option>
                  </optgroup>
                  <optgroup label="Geographical Regions">
                    {DOMESTIC_REGIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Duration Filter Dropdown */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Duration
                </label>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1698B4]"
                >
                  <option value="all">Any Duration</option>
                  <option value="3-4">3 to 4 Days (Short Getaway)</option>
                  <option value="5-6">5 to 6 Days (Standard)</option>
                  <option value="7+">7+ Days (Grand Circuit)</option>
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1698B4]"
                >
                  <option value="featured">✨ Featured Collections</option>
                  <option value="price-low">💎 Price: Low to High</option>
                  <option value="price-high">👑 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="duration">⏳ Longest Duration</option>
                </select>
              </div>

              {/* Wishlist / Saved Only Toggle */}
              <div className="pt-2 sm:pt-4 flex items-center justify-between sm:justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOnlySaved(!onlySaved)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    onlySaved
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${onlySaved ? 'fill-white' : ''}`} />
                  <span>Saved ({savedIds.length})</span>
                </button>
              </div>

            </div>

            {/* Active search chip indicator */}
            {searchQuery && (
              <div className="flex items-center gap-2 text-xs bg-[#EBF7FA] text-[#1698B4] p-2.5 rounded-xl border border-[#1698B4]/30">
                <span>Filtering by: <strong>"{searchQuery}"</strong></span>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-auto font-bold text-[#1698B4] hover:underline cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Tour Packages Cards Grid */}
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onSelect={(p) => {
                    setModalInitialTab('itinerary');
                    setSelectedPackage(p);
                  }}
                  onPayQR={(p) => {
                    setModalInitialTab('payment');
                    setSelectedPackage(p);
                  }}
                  onQuickInquiry={(p) => handleOpenInquiry(p)}
                  onDownloadBrochure={(p) => setDownloadBrochurePkg(p)}
                  isSaved={savedIds.includes(pkg.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                No domestic tours match your current filters
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Try searching for a different destination like "Kashmir", "Goa", "Kerala", "Manali", or reset your price and theme filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* 3. Assurance & Why Choose Us Section */}
        <DomesticPerks />

        {/* 5. Customer Reviews & Social Proof */}
        <CustomerReviews />

        {/* 6. About Us & Leadership Team (Ritesh Kashyap, Karan, Komal) */}
        <AboutUsSection />

      </main>
      </>
      )}

      {/* Footer */}
      <Footer
        onSelectRegion={(reg) => {
          setSelectedRegion(reg);
          if (currentView === 'blogs') {
            setCurrentView('home');
            setTimeout(() => {
              const elem = document.getElementById('packages-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }, 60);
          } else {
            const elem = document.getElementById('packages-section');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onSelectTheme={(th) => {
          setSelectedTheme(th);
          if (currentView === 'blogs') {
            setCurrentView('home');
            setTimeout(() => {
              const elem = document.getElementById('packages-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }, 60);
          } else {
            const elem = document.getElementById('packages-section');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenBlogPage={handleOpenBlogPage}
      />

      {/* Floating WhatsApp Live Chat Widget */}
      <WhatsAppChatButton />

      {/* Package Details & Dynamic Calculator Modal */}
      {selectedPackage && (
        <PackageModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          initialTab={modalInitialTab}
        />
      )}

      {/* AI Custom Holiday Architect Modal */}
      {showCustomPlanner && (
        <CustomAITripPlanner
          onClose={() => setShowCustomPlanner(false)}
          onBookCustomPlan={handleBookCustomPlan}
        />
      )}

      {/* Quick Callback / Free Quotation Modal */}
      {showQuickInquiry && (
        <QuickInquiryModal
          pkg={inquiryPackage}
          onClose={() => {
            setShowQuickInquiry(false);
            setInquiryPackage(null);
          }}
          onViewMyBookings={(ph) => {
            setMyBookingsPhone(ph);
            setShowMyBookings(true);
          }}
        />
      )}

      {/* Destination Brochure PDF Download Modal */}
      {downloadBrochurePkg && (
        <BrochureDownloadModal
          brochure={getBrochureForPackage(downloadBrochurePkg.id || downloadBrochurePkg.title)}
          isOpen={Boolean(downloadBrochurePkg)}
          onClose={() => setDownloadBrochurePkg(null)}
        />
      )}

      {/* Instant Login Popup (Triggered automatically on website open, or via Navbar) */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setShowLoginModal(false);
        }}
        onOpenMyBookings={(ph) => {
          setMyBookingsPhone(ph || (currentUser ? currentUser.phone : ''));
          setShowMyBookings(true);
        }}
      />

      {/* My Bookings & Trip Dashboard Modal (Search by number or click demo numbers) */}
      <MyBookingsModal
        isOpen={showMyBookings}
        onClose={() => setShowMyBookings(false)}
        initialPhone={myBookingsPhone || (currentUser ? currentUser.phone : '')}
        onOpenInquiry={() => {
          setShowMyBookings(false);
          setShowQuickInquiry(true);
        }}
        onOpenLogin={() => {
          setShowMyBookings(false);
          setShowLoginModal(true);
        }}
      />

      {/* Google Sheets & Gmail Workspace Hub */}
      <GoogleWorkspacePanel
        isOpen={showWorkspacePanel}
        onClose={() => setShowWorkspacePanel(false)}
      />

    </div>
  );
};

export default App;
