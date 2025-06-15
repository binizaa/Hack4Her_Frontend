"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define la interfaz para un usuario
interface User {
  id: number;
  name: string;
  avatar: string;
}

// Define la interfaz para el contexto
interface UserContextType {
  currentUserId: number;
  setCurrentUserId: (id: number) => void;
  users: User[];
}

// Crea el contexto
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Proveedor del contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const dummyUsers: User[] = [
    {
      id: 1,
      name: "María García",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Juan Pérez",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Ana López",
      avatar:
        "https://plus.unsplash.com/premium_photo-1670884441012-c5cf195c062a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Carlos Ruiz",
      avatar:
        "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Sofía Martínez",
      avatar:
        "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=2417&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentUserId, setCurrentUserId] = useState<number>(dummyUsers[0].id); // Inicia con el primer usuario

  return (
    <UserContext.Provider
      value={{ currentUserId, setCurrentUserId, users: dummyUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto de usuario
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
