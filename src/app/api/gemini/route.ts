import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Validar que existe la API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY no está definida");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages debe ser un array" },
        { status: 400 }
      );
    }

    // Cargar el modelo
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Traducir los mensajes al formato de Gemini
    const contents = messages.map((msg: any) => ({
      role: msg.role, // debe ser "user" o "model"
      parts: [{ text: msg.content }],
    }));

    // Enviar el historial completo
    const result = await model.generateContent({ contents });

    const responseText = result.response.text();

    return NextResponse.json({ message: responseText });
  } catch (error: any) {
    console.error("Error en Gemini API:", error);
    return NextResponse.json(
      {
        error: "Error al procesar la solicitud",
        details: error.message || "Error desconocido",
      },
      { status: 500 }
    );
  }
}
