import Header from '@/components/Header';
import Hero from '@/components/Hero';
import KioskDemo from '@/components/KioskDemo/KioskDemo';
import Features from '@/components/Features';
import EarlyAccess from '@/components/EarlyAccess';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <KioskDemo />
        <Features />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
