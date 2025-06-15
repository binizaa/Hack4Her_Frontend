import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ParrotSmall from "@/components/parrot-small";

interface ChallengeStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: {
    title: string;
    description: string;
    steps: ChallengeStep[];
    reward: number;
    gradientFrom: string;
    gradientTo: string;
  };
  onContinue: () => void;
}

export function ChallengeModal({
  isOpen,
  onClose,
  challenge,
  onContinue,
}: ChallengeModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-[90vw] bg-white rounded-lg p-6">
          <Dialog.Title className="text-2xl font-bold">
            {challenge.title}
          </Dialog.Title>

          <div className="space-y-6 py-4">
            <p className="text-gray-600">{challenge.description}</p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pasos a seguir:</h3>
              {challenge.steps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-start gap-3 p-4 rounded-lg border bg-white/50"
                >
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 mt-1" />
                  )}
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-gray-500">{step.description}</p>
                    <div className="mt-2">
                      <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        +{step.points} puntos
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Recompensa total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {challenge.reward} puntos
                </p>
              </div>
              <Button
                className={`w-full bg-gradient-to-r ${challenge.gradientFrom} ${challenge.gradientTo} hover:shadow-lg transition-all duration-300 border-0`}
                onClick={onContinue}
              >
                <Zap className="w-4 h-4 mr-2" />
                Continuar Reto
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface ChallengeSidebarProps {
  challenge: any;
  onClose: () => void;
}

export default function ChallengeSidebar({
  challenge,
  onClose,
}: ChallengeSidebarProps) {
  if (!challenge) return null;

  const stepsByCategory: Record<string, { title: string; desc: string }[]> = {
    Fácil: [
      { title: "Paso 1", desc: "Haz esto..." },
      { title: "Paso 2", desc: "Haz aquello..." },
    ],
    Medio: [{ title: "Paso 1", desc: "Haz algo más difícil..." }],
    Difícil: [{ title: "Paso 1", desc: "Haz algo desafiante..." }],
  };

  const steps = stepsByCategory[challenge.difficulty] || [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <ParrotSmall />
          <button onClick={onClose} className="text-gray-500">
            Cerrar
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{challenge.title}</h2>
          <ul className="space-y-4">
            {steps.map((step, idx) => (
              <li key={idx} className="p-3 bg-gray-50 rounded-lg border">
                <strong>{step.title}</strong>
                <p>{step.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
