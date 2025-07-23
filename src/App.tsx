import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import LastUpdated from './components/LastUpdated';
import Hero from './components/Hero';
import ToolsSection from './components/ToolsSection';
import ToolsTabsSection from './components/ToolsTabsSection';
import InternalToolsSection from './components/InternalToolsSection';
import ExternalToolsSection from './components/ExternalToolsSection';
import ShowcaseSection from './components/ShowcaseSection';
import WishingPoolSection from './components/WishingPoolSection';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('tools');

  const renderContent = () => {
    switch (activeSection) {
      case 'tools':
        return (
          <>
            <LastUpdated />
            <Hero />
            <ToolsTabsSection />
          </>
        );
      case 'internal-tools':
        return (
          <>
            <LastUpdated />
            <Hero />
            <InternalToolsSection />
          </>
        );
      case 'external-tools':
        return (
          <>
            <LastUpdated />
            <Hero />
            <ExternalToolsSection />
          </>
        );
      case 'showcase':
        return <ShowcaseSection />;
      case 'wishing-pool':
        return <WishingPoolSection />;
      default:
        return (
          <>
            <LastUpdated />
            <Hero />
            <ToolsTabsSection />
          </>
        );
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;