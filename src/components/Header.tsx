import React from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const { t, language } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
            <img 
              src="/Garena logo.png" 
              alt="Garena Logo" 
                className="h-12 w-auto"
            />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t('header.title')}</h1>
              <p className="text-sm text-gray-600">{t('header.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageToggle />
          </div>
        </div>
      </div>


    </header>
  );
}