import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';
import { useShowcase } from '../hooks/useShowcase';

export default function ShowcaseSection() {
  const { t } = useLanguage();
  const { showcaseItems, loading, error } = useShowcase();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          {t('showcase.retry')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('showcase.title')}
        </h1>
        <p className="text-gray-600 text-lg">
          {t('showcase.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcaseItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                  {item.sn}
                </div>
                {item.pic && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{t('showcase.pic')}:</span> {item.pic}
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.showcase}
              </h3>
              
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <span>{t('showcase.viewMore')}</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {showcaseItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('showcase.noItems')}</p>
        </div>
      )}
    </div>
  );
} 