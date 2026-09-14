import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Sparkles, 
  BrainCircuit, 
  Cpu, 
  Bot, 
  Activity, 
  Eye, 
  Cloud, 
  Database, 
  ShieldCheck, 
  Radio, 
  Glasses, 
  Link, 
  Zap
} from 'lucide-react';

interface ExpertiseItem {
  id: string;
  category: 'ai' | 'cloud' | 'security';
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  metric: string;
  stack: string[];
  href: string;
}

const categories = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'ai', label: 'AI & Autonomous Agents' },
  { id: 'cloud', label: 'Cloud & Data Platform' },
  { id: 'security', label: 'Security & Deep Tech' },
];

const expertiseList: ExpertiseItem[] = [
  {
    id: 'ai-core',
    category: 'ai',
    title: 'Enterprise AI & Automation',
    tag: 'Core AI',
    icon: BrainCircuit,
    desc: 'Production-grade AI systems embedded directly into operational workflows, predictive analytics, and executive decision pipelines.',
    metric: '99.9% Inference SLA',
    stack: ['PyTorch', 'Ray', 'Triton', 'Python'],
    href: '#ai-suite',
  },
  {
    id: 'genai',
    category: 'ai',
    title: 'Generative AI & LLMs',
    tag: 'LLMs & RAG',
    icon: Sparkles,
    desc: 'Domain-tuned foundation models, deterministic enterprise RAG pipelines, and context-aware generative workflows.',
    metric: 'Sub-2s Citations',
    stack: ['Llama 3', 'LangChain', 'pgvector', 'vLLM'],
    href: '#ai-suite',
  },
  {
    id: 'agentic',
    category: 'ai',
    title: 'Autonomous Agent Swarms',
    tag: 'Agentic AI',
    icon: Bot,
    desc: 'Self-correcting supervisor-worker agent networks that plan, execute multi-step tool calls, and maintain strict audit trails.',
    metric: 'Autonomous Loop',
    stack: ['CrewAI', 'Temporal', 'FastAPI', 'Redis'],
    href: '#ai-suite',
  },
  {
    id: 'mlops',
    category: 'ai',
    title: 'Predictive ML & MLOps',
    tag: 'ML Pipelines',
    icon: Activity,
    desc: 'Continuous training pipelines, real-time feature stores, and automated drift detection for mission-critical forecasting.',
    metric: 'Auto-Retraining',
    stack: ['MLflow', 'Kubeflow', 'Kafka', 'Scikit-Learn'],
    href: '#ai-suite',
  },
  {
    id: 'vision',
    category: 'ai',
    title: 'Computer Vision & OCR',
    tag: 'Spatial & OCR',
    icon: Eye,
    desc: 'High-throughput visual inspection, multi-lingual OCR extraction, and edge-optimized object tracking systems.',
    metric: '60 FPS Real-time',
    stack: ['YOLOv10', 'TensorRT', 'OpenCV', 'CUDA'],
    href: '#ai-suite',
  },
  {
    id: 'cloud',
    category: 'cloud',
    title: 'Cloud-Native Architecture',
    tag: 'Multi-Cloud',
    icon: Cloud,
    desc: 'Multi-region AWS, Azure, and GCP architectures with Kubernetes containerization, serverless, and GitOps automation.',
    metric: 'Zero-Downtime Deploy',
    stack: ['AWS', 'Azure', 'Kubernetes', 'Terraform'],
    href: '#services',
  },
  {
    id: 'data',
    category: 'cloud',
    title: 'Data Lakehouse & Streaming',
    tag: 'Big Data',
    icon: Database,
    desc: 'Real-time event streaming architectures, modern medallion lakehouses, and high-concurrency analytical layers.',
    metric: 'Petabyte Scale',
    stack: ['Snowflake', 'Apache Spark', 'dbt', 'Kafka'],
    href: '#services',
  },
  {
    id: 'devops',
    category: 'cloud',
    title: 'DevOps & Site Reliability',
    tag: 'SRE & Chaos',
    icon: Zap,
    desc: 'Automated CI/CD release engineering, infrastructure-as-code, chaos engineering, and 24/7 proactive monitoring.',
    metric: '< 15min SLA',
    stack: ['Prometheus', 'ArgoCD', 'Grafana', 'Docker'],
    href: '#services',
  },
  {
    id: 'cyber',
    category: 'security',
    title: 'Zero-Trust Cybersecurity',
    tag: 'SOC 2 & HIPAA',
    icon: ShieldCheck,
    desc: 'SOC 2 Type II controls, automated penetration testing, role-permissioned sandboxes, and HIPAA/GDPR governance.',
    metric: 'SOC 2 Type II',
    stack: ['HashiCorp Vault', 'Wazuh', 'Trivy', 'OAuth2'],
    href: '#compliance',
  },
  {
    id: 'iot',
    category: 'security',
    title: 'IoT & Telemetry Systems',
    tag: 'Connected IoT',
    icon: Radio,
    desc: 'Hardware device firmware, industrial edge telemetry aggregation, and predictive sensor maintenance engines.',
    metric: '100k+ Sensors',
    stack: ['MQTT', 'TimescaleDB', 'Rust', 'WebSockets'],
    href: '#services',
  },
  {
    id: 'spatial',
    category: 'security',
    title: 'Spatial Computing & AR/VR',
    tag: 'VisionOS & ARKit',
    icon: Glasses,
    desc: 'Immersive spatial applications, interactive 3D digital twins, and industrial training environments across headsets.',
    metric: 'Sub-12ms Motion',
    stack: ['Unity', 'ARKit', 'WebXR', 'Swift'],
    href: '#services',
  },
  {
    id: 'blockchain',
    category: 'security',
    title: 'Distributed Ledgers & Web3',
    tag: 'Smart Contracts',
    icon: Link,
    desc: 'Audited smart contracts, institutional tokenization layers, and high-throughput decentralized ledger infrastructure.',
    metric: 'Formal Verification',
    stack: ['Solidity', 'Rust', 'Polygon', 'Ethers.js'],
    href: '#services',
  },
];

export default function TechExpertiseMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking spotlight for 21st.dev spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const filteredItems = selectedCategory === 'all'
    ? expertiseList
    : expertiseList.filter((item) => item.category === selectedCategory);

  return (
    <section id="tech" className="py-24 sm:py-32 bg-[#05060a] relative border-t border-white/[0.08] overflow-hidden text-white">
      
      {/* Ambient background glow mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FF5B2E]/[0.04] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-blue-600/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="container-xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-medium text-[#FF5B2E] tracking-wider uppercase mb-4 shadow-sm backdrop-blur-sm">
            <Cpu className="w-3.5 h-3.5 text-[#FF5B2E]" />
            <span>[ 006 · Technical Capabilities ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Deep Technical Expertise,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 font-light">
              Supporting Modern Systems
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Architected for massive scale, hardened for zero-trust security, and delivered by principal solution architects.
          </p>

          {/* 21st.dev Animated Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#0e121a] border border-white/10 max-w-fit mx-auto shadow-2xl">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none ${
                    isSelected ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF5B2E] to-[#E44A20] shadow-[0_2px_12px_rgba(255,91,46,0.35)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* 21st.dev Spotlight Interactive Bento Grid */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 relative group/matrix"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredCard === item.id;

              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 25,
                    delay: idx * 0.02,
                  }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0c0f17]/90 border border-white/[0.08] hover:border-[#FF5B2E]/50 transition-all duration-300 shadow-lg hover:shadow-[0_12px_36px_-10px_rgba(255,91,46,0.22)] overflow-hidden"
                >
                  {/* Dynamic Cursor Spotlight Effect */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                    style={{
                      background:
                        'radial-gradient(350px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255,91,46,0.18), transparent 70%)',
                    }}
                  />

                  {/* Shimmer top border line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5B2E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card Content Top */}
                  <div className="relative z-10">
                    
                    {/* Header Row: Icon + Badge + Arrow */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      
                      {/* Icon container with glow pulse */}
                      <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#FF5B2E] group-hover:bg-[#FF5B2E] group-hover:text-white group-hover:border-[#FF5B2E] group-hover:shadow-[0_0_20px_rgba(255,91,46,0.4)] transition-all duration-300">
                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-gray-400 group-hover:text-white group-hover:border-white/20 transition-colors">
                          {item.tag}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-500 group-hover:text-[#FF5B2E] group-hover:border-[#FF5B2E]/40 group-hover:bg-[#FF5B2E]/10 transition-all duration-300">
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>

                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white group-hover:text-[#FF5B2E] transition-colors duration-200 tracking-tight mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-gray-400 leading-relaxed line-clamp-3 mb-4 font-normal">
                      {item.desc}
                    </p>

                  </div>

                  {/* Card Content Bottom: Tech Stack Pills & Live Metric */}
                  <div className="relative z-10 pt-3 border-t border-white/[0.06]">
                    
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-gray-400 border border-white/[0.05] group-hover:border-[#FF5B2E]/20 group-hover:text-gray-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Live Metric / Capability badge */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-1">
                      <span className="flex items-center gap-1.5 text-gray-400 group-hover:text-emerald-400 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                        <span>{item.metric}</span>
                      </span>
                      <span className="text-[10px] uppercase text-[#FF5B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-semibold flex items-center gap-0.5">
                        <span>Explore</span>
                        <span>→</span>
                      </span>
                    </div>

                  </div>

                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}