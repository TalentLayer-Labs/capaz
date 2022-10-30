import Hero from '../components/home/Hero';
import Logo from '../components/home/Logo';
import Content from '../components/home/Content';
import Footer from '../components/home/Footer';
import Menu from '../components/home/Menu';
import Chain from '../components/home/Chain';

function Home() {
  return (
    <>
      <Menu />
      <Hero />
      <Chain />
      <Logo />
      <Content />
      <Footer />
    </>
  );
}

export default Home;
