import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CircleCheck, Shield, Send, ArrowUpRight, Sparkles, Building, Mail, User, Phone } from 'lucide-react';

const serviceOptions = [
  'Enterprise AI & Autonomous Agents',
  'Mobile App Development (iOS/Android)',
  'Cloud-Native Software Engineering',
  'Cloud Architecture & DevOps',
  'Digital Transformation Consulting',
  'Zero-Trust Cybersecurity & Audit',
];

const budgetOptions = [
  '$25k - $50k',
  '$50k - $100k',
  '$100k - $250k',
  '$250k - $500k',
  '$500k+',
];

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: [] as string[],
    budget: '$50k - $100k',
    message: '',
    requireNda: true,
  });

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ source?: string }>;
      if (customEvent.detail?.source) {
        setSource(customEvent.detail.source);
      }
      setIsOpen(true);
      setSubmitted(false);
    };

    window.addEventListener('open-contact-modal', handleOpen);
    return () => window.removeEventListener('open-contact-modal', handleOpen);
  }, []);

  const toggleService = (srv: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(srv)
        ? prev.services.filter((s) => s !== srv)
        : [...prev.services, srv],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl rounded-3xl bg-[#0d1017] border border-white/15 p-6 sm:p-10 shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-glow-blue/20">
                  <CircleCheck className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Discovery Request Received!
                </h3>
                <p className="text-sm sm:text-base text-gray-300 max-w-md mx-auto mb-6">
                  Thank you, <span className="text-white font-semibold">{formData.name || 'there'}</span>. A Principal Solution Architect will review your requirements and reach out within 4 business hours.
                </p>
                {formData.requireNda && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-xs text-emerald-400 font-mono mb-8 border border-white/10">
                    <Shield className="w-4 h-4" />
                    <span>Bilateral NDA will be countersigned automatically.</span>
                  </div>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-primary-blue px-8 py-3 rounded-full text-sm font-bold"
                >
                  Return to Site
                </button>
              </div>
            ) : (
              <div>
                
                {/* Header */}
                <div className="mb-8 pr-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-modelscale-blue uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Let’s Build Something Remarkable</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Schedule Your Technical Discovery Session
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Direct consultation with Senior Solution Architects. 100% Confidential under NDA.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          required
                          type="text"
                          placeholder="Alex Morgan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-modelscale-blue focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          required
                          type="email"
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-modelscale-blue focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Acme Corp / Startup"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-modelscale-blue focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-modelscale-blue focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services Needed */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      What engineering areas are you interested in?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((srv) => {
                        const isSelected = formData.services.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                              isSelected
                                ? 'bg-modelscale-blue text-white border-modelscale-blue'
                                : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/20'
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Target Project Investment
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                            formData.budget === b
                              ? 'bg-modelscale-yellow text-black border-modelscale-yellow font-bold'
                              : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Project Goals / Technical Brief
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your vision, timeline, target platforms, or current architectural bottlenecks..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-modelscale-blue focus:outline-none transition-colors"
                    />
                  </div>

                  {/* NDA Checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="nda-check"
                      checked={formData.requireNda}
                      onChange={(e) => setFormData({ ...formData, requireNda: e.target.checked })}
                      className="w-4 h-4 rounded bg-black border-white/20 text-modelscale-blue focus:ring-0"
                    />
                    <label htmlFor="nda-check" className="text-xs text-gray-400 select-none cursor-pointer flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Execute Bilateral Non-Disclosure Agreement (NDA) before sharing code/data</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-modelscale-blue hover:bg-modelscale-blue-hover text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow-blue transition-all cursor-pointer"
                  >
                    <span>Submit Discovery Request</span>
                    <Send className="w-4 h-4" />
                  </button>

                </form>

              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
