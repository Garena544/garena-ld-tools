import React, { useState } from 'react';
import { Play, ExternalLink, Video, Clock, Globe, Monitor } from 'lucide-react';
import { getYouTubeVideoId, isYouTubeUrl, isWebUrl, getVideoThumbnail, getWebPreviewInfo, getWebPreviewImage } from '../utils/videoUtils';

interface LinkPreviewProps {
  url?: string;
  title: string;
}

export default function LinkPreview({ url, title }: LinkPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImageLoaded, setPreviewImageLoaded] = useState(false);
  const [previewImageError, setPreviewImageError] = useState(false);

  // 如果没有URL或包含错误值，显示Coming Soon
  if (!url || url.includes('#VALUE!') || url.includes('#REF!') || url.trim() === '') {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">教学视频即将上线</p>
        <p className="text-gray-400 text-xs mt-1">Tutorial video coming soon</p>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(url);
  const isYouTube = isYouTubeUrl(url);
  const isWeb = isWebUrl(url);

  // YouTube视频播放器
  if (isYouTube && videoId) {
    return (
      <div className="relative">
        {!isPlaying ? (
          <div 
            className="relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={getVideoThumbnail(url)}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              YouTube
            </div>
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        )}
      </div>
    );
  }

  // 网页链接预览
  if (isWeb) {
    const previewInfo = getWebPreviewInfo(url);
    const previewImage = getWebPreviewImage(url);
    
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
        {!showPreview ? (
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowPreview(true)}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                {previewImage && !previewImageError && (
                  <img
                    src={previewImage}
                    alt={previewInfo.domain}
                    className="w-5 h-5 rounded"
                    onLoad={() => setPreviewImageLoaded(true)}
                    onError={() => setPreviewImageError(true)}
                    style={{ display: previewImageLoaded ? 'block' : 'none' }}
                  />
                )}
                {(!previewImage || previewImageError) && (
                  <Globe className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">网页预览</p>
                <p className="text-xs text-gray-500 truncate">{previewInfo.domain}</p>
                <p className="text-xs text-gray-400 truncate">{previewInfo.path}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="bg-gray-50 rounded border p-3 mb-3">
              <div className="flex items-center space-x-2 mb-2">
                {previewImage && !previewImageError && (
                  <img
                    src={previewImage}
                    alt={previewInfo.domain}
                    className="w-4 h-4 rounded"
                    onLoad={() => setPreviewImageLoaded(true)}
                    onError={() => setPreviewImageError(true)}
                    style={{ display: previewImageLoaded ? 'block' : 'none' }}
                  />
                )}
                {(!previewImage || previewImageError) && (
                  <Globe className="w-4 h-4 text-blue-600" />
                )}
                <span className="text-sm font-medium text-gray-900">{previewInfo.domain}</span>
              </div>
              <p className="text-xs text-gray-500">{url}</p>
            </div>
            <iframe
              src={url}
              width="100%"
              height="200"
              frameBorder="0"
              className="rounded border"
              title={title}
              sandbox="allow-scripts allow-same-origin"
              onError={() => {
                // 如果iframe加载失败，显示链接
                setShowPreview(false);
              }}
            ></iframe>
            <div className="mt-2 flex justify-between items-center">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                在新窗口打开
              </a>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-xs"
              >
                收起
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 其他类型的链接（非YouTube，非网页）
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      {!showPreview ? (
        <div 
          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setShowPreview(true)}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Monitor className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">外部链接</p>
              <p className="text-xs text-gray-500 truncate">{url}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="bg-gray-50 rounded border p-3 mb-3">
            <p className="text-sm text-gray-900 mb-1">链接地址</p>
            <p className="text-xs text-gray-500 break-all">{url}</p>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              在新窗口打开
            </a>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-500 hover:text-gray-700 text-xs"
            >
              收起
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 