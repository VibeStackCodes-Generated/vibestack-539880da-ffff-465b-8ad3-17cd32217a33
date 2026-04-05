import { Webcam } from '@/lib/webcam-data';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface WorldMapProps {
  webcams: Webcam[];
  onSelect: (webcam: Webcam) => void;
}

export function WorldMap({ webcams, onSelect }: WorldMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Google Maps embed (no API key needed for basic /maps?output=embed)
  const mapUrl = `https://www.google.com/maps/@20,0,2.5z/data=!5m1!1e4?entry=ttu`;

  return (
    <div className="relative w-full">
      {/* Google Maps Embed */}
      <div className="relative w-full aspect-[2.8/1] overflow-hidden border border-[hsl(0,0%,12%)] bg-black">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63000000!2d10!3d25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f2!5e1!3m2!1sen!2sus"
          className="w-full h-full"
          style={{ border: 'none', filter: 'saturate(0.15) brightness(0.45) contrast(1.3)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="World map showing webcam locations"
        />

        {/* Overlay dots for each webcam */}
        {webcams.filter(c => c.lat !== 0 || c.lng !== 0).map((cam) => {
          // Convert lat/lng to percentage position on the map
          // This is approximate for the satellite view centered at 25,10 zoom 2
          const x = ((cam.lng + 180) / 360) * 100;
          const y = ((90 - cam.lat) / 180) * 100;

          return (
            <motion.button
              key={cam.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: Math.random() * 0.5, duration: 0.4 }}
              className="absolute z-10 group/dot"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => onSelect(cam)}
              onMouseEnter={() => setHoveredId(cam.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Ping ring */}
              <span className="absolute inset-0 w-5 h-5 -m-1 bg-red-500/20 rounded-full animate-ping" />
              {/* Dot */}
              <span className="relative block w-3 h-3 bg-red-500 rounded-full border border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.5)] group-hover/dot:scale-150 transition-transform" />
              {/* Tooltip */}
              {hoveredId === cam.id && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-black/90 border border-[hsl(0,0%,20%)] whitespace-nowrap z-20"
                >
                  <span className="text-[10px] font-mono text-white font-bold">{cam.city}</span>
                  <span className="text-[10px] font-mono text-[hsl(0,0%,40%)] ml-1.5">{cam.country}</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-scanline" />
        </div>

        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-red-500/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-red-500/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-red-500/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-red-500/40 pointer-events-none" />

        {/* Map label */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
          <span className="text-[9px] font-mono text-red-500/60 uppercase tracking-[0.2em]">Global Feed Network</span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2 pointer-events-none">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-live-pulse" />
          <span className="text-[9px] font-mono text-red-400/70 uppercase tracking-[0.15em]">{webcams.length} Active</span>
        </div>
      </div>
    </div>
  );
}