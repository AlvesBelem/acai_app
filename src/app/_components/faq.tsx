export function Faq() {
  const faqs = [
    {
      q: 'Como funciona a coleta?',
      a: 'Você separa o caroço do açaí em sacos/recipientes. Agendamos a retirada no seu endereço e pagamos no ato.',
    },
    {
      q: 'Quanto eu recebo?',
      a: 'O valor varia conforme volume e condições do material (mais seco e limpo, melhor). Fale no WhatsApp e passamos os detalhes.',
    },
    {
      q: 'Qual a área de atendimento?',
      a: 'Atendemos Belém/PA e região. Consulte disponibilidade para o seu bairro pelo WhatsApp.',
    },
    {
      q: 'Tem volume mínimo?',
      a: 'Recomendamos acumular um volume mínimo para otimizar a coleta, mas avaliamos caso a caso.',
    },
    {
      q: 'Como armazenar o resíduo?',
      a: 'Mantenha em sacos resistentes, de preferência em local ventilado e protegido da chuva para reduzir odor e umidade.',
    },
  ]

  return (
    <section className="bg-[var(--brand-cream)] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-[var(--brand-primary)]">Perguntas frequentes</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <details key={idx} className="text-[var(--brand-cream)] group rounded-xl border border-gray-200 p-4 bg-[var(--brand-primary)]">
              <summary className="cursor-pointer list-none font-medium text-lg flex items-center justify-between">
                <span>{item.q}</span>
                <span className="ml-4 text-[var(--brand-cream)] group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="mt-2 text-[var(--brand-cream)]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

