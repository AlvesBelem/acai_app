// app/verificado/page.tsx
import { Suspense } from "react"
import { VerificadoContent } from "./verificado-content"

export default function VerificadoPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Carregando...</div>}>
      <VerificadoContent />
    </Suspense>
  )
}
