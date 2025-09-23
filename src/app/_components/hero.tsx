import { WhatsappLogoIcon } from '@phosphor-icons/react/dist/ssr';
import caminhao from '../../../public/imagens/caminhao_teste.jpeg';
import logo from '../../../public/imagens/logo.png';
import Image from 'next/image';
import { Container } from './container';
import { Button } from '@/components/ui/button';

export function Hero() {
    return (
        <section className="bg-[var(--brand-primary)] text-white relative overflow-hidden">
            <Container className="py-16 lg:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col gap-6 z-10 items-center text-center lg:items-start lg:text-left">
                        <div data-aos="fade-right" data-aos-delay="1000" className="flex items-center mb-2 justify-center lg:justify-start w-full">
                            <div className="w-32 mx-auto lg:mx-0">
                                <Image
                                    src={logo}
                                    alt="logo açai"
                                    className="object-fill"
                                    quality={100}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </div>
                        <h1 data-aos="fade-left" data-aos-delay="1500" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-10">
                            Transforme o resíduo do açaí em renda imediata
                        </h1>
                        <p data-aos="fade-right" data-aos-delay="2000" className="lg:text-lg">
                            Coletamos o caroço direto no seu ponto e pagamos na hora. Sem burocracia, com agendamento e suporte pelo WhatsApp.
                        </p>
                        <div className="flex gap-3 items-center justify-center lg:justify-start">
                            <Button
                                asChild
                                className="bg-white text-[#4B0D65] hover:bg-white/90 font-semibold"
                                data-aos="fade-up"
                                data-aos-delay="500"
                            >
                                <a href="/login">Acessar plataforma</a>
                            </Button>

                        </div>
                    </div>
                    <div className="relative h-64 md:h-96 lg:h-[420px] w-full">
                        <Image
                            data-aos="fade-left"
                            src={caminhao}
                            alt="Foto do caminhão"
                            className="object-cover rounded-lg shadow-lg"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={100}
                            priority
                            style={{ inset: 0 }}
                        />
                        <div
                            className="absolute inset-0 rounded-lg hidden lg:block"
                            style={{
                                background: 'linear-gradient(to right, var(--brand-primary) 0%, rgba(75,13,101,0.0) 80%)',
                                zIndex: 2
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-black opacity-25 lg:hidden rounded-lg z-10"></div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
