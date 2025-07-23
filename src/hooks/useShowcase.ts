import { useState, useEffect } from 'react';
import showcaseData from '../data/showcase.json';

interface ShowcaseItem {
  id: string;
  sn: string | number;
  pic: string;
  showcase: string;
  link: string;
}

interface ShowcaseData {
  showcase: ShowcaseItem[];
  lastUpdated: string;
}

export function useShowcase() {
  const [data, setData] = useState<ShowcaseData>(showcaseData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 从GitHub获取最新数据
  const fetchLatestData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 从GitHub raw content获取最新数据
      const response = await fetch(
        'https://raw.githubusercontent.com/Garena544/garena-ld-tools/master/src/data/showcase.json',
        {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch latest data');
      }
      
      const latestData = await response.json();
      setData(latestData);
    } catch (err) {
      console.warn('Failed to fetch latest showcase data, using local data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // 保持使用本地数据作为fallback
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取最新数据
  useEffect(() => {
    fetchLatestData();
  }, []);

  // 手动刷新数据
  const refreshData = () => {
    fetchLatestData();
  };

  return {
    data: data.showcase,
    lastUpdated: data.lastUpdated,
    loading,
    error,
    refreshData
  };
} 