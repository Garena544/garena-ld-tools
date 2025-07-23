import React from 'react';
import ToolCard from './ToolCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useTools } from '../hooks/useTools';
import { 
  Monitor, 
  Video, 
  Users, 
  BookOpen, 
  Brain, 
  MessageSquare, 
  Calendar, 
  BarChart3,
  Gamepad2,
  Presentation,
  Loader2,
  RefreshCw
} from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  Monitor: <Monitor className="w-6 h-6 text-orange-600" />,
  Video: <Video className="w-6 h-6 text-orange-600" />,
  Users: <Users className="w-6 h-6 text-orange-600" />,
  BookOpen: <BookOpen className="w-6 h-6 text-orange-600" />,
  Brain: <Brain className="w-6 h-6 text-orange-600" />,
  MessageSquare: <MessageSquare className="w-6 h-6 text-orange-600" />,
  Calendar: <Calendar className="w-6 h-6 text-orange-600" />,
  BarChart3: <BarChart3 className="w-6 h-6 text-orange-600" />,
  Gamepad2: <Gamepad2 className="w-6 h-6 text-orange-600" />,
  Presentation: <Presentation className="w-6 h-6 text-orange-600" />
};

export default function ToolsSection() {
  const { t, language } = useLanguage();
  const { tools, loading, error, refreshTools, lastUpdated, debugInfo } = useTools();

  if (loading) {
    return (
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
            <div className="ml-4">
              <div className="text-gray-600">Loading tools...</div>
              {debugInfo && <div className="text-sm text-gray-500 mt-1">{debugInfo}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading tools: {error}</p>
            {debugInfo && <p className="text-sm text-gray-500 mb-4">Debug: {debugInfo}</p>}
            <button
              onClick={refreshTools}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 根据工具类型分类
  const internalTools = tools.filter(tool => tool.category[language]?.toLowerCase().includes('内部') || tool.category[language]?.toLowerCase().includes('internal'));
  const externalTools = tools.filter(tool => !tool.category[language]?.toLowerCase().includes('内部') && !tool.category[language]?.toLowerCase().includes('internal'));

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Debug Info */}
        {debugInfo && (
          <div className="text-center mb-4">
            <details className="text-xs text-gray-400">
              <summary className="cursor-pointer hover:text-gray-600">调试信息</summary>
              <p className="mt-2 p-2 bg-gray-100 rounded text-left">{debugInfo}</p>
              <p className="mt-1">工具数量: {tools.length}</p>
              {tools.length > 0 && (
                <p className="mt-1">第一个工具: {tools[0]?.name?.zh || '无名称'}</p>
              )}
            </details>
          </div>
        )}

        {/* Internal Tools Section */}
        {internalTools.length > 0 && (
          <section id="internal" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('tools.internal.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('tools.internal.desc')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {internalTools.map((tool) => (
                <ToolCard 
                  key={tool.id}
                  tool={tool}
                  icon={iconMap[tool.icon] || iconMap.Monitor}
                />
              ))}
            </div>
          </section>
        )}

        {/* External Tools Section */}
        {externalTools.length > 0 && (
          <section id="external">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('tools.external.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('tools.external.desc')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {externalTools.map((tool) => (
                <ToolCard 
                  key={tool.id}
                  tool={tool}
                  icon={iconMap[tool.icon] || iconMap.Monitor}
                />
              ))}
            </div>
          </section>
        )}

        {tools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tools available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}