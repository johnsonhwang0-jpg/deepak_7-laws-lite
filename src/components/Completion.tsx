import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Sparkles, Star } from "lucide-react";

interface CompletionProps {
  onReturnHome: () => void;
}

export function Completion({ onReturnHome }: CompletionProps) {
  const laws = [
    { id: 1, angle: 0 },
    { id: 2, angle: 51.4 },
    { id: 3, angle: 102.8 },
    { id: 4, angle: 154.2 },
    { id: 5, angle: 205.6 },
    { id: 6, angle: 257 },
    { id: 7, angle: 308.4 },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
      {/* Ambient glows */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
      </div>

      {/* Radiating beams */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-full bg-gradient-to-t from-transparent via-purple-500/20 to-transparent"
            style={{
              transform: `rotate(${i * 15}deg)`,
              transformOrigin: 'center',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Circular law nodes visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="relative w-64 h-64 mb-16"
        >
          {/* Center star */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
          </motion.div>

          {/* Surrounding nodes */}
          {laws.map((law, index) => (
            <motion.div
              key={law.id}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${law.angle}deg) translateY(-120px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                type: "spring",
              }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.6)",
                    "0 0 40px rgba(168, 85, 247, 1)",
                    "0 0 20px rgba(168, 85, 247, 0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            </motion.div>
          ))}

          {/* Connecting circle */}
          <motion.div
            className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center space-y-6 max-w-lg"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="text-white"
          >
            Journey Complete
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
            className="text-purple-200/80 leading-relaxed"
          >
            You have touched the seven dimensions of your own consciousness. Carry this awareness into your daily life.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
            className="text-purple-300/60 italic"
          >
            — Deepak Chopra
          </motion.p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.7 }}
          className="absolute bottom-12 left-0 right-0 px-8 space-y-4"
        >
          <Button
            onClick={onReturnHome}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-6 rounded-full shadow-2xl"
          >
            Return to Home
          </Button>
          <Button
            variant="ghost"
            className="w-full text-purple-300 hover:text-white hover:bg-purple-900/30 py-6 rounded-full"
          >
            Explore More Wisdom
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
