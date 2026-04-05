import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Webcam, CONTINENTS, parseYouTubeUrl } from '@/lib/webcam-data';
import { Plus, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AddWebcamDialogProps {
  onAdd: (webcam: Webcam) => void;
}

export function AddWebcamDialog({ onAdd }: AddWebcamDialogProps) {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [sourceInput, setSourceInput] = useState('');
  const [continent, setContinent] = useState('Europe');
  const [timezone, setTimezone] = useState('UTC');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!city.trim()) { setError('City name is required'); return; }
    if (!sourceInput.trim()) { setError('YouTube URL is required'); return; }

    const videoId = parseYouTubeUrl(sourceInput);
    if (!videoId) {
      setError('Invalid YouTube URL. Paste a YouTube live stream URL or 11-character video ID.');
      return;
    }

    const webcam: Webcam = {
      id: `user-${Date.now()}`,
      city: city.trim(),
      country: country.trim() || 'Unknown',
      countryCode: '--',
      description: description.trim() || `Live webcam from ${city.trim()}`,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&rel=0&modestbranding=1&controls=1`,
      youtubeSearch: `${city.trim()} live cam`,
      continent,
      timezone,
      lat: 0,
      lng: 0,
      tags: ['custom'],
      isUserAdded: true
    };

    onAdd(webcam);
    toast.success(`${city} webcam added`, { description: 'Stream is now in your grid.' });
    setCity(''); setCountry(''); setDescription(''); setSourceInput('');
    setContinent('Europe'); setTimezone('UTC'); setError(''); setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-mono font-bold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add Camera
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-[hsl(0,0%,6%)] border-[hsl(0,0%,14%)]">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm uppercase tracking-[0.15em] text-white">
            Add Live Camera
          </DialogTitle>
          <DialogDescription className="text-[hsl(0,0%,40%)] text-xs">
            Paste a YouTube live stream URL to add a new camera feed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-950/30 border border-red-500/20 text-red-400 text-xs font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono uppercase tracking-[0.15em] text-[hsl(0,0%,45%)]">YouTube URL *</Label>
            <Input
              placeholder="https://youtube.com/watch?v=... or video ID"
              value={sourceInput}
              onChange={(e) => { setSourceInput(e.target.value); setError(''); }}
              className="bg-black border-[hsl(0,0%,14%)] font-mono text-xs h-9 focus:border-red-500/50 focus:ring-red-500/20"
            />
            <p className="text-[10px] text-[hsl(0,0%,30%)] font-mono leading-relaxed mt-1.5">
              Search YouTube for "<span className="text-[hsl(0,0%,50%)]">{city || 'city'} live cam</span>" → Filter by Live → Copy URL
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-mono uppercase tracking-[0.15em] text-[hsl(0,0%,45%)]">City *</Label>
              <Input
                placeholder="Barcelona"
                value={city}
                onChange={(e) => { setCity(e.target.value); setError(''); }}
                className="bg-black border-[hsl(0,0%,14%)] font-mono text-xs h-9 focus:border-red-500/50 focus:ring-red-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-mono uppercase tracking-[0.15em] text-[hsl(0,0%,45%)]">Country</Label>
              <Input
                placeholder="Spain"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-black border-[hsl(0,0%,14%)] font-mono text-xs h-9 focus:border-red-500/50 focus:ring-red-500/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono uppercase tracking-[0.15em] text-[hsl(0,0%,45%)]">Description</Label>
            <Input
              placeholder="La Rambla street view"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-black border-[hsl(0,0%,14%)] font-mono text-xs h-9 focus:border-red-500/50 focus:ring-red-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-mono uppercase tracking-[0.15em] text-[hsl(0,0%,45%)]">Continent</Label>
              <Select value={continent} onValueChange={setContinent}>
                <SelectTrigger className="bg-black border-[hsl(0,0%,14%)] font-mono text-xs h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0,0%,6%)] border-[hsl(0,0%,14%)]">
                  {CONTINENTS.filter(c => c !== 'All').map(c => (
                    <SelectItem key={c} value={c} className="font-mono text-xs">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-mono uppercase tracking-[0.15em] text-[hsl(0,0%,45%)]">Timezone</Label>
              <Input
                placeholder="Europe/Madrid"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="bg-black border-[hsl(0,0%,14%)] font-mono text-xs h-9 focus:border-red-500/50 focus:ring-red-500/20"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-xs font-mono uppercase tracking-[0.1em] text-[hsl(0,0%,50%)] hover:text-white border border-[hsl(0,0%,14%)] hover:border-[hsl(0,0%,25%)] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase tracking-[0.15em] transition-colors"
          >
            Add Camera
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}