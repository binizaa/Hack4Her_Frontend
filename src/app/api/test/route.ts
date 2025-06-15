import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { generateRecommendation } from "@/lib/gemini";

export async function GET() {
  try {
    // Probar conexión a MongoDB
    const client = await clientPromise;
    const db = client.db("tuali");
    await db.command({ ping: 1 });

    // Probar conexión a Gemini
    const recommendation = await generateRecommendation(
      "Genera una recomendación corta para una tienda de abarrotes sobre cómo mejorar sus ventas"
    );

    return NextResponse.json({
      status: "success",
      message: "Conexiones exitosas",
      mongoStatus: "conectado",
      geminiTest: recommendation,
    });
  } catch (error) {
    console.error("Error en la prueba de conexiones:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Error al conectar con los servicios",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
