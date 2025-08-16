import golden from '../../../public/imagens/golden.png'
import royal from '../../../public/imagens/royal.png'
import primier from '../../../public/imagens/primier.png'
import whiskas from '../../../public/imagens/whiskas.png'
import natural from '../../../public/imagens/natural.png'
import Image from 'next/image'
import { WhatsappLogoIcon, FacebookLogoIcon, InstagramLogoIcon, XLogoIcon, YoutubeLogoIcon } from '@phosphor-icons/react/dist/ssr'
import { Heart } from 'lucide-react'


const brands = [
    { name: "Royal Canin", logo: royal },
    { name: "Golden", logo: golden },
    { name: "Primier", logo: primier },
    { name: "Formula Natural", logo: natural },
    { name: "Whiskas", logo: whiskas },
    { name: "Golden", logo: golden },
]


export function Footer() {
    return (
        <section className='bg-[#620F83] py-16 text-white'>
            <div className='container mx-auto px-4'>
                {/* <div className='border-b border-white/20 pb-8'>
                    <h4 data-aos="fade-up-left" data-aos-delay="6000" className='text-3xl font-semibold mb-8 text-center'>Marcas que trabalhamos</h4>
                    <div data-aos="fade-up-left" data-aos-delay="6500" className='grid grid-cols-2 lg:grid-cols-6 gap-8'>
                        {brands.map((item, index) => (
                            <div key={index} className='bg-white p-4 rounded-lg flex items-center justify-center'>
                                <Image
                                    src={item.logo}
                                    alt={item.name}
                                    width={100}
                                    height={50}
                                    className='object-contain'
                                    quality={100}
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div> */}
                <footer data-aos="fade-up-left" data-aos-delay="7000" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 mt-5 text-center'>
                    <div className='flex flex-col items-center'>
                        <h3 className='text-2xl font-semibold mb-2'>Açai da Amazônia</h3>
                        <p className='mb-1'>Quer ser remunerado pelo seu resíduo?</p>
                        <p className='mb-4'>fale com a gente!</p>
                        <a
                            href={`https://wa.me/5591992572999?text=Olá! Pet Shop Dev, gostaria de saber mais sobre os serviços oferecidos.`}
                            target="_blank"
                            className="bg-green-700 px-5 py-2 rounded-md font-semibold flex items-center justify-center w-fit gap-2"
                        >

                            <WhatsappLogoIcon className="text-white w-5 h-5" />
                            Contato via WhatsApp
                        </a>
                    </div>
                    <div>
                        <h3 className='text-2xl font-semibold mb-2'>Contatos</h3>
                        <p>Email: teste@teste.com</p>
                        <p>Telefone: (xx) 123456789</p>
                        <p>Rua X, centro Belém | PA</p>
                    </div>
                    <div>
                        <h3 className='text-2xl font-semibold mb-2'>Redes sociais</h3>
                        <div className='flex gap-4 items-center justify-center'>
                            <a href="#">
                                <FacebookLogoIcon className="text-white w-5 h-5" />
                            </a>
                            <a href="#">
                                <InstagramLogoIcon className="text-white w-5 h-5" />
                            </a>
                            <a href="#">
                                <XLogoIcon className="text-white w-5 h-5" />
                            </a>
                            <a href="#">
                                <YoutubeLogoIcon className="text-white w-5 h-5" />
                            </a>
                        </div >

                    </div>

                </footer>
                <footer>
                    <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="8000" className='text-center'>
                        <p>Feito por <b>Marcelo Alves</b> com dedicação e muito 🤍.</p>
                    </div>
                </footer>
            </div>
        </section>
    )
}