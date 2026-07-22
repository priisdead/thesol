import React, { useState, useEffect, useRef } from "react";

export default function Header({ currentRoute, setRoute }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // hovered category key (only 'products')
  const [productsAccordionOpen, setProductsAccordionOpen] = useState(false); // mobile accordion state

  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (route, anchor = null) => {
    setRoute(route);
    setMobileMenuOpen(false);
    setActiveCategory(null);
    setProductsAccordionOpen(false);
    
    if (anchor) {
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMouseEnter = (catKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveCategory(catKey);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const mobileCategoriesList = [
    { label: "Pre-Rolled Cones", route: "products-pre-rolled-cones" },
    { label: "Blunt Cones & Hemp Wraps", route: "products-blunt-wraps" },
    { label: "Filter Tips & Crutches", route: "products-filter-tips" },
    { label: "Pre-Rolled Tubes", route: "products-pre-rolled-tubes" }
  ];

  return (
    <header className={`global-header ${scrolled ? "scrolled" : ""}`}>
      {/* TOP HEADER ROW */}
      <div className="header-top-row">
        <div className="header-top-container">
          {/* Left Side: Logo */}
          <div className="header-logo" onClick={() => navigateTo("home")}>
            <img
              src="/images/sol-france-logo.svg"
              alt="SOL France"
              style={{ height: "46px", width: "auto", display: "block" }}
            />
          </div>

          {/* Right Side: Quick Action Links & Phone & Account */}
          <div className="header-top-actions">
            <button onClick={() => navigateTo("contact")} className="btn btn-silver btn-sm header-action-btn">
              Request Sample Kit
            </button>
            <button onClick={() => navigateTo("contact")} className="btn btn-silver btn-sm header-action-btn">
              Request Quote
            </button>
            <a href="tel:+17022879997" className="header-phone-link">
              +1 (702) 287-9997
            </a>
            
            {/* Account Icon */}
            <button className="account-icon-btn" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            {/* Hamburger button visible on Tablet/Mobile */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="hamburger-btn" aria-label="Toggle Navigation">
              <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
              <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
              <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* SECOND HEADER ROW: Horizontal Category Navigation */}
      <div className="header-bottom-row">
        <div className="header-bottom-container">
          <nav className="category-nav" style={{ gap: "36px" }}>
            {/* Home link */}
            <div className="nav-category-wrapper">
              <button onClick={() => navigateTo("home")} className={`category-link-btn ${currentRoute === "home" && !activeCategory ? "active" : ""}`}>
                Home
              </button>
            </div>

            {/* Products (Mega Menu Link) */}
            <div
              className="nav-category-wrapper"
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => navigateTo("products")}
                className={`category-link-btn ${currentRoute === "products" || activeCategory === "products" ? "active" : ""}`}
              >
                Products
                <span className="arrow-down-mini"></span>
              </button>

              {/* Combined Products Mega Menu */}
              <div className={`premium-mega-menu ${activeCategory === "products" ? "open" : ""}`}>
                <div className="mega-menu-content" style={{ display: "block", padding: "26px 32px" }}>
                  {/* Left Side: Product Categories List */}
                  <div className="mega-menu-categories-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h5 className="mega-section-title" style={{ marginBottom: "8px", opacity: 0.5, letterSpacing: "0.15em", fontSize: "10px" }}>PRODUCTS BY SEGMENT</h5>
                    <ul className="mega-links-list" style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0 }}>
                      {[
                        { name: "Pre-Rolled Cones", route: "products-pre-rolled-cones" },
                        { name: "Blunt Cones & Hemp Wraps", route: "products-blunt-wraps" },
                        { name: "Filter Tips & Crutches", route: "products-filter-tips" },
                        { name: "Pre-Rolled Tubes", route: "products-pre-rolled-tubes" }
                      ].map((item, idx) => (
                        <li key={idx}>
                          <button 
                            onClick={() => navigateTo(item.route)} 
                            style={{ 
                              background: "none", 
                              border: "none", 
                              color: "#ffffff", 
                              fontSize: "17px", 
                              fontWeight: "700", 
                              textAlign: "left", 
                              padding: 0, 
                              cursor: "pointer", 
                              transition: "color 0.2s ease, transform 0.2s ease",
                              textTransform: "uppercase",
                              letterSpacing: "0.03em"
                            }}
                            className="mega-category-button-link"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ link */}
            <div className="nav-category-wrapper">
              <button onClick={() => navigateTo("home", ".faq-section")} className="category-link-btn">
                FAQ
              </button>
            </div>

            {/* Contact link */}
            <div className="nav-category-wrapper">
              <button onClick={() => navigateTo("contact")} className={`category-link-btn ${currentRoute === "contact" ? "active" : ""}`}>
                Contact
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* MOBILE DRAWER WITH ACCORDION ONLY FOR PRODUCTS */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <div className="header-logo" onClick={() => navigateTo("home")}>
            <img
              src="/images/sol-france-logo.svg"
              alt="SOL France"
              style={{ height: "40px", width: "auto", display: "block" }}
            />
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="close-drawer-btn">
            &times;
          </button>
        </div>

        {/* Mobile Categories Accordion & Links */}
        <ul className="mobile-accordion-list" style={{ marginTop: "24px" }}>
          {/* Home Link */}
          <li className="accordion-item">
            <button className="accordion-trigger" style={{ paddingRight: 0 }} onClick={() => navigateTo("home")}>
              <span>Home</span>
            </button>
          </li>

          {/* Products Accordion */}
          <li className="accordion-item">
            <button
              className={`accordion-trigger ${productsAccordionOpen ? "active" : ""}`}
              onClick={() => setProductsAccordionOpen(!productsAccordionOpen)}
            >
              <span>Products</span>
              <span className="accordion-arrow-icon"></span>
            </button>

            <div className={`accordion-content ${productsAccordionOpen ? "open" : ""}`}>
              <ul className="mobile-sub-links">
                {mobileCategoriesList.map((item, idx) => (
                  <li key={idx}>
                    <button onClick={() => navigateTo(item.route)}>{item.label}</button>
                  </li>
                ))}
                <li>
                  <button onClick={() => navigateTo("products")} className="mobile-featured-link">
                    View All Products &rarr;
                  </button>
                </li>
              </ul>
            </div>
          </li>

          {/* FAQ Link */}
          <li className="accordion-item">
            <button className="accordion-trigger" style={{ paddingRight: 0 }} onClick={() => navigateTo("home", ".faq-section")}>
              <span>FAQ</span>
            </button>
          </li>

          {/* Contact Link */}
          <li className="accordion-item">
            <button className="accordion-trigger" style={{ paddingRight: 0 }} onClick={() => navigateTo("contact")}>
              <span>Contact</span>
            </button>
          </li>
        </ul>

        {/* Mobile Action Drawer Footer */}
        <div className="mobile-drawer-actions">
          <button onClick={() => navigateTo("contact")} className="btn btn-silver btn-full">
            Request Sample Kit
          </button>
          <button onClick={() => navigateTo("contact")} className="btn btn-silver btn-full m-top-05">
            Request Quote
          </button>
          <a href="tel:+17022879997" className="mobile-action-link m-top-05">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            +1 (702) 287-9997
          </a>
        </div>
      </div>
    </header>
  );
}
