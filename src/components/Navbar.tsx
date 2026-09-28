import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Heart, 
  Menu, 
  X, 
  ShieldCheck, 
  Search,
  Sun,
  CloudSnow,
  Palmtree,
  Mountain,
  MessageCircle,
  Users,
  Luggage,
  User,
  LogOut,
  ChevronDown,
  FileSpreadsheet
} from 'lucide-react';
import { TourPackage } from '../types';
import { BrandLogo } from './BrandLogo';
import { UserProfile } from '../utils/userAuth';

interface NavbarProps {
  onOpenCustomPlanner: () => void;
  onOpenInquiry: (pkg?: TourPackage) => void;
  onOpenMyBookings: (phone?: string) => void;
  onOpenLogin: () => void;
  onOpenWorkspaceSync?: () => void;
  onOpenBlogPage: () => void;
  onBackToHome?: () => void;
  currentView?: 'home' | 'blogs';
  currentUser: UserProfile | null;
  onLogout: () => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  savedCount: number;
}

const WEATHER_TICKERS = [
  { city: 'Gulmarg, Kashmir', temp: '11°C', icon: CloudSnow, condition: 'Chilly & Clear' },
  { city: 'Manali, Himachal', temp: '14°C', icon: Mountain, condition: 'Pleasant Breeze' },
  { city: 'Calangute, Goa', temp: '29°C', icon: Palmtree, condition: 'Sunny Beach' },
  { city: 'Munnar, Kerala', temp: '18°C', icon: Sun, condition: 'Misty Tea Hills' },
  { city: 'Pangong, Ladakh', temp: '9°C', icon: CloudSnow, condition: 'Crystal Blue' }
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCustomPlanner,
  onOpenInquiry,
  onOpenMyBookings,
  onOpenLogin,
  onOpenWorkspaceSync,
  onOpenBlogPage,
  onBackToHome,
  currentView = 'home',
  currentUser,
  onLogout,
  onSelectRegion,
  searchQuery,
  onSearchChange,
  savedCount
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % WEATHER_TICKERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentWeather = WEATHER_TICKERS[tickerIndex];
  const WeatherIcon = currentWeather.icon;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'blogs' && onBackToHome) {
      onBackToHome();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification & Hotline Strip */}
      <div className="bg-[#0B2530] text-white text-xs py-2 px-4 border-b border-[#1698B4]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Weather & Live Ticker */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1698B4]/20 text-[#38BDF8] font-semibold border border-[#1698B4]/40 text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-ping"></span>
              Noida Office • Domestic Specialist
            </span>
            
            <div className="flex items-center gap-1.5 text-slate-300 font-medium transition-all duration-500 text-xs">
              <WeatherIcon className="w-3.5 h-3.5 text-[#FF7A00] animate-pulse" />
              <span>{currentWeather.city}: <strong className="text-white">{currentWeather.temp}</strong> ({currentWeather.condition})</span>
            </div>
          </div>

          {/* Direct Mobile & WhatsApp Contacts */}
          <div className="flex items-center gap-4 text-slate-200">
            <a 
              href="tel:+918676928509" 
              className="flex items-center gap-1.5 hover:text-[#FF7A00] transition-colors font-bold text-xs tracking-wide"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Call: +91 86769 28509</span>
            </a>

            <a 
              href="https://wa.me/918676928509?text=Namaste%20Sky%20Wander%20Holidays!%20I%20am%20looking%20for%20a%20domestic%20tour%20package." 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-bold text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenInquiry()}
              className="hidden md:flex items-center gap-1.5 text-[#38BDF8] hover:text-[#FF7A00] font-medium text-xs transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Verified Cabs & Hotels</span>
            </button>

            <button
              onClick={() => onOpenMyBookings()}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1698B4]/20 hover:bg-[#1698B4]/40 text-amber-300 hover:text-white border border-[#1698B4]/40 font-bold text-xs transition-all cursor-pointer"
              title="Check Trip Bookings & Vouchers"
            >
              <Luggage className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>My Bookings</span>
            </button>

            {onOpenWorkspaceSync && (
              <button
                onClick={onOpenWorkspaceSync}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 hover:text-emerald-100 border border-emerald-500/50 font-bold text-xs transition-all cursor-pointer"
                title="Google Sheets & Gmail Integration Hub"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sheets & Email Sync</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`w-full transition-all duration-300 border-b border-slate-200/80 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' 
          : 'bg-white shadow-sm py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo - Official Sky Wander Holidays Logo */}
          <div 
            onClick={() => {
              if (currentView === 'blogs' && onBackToHome) {
                onBackToHome();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center cursor-pointer group shrink-0 select-none mr-2 sm:mr-4"
          >
            <BrandLogo variant="horizontal" size="md" />
          </div>

          {/* Desktop Search Box - Clean, Fixed-Width, Non-colliding */}
          <div className="hidden xl:flex items-center w-44 2xl:w-56 relative shrink-0 mx-2 2xl:mx-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tours..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] focus:border-[#1698B4] text-slate-800 placeholder-slate-400 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4 2xl:gap-5 text-xs font-bold uppercase tracking-wider text-slate-700 shrink-0">
            <button 
              onClick={() => scrollToSection('tour-categories-slider-section')}
              className="hover:text-[#1698B4] transition-colors pb-1 hover:border-b-2 hover:border-[#1698B4] cursor-pointer text-[#1698B4] whitespace-nowrap"
            >
              Categories
            </button>
            <button 
              onClick={() => scrollToSection('destinations-section')}
              className="hover:text-[#1698B4] transition-colors pb-1 hover:border-b-2 hover:border-[#1698B4] cursor-pointer"
            >
              Destinations
            </button>
            <button 
              onClick={() => scrollToSection('packages-section')}
              className="hover:text-[#1698B4] transition-colors pb-1 hover:border-b-2 hover:border-[#1698B4] cursor-pointer"
            >
              Packages
            </button>
            <button 
              onClick={() => {
                onSelectRegion('North India');
                scrollToSection('packages-section');
              }}
              className="hover:text-[#1698B4] transition-colors pb-1 hover:border-b-2 hover:border-[#1698B4] cursor-pointer"
            >
              Himalayas
            </button>
            <button 
              onClick={() => {
                onSelectRegion('South India');
                scrollToSection('packages-section');
              }}
              className="hover:text-[#1698B4] transition-colors pb-1 hover:border-b-2 hover:border-[#1698B4] cursor-pointer"
            >
              South India
            </button>
            <button 
              onClick={onOpenBlogPage}
              className={`transition-colors pb-1 hover:border-b-2 hover:border-[#1698B4] cursor-pointer flex items-center gap-1.5 ${
                currentView === 'blogs'
                  ? 'border-b-2 border-[#1698B4] text-[#1698B4] font-black'
                  : 'hover:text-[#1698B4] text-slate-700'
              }`}
            >
              <span>Blog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse"></span>
            </button>
            <button 
              onClick={() => scrollToSection('about-section')}
              className="hover:text-[#1698B4] transition-colors pb-1 hover:border-b-2 hover:border-[#1698B4] cursor-pointer text-[#1698B4]"
            >
              About Us
            </button>
            <button 
              onClick={onOpenCustomPlanner}
              className="flex items-center gap-1.5 text-[#1698B4] hover:text-[#0D7E99] bg-[#EBF7FA] hover:bg-[#D6F1F7] px-3 py-1.5 rounded-full border border-[#1698B4]/30 font-bold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>AI Planner</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* My Bookings Button */}
            <button
              onClick={() => onOpenMyBookings(currentUser ? currentUser.phone : undefined)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#EBF7FA] hover:bg-[#D6F1F7] text-[#1698B4] border border-[#1698B4]/40 font-bold text-xs transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              title="View My Bookings & Vouchers"
            >
              <Luggage className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span className="hidden xs:inline">My Bookings</span>
            </button>

            {/* User Account / Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-[#1698B4] text-white flex items-center justify-center text-[10px] font-black">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[75px] truncate">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-[#1698B4] font-semibold">+91 {currentUser.phone}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenMyBookings(currentUser.phone);
                      }}
                      className="w-full px-3.5 py-2 text-left hover:bg-[#EBF7FA] hover:text-[#1698B4] flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <Luggage className="w-3.5 h-3.5 text-[#FF7A00]" />
                      <span>My Bookings</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full px-3.5 py-2 text-left hover:bg-slate-50 text-slate-700 flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Switch Account</span>
                    </button>
                    {onOpenWorkspaceSync && (
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenWorkspaceSync();
                        }}
                        className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 text-emerald-800 flex items-center gap-2 font-medium cursor-pointer"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Google Sheets & Email Hub</span>
                      </button>
                    )}
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full px-3.5 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs border border-slate-200 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#1698B4]" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => scrollToSection('packages-section')}
              className="relative p-2 text-slate-600 hover:text-[#FF7A00] transition-colors cursor-pointer"
              title="Saved Packages"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF7A00] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onOpenInquiry()}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#FF7A00]/25 transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan Your Trip</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-800 hover:text-black rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            {/* Search Input for Mobile */}
            <div className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search domestic tours..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1698B4] text-slate-900"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Mobile User Profile & My Bookings Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#EBF7FA] to-slate-50 border border-[#1698B4]/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1698B4] text-white flex items-center justify-center font-black text-xs">
                    {currentUser ? currentUser.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">
                      {currentUser ? currentUser.name : 'Guest Traveler'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {currentUser ? `+91 ${currentUser.phone}` : 'Sign in to view your bookings'}
                    </p>
                  </div>
                </div>

                {currentUser ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="text-[11px] text-rose-600 hover:underline font-bold px-2 py-1 rounded-lg bg-rose-50 border border-rose-200"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="text-[11px] text-white font-bold px-3 py-1.5 rounded-xl bg-[#1698B4] shadow-xs"
                  >
                    Login
                  </button>
                )}
              </div>

              {/* My Bookings direct button in mobile */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings(currentUser ? currentUser.phone : undefined);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#0B2530] to-[#1698B4] text-white font-bold text-xs uppercase tracking-wider shadow-sm active:scale-98"
              >
                <Luggage className="w-4 h-4 text-[#FF7A00]" />
                <span>My Bookings & Vouchers</span>
              </button>

              {onOpenWorkspaceSync && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWorkspaceSync();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider shadow-sm active:scale-98"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Google Sheets & Email Hub</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
              <button 
                onClick={() => scrollToSection('tour-categories-slider-section')}
                className="p-3 rounded-xl bg-[#EBF7FA] text-[#1698B4] text-left border border-[#1698B4]/30"
              >
                🎡 Categories
              </button>
              <button 
                onClick={() => scrollToSection('destinations-section')}
                className="p-3 rounded-xl bg-slate-50 text-slate-800 text-left hover:bg-[#EBF7FA] hover:text-[#1698B4] border border-slate-200"
              >
                📍 Destinations
              </button>
              <button 
                onClick={() => scrollToSection('packages-section')}
                className="p-3 rounded-xl bg-slate-50 text-slate-800 text-left hover:bg-[#EBF7FA] hover:text-[#1698B4] border border-slate-200"
              >
                🎒 Tour Packages
              </button>
              <button 
                onClick={() => {
                  onSelectRegion('North India');
                  scrollToSection('packages-section');
                }}
                className="p-3 rounded-xl bg-slate-50 text-slate-800 text-left hover:bg-[#EBF7FA] hover:text-[#1698B4] border border-slate-200"
              >
                🏔️ Kashmir & Ladakh
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBlogPage();
                }}
                className={`p-3 rounded-xl text-left border font-bold ${
                  currentView === 'blogs'
                    ? 'bg-[#1698B4] text-white border-[#1698B4]'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border-amber-200'
                }`}
              >
                📰 Blog
              </button>
              <button 
                onClick={() => scrollToSection('about-section')}
                className="p-3 rounded-xl bg-[#EBF7FA] text-[#1698B4] text-left border border-[#1698B4]/30"
              >
                👥 About & Team
              </button>
            </div>

            {/* Direct Call Strip for Mobile */}
            <a
              href="tel:+918676928509"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#FF7A00]" />
              <span>Call Helpline: 8676928509</span>
            </a>

            <a
              href="https://wa.me/918676928509?text=Namaste%20Sky%20Wander%20Holidays!%20I%20want%20to%20plan%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp: 8676928509</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomPlanner();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1698B4] text-white font-bold text-xs uppercase tracking-wider shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#FF7A00]" />
              <span>AI Custom Holiday Planner</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF7A00] text-white font-bold text-xs uppercase tracking-wider shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan Your Trip / Free Quote</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
