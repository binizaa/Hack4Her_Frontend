// pages/index.tsx o donde necesites
import { useEffect, useState } from "react";

export default function ReplyParrot({ sentiment_code = 1 }) {
  const [tuaMessage, setTuaMessage] = (useState < string) | (null > null);

  async function fetchTuaMessage(sentimentCode) {
    try {
      const response = await fetch(
        `http://localhost:8000/gemini/tua-message/${sentimentCode}`
      );

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }

      const data = await response.json();
      console.log("Mensaje de Tua:", data.tua_message);
      setTuaMessage(data.tua_message);
    } catch (error) {
      console.error("Error al obtener el mensaje de Tua:", error);
      setTuaMessage("Hubo un error al obtener el mensaje.");
    }
  }

  <Card className="bg-[#a4d4d8]/40  border-white/20 backdrop-blur-sm">
    <CardContent className="p-4 text-center">
      <Trophy className="w-8 h-8 mx-auto mb-2 text-[#FFF]" />
      <div className="text-white text-2xl font-bold">{tua_message}</div>
    </CardContent>
  </Card>;
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-full max-w-md">
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded text-center text-[#c31f39] font-semibold shadow">
          {loading ? "Cargando mensaje de Tua..." : tuaMessage}
        </div>
      </div>
      {/* Aquí va la imagen de la guacamaya */}
      <img
        src="/imagenesguac/habla1.png"
        alt="Guacamaya animada"
        className="w-64 h-48 object-contain"
      />
    </div>
  );
}
