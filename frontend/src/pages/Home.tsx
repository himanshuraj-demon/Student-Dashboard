import Nav from '../components/homecomponents/Nav';
import Hero from '../components/homecomponents/Hero';
import Features from '../components/homecomponents/Features';
import About from '../components/homecomponents/About';
import Contact from '../components/homecomponents/Contact';
import Footer from '../components/homecomponents/Footer';

const Home = () => {
  return (
    <div className="landingPage bg-void">
      <Nav />
      <Hero />
      <Features />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;