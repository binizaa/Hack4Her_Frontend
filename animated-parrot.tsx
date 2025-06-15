"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const parrotStates = [
  {
    id: "hablando",
    name: "Hablando",
    images: ["/images/habla1.png", "/images/habla2.png"], // G1 ↔ G2
    color: "bg-blue-100",
    description: "¡Hola! ¿Cómo estás?",
    loopSpeed: 800,
  },
  {
    id: "contento",
    name: "Contento",
    images: ["/images/habla1.png", "/images/habla2.png", "/images/excelente.png"], // G1 → G2 → G3
    color: "bg-yellow-100",
    description: "¡Estoy súper feliz!",
    loopSpeed: 600,
  },
  {
    id: "triste",
    name: "Triste",
    images: ["/images/g6-desepcionado.png", "/images/g5-triste.png"], // G6 ↔ G5
    color: "bg-gray-100",
    description: "Me siento un poco triste...",
    loopSpeed: 1200,
  },
  {
    id: "excelente",
    name: "Excelente",
    images: ["/images/excelente.png"], // G3 estático
    color: "bg-green-100",
    description: "¡Fantástico! ¡Genial!",
    loopSpeed: 0,
  },
  {
    id: "tranquilo",
    name: "Tranquilo",
    images: ["/images/bien.png"], // G4 estático
    color: "bg-emerald-100",
    description: "Todo está bien...",
    loopSpeed: 0,
  },
  {
    id: "decepcionado",
    name: "Decepcionado",
    images: ["/images/desepcionado.png"], // G6 estático
    color: "bg-red-100",
    description: "¡Ay, qué decepción!",
    loopSpeed: 0,
  },
]

export default function AnimatedParrot() {
  const [currentState, setCurrentState] = useState(0)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)

  const currentParrot = parrotStates[currentState]

  // Loop para cambiar frames dentro del estado actual
  useEffect(() => {
    if (currentParrot.images.length > 1 && currentParrot.loopSpeed > 0) {
      const frameInterval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % currentParrot.images.length)
      }, currentParrot.loopSpeed)

      return () => clearInterval(frameInterval)
    } else {
      setCurrentFrame(0)
    }
  }, [currentState, currentParrot.images.length, currentParrot.loopSpeed])

  // Auto play para cambiar entre estados
  useEffect(() => {
    if (isAutoPlay) {
      const stateInterval = setInterval(() => {
        setCurrentState((prev) => (prev + 1) % parrotStates.length)
      }, 3000) // Cambia de estado cada 3 segundos
      return () => clearInterval(stateInterval)
    }
  }, [isAutoPlay])

  // Reset frame cuando cambia el estado
  useEffect(() => {
    setCurrentFrame(0)
  }, [currentState])

  const currentImage = currentParrot.images[currentFrame]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">🦜 Loro Animado</CardTitle>
          <p className="text-gray-600">Mira cómo el loro hace diferentes animaciones</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Área principal del loro */}
          <motion.div
            className={`relative rounded-2xl p-8 ${currentParrot.color} transition-colors duration-500`}
            layout
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
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
                    className="relative"
                  >
                    <Image
                      src={currentImage || "/placeholder.svg"}
                      alt={`${currentParrot.name} frame ${currentFrame + 1}`}
                      width={200}
                      height={200}
                      className="drop-shadow-lg"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Indicador de animación activa */}
                {currentParrot.images.length > 1 && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  />
                )}
              </div>

              <motion.div
                className="text-center"
                key={`text-${currentParrot.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentParrot.name}
                  {currentParrot.images.length > 1 && (
                    <span className="text-sm text-gray-500 ml-2">(Animando {currentParrot.images.length} frames)</span>
                  )}
                </h3>
                <motion.p
                  className="text-lg text-gray-600 italic"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  "{currentParrot.description}"
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Controles */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <Button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                variant={isAutoPlay ? "destructive" : "default"}
                size="lg"
              >
                {isAutoPlay ? "⏸️ Pausar Auto" : "▶️ Auto Play"}
              </Button>
            </div>

            {/* Botones de estados */}
            <div className="grid grid-cols-2 gap-2">
              {parrotStates.map((state, index) => (
                <Button
                  key={state.id}
                  onClick={() => {
                    setCurrentState(index)
                    setIsAutoPlay(false)
                  }}
                  variant={currentState === index ? "default" : "outline"}
                  size="sm"
                  className="text-xs relative"
                >
                  {state.name}
                  {state.images.length > 1 && (
                    <span className="ml-1 text-xs bg-green-500 text-white rounded-full px-1">
                      {state.images.length}
                    </span>
                  )}
                </Button>
              ))}
            </div>

            {/* Información del estado actual */}
            <div className="text-center text-sm text-gray-600 bg-white/50 rounded-lg p-3">
              <p>
                <strong>Estado actual:</strong> {currentParrot.name}
              </p>
              {currentParrot.images.length > 1 ? (
                <p>
                  <strong>Animación:</strong> {currentParrot.images.length} frames (velocidad: {currentParrot.loopSpeed}
                  ms)
                </p>
              ) : (
                <p>
                  <strong>Imagen estática</strong>
                </p>
              )}
            </div>

            {/* Indicadores de estado */}
            <div className="flex justify-center space-x-2">
              {parrotStates.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    currentState === index ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setCurrentState(index)
                    setIsAutoPlay(false)
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
