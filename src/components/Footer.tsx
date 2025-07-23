import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/Garena logo.png" 
                alt="Garena Logo" 
                className="h-8 w-auto filter brightness-0 invert"
              />
              <div>
                <h3 className="text-xl font-bold">{t('header.title')}</h3>
                <p className="text-gray-400">Garena</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#internal" className="text-gray-400 hover:text-orange-400 transition-colors">
                  {t('header.internal')}
                </a>
              </li>
              <li>
                <a href="#external" className="text-gray-400 hover:text-orange-400 transition-colors">
                  {t('header.external')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  {t('footer.trainingCalendar')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  {t('footer.resourceLibrary')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.contactTeam')}</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400">learning@garena.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400">+65 6292 0000</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400">Singapore</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}