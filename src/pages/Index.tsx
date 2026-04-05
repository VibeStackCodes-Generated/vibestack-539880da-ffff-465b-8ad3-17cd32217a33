import { useState, useEffect } from 'react';
import { useWebcams } from '@/hooks/useWebcams';
import { Header } from '@/components/Header';
import { WebcamCard } from '@/components/WebcamCard';
import { ExpandedView } from '@/components/ExpandedView';
import { WorldMap } from '@/components/WorldMap';
import { StatsBar } from '@/components/StatsBar';
import { Webcam } from '@/lib/webcam-data';
import { Camera, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
        totalCams={allWebcams.length}
        onAddWebcam={addWebcam}
      />

      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Stats */}
        <StatsBar webcams={allWebcams} />

        {/* World Map Toggle */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Live Camera Map
          </h2>
          <button
            onClick={() => setShowMap(!showMap)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>

        {showMap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <WorldMap webcams={allWebcams} onSelect={setExpandedCam} />
          </motion.div>
        )}

        {/* Camera Grid */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Camera className="w-5 h-5 text-accent" />
            {filter === 'All' ? 'All Cameras' : filter}
            <span className="text-sm font-normal text-muted-foreground">
              ({webcams.length} {webcams.length === 1 ? 'camera' : 'cameras'})
            </span>
          </h2>
        </div>

        {webcams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Camera className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">No cameras found</h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Try adjusting your search or filter, or add a new webcam.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {webcams.map((cam) => (
                <WebcamCard
                  key={cam.id}
                  webcam={cam}
                  onRemove={cam.isUserAdded ? removeWebcam : undefined}
                  onExpand={setExpandedCam}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-12">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 text-primary" />
            <span>WorldCam Live — Explore the world in real-time</span>
          </div>
          <p className="text-xs text-muted-foreground/50">
            Streams provided via YouTube. Camera availability may vary.
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
