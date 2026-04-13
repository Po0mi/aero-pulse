import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Features.scss";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    index: "01",
    title: "Adaptive Noise Cancellation",
    body: "Smart sensors detect your environment and automatically adjust noise cancellation levels — so you stay focused anywhere.",
    tag: "ANC",
  },
  {
    index: "02",
    title: "Precision-Tuned Audio",
    body: "Experience deep bass, crisp highs, and balanced mids powered by custom 40mm drivers. Studio-quality sound, wherever you go.",
    tag: "40MM DRIVERS",
  },
  {
    index: "03",
    title: "40-Hour Battery Life",
    body: "Stay unplugged longer. Get up to 40 hours of playtime on a single charge, with fast charging that gives you 5 hours in just 10 minutes.",
    tag: "FAST CHARGE",
  },
  {
    index: "04",
    title: "Ultra-Light Comfort Design",
    body: "Crafted with breathable memory foam ear cushions and a lightweight frame for all-day wear — no pressure, no fatigue.",
    tag: "MEMORY FOAM",
  },
  {
    index: "05",
    title: "Seamless Connectivity",
    body: "Bluetooth 5.3 ensures fast pairing and stable connections across all your devices.",
    tag: "BT 5.3",
  },
];

const Features = () => {
  const stackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackRef.current,
          pin: true,
          start: "top top",
          end: `+=${FEATURES.length * 300}`,
          scrub: 1,
        },
      });

      tl.to(".features-card-body", {
        height: 0,
        paddingBottom: 0,
        opacity: 0,
        stagger: 0.5,
      });

      tl.to(
        ".features-card",
        {
          marginBottom: -15,
          stagger: 0.5,
        },
        "<",
      );
    }, stackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="features">
      <div className="features-header">
        <h2 className="features-title">Built different.</h2>
      </div>

      <div className="features-stack" ref={stackRef}>
        {FEATURES.map((feature, i) => (
          <div
            key={feature.index}
            className="features-card"
            style={{ "--card-index": i }}
          >
            <div className="features-card-inner">
              <span className="features-card-tag">{feature.tag}</span>
              <h3 className="features-card-title">{feature.title}</h3>
              <p className="features-card-body">{feature.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
