import React from 'react';
import { FileText, Users, Target, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-red-50 via-orange-50 to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {language === 'zh' ? (
              <>
                {t('hero.title')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  {t('hero.titleHighlight')}
                </span>
                赋能成长
              </>
            ) : (
              <>
                {t('hero.title')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  {t('hero.titleHighlight')}
                </span>
              </>
            )}
          </h1>
          


          {/* Three Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg">
                <FileText className="w-8 h-8 text-red-600 mx-auto mt-2" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('hero.feature1.title')}</h3>
            <p className="text-gray-600">{t('hero.feature1.desc')}</p>
          </div>
          <div className="text-center">
            <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-red-600 mx-auto mt-2" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('hero.feature2.title')}</h3>
            <p className="text-gray-600">{t('hero.feature2.desc')}</p>
          </div>
          <div className="text-center">
            <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-red-600 mx-auto mt-2" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('hero.feature3.title')}</h3>
            <p className="text-gray-600">{t('hero.feature3.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}