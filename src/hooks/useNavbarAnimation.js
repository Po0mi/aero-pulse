import { useEffect } from "react";
import gsap from "gsap";

/**
 * useNavbarAnimation
 *
 * Entrance animation for the Navbar on page load.
 * Logo slides in from the left, links stagger in from above,
 * and the whole inner bar clips open top → bottom.
 *
 * @param {React.RefObject} innerRef  - The .navbar-inner element
 * @param {React.RefObject} logoRef   - The logo anchor
 * @param {React.RefObject} linksRef  - The <ul> containing nav links
 */
const useNavbarAnimation = ({ innerRef, logoRef, linksRef }) => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Bar clips down from top
    tl.fromTo(
      innerRef.current,
      { clipPath: "inset(0 0 100% 0)", opacity: 1 },
      { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.out" }
    );

    // Logo slides in from the left
    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5 },
      "-=0.3"
    );

    // Links stagger in from above
    const linkEls = linksRef.current?.querySelectorAll(".navbar-link");
    if (linkEls?.length) {
      tl.fromTo(
        linkEls,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 },
        "-=0.35"
      );
    }

    return () => tl.kill();
  }, [innerRef, logoRef, linksRef]);
};

export default useNavbarAnimation;
