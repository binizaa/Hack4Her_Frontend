// lib/gemini-api.ts
export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export interface GeminiConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export class GeminiAPI {
  private static config: GeminiConfig = {
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxTokens: 1000,
  };

  static setConfig(config: Partial<GeminiConfig>) {
    this.config = { ...this.config, ...config };
  }

  private static formatMessagesForGemini(messages: Message[]) {
    return messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));
  }

  private static async callGeminiAPI(
    messages: Message[]
  ): Promise<ChatResponse> {
    try {
      if (!this.config.apiKey) {
        throw new Error("API key de Gemini no configurada");
      }

      const formattedMessages = this.formatMessagesForGemini(messages);

      const requestBody = {
        contents: formattedMessages,
        generationConfig: {
          temperature: this.config.temperature,
          maxOutputTokens: this.config.maxTokens,
          topP: 0.8,
          topK: 40,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent?key=${this.config.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${
            errorData.error?.message || "Error desconocido"
          }`
        );
      }

      const data = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No se recibió respuesta válida de Gemini");
      }

      const candidate = data.candidates[0];

      if (candidate.finishReason === "SAFETY") {
        throw new Error("La respuesta fue bloqueada por filtros de seguridad");
      }

      if (
        !candidate.content ||
        !candidate.content.parts ||
        candidate.content.parts.length === 0
      ) {
        throw new Error("Respuesta vacía de Gemini");
      }

      const messageContent = candidate.content.parts[0].text;

      return {
        message: messageContent,
      };
    } catch (error) {
      console.error("Error en GeminiAPI:", error);

      let errorMessage = "Lo siento, hubo un error al procesar tu mensaje.";

      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          errorMessage =
            "Error de configuración: API key inválida o no configurada.";
        } else if (error.message.includes("quota")) {
          errorMessage = "Has excedido el límite de uso de la API.";
        } else if (error.message.includes("blocked")) {
          errorMessage =
            "La respuesta fue bloqueada por políticas de contenido.";
        } else if (error.message.includes("network")) {
          errorMessage = "Error de conexión. Verifica tu conexión a internet.";
        }
      }

      return {
        message: errorMessage,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  static async sendMessage(messages: Message[]): Promise<ChatResponse> {
    return this.callGeminiAPI(messages);
  }

  static async sendSingleMessage(
    content: string,
    systemPrompt?: string
  ): Promise<ChatResponse> {
    const messages: Message[] = [];

    if (systemPrompt) {
      messages.push({ role: "assistant", content: systemPrompt });
    }

    messages.push({ role: "user", content });

    return this.callGeminiAPI(messages);
  }

  static getConfig(): GeminiConfig {
    return { ...this.config };
  }
}
