import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { Link2Off, Anchor, Lock } from "lucide-react";

interface LawSixProps {
  onComplete: () => void;
  onBackToMap: () => void;
}

const attachments = [
  { id: 1, icon: Link2Off, label: "Attachment", x: -60, y: -80 },
  { id: 2, icon: Anchor, label: "Weight", x: 60, y: -60 },
  { id: 3, icon: Lock, label: "Control", x: -70, y: 40 },
];

export function LawSix({ onComplete, onBackToMap }: LawSixProps) {
  const [step, setStep] = useState<"intro" | "interaction" | "summary">("intro");
  const [releasedItems, setReleasedItems] = useState<number[]>([]);

  const handleDragEnd = (id: number, info: any) => {
    // If dragged far enough, release it
    if (Math.abs(info.offset.y) > 100 || Math.abs(info.offset.x) > 100) {
      setReleasedItems((prev) => [...prev, id]);
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
            className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-zinc-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-8"
              >
                <h2 className="text-slate-200 tracking-widest uppercase">
                  The Law of Detachment
                </h2>
                <p className="text-white leading-relaxed max-w-lg mx-auto">
                  "In detachment lies the wisdom of uncertainty. In the uncertainty lies the freedom from our past and from the known."
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 1 }}
                  className="pt-8"
                >
                  <Button
                    onClick={() => setStep("interaction")}
                    className="bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-500 hover:to-gray-500 text-white px-10 py-6 rounded-full"
                  >
                    Let Go
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
            className="absolute inset-0 bg-gradient-to-b from-gray-950 via-slate-950/50 to-black"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-slate-200/80 text-center mb-16 max-w-md"
              >
                Attachment comes from poverty consciousness. Detachment is synonymous with freedom.
                <br />
                <span className="text-white mt-4 block">Drag to release what no longer serves you.</span>
              </motion.p>

              <div className="relative w-full max-w-md h-96">
                {/* Center point - your true self */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-white/30 to-white/10 border border-white/30"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 255, 255, 0.2)",
                      "0 0 40px rgba(255, 255, 255, 0.4)",
                      "0 0 20px rgba(255, 255, 255, 0.2)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Draggable attachments */}
                {attachments.map((attachment) => {
                  const isReleased = releasedItems.includes(attachment.id);
                  const Icon = attachment.icon;

                  if (isReleased) {
                    return (
                      <motion.div
                        key={attachment.id}
                        initial={{
                          x: attachment.x,
                          y: attachment.y,
                          opacity: 1,
                        }}
                        animate={{
                          y: -500,
                          opacity: 0,
                          scale: 0,
                        }}
                        transition={{ duration: 1.5 }}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          marginLeft: "-40px",
                          marginTop: "-40px",
                        }}
                      >
                        <div className="w-20 h-20 rounded-lg bg-gray-700 flex flex-col items-center justify-center gap-1 border border-gray-600">
                          <Icon className="w-6 h-6 text-gray-400" />
                          <span className="text-gray-400">{attachment.label}</span>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={attachment.id}
                      drag
                      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                      onDragEnd={(_, info) => handleDragEnd(attachment.id, info)}
                      className="absolute left-1/2 top-1/2 cursor-grab active:cursor-grabbing"
                      initial={{
                        x: attachment.x,
                        y: attachment.y,
                      }}
                      style={{
                        marginLeft: "-40px",
                        marginTop: "-40px",
                      }}
                    >
                      <div className="w-20 h-20 rounded-lg bg-gray-700 flex flex-col items-center justify-center gap-1 border border-gray-600 shadow-lg">
                        <Icon className="w-6 h-6 text-gray-400" />
                        <span className="text-gray-400">{attachment.label}</span>
                      </div>

                      {/* Chain connecting to center */}
                      <svg className="absolute left-1/2 top-1/2 pointer-events-none" style={{ overflow: 'visible' }}>
                        <line
                          x1="0"
                          y1="0"
                          x2={-attachment.x}
                          y2={-attachment.y}
                          stroke="rgba(156, 163, 175, 0.3)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      </svg>
                    </motion.div>
                  );
                })}
              </div>

              <motion.p className="text-slate-300/60 text-center mt-8">
                {releasedItems.length === 0 && "Drag away your attachments"}
                {releasedItems.length > 0 && releasedItems.length < 3 && `${releasedItems.length}/3 released`}
                {releasedItems.length === 3 && "Freedom achieved"}
              </motion.p>

              {releasedItems.length === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Button
                    onClick={() => setStep("summary")}
                    className="bg-gradient-to-r from-slate-600 to-gray-600 text-white px-10 py-6 rounded-full"
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
            className="absolute inset-0 bg-gradient-to-b from-slate-950 via-gray-900 to-zinc-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center space-y-8 max-w-lg"
              >
                <p className="text-white leading-relaxed">
                  "Only from detached involvement can you have joy and laughter. Then the symbols of wealth are created spontaneously and effortlessly."
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
                  className="w-full bg-gradient-to-r from-slate-600 to-gray-600 text-white py-6 rounded-full"
                >
                  Continue to Next Law
                </Button>
                <Button
                  onClick={onBackToMap}
                  variant="ghost"
                  className="w-full text-slate-300 hover:text-white hover:bg-slate-900/30 py-6 rounded-full"
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
