import Image from "next/image";
import caminhao from '../../../public/imagens/caminhao_teste.jpeg';
import logo from '../../../public/imagens/logo.png';
import { CheckIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import { UserPlus } from 'lucide-react';
import { Container } from "./container";

export function About() {
    return (
        <section className="bg-[var(--brand-cream)] py-16">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Imagem com logo */}
                    <div className="relative">
                        <div data-aos="fade-up-left" data-aos-delay="1300" className="relative w-full h-64 md:h-80 lg:h-[400px] rounded-3xl overflow-hidden">
                            <Image
                                src={caminhao}
                                alt="Foto Caminhão"
                                fill
                                quality={100}
                                priority
                                className="object-cover hover:scale-110 duration-300"
                            />
                        </div>
                        <div data-aos="fade-up-left" data-aos-delay="1500" className="absolute w-40 h-40 right-4 -bottom-8 overflow-hidden">
                            <Image
                                src={logo}
                                alt="logo açai"
                                quality={100}
                                priority
                                width={200}
                                height={200}
                            />
                        </div>
                    </div>

                    {/* Texto informativo */}
                    <div data-aos="fade-up-left" data-aos-delay="3000" className="space-y-6 mt-10">
                        <h2 className="text-3xl md:text-4xl font-bold">Quem somos</h2>

                        <p>
                            Desde 2006, compramos e destinamos corretamente o caroço do açaí, gerando renda para quem produz e impacto positivo para o meio ambiente.
                            Você separa o resíduo; nós coletamos e pagamos de forma justa.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-red-500" />
                                Pagamento no ato, sem enrolação
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-red-500" />
                                Coleta agendada direto no seu endereço
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-red-500" />
                                Destinação ambientalmente correta (economia circular)
                            </li>
                        </ul>

                        <div className="flex gap-2 flex-wrap">
                            <a
                                href="/login"
                                className="bg-[var(--brand-primary)] text-white flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md"
                            >
                                <UserPlus className="w-5 h-5" />
                                Acessar plataforma
                            </a>
                            <a
                                href={`https://maps.app.goo.gl/pBeVFNWpGjH9Ad9o7`}
                                target="_blank"
                                className="text-black flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md"
                            >
                                <MapPinIcon className="text-black w-5 h-5" />
                                Ver localização
                            </a>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
