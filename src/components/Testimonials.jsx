import { useEffect, useRef, useState, useCallback } from "react";
import "./Testimonials.scss";

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
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardMargin = 40;
  const isPausedRef = useRef(false);
  const currentIndexRef = useRef(0);

  const getCardWidth = useCallback(() => {
    const card = cardRefs.current[0];
    return card ? card.offsetWidth : 400;
  }, []);

  const goToCard = useCallback(
    (index) => {
      const wrapped = ((index % CARDS.length) + CARDS.length) % CARDS.length;
      setCurrentIndex(wrapped);
      currentIndexRef.current = wrapped;
      if (trackRef.current) {
        const totalCardWidth = getCardWidth() + cardMargin;
        trackRef.current.style.transform = `translateX(${-wrapped * totalCardWidth}px)`;
      }
    },
    [getCardWidth],
  );

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedRef.current) goToCard(currentIndexRef.current + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [goToCard]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goToCard(currentIndexRef.current - 1);
      if (e.key === "ArrowRight") goToCard(currentIndexRef.current + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToCard]);

  // Touch
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let touchStartX = 0;
    const onTouchStart = (e) => (touchStartX = e.changedTouches[0].screenX);
    const onTouchEnd = (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (diff > 50) goToCard(currentIndexRef.current + 1);
      else if (diff < -50) goToCard(currentIndexRef.current - 1);
    };
    track.addEventListener("touchstart", onTouchStart);
    track.addEventListener("touchend", onTouchEnd);
    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, [goToCard]);

  // Resize
  useEffect(() => {
    const handleResize = () => {
      if (!trackRef.current) return;
      const totalCardWidth = getCardWidth() + cardMargin;
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(${-currentIndexRef.current * totalCardWidth}px)`;
      setTimeout(() => {
        if (trackRef.current)
          trackRef.current.style.transition =
            "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      }, 50);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getCardWidth]);

  // Mouse parallax
  const handleMouseMove = useCallback((e, cardEl) => {
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
    cardEl.style.transform = "";
    cardEl
      .querySelectorAll(".card-layer")
      .forEach((l) => (l.style.transform = ""));
  }, []);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">VOICES OF PRECISION</h2>
        <p className="testimonials-subtitle">
          [ Discover why professionals trust AeroPulse Pro ]
        </p>
      </div>

      <div
        className="carousel"
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
      >
        <div className="carousel-track" ref={trackRef}>
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

        <div className="carousel-controls">
          <button
            className="carousel-button prev"
            onClick={() => goToCard(currentIndexRef.current - 1)}
            aria-label="Previous"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="carousel-button next"
            onClick={() => goToCard(currentIndexRef.current + 1)}
            aria-label="Next"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="dots-container">
          {CARDS.map((_, i) => (
            <button
              key={i}
              className={`dot${i === currentIndex ? " active" : ""}`}
              onClick={() => goToCard(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
