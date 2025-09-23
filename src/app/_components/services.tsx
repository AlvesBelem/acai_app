"use client";

import { User, Truck, BanknoteArrowUp, CirclePlus, Clock, UserPlus, Recycle } from 'lucide-react';
import { Container } from './container';

const services = [
  {
    title: "O lojista",
    description: "Você separa o caroço (resíduo do açaí) em sacos ou recipientes. Quanto mais limpo e seco, melhor.",
    duration: "Etapa 1",
    icon: <User />,
  },
  {
    title: "Nós recolhemos o caroço",
    description: "Agendamos a coleta no seu endereço e retiramos o material com agilidade e responsabilidade.",
    duration: "Etapa 2",
    icon: <Truck />,
  },
  {
    title: "Pagamento justo no ato",
    description: "Você recebe pelo resíduo do açaí. Simples, rápido e sem burocracia.",
    duration: "Etapa 3",
    icon: <BanknoteArrowUp />,
  },
  {
    title: "Comparativo visual",
    description: "Antes: pagar para alguém recolher. Depois: receber pelo seu resíduo.",
    duration: "Comparativo",
    icon: <CirclePlus />,
  },
];

export function Services() {
  return (
    <>
      <section className="bg-[var(--brand-primary)] py-16">
        <Container>
          <h2 data-aos="fade-up-left" data-aos-delay="4500" className="text-center text-[var(--brand-cream)] text-3xl md:text-4xl font-bold mb-12">
            Como funciona
          </h2>

          <div data-aos="fade-up-left" data-aos-delay="4600" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, index) => (
              <article key={index} className="bg-[var(--brand-cream)] text-[var(--brand-primary)] rounded-2xl p-6 space-y-4 h-full flex flex-col">
                <div className="flex-1 flex items-start gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-xl my-1">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="border-t border-black/10 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>


        </Container>
      </section>

      <section className="py-16 bg-[var(--brand-primary)]">
        <Container>
          <h2 className="text-[var(--brand-cream)] text-3xl md:text-4xl font-bold mb-10 text-center">
            Fluxo do serviço
          </h2>

          <div className="mx-auto max-w-3xl">
            <div className="relative aspect-square">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--brand-primary)" />
                    <stop offset="100%" stopColor="var(--brand-secondary)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="[animation:dashMove_12s_linear_infinite]"
                />
                <style>{`@keyframes dashMove { to { stroke-dashoffset: -60; } }`}</style>
              </svg>

              {/* Etapas visuais do fluxo */}
              <Node step={1} x="50%" y="6%" label="Você separa o caroço" Icon={User} />
              <Node step={2} x="94%" y="50%" label="Coletamos no endereço" Icon={Truck} align="right" />
              <Node step={3} x="50%" y="94%" label="Pagamento no ato" Icon={BanknoteArrowUp} />
              <Node step={4} x="6%" y="50%" label="Destino correto do resíduo" Icon={Recycle} align="left" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Como funciona</p>
                  <p className="text-xl font-semibold text-[color:var(--brand-primary)]">
                    Ciclo simples e sustentável
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-8 flex justify-center"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <a
              href="/login"
              className="px-6 py-2 rounded-md bg-[var(--brand-cream)] text-[var(--brand-primary)] hover:opacity-90"
            >
              Acessar plataforma
            </a>
          </div>
        </Container>
      </section>
    </>
  );

  function Node({
    step,
    x,
    y,
    label,
    Icon,
    align,
  }: {
    step: number;
    x: string;
    y: string;
    label: string;
    Icon: any;
    align?: "left" | "right";
  }) {
    return (
      <div
        className="absolute flex items-center gap-2"
        style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      >
        {align === "left" ? null : <Icon className="w-5 h-5 text-[color:var(--brand-primary)]" />}
        <span className="bg-[var(--brand-cream)] border border-black/5 text-[color:var(--brand-primary)] text-xs md:text-sm px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
          <strong>Passo {step}</strong>: {label}
        </span>
        {align === "left" ? <Icon className="w-5 h-5 text-[color:var(--brand-primary)]" /> : null}
      </div>
    );
  }
}
