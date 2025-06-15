import { NextResponse } from "next/server";

// Simulando la respuesta de la API de FastAPI
const dummyData = [
  { product_name: "Laptop", quantity: 100 },
  { product_name: "Mouse", quantity: 250 },
  { product_name: "Teclado", quantity: 180 },
];

export async function GET() {
  try {
    return NextResponse.json(dummyData);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los datos" },
      { status: 500 }
    );
  }
}
