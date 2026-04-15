import { useRef } from "react";
import "./FinalCTA.scss";
import useFinalCTAAnimation from "../hooks/useFinalCTAAnimation";

const FinalCTA = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const actionsRef = useRef(null);
  const proofRef = useRef(null);

  useFinalCTAAnimation({
    sectionRef,
    eyebrowRef,
    headlineRef,
    sublineRef,
    actionsRef,
    proofRef,
  });

  const HEADLINE = "HEAR THE DIFFERENCE";
  const words = HEADLINE.split(" ");
  let charIndex = 0;

  return (
    <section id="cta" className="final-cta" ref={sectionRef}>
      {/* Main content */}
      <div className="cta-inner">
        <p className="cta-eyebrow" ref={eyebrowRef}>
          [ FINAL CALL ]
        </p>

        <h2 className="cta-headline" ref={headlineRef} aria-label={HEADLINE}>
          {words.map((word, wi) => (
            <span key={wi} className="cta-word" aria-hidden="true">
              {word.split("").map((char) => {
                const idx = charIndex++;
                return (
                  <span key={idx} className="cta-mask">
                    <span className="cta-char">{char}</span>
                  </span>
                );
              })}
            </span>
          ))}
        </h2>

        <p className="cta-subline" ref={sublineRef}>
          Premium audio engineered for those who refuse to settle. <br />
          Your ears deserve nothing less.
        </p>

        <div className="cta-actions" ref={actionsRef}>
          <button className="cta-btn cta-btn--primary">
            <span className="btn-text">SHOP THE COLLECTION</span>
            <span className="btn-arrow">→</span>
          </button>
          <button className="cta-btn cta-btn--ghost">COMPARE MODELS</button>
        </div>

        {/* Social proof strip */}
        <div className="cta-proof" ref={proofRef}>
          <div className="proof-rating">
            <span className="proof-stars">★★★★★</span>
            <span className="proof-count">4.9 / 5 from 12,400+ reviews</span>
          </div>
          <span className="proof-divider" />
          <span className="proof-badge">
            AS SEEN IN WIRED, ROLLING STONE & STEREOPHILE
          </span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
