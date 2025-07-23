import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LinkPreview from './LinkPreview';

interface Tool {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  category: {
    en: string;
    zh: string;
  };
  remarks?: {
    en: string;
    zh: string;
  };
  features: {
    en: string[];
    zh: string[];
  };
  rating: number;
  url?: string;
  tutorialUrl?: string;
  icon: string;
}

interface ToolCardProps {
  tool: Tool;
  icon: React.ReactNode;
}

export default function ToolCard({ tool, icon }: ToolCardProps) {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-orange-100 via-red-50 to-orange-50 p-3 rounded-xl shadow-sm border border-orange-200">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {tool.name[language]}
              </h3>
            </div>
          </div>
          {tool.url && (
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-600 transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed font-medium italic">
          {tool.description[language]}
        </p>

        {tool.features[language].length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              {t('tools.features')}
            </h4>
            <ul className="space-y-2">
              {tool.features[language].map((feature, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tool.remarks && tool.remarks[language] && (
          <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-orange-400">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              {language === 'zh' ? '备注' : 'Remarks'}
            </h4>
            {tool.remarks[language].includes('\n') ? (
              <ul className="space-y-1">
                {tool.remarks[language].split('\n').map((remark, index) => (
                  remark.trim() && (
                    <li key={index} className="text-sm text-gray-800 flex items-start">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                      <span className="leading-relaxed">{remark.trim()}</span>
                    </li>
                  )
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-800 font-medium">
                {tool.remarks[language]}
              </p>
            )}
          </div>
        )}

        {/* 隐藏分类标签
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-semibold bg-gray-100 px-3 py-1 rounded-full">
            {tool.category[language]}
          </span>
        </div>
        */}

        {/* 教学视频部分 */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            {language === 'zh' ? '教学视频' : 'Tutorial Video'}
          </h4>
          <LinkPreview 
            url={tool.tutorialUrl} 
            title={tool.name[language]}
          />
        </div>
      </div>
    </div>
  );
}