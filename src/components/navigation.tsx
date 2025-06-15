"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Trophy, Target, Gift } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Retos", href: "/challenges", icon: Target },
  { name: "Ligas", href: "/leagues", icon: Trophy },
  { name: "Recompensas", href: "/rewards", icon: Gift },
];

export default function Navigation() {
  const pathname = usePathname();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dummyUsers = [
    { id: 1, name: "María García", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Juan Pérez", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Ana López", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Carlos Ruiz", avatar: "https://i.pravatar.cc/150?img=4" },
    {
      id: 5,
      name: "Sofía Martínez",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#c31f39]">
              Tuali
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
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
              );
            })}
          </nav>

          <div className="flex items-center space-x-4" ref={dropdownRef}>
            <span className="text-sm text-gray-600">María González</span>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-8 h-8 bg-gradient-to-r from-[#c31f39] to-[#F97659] rounded-full flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-all duration-300"
            >
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          {showUserDropdown && (
            <div className="absolute right-4 top-16 w-64 max-w-[calc(100vw - 32px)] sm:w-64 bg-white rounded-lg shadow-xl py-2 z-30 border border-gray-200 transition-all duration-300 transform origin-top-right scale-100 opacity-100">
              <div className="px-4 py-2 text-gray-500 font-semibold text-sm border-b border-gray-100">
                Cambiar Usuario
              </div>
              {dummyUsers.map((user) => (
                <a
                  key={user.id}
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-3 border border-gray-200"
                  />
                  <span className="text-gray-800 font-medium">{user.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-white">
        <div className="flex justify-around py-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
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
            );
          })}
        </div>
      </div>
    </header>
  );
}
