"use client"

import Link from "next/link"
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr"
import { useEffect, useRef, useState } from "react"

export function FloatingWhatsApp() {
  const [showHint, setShowHint] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setShowHint(true)
    timeoutRef.current = setTimeout(() => setShowHint(false), 3000)

    intervalRef.current = setInterval(() => {
      setShowHint(true)
      setTimeout(() => setShowHint(false), 3000)
    }, 15000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-[999] flex items-end gap-2 max-w-[90vw]">
      {/* Dica flutuante */}
      {showHint && (
        <div className="bg-white text-[#2E2E2E] shadow-md rounded-xl px-3 py-2 text-sm max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
          Tá com dúvida? Chama no Zap!
        </div>
      )}

      {/* Botão flutuante */}
      <Link
        href={`https://wa.me/5591992572999?text=Olá! Vim pelo site e gostaria de mais informações.`}
        target="_blank"
        aria-label="Falar no WhatsApp"
        className="relative bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-300 transition-colors w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center animate-bounce"
      >
        <WhatsappLogoIcon className="w-5 h-5 sm:w-7 sm:h-7" />
        <span
          className="absolute -inset-0.5 sm:-inset-1 rounded-full border-2 border-green-300/40 animate-ping"
          aria-hidden
        />
      </Link>
    </div>
  )
}
