import React from "react";
import ProductCategoryLayout from "../components/ProductCategoryLayout";

export default function PreRolledTubesPage({ setRoute }) {
  return (
    <ProductCategoryLayout
      setRoute={setRoute}
      crumb="Pre-Rolled Tubes"
      badge="CERAMIC-TIPPED"
      title="PRE-ROLLED TUBES"
      subtitle="Ceramic-tipped pre-rolled tubes, available with custom branding."
      seoTitle="Pre-Rolled Tubes — Ceramic-Tipped | SOL France"
      seoDesc="SOL France pre-rolled tubes: ceramic-tipped, available with custom branding. Full specifications and sizes on request."
      sections={[
        {
          type: "circular",
          title: "Tube Variants",
          kicker: "17 Formats",
          intro: "Standard, dark, hybrid, and refined-white wraps paired with glass, ceramic, wood, and spiral tips — each available with custom branding.",
          items: [
            { name: "Standard Brown · Glass Tip", img: "/images/tubes/tube-01.jpg" },
            { name: "Natural Brown · Gloss Block Band", img: "/images/tubes/tube-02.jpg" },
            { name: "Refined White 11mm · Gold Stripe", img: "/images/tubes/tube-03.jpg" },
            { name: "Dark Brown Hybrid · Black Ceramic Tip", img: "/images/tubes/tube-04.jpg" },
            { name: "Brown Hybrid · Glass Tip", img: "/images/tubes/tube-05.jpg" },
            { name: "Refined White · White Ceramic Tip", img: "/images/tubes/tube-06.jpg" },
            { name: "Refined White · Gloss Block Band", img: "/images/tubes/tube-07.jpg" },
            { name: "Dark Brown Hybrid · Glass Tip", img: "/images/tubes/tube-08.jpg" },
            { name: "Standard Brown · Wood Tip", img: "/images/tubes/tube-09.jpg" },
            { name: "Standard Brown · Black Ceramic Tip", img: "/images/tubes/tube-10.jpg" },
            { name: "Standard Brown · Natural Wood Tip", img: "/images/tubes/tube-11.jpg" },
            { name: "Dark Brown Hybrid · Glass Tip", img: "/images/tubes/tube-12.jpg" },
            { name: "Standard Brown · Glass Tip", img: "/images/tubes/tube-13.jpg" },
            { name: "Natural Brown · Black Ceramic Tip", img: "/images/tubes/tube-14.jpg" },
            { name: "Dark Brown Hybrid · Spiral Tip", img: "/images/tubes/tube-15.jpg" },
            { name: "Brown Hybrid · Spiral Tip", img: "/images/tubes/tube-16.jpg" },
            { name: "Green Hybrid Hemp · Wood Tip", img: "/images/tubes/tube-17.jpg" },
          ],
        },
      ]}
      ctaTitle="Request tube specifications"
      ctaText="Full sizes and specifications for pre-rolled tubes are available on request — reach out for samples or a quote."
    />
  );
}
