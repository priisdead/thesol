import React, { useState } from "react";
import SampleKitRequest from "../components/SampleKitRequest";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("rfq"); // 'rfq', 'samples'
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    volume: "50,000",
    paper: "flax",
    packaging: "slider",
    designDetail: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.company || !formState.email) {
      alert("Please fill out required fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper contact-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="contact-header text-center-wrapper reveal-on-scroll">
          <span className="section-badge">COMMUNICATIONS CENTER</span>
          <h1 className="section-title">CONNECT WITH SOL</h1>
          <p className="section-subtitle-center">
            Submit a formal Request for Quotation (RFQ) or request a complimentary physical sample box.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="contact-tabs-row reveal-on-scroll">
          <button
            onClick={() => setActiveTab("rfq")}
            className={`contact-tab ${activeTab === "rfq" ? "active" : ""}`}
          >
            SUBMIT CONTRACT RFQ
          </button>
          <button
            onClick={() => setActiveTab("samples")}
            className={`contact-tab ${activeTab === "samples" ? "active" : ""}`}
          >
            REQUEST TRIAL SAMPLE KIT
          </button>
        </div>

        {/* Tab Content */}
        <div className="contact-main-grid">
          <div className="contact-form-column">
            {activeTab === "rfq" ? (
              submitted ? (
                <div className="success-overlay-panel fade-in">
                  <div className="success-icon">✓</div>
                  <h3>RFQ DEPOSIT SUCCESSFUL</h3>
                  <p>
                    Your technical RFQ has been logged in our manufacturing ledger. An Account Director will review your paper selections and package requirements and return a formal quote sheet within 2 business hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-silver">
                    SUBMIT NEW RFQ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rfq-page-form reveal-on-scroll">
                  <h3 className="form-heading">SUBMIT Wholesale RFQ</h3>
                  
                  <div className="form-grid-fields">
                    <div className="form-field">
                      <label>YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        className="mfg-input"
                        placeholder="e.g. Johnathan Stark"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label>COMPANY NAME *</label>
                      <input
                        type="text"
                        required
                        className="mfg-input"
                        placeholder="e.g. Pacific Coast Labs"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-fields">
                    <div className="form-field">
                      <label>BUSINESS EMAIL *</label>
                      <input
                        type="email"
                        required
                        className="mfg-input"
                        placeholder="name@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label>BUSINESS PHONE</label>
                      <input
                        type="tel"
                        className="mfg-input"
                        placeholder="+1 (555) 018-2947"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-fields">
                    <div className="form-field">
                      <label>ESTIMATED RUN VOLUME</label>
                      <select
                        className="mfg-input"
                        value={formState.volume}
                        onChange={(e) => setFormState({ ...formState, volume: e.target.value })}
                      >
                        <option value="20,000">20,000 Cones (MOQ)</option>
                        <option value="50,000">50,000 Cones</option>
                        <option value="100,000">100,000 Cones</option>
                        <option value="250,000+">250,000+ Cones</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>PAPER BASE PREFERENCE</label>
                      <select
                        className="mfg-input"
                        value={formState.paper}
                        onChange={(e) => setFormState({ ...formState, paper: e.target.value })}
                      >
                        <option value="flax">Ultra-Thin Flax (12.5gsm)</option>
                        <option value="hemp">Organic Hemp (13.5gsm)</option>
                        <option value="wood">Unbleached Wood Pulp (14gsm)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>PACKAGING SOLUTIONS REQUIRED</label>
                    <select
                      className="mfg-input"
                      value={formState.packaging}
                      onChange={(e) => setFormState({ ...formState, packaging: e.target.value })}
                    >
                      <option value="none">None (Bulk Cones inside Foil Bags Only)</option>
                      <option value="slider">Child-Resistant Slider Boxes</option>
                      <option value="magnetic">Magnetic Display Boxes</option>
                      <option value="tube">Aluminum Single Tubes</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Branding & Sizing Notes</label>
                    <textarea
                      rows="4"
                      className="mfg-input font-sans"
                      placeholder="Detail logo placement on crutch, custom watermarks, custom dimensions (e.g. 98mm cone with 30mm filter), and shipping logistics requirements."
                      value={formState.designDetail}
                      onChange={(e) => setFormState({ ...formState, designDetail: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-silver btn-full m-top-1">
                    SUBMIT WHOLESALE CONTRACT RFQ
                  </button>
                </form>
              )
            ) : (
              /* Trial Sample Kit section */
              <div className="fade-in">
                <SampleKitRequest />
              </div>
            )}
          </div>

          {/* Side Info Column */}
          <div className="contact-info-column reveal-on-scroll">
            <div className="info-glass-card">
              <h4>CORPORATE OFFICES</h4>
              <p>SOL FRANCE</p>

              <div className="office-card">
                <h5>Manufacturing HQ</h5>
                <p>D63B, UPISDC Site 4, Greater Noida 201306, India</p>
              </div>

              <div className="office-card">
                <h5>Direct Contact Lines</h5>
                <p>
                  <strong>India:</strong> +91 (991) 038-3001
                </p>
                <p>
                  <strong>USA:</strong> +1 (702) 287-9997
                </p>
                <p>
                  <strong>Email:</strong> braj@thesolfactory.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
