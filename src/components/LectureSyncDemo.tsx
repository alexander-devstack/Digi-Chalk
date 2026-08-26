import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw, 
  Globe2, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  Mic,
  Languages,
  Download
} from 'lucide-react';
import { LECTURE_SAMPLES } from '../data/lectureSamples';
import { sound } from '../utils/sound';

export const LectureSyncDemo: React.FC = () => {
  const [activeLectureIndex, setActiveLectureIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'ta' | 'te' | 'kn'>('en');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [activeTab, setActiveTab] = useState<'notes' | 'equations' | 'quiz'>('notes');

  const lecture = LECTURE_SAMPLES[activeLectureIndex];

  // Playback timer simulation
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= 25) {
            setIsPlaying(false);
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    sound.playClick(isPlaying ? 600 : 900);
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    sound.playClick(500);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Translations for summary
  const translations: { [lang: string]: { summary: string; title: string; prompt: string } } = {
    en: {
      title: 'Class 11 Physics: Projectile Motion & Parabolic Trajectory',
      summary: 'Comprehensive analysis of 2D projectile motion decomposing velocity vectors into independent horizontal (x) and vertical (y) components under uniform gravitational acceleration g = 9.8 m/s².',
      prompt: 'Real-time teacher blackboard strokes synchronized with classroom mic.',
    },
    hi: {
      title: 'कक्षा 11 भौतिकी: प्रक्षेप्य गति और परवलयिक प्रक्षेपवक्र',
      summary: 'समान गुरुत्वाकर्षण त्वरण g = 9.8 m/s² के तहत वेग वैक्टर को स्वतंत्र क्षैतिज (x) और ऊर्ध्वाधर (y) घटकों में विघटित करने वाली 2D प्रक्षेप्य गति का व्यापक विश्लेषण।',
      prompt: 'कक्षा के माइक्रोफ़ोन के साथ वास्तविक समय के शिक्षक ब्लैकबोर्ड स्ट्रोक।',
    },
    ta: {
      title: 'வகுப்பு 11 இயற்பியல்: எறிபொருள் இயக்கம் மற்றும் பரவளையப் பாதை',
      summary: 'சீரான ஈர்ப்பு முடுக்கம் g = 9.8 m/s² இன் கீழ் திசைவேக திசையன்களை சுயாதீன கிடைமட்ட (x) மற்றும் செங்குத்து (y) கூறுகளாகப் பிரிக்கும் 2D எறிபொருள் இயக்கத்தின் விரிவான பகுப்பாய்வு.',
      prompt: 'வகுப்பறை மைக்குடன் ஒத்திசைக்கப்பட்ட நிகழ்நேர கரும்பலகை குறிப்புகள்.',
    },
    te: {
      title: 'తరగతి 11 భౌతికశాస్త్రం: ప్రొజెక్టైల్ చలనం మరియు పారాబొలిక్ పథం',
      summary: 'ఏకరీతి గురుత్వాకర్షణ త్వరణం g = 9.8 m/s² కింద వేగ వెక్టర్లను స్వతంత్ర క్షితిజ సమాంతర (x) మరియు నిలువు (y) భాగాలుగా విభజించే 2D ప్రొజెక్టైల్ చలనం యొక్క సమగ్ర విశ్లేషణ.',
      prompt: 'తరగతి గది మైక్‌తో సమకాలీకరించబడిన రియల్-టైమ్ టీచర్ బ్లాక్‌బోర్డ్ స్ట్రోక్స్.',
    },
    kn: {
      title: 'ತರಗತಿ 11 ಭೌತಶಾಸ್ತ್ರ: ಪ್ರೊಜೆಕ್ಟೈಲ್ ಚಲನೆ ಮತ್ತು ಪ್ಯಾರಾಬೋಲಿಕ್ ಪಥ',
      summary: 'ಏಕರೂಪದ ಗುರುತ್ವಾಕರ್ಷಣೆಯ ವೇಗವರ್ಧನೆ g = 9.8 m/s² ಅಡಿಯಲ್ಲಿ ವೇಗದ ವೆಕ್ಟರ್‌ಗಳನ್ನು ಸ್ವತಂತ್ರ ಸಮತಲ (x) ಮತ್ತು ಲಂಬ (y) ಘಟಕಗಳಾಗಿ ವಿಭಜಿಸುವ 2D ಪ್ರೊಜೆಕ್ಟೈಲ್ ಚಲನೆಯ ಸಮಗ್ರ ವಿಶ್ಲೇಷಣೆ.',
      prompt: 'ತರಗತಿಯ ಮೈಕ್‌ನೊಂದಿಗೆ ಸಿಂಕ್ರೊನೈಸ್ ಮಾಡಲಾದ ರಿಯಲ್-ಟೈಮ್ ಬ್ಲ್ಯಾಕ್‌ಬೋರ್ಡ್ ಸ್ಟ್ರೋಕ್‌ಗಳು.',
    },
  };

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    sound.playClick(850);
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  return (
    <section id="lecture-sync" className="py-20 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-amber/10 border border-chalk-amber/30 text-xs font-mono text-chalk-amber mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Multi-Modal Audio + Blackboard Synchronization</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Automated Multi-Lingual Lecture Notes
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Digi-Chalk pairs blackboard stroke vectors with teacher speech audio to generate timestamped revision PDFs, formula sheets, and localized regional language summaries for students.
          </p>
        </div>

        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left 6 Cols: Live Synchronized Audio & Blackboard Timeline */}
          <div className="lg:col-span-6 glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/80 shadow-2xl flex flex-col gap-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-chalk-coral animate-pulse" />
                <span className="font-heading font-semibold text-sm text-slate-100">
                  Live Classroom Session Playback
                </span>
              </div>
              <span className="text-[11px] font-mono text-chalk-cyan">
                {lecture.instructor}
              </span>
            </div>

            {/* Playback Controls & Waveform Bar */}
            <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-xl bg-chalk-cyan text-slate-950 flex items-center justify-center font-bold hover:bg-chalk-cyan/90 transition-all shadow-md shadow-chalk-cyan/20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                    title="Reset Timeline"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-chalk-emerald">
                    00:{currentTime.toString().padStart(2, '0')} / 00:25
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">Audio + Vector Sync</div>
                </div>
              </div>

              {/* Synthetic Audio Waveform Bars */}
              <div className="flex items-center gap-1 h-8 px-2 bg-slate-950/80 rounded-lg overflow-hidden">
                {Array.from({ length: 32 }, (_, i) => {
                  const isActive = isPlaying;
                  const heightPercent = isActive ? 20 + Math.sin(i * 0.6 + currentTime) * 60 + Math.random() * 20 : 15;
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-chalk-cyan to-chalk-emerald rounded-full transition-all duration-100"
                      style={{ height: `${Math.max(10, Math.min(100, heightPercent))}%` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Real-Time Synchronized Classroom Dialogue Feed */}
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {lecture.transcriptLines.map((line, idx) => {
                const isCurrent = currentTime >= line.time && (idx === lecture.transcriptLines.length - 1 || currentTime < lecture.transcriptLines[idx + 1].time);
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-slate-900 border-chalk-cyan/50 shadow-md shadow-chalk-cyan/10'
                        : 'bg-slate-900/40 border-white/5 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={line.speaker === 'Teacher' ? 'text-chalk-cyan font-bold' : 'text-chalk-amber'}>
                        {line.speaker}
                      </span>
                      <span className="text-slate-400">00:{line.time.toString().padStart(2, '0')}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {line.text}
                    </p>
                    <div className="mt-1.5 text-[10px] font-mono text-chalk-emerald flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-chalk-emerald"></span>
                      <span>Board Action: {line.action}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right 6 Cols: AI Generated Study Summary & Regional Translation */}
          <div className="lg:col-span-6 glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/80 shadow-2xl flex flex-col gap-4">
            
            {/* Header with Language Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-chalk-emerald" />
                <span className="font-heading font-semibold text-sm text-slate-100">
                  Multilingual AI Revision Notes
                </span>
              </div>

              {/* Regional Language Switcher */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10 text-xs font-mono">
                {[
                  { code: 'en', name: 'EN' },
                  { code: 'hi', name: 'हिंदी' },
                  { code: 'ta', name: 'தமிழ்' },
                  { code: 'te', name: 'తెలుగు' },
                  { code: 'kn', name: 'ಕನ್ನಡ' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      sound.playClick(750);
                      setSelectedLanguage(l.code as any);
                    }}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      selectedLanguage === l.code
                        ? 'bg-chalk-emerald/20 text-chalk-emerald font-bold border border-chalk-emerald/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Note Sub-Tabs */}
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs font-mono">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'notes' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Key Takeaways
              </button>
              <button
                onClick={() => setActiveTab('equations')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'equations' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Formulas
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'quiz' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Quick Quiz
              </button>
            </div>

            {/* Tab 1: Key Takeaways & Summary */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
                  <h4 className="font-heading font-bold text-xs text-chalk-cyan mb-1.5">
                    {translations[selectedLanguage]?.title || translations.en.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {translations[selectedLanguage]?.summary || translations.en.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Structured Key Points:
                  </h5>
                  <ul className="space-y-1.5">
                    {lecture.generatedNotes.keyPoints.map((point, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-chalk-emerald shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Extracted LaTeX Formulas */}
            {activeTab === 'equations' && (
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-slate-400">
                  Automated Math Extraction from Slate:
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {lecture.generatedNotes.equations.map((eq, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900 border border-chalk-cyan/20 font-mono text-sm text-chalk-cyan">
                      {eq}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Interactive Auto-Quiz */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                {lecture.generatedNotes.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="p-3.5 rounded-xl bg-slate-900 border border-white/10 space-y-2.5">
                    <p className="text-xs font-semibold text-white">
                      Q{qIdx + 1}: {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        const isCorrect = isSelected && optIdx === q.answer;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuiz(qIdx, optIdx)}
                            className={`p-2.5 rounded-xl text-left font-mono text-xs border transition-all ${
                              isSelected
                                ? isCorrect
                                  ? 'bg-chalk-emerald/20 border-chalk-emerald text-chalk-emerald font-bold'
                                  : 'bg-chalk-coral/20 border-chalk-coral text-chalk-coral'
                                : 'bg-slate-950/70 border-white/5 text-slate-300 hover:border-white/20'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
