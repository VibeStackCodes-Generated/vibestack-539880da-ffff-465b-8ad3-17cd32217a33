export interface Webcam {
  id: string;
  city: string;
  country: string;
  description: string;
  youtubeId: string;
  type: 'video' | 'channel';
  continent: string;
  timezone: string;
  lat: number;
  lng: number;
  tags: string[];
  isUserAdded?: boolean;
}

export const DEFAULT_WEBCAMS: Webcam[] = [
  {
    id: 'tokyo-shibuya',
    city: 'Tokyo',
    country: 'Japan',
    description: 'Shibuya Crossing — the world\'s busiest pedestrian crossing',
    youtubeId: 'UCgdHxnHSXvcAi4PaMIY1Ltg',
    type: 'channel',
    continent: 'Asia',
    timezone: 'Asia/Tokyo',
    lat: 35.6595,
    lng: 139.7004,
    tags: ['city', 'crossing', 'iconic']
  },
  {
    id: 'nyc-times-square',
    city: 'New York',
    country: 'USA',
    description: 'Times Square — the crossroads of the world',
    youtubeId: 'UCOuSsNMHAELqGMnKBOO7Y1g',
    type: 'channel',
    continent: 'North America',
    timezone: 'America/New_York',
    lat: 40.758,
    lng: -73.9855,
    tags: ['city', 'nightlife', 'iconic']
  },
  {
    id: 'paris-eiffel',
    city: 'Paris',
    country: 'France',
    description: 'Eiffel Tower panoramic view',
    youtubeId: 'UCk1SpWNzOs71MHpsMX6E-6Q',
    type: 'channel',
    continent: 'Europe',
    timezone: 'Europe/Paris',
    lat: 48.8584,
    lng: 2.2945,
    tags: ['landmark', 'tower', 'romantic']
  },
  {
    id: 'london-abbey-road',
    city: 'London',
    country: 'UK',
    description: 'Abbey Road Studios — the famous Beatles crossing',
    youtubeId: 'UCSsvn-e3CnCBOGfOOsWuyLw',
    type: 'channel',
    continent: 'Europe',
    timezone: 'Europe/London',
    lat: 51.5320,
    lng: -0.1778,
    tags: ['music', 'crossing', 'iconic']
  },
  {
    id: 'miami-beach',
    city: 'Miami',
    country: 'USA',
    description: 'South Beach live view — sun, sand, and ocean',
    youtubeId: 'UC8FMRZhKJSBaIq-0KR-FMGQ',
    type: 'channel',
    continent: 'North America',
    timezone: 'America/New_York',
    lat: 25.7617,
    lng: -80.1918,
    tags: ['beach', 'ocean', 'tropical']
  },
  {
    id: 'dublin-temple-bar',
    city: 'Dublin',
    country: 'Ireland',
    description: 'Temple Bar — Dublin\'s cultural quarter',
    youtubeId: 'UCEljkBchBWaP4Hbi3gFillA',
    type: 'channel',
    continent: 'Europe',
    timezone: 'Europe/Dublin',
    lat: 53.3454,
    lng: -6.2644,
    tags: ['pub', 'culture', 'nightlife']
  },
  {
    id: 'jackson-hole',
    city: 'Jackson Hole',
    country: 'USA',
    description: 'Town Square — famous elk antler arches',
    youtubeId: 'UCDGknzyMNwTBiUagro5BPjg',
    type: 'channel',
    continent: 'North America',
    timezone: 'America/Denver',
    lat: 43.4799,
    lng: -110.7624,
    tags: ['mountain', 'wildlife', 'town']
  },
  {
    id: 'venice-rialto',
    city: 'Venice',
    country: 'Italy',
    description: 'Rialto Bridge — Grand Canal view',
    youtubeId: 'UC2HEbWpC_1v6i9RnDMy-dfA',
    type: 'channel',
    continent: 'Europe',
    timezone: 'Europe/Rome',
    lat: 45.4380,
    lng: 12.3358,
    tags: ['canal', 'bridge', 'romantic']
  },
  {
    id: 'amsterdam-dam',
    city: 'Amsterdam',
    country: 'Netherlands',
    description: 'Dam Square — heart of Amsterdam',
    youtubeId: 'UC-mzAAWNjRFQ2o5ePmzVNQQ',
    type: 'channel',
    continent: 'Europe',
    timezone: 'Europe/Amsterdam',
    lat: 52.3731,
    lng: 4.8932,
    tags: ['square', 'city', 'historic']
  },
  {
    id: 'rio-copacabana',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    description: 'Copacabana Beach — iconic Brazilian coastline',
    youtubeId: 'UCYwHOxK_cZBMqtFBIYsirgg',
    type: 'channel',
    continent: 'South America',
    timezone: 'America/Sao_Paulo',
    lat: -22.9711,
    lng: -43.1822,
    tags: ['beach', 'ocean', 'iconic']
  },
  {
    id: 'bangkok-street',
    city: 'Bangkok',
    country: 'Thailand',
    description: 'Bangkok street view — bustling Thai capital',
    youtubeId: 'UCYExDsGMXpMnOvras-cDfkA',
    type: 'channel',
    continent: 'Asia',
    timezone: 'Asia/Bangkok',
    lat: 13.7563,
    lng: 100.5018,
    tags: ['street', 'city', 'food']
  },
  {
    id: 'prague-old-town',
    city: 'Prague',
    country: 'Czech Republic',
    description: 'Old Town Square — astronomical clock view',
    youtubeId: 'UCSbkSGY5JKQ_gVLsaecxCBw',
    type: 'channel',
    continent: 'Europe',
    timezone: 'Europe/Prague',
    lat: 50.0870,
    lng: 14.4213,
    tags: ['historic', 'square', 'clock']
  },
  {
    id: 'la-santa-monica',
    city: 'Los Angeles',
    country: 'USA',
    description: 'Santa Monica Beach — Pacific Coast views',
    youtubeId: 'UC--GhsqjOhNLjkkObSe3Khw',
    type: 'channel',
    continent: 'North America',
    timezone: 'America/Los_Angeles',
    lat: 34.0195,
    lng: -118.4912,
    tags: ['beach', 'pier', 'sunset']
  },
  {
    id: 'istanbul-bosphorus',
    city: 'Istanbul',
    country: 'Turkey',
    description: 'Bosphorus Strait — where Europe meets Asia',
    youtubeId: 'UC7jBsNELFBhCMc8yJtIXrrg',
    type: 'channel',
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
    description: 'Sydney Harbour — Opera House and Bridge views',
    youtubeId: 'UCIXnUiQGInS_UZGfEFIdUOg',
    type: 'channel',
    continent: 'Oceania',
    timezone: 'Australia/Sydney',
    lat: -33.8568,
    lng: 151.2153,
    tags: ['harbour', 'opera', 'bridge']
  },
  {
    id: 'nairobi-watering-hole',
    city: 'Nairobi',
    country: 'Kenya',
    description: 'African wildlife watering hole — live animal cam',
    youtubeId: 'UCnRBr0po2PBVxpiKGaqHRHQ',
    type: 'channel',
    continent: 'Africa',
    timezone: 'Africa/Nairobi',
    lat: -1.2921,
    lng: 36.8219,
    tags: ['wildlife', 'nature', 'animals']
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

export function parseYouTubeInput(input: string): { id: string; type: 'video' | 'channel' } | null {
  const trimmed = input.trim();
  
  // YouTube video URL patterns
  const videoPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of videoPatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      return { id: match[1], type: 'video' };
    }
  }
  
  // YouTube channel URL patterns
  const channelPatterns = [
    /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/live_stream\?channel=([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of channelPatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      return { id: match[1], type: 'channel' };
    }
  }
  
  // If it looks like a channel ID (starts with UC and is 24 chars)
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(trimmed)) {
    return { id: trimmed, type: 'channel' };
  }
  
  return null;
}
