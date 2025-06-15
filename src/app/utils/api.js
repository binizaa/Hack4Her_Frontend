// utils/api.js
export async function fetchExplorationData(clientId, category) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${category}/${clientId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al hacer la solicitud de exploración:", error);
    throw new Error("No se pudieron obtener los datos");
  }
}
