"use client";

import Link from "next/link";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";

export function FloatingWhatsApp() {
  const [showHint, setShowHint] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Show on first render for 3s
    setShowHint(true);
    timeoutRef.current = setTimeout(() => setShowHint(false), 3000);

    // Then loop: every 15s, show for 3s
    intervalRef.current = setInterval(() => {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }, 15000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end gap-2">
      {showHint && (
        <div className="hidden sm:flex items-center bg-white text-[#2E2E2E] shadow-md rounded-xl px-3 py-2">
          <span className="text-sm">Tá com dúvida? Chama no Zap!</span>
        </div>
      )}
      <Link
        href={`https://wa.me/5591992572999?text=Olá! Vim pelo site e gostaria de mais informações.`}
        target="_blank"
        aria-label="Falar no WhatsApp"
        className="relative bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-300 transition-colors w-14 h-14 flex items-center justify-center animate-bounce"
      >
        <WhatsappLogoIcon className="w-7 h-7" />
        <span className="absolute -inset-1 rounded-full border-2 border-green-300/40 animate-ping" aria-hidden />
      </Link>
    </div>
  );
}
