import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";

interface LawTwoProps {
  onComplete: () => void;
  onBackToMap: () => void;
}

export function LawTwo({ onComplete, onBackToMap }: LawTwoProps) {
  const [step, setStep] = useState<"intro" | "interaction" | "summary">("intro");
  const [ballPosition, setBallPosition] = useState(0); // -1 = given, 0 = center, 1 = received
  const [cycleCount, setCycleCount] = useState(0);

  const handleDrag = (_: any, info: any) => {
    const offset = info.offset.x;
    if (offset < -100) {
      setBallPosition(-1);
      setTimeout(() => {
        setBallPosition(1);
        setTimeout(() => {
          setBallPosition(0);
          setCycleCount(c => c + 1);
        }, 1000);
      }, 800);
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
            className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-8"
              >
                <h2 className="text-teal-200 tracking-widest uppercase">
                  The Law of Giving and Receiving
                </h2>
                <p className="text-white leading-relaxed max-w-lg mx-auto">
                  "The universe operates through dynamic exchange... giving and receiving are different aspects of the flow of energy."
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 1 }}
                  className="pt-8"
                >
                  <Button
                    onClick={() => setStep("interaction")}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-10 py-6 rounded-full"
                  >
                    Begin the Exchange
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
            className="absolute inset-0 bg-gradient-to-b from-teal-950 via-emerald-950/50 to-black"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal-200/80 text-center mb-16 max-w-md"
              >
                The flow of life is the flow of giving and receiving.
                <br />
                <span className="text-white mt-4 block">Swipe the energy ball to give, and watch what returns.</span>
              </motion.p>

              {/* Energy ball */}
              <div className="relative w-full max-w-md h-64">
                {ballPosition === 0 && cycleCount < 3 && (
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDrag}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(52, 211, 153, 0.5)",
                          "0 0 40px rgba(52, 211, 153, 0.8)",
                          "0 0 20px rgba(52, 211, 153, 0.5)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                )}

                {ballPosition === -1 && (
                  <motion.div
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: -300, opacity: 0 }}
                    className="absolute left-1/2 top-1/2 -translate-y-1/2"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
                  </motion.div>
                )}

                {ballPosition === 1 && (
                  <motion.div
                    initial={{ x: 300, opacity: 0, scale: 0.5 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                  </motion.div>
                )}
              </div>

              <motion.p className="text-teal-300/60 text-center mt-12">
                {cycleCount === 0 && "Swipe left to give"}
                {cycleCount > 0 && cycleCount < 3 && `Exchange ${cycleCount}/3`}
                {cycleCount >= 3 && "The cycle is complete"}
              </motion.p>

              {cycleCount >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Button
                    onClick={() => setStep("summary")}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-6 rounded-full"
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
            className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-900 to-cyan-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center space-y-8 max-w-lg"
              >
                <p className="text-white leading-relaxed">
                  "Give what you want to receive. If you want abundance, give abundance. If you want love, learn to give love."
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
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-6 rounded-full"
                >
                  Continue to Next Law
                </Button>
                <Button
                  onClick={onBackToMap}
                  variant="ghost"
                  className="w-full text-teal-300 hover:text-white hover:bg-teal-900/30 py-6 rounded-full"
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
