import { useState, useEffect } from 'react';
import { useWebcams } from '@/hooks/useWebcams';
import { Header } from '@/components/Header';
import { WebcamCard } from '@/components/WebcamCard';
import { ExpandedView } from '@/components/ExpandedView';
import { WorldMap } from '@/components/WorldMap';
import { StatsBar } from '@/components/StatsBar';
import { Webcam } from '@/lib/webcam-data';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Camera } from 'lucide-react';

export default function Index() {
  const {
    webcams,
    allWebcams,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addWebcam,
    removeWebcam
  } = useWebcams();

  const [expandedCam, setExpandedCam] = useState<Webcam | null>(null);
  const [showMap, setShowMap] = useState(true);

  // Close expanded view on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedCam(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-background noise-bg">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
        totalCams={allWebcams.length}
        onAddWebcam={addWebcam}
      />

      <main className="max-w-[1800px] mx-auto px-4 md:px-8 py-6 space-y-8">
        {/* Stats Row */}
        <div className="flex items-center justify-between">
          <StatsBar webcams={allWebcams} />
        </div>

        {/* World Map Section */}
        <section>
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 mb-4 group"
          >
            <span className="text-[10px] font-mono font-bold text-[hsl(0,0%,45%)] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
              Satellite Overview
            </span>
            {showMap ? (
              <ChevronUp className="w-3.5 h-3.5 text-[hsl(0,0%,30%)]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[hsl(0,0%,30%)]" />
            )}
          </button>

          <AnimatePresence>
            {showMap && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <WorldMap webcams={allWebcams} onSelect={setExpandedCam} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[hsl(0,0%,10%)]" />
          <span className="text-[9px] font-mono text-[hsl(0,0%,25%)] uppercase tracking-[0.25em]">
            {filter === 'All' ? 'All Feeds' : filter} — {webcams.length} camera{webcams.length !== 1 ? 's' : ''}
          </span>
          <div className="h-px flex-1 bg-[hsl(0,0%,10%)]" />
        </div>

        {/* Camera Grid */}
        {webcams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Camera className="w-12 h-12 text-[hsl(0,0%,15%)] mb-4" />
            <h3 className="text-sm font-mono text-[hsl(0,0%,35%)] uppercase tracking-[0.15em]">No feeds found</h3>
            <p className="text-xs text-[hsl(0,0%,25%)] mt-2 font-mono">
              Adjust your search or add a new camera.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <AnimatePresence mode="popLayout">
              {webcams.map((cam, i) => (
                <WebcamCard
                  key={cam.id}
                  webcam={cam}
                  index={i}
                  onRemove={cam.isUserAdded ? removeWebcam : undefined}
                  onExpand={setExpandedCam}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[hsl(0,0%,8%)] mt-16">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-white/20 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            </div>
            <span className="text-[10px] font-mono text-[hsl(0,0%,30%)] uppercase tracking-[0.15em]">
              WORLDCAM — Live Eyes on Earth
            </span>
          </div>
          <p className="text-[10px] font-mono text-[hsl(0,0%,20%)]">
            Streams via YouTube. Availability may vary.
          </p>
        </div>
      </footer>

      {/* Expanded View Modal */}
      {expandedCam && (
        <ExpandedView webcam={expandedCam} onClose={() => setExpandedCam(null)} />
      )}
    </div>
  );
}
