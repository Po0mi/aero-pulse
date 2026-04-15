import { useRef } from "react";
import "./About.scss";
import SideHeadphones from "../assets/side-headphones.webp";
import useAboutAnimation from "../hooks/useAboutAnimation";

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const secondHeadingRef = useRef(null);
  const metaRef = useRef(null);
  const imageRef = useRef(null);
  const bodyRef = useRef(null);
  const priceRef = useRef(null);

  useAboutAnimation({
    sectionRef,
    headingRef,
    secondHeadingRef,
    metaRef,
    imageRef,
    bodyRef,
    priceRef,
  });

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        <h1 className="about-heading" ref={headingRef}>
          THE MACHINE IS
        </h1>
        <h1 className="about-second-heading" ref={secondHeadingRef}>
          BUILT DIFFERENT
        </h1>
        <p className="about-meta" ref={metaRef}>
          [ A revolutionary approach to audio technology ]
        </p>
        <div className="about-image-wrapper" ref={imageRef}>
          <img
            src={SideHeadphones}
            alt="About placeholder"
            className="about-image"
          />
        </div>
        <p className="about-body" ref={bodyRef}>
          We did not build another speaker. We built a vacuum. By eliminating
          mechanical resonance at the molecular level, AeroPulse Pro creates an
          acoustic void where only the signal exists. Absolute fidelity through
          absolute stillness.
        </p>
        <div className="price-tag" ref={priceRef}>
          <span className="price-label">Starting at</span>
          <span className="price-value">
            $399 <span className="price-arrow">→</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default About;
