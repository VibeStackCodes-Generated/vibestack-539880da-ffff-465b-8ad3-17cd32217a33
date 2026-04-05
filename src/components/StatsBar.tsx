import { Webcam, CONTINENTS } from '@/lib/webcam-data';
import { Globe, Camera, MapPin, Users } from 'lucide-react';

interface StatsBarProps {
  webcams: Webcam[];
}

export function StatsBar({ webcams }: StatsBarProps) {
  const countries = new Set(webcams.map(c => c.country)).size;
  const continents = new Set(webcams.map(c => c.continent)).size;
  const userAdded = webcams.filter(c => c.isUserAdded).length;

  const stats = [
    { icon: Camera, label: 'Live Cameras', value: webcams.length, color: 'text-primary' },
    { icon: MapPin, label: 'Countries', value: countries, color: 'text-accent' },
    { icon: Globe, label: 'Continents', value: continents, color: 'text-chart-3' },
    { icon: Users, label: 'Custom Cams', value: userAdded, color: 'text-chart-4' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30"
        >
          <stat.icon className={`w-5 h-5 ${stat.color}`} />
          <div>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
