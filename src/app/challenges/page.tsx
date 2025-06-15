"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AnimatedParrot from "@/components/animated-parrot";
import { useState, useEffect } from "react";
import { fetchExplorationData } from "@/lib/api";
import { ExplorationData } from "@/lib/api";

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

const activeChallenges: ActiveChallenge[] = [
  {
    id: 1,
    title: "Explorador de Productos",
    description: "Prueba 3 productos recomendados por nuestra IA",
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
        title: "Revisar productos recomendados",
        description:
          "Accede a la sección de recomendaciones de IA y revisa los 3 productos sugeridos para tu inventario.",
        completed: false,
        points: 60,
      },
      {
        id: 2,
        title: "Probar primer producto",
        description:
          "Ordena una muestra del primer producto recomendado y evalúa su calidad y potencial de venta.",
        completed: false,
        points: 60,
      },
      {
        id: 3,
        title: "Documentar experiencia",
        description:
          "Completa el formulario de evaluación con tus observaciones sobre los productos probados.",
        completed: false,
        points: 60,
      },
    ],
  },
  {
    id: 2,
    title: "Activación de Categorías",
    description:
      "Añade 5 nuevas categorías de productos a tu inventario esta semana",
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
        title: "Identificar categorías faltantes",
        description:
          "Revisa el análisis de mercado y selecciona 5 categorías de productos que complementen tu inventario actual.",
        completed: false,
        points: 50,
      },
      {
        id: 2,
        title: "Configurar nuevas categorías",
        description:
          "Crea las nuevas categorías en tu sistema de inventario con nombres y descripciones apropiadas.",
        completed: false,
        points: 100,
      },
      {
        id: 3,
        title: "Añadir productos iniciales",
        description:
          "Agrega al menos 2 productos por cada nueva categoría creada para completar la activación.",
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

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] =
    useState<ActiveChallenge | null>(null);

  const handleStartChallenge = (challenge: ActiveChallenge) => {
    setSelectedChallenge(challenge);
  };

  const handleCloseSidebar = () => {
    setSelectedChallenge(null);
  };
  const [data, setData] = useState<ExplorationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clientId = 1; // Este sería el id del cliente
  const category = "volumen"; // El nombre de la categoría
  // Declaramos la función getData correctamente fuera de useEffect
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchExplorationData(clientId, category);
        console.log(result);  // Asegúrate de que los datos están siendo recibidos correctamente
        setData(result);  // Guardamos los datos en el estado
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);  // Accedemos de forma segura al mensaje
        } else {
          setError("Error desconocido");
        }
      }
    };

    getData();
  }, [clientId, category]);


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
          </div>

          {/* Contenedor del parrot y sidebar - lado derecho */}
          <div className="w-1/2 relative">
            {/* Parrot container - se mueve hacia arriba cuando hay sidebar */}
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
                    className={`w-full bg-gradient-to-r ${selectedChallenge.gradientFrom} ${selectedChallenge.gradientTo} hover:shadow-lg transition-all duration-300 border-0 mt-4`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Comenzar Ahora
                  </Button>
                </div>
              </div>
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
            <Card className="border-2 border-[#A4D4D8]/30">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {completedChallenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-[#A4D4D8]/5 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#A4D4D8] to-[#4DB9E8] rounded-full flex items-center justify-center">
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
          <Card className="border-2 border-[#4DB9E8]/30 bg-gradient-to-r from-[#4DB9E8]/5 to-[#A4D4D8]/5">
            <CardHeader>
              <CardTitle className="text-[#1A1926]">
                Estadísticas de Retos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-[#A4D4D8]/20 to-[#4DB9E8]/20 rounded-xl border border-[#4DB9E8]/30">
                  <div className="text-2xl font-bold text-[#4DB9E8]">12</div>
                  <div className="text-sm text-gray-600">Completados</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-[#F97659]/20 to-[#c31f39]/20 rounded-xl border border-[#F97659]/30">
                  <div className="text-2xl font-bold text-[#c31f39]">3</div>
                  <div className="text-sm text-gray-600">En Progreso</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-[#c31f39]/20 to-[#1A1926]/20 rounded-xl border border-[#c31f39]/30">
                  <div className="text-2xl font-bold text-[#c31f39]">85%</div>
                  <div className="text-sm text-gray-600">Tasa de Éxito</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-[#F97659]/20 to-[#A4D4D8]/20 rounded-xl border border-[#F97659]/30">
                  <div className="text-2xl font-bold text-[#F97659]">1,680</div>
                  <div className="text-sm text-gray-600">Puntos Ganados</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
      <h1>Datos de Exploración</h1>
      {data ? (
        <>
          <h3>{data.nombre}</h3>
          <p>{data.frase}</p>
          <ul>
            {/* Aquí iteramos sobre los productos */}
            {Object.entries(data.productos).map(([key, value], index) => (
              <li key={index}>
                <div>
                  <strong>{key}:</strong> {JSON.stringify(value)}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
    </main>
  );
}
