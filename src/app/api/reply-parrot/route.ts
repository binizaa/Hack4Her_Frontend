import { NextResponse } from "next/server";

// Puedes cambiar GET por POST si lo necesitas
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sentiment_code } = body;

    if (!sentiment_code) {
      return NextResponse.json(
        { error: "Falta el parámetro sentiment_code" },
        { status: 400 }
      );
    }

    // Llama a la API externa
    const apiUrl = `http://0.0.0.0:8000/gemini/tua-message/${sentiment_code}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al llamar a la API externa");
    }

    const data = await response.json();

    return NextResponse.json({ message: data.message || data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error desconocido" },
      { status: 500 }
    );
  }
}
