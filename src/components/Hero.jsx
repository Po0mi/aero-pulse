import { useRef } from "react";
import "./Hero.scss";
import heroHeadphones from "../assets/hero-headphones.webp";
import useHeroAnimation from "../hooks/useHeroAnimation";

const Hero = () => {
  const metaRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bodyRef = useRef(null);
  const imageRef = useRef(null);
  const bottomMetaRef = useRef(null);

  useHeroAnimation({
    metaRef,
    titleRef,
    subtitleRef,
    bodyRef,
    imageRef,
    bottomMetaRef,
  });

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-meta" ref={metaRef}>
          <span className="hero-meta-label">[ Signal status ]</span>
          <div className="hero-meta-value-wrapper">
            <span className="pulsing-dot"></span>
            <span className="hero-meta-value">Optimal</span>
          </div>
        </div>

        <div className="hero-bottom-meta" ref={bottomMetaRef}>
          <span className="bottom-label">
            [ <strong>MODEL:</strong> AP-X02 ] <br /> [ <strong>SERIES:</strong>{" "}
            Pro Origin: AeroPulse Labs, Tokyo ]
          </span>
        </div>

        <h1 className="hero-title" ref={titleRef} aria-label="AeroPulse">
          {"AeroPulse".split("").map((char, i) => (
            <span key={i} className="hero-title__mask">
              <span className="hero-title__char">{char}</span>
            </span>
          ))}
        </h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          Elevate the sound, expand your experience.
        </p>

        <p className="hero-body" ref={bodyRef}>
          The AeroPulse Pro is not a consumer peripheral. It is a
          high-performance aerospace instrument engineered for absolute acoustic
          fidelity.
        </p>

        <div className="hero-image-wrapper" ref={imageRef}>
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
