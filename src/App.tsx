import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Onboarding } from "./components/Onboarding";
import { JourneyMap } from "./components/JourneyMap";
import { LawOne } from "./components/laws/LawOne";
import { LawTwo } from "./components/laws/LawTwo";
import { LawThree } from "./components/laws/LawThree";
import { LawFour } from "./components/laws/LawFour";
import { LawFive } from "./components/laws/LawFive";
import { LawSix } from "./components/laws/LawSix";
import { LawSeven } from "./components/laws/LawSeven";
import { Completion } from "./components/Completion";

type Screen = "onboarding" | "map" | "law" | "completion";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [currentLaw, setCurrentLaw] = useState<number | null>(null);
  const [unlockedLaw, setUnlockedLaw] = useState(1); // Starts with law 1 unlocked

  const handleBeginJourney = () => {
    setCurrentScreen("map");
  };

  const handleSelectLaw = (lawId: number) => {
    if (lawId <= unlockedLaw) {
      setCurrentLaw(lawId);
      setCurrentScreen("law");
    }
  };

  const handleCompleteLaw = () => {
    if (currentLaw && currentLaw < 7) {
      // Unlock next law
      setUnlockedLaw(Math.max(unlockedLaw, currentLaw + 1));
      setCurrentLaw(null);
      setCurrentScreen("map");
    } else if (currentLaw === 7) {
      // Completed all laws
      setCurrentScreen("completion");
    }
  };

  const handleBackToMap = () => {
    setCurrentLaw(null);
    setCurrentScreen("map");
  };

  const handleReturnHome = () => {
    setCurrentScreen("onboarding");
    setCurrentLaw(null);
    setUnlockedLaw(1);
  };

  const getLawComponent = () => {
    const lawProps = {
      onComplete: handleCompleteLaw,
      onBackToMap: handleBackToMap,
    };

    switch (currentLaw) {
      case 1:
        return <LawOne {...lawProps} />;
      case 2:
        return <LawTwo {...lawProps} />;
      case 3:
        return <LawThree {...lawProps} />;
      case 4:
        return <LawFour {...lawProps} />;
      case 5:
        return <LawFive {...lawProps} />;
      case 6:
        return <LawSix {...lawProps} />;
      case 7:
        return <LawSeven {...lawProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <AnimatePresence mode="wait">
        {currentScreen === "onboarding" && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="h-full overflow-hidden"
          >
            <Onboarding onBegin={handleBeginJourney} />
          </motion.div>
        )}

        {currentScreen === "map" && (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="h-full overflow-auto"
          >
            <JourneyMap unlockedLaw={unlockedLaw} onSelectLaw={handleSelectLaw} />
          </motion.div>
        )}

        {currentScreen === "law" && (
          <motion.div
            key={`law-${currentLaw}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="h-full overflow-hidden"
          >
            {getLawComponent()}
          </motion.div>
        )}

        {currentScreen === "completion" && (
          <motion.div
            key="completion"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-full overflow-hidden"
          >
            <Completion onReturnHome={handleReturnHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}