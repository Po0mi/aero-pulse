import "./App.css";
import useLenis from "./hooks/useLenis";
import Cursor from "./components/Cursor";
import Navbar from "./layouts/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import ProductShowcase from "./components/ProductShowcase";
import FinalCTA from "./components/FinalCTA";
import Footer from "./layouts/Footer";

function App() {
  useLenis();

  return (
    <div className="App">
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Features />
      <ProductShowcase />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
