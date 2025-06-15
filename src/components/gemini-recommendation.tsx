"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function GeminiRecommendation() {
  const [recommendation, setRecommendation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prompts = [
    "Genera una recomendación corta y motivadora para una tienda de abarrotes sobre cómo mejorar sus ventas",
    "Da un consejo práctico y conciso para optimizar el inventario de una tienda",
    "Sugiere una estrategia rápida para aumentar el engagement con los clientes en una tienda",
    "Proporciona un tip breve sobre cómo mejorar la rotación de productos en una tienda",
    "Da una recomendación corta sobre cómo destacar productos en una tienda de abarrotes",
  ];

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        setLoading(true);
        const randomPrompt =
          prompts[Math.floor(Math.random() * prompts.length)];
        const response = await fetch("/api/recommendation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: randomPrompt }),
        });

        if (!response.ok) throw new Error("Error al obtener la recomendación");
        const data = await response.json();
        setRecommendation(data.recommendation);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchRecommendation, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-[#F97659]/5 to-[#c31f39]/5">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <p className="text-red-600">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-[#F97659]/5 to-[#c31f39]/5 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-[#c31f39]">
          <Sparkles className="w-5 h-5" />
          <span>Recomendación del Día</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-white/50 rounded-lg border border-[#F97659]/20">
          <p className="text-[#1A1926] leading-relaxed">{recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
