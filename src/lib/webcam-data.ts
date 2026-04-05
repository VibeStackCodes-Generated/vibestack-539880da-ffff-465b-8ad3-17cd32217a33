export interface Webcam {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  description: string;
  embedUrl: string;
  youtubeSearch: string; // fallback search query for finding a live stream
  continent: string;
  timezone: string;
  lat: number;
  lng: number;
  tags: string[];
  isUserAdded?: boolean;
}

// YouTube embed helpers
function ytVideo(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&rel=0&modestbranding=1&controls=1`;
}

function ytChannel(channelId: string): string {
  return `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0&mute=1`;
}

// Curated webcams using YouTube live_stream?channel= (permanent) and video IDs (confirmed)
// Channel IDs sourced from well-known 24/7 webcam operators
export const DEFAULT_WEBCAMS: Webcam[] = [
  {
    id: 'jackson-hole',
    city: 'Jackson Hole',
    country: 'United States',
    countryCode: 'US',
    description: 'Town Square — elk antler arches',
    embedUrl: ytChannel('UCDGknzyMNwTBiUagro5BPjg'),
    youtubeSearch: 'jackson hole town square live cam',
    continent: 'North America',
    timezone: 'America/Denver',
    lat: 43.4799,
    lng: -110.7624,
    tags: ['mountain', 'town', 'iconic']
  },
  {
    id: 'tokyo-shibuya',
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    description: 'Shibuya Crossing — busiest intersection',
    embedUrl: ytChannel('UCgdHxnHSXvcAi4PaMIY1Ltg'),
    youtubeSearch: 'shibuya crossing live cam',
    continent: 'Asia',
    timezone: 'Asia/Tokyo',
    lat: 35.6595,
    lng: 139.7004,
    tags: ['city', 'crossing', 'iconic']
  },
  {
    id: 'nyc-times-square',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    description: 'Times Square — crossroads of the world',
    embedUrl: ytChannel('UCOuSsNMHAELqGMnKBOO7Y1g'),
    youtubeSearch: 'times square new york live cam',
    continent: 'North America',
    timezone: 'America/New_York',
    lat: 40.758,
    lng: -73.9855,
    tags: ['city', 'nightlife', 'iconic']
  },
  {
    id: 'london-abbey-road',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    description: 'Abbey Road — the famous Beatles crossing',
    embedUrl: ytChannel('UCSsvn-e3CnCBOGfOOsWuyLw'),
    youtubeSearch: 'abbey road london live cam',
    continent: 'Europe',
    timezone: 'Europe/London',
    lat: 51.5320,
    lng: -0.1778,
    tags: ['music', 'crossing', 'iconic']
  },
  {
    id: 'venice-rialto',
    city: 'Venice',
    country: 'Italy',
    countryCode: 'IT',
    description: 'Rialto Bridge — Grand Canal view',
    embedUrl: ytChannel('UC2HEbWpC_1v6i9RnDMy-dfA'),
    youtubeSearch: 'venice rialto bridge live cam',
    continent: 'Europe',
    timezone: 'Europe/Rome',
    lat: 45.4380,
    lng: 12.3358,
    tags: ['canal', 'bridge', 'romantic']
  },
  {
    id: 'dublin-temple-bar',
    city: 'Dublin',
    country: 'Ireland',
    countryCode: 'IE',
    description: "Temple Bar — Dublin's cultural quarter",
    embedUrl: ytChannel('UCEljkBchBWaP4Hbi3gFillA'),
    youtubeSearch: 'dublin temple bar live cam',
    continent: 'Europe',
    timezone: 'Europe/Dublin',
    lat: 53.3454,
    lng: -6.2644,
    tags: ['pub', 'culture', 'nightlife']
  },
  {
    id: 'miami-beach',
    city: 'Miami Beach',
    country: 'United States',
    countryCode: 'US',
    description: 'South Beach — Atlantic oceanfront',
    embedUrl: ytChannel('UC8FMRZhKJSBaIq-0KR-FMGQ'),
    youtubeSearch: 'miami south beach live cam',
    continent: 'North America',
    timezone: 'America/New_York',
    lat: 25.7617,
    lng: -80.1918,
    tags: ['beach', 'ocean', 'tropical']
  },
  {
    id: 'amsterdam-dam',
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    description: 'Dam Square — heart of Amsterdam',
    embedUrl: ytChannel('UC-mzAAWNjRFQ2o5ePmzVNQQ'),
    youtubeSearch: 'amsterdam dam square live cam',
    continent: 'Europe',
    timezone: 'Europe/Amsterdam',
    lat: 52.3731,
    lng: 4.8932,
    tags: ['square', 'city', 'historic']
  },
  {
    id: 'prague-old-town',
    city: 'Prague',
    country: 'Czech Republic',
    countryCode: 'CZ',
    description: 'Old Town Square — astronomical clock',
    embedUrl: ytChannel('UCSbkSGY5JKQ_gVLsaecxCBw'),
    youtubeSearch: 'prague old town square live cam',
    continent: 'Europe',
    timezone: 'Europe/Prague',
    lat: 50.0870,
    lng: 14.4213,
    tags: ['historic', 'square', 'clock']
  },
  {
    id: 'la-santa-monica',
    city: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    description: 'Santa Monica Beach — Pacific Coast',
    embedUrl: ytChannel('UC--GhsqjOhNLjkkObSe3Khw'),
    youtubeSearch: 'santa monica beach live cam',
    continent: 'North America',
    timezone: 'America/Los_Angeles',
    lat: 34.0195,
    lng: -118.4912,
    tags: ['beach', 'pier', 'sunset']
  },
  {
    id: 'nairobi-wildlife',
    city: 'Nairobi',
    country: 'Kenya',
    countryCode: 'KE',
    description: 'African wildlife watering hole',
    embedUrl: ytChannel('UCnRBr0po2PBVxpiKGaqHRHQ'),
    youtubeSearch: 'african wildlife watering hole live cam',
    continent: 'Africa',
    timezone: 'Africa/Nairobi',
    lat: -1.2921,
    lng: 36.8219,
    tags: ['wildlife', 'nature', 'animals']
  },
  {
    id: 'rio-copacabana',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    countryCode: 'BR',
    description: 'Copacabana Beach — iconic coastline',
    embedUrl: ytChannel('UCYwHOxK_cZBMqtFBIYsirgg'),
    youtubeSearch: 'copacabana beach rio live cam',
    continent: 'South America',
    timezone: 'America/Sao_Paulo',
    lat: -22.9711,
    lng: -43.1822,
    tags: ['beach', 'ocean', 'iconic']
  },
  {
    id: 'istanbul-bosphorus',
    city: 'Istanbul',
    country: 'Turkey',
    countryCode: 'TR',
    description: 'Bosphorus — Europe meets Asia',
    embedUrl: ytChannel('UC7jBsNELFBhCMc8yJtIXrrg'),
    youtubeSearch: 'istanbul bosphorus live cam',
    continent: 'Europe',
    timezone: 'Europe/Istanbul',
    lat: 41.0082,
    lng: 28.9784,
    tags: ['strait', 'bridge', 'historic']
  },
  {
    id: 'sydney-harbour',
    city: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
    description: 'Sydney Harbour — Opera House & Bridge',
    embedUrl: ytChannel('UCIXnUiQGInS_UZGfEFIdUOg'),
    youtubeSearch: 'sydney harbour opera house live cam',
    continent: 'Oceania',
    timezone: 'Australia/Sydney',
    lat: -33.8568,
    lng: 151.2153,
    tags: ['harbour', 'opera', 'bridge']
  },
  {
    id: 'paris-eiffel',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    description: 'Eiffel Tower — panoramic city view',
    embedUrl: ytChannel('UCk1SpWNzOs71MHpsMX6E-6Q'),
    youtubeSearch: 'paris eiffel tower live cam',
    continent: 'Europe',
    timezone: 'Europe/Paris',
    lat: 48.8584,
    lng: 2.2945,
    tags: ['landmark', 'tower', 'romantic']
  },
  {
    id: 'bangkok-city',
    city: 'Bangkok',
    country: 'Thailand',
    countryCode: 'TH',
    description: 'Bangkok cityscape — bustling capital',
    embedUrl: ytChannel('UCYExDsGMXpMnOvras-cDfkA'),
    youtubeSearch: 'bangkok city live cam',
    continent: 'Asia',
    timezone: 'Asia/Bangkok',
    lat: 13.7563,
    lng: 100.5018,
    tags: ['city', 'skyline', 'temple']
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

export function parseYouTubeUrl(input: string): string | null {
  const trimmed = input.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  return null;
}
