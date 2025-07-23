import { useState, useEffect } from 'react';
import showcaseData from '../data/showcase.json';

export interface ShowcaseItem {
  id: string;
  sn: string;
  pic: string;
  showcase: string;
  link: string;
}

export function useShowcase() {
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setShowcaseItems(showcaseData.showcase);
      setLoading(false);
    } catch (err) {
      setError('Failed to load showcase data');
      setLoading(false);
    }
  }, []);

  return { showcaseItems, loading, error };
} 