
"use client"

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from './container'
import tutor1 from '../../../public/imagens/tutor1.png'
import tutor2 from '../../../public/imagens/tutor2.jpg'
import Image from 'next/image'

const testimonials = [
    {
        content:
            "Antes eu tinha que pagar para alguém recolher o caroço do açaí. Agora, além de economizar, ainda ganho uma renda extra todo mês. O serviço é rápido e super confiável!",
        author: "Mariana Souza",
        role: "Lojista de açaí",
        image: tutor2,
    },
    {
        content:
            "O recolhimento é sempre pontual e a equipe é muito profissional. Saber que o resíduo é reciclado de forma correta me deixa tranquilo e ainda ajuda o meio ambiente.",
        author: "Rafael",
        role: "Lojista de açaí",
        image: tutor1,
    },
    {
        content: "Facilitou demais o meu dia a dia! O contato pelo WhatsApp é prático e o processo não tem burocracia. Recomendo para todos os lojistas da região.",
        author: "Camila Fernandes",
        role: "Lojista de açaí",
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
        <section className="bg-[var(--brand-secondary)] py-16">
            <Container>

                <h2 data-aos="fade-up-left" data-aos-delay="5000" className="text-3xl md:text-4xl font-bold text-center mb-12">Depoimentos</h2>

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
                        className='bg-white flex items-center justify-center rounded-full shadow-lg w-8 h-8 md:w-10 md:h-10 absolute -left-1 md:-left-5 top-1/2 -translate-y-1/2 z-20'
                        onClick={scrollPrev}
                    >
                        <ChevronLeft className='w-5 h-5 md:w-6 md:h-6 text-gray-600' />
                    </button>

                    <button
                        data-aos="fade-up-left" data-aos-delay="5500"
                        className='bg-white flex items-center justify-center rounded-full shadow-lg w-8 h-8 md:w-10 md:h-10 absolute -right-1 md:-right-5 top-1/2 -translate-y-1/2 z-20'
                        onClick={scrollNext}
                    >
                        <ChevronRight className='w-5 h-5 md:w-6 md:h-6 text-gray-600' />
                    </button>

                </div>

            </Container>
        </section>
    )
}
