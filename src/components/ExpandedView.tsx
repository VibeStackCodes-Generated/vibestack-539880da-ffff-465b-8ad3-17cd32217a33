import { Webcam, getLocalTime, isDayTime } from '@/lib/webcam-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Clock, Sun, Moon, Globe, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandedViewProps {
  webcam: Webcam | null;
  onClose: () => void;
}

export function ExpandedView({ webcam, onClose }: ExpandedViewProps) {
  if (!webcam) return null;

  const localTime = getLocalTime(webcam.timezone);
  const isDay = isDayTime(webcam.timezone);

  const embedUrl = webcam.type === 'channel'
    ? `https://www.youtube.com/embed/live_stream?channel=${webcam.youtubeId}&autoplay=1&mute=0`
    : `https://www.youtube.com/embed/${webcam.youtubeId}?autoplay=1&mute=0`;

  const youtubeLink = webcam.type === 'channel'
    ? `https://www.youtube.com/channel/${webcam.youtubeId}/live`
    : `https://www.youtube.com/watch?v=${webcam.youtubeId}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-red-600 text-white border-0 gap-1.5 px-3 py-1.5">
                <span className="w-2 h-2 bg-white rounded-full animate-live-pulse" />
                LIVE
              </Badge>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {webcam.city}, {webcam.country}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="outline" size="sm" className="gap-2 border-white/20 text-white hover:bg-white/10">
                  <ExternalLink className="w-4 h-4" />
                  YouTube
                </Button>
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={onClose}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Video */}
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${webcam.city} live webcam expanded`}
            />
          </div>

          {/* Info Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-white/70">
            <p className="text-white/90">{webcam.description}</p>
            <div className="flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{webcam.continent}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4" />
              <span>Local time: {localTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              {isDay ? (
                <><Sun className="w-4 h-4 text-amber-400" /> <span>Daytime</span></>
              ) : (
                <><Moon className="w-4 h-4 text-indigo-300" /> <span>Nighttime</span></>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Globe className="w-4 h-4" />
              <span>{webcam.lat.toFixed(2)}°, {webcam.lng.toFixed(2)}°</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
