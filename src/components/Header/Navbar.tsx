import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUpRight, Menu, X, BrainCircuit, Code2, Cloud, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';

const navItems = [
  { id: 'inventivai', label: 'ModelScaleAI' },
  { id: 'about',     label: 'About'     },
  { id: 'services',  label: 'Services'  },
  { id: 'industries',label: 'Industries'},
  { id: 'portfolio', label: 'Portfolio', href: '#case-studies', noDropdown: true },
  { id: 'resources', label: 'Resources', href: '#faq',          noDropdown: true },
];

const aiServices = [
  'AI Consulting', 'AI Development', 'Generative AI Consulting',
  'Generative AI Development', 'Machine Learning', 'Computer Vision',
  'AI Agents', 'AI Copilot Development', 'RPA Development',
];

const serviceCategories = [
  {
    icon: Code2,
    title: 'Product Engineering',
    items: ['Custom Software Dev', 'iOS & Android Apps', 'PWA Development', 'Microservices & APIs'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    items: ['AWS / Azure / GCP', 'Kubernetes Orchestration', 'CI/CD & GitOps', 'FinOps & Cost Optimization'],
  },
  {
    icon: ShieldCheck,
    title: 'Advisory & Security',
    items: ['Zero-Trust Architecture', 'SOC 2 & HIPAA', 'Dedicated Eng. Pods', 'CTO Advisory'],
  },
];

const industries = [
  { name: 'FinTech & Banking',      desc: 'Core banking & secure payments' },
  { name: 'Healthcare & MedTech',   desc: 'HIPAA platforms & AI diagnostics' },
  { name: 'eCommerce & Retail',     desc: 'Omnichannel commerce & logistics' },
  { name: 'Aviation & Travel',      desc: 'Flight booking & passenger AI' },
  { name: 'Automotive & IoT',       desc: 'Connected fleet & telemetry' },
  { name: 'EdTech & Learning',      desc: 'LMS & interactive education' },
];

export default function Navbar() {
  const [open, setOpen]     = useState<string | null>(null);
  const [aiTab, setAiTab]   = useState<'solutions' | 'hub'>('solutions');
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const consult = (src: string) => {
    window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { source: src } }));
    setMobile(false);
  };

  return (
    <>
      
      <header
        className={`fixed inset-x-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'top-0 bg-[#05060a] border-b border-white/[0.08] py-3 shadow-[0_4px_40px_rgba(0,0,0,0.8)]'
            : 'top-0 bg-[#05060a]/85 backdrop-blur-xl border-b border-white/[0.05] py-4'
        }`}
      >
        <div className="container-xl flex items-center justify-between gap-4">

        {/* ---- Logo ---- */}
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <rect x="2" y="2" width="18" height="18" rx="6" fill="#FF5B2E" />
            <rect x="12" y="12" width="18" height="18" rx="6" fill="#FFFFFF" fillOpacity="0.9" />
          </svg>
          <span className="text-[1.35rem] font-bold tracking-tight text-white leading-none">
            ModelScale
          </span>
        </a>

        {/* ---- Desktop nav ---- */}
        <nav className="hidden xl:flex items-center">
          {navItems.map((item, idx) => (
            <React.Fragment key={item.id}>

              {/* Separator dot between items */}
              {idx > 0 && !item.noDropdown && (
                <span className="mx-1 w-px h-4 bg-white/10 self-center block" />
              )}

              {item.noDropdown ? (
                <a
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
                >
                  {item.label}
                </a>
              ) : (
                <div
                  className="relative"
                  onMouseEnter={() => setOpen(item.id)}
                  onMouseLeave={() => setOpen(null)}
                >
                  <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    open === item.id
                      ? 'text-white bg-white/[0.06]'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.04]'
                  }`}>
                    {item.id === 'inventivai' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B2E] mr-1 animate-pulse" />
                    )}
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 ml-0.5 opacity-60 transition-transform duration-200 ${
                      open === item.id ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* ---- ModelScaleAI dropdown ---- */}
                  {item.id === 'inventivai' && open === 'inventivai' && (
                    <DropdownWrapper>
                      <div className="grid grid-cols-[210px_1fr] gap-0 min-w-[820px]">
                        {/* Left: tabs + CTA card */}
                        <div className="border-r border-white/[0.08] p-5 flex flex-col gap-3.5 bg-white/[0.01]">
                          <span className="text-[0.65rem] font-mono font-bold uppercase tracking-wider text-[#FF5B2E] px-1">
                            AI Suite
                          </span>
                          {(['solutions', 'hub'] as const).map((t) => (
                            <button
                              key={t}
                              onClick={() => setAiTab(t)}
                              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                aiTab === t
                                  ? 'bg-[#FF5B2E] text-white shadow-[0_2px_12px_rgba(255,91,46,0.35)]'
                                  : 'text-gray-400 hover:bg-white/[0.06] hover:text-white'
                              }`}
                            >
                              <span>{t === 'solutions' ? 'AI Solutions' : 'Research & Insights'}</span>
                              {t === 'solutions' ? <BrainCircuit className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                            </button>
                          ))}
                          <div className="mt-auto pt-3 border-t border-white/[0.08] p-3.5 rounded-xl bg-gradient-to-br from-[#FF5B2E]/12 via-[#FF5B2E]/[0.03] to-black/40 border border-[#FF5B2E]/20">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#FF5B2E]" />
                              <span className="text-[0.65rem] font-mono font-bold text-[#FF5B2E] uppercase tracking-wide">Enterprise AI</span>
                            </div>
                            <p className="text-[0.72rem] text-gray-300 mb-2.5 leading-snug">
                              Deploy production Agentic RAG in 2 weeks.
                            </p>
                            <button
                              onClick={() => consult('nav-ai-cta')}
                              className="text-[0.75rem] font-bold text-[#FF5B2E] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              Schedule a call <ArrowUpRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Right: solution grid or insights */}
                        <div className="p-5">
                          {aiTab === 'solutions' ? (
                            <div>
                              <span className="text-[0.65rem] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-2 px-3">
                                Available Capabilities
                              </span>
                              <div className="grid grid-cols-3 gap-1.5">
                                {aiServices.map((s) => (
                                  <a
                                    key={s}
                                    href="#ai-suite"
                                    className="block px-3 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all"
                                  >
                                    {s}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <span className="text-[0.65rem] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-2 px-3">
                                Featured Insights
                              </span>
                              {[
                                'Enterprise AI Cost Guide 2026',
                                '30+ Agentic AI Business Ideas Built for Scale',
                                'Deploying LLMs with Zero-Trust in Regulated Industries',
                              ].map((t) => (
                                <a
                                  key={t}
                                  href="#faq"
                                  className="block px-3 py-2.5 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all"
                                >
                                  {t}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </DropdownWrapper>
                  )}

                  {/* ---- About dropdown ---- */}
                  {item.id === 'about' && open === 'about' && (
                    <DropdownWrapper cls="min-w-[220px]">
                      <div className="p-2.5 space-y-0.5">
                        {[
                          ['About ModelScale',      '#services'],
                          ['Leadership & Tech', '#tech'],
                          ['Client Portfolio',  '#case-studies'],
                          ['Testimonials',      '#testimonials'],
                          ['Compliance & Trust','#compliance'],
                          ['Careers & FAQ',     '#faq'],
                        ].map(([label, href]) => (
                          <a key={label} href={href} className="block px-3 py-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all">
                            {label}
                          </a>
                        ))}
                      </div>
                    </DropdownWrapper>
                  )}

                  {/* ---- Services dropdown ---- */}
                  {item.id === 'services' && open === 'services' && (
                    <DropdownWrapper cls="min-w-[700px] -translate-x-1/2 left-1/2">
                      <div className="p-6 grid grid-cols-3 gap-6">
                        {serviceCategories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <div key={cat.title}>
                              <div className="flex items-center gap-2 mb-3">
                                <Icon className="w-3.5 h-3.5 text-[#FF5B2E]" />
                                <span className="text-[0.65rem] font-mono font-bold uppercase tracking-widest text-[#FF5B2E]">
                                  {cat.title}
                                </span>
                              </div>
                              <ul className="space-y-0.5">
                                {cat.items.map((i) => (
                                  <li key={i}>
                                    <a href="#services" className="block px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all">
                                      {i}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </DropdownWrapper>
                  )}

                  {/* ---- Industries dropdown ---- */}
                  {item.id === 'industries' && open === 'industries' && (
                    <DropdownWrapper cls="min-w-[560px] -translate-x-1/2 left-1/2">
                      <div className="p-4 grid grid-cols-2 gap-2">
                        {industries.map((ind) => (
                          <a
                            key={ind.name}
                            href="#case-studies"
                            className="p-3 rounded-xl hover:bg-white/[0.06] transition-all group block"
                          >
                            <div className="text-xs font-bold text-white group-hover:text-[#FF5B2E] transition-colors">
                              {ind.name}
                            </div>
                            <div className="text-[0.7rem] text-gray-400 mt-0.5">{ind.desc}</div>
                          </a>
                        ))}
                      </div>
                    </DropdownWrapper>
                  )}

                </div>
              )}
            </React.Fragment>
          ))}

          {/* Explore Digital — ghost link like appinventiv */}
          <span className="mx-3 w-px h-4 bg-white/10 self-center" />
          <a
            href="#services"
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 hidden 2xl:block"
          >
            Explore ModelScale Digital
          </a>
        </nav>

        {/* ---- CTA ---- */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => consult('nav-contact')}
            className="bg-[#FF5B2E] text-white px-5 py-2 rounded-full font-semibold flex items-center justify-center gap-2 text-sm transition-all hover:bg-[#E44A20] shadow-[0_4px_14px_rgba(255,91,46,0.3)]"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            <span>Contact Us</span>
          </button>
        </div>

        {/* ---- Mobile hamburger ---- */}
        <button
          onClick={() => setMobile(!mobile)}
          aria-label="Menu"
          className="xl:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          {mobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* ---- Mobile drawer ---- */}
      {mobile && (
        <div className="xl:hidden fixed inset-x-0 top-full max-h-[80dvh] overflow-y-auto bg-[#060810]/98 border-b border-white/[0.07] backdrop-blur-2xl shadow-2xl">
          <div className="container-xl py-6 space-y-1">
            {[
              ['ModelScaleAI Suite', '#ai-suite'],
              ['Services', '#services'],
              ['Tech Capabilities', '#tech'],
              ['Portfolio', '#case-studies'],
              ['Pricing', '#pricing'],
              ['Resources & FAQ', '#faq'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobile(false)}
                className="block px-4 py-3 rounded-xl text-base font-semibold text-white hover:bg-white/[0.06] transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="pt-4">
              <button
                onClick={() => consult('mobile-drawer')}
                className="bg-[#FF5B2E] text-white px-5 py-2 rounded-full font-semibold flex items-center justify-center gap-2 w-full text-sm mt-2 transition-all hover:bg-[#E44A20] shadow-[0_4px_14px_rgba(255,91,46,0.3)]"
              >
                <span>Contact Us</span>
                <span className="btn-icon ml-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
    </>
  );
}

/* Helper wrapper for dropdown panels */
function DropdownWrapper({
  children,
  cls = '',
}: {
  children: React.ReactNode;
  cls?: string;
}) {
  return (
    <div className={`absolute top-full left-0 pt-2.5 z-[200] ${cls}`}>
      <div
        style={{ background: '#0D0D11' }}
        className="border border-white/[0.1] rounded-2xl shadow-[0_32px_96px_rgba(0,0,0,0.85),0_1px_0_rgba(255,255,255,0.06)_inset] overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}
