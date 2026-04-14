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
  {
    index: "06",
    title: "Advanced Touch Controls",
    body: "Intuitive gesture-based controls for playback, volume, and calls. Customize your experience with programmable touch zones.",
    tag: "TOUCH GESTURES",
  },
  {
    index: "07",
    title: "Premium Build Quality",
    body: "Aircraft-grade aluminum construction with diamond-cut finish. Engineered to withstand daily use while maintaining premium aesthetics.",
    tag: "AIRCRAFT ALUMINUM",
  },
  {
    index: "08",
    title: "Spatial Audio Technology",
    body: "Immersive 3D sound experience with dynamic head tracking. Feel every dimension of your music come alive around you.",
    tag: "3D SPATIAL AUDIO",
  },
];

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline line drawing in
      gsap.fromTo(
        ".tl-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".features-timeline",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      // Animate each timeline item
      gsap.utils.toArray(".tl-item").forEach((item, i) => {
        const isLeft = i % 2 === 0;
        const content = item.querySelector(".tl-content");
        const node = item.querySelector(".tl-node");

        gsap.fromTo(
          content,
          { opacity: 0, x: isLeft ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="features" ref={sectionRef}>
      <div className="feature-padding"></div>

      <div className="features-timeline">
        {/* The vertical line */}
        <div className="tl-track">
          <div className="tl-line-fill" />
        </div>

        {FEATURES.map((feature, i) => (
          <div
            key={feature.index}
            className={`tl-item ${i % 2 === 0 ? "tl-item--left" : "tl-item--right"}`}
          >
            {/* Content panel */}
            <div className="tl-content">
              <span className="tl-tag">{feature.tag}</span>
              <h3 className="tl-title">{feature.title}</h3>
              <p className="tl-body">{feature.body}</p>
            </div>

            {/* Center node */}
            <div className="tl-node">
              <span className="tl-index">{feature.index}</span>
              <div className="tl-node-ring" />
            </div>

            {/* Empty spacer on opposite side */}
            <div className="tl-spacer" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
