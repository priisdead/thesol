import React, { useState } from "react";

export default function LogisticsMap() {
  const [selectedHub, setSelectedHub] = useState("la");

  const hubs = {
    la: {
      name: "North America Hub (Los Angeles, CA)",
      coverage: "United States, Canada, Mexico",
      transit: { "West Coast": "1-2 Business Days", "East Coast": "2-3 Business Days", Canada: "3-4 Business Days" },
      moq: "20,000 Cones",
      stock: "15,000,000+ Cones standard inventory"
    },
    rotterdam: {
      name: "European Logistics Hub (Rotterdam, NL)",
      coverage: "European Union, United Kingdom, Switzerland",
      transit: { Western: "1-2 Business Days", Eastern: "2-4 Business Days", UK: "2-3 Business Days" },
      moq: "20,000 Cones",
      stock: "8,000,000+ Cones standard inventory"
    },
    bangkok: {
      name: "Asia-Pacific Assembly & Facility (Bangkok, TH)",
      coverage: "Thailand, Japan, Australia, New Zealand",
      transit: { Thailand: "Same-Day", Australia: "4-5 Business Days", Japan: "3-4 Business Days" },
      moq: "50,000 Cones (Custom Mfg)",
      stock: "Mass Production & Direct Ocean Freight Hub"
    }
  };

  return (
    <div className="logistics-container">
      <div className="logistics-info-panel">
        <h3 className="logistics-h3">GLOBAL DISTRIBUTION NETWORK</h3>
        <p className="logistics-p">
          We maintain high-density storage and customs-cleared freight hubs strategically located 
          near major licensing jurisdictions. This allows us to offer unmatched fulfillment times 
          and bypass international supply-chain disruptions.
        </p>

        <div className="hub-selectors">
          {Object.keys(hubs).map((hKey) => (
            <button
              key={hKey}
              onClick={() => setSelectedHub(hKey)}
              className={`hub-tab-btn ${selectedHub === hKey ? "active" : ""}`}
            >
              <div className="btn-indicator"></div>
              <span>{hubs[hKey].name.split("(")[0].trim()}</span>
            </button>
          ))}
        </div>

        <div className="hub-details-card fade-in">
          <div className="detail-header">
            <h4>{hubs[selectedHub].name}</h4>
          </div>
          
          <div className="detail-grid">
            <div className="grid-item">
              <span className="grid-label">Primary Coverage:</span>
              <span className="grid-value">{hubs[selectedHub].coverage}</span>
            </div>
            <div className="grid-item">
              <span className="grid-label">Minimum Order Volume (MOQ):</span>
              <span className="grid-value">{hubs[selectedHub].moq}</span>
            </div>
            <div className="grid-item">
              <span className="grid-label">Current Hub Reserves:</span>
              <span className="grid-value text-glowing">{hubs[selectedHub].stock}</span>
            </div>
          </div>

          <div className="transit-schedule">
            <h5>Estimated Transit Times:</h5>
            <div className="schedule-list">
              {Object.entries(hubs[selectedHub].transit).map(([region, time]) => (
                <div key={region} className="schedule-row">
                  <span className="region-name">{region}</span>
                  <span className="lead-time">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="logistics-visual-panel">
        {/* Sleek SVG Map showing connections */}
        <svg viewBox="0 0 800 400" className="world-svg-map">
          {/* Subtle world contours (stylized rectangles/lines representing continents) */}
          {/* North America */}
          <path d="M 80,80 L 250,80 L 240,150 L 190,190 L 150,190 L 130,220 L 110,180 L 80,120 Z" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="1" />
          {/* South America */}
          <path d="M 180,210 L 220,210 L 260,260 L 230,360 L 200,360 L 170,260 Z" fill="#161616" stroke="#242424" strokeWidth="1" />
          {/* Europe */}
          <path d="M 370,70 L 450,70 L 460,130 L 410,160 L 380,150 Z" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="1" />
          {/* Africa */}
          <path d="M 380,170 L 440,160 L 480,210 L 450,300 L 420,300 L 370,220 Z" fill="#151515" stroke="#222222" strokeWidth="1" />
          {/* Asia */}
          <path d="M 460,70 L 680,70 L 700,180 L 640,240 L 520,240 L 480,160 Z" fill="#1d1d1d" stroke="#2c2c2c" strokeWidth="1" />
          {/* Australia */}
          <path d="M 640,260 L 710,260 L 720,330 L 650,330 Z" fill="#181818" stroke="#262626" strokeWidth="1" />

          {/* Hub Pins & Shipping Lanes */}
          {/* Los Angeles Lane */}
          {selectedHub === "la" && (
            <>
              {/* LA -> NY Lane */}
              <path d="M 140,120 Q 185,100 230,110" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4,4" className="lane-dash" />
              {/* LA -> Toronto Lane */}
              <path d="M 140,120 Q 170,95 200,100" fill="none" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="3,3" />
              {/* LA -> Rotterdam Lane */}
              <path d="M 140,120 Q 270,40 400,100" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            </>
          )}

          {/* Rotterdam Lane */}
          {selectedHub === "rotterdam" && (
            <>
              {/* Rotterdam -> London */}
              <path d="M 400,100 Q 390,95 380,98" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4,4" />
              {/* Rotterdam -> Milan */}
              <path d="M 400,100 Q 410,120 420,135" fill="none" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="3,3" />
              {/* Rotterdam -> Munich */}
              <path d="M 400,100 Q 425,105 435,115" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
            </>
          )}

          {/* Bangkok Lane */}
          {selectedHub === "bangkok" && (
            <>
              {/* Bangkok -> Tokyo */}
              <path d="M 590,195 Q 630,150 670,140" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4,4" />
              {/* Bangkok -> Sydney */}
              <path d="M 590,195 Q 640,250 680,300" fill="none" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="3,3" />
              {/* Bangkok -> Europe */}
              <path d="M 590,195 Q 490,140 400,100" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            </>
          )}

          {/* Hub Circles */}
          {/* Los Angeles Pin */}
          <circle cx="140" cy="120" r={selectedHub === "la" ? "8" : "4"} fill={selectedHub === "la" ? "#ffffff" : "#a3a3a3"} className={selectedHub === "la" ? "ping-active" : ""} />
          {selectedHub === "la" && <circle cx="140" cy="120" r="18" fill="none" stroke="#ffffff" strokeWidth="0.5" className="map-ping" />}

          {/* Rotterdam Pin */}
          <circle cx="400" cy="100" r={selectedHub === "rotterdam" ? "8" : "4"} fill={selectedHub === "rotterdam" ? "#ffffff" : "#a3a3a3"} />
          {selectedHub === "rotterdam" && <circle cx="400" cy="100" r="18" fill="none" stroke="#ffffff" strokeWidth="0.5" className="map-ping" />}

          {/* Bangkok Pin */}
          <circle cx="590" cy="195" r={selectedHub === "bangkok" ? "8" : "4"} fill={selectedHub === "bangkok" ? "#ffffff" : "#a3a3a3"} />
          {selectedHub === "bangkok" && <circle cx="590" cy="195" r="18" fill="none" stroke="#ffffff" strokeWidth="0.5" className="map-ping" />}

          {/* Map labels */}
          <text x="140" y="140" fill="#a3a3a3" fontSize="8" textAnchor="middle" fontFamily="Inter">LA HUB</text>
          <text x="400" y="88" fill="#a3a3a3" fontSize="8" textAnchor="middle" fontFamily="Inter">ROTTERDAM HUB</text>
          <text x="590" y="215" fill="#a3a3a3" fontSize="8" textAnchor="middle" fontFamily="Inter">BANGKOK HQ</text>
        </svg>
      </div>
    </div>
  );
}
