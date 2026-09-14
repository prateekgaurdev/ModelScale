import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CircleCheck, Send, Sparkles, Mail, User, Building } from 'lucide-react';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  // Form State - simple & clean
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-contact-modal', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-contact-modal', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
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
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container - Creamy Whitish Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl bg-[#FAF8F5] border border-[#E7E2D6] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(11,11,13,0.2)] z-10 my-8 overflow-hidden text-[#0B0B0D]"
          >
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#7A7A82] hover:text-[#0B0B0D] hover:bg-black/[0.05] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#FF5B2E]/10 border border-[#FF5B2E]/20 flex items-center justify-center text-[#FF5B2E] mb-5">
                  <CircleCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B0B0D] mb-2 tracking-tight">
                  Message Sent!
                </h3>
                <p className="text-sm text-[#7A7A82] max-w-sm mx-auto mb-6 leading-relaxed">
                  Thank you, <span className="text-[#0B0B0D] font-medium">{formData.name || 'there'}</span>. We've received your note and will get back to you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-[#0B0B0D] hover:bg-[#3A3A3F] text-white text-xs font-semibold tracking-wide transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                
                {/* Header */}
                <div className="mb-6 pr-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF5B2E]/10 border border-[#FF5B2E]/20 text-[#FF5B2E] text-xs font-mono font-medium tracking-wide mb-2.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Contact Us</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0B0D] tracking-tight">
                    Let's start a conversation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7A7A82] mt-1 leading-relaxed">
                    Tell us about your project or questions. We usually respond within a few hours.
                  </p>
                </div>

                {/* Simple Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[#3A3A3F] mb-1.5">
                        Your Name <span className="text-[#FF5B2E]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9890]" />
                        <input
                          required
                          type="text"
                          placeholder="Alex Morgan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E2DDD5] text-[#0B0B0D] placeholder:text-[#A5A29A] text-sm focus:border-[#FF5B2E] focus:ring-2 focus:ring-[#FF5B2E]/10 focus:outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#3A3A3F] mb-1.5">
                        Work Email <span className="text-[#FF5B2E]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9890]" />
                        <input
                          required
                          type="email"
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E2DDD5] text-[#0B0B0D] placeholder:text-[#A5A29A] text-sm focus:border-[#FF5B2E] focus:ring-2 focus:ring-[#FF5B2E]/10 focus:outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-medium text-[#3A3A3F] mb-1.5">
                      Company / Organization <span className="text-[#7A7A82] text-[11px]">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9890]" />
                      <input
                        type="text"
                        placeholder="Company name or startup"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E2DDD5] text-[#0B0B0D] placeholder:text-[#A5A29A] text-sm focus:border-[#FF5B2E] focus:ring-2 focus:ring-[#FF5B2E]/10 focus:outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-[#3A3A3F] mb-1.5">
                      How can we help? <span className="text-[#FF5B2E]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe your project, timeline, or requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E2DDD5] text-[#0B0B0D] placeholder:text-[#A5A29A] text-sm focus:border-[#FF5B2E] focus:ring-2 focus:ring-[#FF5B2E]/10 focus:outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#FF5B2E] hover:bg-[#E44A20] active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,91,46,0.28)] transition-all cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-[#7A7A82] text-center mt-2.5">
                      100% confidential. We respect your privacy and never share your data.
                    </p>
                  </div>

                </form>

              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
