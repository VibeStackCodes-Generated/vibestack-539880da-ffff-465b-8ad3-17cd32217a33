import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CONTINENTS } from '@/lib/webcam-data';
import { Search, Globe, Camera, Radio } from 'lucide-react';
import { AddWebcamDialog } from './AddWebcamDialog';
import { Webcam } from '@/lib/webcam-data';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
  totalCams: number;
  onAddWebcam: (webcam: Webcam) => void;
}

export function Header({ searchQuery, onSearchChange, filter, onFilterChange, totalCams, onAddWebcam }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Globe className="w-8 h-8 text-primary" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full animate-live-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-primary">World</span>
                <span className="text-accent">Cam</span>
                <span className="text-foreground"> Live</span>
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Real-time webcams from around the globe
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Radio className="w-4 h-4 text-red-500 animate-live-pulse" />
              <span>{totalCams} live cameras</span>
            </div>
            <AddWebcamDialog onAdd={onAddWebcam} />
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search cities, countries, or tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            {CONTINENTS.map(continent => (
              <button
                key={continent}
                onClick={() => onFilterChange(continent)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === continent
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
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
