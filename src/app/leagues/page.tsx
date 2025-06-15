'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Award, Gem, Star, Crown } from "lucide-react"
import { getUserCategory } from "@/lib/api"
import { useEffect, useState } from "react";

const leagues = [
  {
    name: "Bronce",
    icon: Medal,
    color: "#CD7F32",
    bgColor: "bg-gradient-to-r from-[#CD7F32]/10 to-[#F97659]/10",
    borderColor: "border-[#CD7F32]/30",
    textColor: "text-[#1A1926]",
    gradientFrom: "from-[#CD7F32]",
    gradientTo: "to-[#F97659]",
    range: "0 - 500 puntos",
    stores: 156,
    description: "Primeros pasos en Tuali",
  },
  {
    name: "Plata",
    icon: Award,
    color: "#C0C0C0",
    bgColor: "bg-gradient-to-r from-[#A4D4D8]/10 to-[#4DB9E8]/10",
    borderColor: "border-[#A4D4D8]",
    textColor: "text-[#1A1926]",
    gradientFrom: "from-[#A4D4D8]",
    gradientTo: "to-[#4DB9E8]",
    range: "501 - 1,500 puntos",
    stores: 89,
    description: "Mejorando constantemente",
    current: true,
  },
  {
    name: "Oro",
    icon: Trophy,
    color: "#FFD700",
    bgColor: "bg-gradient-to-r from-[#F97659]/10 to-[#c31f39]/10",
    borderColor: "border-[#F97659]",
    textColor: "text-[#1A1926]",
    gradientFrom: "from-[#F97659]",
    gradientTo: "to-[#c31f39]",
    range: "1,501 - 3,000 puntos",
    stores: 45,
    description: "Excelencia en gestión",
  },
  {
    name: "Diamante",
    icon: Gem,
    color: "#B9F2FF",
    bgColor: "bg-gradient-to-r from-[#4DB9E8]/10 to-[#A4D4D8]/10",
    borderColor: "border-[#4DB9E8]",
    textColor: "text-[#1A1926]",
    gradientFrom: "from-[#4DB9E8]",
    gradientTo: "to-[#A4D4D8]",
    range: "3,001+ puntos",
    stores: 12,
    description: "Elite de Tuali",
  },
]

const rankings = [
  { name: "Tienda El Sol", points: 2850, league: "Oro", position: 1, color: "#F97659" },
  { name: "Minimarket Luna", points: 2650, league: "Oro", position: 2, color: "#F97659" },
  { name: "Bodega Central", points: 2450, league: "Oro", position: 3, color: "#F97659" },
  { name: "Tienda Familiar", points: 2200, league: "Oro", position: 4, color: "#F97659" },
  { name: "Mi Negocio", points: 1980, league: "Plata", position: 5, color: "#4DB9E8" },
  { name: "Tu Tienda", points: 1680, league: "Plata", position: 12, current: true, color: "#4DB9E8" },
  { name: "Bodega Norte", points: 1520, league: "Plata", position: 15, color: "#4DB9E8" },
  { name: "Tienda Sur", points: 1350, league: "Plata", position: 18, color: "#4DB9E8" },
]

export default function LeaguesPage() {
  const [userCategory, setUserCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener la categoría del usuario
  const fetchUserCategory = async (id: number) => {
    setLoading(true);
    const data = await getUserCategory(id);
    if (data) {
      setUserCategory(data.categoria); // Asignamos la categoría obtenida
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserCategory(1005); 
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#c31f39] to-[#F97659] bg-clip-text text-transparent mb-2">
          Sistema de Ligas
        </h1>
        <p className="text-gray-600">Compite con tiendas similares y asciende de liga</p>
      </div>

      {/* Current League Status */}
      <Card className="mb-8 bg-gradient-to-r from-[#A4D4D8]/10 via-[#4DB9E8]/10 to-[#A4D4D8]/10 border-2 border-[#4DB9E8]/30">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#A4D4D8] to-[#4DB9E8] rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-[#1A1926]">
                  {userCategory ? `Liga de ${userCategory}` : "Cargando Liga..."}
                </h2>
                <Badge className="mt-2 bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Tu Liga Actual
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#c31f39] to-[#F97659] bg-clip-text text-transparent">
                1,680
              </div>
              <div className="text-sm text-gray-600">puntos totales</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* All Leagues */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#1A1926]">Todas las Ligas</h2>
          <div className="space-y-4">
            {leagues.map((league, index) => (
              <Card
                key={index}
                className={`${league.bgColor} border-2 ${league.borderColor} ${
                  league.current ? "ring-2 ring-[#c31f39] shadow-lg" : "hover:shadow-md"
                } transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${league.gradientFrom} ${league.gradientTo} shadow-lg`}
                      >
                        <league.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${league.textColor} flex items-center flex-wrap`}>
                          {league.name}
                          {(league.name == userCategory) && (
                            <span className="ml-3 text-[#c31f39] flex items-center">
                              <Star className="w-4 h-4 mr-1" />
                              Tu Liga
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600 font-medium">{league.description}</p>
                        <p className="text-sm text-gray-500">{league.range}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-3xl font-bold bg-gradient-to-r ${league.gradientFrom} ${league.gradientTo} bg-clip-text text-transparent`}
                      >
                        {league.stores}
                      </div>
                      <div className="text-sm text-gray-500">tiendas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rankings */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#1A1926]">Ranking General</h2>
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div className="space-y-0">
                {rankings.map((store, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 border-b last:border-b-0 transition-all duration-200 ${
                      store.current
                        ? "bg-gradient-to-r from-[#c31f39]/10 to-[#F97659]/10 border-l-4 border-l-[#c31f39] shadow-sm"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
                          index < 3
                            ? index === 0
                              ? "bg-gradient-to-r from-[#F97659] to-[#c31f39] text-white"
                              : index === 1
                                ? "bg-gradient-to-r from-[#A4D4D8] to-[#4DB9E8] text-white"
                                : "bg-gradient-to-r from-[#CD7F32] to-[#F97659] text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {store.position}
                      </div>
                      <div>
                        <div className={`font-medium ${store.current ? "text-[#c31f39] font-bold text-lg" : ""}`}>
                          {store.name}
                          {store.current && <span className="ml-2 text-sm text-[#F97659]">(Tu Tienda)</span>}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs mt-1 ${
                            store.league === "Oro"
                              ? "bg-gradient-to-r from-[#F97659]/20 to-[#c31f39]/20 text-[#c31f39] border border-[#F97659]/30"
                              : store.league === "Plata"
                                ? "bg-gradient-to-r from-[#A4D4D8]/20 to-[#4DB9E8]/20 text-[#4DB9E8] border border-[#4DB9E8]/30"
                                : "bg-gradient-to-r from-[#CD7F32]/20 to-[#F97659]/20 text-[#CD7F32] border border-[#CD7F32]/30"
                          }`}
                        >
                          Liga  {userCategory ? `Liga de ${userCategory}` : "Cargando Liga..."}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl" style={{ color: store.color }}>
                        {store.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">puntos</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
