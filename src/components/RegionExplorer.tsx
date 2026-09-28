import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Sun, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  Layers,
  Compass,
  Building2,
  Mountain,
  Palmtree,
  Globe2,
  Flame,
  ShieldCheck,
  Car,
  Hotel,
  PhoneCall,
  QrCode
} from 'lucide-react';
import { 
  DOMESTIC_DESTINATIONS, 
  STATE_GROUPS, 
  LOCATION_CIRCUITS,
  StateGroupInfo 
} from '../data/destinations';
import { DestinationInfo } from '../types';

interface RegionExplorerProps {
  onSelectDestination: (dest: DestinationInfo | string, openTab?: 'itinerary' | 'payment') => void;
  onSelectRegion: (regionOrState: string) => void;
}

export const RegionExplorer: React.FC<RegionExplorerProps> = ({
  onSelectDestination,
  onSelectRegion
}) => {
  // View mode: 'state' (State-wise grouped) vs 'circuit' (Location circuit grouped)
  const [viewMode, setViewMode] = useState<'state' | 'circuit'>('state');
  
  // Selected State filter ('all' or specific state name like 'Himachal Pradesh')
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('all');
  
  // Selected Circuit filter ('circuit-all' or specific circuit id)
  const [selectedCircuitFilter, setSelectedCircuitFilter] = useState<string>('circuit-all');
  
  // Search query inside destination explorer
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Count destinations per state
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    DOMESTIC_DESTINATIONS.forEach((d) => {
      // Map international destinations to 'International Destinations'
      const stateKey = (d.region === 'International Special') ? 'International Destinations' : d.state;
      counts[stateKey] = (counts[stateKey] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered destinations based on search query and active state/circuit filter
  const filteredDestinations = useMemo(() => {
    return DOMESTIC_DESTINATIONS.filter((d) => {
      // State filter check
      if (selectedStateFilter !== 'all') {
        if (selectedStateFilter === 'International Destinations') {
          if (d.region !== 'International Special') return false;
        } else if (d.state !== selectedStateFilter) {
          return false;
        }
      }

      // Circuit filter check
      if (selectedCircuitFilter !== 'circuit-all') {
        if (selectedCircuitFilter === 'circuit-alpine') {
          if (!['Himachal Pradesh', 'Ladakh', 'Jammu & Kashmir'].includes(d.state)) return false;
        } else if (selectedCircuitFilter === 'circuit-spiritual') {
          if (d.state !== 'Uttarakhand') return false;
        } else if (selectedCircuitFilter === 'circuit-heritage') {
          if (d.state !== 'Rajasthan') return false;
        } else if (selectedCircuitFilter === 'circuit-coastal') {
          if (!['Kerala', 'Goa'].includes(d.state)) return false;
        } else if (selectedCircuitFilter === 'circuit-intl') {
          if (d.region !== 'International Special') return false;
        }
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = d.name.toLowerCase().includes(q);
        const matchState = d.state.toLowerCase().includes(q);
        const matchTag = d.tag.toLowerCase().includes(q);
        const matchRegion = d.region.toLowerCase().includes(q);
        const matchAttractions = d.topAttractions.some(a => a.toLowerCase().includes(q));
        const matchDesc = d.description.toLowerCase().includes(q);

        if (!matchName && !matchState && !matchTag && !matchRegion && !matchAttractions && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [selectedStateFilter, selectedCircuitFilter, searchQuery]);

  // Group destinations by State
  const stateGroupedData = useMemo(() => {
    return STATE_GROUPS.map((stateInfo) => {
      const stateDests = filteredDestinations.filter((d) => {
        if (stateInfo.name === 'International Destinations') {
          return d.region === 'International Special';
        }
        return d.state === stateInfo.name;
      });

      return {
        ...stateInfo,
        destinations: stateDests,
        totalInState: stateCounts[stateInfo.name] || 0
      };
    }).filter(group => group.destinations.length > 0);
  }, [filteredDestinations, stateCounts]);

  // Group destinations by Location Circuit
  const circuitGroupedData = useMemo(() => {
    return [
      {
        id: 'circuit-alpine',
        name: 'High Alpine & Snow Circuits',
        emoji: '🏔️',
        states: 'Himachal Pradesh, Ladakh & Jammu Kashmir',
        tagline: 'Snow-capped peaks, high altitude passes, cold deserts & pine valleys',
        destinations: filteredDestinations.filter(d => 
          ['Himachal Pradesh', 'Ladakh', 'Jammu & Kashmir'].includes(d.state)
        )
      },
      {
        id: 'circuit-spiritual',
        name: 'Spiritual Devbhoomi & Glacial Summits',
        emoji: '🕉️',
        states: 'Uttarakhand (Garhwal & Kumaon)',
        tagline: 'Char Dham abodes, Kedarnath Jyotirlinga, UNESCO Valley of Flowers & Tungnath',
        destinations: filteredDestinations.filter(d => d.state === 'Uttarakhand')
      },
      {
        id: 'circuit-coastal',
        name: 'Tropical Beaches & Backwaters',
        emoji: '🌴',
        states: 'Kerala & Goa',
        tagline: 'Palm-fringed backwaters, luxury houseboats, golden sands & coastal Portuguese heritage',
        destinations: filteredDestinations.filter(d => ['Kerala', 'Goa'].includes(d.state))
      },
      {
        id: 'circuit-heritage',
        name: 'Royal Heritage & Desert Dunes',
        emoji: '🏰',
        states: 'Rajasthan (Udaipur, Pushkar, Jaisalmer, Jaipur)',
        tagline: 'Royal lake palaces, golden living forts, desert dune camps, sacred ghats & Pink City bazaars',
        destinations: filteredDestinations.filter(d => d.state === 'Rajasthan')
      },
      {
        id: 'circuit-intl',
        name: 'Exotic International Holidays',
        emoji: '🌏',
        states: 'Vietnam, Thailand, Bali & Bhutan',
        tagline: 'Ba Na Hills Golden Hands, coral island speedboats, Balinese temples & Bhutanese Dzongs',
        destinations: filteredDestinations.filter(d => d.region === 'International Special')
      }
    ].filter(g => g.destinations.length > 0);
  }, [filteredDestinations]);

  // Helper to handle clicking destination
  const handleDestinationClick = (dest: DestinationInfo, openTab: 'itinerary' | 'payment' = 'itinerary') => {
    onSelectDestination(dest, openTab);
  };

  // Helper to view all packages for a specific state
  const handleStateToursClick = (stateName: string) => {
    onSelectRegion(stateName);
  };

  return (
    <section id="destinations-section" className="py-16 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#1698B4]/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-8 bg-[#FF7A00]"></div>
            <span className="text-[#1698B4] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-black">
              Organized State-Wise & Location-Wise
            </span>
            <div className="h-[2px] w-8 bg-[#FF7A00]"></div>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Explore Destinations <span className="text-[#FF7A00]">By State & Circuit</span>
          </h2>
          
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Discover each region individually — every state and international wonder organized cleanly with verified hotels, private chauffeurs, and customized itineraries.
          </p>
        </div>

        {/* Control Bar: View Mode Switch + Quick Search */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* View Mode Toggle: State-Wise vs Circuit-Wise */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl w-fit">
              <button
                onClick={() => setViewMode('state')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'state'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#1698B4]" />
                <span>State-Wise Grouping</span>
              </button>

              <button
                onClick={() => setViewMode('circuit')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'circuit'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>Location Circuit Grouping</span>
              </button>
            </div>

            {/* In-Section Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Goa, Valley of Flowers, Bali, Munnar, Ladakh..."
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1698B4] focus:border-transparent transition-all"
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
          </div>

          {/* Quick State Navigation Pills */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Filter className="w-3 h-3 text-[#1698B4]" />
                Filter by State / Territory:
              </span>
              {selectedStateFilter !== 'all' && (
                <button
                  onClick={() => setSelectedStateFilter('all')}
                  className="text-[11px] font-bold text-[#FF7A00] hover:underline cursor-pointer"
                >
                  Show All States
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setSelectedStateFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedStateFilter === 'all'
                    ? 'bg-[#1698B4] text-white shadow-sm font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ✨ All States ({DOMESTIC_DESTINATIONS.length})
              </button>

              {STATE_GROUPS.map((sg) => {
                const count = stateCounts[sg.name] || 0;
                const isSelected = selectedStateFilter === sg.name;
                return (
                  <button
                    key={sg.id}
                    onClick={() => setSelectedStateFilter(sg.name)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? `${sg.badgeColor} text-white shadow-sm font-black`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{sg.emoji}</span>
                    <span>{sg.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Overview Tag if filtering */}
        {(selectedStateFilter !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between mb-6 px-2 text-xs text-slate-600">
            <div>
              Showing <strong>{filteredDestinations.length}</strong> destinations matching 
              {selectedStateFilter !== 'all' && <span> State: <strong>"{selectedStateFilter}"</strong></span>}
              {searchQuery && <span> Keyword: <strong>"{searchQuery}"</strong></span>}
            </div>
            <button
              onClick={() => {
                setSelectedStateFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#FF7A00] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* MAIN DESTINATIONS DISPLAY */}

        {/* 1. STATE-WISE VIEW */}
        {viewMode === 'state' && (
          <div className="space-y-12">
            {stateGroupedData.map((stateGroup) => {
              const count = stateGroup.destinations.length;
              // Balanced grid calculation: 3 items fill 3 cols, 4 items fill 4 cols, 5 items fill 3 or 4 cols nicely
              const gridClass = 
                count === 3 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

              return (
                <div 
                  key={stateGroup.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8 relative"
                >
                  {/* State Group Header Banner */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                        {stateGroup.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                            {stateGroup.name}
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider ${stateGroup.badgeColor}`}>
                            {stateGroup.region}
                          </span>
                          <span className="text-xs font-bold text-[#1698B4] bg-[#EBF7FA] px-2 py-0.5 rounded-md">
                            {stateGroup.destinations.length} Hubs & Circuits
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                          {stateGroup.tagline} — <span className="text-slate-500">{stateGroup.highlightText}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quick Action Button for Entire State */}
                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => handleStateToursClick(stateGroup.name)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#1698B4] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                      >
                        <span>Explore All {stateGroup.name} Tours</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Destination Cards Grid inside this State */}
                  <div className={gridClass}>
                    {stateGroup.destinations.map((dest) => (
                      <DestinationCard
                        key={dest.id}
                        dest={dest}
                        onSelect={() => handleDestinationClick(dest, 'itinerary')}
                        onPayQR={() => handleDestinationClick(dest, 'payment')}
                      />
                    ))}
                  </div>

                  {/* State Perk & Guarantee Strip to ensure rich balanced presentation */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <Car className="w-3.5 h-3.5 text-[#1698B4]" /> Verified AC Cab Fleet
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <Hotel className="w-3.5 h-3.5 text-[#FF7A00]" /> 3★ to 5★ Certified Stays
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 24x7 Trip Assistance
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/918676928509?text=Hello%20Sky%20Wander%20Holidays,%20I%20want%20to%20customize%20a%20holiday%20package%20for%20${encodeURIComponent(stateGroup.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-lg transition-all"
                      >
                        <PhoneCall className="w-3 h-3 text-emerald-600" /> Customize {stateGroup.name} Plan
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. LOCATION CIRCUIT VIEW */}
        {viewMode === 'circuit' && (
          <div className="space-y-12">
            {circuitGroupedData.map((circuit) => {
              const count = circuit.destinations.length;
              const gridClass = 
                count <= 3 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

              return (
                <div 
                  key={circuit.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8"
                >
                  {/* Circuit Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                        {circuit.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                            {circuit.name}
                          </h3>
                          <span className="text-xs font-semibold text-slate-400">
                            • {circuit.destinations.length} Destinations
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                          <strong>States/Regions:</strong> {circuit.states} — <span className="text-slate-500">{circuit.tagline}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Destination Cards Grid inside this Circuit */}
                  <div className={gridClass}>
                    {circuit.destinations.map((dest) => (
                      <DestinationCard
                        key={dest.id}
                        dest={dest}
                        onSelect={() => handleDestinationClick(dest, 'itinerary')}
                        onPayQR={() => handleDestinationClick(dest, 'payment')}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State when filters yield 0 */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              No destinations match your search "{searchQuery}"
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Try searching for popular destinations like "Goa", "Valley of Flowers", "Spiti", "Kedarnath", "Manali", "Bali", or "Munnar".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStateFilter('all');
                setSelectedCircuitFilter('circuit-all');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase cursor-pointer"
            >
              Reset Destination Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

/* Individual Sub-Component: Destination Card */
interface DestinationCardProps {
  dest: DestinationInfo;
  onSelect: () => void;
  onPayQR?: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ dest, onSelect, onPayQR }) => {
  return (
    <div
      onClick={onSelect}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 relative hover:border-[#1698B4]/60"
    >
      {/* Image with Tag & State Pill */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
        
        {/* Brand Tag */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B2530]/90 backdrop-blur-md text-[#38BDF8] text-[10px] font-bold uppercase tracking-wider border border-[#1698B4]/30">
          {dest.tag}
        </span>

        {/* State Badge Top-Right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-black uppercase tracking-wider shadow-sm">
            {dest.state}
          </span>
        </div>

        {/* Title, State & Avg Temp */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white">
          <div>
            <h4 className="text-lg font-bold text-white leading-tight drop-shadow-md">
              {dest.name}
            </h4>
            <p className="text-xs text-slate-200 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#FF7A00]" />
              {dest.state} • <span className="text-slate-300">{dest.bestSeason}</span>
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[8px] uppercase font-bold text-slate-300 block tracking-wider">Avg Temp</span>
            <span className="text-xs font-bold text-[#FF7A00]">{dest.avgTemp}</span>
          </div>
        </div>
      </div>

      {/* Destination Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {dest.description}
        </p>

        {/* Top Attractions Tags */}
        <div className="flex flex-wrap gap-1">
          {dest.topAttractions.slice(0, 2).map((att) => (
            <span key={att} className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-full border border-slate-200/60 truncate max-w-[150px]">
              • {att}
            </span>
          ))}
          {dest.topAttractions.length > 2 && (
            <span className="text-[10px] bg-[#EBF7FA] text-[#1698B4] font-semibold px-2 py-0.5 rounded-full">
              +{dest.topAttractions.length - 2} more
            </span>
          )}
        </div>

        {/* Footer with Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 block">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-slate-900">
                ₹{dest.startingPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] font-normal text-slate-500">/person</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={onSelect}
              className="px-3.5 py-1.5 rounded-lg bg-[#1698B4] hover:bg-[#0E7A91] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Open Destination Page & Full Itinerary"
            >
              <span>View Tour</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
