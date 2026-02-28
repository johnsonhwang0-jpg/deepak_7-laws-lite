import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";

interface LawFourProps {
  onComplete: () => void;
  onBackToMap: () => void;
}

export function LawFour({ onComplete, onBackToMap }: LawFourProps) {
  const [step, setStep] = useState<"intro" | "interaction" | "summary">("intro");
  const [isAssembling, setIsAssembling] = useState(false);

  const pieces = [
    { id: 1, x: -80, y: -80, rotation: 0, color: "from-blue-400 to-cyan-400" },
    { id: 2, x: 80, y: -80, rotation: 90, color: "from-purple-400 to-pink-400" },
    { id: 3, x: -80, y: 80, rotation: 270, color: "from-green-400 to-emerald-400" },
    { id: 4, x: 80, y: 80, rotation: 180, color: "from-orange-400 to-yellow-400" },
  ];

  const handlePush = () => {
    setIsAssembling(true);
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
            className="absolute inset-0 bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-8"
              >
                <h2 className="text-sky-200 tracking-widest uppercase">
                  The Law of Least Effort
                </h2>
                <p className="text-white leading-relaxed max-w-lg mx-auto">
                  "Nature's intelligence functions effortlessly, with carefreeness and harmony. When you are in harmony with nature, you can create easily."
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 1 }}
                  className="pt-8"
                >
                  <Button
                    onClick={() => setStep("interaction")}
                    className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white px-10 py-6 rounded-full"
                  >
                    Flow with Ease
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
            className="absolute inset-0 bg-gradient-to-b from-blue-950 via-sky-950/50 to-black"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sky-200/80 text-center mb-16 max-w-md"
              >
                Do less and accomplish more. Accept what is.
                <br />
                <span className="text-white mt-4 block">Give it a gentle push and let it complete itself.</span>
              </motion.p>

              <div className="relative w-64 h-64">
                {!isAssembling ? (
                  // Scattered pieces
                  pieces.map((piece) => (
                    <motion.div
                      key={piece.id}
                      className={`absolute w-16 h-16 bg-gradient-to-br ${piece.color} rounded-lg`}
                      initial={{ x: piece.x, y: piece.y, rotate: piece.rotation }}
                      animate={{
                        x: piece.x,
                        y: piece.y,
                        rotate: piece.rotation,
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: "-32px",
                        marginTop: "-32px",
                      }}
                    />
                  ))
                ) : (
                  // Assembling pieces
                  pieces.map((piece, index) => (
                    <motion.div
                      key={piece.id}
                      className={`absolute w-16 h-16 bg-gradient-to-br ${piece.color} rounded-lg`}
                      initial={{ x: piece.x, y: piece.y, rotate: piece.rotation }}
                      animate={{
                        x: index % 2 === 0 ? -32 : 32,
                        y: index < 2 ? -32 : 32,
                        rotate: 0,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 50,
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: "-32px",
                        marginTop: "-32px",
                      }}
                    />
                  ))
                )}

                {/* Center glow when assembled */}
                {isAssembling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
                  >
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-xl" />
                  </motion.div>
                )}
              </div>

              {!isAssembling ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-16"
                >
                  <Button
                    onClick={handlePush}
                    className="bg-gradient-to-r from-sky-600 to-blue-600 text-white px-10 py-6 rounded-full"
                  >
                    Give It a Push
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="mt-16"
                >
                  <Button
                    onClick={() => setStep("summary")}
                    className="bg-gradient-to-r from-sky-600 to-blue-600 text-white px-10 py-6 rounded-full"
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
            className="absolute inset-0 bg-gradient-to-b from-sky-950 via-blue-900 to-indigo-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center space-y-8 max-w-lg"
              >
                <p className="text-white leading-relaxed">
                  "When your actions are motivated by love, your energy multiplies. Least effort is expended when your actions are motivated by love."
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
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-6 rounded-full"
                >
                  Continue to Next Law
                </Button>
                <Button
                  onClick={onBackToMap}
                  variant="ghost"
                  className="w-full text-sky-300 hover:text-white hover:bg-sky-900/30 py-6 rounded-full"
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
