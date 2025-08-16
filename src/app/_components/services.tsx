"use client"

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, User, Truck, BanknoteArrowUp, CirclePlus, Clock } from 'lucide-react'
import { WhatsappLogoIcon } from '@phosphor-icons/react'

const services = [
  {
    title: "O logista",
    description: "O lojista bate o açaí e separa o caroço, que é o resíduo do açaí. Ele pode armazenar o caroço em sacos ou recipientes adequados.",
    duration: "1h",
    price: "$50",
    icon: <User />,
    linkText: 'Olá, vi no site sobre o serviço de coleta do caroço do açaí e gostaria de mais informações.'
  },
  {
    title: "Nós recolhemos o caroço",
    description: "Nós recolhemos o caroço do açaí do lojista, garantindo que o resíduo seja descartado de forma adequada e sustentável.",
    duration: "1h",
    price: "$45",
    icon: <Truck />,
    linkText: 'Olá, vi no site sobre o serviço de coleta do caroço do açaí e gostaria de mais informações.'
  },
  {
    title: "Ele recebe uma pagamento pelo resíduo",
    description: "O lojista recebe um pagamento pelo resíduo do açaí, incentivando a prática sustentável e a economia circular.",
    duration: "2h",
    price: "$80",
    icon: <BanknoteArrowUp />,
    linkText: 'Olá, vi no site sobre o serviço de coleta do caroço do açaí e gostaria de mais informações.'
  },
  {
    title: "Comparativo visual:",
    description: "Antes: lojista paga para recolher. Depois: lojista recebe pelo resíduo.",
    duration: "1h",
    price: "$60",
    icon: <CirclePlus />,
    linkText: 'Olá, vi no site sobre o serviço de coleta do caroço do açaí e gostaria de mais informações.'
  },
]

export function Services() {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 3 }
    }
  })


  function scrollPrev() {
    emblaApi?.scrollPrev();
  }

  function scrollNext() {
    emblaApi?.scrollNext();
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">

        <h2 data-aos="fade-up-left" data-aos-delay="4500" className="text-4xl font-bold mb-12">Como funciona</h2>

        <div className="relative">

          <div data-aos="fade-up-left" data-aos-delay="4500" className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {services.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(100%/3)] px-3">
                  <article className="bg-[#620F83] text-white rounded-2xl p-6 space-y-4 h-full flex flex-col">
                    <div className='flex-1 flex items-start justify-between'>

                      <div className='flex gap-3'>
                        <span className='text-3xl'>{item.icon}</span>
                        <div>
                          <h3 className='font-bold text-xl my-1'>{item.title}</h3>
                          <p className='text-gray-400 text-sm select-none'>
                            {item.description}
                          </p>
                        </div>
                      </div>

                    </div>

                    <div className='border-t border-gray-700 pt-4 flex items-center justify-between'>
                      <div className='flex items-center gap-2 text-sm'>
                        <Clock className='w-4 h-4' />
                        <span>{item.duration}</span>
                      </div>

                      <a
                        target='_blank'
                        href={`https://wa.me/5591992572999?text=Olá vim pelo site e gostaria de mais informações sbore ${item.title}`}
                        className='flex items-center justify-center gap-2 hover:bg-green-700 px-4 py-1 rounded-md duration-300'
                      >
                        <WhatsappLogoIcon className='w-5 h-5' />
                        Entrar em contato
                      </a>

                    </div>

                  </article>
                </div>
              ))}
            </div>
          </div>

          <button
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