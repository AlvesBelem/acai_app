
"use client"

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Scissors, Syringe, CarTaxiFront, Hotel, Clock } from 'lucide-react'
import { WhatsappLogoIcon } from '@phosphor-icons/react'
import tutor1 from '../../../public/imagens/tutor1.png'
import tutor2 from '../../../public/imagens/tutor2.jpg'
import Image from 'next/image'

const testimonials = [
    {
        content:
            "Antes eu tinha que pagar para alguém recolher o caroço do açaí. Agora, além de economizar, ainda ganho uma renda extra todo mês. O serviço é rápido e super confiável!",
        author: "Mariana Souza",
        role: "Logista de açaí",
        image: tutor2,
    },
    {
        content:
            "O recolhimento é sempre pontual e a equipe é muito profissional. Saber que o resíduo é reciclado de forma correta me deixa tranquilo e ainda ajuda o meio ambiente.",
        author: "Rafael",
        role: "Logista de açaí",
        image: tutor1,
    },
    {
        content: "Facilitou demais o meu dia a dia! O contato pelo WhatsApp é prático, e o processo não tem burocracia. Recomendo para todos os lojistas da região.",
        author: "Camila fernandes",
        role: "Logista de açaí",
        image: tutor2,
    },
]

export function Testimonials() {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    })


    function scrollPrev() {
        emblaApi?.scrollPrev();
    }

    function scrollNext() {
        emblaApi?.scrollNext();
    }

    return (
        <section className="bg-[#FFD449] py-16">
            <div className="container mx-auto px-4">

                <h2 data-aos="fade-up-left" data-aos-delay="5000" className="text-4xl font-bold text-center mb-12">Depoimentos</h2>

                <div className="relative max-w-4xl mx-auto">

                    <div data-aos="fade-up-left" data-aos-delay="5500" className='overflow-hidden' ref={emblaRef}>
                        <div className='flex'>
                            {testimonials.map((item, index) => (
                                <div key={index} className="flex-[0_0_100%] min-w-0 px-3">
                                    <article className="bg-[#1e293b] text-white rounded-2xl p-6 space-y-4 h-full flex flex-col">
                                        <div className='flex flex-col items-center text-center space-y-4'>
                                            <div className='relative w-24 h-24'>
                                                <Image
                                                    src={item.image}
                                                    alt={item.author}
                                                    fill
                                                    sizes='96px'
                                                    className='object-cover rounded-full'
                                                />
                                            </div>
                                            <p className='text-gray-400'>
                                                {item.content}
                                            </p>
                                            <div>
                                                <p className='text-gray-200 font-bold'>
                                                    {item.author}
                                                </p>
                                                <p className='text-gray-400 text-sm'>
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>

                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        data-aos="fade-up-left" data-aos-delay="5500"
                        className='bg-white flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute left-3 -translate-y-1/2 -translate-x-1/2 top-1/2 z-10'
                        onClick={scrollPrev}
                    >
                        <ChevronLeft className='w-6 h-6 text-gray-600' />
                    </button>

                    <button
                        className='bg-white flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute -right-6 -translate-y-1/2 -translate-x-1/2 top-1/2 z-10'
                        onClick={scrollNext}
                    >
                        <ChevronRight className='w-6 h-6 text-gray-600' />
                    </button>

                </div>

            </div>
        </section>
    )
}