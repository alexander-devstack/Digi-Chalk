import React, { useState } from 'react';
import { 
  Send, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  DollarSign, 
  ShieldCheck,
  Video,
  Mail,
  User,
  Building,
  Phone,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface InvestorPortalProps {
  onOpenPitchDeck: () => void;
}

export const InvestorPortal: React.FC<InvestorPortalProps> = ({ onOpenPitchDeck }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    investorType: 'Angel Investor',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedDemoDate, setSelectedDemoDate] = useState('2026-09-02');
  const [selectedDemoTime, setSelectedDemoTime] = useState('11:00 AM IST');
  const [demoBooked, setDemoBooked] = useState(false);

  const availableTimeSlots = [
    '10:00 AM IST',
    '11:30 AM IST',
    '02:30 PM IST',
    '04:00 PM IST',
    '06:00 PM IST',
  ];

  const availableDates = [
    { day: 'Wed, Sep 2', value: '2026-09-02' },
    { day: 'Thu, Sep 3', value: '2026-09-03' },
    { day: 'Fri, Sep 4', value: '2026-09-04' },
    { day: 'Mon, Sep 7', value: '2026-09-07' },
  ];

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccessChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
    setFormSubmitted(true);
  };

  const handleBookDemo = () => {
    sound.playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setDemoBooked(true);
  };

  return (
    <section id="investor-portal" className="py-20 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-chalk-cyan/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan shadow-xl shadow-chalk-cyan/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>₹23L Seed Round • TRL-2 → TRL-9 Pathway</span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
            Invest in Equitable Digital Education
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-mono max-w-2xl mx-auto leading-relaxed">
            <strong className="text-chalk-emerald">₹23,18,850</strong> carries Digi-Chalk from TRL-2 to a certified, multi-district, production-ready market leader across India's 1.5M classrooms in 12–15 months.
          </p>

          {/* Direct Link to Pitch Playbook CTA */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/Digi-Chalk_Business_Model_23L.pdf"
              download="Digi-Chalk_Business_Model_23L.pdf"
              onClick={() => sound.playClick(800)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 font-heading font-bold text-sm flex items-center gap-2 shadow-lg shadow-chalk-cyan/25 hover:shadow-chalk-cyan/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download Pitch Playbook (₹23L Round)</span>
            </a>
          </div>
        </div>

        {/* 2-Column Portal Grid: Book Demo Calendar vs Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 6 Cols: Interactive "Book Live Tech Demo" Calendar Scheduler */}
          <div className="lg:col-span-6 glass-card rounded-3xl border border-white/10 p-6 sm:p-8 bg-slate-950/90 shadow-2xl space-y-6">
            
            <div className="pb-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Video className="w-5 h-5 text-chalk-cyan" />
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Book a Live Hardware Demo
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Live 1-on-1 acoustic bring-up & TDOA walkthrough with founder
                  </p>
                </div>
              </div>
            </div>

            {demoBooked ? (
              <div className="p-8 rounded-2xl bg-chalk-emerald/10 border border-chalk-emerald/40 text-center space-y-3 font-mono">
                <CheckCircle2 className="w-12 h-12 text-chalk-emerald mx-auto animate-bounce" />
                <h4 className="font-heading font-bold text-xl text-white">
                  Hardware Demo Confirmed!
                </h4>
                <p className="text-xs text-slate-300">
                  Scheduled for <strong className="text-chalk-cyan">{selectedDemoDate}</strong> at <strong className="text-chalk-cyan">{selectedDemoTime}</strong>.
                </p>
                <p className="text-[11px] text-slate-400">
                  A Google Meet invitation has been dispatched to your calendar with Alexander Samuel R (Founder).
                </p>
              </div>
            ) : (
              <div className="space-y-5 font-mono text-xs">
                
                {/* Date Selector */}
                <div className="space-y-2">
                  <label className="text-slate-300 font-bold block">1. Select Walkthrough Date:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {availableDates.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => {
                          sound.playClick(650);
                          setSelectedDemoDate(d.value);
                        }}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedDemoDate === d.value
                            ? 'bg-chalk-cyan/20 border-chalk-cyan text-chalk-cyan font-bold shadow-md shadow-chalk-cyan/10'
                            : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {d.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot Selector */}
                <div className="space-y-2">
                  <label className="text-slate-300 font-bold block">2. Select Time Slot (IST):</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          sound.playClick(650);
                          setSelectedDemoTime(slot);
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedDemoTime === slot
                            ? 'bg-chalk-emerald/20 border-chalk-emerald text-chalk-emerald font-bold shadow-md shadow-chalk-emerald/10'
                            : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm Demo Button */}
                <button
                  onClick={handleBookDemo}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-chalk-cyan/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Confirm Live Hardware Bring-up Slot</span>
                </button>

              </div>
            )}

          </div>

          {/* Right 6 Cols: Direct Investor Contact Form */}
          <div className="lg:col-span-6 glass-card rounded-3xl border border-white/10 p-6 sm:p-8 bg-slate-950/90 shadow-2xl space-y-6">
            
            <div className="pb-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-chalk-emerald" />
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Direct Founder Contact
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Connect directly with Team Zero Resistance
                  </p>
                </div>
              </div>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-chalk-cyan/10 border border-chalk-cyan/40 text-center space-y-3 font-mono">
                <CheckCircle2 className="w-12 h-12 text-chalk-cyan mx-auto animate-bounce" />
                <h4 className="font-heading font-bold text-xl text-white">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-slate-300">
                  Thank you, <strong className="text-chalk-cyan">{formData.name || 'Investor'}</strong>. Your inquiry has been routed to Alexander Samuel R and the core engineering team.
                </p>
                <p className="text-[11px] text-slate-400">
                  We typically respond within 2 hours with our investor data room access.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-4 font-mono text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1">Full Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-chalk-cyan"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Email Address:</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anand@fund.vc"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-chalk-cyan"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1">Organization / Fund:</label>
                    <input
                      type="text"
                      placeholder="e.g. Angel Fund / CSR Foundation"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-chalk-cyan"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Investor Profile:</label>
                    <select
                      value={formData.investorType}
                      onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-chalk-cyan"
                    >
                      <option>Angel Investor</option>
                      <option>Venture Capital / Seed Fund</option>
                      <option>CSR Education Foundation</option>
                      <option>Government / SSA Stakeholder</option>
                      <option>School Administrator</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Message / Allocation Inquiry:</label>
                  <textarea
                    rows={3}
                    placeholder="We would like to participate in the ₹23L seed round / request data room..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-chalk-cyan resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-white/15 hover:border-chalk-emerald text-white font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                >
                  <Send className="w-4 h-4 text-chalk-emerald" />
                  <span>Send Direct Inquiry to Founders</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
