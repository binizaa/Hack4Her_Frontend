// src/components/reply-parrot.tsx

"use client";

import { useEffect, useState } from "react";
import { fetchTuaMessage } from "@/app/api/reply-parrot/route";

interface ReplyParrotProps {
  sentiment?: number;
  customMessage?: string;
}

export default function ReplyParrot({ sentiment = 0, customMessage }: ReplyParrotProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessage = async () => {
      if (customMessage) {
        setMessage(customMessage);
        setLoading(false);
        return;
      }

      const msg = await fetchTuaMessage(sentiment);
      setMessage(msg);
      setLoading(false);
    };

    getMessage();
  }, [sentiment, customMessage]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Mensaje de Tua</h2>
      {loading ? (
        <p className="text-gray-500">Tua está pensando... 🧠</p>
      ) : (
        <div className="w-100 mx-auto bg-yellow-50 p-2 rounded shadow">
          <p className="text-2rem text-gray-800 font-medium italic ">
            "{message}"
          </p>
        </div>
      )}
    </div>
  );
}
