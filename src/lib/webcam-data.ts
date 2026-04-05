export type WebcamSource = 'youtube' | 'image' | 'iframe';

export interface Webcam {
  id: string;
  city: string;
  country: string;
  description: string;
  source: WebcamSource;
  // For youtube: video ID. For image: snapshot URL. For iframe: embed URL.
  sourceId: string;
  continent: string;
  timezone: string;
  lat: number;
  lng: number;
  tags: string[];
  isUserAdded?: boolean;
  // For image sources: how often to refresh (ms). Default 30000 (30s)
  refreshInterval?: number;
}

export function getEmbedUrl(webcam: Webcam): string {
  if (webcam.source === 'youtube') {
    return `https://www.youtube.com/embed/${webcam.sourceId}?autoplay=0&mute=1&rel=0&modestbranding=1`;
  }
  if (webcam.source === 'iframe') {
    return webcam.sourceId;
  }
  return '';
}

export function getExpandedEmbedUrl(webcam: Webcam): string {
  if (webcam.source === 'youtube') {
    return `https://www.youtube.com/embed/${webcam.sourceId}?autoplay=1&mute=0&rel=0&modestbranding=1`;
  }
  if (webcam.source === 'iframe') {
    return webcam.sourceId;
  }
  return '';
}

// Curated webcams using multiple reliable sources:
// - YouTube video IDs (confirmed live streams)
// - Auto-refreshing snapshot images from public webcam services
// - Windy webcam embed widgets
export const DEFAULT_WEBCAMS: Webcam[] = [
  // ===== YOUTUBE LIVE STREAMS (confirmed 24/7 channels) =====
  {
    id: 'jackson-hole',
    city: 'Jackson Hole',
    country: 'USA',
    description: 'Town Square — famous elk antler arches',
    source: 'youtube',
    sourceId: 'psfFJR3vZ78',
    continent: 'North America',
    timezone: 'America/Denver',
    lat: 43.4799,
    lng: -110.7624,
    tags: ['mountain', 'town', 'iconic']
  },
  // ===== WINDY WEBCAM EMBEDS (reliable timelapse players) =====
  {
    id: 'rome-trevi',
    city: 'Rome',
    country: 'Italy',
    description: 'Trevi Fountain — toss a coin and make a wish',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1350913768/day',
    continent: 'Europe',
    timezone: 'Europe/Rome',
    lat: 41.9009,
    lng: 12.4833,
    tags: ['landmark', 'fountain', 'iconic']
  },
  {
    id: 'venice-rialto',
    city: 'Venice',
    country: 'Italy',
    description: 'Rialto Bridge — Grand Canal view',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1350913767/day',
    continent: 'Europe',
    timezone: 'Europe/Rome',
    lat: 45.4380,
    lng: 12.3358,
    tags: ['canal', 'bridge', 'romantic']
  },
  {
    id: 'paris-eiffel',
    city: 'Paris',
    country: 'France',
    description: 'Eiffel Tower — panoramic city view',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613031885/day',
    continent: 'Europe',
    timezone: 'Europe/Paris',
    lat: 48.8584,
    lng: 2.2945,
    tags: ['landmark', 'tower', 'romantic']
  },
  {
    id: 'barcelona-beach',
    city: 'Barcelona',
    country: 'Spain',
    description: 'Barceloneta Beach — Mediterranean coastline',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613392407/day',
    continent: 'Europe',
    timezone: 'Europe/Madrid',
    lat: 41.3784,
    lng: 2.1925,
    tags: ['beach', 'ocean', 'city']
  },
  {
    id: 'prague-old-town',
    city: 'Prague',
    country: 'Czech Republic',
    description: 'Old Town Square — astronomical clock view',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613072660/day',
    continent: 'Europe',
    timezone: 'Europe/Prague',
    lat: 50.0870,
    lng: 14.4213,
    tags: ['historic', 'square', 'clock']
  },
  {
    id: 'amsterdam-canal',
    city: 'Amsterdam',
    country: 'Netherlands',
    description: 'Amsterdam canal view — Dutch capital waterways',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613072116/day',
    continent: 'Europe',
    timezone: 'Europe/Amsterdam',
    lat: 52.3676,
    lng: 4.9041,
    tags: ['canal', 'city', 'historic']
  },
  {
    id: 'london-thames',
    city: 'London',
    country: 'UK',
    description: 'Thames River & Tower Bridge view',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613072994/day',
    continent: 'Europe',
    timezone: 'Europe/London',
    lat: 51.5074,
    lng: -0.0877,
    tags: ['river', 'bridge', 'iconic']
  },
  {
    id: 'dubrovnik-old-town',
    city: 'Dubrovnik',
    country: 'Croatia',
    description: 'Old Town — Pearl of the Adriatic',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613101490/day',
    continent: 'Europe',
    timezone: 'Europe/Zagreb',
    lat: 42.6507,
    lng: 18.0944,
    tags: ['old town', 'historic', 'coastal']
  },
  {
    id: 'naples-vesuvius',
    city: 'Naples',
    country: 'Italy',
    description: 'Bay of Naples — Mount Vesuvius view',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613031820/day',
    continent: 'Europe',
    timezone: 'Europe/Rome',
    lat: 40.8518,
    lng: 14.2681,
    tags: ['volcano', 'harbour', 'nature']
  },
  {
    id: 'dubai-skyline',
    city: 'Dubai',
    country: 'UAE',
    description: 'Dubai skyline — Burj Khalifa area',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613198050/day',
    continent: 'Asia',
    timezone: 'Asia/Dubai',
    lat: 25.1972,
    lng: 55.2744,
    tags: ['skyline', 'modern', 'tower']
  },
  {
    id: 'tokyo-shibuya',
    city: 'Tokyo',
    country: 'Japan',
    description: 'Shibuya area — bustling Japanese capital',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613054042/day',
    continent: 'Asia',
    timezone: 'Asia/Tokyo',
    lat: 35.6595,
    lng: 139.7004,
    tags: ['city', 'crossing', 'iconic']
  },
  {
    id: 'nyc-manhattan',
    city: 'New York',
    country: 'USA',
    description: 'Manhattan skyline panoramic view',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613198922/day',
    continent: 'North America',
    timezone: 'America/New_York',
    lat: 40.758,
    lng: -73.9855,
    tags: ['city', 'skyline', 'iconic']
  },
  {
    id: 'sydney-harbour',
    city: 'Sydney',
    country: 'Australia',
    description: 'Sydney Harbour — Opera House and Bridge',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613199068/day',
    continent: 'Oceania',
    timezone: 'Australia/Sydney',
    lat: -33.8568,
    lng: 151.2153,
    tags: ['harbour', 'opera', 'bridge']
  },
  {
    id: 'rio-copacabana',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    description: 'Copacabana Beach — iconic Brazilian coastline',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613198768/day',
    continent: 'South America',
    timezone: 'America/Sao_Paulo',
    lat: -22.9711,
    lng: -43.1822,
    tags: ['beach', 'ocean', 'iconic']
  },
  {
    id: 'cape-town',
    city: 'Cape Town',
    country: 'South Africa',
    description: 'Table Mountain & Cape Town harbour',
    source: 'iframe',
    sourceId: 'https://webcams.windy.com/webcams/public/embed/player/1613199296/day',
    continent: 'Africa',
    timezone: 'Africa/Johannesburg',
    lat: -33.9249,
    lng: 18.4241,
    tags: ['mountain', 'harbour', 'nature']
  }
];

export const CONTINENTS = ['All', 'North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania'];

export function getLocalTime(timezone: string): string {
  try {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return '--:--';
  }
}

export function isDayTime(timezone: string): boolean {
  try {
    const hour = parseInt(
      new Date().toLocaleString('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        hour12: false
      })
    );
    return hour >= 6 && hour < 20;
  } catch {
    return true;
  }
}

export function parseYouTubeInput(input: string): string | null {
  const trimmed = input.trim();
  const videoPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of videoPatterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }
  // Bare 11-char video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}
