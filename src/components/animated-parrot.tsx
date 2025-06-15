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
    loopSpeed: 2400,
  },
  {
    id: "emocionado",
    images: ["/imagenesguac/habla1.png", "/imagenesguac/excelente.png"],
    loopSpeed: 1600,
  },
];

export default function AnimatedParrot() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const currentParrot = parrotStates[0]; // Siempre usamos el estado feliz

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

  return (
    <div className="flex items-center justify-center w-[300px] h-[200px] mx-auto">
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
