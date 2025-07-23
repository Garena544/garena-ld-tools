import { useState, useEffect } from 'react';

export interface WishItem {
  id: string;
  sn: string;
  requester: string;
  wish: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface WishForm {
  requester: string;
  wish: string;
}

const WISHING_POOL_STORAGE_KEY = 'ld_wishing_pool_data';

export function useWishingPool() {
  const [wishItems, setWishItems] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 从本地存储加载数据
  const loadWishes = () => {
    try {
      const storedData = localStorage.getItem(WISHING_POOL_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setWishItems(parsedData);
      } else {
        // 如果没有数据，使用默认数据
        const defaultWishes: WishItem[] = [
          {
            id: '1',
            sn: '001',
            requester: 'John Doe',
            wish: '希望有更多的AI学习资源',
            status: 'pending',
            createdAt: '2024-01-15'
          },
          {
            id: '2',
            sn: '002',
            requester: 'Jane Smith',
            wish: '需要更多的技术培训课程',
            status: 'approved',
            createdAt: '2024-01-16'
          }
        ];
        setWishItems(defaultWishes);
        localStorage.setItem(WISHING_POOL_STORAGE_KEY, JSON.stringify(defaultWishes));
      }
    } catch (error) {
      console.error('Error loading wishes:', error);
      setWishItems([]);
    } finally {
      setLoading(false);
    }
  };

  // 保存数据到本地存储
  const saveWishes = (wishes: WishItem[]) => {
    try {
      localStorage.setItem(WISHING_POOL_STORAGE_KEY, JSON.stringify(wishes));
      setWishItems(wishes);
    } catch (error) {
      console.error('Error saving wishes:', error);
    }
  };

  // 添加新愿望
  const addWish = (formData: WishForm) => {
    const newWish: WishItem = {
      id: generateId(formData.requester + formData.wish + Date.now()),
      sn: String(wishItems.length + 1).padStart(3, '0'),
      requester: formData.requester,
      wish: formData.wish,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedWishes = [newWish, ...wishItems];
    saveWishes(updatedWishes);
    return newWish;
  };

  // 更新愿望状态
  const updateWishStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    const updatedWishes = wishItems.map(wish => 
      wish.id === id ? { ...wish, status } : wish
    );
    saveWishes(updatedWishes);
  };

  // 删除愿望
  const deleteWish = (id: string) => {
    const updatedWishes = wishItems.filter(wish => wish.id !== id);
    saveWishes(updatedWishes);
  };

  // 生成ID
  const generateId = (name: string): string => {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  useEffect(() => {
    loadWishes();
  }, []);

  return {
    wishItems,
    loading,
    addWish,
    updateWishStatus,
    deleteWish,
    loadWishes
  };
} 