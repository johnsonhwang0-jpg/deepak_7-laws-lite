import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface OnboardingProps {
  onBegin: () => void;
}

export function Onboarding({ onBegin }: OnboardingProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Starry background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1624183720151-7396650072a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFycnklMjBuaWdodCUyMHNreSUyMG5lYnVsYXxlbnwxfHx8fDE3NjQyMTUyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-center space-y-8"
        >
          {/* Logo */}
          <motion.div 
            className="flex justify-center mb-12"
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full" />
              <Sparkles className="w-20 h-20 text-purple-300 relative" />
            </div>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white tracking-wider"
          >
            The Seven Laws of Consciousness
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-purple-200/80 max-w-md mx-auto"
          >
            An Interactive Journey with Deepak Chopra
          </motion.p>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="text-white/70 italic max-w-lg mx-auto leading-relaxed"
          >
            "Consciousness is the ultimate reality. Let's begin a journey to explore its seven dimensions within you."
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-0 right-0 flex justify-center px-6"
        >
          <Button
            onClick={onBegin}
            className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-12 py-6 rounded-full shadow-2xl"
          >
            <motion.span
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full"
            />
            <span className="relative">Begin Your Journey</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
