import { useEffect, useRef, useCallback } from "react";
import "./Testimonials.scss";
import useTestimonialsAnimation from "../hooks/useTestimonialsAnimation";

const CARDS = [
  {
    id: 1,
    type: "dark",
    heading: "ALEX CHEN",
    subheading: "AUDIO ENGINEER — STERLING STUDIOS",
    meta: "PROFESSIONAL",
    metaAlign: "left",
    body: "The acoustic precision is unmatched. These headphones have become my reference standard for mixing sessions. The spatial imaging is remarkable.",
  },
  {
    id: 2,
    type: "light",
    heading: "MAYA RODRIGUEZ",
    subheading: "SOUND DESIGNER — NEXUS MEDIA",
    meta: "ENDURANCE",
    metaAlign: "right",
    body: "I've tested every flagship on the market. AeroPulse Pro is the only one that doesn't fatigue after 8 hours of continuous use. Pure comfort innovation.",
  },
  {
    id: 3,
    type: "dark",
    heading: "JAMES MONTGOMERY",
    subheading: "PRODUCER — CRYSTAL WAVE RECORDS",
    meta: "INNOVATION",
    metaAlign: "left",
    body: "The adaptive noise cancellation algorithm is intelligent beyond anything I've experienced. It adapts to my environment seamlessly.",
  },
  {
    id: 4,
    type: "light",
    heading: "YUKI TANAKA",
    subheading: "MUSICIAN — AEROPULSE RECORDS",
    meta: "FIDELITY",
    metaAlign: "right",
    body: "These headphones brought back the joy of listening. The 40mm drivers deliver clarity that rivals professional studio monitors.",
  },
  {
    id: 5,
    type: "dark",
    heading: "ELENA VASQUEZ",
    subheading: "MASTERING ENGINEER — APEX AUDIO LABS",
    meta: "PRECISION",
    metaAlign: "left",
    body: "The frequency response is so linear, I've retired my reference monitors for initial checks. This is professional-grade audio, redefined.",
  },
  {
    id: 6,
    type: "light",
    heading: "DR. LISA CHEN",
    subheading: "ACOUSTIC RESEARCHER — INSTITUTE OF SOUND",
    meta: "SCIENCE",
    metaAlign: "right",
    body: "From a scientific perspective, the psychoacoustic tuning is extraordinary. These headphones don't just sound good — they sound true.",
  },
];

const DeconstructedCard = ({ card, cardRef, onMouseMove, onMouseLeave }) => {
  const isRight = card.metaAlign === "right";

  return (
    <article
      className={`deconstructed-card deconstructed-card--${card.type}`}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Background */}
      <div className="card-layer card-bg" />

      {/* Frame */}
      <div className="card-layer card-frame">
        <svg viewBox="0 0 300 400" preserveAspectRatio="none">
          <path className="frame-path" d="M 20,20 H 280 V 380 H 20 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="card-layer card-content">
        {isRight ? (
          <>
            <div className="fragment-meta align-right">
              <span className="meta-text">{card.meta}</span>
              <div className="meta-line" />
            </div>
            <div className="fragment-body">
              <p className="body-quote">"{card.body}"</p>
            </div>
            <div className="fragment-author align-right">
              <div className="stars">★★★★★</div>
              <h2 className="author-name">{card.heading}</h2>
              <p className="author-role">{card.subheading}</p>
            </div>
          </>
        ) : (
          <>
            <div className="fragment-meta">
              <div className="meta-line" />
              <span className="meta-text">{card.meta}</span>
            </div>
            <div className="fragment-body">
              <p className="body-quote">"{card.body}"</p>
            </div>
            <div className="fragment-author">
              <div className="stars">★★★★★</div>
              <h2 className="author-name">{card.heading}</h2>
              <p className="author-role">{card.subheading}</p>
            </div>
          </>
        )}
      </div>
    </article>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useTestimonialsAnimation({ sectionRef, headerRef, cardRefs });

  // Mouse parallax effect (preserved from original)
  const handleMouseMove = useCallback((e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    cardEl.style.transform = `perspective(1200px) rotateX(${(y - 0.5) * 8}deg) rotateY(${(x - 0.5) * -8}deg)`;

    cardEl.querySelectorAll(".card-layer").forEach((layer, i) => {
      const ox = (x - 0.5) * 10 * (i + 1);
      const oy = (y - 0.5) * 10 * (i + 1);
      layer.style.transform = `translate3d(${ox}px, ${oy}px, ${30 * (i + 1)}px)`;
    });
  }, []);

  const handleMouseLeave = useCallback((cardEl) => {
    if (!cardEl) return;
    cardEl.style.transform = "";
    cardEl
      .querySelectorAll(".card-layer")
      .forEach((l) => (l.style.transform = ""));
  }, []);

  // Cleanup transforms on unmount
  useEffect(() => {
    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          card.style.transform = "";
          card
            .querySelectorAll?.(".card-layer")
            ?.forEach((l) => (l.style.transform = ""));
        }
      });
    };
  }, []);

  return (
    <section id="testimonials" className="testimonials-section" ref={sectionRef}>
      <div className="testimonials-header" ref={headerRef}>
        <h2 className="testimonials-title">VOICES OF PRECISION</h2>
        <p className="testimonials-subtitle">
          [ Discover why professionals trust AeroPulse Pro ]
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="bento-grid">
        {CARDS.map((card, index) => (
          <DeconstructedCard
            key={card.id}
            card={card}
            cardRef={(el) => (cardRefs.current[index] = el)}
            onMouseMove={(e) =>
              cardRefs.current[index] &&
              handleMouseMove(e, cardRefs.current[index])
            }
            onMouseLeave={() =>
              cardRefs.current[index] &&
              handleMouseLeave(cardRefs.current[index])
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
