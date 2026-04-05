import { useState, useEffect, useCallback } from 'react';
import { Webcam, DEFAULT_WEBCAMS } from '@/lib/webcam-data';

const STORAGE_KEY = 'worldcam-user-webcams';

function loadUserWebcams(): Webcam[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUserWebcams(webcams: Webcam[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(webcams));
}

export function useWebcams() {
  const [userWebcams, setUserWebcams] = useState<Webcam[]>(loadUserWebcams);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allWebcams = [...DEFAULT_WEBCAMS, ...userWebcams];

  const filteredWebcams = allWebcams.filter(cam => {
    const matchesContinent = filter === 'All' || cam.continent === filter;
    const matchesSearch = searchQuery === '' || 
      cam.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesContinent && matchesSearch;
  });

  const addWebcam = useCallback((webcam: Webcam) => {
    setUserWebcams(prev => {
      const updated = [...prev, { ...webcam, isUserAdded: true }];
      saveUserWebcams(updated);
      return updated;
    });
  }, []);

  const removeWebcam = useCallback((id: string) => {
    setUserWebcams(prev => {
      const updated = prev.filter(cam => cam.id !== id);
      saveUserWebcams(updated);
      return updated;
    });
  }, []);

  return {
    webcams: filteredWebcams,
    allWebcams,
    userWebcams,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addWebcam,
    removeWebcam
  };
}
