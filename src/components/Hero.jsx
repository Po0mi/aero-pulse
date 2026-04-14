import React from "react";
import "./Hero.scss";
import heroHeadphones from "../assets/hero-headphones.png";

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-wrapper"></div>
      <div className="hero-container">
        <div className="hero-meta">
          <span className="hero-meta-label">[ Signal status ]</span>
          <div className="hero-meta-value-wrapper">
            <span className="pulsing-dot"></span>
            <span className="hero-meta-value">Optimal</span>
          </div>
        </div>
        <div className="hero-bottom-meta">
          <span className="bottom-label">
            [ <strong>MODEL:</strong> AP-X02 ] <br /> [ <strong>SERIES:</strong>{" "}
            Pro Origin: AeroPulse Labs, Tokyo ]
          </span>
        </div>
        <h1 className="hero-title">AeroPulse</h1>
        <p className="hero-subtitle">
          Elevate the sound, expand your experience.
        </p>
        <p className="hero-body">
          The AeroPulse Pro is not a consumer peripheral. It is a
          high-performance aerospace instrument engineered for absolute acoustic
          fidelity.
        </p>
        <div className="hero-image-wrapper">
          <img
            src={heroHeadphones}
            alt="AeroPulse headphones"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
