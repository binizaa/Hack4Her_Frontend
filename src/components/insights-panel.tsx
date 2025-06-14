import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Package } from "lucide-react"

const topProducts = [
  { name: "Coca-Cola 600ml", sales: 145, trend: "up", change: "+12%" },
  { name: "Pan Integral", sales: 98, trend: "up", change: "+8%" },
  { name: "Leche Entera 1L", sales: 87, trend: "down", change: "-3%" },
]

const underperforming = [
  { name: "Yogurt Natural", sales: 12, suggestion: "Promoción 2x1" },
  { name: "Cereales Premium", sales: 8, suggestion: "Reubicación en estante" },
  { name: "Agua Saborizada", sales: 15, suggestion: "Bundle con snacks" },
]

const bundles = [
  {
    name: "Combo Desayuno",
    products: ["Pan + Mermelada + Café"],
    potential: "+25% ventas",
    confidence: 92,
  },
  {
    name: "Pack Familiar",
    products: ["Arroz + Aceite + Frijoles"],
    potential: "+18% ventas",
    confidence: 87,
  },
]

export default function InsightsPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-[#c31f39]" />
            <span>Productos Estrella</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{product.name}</div>
                <div className="text-xs text-gray-500">{product.sales} unidades</div>
              </div>
              <div className="flex items-center space-x-2">
                {product.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-xs font-medium ${product.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {product.change}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-[#c31f39]" />
            <span>Oportunidades de Mejora</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {underperforming.map((product, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{product.name}</div>
                <div className="text-xs text-gray-500">{product.sales} unidades</div>
              </div>
              <Badge variant="outline" className="text-xs">
                💡 {product.suggestion}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-[#c31f39]" />
            <span>Bundles Sugeridos por IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bundles.map((bundle, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{bundle.name}</h4>
                <Badge className="bg-[#c31f39] text-white text-xs">{bundle.confidence}% confianza</Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2">{bundle.products[0]}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600 font-medium">{bundle.potential}</span>
                <Button size="sm" className="bg-[#c31f39] hover:bg-[#a01729] text-xs">
                  Implementar
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
