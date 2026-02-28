import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Sparkles } from "lucide-react";

interface LawFiveProps {
  onComplete: () => void;
  onBackToMap: () => void;
}

export function LawFive({ onComplete, onBackToMap }: LawFiveProps) {
  const [step, setStep] = useState<"intro" | "interaction" | "summary">("intro");
  const [intention, setIntention] = useState("");
  const [hasReleased, setHasReleased] = useState(false);

  const handleRelease = () => {
    if (intention.trim()) {
      setHasReleased(true);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-violet-900 to-purple-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-8"
              >
                <h2 className="text-fuchsia-200 tracking-widest uppercase">
                  The Law of Intention and Desire
                </h2>
                <p className="text-white leading-relaxed max-w-lg mx-auto">
                  "Intention is the starting point of every dream. It is the creative power that fulfills all our needs."
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 1 }}
                  className="pt-8"
                >
                  <Button
                    onClick={() => setStep("interaction")}
                    className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white px-10 py-6 rounded-full"
                  >
                    Set Your Intention
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === "interaction" && (
          <motion.div
            key="interaction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-violet-950 via-fuchsia-950/50 to-black"
          >
            {/* Stars in background */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
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
                className="text-fuchsia-200/80 text-center mb-16 max-w-md"
              >
                The field of all possibilities is receptive to your desires.
                <br />
                <span className="text-white mt-4 block">Write your intention and release it to the universe.</span>
              </motion.p>

              {!hasReleased ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-md space-y-6"
                >
                  <div className="relative">
                    <Input
                      value={intention}
                      onChange={(e) => setIntention(e.target.value)}
                      placeholder="I intend to..."
                      className="w-full bg-white/10 border-fuchsia-500/30 text-white placeholder:text-white/40 px-6 py-6 rounded-full"
                    />
                    <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fuchsia-400" />
                  </div>

                  <Button
                    onClick={handleRelease}
                    disabled={!intention.trim()}
                    className="w-full bg-gradient-to-r from-fuchsia-600 to-violet-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-6 rounded-full"
                  >
                    Release to the Universe
                  </Button>
                </motion.div>
              ) : (
                <div className="relative w-full max-w-md h-64">
                  {/* Intention flying away */}
                  <motion.div
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      y: -400,
                      opacity: 0,
                      scale: 0.5,
                    }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="bg-gradient-to-r from-fuchsia-500 to-violet-500 px-8 py-4 rounded-full text-white shadow-2xl">
                      {intention}
                    </div>
                  </motion.div>

                  {/* Light trail */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 w-2 h-96 bg-gradient-to-t from-fuchsia-500 via-violet-500 to-transparent"
                  />

                  {/* Star burst */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.5],
                        x: Math.cos((i * Math.PI * 2) / 12) * 100,
                        y: Math.sin((i * Math.PI * 2) / 12) * 100 - 200,
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.5,
                      }}
                      className="absolute left-1/2 top-1/2 w-2 h-2 bg-fuchsia-400 rounded-full"
                    />
                  ))}
                </div>
              )}

              {hasReleased && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }}
                  className="mt-32"
                >
                  <Button
                    onClick={() => setStep("summary")}
                    className="bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white px-10 py-6 rounded-full"
                  >
                    Continue
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {step === "summary" && (
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-fuchsia-950 via-violet-900 to-purple-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center space-y-8 max-w-lg"
              >
                <p className="text-white leading-relaxed">
                  "Inherent in every intention is the mechanics for its fulfillment. Trust the universe to orchestrate the details."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="absolute bottom-12 left-0 right-0 px-8 space-y-4"
              >
                <Button
                  onClick={onComplete}
                  className="w-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white py-6 rounded-full"
                >
                  Continue to Next Law
                </Button>
                <Button
                  onClick={onBackToMap}
                  variant="ghost"
                  className="w-full text-fuchsia-300 hover:text-white hover:bg-fuchsia-900/30 py-6 rounded-full"
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
