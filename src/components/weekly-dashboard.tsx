"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Compass, Package } from "lucide-react"

const leagueData = {
  variety: {
    icon: Package,
    title: "Liga de Variedad",
    description: "Diversifica tu inventario",
    progress: 75,
    position: 8,
    total: 45,
    points: 1250,
    challenge: "Añade 3 nuevas categorías de productos esta semana",
  },
  explorer: {
    icon: Compass,
    title: "Liga Explorador",
    description: "Descubre nuevos productos",
    progress: 60,
    position: 12,
    total: 45,
    points: 980,
    challenge: "Prueba 5 productos recomendados por IA",
  },
  volume: {
    icon: Trophy,
    title: "Liga de Volumen",
    description: "Optimiza tus pedidos",
    progress: 85,
    position: 5,
    total: 45,
    points: 1680,
    challenge: "Aumenta el volumen de pedido en productos estrella",
  },
}

const rankings = [
  { name: "Tienda El Sol", points: 2150, badge: "Titán" },
  { name: "Minimarket Luna", points: 2050, badge: "Explorador" },
  { name: "Bodega Central", points: 1980, badge: "Diverso" },
  { name: "Tu Tienda", points: 1680, badge: "Combinado", current: true },
  { name: "Tienda Familiar", points: 1520, badge: "Diverso" },
]

export default function WeeklyDashboard() {
  const [activeTab, setActiveTab] = useState("variety")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-[#c31f39]">Dashboard Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="variety" className="data-[state=active]:bg-[#c31f39] data-[state=active]:text-white">
              Variedad
            </TabsTrigger>
            <TabsTrigger value="explorer" className="data-[state=active]:bg-[#c31f39] data-[state=active]:text-white">
              Explorador
            </TabsTrigger>
            <TabsTrigger value="volume" className="data-[state=active]:bg-[#c31f39] data-[state=active]:text-white">
              Volumen
            </TabsTrigger>
          </TabsList>

          {Object.entries(leagueData).map(([key, league]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <league.icon className="w-8 h-8 text-[#c31f39]" />
                    <div>
                      <h3 className="text-xl font-semibold">{league.title}</h3>
                      <p className="text-gray-600">{league.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso Semanal</span>
                      <span>{league.progress}%</span>
                    </div>
                    <Progress value={league.progress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-[#c31f39]">#{league.position}</div>
                      <div className="text-sm text-gray-600">Posición</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-[#c31f39]">{league.points}</div>
                      <div className="text-sm text-gray-600">Puntos</div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-[#c31f39]">
                    <h4 className="font-semibold text-[#c31f39] mb-2">Desafío Activo</h4>
                    <p className="text-sm">{league.challenge}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Ranking - Tiendas Similares</h4>
                  <div className="space-y-2">
                    {rankings.map((store, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          store.current ? "bg-[#c31f39]/10 border border-[#c31f39]" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index < 3 ? "bg-[#c31f39] text-white" : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className={`font-medium ${store.current ? "text-[#c31f39]" : ""}`}>{store.name}</div>
                            <Badge variant="secondary" className="text-xs">
                              {store.badge}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{store.points}</div>
                          <div className="text-xs text-gray-500">puntos</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
