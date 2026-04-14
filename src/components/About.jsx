import "./About.scss";
import SideHeadphones from "../assets/side-headphones.png";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <h1 className="about-heading">THE MACHINE IS</h1>
        <h1 className="about-second-heading">BUILT DIFFERENT</h1>
        <div className="about-image-wrapper">
          <img
            src={SideHeadphones}
            alt="About placeholder"
            className="about-image"
          />
        </div>
        <p className="about-body">
          We did not build another speaker. We built a vacuum. By eliminating
          mechanical resonance at the molecular level, AeroPulse Pro creates an
          acoustic void where only the signal exists. Absolute fidelity through
          absolute stillness.
        </p>
        <div className="price-tag">
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
