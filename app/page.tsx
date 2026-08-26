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

import FixedArtboard from '@/components/FixedArtboard/FixedArtboard';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <FixedArtboard artboardWidth={1440}><Hero /></FixedArtboard>
        <div style={{ marginTop: '-4px', position: 'relative', zIndex: 2 }}>
          <FixedArtboard artboardWidth={1440}><About /></FixedArtboard>
        </div>
        <FixedArtboard artboardWidth={1440}><Work /></FixedArtboard>
        <GraphicProjects />
        <FixedArtboard artboardWidth={1440}><Services /></FixedArtboard>
        <FixedArtboard artboardWidth={1440}><Contact /></FixedArtboard>
      </main>
      <Footer />
    </>
  );
}
