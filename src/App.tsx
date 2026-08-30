import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemComparison } from './components/ProblemComparison';
import { HardwareBOM } from './components/HardwareBOM';
import { MathAndFilterMoat } from './components/MathAndFilterMoat';
import { MarketEconomics } from './components/MarketEconomics';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { TeamSection } from './components/TeamSection';
import { ContactFooter } from './components/ContactFooter';
import { PitchDeckModal } from './components/PitchDeckModal';

export const App: React.FC = () => {
  const [pitchDeckOpen, setPitchDeckOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-chalk-cyan/20 selection:text-chalk-cyan relative">
      
      {/* Navigation Header */}
      <Navbar onOpenPitchDeck={() => setPitchDeckOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* HERO SECTION + Interactive Slate Sandbox */}
        <HeroSection onOpenPitchDeck={() => setPitchDeckOpen(true)} />

        {/* SECTION 2: The Problem & The Retrofit Paradigm */}
        <ProblemComparison />

        {/* SECTION 3: Hardware Architecture Subsystems */}
        <HardwareBOM />

        {/* SECTION 4: Mathematical Moat & Sensing Pipeline (ARCKF & AI) */}
        <MathAndFilterMoat />

        {/* SECTION 5: Market Dynamics, Unit Economics & ROI Calculator */}
        <MarketEconomics />

        {/* SECTION 6: Commercialization Roadmap (₹13,00,000 Seed Round) */}
        <RoadmapTimeline onOpenPitchDeck={() => setPitchDeckOpen(true)} />

        {/* SECTION 7: Team Zero Resistance & Institutional Credentials (SREC) */}
        <TeamSection />
      </main>

      {/* SECTION 8: Contact & Investor Portal */}
      <ContactFooter onOpenPitchDeck={() => setPitchDeckOpen(true)} />

      {/* Interactive Pitch Playbook Modal */}
      <PitchDeckModal 
        isOpen={pitchDeckOpen} 
        onClose={() => setPitchDeckOpen(false)} 
      />

    </div>
  );
};

export default App;
