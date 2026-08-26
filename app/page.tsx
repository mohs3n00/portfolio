import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Work from '@/components/Work/Work';
import Services from '@/components/Services/Services';
import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import GraphicProjects from '@/components/GraphicProjects/GraphicProjects';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <GraphicProjects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
