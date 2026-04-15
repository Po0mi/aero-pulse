import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursor.scss";

const Cursor = () => {
  const cursorRef = useRef(null);
  const crosshairRef = useRef(null);
  const coordsRef = useRef(null);
  const bracketsRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const crosshair = crosshairRef.current;
    const coords = coordsRef.current;
    const brackets = bracketsRef.current;

    document.body.style.cursor = "none";

    // Set initial position off-screen
    gsap.set(cursor, { x: -100, y: -100, opacity: 0 });

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      pos.current = { x, y };

      // Crosshair snaps instantly
      gsap.to(cursor, {
        x,
        y,
        duration: 0,
        opacity: 1,
      });

      // Update coordinate readout
      if (coords) {
        coords.textContent = `${String(Math.round(x)).padStart(4, "0")} / ${String(Math.round(y)).padStart(4, "0")}`;
      }
    };

    // Hover state — show brackets, hide crosshair lines, show label
    const onEnter = (e) => {
      const label = e.currentTarget.dataset.cursor || "";
      gsap.to(crosshair, { opacity: 0.3, scale: 0.6, duration: 0.3, ease: "power3.out" });
      gsap.to(brackets, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(coords, { opacity: 0, duration: 0.2 });

      if (label) {
        cursor.querySelector(".cursor__action").textContent = label;
        gsap.to(cursor.querySelector(".cursor__action"), { opacity: 1, duration: 0.2 });
      }
    };

    const onLeave = () => {
      gsap.to(crosshair, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(brackets, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power3.out" });
      gsap.to(coords, { opacity: 1, duration: 0.2 });
      gsap.to(cursor.querySelector(".cursor__action"), { opacity: 0, duration: 0.15 });
    };

    // Click — quick pulse on the crosshair
    const onDown = () => {
      gsap.to(crosshair, { scale: 0.7, opacity: 0.6, duration: 0.1, ease: "power2.in" });
    };

    const onUp = () => {
      gsap.to(crosshair, { scale: 1, opacity: 1, duration: 0.25, ease: "power3.out" });
    };

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], [data-cursor]"
    );

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      {/* Crosshair */}
      <div className="cursor__crosshair" ref={crosshairRef}>
        <span className="cursor__line cursor__line--h" />
        <span className="cursor__line cursor__line--v" />
        <span className="cursor__dot" />
      </div>

      {/* Corner brackets — appear on hover */}
      <div className="cursor__brackets" ref={bracketsRef}>
        <span className="cursor__bracket cursor__bracket--tl" />
        <span className="cursor__bracket cursor__bracket--tr" />
        <span className="cursor__bracket cursor__bracket--bl" />
        <span className="cursor__bracket cursor__bracket--br" />
      </div>

      {/* Coordinate readout */}
      <span className="cursor__coords" ref={coordsRef}>0000 / 0000</span>

      {/* Action label on hover */}
      <span className="cursor__action" />
    </div>
  );
};

export default Cursor;
