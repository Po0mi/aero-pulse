import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useAboutAnimation
 *
 * ScrollTrigger-driven entrance animations for the About section.
 * Each element animates as it enters the viewport.
 */
const useAboutAnimation = ({
  sectionRef,
  headingRef,
  secondHeadingRef,
  metaRef,
  imageRef,
  bodyRef,
  priceRef,
}) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      };

      // Heading 1 — clip open left → right (same expand as hero meta)
      gsap.fromTo(
        headingRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: trigger,
        }
      );

      // Heading 2 — clip open right → left, slightly delayed
      gsap.fromTo(
        secondHeadingRef.current,
        { clipPath: "inset(0 0% 0 100%)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0%)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { ...trigger, start: "top 65%" },
        }
      );

      // Meta — fade + slide down
      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: -16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: trigger,
        }
      );

      // Image — rise from below with scale
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { ...trigger, start: "top 70%" },
        }
      );

      // Body copy — fade + drift up
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { ...trigger, start: "top 60%" },
        }
      );

      // Price tag — fade + slide up last
      gsap.fromTo(
        priceRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { ...trigger, start: "top 55%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, headingRef, secondHeadingRef, metaRef, imageRef, bodyRef, priceRef]);
};

export default useAboutAnimation;
