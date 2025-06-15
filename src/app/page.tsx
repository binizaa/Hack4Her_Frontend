"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

import {
  Trophy,
  Target,
  Gift,
  TrendingUp,
  Calendar,
  Star,
  Zap,
  Award,
} from "lucide-react";
import Link from "next/link";
<<<<<<< Updated upstream
=======
//import ProductQuantities from "@/components/product-quantities";
//import GeminiRecommendation from "@/components/gemini-recommendation";
import AnimatedParrot from "@/components/animated-parrot";
import ProductQuantities from "@/components/product-quantities";
>>>>>>> Stashed changes

export default function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#c31f39] via-[#F97659] to-[#4DB9E8] rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">¡Bienvenida, María!</h1>
            <p className="text-lg mb-6 opacity-90">
              Tu tienda está en la <strong>Liga de Plata</strong>. ¡Sigue
              mejorando para alcanzar el Oro!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/leagues">
                <Button
                  size="lg"
                  className="bg-white text-[#c31f39] hover:bg-gray-100 font-semibold shadow-lg w-full sm:w-auto"
                >
                  Ver Mi Liga
                </Button>
              </Link>
              <Link href="/challenges">
                <Button
                  size="lg"
                  className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-[#c31f39] backdrop-blur-sm font-semibold w-full sm:w-auto"
                >
                  Nuevos Retos
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-[#a4d4d8]/40  border-white/20 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-[#FFF]" />
                <div className="text-white text-2xl font-bold">Plata</div>
                <div className="text-white text-sm opacity-90">Liga Actual</div>
              </CardContent>
            </Card>
            <Card className="bg-[#a4d4d8]/40  border-white/20 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-[#FFF]" />
                <div className="text-white text-2xl font-bold">3</div>
                <div className="text-white text-sm opacity-90">
                  Retos Activos
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-7 grid grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-[#c31f39] hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Puntos Totales
                  </p>
                  <p className="text-3xl font-bold text-[#c31f39]">1,680</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#c31f39] to-[#F97659] rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#4DB9E8] hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Posición</p>
                  <p className="text-3xl font-bold text-[#4DB9E8]">12°</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#4DB9E8] to-[#A4D4D8] rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#F97659] hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Progreso Semanal
                  </p>
                  <p className="text-3xl font-bold text-[#F97659]">75%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#F97659] to-[#c31f39] rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#A4D4D8] hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Días Activos
                  </p>
                  <p className="text-3xl font-bold text-[#A4D4D8]">12</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#A4D4D8] to-[#4DB9E8] rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
<<<<<<< Updated upstream
        <div className="lg:col-span-5 hidden lg:block">
          {/* Espacio reservado para el elemento futuro */}
=======
        <div className="lg:col-span-5">
          {/*<GeminiRecommendation />*/}
          {/* <Tuaimagen /> */}
          {/* <ProductQuantities /> */}
          <AnimatedParrot />
>>>>>>> Stashed changes
        </div>
      </div>

      {/* Progress to Next League */}
      <Card className="mb-8 border-2 border-[#4DB9E8]/20 bg-gradient-to-r from-[#4DB9E8]/5 to-[#A4D4D8]/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FFD700] to-[#F97659] rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <span className="text-xl bg-gradient-to-r from-[#c31f39] to-[#F97659] bg-clip-text text-transparent font-bold">
                Progreso hacia Liga de Oro
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">1,680 / 2,500 puntos</span>
              <span className="text-[#F97659] font-bold">
                820 puntos restantes
              </span>
            </div>
            <div className="relative">
              <Progress value={67} className="h-4" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#4DB9E8] to-[#A4D4D8] rounded-full transition-all duration-500"
                style={{ width: "67%" }}
              ></div>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#A4D4D8]/20 to-[#4DB9E8]/20 rounded-lg border border-[#4DB9E8]/30">
              <p className="text-sm text-[#1A1926] font-medium">
                🎯 ¡Estás muy cerca! Completa 2 retos más esta semana para
                avanzar a la Liga de Oro.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-[#c31f39]/20">
          <Link href="/challenges">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#c31f39] to-[#F97659] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#1A1926]">
                Retos Disponibles
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                3 nuevos retos esperándote
              </p>
              <div className="inline-flex items-center space-x-1 text-[#c31f39] text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>¡Empezar ahora!</span>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-[#4DB9E8]/20">
          <Link href="/rewards">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#4DB9E8] to-[#A4D4D8] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#1A1926]">
                Mis Recompensas
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Ver puntos y beneficios
              </p>
              <div className="inline-flex items-center space-x-1 text-[#4DB9E8] text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>1,680 puntos</span>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-[#F97659]/20">
          <Link href="/leagues">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#F97659] to-[#c31f39] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#1A1926]">
                Mi Liga
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Ver ranking y competencia
              </p>
              <div className="inline-flex items-center space-x-1 text-[#F97659] text-sm font-medium">
                <Award className="w-4 h-4" />
                <span>Liga Plata</span>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </main>
  );
}
