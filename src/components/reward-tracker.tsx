import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Gift, Star, Award, Medal } from "lucide-react"

const badges = [
  { name: "Diverso", icon: Star, earned: true, description: "Variedad en inventario" },
  { name: "Explorador", icon: Award, earned: true, description: "Nuevos productos" },
  { name: "Titán", icon: Medal, earned: false, description: "Alto volumen" },
  { name: "Combinado", icon: Gift, earned: true, description: "Múltiples logros" },
]

export default function RewardTracker() {
  const currentPoints = 1680
  const maxPoints = 2000
  const progressPercentage = (currentPoints / maxPoints) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gift className="w-5 h-5 text-[#c31f39]" />
          <span>Recompensas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Puntos Acumulados</span>
            <span className="text-lg font-bold text-[#c31f39]">{currentPoints}</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>Límite: 2% del costo del producto</span>
            <span>{maxPoints}</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Sistema de Medallas</h4>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border text-center ${
                  badge.earned
                    ? "bg-[#c31f39]/10 border-[#c31f39] text-[#c31f39]"
                    : "bg-gray-50 border-gray-200 text-gray-400"
                }`}
              >
                <badge.icon className={`w-6 h-6 mx-auto mb-1 ${badge.earned ? "text-[#c31f39]" : "text-gray-400"}`} />
                <div className="text-xs font-medium">{badge.name}</div>
                <div className="text-xs opacity-75">{badge.description}</div>
                {badge.earned && <Badge className="mt-1 bg-[#c31f39] text-white text-xs">✓ Obtenida</Badge>}
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-1">
            <Gift className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Próxima Recompensa</span>
          </div>
          <p className="text-xs text-green-700">Descuento del 5% en tu próximo pedido al alcanzar 2000 puntos</p>
        </div>
      </CardContent>
    </Card>
  )
}
