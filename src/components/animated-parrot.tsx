"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const parrotStates = [
  {
    id: "feliz",
    images: ["/imagenesguac/habla1.png", "/imagenesguac/habla2.png"],
    loopSpeed: 3000,
  },
  {
    id: "triste",
    images: [
      "/imagenesguac/g6-desepcionado.png",
      "/imagenesguac/g5-triste.png",
    ],
    loopSpeed: 5000,
  },
  {
    id: "emocionado",
    images: ["/imagenesguac/excelente.png", "/imagenesguac/habla2.png"],
    loopSpeed: 7000,
  },
];

interface AnimatedParrotProps {
  size?: "normal" | "large" | "xlarge";
  emotion?: "happy" | "excited" | "neutral" | "sad";
}

export default function AnimatedParrot({
  size = "normal",
  emotion = "neutral",
}: AnimatedParrotProps) {
  const [currentFrame, setCurrentFrame] = useState(0);

  // Define los estados del loro según la emoción
  const parrotEmotions = {
    happy: parrotStates[0],
    excited: parrotStates[1],
    neutral: parrotStates[2],
    sad: parrotStates[3],
  };

  const currentParrot = parrotEmotions[emotion] || parrotStates[0];

  // Loop para cambiar frames dentro del estado actual
  useEffect(() => {
    if (currentParrot.images.length > 1 && currentParrot.loopSpeed > 0) {
      const frameInterval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % currentParrot.images.length);
      }, currentParrot.loopSpeed);

      return () => clearInterval(frameInterval);
    } else {
      setCurrentFrame(0);
    }
  }, [currentParrot.images.length, currentParrot.loopSpeed]);

  const currentImage = currentParrot.images[currentFrame];

  const sizes = {
    normal: "w-[300px] h-[200px]",
    large: "w-[400px] h-[300px]",
    xlarge: "w-[500px] h-[400px]",
  };

  return (
    <div className={`flex items-center justify-center ${sizes[size]} mx-auto`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentParrot.id}-${currentFrame}`}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0.8 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src={currentImage || "/placeholder.svg"}
            alt="Loro animado"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
