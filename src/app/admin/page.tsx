"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  MapPin,
  Calendar,
  Activity,
} from "lucide-react";

const campaignStats = {
  totalUsers: 1247,
  activeUsers: 892,
  completedChallenges: 3456,
  totalEngagement: 78,
  averagePoints: 1340,
};

const regionData = [
  { region: "Quito", stores: 342, engagement: 82, avgPoints: 1450 },
  { region: "Guayaquil", stores: 298, engagement: 75, avgPoints: 1320 },
  { region: "Cuenca", stores: 156, engagement: 88, avgPoints: 1580 },
  { region: "Ambato", stores: 123, engagement: 71, avgPoints: 1290 },
  { region: "Machala", stores: 89, engagement: 79, avgPoints: 1380 },
];

const challengePerformance = [
  { challenge: "Diversificar Inventario", completion: 67, participants: 456 },
  { challenge: "Explorar Nuevos Productos", completion: 54, participants: 389 },
  { challenge: "Optimizar Volumen", completion: 78, participants: 523 },
  { challenge: "Bundle Productos", completion: 43, participants: 234 },
];

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#c31f39]">
                Panel Admin - Tuali
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-[#c31f39]">Arca Continental</Badge>
              <span className="text-sm text-gray-600">Admin Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Usuarios Totales
                  </p>
                  <p className="text-3xl font-bold text-[#c31f39]">
                    {campaignStats.totalUsers}
                  </p>
                </div>
                <Users className="w-8 h-8 text-[#c31f39]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Usuarios Activos
                  </p>
                  <p className="text-3xl font-bold text-[#c31f39]">
                    {campaignStats.activeUsers}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-[#c31f39]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Desafíos Completados
                  </p>
                  <p className="text-3xl font-bold text-[#c31f39]">
                    {campaignStats.completedChallenges}
                  </p>
                </div>
                <Target className="w-8 h-8 text-[#c31f39]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Engagement Promedio
                  </p>
                  <p className="text-3xl font-bold text-[#c31f39]">
                    {campaignStats.totalEngagement}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#c31f39]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="regions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="regions">Análisis Regional</TabsTrigger>
            <TabsTrigger value="challenges">
              Rendimiento de Desafíos
            </TabsTrigger>
            <TabsTrigger value="impact">Impacto de Campaña</TabsTrigger>
          </TabsList>

          <TabsContent value="regions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#c31f39]" />
                  <span>Distribución Regional</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionData.map((region, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold text-[#c31f39]">
                          {region.region}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {region.stores} tiendas
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Engagement</p>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={region.engagement}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">
                            {region.engagement}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Puntos Promedio</p>
                        <p className="text-lg font-semibold">
                          {region.avgPoints}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          className={`${
                            region.engagement > 80
                              ? "bg-green-100 text-green-800"
                              : region.engagement > 70
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {region.engagement > 80
                            ? "Excelente"
                            : region.engagement > 70
                            ? "Bueno"
                            : "Mejorable"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-[#c31f39]" />
                  <span>Rendimiento de Desafíos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {challengePerformance.map((challenge, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{challenge.challenge}</h3>
                        <span className="text-sm text-gray-600">
                          {challenge.participants} participantes
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Progress
                          value={challenge.completion}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-12">
                          {challenge.completion}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-[#c31f39]" />
                    <span>Impacto en Ventas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">
                        Incremento Promedio en Ventas
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        +15.3%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">
                        Diversificación de Inventario
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        +23%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">
                        Adopción de Nuevos Productos
                      </span>
                      <span className="text-2xl font-bold text-purple-600">
                        +18%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-[#c31f39]" />
                    <span>Métricas de Retención</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Retención Semanal</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Retención Mensual</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress value={65} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">
                          Usuarios Activos Diarios
                        </span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <Progress value={42} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
