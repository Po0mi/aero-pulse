import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProductShowcase.scss";
import imgPro from "../assets/AeroPulse Pro.webp";
import imgAir from "../assets/AeroPulse Air.webp";
import imgStudio from "../assets/AeroPulse Studio.webp";
import useProductShowcaseAnimation from "../hooks/useProductShowcaseAnimation";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: "01",
    name: "AeroPulse Pro",
    tag: "FLAGSHIP",
    tagline: "Reference-Grade Studio Sound",
    description:
      "Engineered for professionals who demand absolute fidelity. Custom 40mm drivers deliver a flat, reference-grade frequency response with spatial imaging that rivals studio monitors.",
    price: "$399",
    features: ["Active ANC", "40H Battery", "BT 5.3"],
    image: imgPro,
  },
  {
    id: "02",
    name: "AeroPulse Air",
    tag: "EVERYDAY",
    tagline: "All-Day Comfort, Zero Compromise",
    description:
      "Featherlight construction meets premium audio. Breathable memory foam and a 28-hour battery make AeroPulse Air the ideal companion from morning commute to late-night listening.",
    price: "$229",
    features: ["Passive Isolation", "28H Battery", "BT 5.2"],
    image: imgAir,
  },
  {
    id: "03",
    name: "AeroPulse Studio",
    tag: "PROFESSIONAL",
    tagline: "Built for the Booth",
    description:
      "Planar magnetic drivers, a flat-response EQ, and wired + wireless connectivity — AeroPulse Studio is the definitive tool for recording, mixing, and mastering.",
    price: "$499",
    features: ["Planar Magnetic", "Wired + Wireless", "Flat EQ"],
    image: imgStudio,
  },
];

const ProductShowcase = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const bottomHeaderRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);

  useProductShowcaseAnimation({
    sectionRef,
    headerRef,
    bottomHeaderRef,
    imageRef,
    infoRef,
    active,
  });

  const goTo = useCallback(
    (next) => {
      if (animating || next === active) return;
      setAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setActive(next);
          setAnimating(false);
        },
      });

      tl.to(imageRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.45,
        ease: "power2.in",
      }).to(
        infoRef.current,
        { opacity: 0, y: 20, duration: 0.35, ease: "power2.in" },
        "<",
      );
    },
    [active, animating],
  );

  const prev = () => goTo((active - 1 + PRODUCTS.length) % PRODUCTS.length);
  const next = () => goTo((active + 1) % PRODUCTS.length);

  const product = PRODUCTS[active];

  return (
    <section id="products" className="product-showcase" ref={sectionRef}>
      {/* Header */}
      <div className="showcase-header" ref={headerRef}>
        <p className="showcase-eyebrow">[ THE LINEUP ]</p>
        <h2 className="showcase-title">PRECISION MEETS POWER</h2>
      </div>

      <div className="showcase-bottom-header" ref={bottomHeaderRef}>
        <p className="showcase-eyebrow-bottom">[ THE CORE ]</p>
        <h2 className="showcase-title-bottom">BUILT TO ENDURE</h2>
      </div>

      {/* Carousel */}
      <div className="carousel">
        <div className="carousel__image-stage" ref={imageRef}>
          <img
            className="carousel__image"
            src={product.image}
            alt={product.name}
          />
          <button
            className="carousel__nav-btn carousel__nav-btn--prev"
            onClick={prev}
            aria-label="Previous product"
          >
            ←
          </button>
          <button
            className="carousel__nav-btn carousel__nav-btn--next"
            onClick={next}
            aria-label="Next product"
          >
            →
          </button>
          <span className="carousel__counter">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(PRODUCTS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="carousel__info" ref={infoRef}>
          <div className="carousel__info-left">
            <p className="carousel__index">{product.id}</p>
            <h3 className="carousel__name">{product.name}</h3>
            <p className="carousel__tagline">{product.tagline}</p>
            <p className="carousel__description">{product.description}</p>
            <ul className="carousel__features">
              {product.features.map((f) => (
                <li key={f}>
                  <span className="feature-dot" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="carousel__info-right">
            <span className="carousel__price">{product.price}</span>
            <button className="carousel__cta">EXPLORE</button>

            <div className="carousel__dots">
              {PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  className={`carousel__dot${i === active ? " active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to product ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
