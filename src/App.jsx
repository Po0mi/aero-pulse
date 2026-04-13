import "./App.css";
import Navbar from "./layouts/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Features />
    </div>
  );
}

export default App;
