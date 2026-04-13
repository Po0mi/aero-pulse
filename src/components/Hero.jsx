import React from "react";
import "./Hero.scss";
import heroHeadphones from "../assets/hero-headphones.png";

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-wrapper"></div>
      <div className="hero-container">
        <h1 className="hero-title">AeroPulse</h1>
        <p className="hero-subtitle">
          Elevate the sound, expand your experience.
        </p>
        <div className="hero-image-wrapper">
          <img
            src={heroHeadphones}
            alt="AeroPulse headphones"
            className="hero-image"
          />
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="hero-scroll-track">
          <div className="hero-scroll-dot" />
        </div>
        <span className="hero-scroll-label">SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;
