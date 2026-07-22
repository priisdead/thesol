import React, { useState } from "react";

export default function Footer({ setRoute }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const navigateTo = (route) => {
    setRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="global-footer">
      {/* Newsletter Block */}
      <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-text">
            <h3>RECEIVE INDUSTRIAL INSIGHTS</h3>
            <p>Subscribe to stay informed on pre-roll compliance, supply chain news, and product releases.</p>
          </div>
          <div className="newsletter-form-wrapper">
            {subscribed ? (
              <span className="subscribe-success fade-in">
                EMAIL REGISTRATION LOGGED. WELCOME TO THE ARCHIVE.
              </span>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter business email address"
                  className="newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-silver btn-newsletter">
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="footer-links-area">
        <div className="footer-container">
          <div className="footer-brand-column">
            <h3 className="footer-logo" onClick={() => navigateTo("home")}>
              SOL
            </h3>
            <p className="brand-pitch">
              SOL is the world's leading OEM partner for licensed pre-roll brands, providing GMP-grade pre-rolled cones, rolling papers, and high-performance custom packaging solutions.
            </p>
            <div className="footer-contact-details">
              <p>
                <strong>Manufacturing HQ:</strong> D63B, UPISDC Site 4, Greater Noida 201306, India
              </p>
              <p>
                <strong>Email:</strong> braj@thesolfactory.com
              </p>
              <p>
                <strong>Phone:</strong> +91 (991) 038-3001 · +1 (702) 287-9997
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-container bottom-flex">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} SOL Pre-Roll & Packaging Manufacturing. All Rights Reserved.
          </p>
          <div className="legal-links">
            <button onClick={() => navigateTo("privacy")} className="bottom-link">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo("terms")} className="bottom-link">
              Terms of Service
            </button>
            <button onClick={() => navigateTo("shipping")} className="bottom-link">
              Shipping & Lead Times
            </button>
            <button onClick={() => navigateTo("returns")} className="bottom-link">
              Returns & Claims
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
