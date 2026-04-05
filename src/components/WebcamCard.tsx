import { useState, memo, useCallback } from 'react';
import { Webcam, getLocalTime, isDayTime } from '@/lib/webcam-data';
import { Maximize2, X, RefreshCw, MapPin, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface WebcamCardProps {
  webcam: Webcam;
  index: number;
  onRemove?: (id: string) => void;
  onExpand: (webcam: Webcam) => void;
}

function WebcamCardInner({ webcam, index, onRemove, onExpand }: WebcamCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const localTime = getLocalTime(webcam.timezone);
  const isDay = isDayTime(webcam.timezone);

  const handleRetry = useCallback(() => {
    setIsLoaded(false);
    setHasError(false);
    setRetryKey(k => k + 1);
  }, []);

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(webcam.youtubeSearch)}&sp=EgJAAQ%253D%253D`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}
      className="group relative"
    >
      <div className="relative overflow-hidden bg-[hsl(0,0%,6%)] border border-[hsl(0,0%,12%)] hover:border-[hsl(0,0%,20%)] transition-all duration-500">
        {/* Video Container */}
        <div className="relative aspect-video bg-black overflow-hidden">
          {/* Loading state */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-[1]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[hsl(0,0%,20%)] border-t-red-500 rounded-full animate-spin" />
                <span className="text-xs font-mono text-[hsl(0,0%,35%)] uppercase tracking-[0.2em]">Connecting</span>
              </div>
            </div>
          )}

          <iframe
            key={retryKey}
            src={webcam.embedUrl}
            className="w-full h-full absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            title={`${webcam.city} live webcam`}
            style={{ border: 'none' }}
          />

          {/* Top overlay - REC indicator */}
          <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between z-10 pointer-events-none bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-live-pulse" />
              <span className="text-[10px] font-mono font-bold text-red-400 tracking-[0.15em] uppercase">REC</span>
            </div>
            <span className="text-[10px] font-mono text-white/50">
              CAM-{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Hover controls */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-[5]">
            <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-auto">
              <button
                onClick={handleRetry}
                className="w-7 h-7 flex items-center justify-center bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/10 transition-all"
                title="Refresh"
              >
                <RefreshCw className="w-3 h-3 text-white/70" />
              </button>
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/10 transition-all"
                title="Find on YouTube"
              >
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>
              <button
                onClick={() => onExpand(webcam)}
                className="w-7 h-7 flex items-center justify-center bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/10 transition-all"
                title="Expand"
              >
                <Maximize2 className="w-3 h-3 text-white/70" />
              </button>
              {webcam.isUserAdded && onRemove && (
                <button
                  onClick={() => onRemove(webcam.id)}
                  className="w-7 h-7 flex items-center justify-center bg-red-900/70 hover:bg-red-800/90 backdrop-blur-sm border border-red-500/20 transition-all"
                  title="Remove"
                >
                  <X className="w-3 h-3 text-red-300" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="px-3.5 py-3 border-t border-[hsl(0,0%,10%)]">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-[13px] text-white truncate tracking-wide">
                {webcam.city}
              </h3>
              <p className="text-[11px] text-[hsl(0,0%,40%)] truncate mt-0.5 font-light">
                {webcam.description}
              </p>
            </div>
            {webcam.isUserAdded && (
              <span className="text-[9px] font-mono font-bold text-red-500/70 uppercase tracking-[0.15em] shrink-0 border border-red-500/20 px-1.5 py-0.5">
                Custom
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-2.5">
            <div className="flex items-center gap-1 text-[10px] text-[hsl(0,0%,35%)] font-mono">
              <MapPin className="w-3 h-3" />
              <span>{webcam.country}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[hsl(0,0%,35%)] font-mono">
              <Clock className="w-3 h-3" />
              <span>{localTime}</span>
            </div>
            <div className="ml-auto">
              {isDay ? (
                <span className="text-[9px] font-mono text-amber-500/60 uppercase tracking-wider">Day</span>
              ) : (
                <span className="text-[9px] font-mono text-indigo-400/60 uppercase tracking-wider">Night</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const WebcamCard = memo(WebcamCardInner);
