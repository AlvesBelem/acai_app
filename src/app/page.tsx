import { About } from "./_components/about";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { Services } from "./_components/services";
import { Testimonials } from "./_components/testimonials";
import { Faq } from "./_components/faq";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Faq />
      <Testimonials />
      <Footer />
    </div>
  )
}
