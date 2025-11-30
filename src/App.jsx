import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Visuals from './components/Visuals';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Marquee from './components/Marquee';
import Contact from './components/Contact';
import Setup from './pages/setup';
import './App.css';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Visuals />
      <Skills />
      <Marquee />
      <Contact />
    </>
  );
}

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
