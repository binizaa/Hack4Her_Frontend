import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Target,
  Clock,
  Star,
  CheckCircle,
  Circle,
  Lightbulb,
  TrendingUp,
  Users,
  Award,
  Zap,
  Package,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

// Simulamos datos del reto basado en el ID
const challengeData = {
  id: 1,
  title: "Diversifica tu Inventario",
  description:
    "Añade 5 nuevas categorías de productos a tu inventario esta semana para aumentar tus ventas y atraer más clientes",
  progress: 60,
  reward: 250,
  timeLeft: "3 días",
  difficulty: "Fácil",
  category: "Inventario",
  gradientFrom: "from-[#A4D4D8]",
  gradientTo: "to-[#4DB9E8]",

  steps: [
    {
      id: 1,
      title: "Analiza tu inventario actual",
      description: "Revisa qué categorías de productos ya tienes en tu tienda",
      completed: true,
      points: 50,
    },
    {
      id: 2,
      title: "Identifica categorías faltantes",
      description:
        "Usa nuestras recomendaciones de IA para encontrar oportunidades",
      completed: true,
      points: 50,
    },
    {
      id: 3,
      title: "Añade productos de limpieza",
      description: "Incorpora detergentes, jabones y productos de aseo",
      completed: true,
      points: 50,
    },
    {
      id: 4,
      title: "Incluye productos de cuidado personal",
      description: "Champús, cremas dentales, desodorantes",
      completed: false,
      points: 50,
    },
    {
      id: 5,
      title: "Agrega snacks saludables",
      description: "Frutos secos, barras energéticas, yogurts",
      completed: false,
      points: 50,
    },
  ],

  insights: [
    {
      icon: TrendingUp,
      title: "Potencial de Crecimiento",
      description:
        "Las tiendas que diversifican su inventario ven un aumento promedio del 23% en ventas",
      color: "#F97659",
    },
    {
      icon: Users,
      title: "Atracción de Clientes",
      description:
        "Cada nueva categoría puede atraer 15-20 nuevos clientes por semana",
      color: "#4DB9E8",
    },
    {
      icon: BarChart3,
      title: "Margen de Ganancia",
      description:
        "Los productos de cuidado personal tienen un margen del 35-45%",
      color: "#A4D4D8",
    },
  ],

  tips: [
    "Comienza con productos de alta rotación en cada categoría",
    "Observa qué compran tus competidores cercanos",
    "Pregunta a tus clientes qué productos les gustaría encontrar",
    "Considera el espacio disponible antes de añadir categorías",
  ],
};

export default function ChallengeDetailPage() {
  const completedSteps = challengeData.steps.filter(
    (step) => step.completed
  ).length;
  const totalSteps = challengeData.steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/challenges">
          <Button
            variant="ghost"
            className="mb-4 text-[#c31f39] hover:bg-[#c31f39]/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Retos
          </Button>
        </Link>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#c31f39] to-[#F97659] bg-clip-text text-transparent mb-2">
              {challengeData.title}
            </h1>
            <p className="text-gray-600 text-lg">{challengeData.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge className="bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] text-white">
              <Clock className="w-3 h-3 mr-1" />
              {challengeData.timeLeft}
            </Badge>
            <Badge className="bg-gradient-to-r from-[#F97659] to-[#c31f39] text-white">
              <Star className="w-3 h-3 mr-1" />
              {challengeData.reward} puntos
            </Badge>
            <Badge
              variant="outline"
              className="border-[#A4D4D8] text-[#A4D4D8]"
            >
              {challengeData.difficulty}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          <Card className="border-2 border-[#4DB9E8]/30 bg-gradient-to-r from-[#4DB9E8]/5 to-[#A4D4D8]/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl text-[#1A1926]">
                    Progreso del Reto
                  </span>
                  <p className="text-sm text-gray-600 font-normal">
                    {completedSteps} de {totalSteps} pasos completados
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Progreso General</span>
                  <span className="text-[#4DB9E8] font-bold">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={progressPercentage} className="h-4" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1A1926]">Pasos del Reto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challengeData.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-all duration-300 ${
                      step.completed
                        ? "bg-gradient-to-r from-green-50 to-[#A4D4D8]/20 border-green-200"
                        : "bg-gray-50 border-gray-200 hover:border-[#4DB9E8]/30"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-gradient-to-r from-[#A4D4D8] to-[#4DB9E8]"
                          : "bg-gray-300"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          step.completed ? "text-[#1A1926]" : "text-gray-700"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-[#F97659]" />
                          <span className="text-sm font-medium text-[#c31f39]">
                            +{step.points} puntos
                          </span>
                        </div>

                        {!step.completed && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] hover:shadow-lg transition-all duration-300"
                          >
                            <Zap className="w-4 h-4 mr-1" />
                            Completar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="border-2 border-[#F97659]/30 bg-gradient-to-r from-[#F97659]/5 to-[#c31f39]/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#F97659] to-[#c31f39] rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl bg-gradient-to-r from-[#F97659] to-[#c31f39] bg-clip-text text-transparent">
                  Insights Inteligentes
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {challengeData.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: insight.color }}
                      >
                        <insight.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-[#1A1926] text-sm">
                        {insight.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600">
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mascot Area - Espacio en blanco para la mascota */}
          <Card className="border-2 border-dashed border-[#A4D4D8] bg-gradient-to-br from-[#A4D4D8]/10 to-[#4DB9E8]/10">
            <CardContent className="p-8 text-center">
              <div className="w-full h-48 bg-white/50 rounded-xl border-2 border-dashed border-[#A4D4D8]/50 flex items-center justify-center mb-4">
                <div className="text-center">
                  <Package className="w-12 h-12 text-[#A4D4D8] mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Espacio para la Mascota
                  </p>
                </div>
              </div>

              {/* Mensaje Creativo */}
              <div className="bg-gradient-to-r from-[#c31f39] to-[#F97659] rounded-lg p-4 text-white">
                <h3 className="font-bold text-lg mb-2">
                  ¡Hazlo de manera creativa! 🎨
                </h3>
                <p className="text-sm opacity-90">
                  Tu mascota Tuali te acompaña en cada reto. ¡Mientras más
                  creativo seas en tu enfoque, mejores resultados obtendrás!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tips and Recommendations */}
          <Card className="border-2 border-[#A4D4D8]/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-[#1A1926]">
                <Award className="w-5 h-5 text-[#c31f39]" />
                <span>Tips de Experto</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {challengeData.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-[#A4D4D8]/10 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Challenge Stats */}
          <Card className="border-2 border-[#F97659]/30 bg-gradient-to-r from-[#F97659]/5 to-[#c31f39]/5">
            <CardHeader>
              <CardTitle className="text-[#1A1926]">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Participantes</span>
                  <span className="font-bold text-[#c31f39]">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tasa de Éxito</span>
                  <span className="font-bold text-[#4DB9E8]">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tiempo Promedio</span>
                  <span className="font-bold text-[#F97659]">4.2 días</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tu Posición</span>
                  <span className="font-bold text-[#A4D4D8]">#156</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href={`/challenges/${challengeData.id}`}>
              <Button className="w-full bg-gradient-to-r from-[#c31f39] to-[#F97659] hover:shadow-lg transition-all duration-300 text-lg py-6">
                <Zap className="w-5 h-5 mr-2" />
                Continuar Reto
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full border-[#4DB9E8] text-[#4DB9E8] hover:bg-[#4DB9E8] hover:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Ver Otros Participantes
            </Button>

            <Button
              variant="outline"
              className="w-full border-[#A4D4D8] text-[#A4D4D8] hover:bg-[#A4D4D8] hover:text-white"
            >
              <Target className="w-4 h-4 mr-2" />
              Pausar Reto
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
