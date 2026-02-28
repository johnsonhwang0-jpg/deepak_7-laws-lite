import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";

interface LawOneProps {
  onComplete: () => void;
  onBackToMap: () => void;
}

export function LawOne({ onComplete, onBackToMap }: LawOneProps) {
  const [step, setStep] = useState<"intro" | "interaction" | "summary">("intro");
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const handleHoldStart = () => {
    setIsHolding(true);
  };

  const handleHoldEnd = () => {
    if (holdProgress < 100) {
      setIsHolding(false);
      setHoldProgress(0);
    }
  };

  // Progress tracking for hold interaction
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding) {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            setIsHolding(false);
            setStep("summary");
            return 100;
          }
          return prev + 2;
        });
      }, 60); // Complete in 3 seconds
    } else {
      setHoldProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Step 1: Introduction */}
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950"
          >
            {/* Flowing color background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-8"
              >
                <h2 className="text-purple-200 tracking-widest uppercase">
                  The Law of Pure Potentiality
                </h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="text-white leading-relaxed max-w-lg mx-auto"
                >
                  "The source of all creation is pure consciousness... the realm of pure potentiality."
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 1 }}
                  className="pt-8"
                >
                  <Button
                    onClick={() => setStep("interaction")}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-10 py-6 rounded-full"
                  >
                    I'm Ready to Feel It
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Core Interaction */}
        {step === "interaction" && (
          <motion.div
            key="interaction"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/50 to-black"
          >
            {/* Floating light particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(isHolding ? 60 : 20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-300 rounded-full"
                  initial={{
                    left: "50%",
                    top: "50%",
                    opacity: 0,
                  }}
                  animate={{
                    left: `${50 + (Math.random() - 0.5) * 80}%`,
                    top: `${50 + (Math.random() - 0.5) * 80}%`,
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-purple-200/80 text-center mb-16 max-w-md"
              >
                Pure potentiality is silent, formless. It is the space between your thoughts.
                <br />
                <span className="text-white mt-4 block">Hold the space below to connect with it.</span>
              </motion.p>

              {/* Interactive circle */}
              <div className="relative">
                {/* Outer glow rings */}
                {isHolding && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-purple-400/50"
                      animate={{
                        scale: [1, 2, 2.5],
                        opacity: [0.5, 0.2, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      style={{
                        width: "200px",
                        height: "200px",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-purple-300/50"
                      animate={{
                        scale: [1, 1.8, 2.2],
                        opacity: [0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                      style={{
                        width: "200px",
                        height: "200px",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </>
                )}

                {/* Main interactive circle */}
                <button
                  onTouchStart={handleHoldStart}
                  onTouchEnd={handleHoldEnd}
                  onMouseDown={handleHoldStart}
                  onMouseUp={handleHoldEnd}
                  onMouseLeave={handleHoldEnd}
                  className="relative w-48 h-48 rounded-full touch-none select-none"
                >
                  {/* Background */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      background: isHolding
                        ? [
                            "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(99, 102, 241, 0.2) 100%)",
                            "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(99, 102, 241, 0.4) 100%)",
                          ]
                        : "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)",
                      scale: isHolding ? 1.2 : 1,
                      boxShadow: isHolding
                        ? "0 0 60px rgba(168, 85, 247, 0.6)"
                        : "0 0 20px rgba(168, 85, 247, 0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Progress ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="90"
                      fill="none"
                      stroke="rgba(168, 85, 247, 0.2)"
                      strokeWidth="3"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="90"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: holdProgress / 100 }}
                      transition={{ duration: 0.1 }}
                      style={{
                        strokeDasharray: "565.48",
                      }}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center pulsing dot */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: isHolding ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 1, repeat: isHolding ? Infinity : 0 }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                  </motion.div>
                </button>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isHolding ? 0.5 : 0.8 }}
                className="text-purple-300/60 text-center mt-12"
              >
                {isHolding ? `${Math.round(holdProgress)}%` : "Touch and hold"}
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Step 3: Summary */}
        {step === "summary" && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-900 to-violet-950"
          >
            {/* Expanded energy field */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-300 rounded-full"
                  initial={{
                    left: "50%",
                    top: "50%",
                    opacity: 0,
                  }}
                  animate={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: [0, 0.8, 0.3],
                    scale: [0, 1.5, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.02,
                  }}
                />
              ))}
            </motion.div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-center space-y-8 max-w-lg"
              >
                {/* Audio indicator */}
                <motion.div
                  className="flex items-center justify-center gap-2 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-purple-400 rounded-full"
                        animate={{
                          height: ["8px", "24px", "8px"],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-purple-300/80">Deepak Chopra</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="text-white italic leading-relaxed"
                >
                  "You are what the universe is. You are the field of pure potentiality in its every expression."
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5, duration: 1 }}
                  className="text-purple-100 pt-4"
                >
                  You are not in the world; the world is in you.
                </motion.p>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5, duration: 0.8 }}
                className="absolute bottom-12 left-0 right-0 px-8 space-y-4"
              >
                <Button
                  onClick={onComplete}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-6 rounded-full"
                >
                  Continue to Next Law
                </Button>
                <Button
                  onClick={onBackToMap}
                  variant="ghost"
                  className="w-full text-purple-300 hover:text-white hover:bg-purple-900/30 py-6 rounded-full"
                >
                  Back to Map
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}