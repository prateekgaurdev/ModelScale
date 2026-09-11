import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Bot, 
  Network, 
  Grid3X3, 
  Sparkles, 
  BrainCircuit, 
  Cpu, 
  Database, 
  Eye, 
  Layers, 
  ShieldCheck, 
  ArrowUpRight,
  Workflow,
  Compass,
  FileCheck2,
  Lock
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
    id: 'ai-consulting',
    name: 'AI Consulting',
    categoryTitle: 'Business Applications',
    businessApplications: [
      {
        title: 'Custom Roadmaps Creation',
        icon: MapPin,
      },
      {
        title: 'Identification of AI-Driven Automation Opportunities',
        icon: Bot,
      },
      {
        title: 'AI Governance and Compliance Strategies Creation',
        icon: Network,
      },
      {
        title: 'AI Ethics and Responsible AI Frameworks Implementation',
        icon: Grid3X3,
      },
    ],
    offeringsDescription: 'Leverage our {link1} to uncover new possibilities and craft a roadmap for success. As a leading AI service company, we guide you at every stage of your AI journey, from streamlining operations with intelligent automation to unlocking the transformative {link2} and many more competitive capabilities.',
    link1Text: 'strategic AI consulting services',
    link2Text: 'power of generative AI',
    featureBannerTitle: 'Transforming Strategy into Real Production Output',
    featureHighlights: [
      'Comprehensive Data Readiness & Architecture Assessment',
      'Cost-Benefit & ROI Feasibility Benchmarks',
      'Zero-Trust Risk Mitigation & Compliance Guardrails'
    ]
  },
  {
    id: 'ai-development',
    name: 'AI Development',
    categoryTitle: 'Engineering Capabilities',
    businessApplications: [
      {
        title: 'Custom Deep Learning & Neural Architectures',
        icon: BrainCircuit,
      },
      {
        title: 'High-Throughput Model Training & Optimization',
        icon: Cpu,
      },
      {
        title: 'Enterprise Pipeline & API Integration',
        icon: Database,
      },
      {
        title: 'Edge AI & Embedded Device Deployment',
        icon: Layers,
      },
    ],
    offeringsDescription: 'Our end-to-end {link1} turns theoretical algorithms into robust, production-grade applications. We build custom neural models engineered for high-concurrency environments, ensuring {link2} across your entire core software infrastructure.',
    link1Text: 'custom AI development services',
    link2Text: 'maximum throughput and sub-second latency',
    featureBannerTitle: 'Production-Grade Machine Intelligence',
    featureHighlights: [
      'Distributed Multi-GPU Training Pipelines (PyTorch/TensorRT)',
      'Automated Drift Detection & Continuous Model Retraining',
      'Scalable Containerized Inference on Kubernetes & Serverless'
    ]
  },
  {
    id: 'genai-consulting',
    name: 'Generative AI Consulting',
    categoryTitle: 'Strategic GenAI Focus',
    businessApplications: [
      {
        title: 'Foundation Model Selection & Benchmarking',
        icon: Sparkles,
      },
      {
        title: 'Proprietary IP & Enterprise Data Protection',
        icon: Lock,
      },
      {
        title: 'Token Economics & Cloud Cost Optimization',
        icon: Compass,
      },
      {
        title: 'Safety Guardrails & Hallucination Prevention',
        icon: ShieldCheck,
      },
    ],
    offeringsDescription: 'Maximize the return on your AI investments with our {link1}. We help enterprise leaders select between open-weight models and proprietary APIs, ensuring complete data sovereignty while deploying the {link2} for your specific business domains.',
    link1Text: 'generative AI advisory frameworks',
    link2Text: 'most cost-effective LLM architectures',
    featureBannerTitle: 'Strategic LLM Integration Without Data Risk',
    featureHighlights: [
      'Enterprise LLM Evaluation Rubrics & Accuracy Benchmarking',
      'Air-Gapped Private VPC Deployment Architectures',
      'Strict PII Masking & Semantic Content Filtering'
    ]
  },
  {
    id: 'genai-development',
    name: 'Generative AI Development',
    categoryTitle: 'GenAI Deployments',
    businessApplications: [
      {
        title: 'Enterprise Agentic RAG Knowledge Systems',
        icon: Database,
      },
      {
        title: 'Domain-Specific Fine-Tuning (LoRA/QLoRA)',
        icon: BrainCircuit,
      },
      {
        title: 'Autonomous Multi-Agent Workflow Swarms',
        icon: Bot,
      },
      {
        title: 'Multi-Modal Vision-Language Systems',
        icon: Eye,
      },
    ],
    offeringsDescription: 'We build state-of-the-art {link1} that ingest petabytes of unstructured documents, relational databases, and real-time APIs to produce verifiable, grounded responses. Experience the transformative power of {link2} engineered directly into your enterprise stack.',
    link1Text: 'Agentic RAG & Generative AI solutions',
    link2Text: 'autonomous decision-making systems',
    featureBannerTitle: 'Autonomous Intelligence at Global Scale',
    featureHighlights: [
      'Hybrid Vector + BM25 Semantic Retrieval with Re-ranking',
      'Tool-Calling Agents with Structured JSON Output Enforcement',
      'Verifiable Source Citations with Zero-Hallucination Guarantees'
    ]
  },
  {
    id: 'ml-development',
    name: 'Machine Learning Development',
    categoryTitle: 'Predictive Analytics',
    businessApplications: [
      {
        title: 'Predictive Demand & Revenue Forecasting',
        icon: Workflow,
      },
      {
        title: 'Real-Time Anomaly & Fraud Detection',
        icon: ShieldCheck,
      },
      {
        title: 'Hyper-Personalized Recommendation Engines',
        icon: Sparkles,
      },
      {
        title: 'Automated ETL & Feature Store Engineering',
        icon: Database,
      },
    ],
    offeringsDescription: 'Harness the predictive power of your historical data with our {link1}. We build self-learning algorithms that anticipate customer behavior, optimize supply chains, and eliminate manual processing through {link2}.',
    link1Text: 'enterprise machine learning development',
    link2Text: 'scalable mathematical predictive models',
    featureBannerTitle: 'Precision Forecasting & Automated Operations',
    featureHighlights: [
      'Real-Time Time-Series Analysis & Trend Classification',
      'High-Scale Recommendation Engines for Commerce & Media',
      'Continuous Feature Store Sync with BigQuery & Snowflake'
    ]
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision Development',
    categoryTitle: 'Visual Intelligence',
    businessApplications: [
      {
        title: 'Real-Time Multi-Object Detection & Tracking',
        icon: Eye,
      },
      {
        title: 'Intelligent Document Processing (OCR)',
        icon: FileCheck2,
      },
      {
        title: 'Biometric & Spatial Facial Recognition',
        icon: Lock,
      },
      {
        title: 'Industrial Automated Quality Inspection',
        icon: Cpu,
      },
    ],
    offeringsDescription: 'Empower machines to perceive, analyze, and act upon visual inputs with our {link1}. From automating warehouse defect identification to extracting unstructured invoice data with {link2}, we deliver millisecond-level precision.',
    link1Text: 'computer vision engineering services',
    link2Text: 'deep learning vision-language models',
    featureBannerTitle: 'Sub-Millisecond Spatial Perception',
    featureHighlights: [
      'Edge Camera AI Inference with NVIDIA Jetson & TensorRT',
      'Complex Layout OCR with 99.8% Field Extraction Precision',
      'Automated Video Telemetry Analysis for Fleet & Retail'
    ]
  },
  {
    id: 'ai-agents',
    name: 'AI Agent Development',
    categoryTitle: 'Autonomous Agents',
    businessApplications: [
      {
        title: 'Tool-Using Autonomous Workflow Agents',
        icon: Bot,
      },
      {
        title: 'Self-Correcting Multi-Agent Coordination',
        icon: Workflow,
      },
      {
        title: 'Enterprise API & Database Orchestration',
        icon: Database,
      },
      {
        title: 'Deterministic Guardrails & Sandbox Safety',
        icon: ShieldCheck,
      },
    ],
    offeringsDescription: 'Step into the future of enterprise automation with {link1}. Our autonomous agentic swarms handle multi-step reasoning, execute database queries, recover from failures, and deliver completed workflows with {link2}.',
    link1Text: 'autonomous AI agent development',
    link2Text: 'minimal human intervention and full audit trails',
    featureBannerTitle: 'Multi-Agent Autonomous Orchestration',
    featureHighlights: [
      'LangGraph & CrewAI State Machine Architecture',
      'Durable Execution with Automatic State Checkpointing',
      'Full Observability & Cost Tracking Per Agentic Turn'
    ]
  },
  {
    id: 'ai-copilots',
    name: 'AI Copilot Development',
    categoryTitle: 'Enterprise Copilots',
    businessApplications: [
      {
        title: 'Domain-Specific In-App AI Assistants',
        icon: Sparkles,
      },
      {
        title: 'Context-Aware Customer Support Copilots',
        icon: Bot,
      },
      {
        title: 'Developer Productivity & Code Copilots',
        icon: Cpu,
      },
      {
        title: 'Executive Intelligence & Decision Dashboards',
        icon: BrainCircuit,
      },
    ],
    offeringsDescription: 'Supercharge workforce productivity by embedding custom {link1} directly into your proprietary SaaS products and internal tools. Context-aware assistants empower employees and customers with {link2}.',
    link1Text: 'enterprise AI copilot solutions',
    link2Text: 'instant answers grounded in corporate knowledge',
    featureBannerTitle: 'Tailored Context-Aware In-App Companions',
    featureHighlights: [
      'Zero-Latency WebSocket Streaming UI Integration',
      'Personalized User Memory & Context Retention',
      'Enterprise Role-Based Information Fencing'
    ]
  },
];

export default function AIServicesSplitScroll() {
  const [activeId, setActiveId] = useState<string>(aiDisciplines[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      
      for (let i = aiDisciplines.length - 1; i >= 0; i--) {
        const disc = aiDisciplines[i];
        const el = sectionRefs.current[disc.id];
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveId(disc.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const element = sectionRefs.current[id];
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(y, { immediate: false, force: true });
      } else {
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
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="layout-container-lg relative z-10">
        
        {/* Main Section Header (Matching Image 2) */}
        <div className="max-w-5xl mb-16 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Scale Smarter With Our Suite of Artificial Intelligence Services
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-4xl">
            Explore our comprehensive suite of AI services designed to drive profitable innovations and deliver tangible outcomes. From consulting to development and beyond, our extensive artificial intelligence services are tailored to meet unique business needs in any industry.
          </p>
        </div>

        {/* Split Layout: Pinned Left + Scrolling Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: STICKY / PINNED SIDEBAR ("side ka ruka rhe") */}
          {/* ========================================================= */}
          <div className="lg:col-span-3 lg:sticky lg:top-28 z-20">
            <div className="lg:border-r lg:border-white/10 pr-0 lg:pr-6 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-none">
              
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
                          ? 'bg-nexora-blue text-white shadow-glow-blue scale-100' 
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
                  <div className="text-xs font-bold text-nexora-yellow mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Need Custom AI Scope?</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
                    Connect directly with an Enterprise AI Architect for custom feasibility.
                  </p>
                  <button
                    onClick={() => openContactModal('sticky-sidebar-cta')}
                    className="w-full py-2.5 px-3 bg-nexora-blue hover:bg-nexora-blue-hover text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-glow-blue"
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
                      className="wht-link-line font-semibold text-white underline decoration-white decoration-1 underline-offset-4 hover:text-nexora-blue transition-colors cursor-pointer"
                    >
                      {disc.link1Text}
                    </a>
                    {parts[1]}
                    <a 
                      href="#contact" 
                      onClick={(e) => { e.preventDefault(); openContactModal(disc.name); }}
                      className="wht-link-line font-semibold text-white underline decoration-white decoration-1 underline-offset-4 hover:text-nexora-blue transition-colors cursor-pointer"
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
                    <div className="text-sm font-bold text-nexora-blue uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-nexora-blue" />
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
                          className="p-5 sm:p-6 rounded-2xl bg-[#141721] border border-white/5 hover:border-nexora-blue/40 transition-all duration-300 flex flex-col justify-between min-h-[170px] group hover:-translate-y-1"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-nexora-blue group-hover:text-white transition-colors">
                            <IconComp className="w-5 h-5" />
                          </div>

                          <h4 className="text-sm font-semibold text-white leading-snug group-hover:text-blue-200 transition-colors">
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
                            <span className="w-1.5 h-1.5 rounded-full bg-nexora-blue" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => openContactModal(disc.name)}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-nexora-blue text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
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
