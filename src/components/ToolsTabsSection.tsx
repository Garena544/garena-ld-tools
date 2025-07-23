import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ToolCard from './ToolCard';
import { useTools } from '../hooks/useTools';

type TabType = 'internal' | 'external';

export default function ToolsTabsSection() {
  const { t } = useLanguage();
  const { tools } = useTools();
  const [activeTab, setActiveTab] = useState<TabType>('internal');

  const internalTools = tools.filter(tool => tool.isInternal);
  const externalTools = tools.filter(tool => !tool.isInternal);

  const tabs = [
    {
      id: 'internal' as TabType,
      label: {
        en: 'Internal Tools',
        zh: '内部工具'
      },
      tools: internalTools,
      description: {
        en: t('tools.internal.desc'),
        zh: t('tools.internal.desc')
      }
    },
    {
      id: 'external' as TabType,
      label: {
        en: 'External Tools',
        zh: '外部工具'
      },
      tools: externalTools,
      description: {
        en: t('tools.external.desc'),
        zh: t('tools.external.desc')
      }
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {t(`sidebar.${tab.id}-tools`)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {activeTabData?.label[t.language as keyof typeof activeTabData.label]}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {activeTabData?.description[t.language as keyof typeof activeTabData.description]}
          </p>
        </div>

        {/* Tools Type Explanation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('tools.explanation.internal.title')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('tools.explanation.internal.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('tools.explanation.external.title')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('tools.explanation.external.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTabData?.tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {activeTabData?.tools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {activeTab === 'internal' ? t('tools.noInternalTools') : t('tools.noExternalTools')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 