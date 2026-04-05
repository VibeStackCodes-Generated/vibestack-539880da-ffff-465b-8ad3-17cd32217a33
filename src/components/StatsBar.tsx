import { Webcam } from '@/lib/webcam-data';

interface StatsBarProps {
  webcams: Webcam[];
}

export function StatsBar({ webcams }: StatsBarProps) {
  const countries = new Set(webcams.map(c => c.country)).size;
  const continents = new Set(webcams.map(c => c.continent)).size;
  const userAdded = webcams.filter(c => c.isUserAdded).length;

  const stats = [
    { label: 'FEEDS', value: webcams.length },
    { label: 'COUNTRIES', value: countries },
    { label: 'CONTINENTS', value: continents },
    { label: 'CUSTOM', value: userAdded },
  ];

  return (
    <div className="flex items-center gap-6 md:gap-8">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-3">
          {i > 0 && <div className="w-px h-6 bg-[hsl(0,0%,12%)]" />}
          <div>
            <p className="text-lg md:text-xl font-bold text-white font-mono tabular-nums">{stat.value}</p>
            <p className="text-[9px] font-mono text-[hsl(0,0%,35%)] uppercase tracking-[0.2em]">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
