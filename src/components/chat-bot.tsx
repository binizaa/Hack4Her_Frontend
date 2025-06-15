"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "¡Hola! Soy tu asistente IA de Tuali. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario inmediatamente
    const userMessage = { type: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      // Preparar mensajes para la API
      const apiMessages = messages.map((msg) => ({
        role: msg.type === "user" ? "user" : "model",
        content: msg.content,
      }));
      apiMessages.push({ role: "user", content: inputValue });

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();

      // Agregar respuesta del bot
      setMessages((prev) => [...prev, { type: "bot", content: data.message }]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#c31f39] hover:bg-[#a01729] shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
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
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg text-sm bg-gray-100 text-gray-800">
                Escribiendo...
              </div>
            </div>
          )}
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
              disabled={loading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
