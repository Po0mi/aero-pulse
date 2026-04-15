import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./Navbar.scss";
import useNavbarAnimation from "../hooks/useNavbarAnimation";

/**
 * Configuration for main navigation links.
 * 'id' corresponds to the DOM element ID of the section on the page.
 */
const NAV_LINKS = [
  { label: "Hero", id: "hero" },
  { label: "About", id: "about" },
  { label: "Features", id: "features" },
  { label: "Products", id: "products" },
  { label: "Testimonials", id: "testimonials" },
];

/**
 * Navbar Component
 *
 * A responsive navigation bar that supports:
 * 1. Smooth scrolling to section IDs instead of routing to new pages.
 * 2. Dynamic styling based on scroll position (transparent vs. solid background).
 * 3. Active state highlighting using IntersectionObserver.
 * 4. A mobile-friendly hamburger menu with slide-out animation.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const innerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);

  useNavbarAnimation({ innerRef, logoRef, linksRef });

  // GSAP width shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 60;
      setScrolled(isScrolled);

      gsap.to(innerRef.current, {
        maxWidth: isScrolled ? "780px" : "1200px",
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Effect: Intersection Observer for Active Links
   * Observes all target sections. When a section enters the viewport (50% visibility),
   * it updates the 'activeSection' state to highlight the corresponding nav link.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }, // Trigger when 50% of the section is visible
    );

    // Combine all IDs to observe
    const allIds = NAV_LINKS.map((link) => link.id);

    allIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  /**
   * Toggles the mobile menu open/closed state.
   */
  const toggleMenu = () => setIsOpen(!isOpen);

  /**
   * Closes the mobile menu. Used as a callback after clicking a link.
   */
  const closeMenu = () => setIsOpen(false);

  /**
   * Handles smooth scrolling to a specific section ID.
   *
   * @param {Event} e - The click event object.
   * @param {string} id - The ID of the target section.
   */
  const handleNavClick = (e, id) => {
    e.preventDefault();

    const element = document.getElementById(id);
    if (!element) return;

    if (window.lenis) {
      window.lenis.scrollTo(element, { offset: -80, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }

    closeMenu();
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        className={`navbar${scrolled ? " scrolled" : ""}${isOpen ? " menu-open" : ""}`}
      >
        <div className="navbar-inner" ref={innerRef}>
          {/* Logo: Clicking scrolls to 'home' */}
          <a
            href="#home"
            className="navbar-logo"
            ref={logoRef}
            onClick={(e) => handleNavClick(e, "home")}
          >
            <span className="navbar-logo-text">Aeropulse</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="navbar-links" ref={linksRef}>
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id} className="navbar-link">
                <a
                  href={`#${id}`}
                  className={activeSection === id ? "active" : ""}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className={`navbar-hamburger${isOpen ? " open" : ""}`}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`navbar-mobile${isOpen ? " open" : ""}`}
        aria-hidden={!isOpen}
      >
        <p className="navbar-mobile-eyebrow">[ Navigation ]</p>
        <ul className="navbar-mobile-links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id} className="navbar-mobile-link">
              <a
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <span className="navbar-mobile-footer">© 2026 Aeropulse</span>
      </div>
    </>
  );
};

export default Navbar;
