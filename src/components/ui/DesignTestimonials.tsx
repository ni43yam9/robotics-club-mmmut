import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface Props {
  testimonials: Testimonial[];
  title?: string;
  duration?: number;
}

export function DesignTestimonials({
  testimonials,
  title = "Testimonials",
  duration = 6000,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, duration);
    return () => clearInterval(interval);
  }, [testimonials.length, duration]);

  if (!testimonials.length) return null;

  return (
    <div className="w-full max-w-xl bg-[#111827]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden">
      {/* Subtle glowing accent line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600" />
      
      <h3 className="text-sm font-bold tracking-[0.25em] text-neutral-400 uppercase mb-10 font-mono">
        {title}
      </h3>

      <div className="relative min-h-[180px] md:min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col justify-between"
          >
            <p className="text-lg md:text-2xl font-medium leading-relaxed text-white mb-8">
              "{testimonials[currentIndex].quote}"
            </p>
            <div>
              <div className="font-bold text-white text-lg md:text-xl mb-1">
                {testimonials[currentIndex].author}
              </div>
              <div className="text-sm md:text-base text-neutral-400">
                {testimonials[currentIndex].role}{" "}
                <span className="text-[#3b82f6]">@ {testimonials[currentIndex].company}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Progress Indicators */}
      <div className="flex gap-3 mt-12">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-10 bg-[#3b82f6] shadow-[0_0_10px_#3b82f6]" : "w-3 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
