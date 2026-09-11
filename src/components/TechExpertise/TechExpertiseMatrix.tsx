import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const expertise = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    icon: '/assets/images/artificial-intelligence-icon-1.svg',
    desc: 'AI only creates value when it fits into how an organisation actually works. We design and deploy systems that integrate with existing workflows, data infrastructure, and operational constraints.',
    href: '#ai-suite',
  },
  {
    id: 'genai',
    title: 'Generative AI',
    icon: '/assets/images/generative-ai-icon-3.svg',
    desc: 'Generative AI is most useful when it becomes part of everyday work — not a standalone tool. We build production-grade RAG pipelines, LLM fine-tuning, and agentic workflows that reliably deliver.',
    href: '#ai-suite',
  },
  {
    id: 'agentic',
    title: 'Agentic AI',
    icon: '/assets/images/agentic-ai-icon-1.svg',
    desc: 'Autonomous agents that plan, execute, and self-correct across complex multi-step workflows. We architect supervisor-worker swarms with deterministic guardrails and full audit trails.',
    href: '#ai-suite',
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    icon: '/assets/images/artificial-intelligence-icon-1.svg',
    desc: 'From predictive demand forecasting to real-time anomaly detection — we build ML systems that integrate directly into production infrastructure with continuous retraining pipelines.',
    href: '#ai-suite',
  },
  {
    id: 'vision',
    title: 'Computer Vision',
    icon: '/assets/images/computer-vision-icon2.svg',
    desc: 'Real-time object detection, OCR document extraction, biometric recognition, and industrial quality inspection — engineered for edge-deployed and cloud-scale environments.',
    href: '#ai-suite',
  },
  {
    id: 'cloud',
    title: 'Cloud',
    icon: '/assets/images/cloud-icon-3.svg',
    desc: 'Multi-cloud AWS, Azure, and GCP architectures with Kubernetes, serverless, and GitOps automation. FinOps-optimised from day one — no over-provisioning, no cloud bill surprises.',
    href: '#services',
  },
  {
    id: 'data',
    title: 'Data Science & Analytics',
    icon: '/assets/images/data-science-analytics-icon2.svg',
    desc: 'We build data lakes, real-time streaming pipelines, and business intelligence layers that give organisations a single source of truth — from raw events to executive dashboards.',
    href: '#services',
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    icon: '/assets/images/cybersecurity-icon2.svg',
    desc: 'Zero-Trust architecture, penetration testing, SOC 2 compliance automation, and HIPAA/GDPR governance — security embedded in the engineering lifecycle, not bolted on afterwards.',
    href: '#compliance',
  },
  {
    id: 'iot',
    title: 'IoT',
    icon: '/assets/images/ai-data-icon.svg',
    desc: 'From device firmware to cloud telemetry platforms — we connect physical assets to intelligent dashboards, enabling predictive maintenance and real-time operational control.',
    href: '#services',
  },
  {
    id: 'arvr',
    title: 'AR / VR',
    icon: '/assets/images/ar-vr-icon2.svg',
    desc: 'Immersive experiences built for ARKit, ARCore, Meta Quest, and HoloLens. Spatial commerce, training simulations, industrial overlays, and consumer-facing AR applications.',
    href: '#services',
  },
  {
    id: 'blockchain',
    title: 'Blockchain',
    icon: '/assets/images/blockchain-icon2.svg',
    desc: 'Smart contracts, DeFi protocols, NFT platforms, and enterprise tokenisation. We build audited, production-ready decentralised systems on Ethereum, Solana, and Polygon.',
    href: '#services',
  },
];

export default function TechExpertiseMatrix() {
  const [active, setActive] = useState('ai');
  useScrollReveal();

  return (
    <section id="tech" className="tech-section">
      <div className="container-xl">

        {/* Section Header */}
        <div className="tech-header">
          <h2 className="reveal text-headline tech-title">
            <span>Deep Technical Expertise,</span>
            <span> Supporting Modern Systems</span>
          </h2>
        </div>

        {/* Hover-expand grid — 11 cards */}
        <div className="tech-grid">
          {expertise.map((item) => {
            const isActive = item.id === active;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`tech-card reveal ${isActive ? 'tech-card--active' : ''}`}
                onMouseEnter={() => setActive(item.id)}
                onFocus={() => setActive(item.id)}
                aria-label={item.title}
              >
                {/* Header row: icon + title */}
                <div className="tech-card-header">
                  <div className="tech-icon-wrap">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="tech-icon"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                  <h3 className="tech-card-title">{item.title}</h3>
                </div>

                {/* Description — only visible when active */}
                <p className={`tech-card-desc ${isActive ? 'tech-card-desc--visible' : ''}`}>
                  {item.desc}
                </p>
              </a>
            );
          })}
        </div>

      </div>

      <style>{`
        .tech-section {
          background: #000;
          padding: clamp(48px, 6vw, 96px) 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .tech-header {
          max-width: 700px;
          margin: 0 auto clamp(2.5rem, 4vw, 4.5rem);
          text-align: center;
        }

        .tech-title {
          color: #fff;
        }
        .tech-title span { display: inline; }

        /* ---- Card grid ---- */
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }

        .tech-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: clamp(1.25rem, 2vw, 1.75rem);
          background: #0d1017;
          border: 1px solid #1e2330;
          border-radius: 1.5rem;
          cursor: pointer;
          text-decoration: none;
          transition:
            border-color 0.3s cubic-bezier(0.22,1,0.36,1),
            background 0.3s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.3s cubic-bezier(0.22,1,0.36,1),
            transform 0.25s cubic-bezier(0.22,1,0.36,1);
          outline: none;
        }
        .tech-card:hover,
        .tech-card--active {
          border-color: rgba(17,99,251,0.45);
          background: #111727;
          box-shadow: 0 0 28px -8px rgba(17,99,251,0.35);
          transform: translateY(-3px);
        }

        /* Header row */
        .tech-card-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tech-icon-wrap {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(17,99,251,0.1);
          border: 1px solid rgba(17,99,251,0.2);
          border-radius: 14px;
          padding: 10px;
          flex-shrink: 0;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .tech-card--active .tech-icon-wrap {
          background: #1163fb;
          border-color: #1163fb;
        }

        .tech-icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
          filter: brightness(0.9);
          transition: filter 0.3s ease;
        }
        .tech-card--active .tech-icon {
          filter: brightness(10);
        }

        .tech-card-title {
          font-size: clamp(0.9375rem, 1rem + 0.15vw, 1.125rem);
          font-weight: 600;
          line-height: 1.3;
          color: #fff;
          margin: 0;
          transition: color 0.3s ease;
        }
        .tech-card--active .tech-card-title {
          color: #4d8aff;
        }

        /* Description — hidden by default, shown when active */
        .tech-card-desc {
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.65;
          color: #7a8299;
          margin: 0;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition:
            max-height 0.45s cubic-bezier(0.22,1,0.36,1),
            opacity 0.35s ease;
        }
        .tech-card-desc--visible {
          max-height: 160px;
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
