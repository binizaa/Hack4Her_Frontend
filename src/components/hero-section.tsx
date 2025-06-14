import { Trophy, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-[#c31f39] to-[#e63946] rounded-2xl p-8 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Liga Tuali</h1>
          <h2 className="text-2xl font-semibold mb-4">El Desafío del Portafolio Perfecto</h2>
          <p className="text-lg mb-6 opacity-90">
            Mejora tu negocio con desafíos personalizados basados en IA. Compite con tiendas similares y gana
            recompensas por optimizar tus compras.
          </p>
          <Button size="lg" className="bg-white text-[#c31f39] hover:bg-gray-100 font-semibold px-8 py-3">
            Ver Mi Progreso
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">15°</div>
              <div className="text-sm opacity-90">Posición General</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm opacity-90">Desafíos Activos</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">+12%</div>
              <div className="text-sm opacity-90">Mejora Semanal</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
