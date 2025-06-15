// src/app/api/reply-parrot/route.ts

export async function fetchTuaMessage(sentiment: number): Promise<string> {
  try {
    const res = await fetch(
      `http://localhost:8000/gemini/tua-message/${sentiment}`
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data.tua_message;
  } catch (error) {
    console.error("Error en fetchTuaMessage:", error);
    return "¡Pío! No pude pensar en nada ahorita... Intenta de nuevo más tarde 🦜";
  }
}
