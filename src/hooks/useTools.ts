import { useState, useEffect } from 'react';
import toolsData from '../data/tools.json';

interface Tool {
  id: string;
  name: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  category: {
    zh: string;
    en: string;
  };
  features: {
    zh: string[];
    en: string[];
  };
  remarks: {
    zh: string;
    en: string;
  };
  rating: number;
  url?: string;
  tutorialUrl?: string;
  icon: string;
  isInternal?: boolean;
}

interface ToolsData {
  tools: Tool[];
  lastUpdated: string;
}

export function useTools() {
  const [data, setData] = useState<ToolsData>(toolsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 从GitHub获取最新数据
  const fetchLatestData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 从GitHub raw content获取最新数据
      const response = await fetch(
        'https://raw.githubusercontent.com/Garena544/garena-ld-tools/master/src/data/tools.json',
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
      console.warn('Failed to fetch latest tools data, using local data:', err);
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
    tools: data.tools,
    lastUpdated: data.lastUpdated,
    loading,
    error,
    refreshData
  };
}