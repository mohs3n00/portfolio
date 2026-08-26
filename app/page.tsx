import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';

// Dynamically import everything below the fold
const About = dynamic(() => import('@/components/About/About'));
const Work = dynamic(() => import('@/components/Work/Work'));
const Services = dynamic(() => import('@/components/Services/Services'));
const Contact = dynamic(() => import('@/components/Contact/Contact'));
const GraphicProjects = dynamic(() => import('@/components/GraphicProjects/GraphicProjects'));
const Footer = dynamic(() => import('@/components/Footer/Footer'));

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
