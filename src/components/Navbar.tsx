import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Cpu, 
  Layers, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  BrainCircuit,
  Target,
  TrendingUp,
  Users,
  Send,
  Download
} from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  onOpenPitchDeck: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPitchDeck }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sound.playClick(900);
    }
  };

  const navLinks = [
    { label: 'Overview', href: '#interactive-slate' },
    { label: 'Problem & Retrofit', href: '#problem-comparison' },
    { label: 'ARCKF Moat', href: '#arckf-pipeline' },
    { label: 'Market & ROI', href: '#market-economics' },
    { label: '15M Roadmap', href: '#commercialization-roadmap' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo & Patent Lead */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none"
          onClick={() => sound.playClick(600)}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/15 flex items-center justify-center font-heading font-black text-sm text-chalk-cyan group-hover:border-chalk-cyan/50 transition-colors">
            DC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm tracking-tight text-white group-hover:text-chalk-cyan transition-colors">
                DIGI-CHALK
              </span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-chalk-cyan/10 text-chalk-cyan border border-chalk-cyan/30 font-bold">
                PATENT FILED
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Team Zero Resistance • SREC
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 border border-white/5 px-3 py-1 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.playClick(750)}
              className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all font-sans"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Sound FX Audio Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-chalk-cyan transition-all text-xs flex items-center gap-1.5"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-chalk-emerald" />
                <span className="hidden sm:inline text-[10px] font-mono text-slate-300">AUDIO</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline text-[10px] font-mono text-slate-500">MUTED</span>
              </>
            )}
          </button>

          {/* Pitch Deck Playbook CTA */}
          <button
            onClick={() => {
              sound.playClick(1000);
              onOpenPitchDeck();
            }}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-white/15 hover:border-chalk-cyan text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-chalk-cyan" />
            <span>₹13L Pitch Playbook</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>

      </div>
    </header>
  );
};
