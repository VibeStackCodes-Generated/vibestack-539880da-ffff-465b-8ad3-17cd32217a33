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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Webcam, CONTINENTS, parseYouTubeInput } from '@/lib/webcam-data';
import { Plus, Video, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AddWebcamDialogProps {
  onAdd: (webcam: Webcam) => void;
}

export function AddWebcamDialog({ onAdd }: AddWebcamDialogProps) {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeInput, setYoutubeInput] = useState('');
  const [continent, setContinent] = useState('Europe');
  const [timezone, setTimezone] = useState('UTC');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!city.trim() || !youtubeInput.trim()) {
      setError('City name and YouTube URL are required');
      return;
    }

    const parsed = parseYouTubeInput(youtubeInput);
    if (!parsed) {
      setError('Invalid YouTube URL or ID. Paste a YouTube video URL, channel URL, or video/channel ID.');
      return;
    }

    const webcam: Webcam = {
      id: `user-${Date.now()}`,
      city: city.trim(),
      country: country.trim() || 'Unknown',
      description: description.trim() || `Live webcam from ${city.trim()}`,
      youtubeId: parsed.id,
      type: parsed.type,
      continent,
      timezone,
      lat: 0,
      lng: 0,
      tags: ['custom'],
      isUserAdded: true
    };

    onAdd(webcam);
    toast.success(`Added ${city} webcam!`, {
      description: 'Your webcam has been added to the grid.'
    });

    // Reset form
    setCity('');
    setCountry('');
    setDescription('');
    setYoutubeInput('');
    setContinent('Europe');
    setTimezone('UTC');
    setError('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4" />
          Add Webcam
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Video className="w-5 h-5 text-primary" />
            Add a Live Webcam
          </DialogTitle>
          <DialogDescription>
            Add any city's live webcam by pasting a YouTube live stream URL or channel ID.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube URL or Channel ID *</Label>
            <Input
              id="youtube"
              placeholder="https://youtube.com/watch?v=... or UC..."
              value={youtubeInput}
              onChange={(e) => { setYoutubeInput(e.target.value); setError(''); }}
              className="bg-muted border-border"
            />
            <p className="text-xs text-muted-foreground">
              Supports video URLs, channel URLs, video IDs, and channel IDs (UC...)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City Name *</Label>
              <Input
                id="city"
                placeholder="e.g. Barcelona"
                value={city}
                onChange={(e) => { setCity(e.target.value); setError(''); }}
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g. Spain"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g. La Rambla street view"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-muted border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Continent</Label>
              <Select value={continent} onValueChange={setContinent}>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTINENTS.filter(c => c !== 'All').map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                placeholder="e.g. Europe/Madrid"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Webcam
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
