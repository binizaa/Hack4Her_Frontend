"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Star, Zap } from "lucide-react";
import Link from "next/link";

interface ChallengeCardProps {
  challenge: {
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
  };
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card
      className={`border-2 ${challenge.borderColor} ${challenge.bgColor} hover:shadow-xl transition-all duration-300`}
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
        <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#1A1926] font-medium">Progreso</span>
              <span className="text-[#F97659] font-bold">
                {challenge.progress}%
              </span>
            </div>
            <div className="relative">
              <Progress value={challenge.progress} className="h-3" />
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

          <Link href={`/challenges/${challenge.id}`}>
            <Button
              className={`w-full bg-gradient-to-r ${challenge.gradientFrom} ${challenge.gradientTo} hover:shadow-lg transition-all duration-300 border-0`}
            >
              <Zap className="w-4 h-4 mr-2" />
              Continuar Reto
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
