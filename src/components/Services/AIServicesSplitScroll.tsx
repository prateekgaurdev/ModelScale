import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  Activity, 
  Users, 
  Mic, 
  Link2,
  ArrowUpRight
} from 'lucide-react';

interface ServiceDiscipline {
  id: string;
  name: string;
  categoryTitle: string;
  businessApplications: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  offeringsDescription: string;
  link1Text: string;
  link2Text: string;
  featureBannerTitle: string;
  featureHighlights: string[];
}

const aiDisciplines: ServiceDiscipline[] = [
  {
    id: 'linkedin-automater',
    name: 'LinkedIn Post Automater',
    categoryTitle: 'Social Growth Engine',
    businessApplications: [
      {
        title: 'Content Ideation & Generation',
        icon: BrainCircuit,
      },
      {
        title: 'Automated Smart Scheduling',
        icon: Activity,
      },
      {
        title: 'Brand Voice Fine-Tuning',
        icon: Sparkles,
      },
      {
        title: 'Engagement & Analytics Tracking',
        icon: Users,
      },
    ],
    offeringsDescription: 'Scale your professional presence with our {link1}. We build autonomous systems that generate, schedule, and analyze content, ensuring {link2} while maintaining your authentic voice.',
    link1Text: 'AI-driven LinkedIn automation',
    link2Text: 'maximum engagement and reach',
    featureBannerTitle: 'Autonomous Brand Building at Scale',
    featureHighlights: [
      'Context-Aware Content Generation using custom LLMs',
      'Smart Scheduling based on algorithmic audience activity',
      'Automated Comment Engagement & Lead Generation'
    ]
  },
  {
    id: 'ai-voice-agent',
    name: 'AI Voice Calling Agent',
    categoryTitle: 'Conversational Intelligence',
    businessApplications: [
      {
        title: 'Inbound Customer Support',
        icon: Mic,
      },
      {
        title: 'Outbound Lead Generation',
        icon: Activity,
      },
      {
        title: 'Real-Time Sentiment Analysis',
        icon: Sparkles,
      },
      {
        title: 'Instant CRM Data Sync',
        icon: Link2,
      },
    ],
    offeringsDescription: 'Transform customer interactions with our {link1}. Our voice agents handle thousands of concurrent calls with human-like latency, providing {link2} for your sales and support teams.',
    link1Text: 'real-time AI voice solutions',
    link2Text: 'seamless, intelligent conversations',
    featureBannerTitle: 'Human-Parity Voice Interactions',
    featureHighlights: [
      'Sub-500ms Conversational Response Latency',
      'Emotion and Sentiment-Aware Voice Synthesis',
      'Direct Integration with Salesforce, HubSpot & Custom CRMs'
    ]
  }
];

export default function AIServicesSplitScroll() {
  const [activeId, setActiveId] = useState<string>(aiDisciplines[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const threshold = 350;
          let currentActive = aiDisciplines[0].id;
          
          for (let i = aiDisciplines.length - 1; i >= 0; i--) {
            const disc = aiDisciplines[i];
            const el = sectionRefs.current[disc.id];
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= threshold) {
                currentActive = disc.id;
                break;
              }
            }
          }
          setActiveId(currentActive);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // In case Lenis scroll is active on window
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const element = sectionRefs.current[id];
    if (element) {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -120, duration: 0.8 });
      } else {
        const yOffset = -120;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const openContactModal = (source: string) => {
    window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { source } }));
  };

  return (
    <section id="ai-suite" className="py-24 bg-[#0a0a0a] relative border-t border-white/10 text-white">
      
      {/* Background radial accent */}
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-[#FF5B2E]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="layout-container-lg relative z-10">
        
        {/* Main Section Header (Matching Image 2) */}
        <div className="max-w-5xl mb-16 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Scale Smarter With Our Suite of Artificial Intelligence Services
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-4xl">
            Explore our specialized AI services designed to drive profitable innovations and deliver tangible outcomes. Tailored specifically to automate your highest-friction workflows.
          </p>
        </div>

        {/* Split Layout: Pinned Left + Scrolling Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: STICKY / PINNED SIDEBAR ("side ka ruka rhe") */}
          {/* ========================================================= */}
          <div className="lg:col-span-3 lg:sticky lg:top-28 z-20">
            <div className="lg:border-r lg:border-white/10 pr-0 lg:pr-6 space-y-6">
              
              {/* Category Pill Tag */}
              <div>
                <span className="inline-block px-4 py-2 rounded-xl bg-black border border-white/20 text-xs font-bold text-white tracking-wider uppercase shadow-inner">
                  AI Services
                </span>
              </div>

              {/* Vertical Navigation Items */}
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-none [mask-image:linear-gradient(to_right,black_85%,transparent)] lg:[mask-image:none]">
                {aiDisciplines.map((disc) => {
                  const isActive = activeId === disc.id;
                  return (
                    <button
                      key={disc.id}
                      onClick={() => scrollToSection(disc.id)}
                      className={`text-left text-sm sm:text-base font-semibold transition-all duration-300 flex items-center gap-3 py-2.5 px-3.5 rounded-xl cursor-pointer whitespace-nowrap lg:whitespace-normal group ${
                        isActive
                          ? 'text-white font-bold bg-white/5 shadow-sm'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* Active Circle Arrow Indicator (Matching Image 2) */}
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#FF5B2E] text-white shadow-[0_2px_12px_rgba(255,91,46,0.4)] scale-100' 
                          : 'bg-transparent text-transparent opacity-0 -translate-x-2'
                      }`}>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>

                      <span className={`transition-transform duration-300 ${isActive ? 'translate-x-0' : '-translate-x-6 lg:-translate-x-6'}`}>
                        {disc.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sticky Quick CTA Box */}
              <div className="hidden lg:block pt-6 border-t border-white/10">
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
                  <div className="text-xs font-bold text-[#FF5B2E] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Need Custom AI Scope?</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
                    Connect directly with an Enterprise AI Architect for custom feasibility.
                  </p>
                  <button
                    onClick={() => openContactModal('sticky-sidebar-cta')}
                    className="w-full py-2.5 px-3 bg-[#FF5B2E] hover:bg-[#E44A20] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_16px_rgba(255,91,46,0.3)]"
                  >
                    <span>Consult Our AI Experts</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: SCROLLABLE CONTENT ("when scrolling right scroll ho") */}
          {/* ========================================================= */}
          <div className="lg:col-span-9 space-y-24">
            {aiDisciplines.map((disc, idx) => {
              // Helper to render narrative with styled links
              const renderDescription = () => {
                const parts = disc.offeringsDescription.split(/\{link1\}|\{link2\}/);
                return (
                  <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
                    {parts[0]}
                    <a 
                      href="#contact" 
                      onClick={(e) => { e.preventDefault(); openContactModal(disc.name); }}
                      className="wht-link-line font-semibold text-white underline decoration-white decoration-1 underline-offset-4 hover:text-[#FF5B2E] transition-colors cursor-pointer"
                    >
                      {disc.link1Text}
                    </a>
                    {parts[1]}
                    <a 
                      href="#contact" 
                      onClick={(e) => { e.preventDefault(); openContactModal(disc.name); }}
                      className="wht-link-line font-semibold text-white underline decoration-white decoration-1 underline-offset-4 hover:text-[#FF5B2E] transition-colors cursor-pointer"
                    >
                      {disc.link2Text}
                    </a>
                    {parts[2]}
                  </p>
                );
              };

              return (
                <div 
                  key={disc.id}
                  id={disc.id}
                  ref={(el) => (sectionRefs.current[disc.id] = el)}
                  className="scroll-mt-32 p-6 sm:p-10 rounded-3xl bg-[#0e1017] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl"
                >
                  
                  {/* Category Section Header (Matching Image 2) */}
                  <div className="mb-8">
                    <div className="text-sm font-bold text-[#FF5B2E] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF5B2E]" />
                      <span>{disc.name}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {disc.categoryTitle}
                    </h3>
                  </div>

                  {/* 4 Cards Grid (Matching Image 2 exactly) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {disc.businessApplications.map((app, appIdx) => {
                      const IconComp = app.icon;
                      return (
                        <div
                          key={appIdx}
                          className="p-5 sm:p-6 rounded-2xl bg-[#141721] border border-white/5 hover:border-[#FF5B2E]/40 transition-all duration-300 flex flex-col justify-between min-h-[170px] group hover:-translate-y-1"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-[#FF5B2E] group-hover:text-white transition-colors">
                            <IconComp className="w-5 h-5" />
                          </div>

                          <h4 className="text-sm font-semibold text-white leading-snug group-hover:text-white transition-colors">
                            {app.title}
                          </h4>
                        </div>
                      );
                    })}
                  </div>

                  {/* // Our Offerings Sub-Section (Matching Image 2) */}
                  <div className="pt-8 border-t border-white/10">
                    <div className="text-sm font-mono font-bold text-white mb-3">
                      // Our Offerings
                    </div>
                    {renderDescription()}
                  </div>

                  {/* Feature Highlights Banner */}
                  <div className="mt-8 p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <h5 className="text-sm font-bold text-white mb-2">
                        {disc.featureBannerTitle}
                      </h5>
                      <ul className="space-y-1.5 text-xs text-gray-400">
                        {disc.featureHighlights.map((hl, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B2E]" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => openContactModal(disc.name)}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-[#FF5B2E] text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
                    >
                      <span>Consult on {disc.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
