import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ThreeCanvas } from './components/ThreeCanvas';
import { GooeyOverlay } from './components/GooeyOverlay';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { AboutPage } from './components/AboutPage';
import { CareersPage } from './components/CareersPage';
import { FAQSection } from './components/FAQSection';
import { NotFoundPage } from './components/NotFoundPage';
import { IPhoneShowcase } from './components/IPhoneShowcase';
import { ROICalculator } from './components/ROICalculator';
import { ContactModal } from './components/ContactModal';
import { CalendlyModal } from './components/CalendlyModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { initAnalytics } from './lib/analytics';

function MainAppContent() {
  const { currentRoute } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [contactPrefillService, setContactPrefillService] = useState('');
  const [contactPrefillBudget, setContactPrefillBudget] = useState('');

  React.useEffect(() => {
    initAnalytics();
  }, []);

  const handleOpenContact = () => {
    setContactPrefillService('');
    setContactPrefillBudget('');
    setIsContactOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    setContactPrefillService(serviceTitle);
    setIsContactOpen(true);
  };

  const handleOpenContactWithBudget = (budgetStr: string) => {
    setContactPrefillBudget(budgetStr);
    setIsContactOpen(true);
  };

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return (
          <>
            <Hero onOpenContact={handleOpenContact} />
            <IPhoneShowcase />
            <Services onSelectService={handleSelectService} />
            <Portfolio onOpenContact={handleOpenContact} />
            <ROICalculator onOpenContactWithBudget={handleOpenContactWithBudget} />
            <Pricing onOpenContactWithTier={(tier) => handleSelectService(`Plan: ${tier}`)} />
            <Testimonials />
            <Blog />
            <FAQSection />
          </>
        );
      case 'about':
        return <AboutPage onOpenContact={handleOpenContact} />;
      case 'services':
        return <Services onSelectService={handleSelectService} />;
      case 'portfolio':
        return <Portfolio onOpenContact={handleOpenContact} />;
      case 'pricing':
        return <Pricing onOpenContactWithTier={(tier) => handleSelectService(`Plan: ${tier}`)} />;
      case 'blog':
        return <Blog />;
      case 'careers':
        return <CareersPage />;
      case 'faq':
        return <FAQSection />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-[#f5f5f7] selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden font-sans">
      <ScrollProgress />
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <>
          <ThreeCanvas />
          <GooeyOverlay />
          <Navbar onOpenContact={handleOpenContact} />

          <main className="relative z-10 pt-24 pb-16">
            {renderCurrentView()}
          </main>

          <Footer />
          <AdminDashboard />
          <WhatsAppWidget />

          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            prefilledService={contactPrefillService}
            prefilledBudget={contactPrefillBudget}
            onOpenCalendly={() => {
              setIsContactOpen(false);
              setIsCalendlyOpen(true);
            }}
          />

          <CalendlyModal
            isOpen={isCalendlyOpen}
            onClose={() => setIsCalendlyOpen(false)}
          />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </AuthProvider>
  );
}
