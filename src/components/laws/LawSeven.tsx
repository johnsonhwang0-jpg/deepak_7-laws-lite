import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface LawSevenProps {
  onComplete: () => void;
  onBackToMap: () => void;
}

const questions = [
  {
    id: 1,
    question: "What brings you the most joy?",
    options: [
      { value: "creating", label: "Creating and making things" },
      { value: "helping", label: "Helping and supporting others" },
      { value: "learning", label: "Learning and discovering" },
      { value: "connecting", label: "Connecting people and ideas" },
    ],
  },
  {
    id: 2,
    question: "What does the world need most from you?",
    options: [
      { value: "innovation", label: "Innovation and new perspectives" },
      { value: "compassion", label: "Compassion and care" },
      { value: "wisdom", label: "Wisdom and understanding" },
      { value: "unity", label: "Unity and collaboration" },
    ],
  },
];

const purposeMessages: Record<string, string> = {
  "creating-innovation": "Your dharma is to be a creator and innovator, bringing new realities into existence through your unique vision.",
  "creating-compassion": "Your dharma is to create beauty and healing, using your talents to bring comfort and joy to the world.",
  "creating-wisdom": "Your dharma is to build understanding, creating pathways for others to discover truth through your work.",
  "creating-unity": "Your dharma is to craft connections, building bridges between people through your creative expression.",
  "helping-innovation": "Your dharma is to pioneer new ways of service, revolutionizing how we care for one another.",
  "helping-compassion": "Your dharma is to be a healer and nurturer, your very presence bringing peace to those in need.",
  "helping-wisdom": "Your dharma is to guide and mentor, helping others discover their own inner wisdom.",
  "helping-unity": "Your dharma is to be a unifier, bringing people together through your generous spirit.",
  "learning-innovation": "Your dharma is to discover and share, expanding human knowledge into new frontiers.",
  "learning-compassion": "Your dharma is to understand deeply, using knowledge to create more empathy in the world.",
  "learning-wisdom": "Your dharma is to be a seeker and teacher, illuminating the path for those who follow.",
  "learning-unity": "Your dharma is to weave together different fields of knowledge, creating synthesis and understanding.",
  "connecting-innovation": "Your dharma is to network and catalyze, connecting dots others cannot see to spark innovation.",
  "connecting-compassion": "Your dharma is to build community, creating spaces where people feel seen and valued.",
  "connecting-wisdom": "Your dharma is to facilitate dialogue, helping collective wisdom emerge from diverse voices.",
  "connecting-unity": "Your dharma is to be a bridge-builder, your greatest gift is bringing people together in harmony.",
};

export function LawSeven({ onComplete, onBackToMap }: LawSevenProps) {
  const [step, setStep] = useState<"intro" | "interaction" | "summary">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setAnswers([...answers, selectedAnswer]);
      setSelectedAnswer("");
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setStep("summary");
      }
    }
  };

  const getPurposeMessage = () => {
    const key = answers.join("-");
    return purposeMessages[key] || purposeMessages["creating-innovation"];
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
            className="absolute inset-0 bg-gradient-to-br from-amber-950 via-yellow-900 to-orange-950"
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-8"
              >
                <h2 className="text-amber-200 tracking-widest uppercase">
                  The Law of Dharma
                </h2>
                <p className="text-white leading-relaxed max-w-lg mx-auto">
                  "Everyone has a purpose in life, a unique gift or special talent to give to others. When we blend this talent with service, we experience the ecstasy and exultation of our own spirit."
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 1 }}
                  className="pt-8"
                >
                  <Button
                    onClick={() => setStep("interaction")}
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white px-10 py-6 rounded-full"
                  >
                    Discover Your Purpose
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
            className="absolute inset-0 bg-gradient-to-b from-yellow-950 via-amber-950/50 to-black"
          >
            {/* Glowing mandala background */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-96 h-96 border border-amber-500/10 rounded-full" />
              <div className="absolute w-80 h-80 border border-amber-500/20 rounded-full" />
              <div className="absolute w-64 h-64 border border-amber-500/30 rounded-full" />
            </motion.div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full max-w-md space-y-8"
              >
                {/* Progress indicator */}
                <div className="flex gap-2 justify-center mb-8">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all ${
                        index <= currentQuestion
                          ? "w-12 bg-amber-500"
                          : "w-8 bg-amber-500/20"
                      }`}
                    />
                  ))}
                </div>

                <h3 className="text-white text-center mb-8">
                  {questions[currentQuestion].question}
                </h3>

                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option) => (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * questions[currentQuestion].options.indexOf(option) }}
                        className={`
                          flex items-center space-x-3 p-4 rounded-2xl border transition-all cursor-pointer
                          ${
                            selectedAnswer === option.value
                              ? "bg-amber-600/20 border-amber-500"
                              : "bg-amber-900/10 border-amber-800/30 hover:border-amber-700/50"
                          }
                        `}
                        onClick={() => setSelectedAnswer(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="text-white cursor-pointer flex-1">
                          {option.label}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </RadioGroup>

                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-6 rounded-full mt-8"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "Reveal My Purpose"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === "summary" && (
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-amber-950 via-yellow-900 to-orange-950"
          >
            {/* Radiating light */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-32 bg-gradient-to-t from-amber-500/50 to-transparent"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    transformOrigin: 'center',
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center space-y-8 max-w-lg"
              >
                <h3 className="text-amber-200 tracking-wider uppercase">Your Purpose</h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-white leading-relaxed px-4"
                >
                  {getPurposeMessage()}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="text-amber-200/80 italic"
                >
                  "Express your talents to fulfill needs; when you do this, you create abundance and fulfillment."
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="absolute bottom-12 left-0 right-0 px-8 space-y-4"
              >
                <Button
                  onClick={onComplete}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-6 rounded-full"
                >
                  Complete Journey
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
