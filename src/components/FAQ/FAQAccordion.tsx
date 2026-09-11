import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus, HelpCircle, ArrowUpRight, MessageSquareCode } from 'lucide-react';

const faqs = [
  {
    num: '01',
    question: 'What types of digital products and engineering services does Nexora offer?',
    answer: 'Nexora provides end-to-end digital transformation and product engineering services. This spans Custom Cloud-Native Software Development, Mobile App Ecosystems (iOS, Android, React Native, Flutter), Autonomous AI Agents & Generative AI Systems, Enterprise Modernization, Cloud Infrastructure (AWS, Azure, GCP), and Zero-Trust Cybersecurity.'
  },
  {
    num: '02',
    question: 'How does Nexora guarantee intellectual property (IP) and data confidentiality?',
    answer: 'We sign bilateral Non-Disclosure Agreements (NDAs) prior to any technical briefing. 100% of the intellectual property, source code, design files, neural network weights, and documentation generated belong exclusively to you. All development occurs in air-gapped or role-permissioned sandboxes.'
  },
  {
    num: '03',
    question: 'What engagement models do you offer for enterprises and scaleups?',
    answer: 'We provide three flexible engagement models: (1) Dedicated Engineering Pods (cross-functional teams tailored with senior engineers, AI scientists, QA, and Scrum leads); (2) Fixed-Scope Milestone Delivery (ideal for well-defined MVPs and architectural modernizations); and (3) Strategic CTO & Architecture Advisory.'
  },
  {
    num: '04',
    question: 'How quickly can Nexora mobilize a dedicated engineering team?',
    answer: 'For standard technology stacks (React, Node.js, Python, AWS, Swift, Kotlin), we can deploy a dedicated engineering pod in 1 to 2 weeks. For highly specialized deep-tech, custom AI model training, or regulated niche requirements, typical onboarding is 2 to 3 weeks including environment provisioning and compliance alignment.'
  },
  {
    num: '05',
    question: 'How do you ensure high performance, security, and scalability in production?',
    answer: 'We follow strict Twelve-Factor App principles, automated CI/CD with GitOps, continuous SAST/DAST vulnerability scanning, and infrastructure-as-code. Every release is tested against extreme concurrency thresholds, automated chaos engineering scenarios, and SOC 2 / ISO 27001 standards.'
  },
  {
    num: '06',
    question: 'What does your post-launch maintenance, monitoring, and SLA support include?',
    answer: 'Our Managed Operations tier includes 24/7/365 infrastructure monitoring, automated error tracking, sub-15-minute incident response SLAs, monthly performance audits, continuous security patch management, and proactive cloud cost (FinOps) optimization.'
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-nexora-blue/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="layout-container-lg relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-nexora-blue uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p class="mt-4 text-base text-gray-400 font-normal">
            Everything you need to know about our engagement models, security protocols, and engineering lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Sticky Box: Direct Help / Contact */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="p-8 rounded-3xl bg-[#0e121a] border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 p-2.5 flex items-center justify-center text-nexora-blue mb-6">
                <MessageSquareCode className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Didn't find what you were looking for?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 font-normal">
                Our principal solution architects are available for a confidential 30-minute technical discovery session.
              </p>
              
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { source: 'faq-help-card' } }))}
                className="w-full py-3.5 px-4 rounded-xl bg-nexora-blue hover:bg-nexora-blue-hover text-white text-sm font-bold flex items-center justify-center gap-2 shadow-glow-blue transition-all cursor-pointer"
              >
                <span>Ask an Architect Directly</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <div className="text-xs text-gray-400">Guaranteed Response Time</div>
                <div className="text-sm font-bold text-white mt-0.5">Within 4 Business Hours</div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-[#0f131c] border-nexora-blue/50 shadow-glow-blue/10' 
                      : 'bg-[#0a0c10] border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-bold text-nexora-blue px-2.5 py-1 rounded bg-blue-500/10 shrink-0">
                        [ {faq.num} ]
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-nexora-blue text-white' : 'bg-white/5 text-gray-400'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-300 leading-relaxed font-normal border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
