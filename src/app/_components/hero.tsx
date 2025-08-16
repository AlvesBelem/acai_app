import { WhatsappLogoIcon } from '@phosphor-icons/react/dist/ssr';
import caminhao from '../../../public/imagens/caminhao_teste.jpeg';
import logo from '../../../public/imagens/logo.png';
import Image from 'next/image';

export function Hero() {
    return (
        <section className="bg-[#620F83] text-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Lado esquerdo: Logo, texto e botão */}
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
                            Transformamos o caroço do seu açaí em oportunidade:
                        </h1>
                        <p data-aos="fade-right" data-aos-delay="2000" className="lg:text-lg">
                            nós pagamos para recolher o seu resíduo.
                        </p>
                        <a
                            data-aos="flip-left" data-aos-delay="2500"
                            href={`https://wa.me/5591992572999?text=Olá! Pet Shop Dev, gostaria de saber mais sobre os serviços oferecidos.`}
                            target="_blank"
                            className="bg-green-500 px-5 py-2 rounded-md font-semibold flex items-center justify-center w-fit gap-2 mx-auto lg:mx-0"
                        >
                            <WhatsappLogoIcon className="text-white w-5 h-5" />
                            Contato via WhatsApp
                        </a>
                    </div>
                    {/* Lado direito: Caminhão */}
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
                        {/* Degradê lateral para desktop */}
                        <div
                            className="absolute inset-0 rounded-lg hidden lg:block"
                            style={{
                                background: 'linear-gradient(to right, #620F83 0%, rgba(98,15,131,0.0) 80%)',
                                zIndex: 2
                            }}
                        ></div>
                        {/* Overlay para mobile */}
                        <div className="absolute inset-0 bg-black opacity-25 lg:hidden rounded-lg z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}