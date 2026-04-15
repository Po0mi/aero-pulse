import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useFinalCTAAnimation
 *
 * ScrollTrigger-driven entrance for the Final CTA section.
 *
 * @param {React.RefObject} sectionRef   - The <section> element
 * @param {React.RefObject} eyebrowRef   - [ FINAL CALL ] label
 * @param {React.RefObject} headlineRef  - The headline element (contains .cta-char spans)
 * @param {React.RefObject} sublineRef   - Subline paragraph
 * @param {React.RefObject} actionsRef   - Button row
 * @param {React.RefObject} proofRef     - Social proof strip
 */
const useFinalCTAAnimation = ({
  sectionRef,
  eyebrowRef,
  headlineRef,
  sublineRef,
  actionsRef,
  proofRef,
}) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = (el, start = "top 80%") => ({
        trigger: el,
        start,
        toggleActions: "play none none none",
      });

      // Eyebrow — clip open left → right
      gsap.fromTo(
        eyebrowRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: trigger(eyebrowRef.current),
        }
      );

      // Headline — cinematic per-character rise (same as hero title)
      const chars = headlineRef.current.querySelectorAll(".cta-char");
      gsap.fromTo(
        chars,
        { yPercent: 110, opacity: 0, rotateX: -40 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: { each: 0.045, from: "start" },
          scrollTrigger: trigger(headlineRef.current, "top 82%"),
        }
      );

      // Subline — fade + drift up
      gsap.fromTo(
        sublineRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: trigger(sublineRef.current, "top 85%"),
        }
      );

      // Buttons — fade + scale up from slightly below
      gsap.fromTo(
        actionsRef.current,
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: trigger(actionsRef.current, "top 88%"),
        }
      );

      // Proof strip — fade in last
      gsap.fromTo(
        proofRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: trigger(proofRef.current, "top 92%"),
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, eyebrowRef, headlineRef, sublineRef, actionsRef, proofRef]);
};

export default useFinalCTAAnimation;
