import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useTestimonialsAnimation
 *
 * ScrollTrigger-driven entrance for the Testimonials section.
 * Header clips in, then each bento card fades + rises with a stagger.
 *
 * @param {React.RefObject} sectionRef  - The <section> element
 * @param {React.RefObject} headerRef   - The title/subtitle header block
 * @param {React.RefObject[]} cardRefs  - Array of refs, one per card
 */
const useTestimonialsAnimation = ({ sectionRef, headerRef, cardRefs }) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — clip open left → right
      gsap.fromTo(
        headerRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards — staggered fade + rise, each with its own ScrollTrigger
      // so they animate as the grid scrolls into view row by row
      const cards = cardRefs.current.filter(Boolean);

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: (i % 3) * 0.1, // stagger within each visual row
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, headerRef, cardRefs]);
};

export default useTestimonialsAnimation;
