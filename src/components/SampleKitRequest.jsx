import React, { useState } from "react";

export default function SampleKitRequest() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "Producer",
    preference: "all",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.company || !formState.email) {
      alert("Please fill out all required fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="sample-kit-box" style={{ gridTemplateColumns: "1fr", maxWidth: "760px", margin: "0 auto" }}>
      <div className="sample-kit-form-side">
        {submitted ? (
          <div className="success-overlay-panel fade-in">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h3>SAMPLE ARCHIVE RESERVED</h3>
            <p>
              Your corporate request has been logged. An SOL Logistics Representative will
              verify your company details and issue a tracking ID for your sample box.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormState({
                  name: "",
                  company: "",
                  email: "",
                  phone: "",
                  industry: "Producer",
                  preference: "all",
                });
              }}
              className="btn btn-silver"
            >
              REQUEST ANOTHER BOX
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="kit-form">
            <h3 className="form-heading">REQUEST EVALUATION KIT</h3>
            <p className="form-subheading">Submit your business credentials to request a physical trial kit.</p>

            <div className="form-field">
              <label>FULL NAME *</label>
              <input
                type="text"
                required
                className="mfg-input"
                placeholder="e.g. Alexander Sterling"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>

            <div className="form-grid-fields">
              <div className="form-field">
                <label>COMPANY NAME *</label>
                <input
                  type="text"
                  required
                  className="mfg-input"
                  placeholder="e.g. Apex Cannabis Group"
                  value={formState.company}
                  onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                />
              </div>

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
            </div>

            <div className="form-grid-fields">
              <div className="form-field">
                <label>BUSINESS PHONE</label>
                <input
                  type="tel"
                  className="mfg-input"
                  placeholder="+1 (555) 019-2834"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>OPERATIONAL INDUSTRY</label>
                <select
                  className="mfg-input"
                  value={formState.industry}
                  onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                >
                  <option value="Producer">Licensed Producer (LP)</option>
                  <option value="MSO">Multi-State Operator (MSO)</option>
                  <option value="Dispensary">Dispensary Group / Retailer</option>
                  <option value="Brand">Independent Pre-roll Brand</option>
                  <option value="Distributor">Wholesaler / Distributor</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>PAPER SPECIFICATION INTEREST</label>
              <select
                className="mfg-input"
                value={formState.preference}
                onChange={(e) => setFormState({ ...formState, preference: e.target.value })}
              >
                <option value="all">Complete Variety (All Types)</option>
                <option value="hemp">Organic Unrefined Hemp</option>
                <option value="flax">Ultra-Thin Organic Flax</option>
                <option value="wood">Classic Wood Pulp</option>
              </select>
            </div>

            <button type="submit" className="btn btn-silver btn-full m-top-1">
              SUBMIT SECURE REQUEST
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
