import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { Sprout } from "lucide-react";

interface LawThreeProps {
  onComplete: () => void;
  onBackToMap: () => void;
}

export function LawThree({ onComplete, onBackToMap }: LawThreeProps) {
  const [step, setStep] = useState<"intro" | "interaction" | "summary">("intro");
  const [isPlanted, setIsPlanted] = useState(false);
  const [growthStage, setGrowthStage] = useState(0);

  const handleDrop = () => {
    setIsPlanted(true);
    // Animate growth stages
    setTimeout(() => setGrowthStage(1), 500);
    setTimeout(() => setGrowthStage(2), 1500);
    setTimeout(() => setGrowthStage(3), 2500);
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
            className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-900 to-rose-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-8"
              >
                <h2 className="text-amber-200 tracking-widest uppercase">
                  The Law of Karma
                </h2>
                <p className="text-white leading-relaxed max-w-lg mx-auto">
                  "Every action generates a force of energy that returns to us in like kind. What we sow is what we reap."
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 1 }}
                  className="pt-8"
                >
                  <Button
                    onClick={() => setStep("interaction")}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-10 py-6 rounded-full"
                  >
                    Plant Your Seed
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
            className="absolute inset-0 bg-gradient-to-b from-amber-950 via-orange-950/50 to-black"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-amber-200/80 text-center mb-16 max-w-md"
              >
                Every choice carries the seed of its consequence.
                <br />
                <span className="text-white mt-4 block">Drag the seed into the soil and watch it grow.</span>
              </motion.p>

              <div className="relative w-full max-w-md h-96">
                {/* Soil */}
                <div className="absolute bottom-20 left-0 right-0 h-32 bg-gradient-to-b from-amber-900/50 to-amber-950 rounded-lg" />

                {/* Seed (draggable) */}
                {!isPlanted && (
                  <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.point.y > window.innerHeight / 2 + 100) {
                        handleDrop();
                      }
                    }}
                    className="absolute left-1/2 top-20 -translate-x-1/2 cursor-grab active:cursor-grabbing"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <Sprout className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                )}

                {/* Growing plant */}
                {isPlanted && (
                  <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
                    {/* Stem */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: growthStage >= 1 ? "80px" : 0 }}
                      transition={{ duration: 1 }}
                      className="w-2 bg-gradient-to-t from-green-700 to-green-500 mx-auto rounded-t-full"
                    />

                    {/* Leaves */}
                    {growthStage >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4"
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full transform -rotate-45" />
                        <div className="w-8 h-8 bg-green-500 rounded-full transform rotate-45" />
                      </motion.div>
                    )}

                    {/* Flower */}
                    {growthStage >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2"
                      >
                        <div className="relative w-16 h-16">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full"
                              style={{
                                left: "50%",
                                top: "50%",
                                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-12px)`,
                              }}
                            />
                          ))}
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {growthStage >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Button
                    onClick={() => setStep("summary")}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-10 py-6 rounded-full"
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
            className="absolute inset-0 bg-gradient-to-b from-amber-950 via-orange-900 to-rose-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center space-y-8 max-w-lg"
              >
                <p className="text-white leading-relaxed">
                  "When you make a choice, you are choosing the consequences. Plant seeds of kindness and watch beauty bloom."
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
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-6 rounded-full"
                >
                  Continue to Next Law
                </Button>
                <Button
                  onClick={onBackToMap}
                  variant="ghost"
                  className="w-full text-amber-300 hover:text-white hover:bg-amber-900/30 py-6 rounded-full"
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
