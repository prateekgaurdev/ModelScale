import React from 'react';
import { MagicCard } from '../magicui/MagicCard';
import { MessageSquareShare, Mic, ArrowUpRight, Sparkles, BrainCircuit, Activity, Users, Headset, Link2 } from 'lucide-react';

const services = [
  {
    id: 'linkedin-automater',
    title: 'LinkedIn Post Automater',
    tag: 'Social Growth Engine',
    icon: MessageSquareShare,
    description: 'Scale your professional presence with our AI-driven LinkedIn automation. We build autonomous systems that generate, schedule, and analyze content, ensuring maximum engagement while maintaining your authentic voice.',
    features: [
      { name: 'Context-Aware Content Generation', icon: BrainCircuit },
      { name: 'Algorithmic Smart Scheduling', icon: Activity },
      { name: 'Automated Lead Engagement', icon: Users }
    ]
  },
  {
    id: 'ai-voice-agent',
    title: 'AI Voice Calling Agent',
    tag: 'Conversational Intelligence',
    icon: Mic,
    description: 'Transform customer interactions with our real-time AI voice solutions. Handle thousands of concurrent calls with human-like latency, providing seamless, intelligent conversations for your sales and support teams.',
    features: [
      { name: 'Sub-500ms Response Latency', icon: Activity },
      { name: 'Emotion & Sentiment Synthesis', icon: Sparkles },
      { name: 'Direct CRM Integration', icon: Link2 }
    ]
  }
];

export default function ServicesBento() {
  return (
    <section id="services" className="py-32 bg-zinc-50 relative overflow-hidden">
      <div className="container-xl relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <h2 className="text-headline text-zinc-950 mb-6">
            Scale Smarter With Our Suite of <br/>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Artificial Intelligence Services
            </span>
          </h2>
          <p className="text-lead text-zinc-500">
            Explore our specialized AI services designed to drive profitable innovations and deliver tangible outcomes. Tailored specifically to automate your highest-friction workflows.
          </p>
        </div>

        {/* Bento Grid (2 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <MagicCard 
                key={svc.id}
                className="flex-col p-8 sm:p-10 cursor-pointer"
                gradientColor="rgba(79, 70, 229, 0.1)"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-primary shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-600 uppercase tracking-wider">
                      {svc.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-zinc-950 mb-4">{svc.title}</h3>
                  <p className="text-zinc-500 leading-relaxed mb-8">
                    {svc.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mt-auto pt-8 border-t border-zinc-100">
                    {svc.features.map((feat, idx) => {
                      const FIcon = feat.icon;
                      return (
                        <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
                          <div className="p-1.5 rounded-md bg-indigo-50 text-primary">
                            <FIcon className="w-4 h-4" />
                          </div>
                          {feat.name}
                        </li>
                      );
                    })}
                  </ul>

                  {/* Action */}
                  <div className="mt-10">
                    <button className="flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors group">
                      Explore Solution 
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </MagicCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
