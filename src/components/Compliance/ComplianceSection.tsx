import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const DURATION = 5000; // ms per item

const items = [
  {
    num: '1',
    title: 'Data Privacy & Protection',
    content: 'We implement GDPR, CCPA, HIPAA, and LGPD data privacy controls across every system we build — anonymisation pipelines, consent management platforms, and automated breach response.',
    badges: ['GDPR', 'CCPA', 'HIPAA', 'LGPD'],
  },
  {
    num: '2',
    title: 'Security & Risk Management',
    content: 'ISO/IEC 27001, PCI DSS Level 1, NIST Cybersecurity Framework, and FedRAMP-ready architectures ensure your infrastructure meets the most demanding security audit requirements.',
    badges: ['ISO/IEC 27001', 'PCI DSS', 'NIST CSF', 'FedRAMP'],
  },
  {
    num: '3',
    title: 'AI & Technology Regulations',
    content: 'EU AI Act compliance, explainability documentation, bias auditing, and responsible AI ethics frameworks — built into every model we train and every agent we deploy.',
    badges: ['EU AI Act', 'AI Ethics', 'Model Cards', 'Bias Audits'],
  },
  {
    num: '4',
    title: 'Industry-Specific Standards',
    content: 'SOX-compliant audit trails for financial systems, HIPAA BAA agreements for healthcare, FTC Safeguards Rule for financial services, and ISO 9001 quality management for enterprise delivery.',
    badges: ['SOX', 'FTC Safeguards', 'ISO 9001', 'HIPAA BAA'],
  },
  {
    num: '5',
    title: 'Global Regulatory Frameworks',
    content: 'Business continuity under ISO 22301, environmental stewardship with ISO 14001, and cross-border data transfer compliance with the EU-US Data Privacy Framework.',
    badges: ['ISO 22301', 'ISO 14001', 'EU-US DPF', 'GDPR'],
  },
  {
    num: '6',
    title: 'Compliance for Cloud & SaaS',
    content: 'SOC 2 Type II audit readiness, FedRAMP authorisation support, and CSA Cloud Controls Matrix implementation — built into infrastructure-as-code so compliance is automated, not manual.',
    badges: ['SOC 2 Type II', 'FedRAMP', 'CSA CCM', 'ISO 27017'],
  },
];

export default function ComplianceAccordion() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useScrollReveal();

  const startTimer = (idx: number) => {
    // Clear existing
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
    }, 50);

    timerRef.current = setTimeout(() => {
      const next = (idx + 1) % items.length;
      setActiveIdx(next);
    }, DURATION);
  };

  useEffect(() => {
    startTimer(activeIdx);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [activeIdx]);

  const handleClick = (idx: number) => {
    if (idx === activeIdx) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setActiveIdx(idx);
  };

  const cur = items[activeIdx];

  return (
    <section id="compliance" className="compliance-section">
      <div className="container-xl">

        <div className="compliance-layout">

          {/* LEFT: sticky heading + description */}
          <div className="compliance-left reveal">
            <div className="compliance-left-inner">
              <img
                src="/assets/images/compliance-driven-icon.svg"
                alt="Compliance"
                className="compliance-left-icon"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <h2 className="compliance-title">
                Building With<br />
                Compliance and<br />
                Risk in Mind
              </h2>
              <p className="compliance-subtitle">
                At ModelScale, we integrate compliance into every layer of our
                engineering process — from the first architecture decision to
                the final production deployment.
              </p>
            </div>
          </div>

          {/* RIGHT: timed accordion */}
          <div className="compliance-right">
            {items.map((item, idx) => {
              const isOpen = idx === activeIdx;
              return (
                <div
                  key={item.num}
                  className={`comp-item reveal delay-${idx + 1} ${isOpen ? 'comp-item--open' : ''}`}
                  onClick={() => handleClick(idx)}
                >
                  {/* Header row */}
                  <div className="comp-item-header">
                    <div className="comp-item-num">[ {item.num} ]</div>
                    <h3 className="comp-item-title">{item.title}</h3>
                    <span className="comp-item-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d={isOpen ? 'M18 15L12 9L6 15' : 'M6 9L12 15L18 9'}
                          stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Progress bar (only on open item) */}
                  {isOpen && (
                    <div className="comp-progress-bar">
                      <div
                        className="comp-progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Expandable content */}
                  <div className="comp-item-body" style={{ display: isOpen ? 'block' : 'none' }}>
                    <p className="comp-item-desc">{item.content}</p>
                    <div className="comp-badges">
                      {item.badges.map((b) => (
                        <span key={b} className="comp-badge">{b}</span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        .compliance-section {
          background: #000;
          padding: clamp(48px, 6vw, 96px) 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .compliance-layout {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: clamp(2rem, 4vw, 5rem);
          align-items: start;
        }

        /* LEFT */
        .compliance-left-inner {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .compliance-left-icon {
          width: 56px;
          height: 56px;
          object-fit: contain;
          filter: invert(1) brightness(0.9);
        }

        .compliance-title {
          font-size: clamp(1.75rem, 2rem + 0.5vw, 2.75rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0;
        }

        .compliance-subtitle {
          font-size: 0.9375rem;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          margin: 0;
          max-width: 380px;
        }

        /* RIGHT: accordion */
        .compliance-right {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .comp-item {
          border-top: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          overflow: hidden;
          transition: background 0.25s ease;
        }
        .comp-item:last-child {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .comp-item--open {
          background: rgba(17,99,251,0.04);
        }

        .comp-item-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 0;
          user-select: none;
        }

        .comp-item-num {
          font-family: 'Plus Jakarta Sans', monospace;
          font-size: 0.8125rem;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          min-width: 36px;
          flex-shrink: 0;
        }
        .comp-item--open .comp-item-num {
          color: #1163fb;
        }

        .comp-item-title {
          font-size: clamp(0.9375rem, 1rem + 0.1vw, 1.125rem);
          font-weight: 600;
          line-height: 1.3;
          color: rgba(255,255,255,0.7);
          margin: 0;
          flex: 1;
          transition: color 0.2s ease;
        }
        .comp-item--open .comp-item-title {
          color: #fff;
        }

        .comp-item-arrow {
          color: rgba(255,255,255,0.3);
          flex-shrink: 0;
          transition: color 0.2s ease, transform 0.3s ease;
        }
        .comp-item--open .comp-item-arrow {
          color: #1163fb;
        }

        /* Animated progress bar */
        .comp-progress-bar {
          height: 2px;
          background: rgba(17,99,251,0.15);
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .comp-progress-fill {
          height: 100%;
          background: #1163fb;
          border-radius: 9999px;
          transition: width 0.05s linear;
          will-change: width;
        }

        /* Content */
        .comp-item-body {
          padding-bottom: 1.5rem;
          padding-left: calc(36px + 1rem);
        }

        .comp-item-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          margin: 0 0 1rem 0;
        }

        .comp-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .comp-badge {
          padding: 4px 12px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.03);
          letter-spacing: 0.03em;
        }

        @media (max-width: 900px) {
          .compliance-layout {
            grid-template-columns: 1fr;
          }
          .compliance-left-inner {
            position: static;
          }
          .comp-item-body {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
