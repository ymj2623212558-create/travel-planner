import { useState, useRef, useEffect, useCallback } from 'react';
import { CHINA_REGIONS, HOT_COUNTRIES } from '@/data/regions';
import { API_BASE } from '@/lib/api-config';

interface CityResult {
  name: string;
  country: string;
  lat?: number;
  lng?: number;
  source?: string;
}

interface SearchCityProps {
  value: string;
  onChange: (city: string) => void;
  placeholder?: string;
  label?: string;
  scope: 'global' | 'domestic';
}

const STORAGE_KEY = 'travel_planner_recent_cities';

function getRecentCities(): CityResult[] {
  try {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecentCity(city: CityResult) {
  if (typeof window === 'undefined') return;
  const recent = getRecentCities().filter(c => c.name !== city.name);
  recent.unshift(city);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, 5)));
}

export default function SearchCity({ 
  value, 
  onChange, 
  placeholder = '搜索城市...', 
  label,
  scope
}: SearchCityProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<CityResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [source, setSource] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Two-level cascade state
  const [level, setLevel] = useState<'browse' | 'province' | 'country' | 'city'>('browse');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  // Sync external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Click outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const searchCities = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/cities/search?q=${encodeURIComponent(q)}&limit=8&scope=${scope}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setSource(data.source || '');
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [scope]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchCities(val), 200);
  };

  const selectCity = (city: CityResult) => {
    const displayName = `${city.name}, ${city.country}`;
    setQuery(displayName);
    onChange(displayName);
    setIsOpen(false);
    saveRecentCity(city);
  };

  // Select a city from cascade (no country suffix needed for display)
  const selectCascadeCity = (cityName: string, country: string) => {
    const displayName = `${cityName}, ${country}`;
    setQuery(displayName);
    onChange(displayName);
    setIsOpen(false);
    saveRecentCity({ name: cityName, country });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          selectCity(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Show recent cities when input is focused but no query
  const recentCities = query.length < 2 ? getRecentCities() : [];
  const isBrowsing = query.length < 2;

  // Browse dropdown: cascade selector when empty, search results when typing
  const showBrowseDropdown = isOpen && isBrowsing;
  const showSearchDropdown = isOpen && !isBrowsing;

  // Current region cities for the selected province/country
  const currentCities = level === 'province'
    ? (CHINA_REGIONS.find(r => r.province === selectedProvince)?.cities || [])
    : level === 'country'
      ? (HOT_COUNTRIES.find(c => c.country === selectedCountry)?.cities || [])
      : [];

  // Country for display suffix
  const currentCountryName = level === 'province' ? '中国' : level === 'country' ? selectedCountry : '';

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            setLevel('browse');
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white hover:border-gray-300"
          autoComplete="off"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {/* Dropdown arrow when browsing */}
        {isBrowsing && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      {/* ============ BROWSE DROPDOWN (cascade) ============ */}
      {showBrowseDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {/* Recent cities */}
          {level === 'browse' && recentCities.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                最近选择
              </div>
              {recentCities.map((city, i) => (
                <button
                  key={`recent-${i}`}
                  onClick={() => selectCity(city)}
                  className="w-full text-left px-4 py-2.5 hover:bg-pink-50 flex items-center justify-between transition-colors"
                >
                  <span>
                    <span className="text-gray-900 font-medium">{city.name}</span>
                    <span className="text-gray-400 text-sm ml-2">{city.country}</span>
                  </span>
                  <span className="text-gray-300 text-xs">🕐</span>
                </button>
              ))}
              <div className="border-t border-gray-100" />
            </div>
          )}

          {/* Level 0: Choose region type (domestic) or countries (global) */}
          {level === 'browse' && (
            <div>
              {scope === 'domestic' ? (
                <>
                  <div className="px-3 py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                    选择省份 / 地区
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {CHINA_REGIONS.map(region => (
                      <button
                        key={region.province}
                        onClick={() => {
                          setSelectedProvince(region.province);
                          setLevel('province');
                        }}
                        className="text-left px-3 py-2 rounded-lg hover:bg-pink-50 text-sm font-medium text-gray-800 transition-colors flex items-center gap-2"
                      >
                        <span className="text-pink-400">🏔️</span>
                        {region.province}
                        <span className="ml-auto text-gray-300 text-xs">{region.cities.length}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="px-3 py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                    热门国家 / 地区
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {HOT_COUNTRIES.map(country => (
                      <button
                        key={country.country}
                        onClick={() => {
                          setSelectedCountry(country.country);
                          setLevel('country');
                        }}
                        className="text-left px-3 py-2 rounded-lg hover:bg-pink-50 text-sm font-medium text-gray-800 transition-colors flex items-center gap-2"
                      >
                        <span>{country.flag}</span>
                        {country.country}
                        <span className="ml-auto text-gray-300 text-xs">{country.cities.length}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Level 1: Cities of selected province/country */}
          {level === 'province' && (
            <div>
              <div className="px-3 py-2 flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                <button
                  onClick={() => setLevel('browse')}
                  className="text-pink-500 hover:text-pink-700 font-semibold flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                  返回省份
                </button>
                <span className="mx-1 text-gray-300">|</span>
                <span className="font-semibold text-gray-600">{selectedProvince} · {currentCities.length} 城</span>
              </div>
              <div className="grid grid-cols-2 gap-1 p-2">
                {currentCities.map(city => (
                  <button
                    key={city}
                    onClick={() => selectCascadeCity(city, '中国')}
                    className="text-left px-3 py-2 rounded-lg hover:bg-pink-50 text-sm font-medium text-gray-800 transition-colors flex items-center gap-2"
                  >
                    <span className="text-pink-300">📍</span>
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {level === 'country' && (
            <div>
              <div className="px-3 py-2 flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                <button
                  onClick={() => setLevel('browse')}
                  className="text-pink-500 hover:text-pink-700 font-semibold flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                  返回国家
                </button>
                <span className="mx-1 text-gray-300">|</span>
                <span className="font-semibold text-gray-600">{selectedCountry} · {currentCities.length} 城</span>
              </div>
              <div className="grid grid-cols-2 gap-1 p-2">
                {currentCities.map(city => (
                  <button
                    key={city}
                    onClick={() => selectCascadeCity(city, selectedCountry)}
                    className="text-left px-3 py-2 rounded-lg hover:bg-pink-50 text-sm font-medium text-gray-800 transition-colors flex items-center gap-2"
                  >
                    <span className="text-pink-300">📍</span>
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No browse content (no recent, no regions) - shouldn't happen but safe */}
          {level === 'browse' && recentCities.length === 0 && (
            <div className="px-4 py-3 text-center text-gray-400 text-sm">
              {scope === 'domestic' ? '选择省份后查看城市' : '选择国家后查看城市'}
            </div>
          )}
        </div>
      )}

      {/* ============ SEARCH DROPDOWN ============ */}
      {showSearchDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {results.map((city, i) => (
            <button
              key={`${city.name}-${city.country}-${i}`}
              onClick={() => selectCity(city)}
              onMouseEnter={() => setSelectedIndex(i)}
              className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                i === selectedIndex ? 'bg-pink-50' : 'hover:bg-gray-50'
              }`}
            >
              <span>
                <span className="text-gray-900 font-medium">{city.name}</span>
                <span className="text-gray-400 text-sm ml-2">{city.country}</span>
              </span>
              {city.source === 'geonames' && (
                <span className="text-gray-300 text-xs" title="来自 GeoNames">🌐</span>
              )}
            </button>
          ))}

          {/* No results message */}
          {results.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-500">
              {scope === 'domestic' ? '国内暂无匹配结果' : '未找到匹配城市'}
            </div>
          )}

          {/* Source indicator */}
          {source === 'mixed' && (
            <div className="px-3 py-1.5 text-xs text-gray-400 border-t border-gray-100">
              部分结果来自 GeoNames
            </div>
          )}
        </div>
      )}
    </div>
  );
}
