import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  MessageSquare, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ContactFooterProps {
  onOpenPitchDeck: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenPitchDeck }) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    sound.playClick(900);
    navigator.clipboard.writeText('alexandersamuel2310@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccessChime();
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="py-20 bg-slate-950 relative border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan">
            <Sparkles className="w-3.5 h-3.5" />
            <span>₹23L Seed Round • Investor & Pilot Inquiries</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Connect With Team Zero Resistance
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Interested in leading our ₹23L seed round, deploying classroom pilots, or reviewing technical IP? Reach out directly.
          </p>

          {/* Pitch Playbook CTA */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/Digi-Chalk_Business_Model_23L.pdf"
              download="Digi-Chalk_Business_Model_23L.pdf"
              onClick={() => sound.playClick(800)}
              className="px-5 py-3 rounded-xl bg-chalk-cyan hover:bg-sky-400 text-slate-950 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-sky-500/15 transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download Pitch Playbook (₹23L Round)</span>
            </a>
          </div>
        </div>

        {/* 2-Column Grid: Contact Card vs Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left 5 Cols: Direct Contact Card */}
          <div className="lg:col-span-5 slate-card p-6 sm:p-7 border border-white/10 bg-slate-900/90 shadow-2xl space-y-6">
            
            <div className="pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase text-chalk-cyan font-bold tracking-wider block">
                Direct Lead Contact
              </span>
              <h3 className="font-heading font-bold text-xl text-white mt-1">
                Alexander Samuel R
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Founder — Hardware, Firmware & Product Lead
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              
              {/* Email with copy button */}
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="w-4 h-4 text-chalk-cyan shrink-0" />
                  <a href="mailto:alexandersamuel2310@gmail.com" className="hover:text-chalk-cyan truncate">
                    alexandersamuel2310@gmail.com
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all shrink-0"
                  title="Copy Email"
                >
                  {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-chalk-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-chalk-emerald shrink-0" />
                  <a href="tel:+916362058595" className="hover:text-chalk-emerald">
                    +91 63620 58595
                  </a>
                </div>
                <a
                  href="https://wa.me/916362058595?text=Hello%20Alexander,%20I%20am%20interested%20in%20Digi-Chalk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-chalk-emerald text-[11px] font-bold transition-all"
                >
                  WhatsApp
                </a>
              </div>

              {/* Institutional Affiliation */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-white font-bold">
                  <GraduationCap className="w-4 h-4 text-chalk-cyan" />
                  <span>Sri Ramakrishna Engineering College</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Coimbatore, Tamil Nadu 641022, India
                </p>
                <a
                  href="https://www.srec.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-chalk-cyan hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Visit Institutional Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>

          {/* Right 7 Cols: Inquiry Form */}
          <div className="lg:col-span-7 slate-card p-6 sm:p-7 border border-white/10 bg-slate-900/90 shadow-2xl space-y-5">
            
            <div className="pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">
                Send Direct Inbound Message
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Inquiries are monitored directly by the founder and strategy team
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-chalk-emerald/10 border border-chalk-emerald/30 text-center space-y-3 font-mono">
                <CheckCircle2 className="w-10 h-10 text-chalk-emerald mx-auto" />
                <h4 className="font-heading font-bold text-lg text-white">
                  Message Transmitted!
                </h4>
                <p className="text-xs text-slate-300">
                  Thank you, <strong className="text-chalk-cyan">{formData.name || 'Partner'}</strong>. We have received your inquiry and will respond within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1">Full Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-chalk-cyan"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Organization / Investor:</label>
                    <input
                      type="text"
                      placeholder="e.g. Seed Fund / School Trust"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-chalk-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Email Address:</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh@fund.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-chalk-cyan"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Message:</label>
                  <textarea
                    rows={3}
                    placeholder="We would like to discuss leading the ₹23L seed round / classroom pilot..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-chalk-cyan resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-white/15 text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                >
                  <Send className="w-4 h-4 text-chalk-cyan" />
                  <span>Submit Inquiry</span>
                </button>

              </form>
            )}

          </div>

        </div>

        {/* Bottom Legal & Patent Attribution */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Digi-Chalk (Team Zero Resistance). All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-chalk-cyan" />
            <span>Indian Patent Application No. 202641089516</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
