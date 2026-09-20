import React from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Cpu, 
  Layers, 
  Code, 
  Compass,
  ExternalLink
} from 'lucide-react';
import { sound } from '../utils/sound';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alexander Samuel R',
      role: 'Founder & CTO',
      affiliation: 'Sri Ramakrishna Engineering College (EEE)',
      expertise: 'ESP32-C3 firmware architecture, KiCad multi-layer PCB design, TDOA tracking logic, and lead patent author.',
      email: 'alexandersamuel2310@gmail.com',
      phone: '+91 63620 58595',
      linkedin: 'https://linkedin.com/in/alexandersamuel2006',
      badge: 'Patent Author',
      icon: Cpu,
    },
    {
      name: 'Mithra Karthikeyan',
      role: 'CEO',
      affiliation: 'Sri Ramakrishna Engineering College (IT)',
      expertise: 'Edge MobileNet diagram beautification, Cloud-ML Early Warning System (EWS), and SSA/StartupTN partnership strategy.',
      badge: 'AI & Strategy Lead',
      icon: Code,
    },
    {
      name: 'Bhargavan Balaji',
      role: 'Co-Founder and CPO',
      affiliation: 'Sri Ramakrishna Engineering College (EEE)',
      expertise: 'Power system topologies, transducer excitation drive circuits (MT3608 + IR2104), analog front-end verification, and bench testing.',
      badge: 'Hardware Lead',
      icon: Layers,
    },
    {
      name: 'Kaniska Sri S',
      role: 'CFO',
      affiliation: 'Sri Ramakrishna Engineering College (EEE)',
      expertise: 'Financial modeling, budget allocation, ergonomic chalk holder mechanics, dual alignment wedges, and physical chassis prototyping.',
      badge: 'CFO & Product Design',
      icon: Compass,
    },
  ];

  return (
    <section id="team" className="py-20 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-amber/10 border border-chalk-amber/30 text-xs font-mono text-chalk-amber mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Team Zero Resistance & Institutional Credentials</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            The Engineers Behind Digi-Chalk
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Incubated and developed across the Electrical and Electronics Engineering (EEE) and Information Technology (IT) departments at <strong className="text-white">Sri Ramakrishna Engineering College (SREC), Coimbatore</strong>.
          </p>
        </div>

        {/* Institutional Backing Strip */}
        <div className="slate-card p-5 sm:p-6 border border-white/10 bg-slate-900/80 shadow-2xl mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-950 border border-chalk-cyan/30 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-chalk-cyan" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">
                Sri Ramakrishna Engineering College (SREC), Coimbatore
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Autonomous Institution • Affiliated to Anna University • Accredited by NAAC 'A+'
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <span className="px-3 py-1 rounded-lg bg-slate-950 border border-white/10 text-chalk-emerald font-bold">
              EEE & IT Depts
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-950 border border-white/10 text-chalk-cyan font-bold">
              StartupTN Supported
            </span>
          </div>
        </div>

        {/* 4 Team Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member) => {
            const Icon = member.icon;
            return (
              <div
                key={member.name}
                className="slate-card p-6 border border-white/10 bg-slate-900/80 shadow-xl flex flex-col justify-between hover:border-chalk-cyan/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-chalk-cyan" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-lg text-white">
                          {member.name}
                        </h4>
                        <div className="text-xs font-mono text-chalk-cyan">
                          {member.role}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chalk-cyan/10 text-chalk-cyan border border-chalk-cyan/30 font-bold shrink-0">
                      {member.badge}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                    <span>{member.affiliation}</span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-white/5 mb-4">
                    {member.expertise}
                  </p>
                </div>

                {/* Contact & Links */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-slate-400">
                  {member.email ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-chalk-cyan transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{member.email}</span>
                      </a>
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="hover:text-chalk-emerald transition-colors flex items-center gap-1 text-[11px]"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{member.phone}</span>
                        </a>
                      )}
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500">Coimbatore, Tamil Nadu</span>
                  )}

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 border border-white/10 text-chalk-cyan hover:text-white transition-all flex items-center gap-1 text-xs"
                      title="LinkedIn Profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="text-[11px]">LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
