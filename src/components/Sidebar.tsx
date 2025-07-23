import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Wrench, Star, Heart, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { t, language } = useLanguage();
  const [toolsExpanded, setToolsExpanded] = useState(false);

  const navigationItems = [
    {
      id: 'tools',
      label: {
        en: 'Tools',
        zh: '工具'
      },
      icon: Wrench,
      hasSubmenu: true,
      submenu: [
        {
          id: 'internal-tools',
          label: {
            en: 'Internal Tools',
            zh: '内部工具'
          }
        },
        {
          id: 'external-tools',
          label: {
            en: 'External Tools',
            zh: '外部工具'
          }
        }
      ]
    },
    {
      id: 'showcase',
      label: {
        en: 'Best Practice Showcase',
        zh: '最佳实践展示'
      },
      icon: Star
    },
    {
      id: 'wishing-pool',
      label: {
        en: 'Wishing Pool',
        zh: '许愿池'
      },
      icon: Heart
    },
    {
      id: 'learning-portal',
      label: {
        en: 'Learning Portal',
        zh: '学习门户'
      },
      icon: ExternalLink,
      isExternal: true,
      url: 'https://learning.sea.com/'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {t('sidebar.navigation')}
        </h2>
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || 
              (item.hasSubmenu && (activeSection === 'internal-tools' || activeSection === 'external-tools'));
            
            if (item.isExternal) {
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Icon size={20} />
                  <span className="font-medium">
                    {language === 'zh' ? item.label.zh : item.label.en}
                  </span>
                </a>
              );
            }
            
            if (item.hasSubmenu) {
              return (
                <div key={item.id}>
                  <button
                    onClick={() => setToolsExpanded(!toolsExpanded)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={20} />
                      <span className="font-medium">
                        {language === 'zh' ? item.label.zh : item.label.en}
                      </span>
                    </div>
                    {toolsExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  
                  {toolsExpanded && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.submenu?.map((subItem) => {
                        const isSubActive = activeSection === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => onSectionChange(subItem.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors text-sm ${
                              isSubActive
                                ? 'bg-red-100 text-red-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <span className="font-medium">
                              {language === 'zh' ? subItem.label.zh : subItem.label.en}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">
                  {language === 'zh' ? item.label.zh : item.label.en}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 