import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from 'motion/react';
import {
  ArrowUpRight,
  Cpu,
  BrainCircuit,
  Sparkles,
  Bot,
  Activity,
  Eye,
  Cloud,
  Database,
  ShieldCheck,
  Radio,
  Glasses,
  Link as LinkIcon,
  Zap,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ExpertiseItem {
  id: string;
  category: 'ai' | 'cloud' | 'security';
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  metric: string;
  stack: string[];
  gradient: string;
  accent: string;
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
    tag: 'CORE AI',
    icon: BrainCircuit,
    desc: 'Production-grade AI systems embedded directly into operational workflows, predictive analytics, and executive decision pipelines.',
    metric: '99.9% Inference SLA',
    stack: ['PyTorch', 'Ray', 'Triton', 'Python'],
    gradient: 'from-[#FF5B2E]/20 via-[#FF5B2E]/5 to-transparent',
    accent: '#FF5B2E',
    href: '#ai-suite',
  },
  {
    id: 'genai',
    category: 'ai',
    title: 'Generative AI & LLMs',
    tag: 'LLMS & RAG',
    icon: Sparkles,
    desc: 'Domain-tuned foundation models, deterministic enterprise RAG pipelines, and context-aware generative workflows.',
    metric: 'Sub-2s Citations',
    stack: ['Llama 3', 'LangChain', 'pgvector', 'vLLM'],
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    accent: '#F59E0B',
    href: '#ai-suite',
  },
  {
    id: 'agentic',
    category: 'ai',
    title: 'Autonomous Agent Swarms',
    tag: 'AGENTIC AI',
    icon: Bot,
    desc: 'Self-correcting supervisor-worker agent networks that plan, execute multi-step tool calls, and maintain strict audit trails.',
    metric: 'Autonomous Loop',
    stack: ['CrewAI', 'Temporal', 'FastAPI', 'Redis'],
    gradient: 'from-orange-500/20 via-orange-500/5 to-transparent',
    accent: '#FB923C',
    href: '#ai-suite',
  },
  {
    id: 'mlops',
    category: 'ai',
    title: 'Predictive ML & MLOps',
    tag: 'ML PIPELINES',
    icon: Activity,
    desc: 'Continuous training pipelines, real-time feature stores, and automated drift detection for mission-critical forecasting.',
    metric: 'Auto-Retraining',
    stack: ['MLflow', 'Kubeflow', 'Kafka', 'Scikit-Learn'],
    gradient: 'from-rose-500/20 via-rose-500/5 to-transparent',
    accent: '#F43F5E',
    href: '#ai-suite',
  },
  {
    id: 'vision',
    category: 'ai',
    title: 'Computer Vision & OCR',
    tag: 'SPATIAL & OCR',
    icon: Eye,
    desc: 'High-throughput visual inspection, multi-lingual OCR extraction, and edge-optimized object tracking systems.',
    metric: '60 FPS Real-time',
    stack: ['YOLOv10', 'TensorRT', 'OpenCV', 'CUDA'],
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    accent: '#3B82F6',
    href: '#ai-suite',
  },
  {
    id: 'cloud',
    category: 'cloud',
    title: 'Cloud-Native Architecture',
    tag: 'MULTI-CLOUD',
    icon: Cloud,
    desc: 'Multi-region AWS, Azure, and GCP architectures with Kubernetes containerization, serverless, and GitOps automation.',
    metric: 'Zero-Downtime Deploy',
    stack: ['AWS', 'Azure', 'Kubernetes', 'Terraform'],
    gradient: 'from-sky-500/20 via-sky-500/5 to-transparent',
    accent: '#0EA5E9',
    href: '#services',
  },
  {
    id: 'data',
    category: 'cloud',
    title: 'Data Lakehouse & Streaming',
    tag: 'BIG DATA',
    icon: Database,
    desc: 'Real-time event streaming architectures, modern medallion lakehouses, and high-concurrency analytical layers.',
    metric: 'Petabyte Scale',
    stack: ['Snowflake', 'Apache Spark', 'dbt', 'Kafka'],
    gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    accent: '#06B6D4',
    href: '#services',
  },
  {
    id: 'devops',
    category: 'cloud',
    title: 'DevOps & Site Reliability',
    tag: 'SRE & CHAOS',
    icon: Zap,
    desc: 'Automated CI/CD release engineering, infrastructure-as-code, chaos engineering, and 24/7 proactive monitoring.',
    metric: '< 15min SLA',
    stack: ['Prometheus', 'ArgoCD', 'Grafana', 'Docker'],
    gradient: 'from-yellow-500/20 via-yellow-500/5 to-transparent',
    accent: '#EAB308',
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
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    accent: '#10B981',
    href: '#compliance',
  },
  {
    id: 'iot',
    category: 'security',
    title: 'IoT & Telemetry Systems',
    tag: 'CONNECTED IOT',
    icon: Radio,
    desc: 'Hardware device firmware, industrial edge telemetry aggregation, and predictive sensor maintenance engines.',
    metric: '100k+ Sensors',
    stack: ['MQTT', 'TimescaleDB', 'Rust', 'WebSockets'],
    gradient: 'from-teal-500/20 via-teal-500/5 to-transparent',
    accent: '#14B8A6',
    href: '#services',
  },
  {
    id: 'spatial',
    category: 'security',
    title: 'Spatial Computing & AR/VR',
    tag: 'VISIONOS / AR',
    icon: Glasses,
    desc: 'Immersive spatial applications, interactive 3D digital twins, and industrial training environments across headsets.',
    metric: 'Sub-12ms Motion',
    stack: ['Unity', 'ARKit', 'WebXR', 'Swift'],
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
    accent: '#8B5CF6',
    href: '#services',
  },
  {
    id: 'blockchain',
    category: 'security',
    title: 'Distributed Ledgers & Web3',
    tag: 'SMART CONTRACTS',
    icon: LinkIcon,
    desc: 'Audited smart contracts, institutional tokenization layers, and high-throughput decentralized ledger infrastructure.',
    metric: 'Formal Verification',
    stack: ['Solidity', 'Rust', 'Polygon', 'Ethers.js'],
    gradient: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
    accent: '#6366F1',
    href: '#services',
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 130,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 10,
      rotationMultiplier: 4,
      scaleReduction: 0.08,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 170,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 160,
      yMultiplier: 16,
      rotationMultiplier: 5.5,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 210,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 220,
    yMultiplier: 20,
    rotationMultiplier: 6.5,
    scaleReduction: 0.09,
  };
};

export default function TechExpertiseMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [windowWidth, setWindowWidth] = useState(1200);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollProgress = useMotionValue(0);
  const startProgress = useRef(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredItems = useMemo(() => {
    return selectedCategory === 'all'
      ? expertiseList
      : expertiseList.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const total = filteredItems.length;
  const config = useMemo(() => getCarouselConfig(windowWidth), [windowWidth]);

  // Reset scroll progress when category changes
  useEffect(() => {
    animate(scrollProgress, 0, {
      type: 'spring',
      stiffness: 250,
      damping: 28,
    });
    setCurrentIndex(0);
  }, [selectedCategory]);

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-2, Math.min(2, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: 'spring',
      stiffness: 220,
      damping: 28,
      mass: 1,
    });

    const normalized = ((target % total) + total) % total;
    setCurrentIndex(normalized);
  };

  const step = (dir: number) => {
    const current = Math.round(scrollProgress.get());
    const target = current + dir;
    animate(scrollProgress, target, {
      type: 'spring',
      stiffness: 220,
      damping: 28,
      mass: 1,
    });
    const normalized = ((target % total) + total) % total;
    setCurrentIndex(normalized);
  };

  return (
    <section id="tech" className="py-24 sm:py-32 bg-[#05070d] relative border-t border-white/[0.08] overflow-hidden text-white select-none">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#FF5B2E]/[0.035] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[450px] bg-blue-600/[0.025] blur-[160px] rounded-full pointer-events-none" />

      <div className="container-xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          
          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#FF5B2E]/30 text-xs font-mono font-medium text-[#FF5B2E] tracking-wider uppercase mb-4 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#FF5B2E]" />
            <span>[ 006 · TECHNICAL CAPABILITIES ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Deep Technical Expertise, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 font-light">
              Supporting Modern Systems
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Architected for massive scale, hardened for zero-trust security, and delivered by principal solution architects.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-[#0b0e17] border border-white/10 max-w-fit mx-auto shadow-2xl">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-full bg-[#FF5B2E] shadow-[0_2px_14px_rgba(255,91,46,0.45)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* 3D Stacked Card Carousel Stage */}
        <div className="relative w-full h-[520px] sm:h-[560px] lg:h-[580px] flex items-center justify-center overflow-visible">
          
          {/* Transparent interactive Drag Surface */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={handleDragStart}
            onDrag={(_, info) => {
              const delta = -info.delta.x / config.sensitivity;
              scrollProgress.set(scrollProgress.get() + delta);
            }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing touch-pan-y"
          />

          {/* Cards Stack */}
          {filteredItems.map((item, i) => (
            <StackedTechCard
              key={item.id}
              item={item}
              index={i}
              total={total}
              progress={scrollProgress}
              config={config}
            />
          ))}

        </div>

        {/* Bottom Carousel Controls & Hint */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto mt-4 px-4 relative z-30">
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => step(-1)}
              aria-label="Previous capability"
              className="p-3 rounded-full bg-[#0d1017] border border-white/10 hover:border-[#FF5B2E]/50 hover:bg-[#FF5B2E]/10 text-white transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => step(1)}
              aria-label="Next capability"
              className="p-3 rounded-full bg-[#0d1017] border border-white/10 hover:border-[#FF5B2E]/50 hover:bg-[#FF5B2E]/10 text-white transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Swipe / Drag gesture indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#FF5B2E] animate-pulse" />
            <span>Drag or swipe cards to navigate</span>
          </div>

          {/* Counter */}
          <div className="text-xs font-mono text-gray-400">
            <span className="text-white font-bold">{currentIndex + 1}</span>
            <span className="mx-1 text-gray-600">/</span>
            <span>{total}</span>
          </div>

        </div>

      </div>
    </section>
  );
}

interface StackedCardProps {
  item: ExpertiseItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

const StackedTechCard = ({ item, index, total, progress, config }: StackedCardProps) => {
  const Icon = item.icon;

  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  // Front card (1.0) & immediate 2 side cards (0.88) are clear and sharp.
  // The 2 cards behind them (0.28) are very faded in the background.
  // All remaining cards (|offset| >= 2.2) are completely hidden (0).
  const opacity = useTransform(
    offset,
    [-2.5, -2.2, -2, -1, 0, 1, 2, 2.2, 2.5],
    [0, 0, 0.28, 0.88, 1, 0.88, 0.28, 0, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

  const dimOverlay = useTransform(
    offset,
    [-2, -1, 0, 1, 2],
    [0.65, 0.12, 0, 0.12, 0.65],
  );

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "absolute rounded-3xl overflow-hidden bg-[#0a0d16] border border-white/[0.12] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] group pointer-events-none",
        "w-[300px] h-[450px] sm:w-[350px] sm:h-[480px] lg:w-[380px] lg:h-[510px] p-6 sm:p-7 flex flex-col justify-between"
      )}
    >
      {/* Background Gradient Mesh */}
      <div className={cn("absolute inset-0 bg-gradient-to-b opacity-40 pointer-events-none", item.gradient)} />
      
      {/* Subtle top light highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Dim overlay for non-active background cards */}
      <motion.div
        style={{ opacity: dimOverlay }}
        className="absolute inset-0 bg-black pointer-events-none z-10"
      />

      {/* Card Header */}
      <div className="relative z-20">
        
        {/* Top bar: Icon + Badge + Arrow */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#FF5B2E] shadow-inner">
            <Icon className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-2">
            <Badge className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-gray-300 font-mono text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md">
              {item.tag}
            </Badge>
            <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-3 drop-shadow-sm">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
          {item.desc}
        </p>

      </div>

      {/* Card Footer: Tech Stack & Metric */}
      <div className="relative z-20 pt-4 border-t border-white/[0.08]">
        
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-300 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Live Metric indicator */}
        <div className="flex items-center justify-between text-xs font-mono pt-1">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span>{item.metric}</span>
          </span>
          <span className="text-[11px] uppercase text-[#FF5B2E] font-semibold flex items-center gap-0.5">
            <span>Explore</span>
            <span>→</span>
          </span>
        </div>

      </div>

    </motion.div>
  );
};
