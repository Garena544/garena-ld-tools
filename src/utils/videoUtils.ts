// 视频工具函数
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  return /(?:youtube\.com|youtu\.be)/.test(url);
}

export function isWebUrl(url: string): boolean {
  if (!url) return false;
  return /^https?:\/\//.test(url) && !isYouTubeUrl(url);
}

export function getVideoThumbnail(url: string): string {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return '';
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// 获取网页预览信息
export function getWebPreviewInfo(url: string): { domain: string; path: string } {
  try {
    const urlObj = new URL(url);
    return {
      domain: urlObj.hostname,
      path: urlObj.pathname
    };
  } catch {
    return {
      domain: 'unknown',
      path: '/'
    };
  }
}

// 获取网页预览图
export function getWebPreviewImage(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // 尝试获取网站的favicon作为预览图
    const faviconUrl = `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
    
    // 对于Google服务，使用特定的图标
    if (urlObj.hostname.includes('google.com')) {
      return 'https://www.google.com/favicon.ico';
    }
    
    // 对于GitHub，使用特定的图标
    if (urlObj.hostname.includes('github.com')) {
      return 'https://github.com/favicon.ico';
    }
    
    // 对于其他网站，尝试获取favicon
    return faviconUrl;
  } catch {
    return '';
  }
}