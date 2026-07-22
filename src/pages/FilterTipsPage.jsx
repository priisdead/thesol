import React from "react";
import ProductCategoryLayout from "../components/ProductCategoryLayout";

export default function FilterTipsPage({ setRoute }) {
  return (
    <ProductCategoryLayout
      setRoute={setRoute}
      crumb="Filter Tips & Crutches"
      badge="CHLORINE-FREE · CLINICALLY APPROVED"
      title="FILTER TIPS & CRUTCHES"
      subtitle="Minimal passthrough with five perforations engineered for perfectly even, sustained airflow. High-quality 100–120 GSM paper, organically sourced from Europe."
      seoTitle="Filter Tips & Crutches — Glass, Ceramic & Wood | SOL France"
      seoDesc="SOL France filter tips and crutches: five perforations, even airflow, 100–120 GSM European paper, chlorine-free and clinically approved. Glass, ceramic, wood and standard filters."
      highlights={[
        { value: "5", label: "Perforations" },
        { value: "100–120", label: "GSM Paper" },
        { value: "✓", label: "Chlorine-Free" },
        { value: "✓", label: "Clinically Approved" },
      ]}
      sections={[
        {
          type: "circular",
          title: "Filter Tips",
          kicker: "Crutch Formats",
          cardWidth: 320,
          cardHeight: 300,
          galleryHeight: 420,
          items: [
            { name: "Spiral", img: "/images/filter-tips/spiral.jpg" },
            { name: "W", img: "/images/filter-tips/w.jpg" },
            { name: "Ceramic", img: "/images/filter-tips/ceramic.jpg" },
            { name: "Wood", img: "/images/filter-tips/wood.jpg" },
            { name: "Glass", img: "/images/filter-tips/glass.jpg" },
          ],
        },
        {
          type: "circular",
          title: "Filter Upgrades",
          kicker: "Crutches & Tips",
          intro: "From classic white paper and craft brown to cornhusk, glass, and wood — every crutch available with custom branding.",
          cardWidth: 320,
          cardHeight: 300,
          galleryHeight: 420,
          items: [
            { name: "White", img: "/images/filter-upgrades/white-v2.jpg" },
            { name: "Craft Brown", img: "/images/filter-upgrades/craft-brown-v2.jpg" },
            { name: "Cornhusk", img: "/images/filter-upgrades/cornhusk-v2.jpg" },
            { name: "Glass", img: "/images/filter-upgrades/glass-v2.jpg" },
            { name: "Wood", img: "/images/filter-upgrades/wood-v2.jpg" },
          ],
        },
      ]}
      ctaTitle="Custom filter tip designs available"
      ctaText="Request a sample set across glass, ceramic and wood, or a bulk quote."
    />
  );
}
