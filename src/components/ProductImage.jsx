import React, { useState, useEffect } from "react";

export default function ProductImage({ category, productId, variant, bgText, sketchClass = "packaging-sketch" }) {
  const variantSlug = variant.toLowerCase().replace(/\s+/g, "-");
  const imageSrc = `/images/products/${category}/${productId}/${variantSlug}.jpg`;
  
  const [displaySrc, setDisplaySrc] = useState(imageSrc);
  const [isFading, setIsFading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setIsFading(true);
    
    const timer = setTimeout(() => {
      setDisplaySrc(imageSrc);
      setLoadError(false); // Reset error status
      setIsFading(false);
    }, 150); // half of the fade transition

    return () => clearTimeout(timer);
  }, [imageSrc]);

  return (
    <div 
      className="product-image-wrapper" 
      style={{ 
        position: "relative", 
        width: "100%", 
        height: "100%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      {/* Background outline typography */}
      <div className="hero-bg-typography font-mono" style={{ 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)", 
        fontSize: "14vw", 
        fontWeight: "900",
        opacity: 0.02,
        zIndex: 0,
        pointerEvents: "none"
      }}>
        {bgText}
      </div>

      <div className="visual-grid-mesh"></div>
      <div className="visual-glow-point"></div>

      {/* Dynamic Image Element */}
      {!loadError ? (
        <img
          src={displaySrc}
          alt={`${productId} - ${variant}`}
          onError={() => setLoadError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: isFading ? 0 : 1,
            transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 2,
            position: "absolute",
            top: 0,
            left: 0,
            padding: "40px"
          }}
        />
      ) : (
        /* Elegant fallback placeholder visual */
        <div style={{ zIndex: 1, position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className={`sketch-overlay ${sketchClass}`}></div>
          <span style={{ 
            position: "absolute", 
            bottom: "24px", 
            left: "24px", 
            fontSize: "10px", 
            fontFamily: "monospace", 
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.08em",
            textTransform: "uppercase"
          }}>
            Preview Pending: {productId}/{variantSlug}.jpg
          </span>
        </div>
      )}
    </div>
  );
}
