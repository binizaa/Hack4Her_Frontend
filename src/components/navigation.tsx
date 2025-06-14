"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Trophy, Target, Gift } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Ligas", href: "/leagues", icon: Trophy },
  { name: "Retos", href: "/challenges", icon: Target },
  { name: "Recompensas", href: "/rewards", icon: Gift },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#c31f39]">
              Tuali
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#c31f39] to-[#F97659] text-white shadow-lg"
                      : "text-gray-600 hover:text-[#c31f39] hover:bg-gradient-to-r hover:from-[#4DB9E8]/10 hover:to-[#A4D4D8]/10"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">María González</span>
            <div className="w-8 h-8 bg-gradient-to-r from-[#c31f39] to-[#F97659] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">MG</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-white">
        <div className="flex justify-around py-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center p-2 text-xs transition-colors ${
                  isActive ? "text-[#c31f39]" : "text-gray-600"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
