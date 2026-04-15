import "./Footer.scss";

const LINKS = {
  Products: ["AeroPulse Pro", "AeroPulse Air", "AeroPulse Studio", "Accessories"],
  Support: ["FAQ", "Warranty", "Contact Us", "Returns"],
  Company: ["About", "Careers", "Press", "Privacy Policy"],
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Top row */}
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">Aeropulse</span>
            <p className="footer-tagline">
              Precision audio engineered for those <br /> who refuse to settle.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {Object.entries(LINKS).map(([group, items]) => (
              <div key={group} className="footer-nav-group">
                <p className="footer-nav-heading">[ {group} ]</p>
                <ul className="footer-nav-list">
                  {items.map((item) => (
                    <li key={item}>
                      <a href="#" className="footer-nav-link">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom row */}
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 AeroPulse Labs. All rights reserved.</span>
          <span className="footer-model">[ MODEL: AP-X02 — SERIES: Pro Origin ]</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
