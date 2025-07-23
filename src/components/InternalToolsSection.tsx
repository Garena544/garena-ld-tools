import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ToolCard from './ToolCard';
import { useTools } from '../hooks/useTools';

export default function InternalToolsSection() {
  const { t } = useLanguage();
  const { tools } = useTools();
  const internalTools = tools.filter(tool => tool.isInternal);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('tools.internal.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('tools.internal.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internalTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {internalTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('tools.noInternalTools')}</p>
          </div>
        )}
      </div>
    </section>
  );
} 