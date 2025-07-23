import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
            language === 'en'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('zh')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
            language === 'zh'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          中文
        </button>
      </div>
    </div>
  );
}