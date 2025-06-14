import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, MessageCircle, TrendingUp, MapPin, ThumbsUp } from "lucide-react"

const topStores = [
  { name: "Tienda El Sol", owner: "Carlos Mendoza", city: "Quito", points: 2850, league: "Oro" },
  { name: "Minimarket Luna", owner: "Ana García", city: "Guayaquil", points: 2650, league: "Oro" },
  { name: "Bodega Central", owner: "Luis Torres", city: "Cuenca", points: 2450, league: "Oro" },
]

const recentPosts = [
  {
    id: 1,
    author: "María González",
    store: "Tu Tienda",
    content:
      "¡Acabo de completar el reto de diversificación! Los productos de limpieza están funcionando muy bien. ¿Alguien más ha probado esta categoría?",
    time: "Hace 2 horas",
    likes: 12,
    comments: 5,
    city: "Quito",
  },
  {
    id: 2,
    author: "Carlos Mendoza",
    store: "Tienda El Sol",
    content:
      "Tip del día: Los bundles de desayuno están siendo un éxito. Combino pan + mermelada + café y las ventas aumentaron 25%",
    time: "Hace 4 horas",
    likes: 28,
    comments: 15,
    city: "Quito",
  },
  {
    id: 3,
    author: "Ana García",
    store: "Minimarket Luna",
    content: "¿Alguien de Guayaquil quiere formar un grupo de estudio para analizar las tendencias de productos? 📊",
    time: "Hace 6 horas",
    likes: 8,
    comments: 12,
    city: "Guayaquil",
  },
]

const regionalGroups = [
  { name: "Tiendas de Quito", members: 156, posts: 234, active: true },
  { name: "Comerciantes Guayaquil", members: 98, posts: 187, active: false },
  { name: "Red Cuenca", members: 67, posts: 145, active: false },
  { name: "Emprendedores Ambato", members: 45, posts: 89, active: false },
]

export default function CommunityPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#c31f39] mb-2">Comunidad Tuali</h1>
        <p className="text-gray-600">Conecta con otros comerciantes y comparte experiencias</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-[#c31f39] text-white">MG</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Button variant="outline" className="w-full justify-start text-gray-500">
                    ¿Qué quieres compartir con la comunidad?
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-[#c31f39] text-white">
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{post.author}</h3>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{post.store}</span>
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {post.city}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-[#c31f39]">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-[#c31f39]">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                        </div>
                        <span className="text-xs text-gray-500">{post.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#c31f39]" />
                <span>Top Performers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStores.map((store, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? "bg-[#FFD700] text-white"
                          : index === 1
                            ? "bg-[#C0C0C0] text-white"
                            : "bg-[#CD7F32] text-white"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{store.name}</div>
                      <div className="text-xs text-gray-500">
                        {store.owner} • {store.city}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{store.points.toLocaleString()}</div>
                      <Badge
                        className={`text-xs ${
                          store.league === "Oro" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {store.league}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regional Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#c31f39]" />
                <span>Grupos Regionales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {regionalGroups.map((group, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      group.active ? "bg-[#c31f39]/5 border-[#c31f39]" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{group.name}</h4>
                      {group.active && <Badge className="bg-[#c31f39] text-white text-xs">Activo</Badge>}
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{group.members} miembros</span>
                      <span>{group.posts} posts</span>
                    </div>
                    {!group.active && (
                      <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                        Unirse
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Miembros Activos</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Posts Esta Semana</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tu Participación</span>
                  <span className="font-semibold text-[#c31f39]">15 posts</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-[#c31f39] hover:bg-[#a01729]">Crear Publicación</Button>
              <Button variant="outline" className="w-full">
                Buscar Tiendas
              </Button>
              <Button variant="outline" className="w-full">
                Eventos Locales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
