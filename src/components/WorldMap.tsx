import { Webcam } from '@/lib/webcam-data';
import { motion } from 'framer-motion';

interface WorldMapProps {
  webcams: Webcam[];
  onSelect: (webcam: Webcam) => void;
}

export function WorldMap({ webcams, onSelect }: WorldMapProps) {
  // Convert lat/lng to x/y on a simple equirectangular projection
  const toXY = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <div className="relative w-full aspect-[2.5/1] bg-muted/30 rounded-xl border border-border/30 overflow-hidden">
      {/* Simple world outline using dots */}
      <svg
        viewBox="0 0 100 50"
        className="absolute inset-0 w-full h-full opacity-20"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {[...Array(7)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0" y1={i * 8.33}
            x2="100" y2={i * 8.33}
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-border"
          />
        ))}
        {[...Array(13)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 8.33} y1="0"
            x2={i * 8.33} y2="50"
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-border"
          />
        ))}
      </svg>

      {/* Webcam dots */}
      {webcams.map((cam) => {
        if (!cam.lat && !cam.lng) return null;
        const { x, y } = toXY(cam.lat, cam.lng);
        return (
          <motion.button
            key={cam.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute group"
            style={{ left: `${x}%`, top: `${y * 2}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => onSelect(cam)}
            title={`${cam.city}, ${cam.country}`}
          >
            <span className="block w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/40 group-hover:scale-150 transition-transform" />
            <span className="absolute w-6 h-6 -inset-1.5 bg-primary/20 rounded-full animate-ping" />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-medium text-foreground/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {cam.city}
            </span>
          </motion.button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-2 right-3 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-2 h-2 bg-primary rounded-full" />
        <span>Live Camera</span>
      </div>
    </div>
  );
}
