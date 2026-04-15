import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useProductShowcaseAnimation
 *
 * ScrollTrigger-driven entrance for the Product Showcase section.
 * Also handles the per-slide image/info transition used by the carousel.
 *
 * @param {object} refs
 * @param {React.RefObject} refs.sectionRef        - The <section> element
 * @param {React.RefObject} refs.headerRef         - Top-right header block
 * @param {React.RefObject} refs.bottomHeaderRef   - Bottom-left header block
 * @param {React.RefObject} refs.imageRef          - Carousel image stage
 * @param {React.RefObject} refs.infoRef           - Carousel info bar
 * @param {number}          active                 - Current active slide index
 */
const useProductShowcaseAnimation = ({
  sectionRef,
  headerRef,
  bottomHeaderRef,
  imageRef,
  infoRef,
  active,
}) => {
  // ── Section entry ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — clip open right → left
      gsap.fromTo(
        headerRef.current,
        { clipPath: "inset(0 0% 0 100%)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0%)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Bottom header — clip open left → right
      gsap.fromTo(
        bottomHeaderRef.current,
        { clipPath: "inset(0 100% 0 0%)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0%)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: bottomHeaderRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image stage — rise from below with scale
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Info bar — fade + drift up, slightly after image
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, headerRef, bottomHeaderRef, imageRef, infoRef]);

  // ── Per-slide transition (image & info swap) ───────────────────────────
  useEffect(() => {
    if (!imageRef.current || !infoRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.65, ease: "power3.out" }
    );

    gsap.fromTo(
      infoRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, delay: 0.1, ease: "power3.out" }
    );
  }, [active, imageRef, infoRef]);
};

export default useProductShowcaseAnimation;
