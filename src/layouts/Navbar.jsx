import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./Navbar.scss";
import useNavbarAnimation from "../hooks/useNavbarAnimation";

/**
 * @typedef {Object} NavLink
 * @property {string} label - The display text for the navigation link
 * @property {string} id - The DOM element ID of the target section for smooth scrolling
 */

/**
 * Configuration array for main navigation links.
 * Each link scrolls to a corresponding section ID on the same page (single-page app pattern).
 * @type {NavLink[]}
 */
const NAV_LINKS = [
  { label: "Hero", id: "hero" },
  { label: "About", id: "about" },
  { label: "Features", id: "features" },
  { label: "Products", id: "products" },
  { label: "Testimonials", id: "testimonials" },
];

/**
 * @typedef {Object} NavbarAnimationRefs
 * @property {React.RefObject<HTMLElement>} innerRef - Ref for the navbar inner container (width animation)
 * @property {React.RefObject<HTMLElement>} logoRef - Ref for the logo element (entrance animation)
 * @property {React.RefObject<HTMLElement>} linksRef - Ref for the nav links container (staggered animation)
 */

/**
/**
 * Navbar Component
 * 
 * A responsive, animated navigation bar with the following features:
 * - ✅ Smooth in-page scrolling to section anchors (with Lenis fallback)
 * - ✅ Dynamic background styling based on scroll position (transparent → solid)
 * - ✅ Active section highlighting via IntersectionObserver (50% viewport threshold)
 * - ✅ Mobile hamburger menu with slide-out overlay and ARIA accessibility attributes
 * - ✅ GSAP-powered animations for width transitions and entrance effects
 * 
 * @component
 * @example
 * // Usage in App.jsx
 * import Navbar from './components/Navbar';
 * 
 * function App() {
 *   return (
 *     <>
 *       <Navbar />
 *       <main>
 *         <section id="hero">...</section>
 *         <section id="about">...</section>
 *         // ... other sections with matching IDs
 *       </main>
 *     </>
 *   );
 * }
 * 
 * @returns {JSX.Element} The rendered navigation bar markup
 */
const Navbar = () => {
  // ─────────────────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  /** @type {[boolean, Function]} Mobile menu open/closed state */
  const [isOpen, setIsOpen] = useState(false);

  /** @type {[boolean, Function]} Tracks if user has scrolled past threshold (60px) */
  const [scrolled, setScrolled] = useState(false);

  /**
   * @type {[string, Function]}
   * ID of the currently visible section for active link highlighting.
   * Default: "home" (logo scroll target)
   */
  const [activeSection, setActiveSection] = useState("home");

  // ─────────────────────────────────────────────────────────────
  // REFS FOR ANIMATION & DOM ACCESS
  // ─────────────────────────────────────────────────────────────

  /** @type {React.RefObject<HTMLDivElement>} Container for GSAP width tweening */
  const innerRef = useRef(null);

  /** @type {React.RefObject<HTMLAnchorElement>} Logo element for entrance animation */
  const logoRef = useRef(null);

  /** @type {React.RefObject<HTMLUListElement>} Nav links container for staggered animations */
  const linksRef = useRef(null);

  // Initialize custom hook for entrance animations (logo + links)
  useNavbarAnimation({ innerRef, logoRef, linksRef });

  // ─────────────────────────────────────────────────────────────
  // EFFECT: Scroll Listener for Navbar Styling & Width Animation
  // ─────────────────────────────────────────────────────────────

  /**
   * Attaches a scroll event listener to:
   * 1. Update `scrolled` state when scrollY > 60px (triggers background change via CSS)
   * 2. Animate navbar inner container width using GSAP (1200px ↔ 780px)
   *
   * Uses passive: true for improved scroll performance.
   * Cleanup: Removes event listener on unmount.
   */
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 60;
      setScrolled(isScrolled);

      // GSAP animation: shrink/expand navbar container on scroll
      // Duration: 0.6s, Ease: power3.out for smooth deceleration
      gsap.to(innerRef.current, {
        maxWidth: isScrolled ? "780px" : "1200px",
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto", // Prevent animation conflicts
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array = run once on mount

  // ─────────────────────────────────────────────────────────────
  // EFFECT: IntersectionObserver for Active Section Detection
  // ─────────────────────────────────────────────────────────────

  /**
   * Sets up an IntersectionObserver to track which section is currently in view.
   *
   * Behavior:
   * - Observes all section elements defined in NAV_LINKS
   * - When a section is ≥50% visible in viewport → update activeSection state
   * - Active section highlights corresponding nav link via CSS class
   *
   * Cleanup: Disconnects observer on unmount to prevent memory leaks.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver}
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only update when section enters viewport (not when leaving)
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of target is visible
        rootMargin: "-80px 0px 0px 0px", // Optional: offset for fixed navbar height
      },
    );

    // Safely observe all section elements by ID
    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []); // Run once on mount; NAV_LINKS is static

  // ─────────────────────────────────────────────────────────────
  // EVENT HANDLERS
  // ─────────────────────────────────────────────────────────────

  /**
   * Toggles the mobile menu visibility state.
   * @returns {void}
   */
  const toggleMenu = () => setIsOpen((prev) => !prev);

  /**
   * Closes the mobile menu. Called after nav link selection.
   * @returns {void}
   */
  const closeMenu = () => setIsOpen(false);

  /**
   * Handles smooth scroll navigation to a target section.
   *
   * Features:
   * - Prevents default anchor jump behavior
   * - Supports Lenis smooth scroll library (if available on window)
   * - Falls back to native scrollIntoView if Lenis not present
   * - Automatically closes mobile menu after selection
   *
   * @param {React.MouseEvent<HTMLAnchorElement>} e - Click event object
   * @param {string} id - Target section DOM ID to scroll to
   * @returns {void}
   *
   * @example
   * handleNavClick(event, "features"); // Scrolls to <section id="features">
   */
  const handleNavClick = (e, id) => {
    e.preventDefault();

    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Navbar: Section with id "${id}" not found.`);
      return;
    }

    // Prefer Lenis for enhanced smooth scrolling (if globally available)
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(element, {
        offset: -80, // Compensate for fixed navbar height
        duration: 1.4, // Animation duration in seconds
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom ease
      });
    } else {
      // Fallback to native smooth scrolling
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    closeMenu(); // Ensure mobile menu closes after selection
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <>
      {/* 
        Main Navigation Bar
        CSS Classes:
        - 'scrolled': Applied when scrollY > 60px (triggers background/shadow)
        - 'menu-open': Applied when mobile menu is active (prevents body scroll)
      */}
      <nav
        className={`navbar${scrolled ? " scrolled" : ""}${isOpen ? " menu-open" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-inner" ref={innerRef}>
          {/* 
            Logo / Brand Link 
            Clicking scrolls to "home" section (typically page top)
          */}
          <a
            href="#home"
            className="navbar-logo"
            ref={logoRef}
            onClick={(e) => handleNavClick(e, "home")}
            aria-label="Aeropulse - Scroll to top"
          >
            <span className="navbar-logo-text">Aeropulse</span>
          </a>

          {/* 
            Desktop Navigation Links 
            Rendered as horizontal list; hidden on mobile via CSS
          */}
          <ul className="navbar-links" ref={linksRef}>
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id} className="navbar-link">
                <a
                  href={`#${id}`}
                  className={activeSection === id ? "active" : ""}
                  onClick={(e) => handleNavClick(e, id)}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* 
            Mobile Hamburger Button 
            Three-line icon that animates to "X" when open
            ARIA attributes for screen reader accessibility
          */}
          <button
            className={`navbar-hamburger${isOpen ? " open" : ""}`}
            onClick={toggleMenu}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="navbar-mobile-menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* 
        Mobile Menu Overlay 
        Slide-out panel activated when isOpen = true
        Hidden from screen readers when closed via aria-hidden
      */}
      <div
        id="navbar-mobile-menu"
        className={`navbar-mobile${isOpen ? " open" : ""}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        <p className="navbar-mobile-eyebrow" aria-hidden="true">
          [ Navigation ]
        </p>

        <ul className="navbar-mobile-links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id} className="navbar-mobile-link">
              <a
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                onClick={(e) => handleNavClick(e, id)}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <span className="navbar-mobile-footer" aria-hidden="true">
          © 2026 Aeropulse
        </span>
      </div>
    </>
  );
};

export default Navbar;
