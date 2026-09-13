import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroVideoProps = {
  animationStyle?: "from-bottom" | "from-center" | "fade";
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  className?: string;
};

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

export default function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt,
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className={cn("relative", className)}>
      <div
        className="group relative cursor-pointer rounded-2xl border border-black/5 bg-white p-2 shadow-diffuse"
        onClick={() => setIsVideoOpen(true)}
      >
        {/* macOS Browser Header Mockup */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-50 border-b border-black/5 rounded-t-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        
        <div className="relative overflow-hidden rounded-b-xl">
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className="w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-b-xl"
          />
          <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
              <div className="relative flex size-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform group-hover:scale-105">
                <Play className="size-6 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              {...selectedAnimation}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative mx-4 w-full max-w-4xl aspect-video rounded-2xl bg-black overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white/80 hover:text-white backdrop-blur-md"
                onClick={() => setIsVideoOpen(false)}
              >
                <XIcon className="size-5" />
              </button>
              <video
                src={videoSrc}
                className="size-full rounded-2xl"
                controls
                autoPlay
                loop
                muted
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
