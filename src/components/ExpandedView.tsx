import { Webcam, getLocalTime, isDayTime } from '@/lib/webcam-data';
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
  // Switch to autoplay with sound for expanded view
  const expandedUrl = webcam.embedUrl
    .replace('autoplay=0', 'autoplay=1')
    .replace('mute=1', 'mute=0');
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(webcam.youtubeSearch)}&sp=EgJAAQ%253D%253D`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-full max-w-7xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-live-pulse" />
                <span className="text-xs font-mono font-bold text-red-400 tracking-[0.2em] uppercase">LIVE</span>
              </div>
              <div className="h-4 w-px bg-[hsl(0,0%,20%)]" />
              <h2 className="text-lg md:text-xl font-semibold text-white tracking-wide">
                {webcam.city}
                <span className="text-[hsl(0,0%,40%)] font-light ml-2">{webcam.country}</span>
              </h2>
            </div>
            <button
              className="w-10 h-10 flex items-center justify-center hover:bg-white/5 transition-colors border border-[hsl(0,0%,15%)]"
              onClick={onClose}
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Video */}
          <div className="relative aspect-video bg-black border border-[hsl(0,0%,12%)] overflow-hidden">
            <iframe
              src={expandedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${webcam.city} live webcam expanded`}
              style={{ border: 'none' }}
            />
          </div>

          {/* Info Bar */}
          <div className="flex flex-wrap items-center gap-5 mt-4 font-mono text-xs text-[hsl(0,0%,40%)]">
            <span className="text-white/70">{webcam.description}</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{webcam.continent}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{localTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {isDay ? (
                <><Sun className="w-3.5 h-3.5 text-amber-500/60" /> <span>Daytime</span></>
              ) : (
                <><Moon className="w-3.5 h-3.5 text-indigo-400/60" /> <span>Nighttime</span></>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>{webcam.lat.toFixed(2)}°, {webcam.lng.toFixed(2)}°</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}