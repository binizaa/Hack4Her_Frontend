import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

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

    // Cambiamos a gemini-pro que es el modelo correcto
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Configuramos el contexto inicial para el asistente
    const prompt = `Eres un asistente virtual de Tuali, una empresa mexicana. 
    Debes ser amigable, empático y profesional. 
    Responde de manera concisa y clara, usando un tono conversacional.`;

    // Preparamos el historial incluyendo el contexto
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      parts: msg.content,
    }));

    const chat = model.startChat({
      history: formattedMessages,
    });

    const result = await chat.sendMessage([prompt, messages[messages.length - 1].content].join('\n'));
    const response = await result.response;
    const responseText = response.text();

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
