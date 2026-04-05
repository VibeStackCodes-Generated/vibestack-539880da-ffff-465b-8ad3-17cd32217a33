import { CONTINENTS } from '@/lib/webcam-data';
import { Webcam } from '@/lib/webcam-data';
import { AddWebcamDialog } from './AddWebcamDialog';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
  totalCams: number;
  onAddWebcam: (webcam: Webcam) => void;
}

export function Header({ searchQuery, onSearchChange, filter, onFilterChange, totalCams, onAddWebcam }: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const utcTime = time.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-[hsl(0,0%,4%)]/95 backdrop-blur-xl border-b border-[hsl(0,0%,10%)]' : 'bg-transparent'
    }`}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 border-2 border-white/80 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-live-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-sm md:text-base font-mono font-bold tracking-[0.25em] uppercase text-white">
                  WORLDCAM
                </h1>
              </div>
            </div>
            <div className="hidden md:block h-5 w-px bg-[hsl(0,0%,15%)]" />
            <span className="hidden md:block text-[10px] font-mono text-[hsl(0,0%,35%)] uppercase tracking-[0.15em]">
              Live Eyes on Earth
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* UTC Clock */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] font-mono text-[hsl(0,0%,35%)] uppercase tracking-wider">UTC</span>
              <span className="text-sm font-mono text-white/80 tabular-nums">{utcTime}</span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-[hsl(0,0%,15%)]" />
            <AddWebcamDialog onAdd={onAddWebcam} />
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[hsl(0,0%,30%)]" />
            <input
              placeholder="Search feeds..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-9 pl-9 pr-4 bg-[hsl(0,0%,6%)] border border-[hsl(0,0%,12%)] text-xs font-mono text-white placeholder:text-[hsl(0,0%,25%)] focus:outline-none focus:border-[hsl(0,0%,25%)] transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {CONTINENTS.map(continent => (
              <button
                key={continent}
                onClick={() => onFilterChange(continent)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.1em] whitespace-nowrap transition-all border ${
                  filter === continent
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-transparent text-[hsl(0,0%,40%)] border-[hsl(0,0%,12%)] hover:text-white hover:border-[hsl(0,0%,25%)]'
                }`}
              >
                {continent}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
