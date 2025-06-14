import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, Star, Award, Medal, Gem, Trophy, Percent, ShoppingCart, Crown, Zap } from "lucide-react"

const badges = [
  {
    name: "Diverso",
    icon: Star,
    earned: true,
    description: "Variedad en inventario",
    gradientFrom: "from-[#A4D4D8]",
    gradientTo: "to-[#4DB9E8]",
    earnedDate: "Hace 3 días",
  },
  {
    name: "Explorador",
    icon: Award,
    earned: true,
    description: "Nuevos productos",
    gradientFrom: "from-[#F97659]",
    gradientTo: "to-[#c31f39]",
    earnedDate: "Hace 1 semana",
  },
  {
    name: "Titán",
    icon: Medal,
    earned: false,
    description: "Alto volumen",
    gradientFrom: "from-[#c31f39]",
    gradientTo: "to-[#1A1926]",
    progress: 75,
  },
  {
    name: "Combinado",
    icon: Gem,
    earned: true,
    description: "Múltiples logros",
    gradientFrom: "from-[#4DB9E8]",
    gradientTo: "to-[#A4D4D8]",
    earnedDate: "Hace 5 días",
  },
]

const availableRewards = [
  {
    id: 1,
    title: "Descuento 5% en Próximo Pedido",
    description: "Aplica a pedidos mayores a $100",
    cost: 500,
    category: "Descuentos",
    icon: Percent,
    available: true,
    color: "#4DB9E8",
    bgColor: "bg-gradient-to-r from-[#4DB9E8]/10 to-[#A4D4D8]/10",
    borderColor: "border-[#4DB9E8]/30",
  },
  {
    id: 2,
    title: "Descuento 10% en Próximo Pedido",
    description: "Aplica a pedidos mayores a $200",
    cost: 1000,
    category: "Descuentos",
    icon: Percent,
    available: true,
    color: "#F97659",
    bgColor: "bg-gradient-to-r from-[#F97659]/10 to-[#c31f39]/10",
    borderColor: "border-[#F97659]/30",
  },
  {
    id: 3,
    title: "Envío Gratis",
    description: "En tu próximo pedido sin mínimo",
    cost: 300,
    category: "Beneficios",
    icon: ShoppingCart,
    available: true,
    color: "#A4D4D8",
    bgColor: "bg-gradient-to-r from-[#A4D4D8]/10 to-[#4DB9E8]/10",
    borderColor: "border-[#A4D4D8]/30",
  },
  {
    id: 4,
    title: "Descuento 15% Premium",
    description: "Solo para Liga de Oro o superior",
    cost: 2000,
    category: "Premium",
    icon: Crown,
    available: false,
    requirement: "Liga de Oro",
    color: "#c31f39",
    bgColor: "bg-gradient-to-r from-[#c31f39]/10 to-[#1A1926]/10",
    borderColor: "border-[#c31f39]/30",
  },
]

const rewardHistory = [
  {
    title: "Descuento 5% aplicado",
    date: "15 Nov 2024",
    points: -500,
    status: "Usado",
    color: "#4DB9E8",
  },
  {
    title: "Envío gratis canjeado",
    date: "10 Nov 2024",
    points: -300,
    status: "Usado",
    color: "#A4D4D8",
  },
  {
    title: "Reto completado",
    date: "8 Nov 2024",
    points: +250,
    status: "Ganado",
    color: "#F97659",
  },
  {
    title: "Liga ascendida",
    date: "5 Nov 2024",
    points: +500,
    status: "Ganado",
    color: "#c31f39",
  },
]

export default function RewardsPage() {
  const currentPoints = 1680
  const maxPoints = 2000

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#c31f39] to-[#F97659] bg-clip-text text-transparent mb-2">
          Recompensas y Beneficios
        </h1>
        <p className="text-gray-600">Canjea tus puntos por descuentos y beneficios exclusivos</p>
      </div>

      {/* Points Summary */}
      <Card className="mb-8 bg-gradient-to-r from-[#c31f39] via-[#F97659] to-[#4DB9E8] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <CardContent className="p-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold">{currentPoints.toLocaleString()}</div>
              <div className="text-sm opacity-90">Puntos Disponibles</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold">12</div>
              <div className="text-sm opacity-90">Recompensas Canjeadas</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold">4</div>
              <div className="text-sm opacity-90">Medallas Obtenidas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Rewards */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-[#1A1926]">Recompensas Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableRewards.map((reward) => (
              <Card
                key={reward.id}
                className={`${reward.bgColor} border-2 ${reward.borderColor} ${
                  !reward.available ? "opacity-60" : "hover:shadow-xl transition-all duration-300"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                        reward.available ? "" : "grayscale"
                      }`}
                      style={{ backgroundColor: reward.color }}
                    >
                      <reward.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge
                      className={`text-xs ${
                        reward.category === "Premium"
                          ? "bg-[#c31f39]/20 text-[#c31f39] border border-[#c31f39]/30"
                          : reward.category === "Descuentos"
                            ? "bg-[#4DB9E8]/20 text-[#4DB9E8] border border-[#4DB9E8]/30"
                            : "bg-[#A4D4D8]/20 text-[#A4D4D8] border border-[#A4D4D8]/30"
                      }`}
                    >
                      {reward.category}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg mb-2 text-[#1A1926]">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-[#F97659]" />
                      <span className="font-bold text-[#c31f39]">{reward.cost} puntos</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className={`w-full ${
                      reward.available && currentPoints >= reward.cost
                        ? "bg-gradient-to-r from-[#c31f39] to-[#F97659] hover:shadow-lg"
                        : "bg-gray-400"
                    } transition-all duration-300`}
                    disabled={!reward.available || currentPoints < reward.cost}
                  >
                    {!reward.available ? (
                      "No Disponible"
                    ) : currentPoints < reward.cost ? (
                      "Puntos Insuficientes"
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-1" />
                        Canjear
                      </>
                    )}
                  </Button>

                  {!reward.available && reward.requirement && (
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                      <Crown className="w-3 h-3 mr-1" />
                      Requisito: {reward.requirement}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reward History */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 text-[#1A1926]">Historial de Recompensas</h2>
            <Card className="border-2 border-[#4DB9E8]/30">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {rewardHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.points > 0 ? (
                            <Star className="w-5 h-5 text-white" />
                          ) : (
                            <Gift className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-[#1A1926]">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${item.points > 0 ? "text-[#4DB9E8]" : "text-[#F97659]"}`}>
                          {item.points > 0 ? "+" : ""}
                          {item.points}
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            item.status === "Usado"
                              ? "text-[#F97659] border-[#F97659]/30"
                              : "text-[#4DB9E8] border-[#4DB9E8]/30"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Badges and Progress */}
        <div className="space-y-6">
          {/* Badge System */}
          <Card className="border-2 border-[#A4D4D8]/30 bg-gradient-to-r from-[#A4D4D8]/5 to-[#4DB9E8]/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-[#1A1926]">
                <Medal className="w-5 h-5 text-[#c31f39]" />
                <span>Sistema de Medallas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      badge.earned
                        ? "bg-gradient-to-r from-green-50 to-[#A4D4D8]/20 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                          badge.earned ? `bg-gradient-to-br ${badge.gradientFrom} ${badge.gradientTo}` : "bg-gray-400"
                        }`}
                      >
                        <badge.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[#1A1926]">{badge.name}</div>
                        <div className="text-sm text-gray-600">{badge.description}</div>
                        {badge.earned ? (
                          <div className="text-xs text-green-600 mt-1 flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Obtenida {badge.earnedDate}
                          </div>
                        ) : (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#1A1926] font-medium">Progreso</span>
                              <span className="text-[#F97659] font-bold">{badge.progress}%</span>
                            </div>
                            <div className="relative">
                              <Progress value={badge.progress} className="h-2" />
                              <div
                                className={`absolute inset-0 bg-gradient-to-r ${badge.gradientFrom} ${badge.gradientTo} rounded-full transition-all duration-500`}
                                style={{ width: `${badge.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Points Progress */}
          <Card className="border-2 border-[#F97659]/30 bg-gradient-to-r from-[#F97659]/5 to-[#c31f39]/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-[#1A1926]">
                <Star className="w-5 h-5 text-[#c31f39]" />
                <span>Progreso de Puntos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#c31f39] to-[#F97659] bg-clip-text text-transparent">
                    {currentPoints}
                  </div>
                  <div className="text-sm text-gray-600">Puntos Actuales</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#1A1926] font-medium">Límite mensual (2% del costo)</span>
                    <span className="text-[#F97659] font-bold">
                      {currentPoints} / {maxPoints}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={(currentPoints / maxPoints) * 100} className="h-4" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#c31f39] to-[#F97659] rounded-full transition-all duration-500"
                      style={{ width: `${(currentPoints / maxPoints) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-[#4DB9E8]/20 to-[#A4D4D8]/20 rounded-lg border border-[#4DB9E8]/30">
                  <p className="text-sm text-[#1A1926] font-medium flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-[#4DB9E8]" />
                    Tip: Los puntos se renuevan cada mes. ¡Úsalos antes de que expire el período!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-2 border-[#4DB9E8]/30">
            <CardHeader>
              <CardTitle className="text-[#1A1926]">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-[#c31f39] to-[#F97659] hover:shadow-lg transition-all duration-300">
                <Gift className="w-4 h-4 mr-2" />
                Ver Todos los Descuentos
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#4DB9E8] text-[#4DB9E8] hover:bg-[#4DB9E8] hover:text-white"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Historial Completo
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#A4D4D8] text-[#A4D4D8] hover:bg-[#A4D4D8] hover:text-white"
              >
                <Award className="w-4 h-4 mr-2" />
                Reglas del Programa
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
