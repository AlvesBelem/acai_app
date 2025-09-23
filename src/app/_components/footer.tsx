
import { WhatsappLogoIcon, FacebookLogoIcon, InstagramLogoIcon, XLogoIcon, YoutubeLogoIcon } from '@phosphor-icons/react/dist/ssr'
import { Heart, UserPlus } from 'lucide-react'
import { Container } from './container'





export function Footer() {
    return (
        <section className='bg-[var(--brand-primary)] py-16 text-white'>
            <Container>
                <footer data-aos="fade-up-left" data-aos-delay="7000" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 mt-5 text-center'>
                    <div className='flex flex-col items-center'>
                        <h3 className='text-2xl font-semibold mb-2'>Açaí da Amazônia</h3>
                        <p className='mb-1'>Quer ser remunerado pelo seu resíduo?</p>
                        <p className='mb-4'>Fale com a gente e agende a coleta.</p>
                        <a
                            href="/login"
                            className="bg-white text-[color:var(--brand-primary)] px-5 py-2 rounded-md font-semibold flex items-center justify-center w-fit gap-2"
                        >
                            <UserPlus className="w-5 h-5" />
                            Acessar plataforma
                        </a>
                    </div>
                    <div>
                        <h3 className='text-2xl font-semibold mb-2'>Contatos</h3>
                        <p>Email: contato@acaiamazonia.com.br</p>
                        <p>Telefone: (91) 99257-2999</p>
                        <p>Belém | PA</p>
                        <div className='mt-4 flex items-center justify-center gap-2 flex-wrap'>
                            <a href='/plataforma' className='underline underline-offset-4'>Plataforma</a>
                            <span>•</span>
                            <a href='/login' className='underline underline-offset-4'>Entrar/Criar conta</a>
                        </div>
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
                        <p>
                            © 2025 <b>AlvesN</b>. Todos os direitos reservados.
                            <br />
                            Desenvolvido com dedicação para promover sustentabilidade e geração de renda na cadeia do açaí.
                        </p>
                    </div>
                </footer>
            </Container>
        </section>
    )
}
