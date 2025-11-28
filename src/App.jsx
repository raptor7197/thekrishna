import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Visuals from './components/Visuals';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Marquee from './components/Marquee';
import Contact from './components/Contact';
import './App.css';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Visuals />
      <Skills />
      <Marquee />
      <Contact />
    </div>
  );
}

export default App;
