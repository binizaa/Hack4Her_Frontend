"use client";

import { useState, useEffect, useRef } from "react";
import { GeminiAPI, Message } from "@/lib/gemini-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, Settings } from "lucide-react";

interface ChatMessage {
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: "bot",
      content:
        "¡Hola! Soy tu asistente IA de Tuali. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cargar API key del localStorage al montar el componente
  useEffect(() => {
    const savedApiKey = localStorage.getItem("gemini_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      GeminiAPI.setConfig({ apiKey: savedApiKey });
    }
  }, []);

  // Auto-scroll a los mensajes más recientes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
      GeminiAPI.setConfig({ apiKey: apiKey.trim() });
      setShowSettings(false);

      // Mensaje de confirmación
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "¡Perfecto! API key configurada correctamente. Ya puedes empezar a chatear.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Verificar que hay API key
    if (!apiKey.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Por favor, configura tu API key de Gemini en la configuración (⚙️) para poder chatear.",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    const userMessage: ChatMessage = {
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue.trim();
    setInputValue("");
    setLoading(true);

    try {
      // Convertir mensajes al formato esperado por GeminiAPI
      const apiMessages: Message[] = messages
        .filter((msg) => msg.content.trim() !== "") // Filtrar mensajes vacíos
        .map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.content,
        }));

      // Agregar el mensaje actual
      apiMessages.push({
        role: "user",
        content: currentInput,
      });

      const { message, error } = await GeminiAPI.sendMessage(apiMessages);

      if (error) {
        throw new Error(error);
      }

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: message,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);

      let errorMessage =
        "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.";

      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          errorMessage =
            "Error con la API key. Verifica que esté configurada correctamente.";
        } else if (error.message.includes("quota")) {
          errorMessage =
            "Has alcanzado el límite de uso de la API. Intenta más tarde.";
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: errorMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        type: "bot",
        content:
          "¡Hola! Soy tu asistente IA de Tuali. ¿En qué puedo ayudarte hoy?",
        timestamp: new Date(),
      },
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#c31f39] hover:bg-[#a01729] shadow-lg z-50 transition-all duration-200 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  if (showSettings) {
    return (
      <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50">
        <CardHeader className="bg-[#c31f39] text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              API Key de Gemini
            </label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Ingresa tu API key..."
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Obtén tu API key en Google AI Studio
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={saveApiKey}
              className="flex-1 bg-[#c31f39] hover:bg-[#a01729]"
              disabled={!apiKey.trim()}
            >
              Guardar
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50">
      <CardHeader className="bg-[#c31f39] text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>Asistente Tuali IA</span>
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="text-white hover:bg-white/20"
              title="Configuración"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="text-white hover:bg-white/20 text-xs px-2"
              title="Limpiar chat"
            >
              Limpiar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.type === "user"
                    ? "bg-[#c31f39] text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div>{message.content}</div>
                <div
                  className={`text-xs mt-1 opacity-70 ${
                    message.type === "user" ? "text-white" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg text-sm bg-gray-100 text-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-[#c31f39] rounded-full"></div>
                  <span>Escribiendo...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              onKeyPress={(e) =>
                e.key === "Enter" && !loading && handleSendMessage()
              }
              className="flex-1"
              disabled={loading}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-[#c31f39] hover:bg-[#a01729]"
              disabled={loading || !inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
