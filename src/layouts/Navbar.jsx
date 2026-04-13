import React, { useState, useEffect } from "react";
import "./Navbar.scss";

/**
 * Configuration for main navigation links.
 * 'id' corresponds to the DOM element ID of the section on the page.
 */
const NAV_LINKS = [
  { label: "Hero", id: "hero" },
  { label: "About", id: "about" },
  { label: "Features", id: "features" },
  { label: "Support", id: "support" },
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
  // State Management
  const [isOpen, setIsOpen] = useState(false); // Controls mobile menu visibility
  const [scrolled, setScrolled] = useState(false); // Controls navbar background style
  const [activeSection, setActiveSection] = useState("home"); // Tracks currently visible section

  /**
   * Effect: Handle Scroll Style
   * Adds a 'scrolled' class to the navbar when the user scrolls down more than 60px.
   * This is typically used to change the background from transparent to solid white.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
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
    e.preventDefault(); // Prevent default anchor jump behavior

    const element = document.getElementById(id);
    if (element) {
      // Calculate position accounting for fixed header height
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      closeMenu(); // Close mobile menu if open
    }
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        className={`navbar${scrolled ? " scrolled" : ""}${isOpen ? " menu-open" : ""}`}
      >
        <div className="navbar-inner">
          {/* Logo: Clicking scrolls to 'home' */}
          <a
            href="#home"
            className="navbar-logo"
            onClick={(e) => handleNavClick(e, "home")}
          >
            <span className="navbar-logo-text">Aeropulse</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="navbar-links">
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
