

import Image from "next/image";
import caminhao from '../../../public/imagens/caminhao_teste.jpeg';
import logo from '../../../public/imagens/logo.png';
import { CheckIcon, WhatsappLogoIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";


export function About() {
    return (
        <section className="bg-[#FDF6EC] py-16">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div data-aos="fade-up-left" data-aos-delay="1300" className="relative w-full h-[400px] rounded-3xl overflow-hidden">
                            <Image
                                src={caminhao}
                                alt="Foto Caminhao"
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
                    <div data-aos="fade-up-left" data-aos-delay="3000" className="space-y-6 mt-10">
                        <h2 className="text-4xl font-bold">SOBRE</h2>

                        <p>
                            Until one has loved an animal, a part of one's soul remains unawakened. We
                            believe in it and we believe in easy access to
                            things that are good our mind, body and spirit. With a clever
                            offering, superb support and a secure checkout you're in good hands.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-red-500" />
                                Aberto deste 2006
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-red-500" />
                                Missão sustentável
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-red-500" />
                                Qualidade é nossa prioridade
                            </li>
                        </ul>

                        <div className="flex gap-2">
                            <a
                                href={`https://wa.me/5591992572999?text=Olá! Pet Shop Dev, gostaria de saber mais sobre os serviços oferecidos.`}
                                target="_blank"
                                className="bg-[#620F83] text-white flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md"
                            >
                                <WhatsappLogoIcon className="text-white w-5 h-5" />
                                Contato via whatsApp
                            </a>
                            <a href={`https://maps.app.goo.gl/pBeVFNWpGjH9Ad9o7`}
                                target="_blank"
                                className="text-black flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md"
                            >
                                <MapPinIcon className="text-black w-5 h-5" />
                                Endereço da loja
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}