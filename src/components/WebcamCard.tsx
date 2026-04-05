import { useState, memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Webcam, getLocalTime, isDayTime } from '@/lib/webcam-data';
import { Maximize2, Minimize2, X, Sun, Moon, MapPin, Clock, Video } from 'lucide-react';
import { motion } from 'framer-motion';

interface WebcamCardProps {
  webcam: Webcam;
  onRemove?: (id: string) => void;
  onExpand: (webcam: Webcam) => void;
}

function WebcamCardInner({ webcam, onRemove, onExpand }: WebcamCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const localTime = getLocalTime(webcam.timezone);
  const isDay = isDayTime(webcam.timezone);

  const embedUrl = webcam.type === 'channel'
    ? `https://www.youtube.com/embed/live_stream?channel=${webcam.youtubeId}&autoplay=0&mute=1`
    : `https://www.youtube.com/embed/${webcam.youtubeId}?autoplay=0&mute=1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-0">
          {/* Video Container */}
          <div className="relative aspect-video bg-muted">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Video className="w-10 h-10 text-muted-foreground" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-live-pulse" />
                  </div>
                  <span className="text-sm text-muted-foreground">Loading stream...</span>
                </div>
              </div>
            )}
            <iframe
              src={embedUrl}
              className="w-full h-full absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              title={`${webcam.city} live webcam`}
            />

            {/* Live Badge */}
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-red-600/90 text-white border-0 backdrop-blur-sm gap-1.5 px-2.5 py-1">
                <span className="w-2 h-2 bg-white rounded-full animate-live-pulse" />
                LIVE
              </Badge>
            </div>

            {/* Expand Button */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 bg-black/60 hover:bg-black/80 backdrop-blur-sm border-0"
                onClick={() => onExpand(webcam)}
              >
                <Maximize2 className="h-4 w-4 text-white" />
              </Button>
            </div>

            {/* Remove Button for user-added cams */}
            {webcam.isUserAdded && onRemove && (
              <div className="absolute top-3 right-12 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-red-600/60 hover:bg-red-600/80 backdrop-blur-sm border-0"
                  onClick={() => onRemove(webcam.id)}
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate text-base">
                  {webcam.city}
                </h3>
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {webcam.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>{webcam.country}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{localTime}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                {isDay ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-300" />
                )}
              </div>
              {webcam.isUserAdded && (
                <Badge variant="outline" className="text-xs ml-auto border-accent/30 text-accent">
                  Custom
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export const WebcamCard = memo(WebcamCardInner);
