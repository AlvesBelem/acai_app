
import { WhatsappLogoIcon, FacebookLogoIcon, InstagramLogoIcon, XLogoIcon, YoutubeLogoIcon } from '@phosphor-icons/react/dist/ssr'
import { Heart } from 'lucide-react'





export function Footer() {
    return (
        <section className='bg-[#620F83] py-16 text-white'>
            <div className='container mx-auto px-4'>
                <footer data-aos="fade-up-left" data-aos-delay="7000" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 mt-5 text-center'>
                    <div className='flex flex-col items-center'>
                        <h3 className='text-2xl font-semibold mb-2'>Açai da Amazônia</h3>
                        <p className='mb-1'>Quer ser remunerado pelo seu resíduo?</p>
                        <p className='mb-4'>fale com a gente!</p>
                        <a
                            href={`https://wa.me/5591992572999?text=Olá! Olá, vi no site sobre o serviço de coleta do caroço do açaí e gostaria de mais informações.`}
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