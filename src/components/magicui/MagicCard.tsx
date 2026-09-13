import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#4F46E5",
  gradientOpacity = 0.8,
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }
    },
    [mouseX, mouseY],
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      if (!e.relatedTarget) {
        document.removeEventListener("mouseout", handleMouseOut);
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
      }
    },
    [mouseX, mouseY, gradientSize],
  );

  const handleMouseEnter = useCallback(() => {
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousemove", handleMouseMove as any);
  }, [handleMouseMove, handleMouseOut]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove as any);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove as any);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOut]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex size-full rounded-[2rem] bg-white border border-zinc-200 shadow-soft overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-px z-10 rounded-[calc(2rem-1px)] bg-white/95" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientColor},
            transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientColor},
            transparent 100%)
          `,
          opacity: gradientOpacity * 0.1,
        }}
      />
      <div className="relative z-20 size-full">{children}</div>
    </div>
  );
}
