import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowUpRight, Star, ShieldCheck, CircleCheck } from 'lucide-react';

export default function ExitIntentModal() {
  const [showExitModal, setShowExitModal] = useState(false);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15) {
        const hasTriggered = sessionStorage.getItem('modelscale_exit_shown');
        if (!hasTriggered) {
          setShowExitModal(true);
          sessionStorage.setItem('modelscale_exit_shown', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <AnimatePresence>
      {showExitModal && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowExitModal(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="relative w-full max-w-2xl rounded-3xl bg-[#0d1017] border border-blue-500/30 p-6 sm:p-10 shadow-2xl z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowExitModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CircleCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Roadmap On The Way!</h3>
                <p className="text-sm text-gray-300 mb-6">
                  We've sent our 2026 Enterprise Digital Transformation Blueprint to <span className="text-white font-semibold">{email}</span>.
                </p>
                <button
                  onClick={() => setShowExitModal(false)}
                  className="btn-primary-blue px-6 py-2.5 rounded-full text-xs font-bold"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-[11px] font-bold text-modelscale-yellow uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Before You Go</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Ready to Build Your Next Digital Product?
                </h3>
                
                <p className="text-sm text-gray-300 mb-6 font-normal">
                  Get our free <span className="text-white font-semibold">2026 Enterprise AI & Architecture Blueprint</span> and schedule a complimentary 30-minute technical scope review.
                </p>

                {/* Rating & Trust strip */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex text-modelscale-yellow">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-modelscale-yellow text-modelscale-yellow" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white">4.9 / 5.0 on Clutch</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> NDA Guaranteed
                  </span>
                </div>

                {/* Quick capture form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      required
                      type="email"
                      placeholder="Enter your work email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3.5 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:border-modelscale-blue focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="py-3.5 px-6 rounded-xl bg-modelscale-blue hover:bg-modelscale-blue-hover text-white text-sm font-bold flex items-center justify-center gap-1.5 shadow-glow-blue cursor-pointer shrink-0"
                    >
                      <span>Get Free Blueprint</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500 text-center sm:text-left">
                    Zero spam. Unsubscribe anytime. Strictly confidential.
                  </p>
                </form>

              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
