"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AnimatedParrot from "@/components/animated-parrot";
import { useState, useEffect } from "react";
import { fetchExplorationData } from "@/lib/api";
import { ExplorationData } from "@/lib/api";
import { useUser } from "@/context/UserContext";

import {
  Target,
  Clock,
  Star,
  Package,
  TrendingUp,
  CheckCircle,
  Zap,
  Award,
  Trophy,
  X,
  Circle,
} from "lucide-react";

interface ChallengeStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

interface ActiveChallenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  reward: number;
  timeLeft: string;
  difficulty: string;
  icon: any;
  gradientFrom: string;
  gradientTo: string;
  bgColor: string;
  borderColor: string;
  steps: ChallengeStep[];
}

interface CompletedChallenge {
  title: string;
  completedDate: string;
  reward: number;
  icon: any;
}

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] =
    useState<ActiveChallenge | null>(null);
  const [dataExplo, setDataExplo] = useState<ExplorationData | null>(null);
  const [dataVolumen, setDataVolumen] = useState<ExplorationData | null>(null);
  const [dataActivacion, setDataActivacion] = useState<ExplorationData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const { currentUserId: clientId } = useUser();

  const activeChallenges: ActiveChallenge[] = [
    {
      id: 1,
      title: dataExplo ? dataExplo.nombre : "Explorador de Productos",
      description:
        "Descubre y prueba nuevos productos recomendados para tu tienda. ¡Amplía tu catálogo y encuentra las mejores opciones para tus clientes!",
      progress: 0,
      reward: 180,
      timeLeft: "25 días",
      difficulty: "Explorador",
      icon: TrendingUp,
      gradientFrom: "from-[#F97659]",
      gradientTo: "to-[#c31f39]",
      bgColor: "bg-gradient-to-r from-[#F97659]/10 to-[#c31f39]/10",
      borderColor: "border-[#F97659]/30",
      steps: [
        {
          id: 1,
          title: dataExplo
            ? `Probar ${dataExplo.productos.producto}`
            : "Probar Dasani",
          description: dataExplo
            ? `Ordena una muestra de ${dataExplo.productos.producto} y evalúa su calidad.`
            : "Ordena una muestra de agua purificada Dasani y evalúa su calidad.",
          completed: false,
          points: 60,
        },
        {
          id: 2,
          title: "Probar primer producto",
          description: dataExplo
            ? `Ordena una muestra de ${dataExplo.productos.producto} y evalúa su calidad y potencial de venta.`
            : "Ordena una muestra del primer producto recomendado y evalúa su calidad y potencial de venta.",
          completed: false,
          points: 60,
        },
        {
          id: 3,
          title: "Documentar experiencia",
          description: dataExplo
            ? `Completa el formulario de evaluación con tus observaciones sobre ${dataExplo.productos.producto}.`
            : "Completa el formulario de evaluación con tus observaciones sobre los productos probados.",
          completed: false,
          points: 60,
        },
      ],
    },
    {
      id: 2,
      title: dataVolumen ? dataVolumen.nombre : "Volumen inteligente",
      description:
        "Aumenta tu volumen de pedidos de forma inteligente. Nuestra IA te ayuda a identificar las cantidades óptimas para obtener los mejores precios y mejorar tu flujo de caja",
      progress: 0,
      reward: 250,
      timeLeft: "15 días",
      difficulty: "Activación",
      icon: Package,
      gradientFrom: "from-[#A4D4D8]",
      gradientTo: "to-[#4DB9E8]",
      bgColor: "bg-gradient-to-r from-[#A4D4D8]/10 to-[#4DB9E8]/10",
      borderColor: "border-[#4DB9E8]/30",
      steps: [
        {
          id: 1,
          title: dataVolumen
            ? `Implementar ${dataVolumen.productos.producto_recomendado}`
            : "Identificar categorías faltantes",
          description: dataVolumen
            ? `Aumenta el volumen de ${dataVolumen.productos.producto_recomendado} según las recomendaciones.`
            : "Revisa el análisis de mercado y selecciona 5 categorías de productos.",
          completed: false,
          points: 50,
        },
        {
          id: 2,
          title: "Configurar nuevas categorías",
          description: dataVolumen
            ? `Configura el inventario para manejar el volumen de ${dataVolumen.productos.producto_recomendado}.`
            : "Crea las nuevas categorías en tu sistema de inventario con nombres y descripciones apropiadas.",
          completed: false,
          points: 100,
        },
        {
          id: 3,
          title: "Añadir productos iniciales",
          description: dataVolumen
            ? `Implementa el plan de volumen para ${dataVolumen.productos.producto_recomendado}.`
            : "Agrega al menos 2 productos por cada nueva categoría creada para completar la activación.",
          completed: false,
          points: 100,
        },
      ],
    },
    {
      id: 3,
      title: "Volumen Inteligente",
      description:
        "Aumenta el volumen de pedido en tus productos estrella en un 15%",
      progress: 0,
      reward: 320,
      timeLeft: "30 días",
      difficulty: "Volumen",
      icon: Star,
      gradientFrom: "from-[#c31f39]",
      gradientTo: "to-[#1A1926]",
      bgColor: "bg-gradient-to-r from-[#c31f39]/10 to-[#1A1926]/10",
      borderColor: "border-[#c31f39]/30",
      steps: [
        {
          id: 1,
          title: "Analizar productos estrella",
          description:
            "Identifica tus 10 productos con mejor rendimiento usando las métricas de la plataforma.",
          completed: false,
          points: 80,
        },
        {
          id: 2,
          title: "Calcular volumen objetivo",
          description:
            "Determina el volumen de pedido necesario para alcanzar el incremento del 15% en cada producto.",
          completed: false,
          points: 120,
        },
        {
          id: 3,
          title: "Implementar estrategia",
          description:
            "Ejecuta la estrategia de incremento de volumen y monitorea los resultados semanalmente.",
          completed: false,
          points: 120,
        },
      ],
    },
  ];

  const completedChallenges: CompletedChallenge[] = [
    {
      title: "Primer Pedido Optimizado",
      completedDate: "Hace 2 días",
      reward: 100,
      icon: CheckCircle,
    },
    {
      title: "Registro Completo",
      completedDate: "Hace 1 semana",
      reward: 50,
      icon: CheckCircle,
    },
    {
      title: "Explorador Novato",
      completedDate: "Hace 2 semanas",
      reward: 150,
      icon: CheckCircle,
    },
  ];

  const handleStartChallenge = (challenge: ActiveChallenge) => {
    setSelectedChallenge(challenge);
    console.log("Reto seleccionado:", challenge.title);
  };

  const handleCloseSidebar = () => {
    setSelectedChallenge(null);
    setShowNotificationPopup(false);
    console.log("Sidebar cerrado. Popup de notificaciones oculto.");
  };

  const handleComenzarAhora = () => {
    if (selectedChallenge?.id === 2) {
      setShowNotificationPopup(true);
      console.log(
        "Botón Comenzar Ahora clicado para Reto de Volumen. showNotificationPopup: true"
      );
    } else {
      console.log(
        "Botón Comenzar Ahora clicado para otro reto. No se muestra el popup de notificaciones."
      );
    }
    // Aquí podrías agregar lógica adicional que necesites cuando se inicie el reto
  };

  const category = "volumen"; // El nombre de la categoría

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [exploResult, volumenResult, activacionResult] =
          await Promise.all([
            fetchExplorationData(clientId, "exploracion"),
            fetchExplorationData(clientId, "volumen"),
            fetchExplorationData(clientId, "activacion"),
          ]);

        setDataExplo(exploResult);
        setDataVolumen(volumenResult);
        setDataActivacion(activacionResult);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [clientId]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#c31f39] to-[#F97659] bg-clip-text text-transparent mb-2">
          Retos y Desafíos
        </h1>
        <p className="text-gray-600">
          Completa retos personalizados y gana puntos para tu tienda
        </p>
      </div>

      {/* Active Challenges */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-[#1A1926]">
          <div className="w-8 h-8 bg-gradient-to-r from-[#c31f39] to-[#F97659] rounded-lg flex items-center justify-center mr-3">
            <Target className="w-5 h-5 text-white" />
          </div>
          Retos Activos
        </h2>

        {/* Contenedor principal con flex */}
        <div className="flex gap-8 mb-8">
          {/* Contenedor scrollable - lado izquierdo */}
          <div
            className={`${
              selectedChallenge ? "w-1/2" : "w-1/2"
            } h-[70vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[#F97659] scrollbar-track-gray-100`}
          >
            {isLoading ? (
              <div className="grid grid-cols-1 gap-8">
                {[1, 2, 3].map((index) => (
                  <Card
                    key={index}
                    className="border-2 border-gray-200 animate-pulse"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                        <div className="w-20 h-6 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-6 w-3/4 bg-gray-200 rounded mt-4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-3 w-full bg-gray-200 rounded"></div>
                        <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                        <div className="h-10 w-full bg-gray-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center p-8">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-red-500 font-medium">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-500 hover:bg-red-600"
                >
                  Reintentar
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {activeChallenges.map((challenge) => (
                  <Card
                    key={challenge.id}
                    className={`border-2 ${challenge.borderColor} ${
                      challenge.bgColor
                    } hover:shadow-xl transition-all duration-300 ${
                      selectedChallenge?.id === challenge.id
                        ? "ring-2 ring-[#F97659] ring-opacity-50"
                        : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${challenge.gradientFrom} ${challenge.gradientTo} rounded-xl flex items-center justify-center shadow-lg`}
                        >
                          <challenge.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-[#F97659] text-[#F97659]"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {challenge.timeLeft}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-[#1A1926]">
                        {challenge.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        {challenge.description}
                      </p>

                      {/* Información adicional para el reto de exploración */}
                      {challenge.id === 1 && dataExplo && (
                        <div className="bg-white/50 rounded-lg p-3 border border-[#F97659]/20 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-[#F97659]" />
                              <span className="text-sm font-bold text-[#c31f39]">
                                Producto Recomendado
                              </span>
                            </div>
                            <Badge className="text-xs bg-[#F97659]/20 text-[#F97659] border border-[#F97659]/30">
                              {dataExplo.productos.categoria}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-[#1A1926]">
                              {dataExplo.productos.producto}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                Cantidad estimada:
                              </span>
                              <span className="text-xl font-bold text-[#c31f39]">
                                {dataExplo.productos.cantidad_estimada} unidades
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Información adicional para el reto de volumen */}
                      {challenge.id === 2 && dataVolumen && (
                        <div className="bg-white/50 rounded-lg p-3 border border-[#4DB9E8]/20 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-[#4DB9E8]" />
                              <span className="text-sm font-bold text-[#4DB9E8]">
                                Aumenta tus ventas con este reto!!!
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-[#1A1926]">
                              {dataVolumen.productos.producto_recomendado}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                Volumen estimado:
                              </span>
                              <span className="text-xl font-bold text-[#4DB9E8]">
                                {dataVolumen.productos.volumen_estimado}{" "}
                                unidades
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-[#1A1926] font-medium">
                              Progreso
                            </span>
                            <span className="text-[#F97659] font-bold">
                              {challenge.progress}%
                            </span>
                          </div>
                          <div className="relative">
                            <Progress
                              value={challenge.progress}
                              className="h-3"
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${challenge.gradientFrom} ${challenge.gradientTo} rounded-full transition-all duration-500`}
                              style={{ width: `${challenge.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-[#F97659]" />
                            <span className="text-sm font-bold text-[#c31f39]">
                              {challenge.reward} puntos
                            </span>
                          </div>
                          <Badge
                            className={`text-xs ${
                              challenge.difficulty === "Fácil"
                                ? "bg-[#A4D4D8]/20 text-[#4DB9E8] border border-[#4DB9E8]/30"
                                : challenge.difficulty === "Medio"
                                ? "bg-[#F97659]/20 text-[#F97659] border border-[#F97659]/30"
                                : "bg-[#c31f39]/20 text-[#c31f39] border border-[#c31f39]/30"
                            }`}
                          >
                            {challenge.difficulty}
                          </Badge>
                        </div>

                        <Button
                          onClick={() => handleStartChallenge(challenge)}
                          className={`w-full bg-gradient-to-r ${challenge.gradientFrom} ${challenge.gradientTo} hover:shadow-lg transition-all duration-300 border-0`}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          {selectedChallenge?.id === challenge.id
                            ? "Reto Seleccionado"
                            : "Iniciar Reto"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Contenedor del parrot y sidebar - lado derecho */}
          <div className="w-1/2 relative">
            {!isLoading && !error && (
              <>
                {/* Mensaje del loro - aparece sobre el loro */}
                {selectedChallenge && (
                  <div className="absolute top-[23vh] left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-yellow-50 p-2 rounded-lg shadow-md border border-yellow-200 max-w-xs mx-auto transform transition-all duration-500 ease-in-out opacity-100 translate-y-0">
                      <p className="text-gray-800 font-medium italic text-center text-sm">
                        {selectedChallenge.id === 1
                          ? "¡Pío! ¡Descubre Dasani, la agua purificada perfecta para tu tienda! ¡Atrévete a probarlo!"
                          : selectedChallenge.id === 2 && dataVolumen
                          ? `¡Pío! ¡Aumenta tus ventas con ${dataVolumen.productos.producto_recomendado}! ¡Optimiza tu inventario y mejora tus márgenes!`
                          : "¡Pío! ¡Vamos a completar este reto juntos! ¡Tú puedes!"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Parrot container */}
                <div
                  className={`sticky top-0 transition-all duration-500 ${
                    selectedChallenge ? "h-[30vh] -translate-y-4" : "h-[50vh]"
                  } flex items-center justify-center`}
                >
                  <div className="space-y-6">
                    <div className="">
                      <AnimatedParrot size="xlarge" emotion="neutral" />
                    </div>
                  </div>
                </div>

                {/* Challenge Sidebar */}
                {selectedChallenge && (
                  <div className="absolute top-[35vh] left-0 right-0 bg-white rounded-lg shadow-xl border-2 border-[#F97659]/30 p-6 max-h-[60vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${selectedChallenge.gradientFrom} ${selectedChallenge.gradientTo} rounded-lg flex items-center justify-center`}
                        >
                          <selectedChallenge.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1A1926]">
                          {selectedChallenge.title}
                        </h3>
                      </div>
                      <button
                        onClick={handleCloseSidebar}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {selectedChallenge.description}
                      </p>

                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#F97659]/10 to-[#c31f39]/10 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-[#F97659]" />
                          <span className="text-sm font-bold text-[#c31f39]">
                            Recompensa: {selectedChallenge.reward} puntos
                          </span>
                        </div>
                        <Badge
                          className={`text-xs ${
                            selectedChallenge.difficulty === "Fácil"
                              ? "bg-[#A4D4D8]/20 text-[#4DB9E8] border border-[#4DB9E8]/30"
                              : selectedChallenge.difficulty === "Medio"
                              ? "bg-[#F97659]/20 text-[#F97659] border border-[#F97659]/30"
                              : "bg-[#c31f39]/20 text-[#c31f39] border border-[#c31f39]/30"
                          }`}
                        >
                          {selectedChallenge.difficulty}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-[#1A1926]">
                          Pasos a seguir:
                        </h4>
                        <div className="space-y-3">
                          {selectedChallenge.steps?.map((step) => (
                            <div
                              key={step.id}
                              className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                            >
                              <Circle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <h5 className="font-medium text-[#1A1926] mb-1">
                                  {step.title}
                                </h5>
                                <p className="text-sm text-gray-600 mb-2">
                                  {step.description}
                                </p>
                                <Badge className="text-xs bg-[#4DB9E8]/20 text-[#4DB9E8] border border-[#4DB9E8]/30">
                                  +{step.points} puntos
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={handleComenzarAhora}
                        className={`w-full bg-gradient-to-r ${selectedChallenge.gradientFrom} ${selectedChallenge.gradientTo} hover:shadow-lg transition-all duration-300 border-0 mt-4`}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Comenzar Ahora
                      </Button>
                    </div>
                  </div>
                )}

                {/* Contenedor del popup de notificaciones, se muestra por encima del sidebar */}
                {showNotificationPopup &&
                  selectedChallenge?.id === 2 &&
                  (console.log("Popup de notificaciones renderizado."),
                  (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center relative">
                        <button
                          onClick={() => setShowNotificationPopup(false)}
                          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                        <h4 className="text-xl font-bold text-purple-800 mb-3">
                          ¡Reto de Volumen Activado!
                        </h4>
                        <p className="text-gray-700 mb-4">
                          Al completar este reto, ¡recibirás una gran
                          recompensa!
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-purple-700 font-bold text-2xl mb-4">
                          <Star className="w-7 h-7 text-purple-600" />
                          <span>{selectedChallenge.reward} puntos</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-5">
                          ¿Quieres recibir notificaciones sobre tu progreso y
                          recordatorios?
                        </p>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                          Activar Notificaciones
                        </Button>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Completed Challenges & Stats */}
        <div className="space-y-6">
          {/* Completed Challenges */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#1A1926]">
              Retos Completados
            </h2>
            <Card className="border-2 border-[#A4D4D8]/30 bg-gradient-to-r from-[#A4D4D8]/10 to-[#4DB9E8]/10 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A4D4D8] to-[#4DB9E8] rounded-xl flex items-center justify-center shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#4DB9E8] text-[#4DB9E8]"
                  >
                    <Award className="w-3 h-3 mr-1" />
                    Completados
                  </Badge>
                </div>
                <CardTitle className="text-lg text-[#1A1926]">
                  Retos Completados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedChallenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-[#A4D4D8]/20 hover:bg-white/80 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#A4D4D8] to-[#4DB9E8] rounded-full flex items-center justify-center shadow-md">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-[#1A1926]">
                            {challenge.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {challenge.completedDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-[#F97659]" />
                        <span className="text-sm font-bold text-[#c31f39]">
                          +{challenge.reward}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Challenge Stats */}
          <Card className="border-2 border-[#F97659]/30 bg-gradient-to-r from-[#F97659]/10 to-[#c31f39]/10 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F97659] to-[#c31f39] rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <Badge
                  variant="outline"
                  className="text-xs border-[#F97659] text-[#F97659]"
                >
                  <Target className="w-3 h-3 mr-1" />
                  Estadísticas
                </Badge>
              </div>
              <CardTitle className="text-lg text-[#1A1926]">
                Estadísticas de Retos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-[#A4D4D8]/20 to-[#4DB9E8]/20 rounded-xl border-2 border-[#4DB9E8]/30 hover:shadow-md transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#A4D4D8] to-[#4DB9E8] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#4DB9E8]">12</div>
                  <div className="text-sm text-gray-600 font-medium">
                    Completados
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-[#F97659]/20 to-[#c31f39]/20 rounded-xl border-2 border-[#F97659]/30 hover:shadow-md transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#F97659] to-[#c31f39] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#c31f39]">3</div>
                  <div className="text-sm text-gray-600 font-medium">
                    En Progreso
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-[#c31f39]/20 to-[#1A1926]/20 rounded-xl border-2 border-[#c31f39]/30 hover:shadow-md transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#c31f39] to-[#1A1926] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#c31f39]">85%</div>
                  <div className="text-sm text-gray-600 font-medium">
                    Tasa de Éxito
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-[#F97659]/20 to-[#A4D4D8]/20 rounded-xl border-2 border-[#F97659]/30 hover:shadow-md transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#F97659] to-[#A4D4D8] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#F97659]">1,680</div>
                  <div className="text-sm text-gray-600 font-medium">
                    Puntos Ganados
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Data Cards Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-[#1A1926]">
          <div className="w-8 h-8 bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] rounded-lg flex items-center justify-center mr-3">
            <Package className="w-5 h-5 text-white" />
          </div>
          Datos de Productos
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Data Exploración Card */}
          {dataExplo && (
            <div className="grid grid-cols-1 gap-8">
              <Card className="border-2 border-[#F97659]/30 bg-gradient-to-r from-[#F97659]/10 to-[#c31f39]/10 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F97659] to-[#c31f39] rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs border-[#F97659] text-[#F97659]"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      Exploración
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-[#1A1926]">
                    {dataExplo.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {dataExplo.frase}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#1A1926] font-medium">
                          Progreso
                        </span>
                        <span className="text-[#F97659] font-bold">0%</span>
                      </div>
                      <div className="relative">
                        <Progress value={0} className="h-3" />
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-[#F97659] to-[#c31f39] rounded-full transition-all duration-500"
                          style={{ width: `0%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Producto recomendado */}
                    <div className="bg-white/50 rounded-lg p-3 border border-[#F97659]/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-[#F97659]" />
                          <span className="text-sm font-bold text-[#c31f39]">
                            Producto Recomendado
                          </span>
                        </div>
                        <Badge className="text-xs bg-[#F97659]/20 text-[#F97659] border border-[#F97659]/30">
                          {dataExplo.productos.categoria}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-[#1A1926]">
                          {dataExplo.productos.producto}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            Cantidad estimada:
                          </span>
                          <span className="text-xs font-bold text-[#c31f39]">
                            {dataExplo.productos.cantidad_estimada} unidades
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#F97659] to-[#c31f39] hover:shadow-lg transition-all duration-300 border-0">
                      <Zap className="w-4 h-4 mr-2" />
                      Ver Detalles de Exploración
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Data Volumen Card */}
          {dataVolumen && (
            <div className="grid grid-cols-1 gap-8">
              <Card className="border-2 border-[#4DB9E8]/30 bg-gradient-to-r from-[#A4D4D8]/10 to-[#4DB9E8]/10 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#A4D4D8] to-[#4DB9E8] rounded-xl flex items-center justify-center shadow-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs border-[#4DB9E8] text-[#4DB9E8]"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      Volumen
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-[#1A1926]">
                    {dataVolumen.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {dataVolumen.frase}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#1A1926] font-medium">
                          Progreso
                        </span>
                        <span className="text-[#4DB9E8] font-bold">0%</span>
                      </div>
                      <div className="relative">
                        <Progress value={0} className="h-3" />
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-[#A4D4D8] to-[#4DB9E8] rounded-full transition-all duration-500"
                          style={{ width: `0%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Producto recomendado */}
                    <div className="bg-white/50 rounded-lg p-3 border border-[#4DB9E8]/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-[#4DB9E8]" />
                          <span className="text-sm font-bold text-[#4DB9E8]">
                            Aumenta tus ventas con este reto!!!
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-[#1A1926]">
                          {dataVolumen.productos.producto_recomendado}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            Volumen estimado:
                          </span>
                          <span className="text-xs font-bold text-[#4DB9E8]">
                            {dataVolumen.productos.volumen_estimado} unidades
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#A4D4D8] to-[#4DB9E8] hover:shadow-lg transition-all duration-300 border-0">
                      <Zap className="w-4 h-4 mr-2" />
                      Ver Detalles de Volumen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Loading States */}
          {!dataExplo && (
            <div className="grid grid-cols-1 gap-8">
              <Card className="border-2 border-[#F97659]/30 bg-gradient-to-r from-[#F97659]/10 to-[#c31f39]/10">
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F97659] to-[#c31f39] rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-[#1A1926] font-medium">
                      Cargando datos de exploración...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!dataVolumen && (
            <div className="grid grid-cols-1 gap-8">
              <Card className="border-2 border-[#4DB9E8]/30 bg-gradient-to-r from-[#A4D4D8]/10 to-[#4DB9E8]/10">
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#A4D4D8] to-[#4DB9E8] rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-[#1A1926] font-medium">
                      Cargando datos de volumen...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
