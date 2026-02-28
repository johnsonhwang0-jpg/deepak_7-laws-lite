import { motion } from "motion/react";
import { Lock } from "lucide-react";

interface Law {
  id: number;
  name: string;
  subtitle: string;
}

const laws: Law[] = [
  { id: 1, name: "The Law of Pure Potentiality", subtitle: "纯粹潜能" },
  { id: 2, name: "The Law of Giving and Receiving", subtitle: "给予与接收" },
  { id: 3, name: "The Law of Karma", subtitle: "因果" },
  { id: 4, name: "The Law of Least Effort", subtitle: "最省力" },
  { id: 5, name: "The Law of Intention and Desire", subtitle: "意图与愿望" },
  { id: 6, name: "The Law of Detachment", subtitle: "超然" },
  { id: 7, name: "The Law of Dharma", subtitle: "生命目的" },
];

interface JourneyMapProps {
  unlockedLaw: number;
  onSelectLaw: (lawId: number) => void;
}

export function JourneyMap({ unlockedLaw, onSelectLaw }: JourneyMapProps) {
  return (
    <div className="relative w-full bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
      {/* Ambient background glow - fixed position */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12 pb-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-white mb-2">Your Path to Awareness</h1>
          <p className="text-purple-200/60">Unlock each law to continue your journey</p>
        </motion.div>

        {/* Journey path */}
        <div className="max-w-md mx-auto relative pb-12">
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            {laws.map((law, index) => (
              index < laws.length - 1 && (
                <motion.div
                  key={`line-${law.id}`}
                  className="h-24 w-full"
                  initial={{ scaleY: 0 }}
                  animate={{ 
                    scaleY: law.id <= unlockedLaw ? 1 : 0.3,
                    backgroundColor: law.id <= unlockedLaw 
                      ? "rgba(168, 85, 247, 0.5)" 
                      : "rgba(168, 85, 247, 0.15)"
                  }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{ transformOrigin: 'top' }}
                />
              )
            ))}
          </div>

          {/* Law nodes */}
          <div className="space-y-24 relative">
            {laws.map((law, index) => {
              const isUnlocked = law.id <= unlockedLaw;
              const isCompleted = law.id < unlockedLaw;

              return (
                <motion.div
                  key={law.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="relative flex items-center justify-center"
                >
                  {/* Node circle */}
                  <button
                    onClick={() => isUnlocked && onSelectLaw(law.id)}
                    disabled={!isUnlocked}
                    className={`
                      relative w-20 h-20 rounded-full flex items-center justify-center
                      ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
                      transition-all duration-300
                    `}
                  >
                    {/* Glow effect */}
                    {isUnlocked && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(168, 85, 247, 0.4)",
                            "0 0 40px rgba(168, 85, 247, 0.8)",
                            "0 0 20px rgba(168, 85, 247, 0.4)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {/* Circle background */}
                    <div
                      className={`
                        absolute inset-0 rounded-full border-2
                        ${isCompleted 
                          ? 'bg-gradient-to-br from-purple-500 to-blue-500 border-purple-400' 
                          : isUnlocked
                          ? 'bg-gradient-to-br from-purple-600 to-blue-600 border-purple-300'
                          : 'bg-purple-900/20 border-purple-800/30'
                        }
                      `}
                    />

                    {/* Icon */}
                    <div className="relative z-10">
                      {isCompleted ? (
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isUnlocked ? (
                        <div className="text-white">{law.id}</div>
                      ) : (
                        <Lock className="w-6 h-6 text-purple-400/50" />
                      )}
                    </div>

                    {/* Pulse animation for current unlocked */}
                    {isUnlocked && !isCompleted && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-purple-400/30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </button>

                  {/* Law info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isUnlocked ? 1 : 0.4 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className={`
                      absolute ${index % 2 === 0 ? 'left-28' : 'right-28'}
                      text-${index % 2 === 0 ? 'left' : 'right'}
                      max-w-[200px]
                    `}
                  >
                    <div className="text-white mb-1">{law.name}</div>
                    <div className="text-purple-300/60">{law.subtitle}</div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}