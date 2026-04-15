import { useEffect } from "react";
import gsap from "gsap";

/**
 * useHeroAnimation
 *
 * Runs a staggered entrance timeline on the Hero section.
 * Pass refs for each element you want animated.
 *
 * Order: meta → title → subtitle → body → image → bottomMeta
 */
const useHeroAnimation = ({ metaRef, titleRef, subtitleRef, bodyRef, imageRef, bottomMetaRef }) => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Meta — container expands from zero width, then children reveal
    const metaLabel = metaRef.current.querySelector(".hero-meta-label");
    const metaValue = metaRef.current.querySelector(".hero-meta-value-wrapper");

    // Container: clip open left → right
    tl.fromTo(
      metaRef.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 1 },
      { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.out" }
    );

    // Label slides down from above inside the now-open container
    tl.fromTo(
      metaLabel,
      { y: -14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.4"
    );

    // Value row slides up from below
    tl.fromTo(
      metaValue,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.4"
    );

    // 2. Title — cinematic per-character clip reveal
    const chars = titleRef.current.querySelectorAll(".hero-title__char");
    tl.fromTo(
      chars,
      { yPercent: 110, opacity: 0, rotateX: -40 },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: { each: 0.055, from: "start" },
      },
      "-=0.3"
    );

    // 3. Subtitle — fade + slide from left
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7 },
      "-=0.6"
    );

    // 4. Body copy — fade in slightly delayed
    tl.fromTo(
      bodyRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5"
    );

    // 5. Headphones image — rise up from below with subtle scale
    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: 80, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
      "-=0.9"
    );

    // 6. Bottom meta — expand from right to left, then text reveals
    const bottomLabel = bottomMetaRef.current.querySelector(".bottom-label");

    tl.fromTo(
      bottomMetaRef.current,
      { clipPath: "inset(0 0% 0 100%)", opacity: 1 },
      { clipPath: "inset(0 0% 0 0%)", duration: 0.9, ease: "expo.out" },
      "-=0.8"
    );

    tl.fromTo(
      bottomLabel,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.4"
    );

    return () => tl.kill();
  }, [metaRef, titleRef, subtitleRef, bodyRef, imageRef, bottomMetaRef]);
};

export default useHeroAnimation;
