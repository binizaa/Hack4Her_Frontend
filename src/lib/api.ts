// lib/api.ts
export interface Product {
  [key: string]: any;  // Permite cualquier propiedad dinámica
}

export interface ExplorationData {
  nombre: string;
  frase: string;
  productos: Product[];  // La lista de productos puede tener cualquier estructura
}

export const fetchExplorationData = async (
  clientId: number,
  category: string
): Promise<ExplorationData> => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/products/${category}/${clientId}`
    );
    if (!response.ok) {
      throw new Error(`Cliente no encontrado: ${clientId}`);
    }
    const data = await response.json();
    
    // Usa console.log para imprimir los datos en la consola
    console.log("Hola", data);

    return data;
  } catch (error) {
    // This will catch errors like network issues or issues within the API
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
