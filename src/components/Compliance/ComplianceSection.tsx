import { ShieldCheck, Lock, CircleCheck } from 'lucide-react';
import React from 'react';

const complianceList = [
  {
    name: 'SOC 2 Type II Certified',
    code: 'AICPA Trust Services Criteria',
    desc: 'Audited security, availability, and confidentiality controls ensuring rigorous operational safety.',
    badge: 'Certified'
  },
  {
    name: 'ISO/IEC 27001:2022',
    code: 'Information Security Management',
    desc: 'Globally recognized framework for systematic information risk management and data governance.',
    badge: 'Accredited'
  },
  {
    name: 'HIPAA & HITRUST',
    code: 'Healthcare Compliance',
    desc: 'Strict end-to-end PHI encryption, access logging, and business associate agreement (BAA) alignment.',
    badge: 'Compliant'
  },
  {
    name: 'GDPR & CCPA',
    code: 'Global Data Privacy',
    desc: 'Privacy by design, automated user consent management, and secure cross-border data residency.',
    badge: 'Enforced'
  },
  {
    name: 'FedRAMP Cloud Ready',
    code: 'Public Sector Security',
    desc: 'High-baseline cybersecurity controls architected for government and regulated enterprise workloads.',
    badge: 'Ready'
  },
  {
    name: 'PCI-DSS Level 1',
    code: 'Payment Card Security',
    desc: 'Tokenized transaction processing ensuring complete cardholder data protection and zero leakage.',
    badge: 'Standard'
  }
];

export default function ComplianceSection() {
  return (
    <section id="compliance" className="py-24 bg-[#0a0c10] relative border-t border-white/10 overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-emerald-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="layout-container-lg relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Security & Governance First</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Building With Compliance <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                and Zero-Trust Risk in Mind.
              </span>
            </h2>
            <p className="mt-4 text-base text-gray-300 font-normal leading-relaxed max-w-2xl">
              We embed automated security controls, penetration testing, and regulatory compliance into every stage of the engineering lifecycle, eliminating vulnerabilities before they reach production.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">100% IP & Source Code Ownership</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-normal">
                Every line of code, architectural design document, and trained model weights remain 100% your proprietary intellectual property from day one.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>NDA Protected</span>
                <span className="text-emerald-400">Continuous SAST/DAST Auditing</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complianceList.map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-[#0e1218] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    {item.code}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {item.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-gray-300">
                <CircleCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Built into CI/CD pipeline</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
