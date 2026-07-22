import React from "react";
import ProductCategoryLayout from "../components/ProductCategoryLayout";

export default function CustomBrandingPage({ setRoute }) {
  return (
    <ProductCategoryLayout
      setRoute={setRoute}
      crumb="Custom Branding"
      badge="YOUR BRAND, FOR PENNIES MORE"
      title="CUSTOM BRANDING"
      subtitle="Custom branded cones create a cohesive brand identity — in the same paper types and sizes as our unbranded cones. Why carry someone else's logo when you can carry your own?"
      seoTitle="Custom Branding — Printed Cones, Tips & Wraps | SOL France"
      seoDesc="SOL France custom branding: printed paper cones, colored tips, cigar bands, full wraps and holographic stickers, plus logo, packaging and rebranding services. MOQ from 4,800."
      highlights={[
        { value: "4,800", label: "MOQ (from)" },
        { value: "Same", label: "Papers & Sizes" },
        { value: "Full", label: "Colour Print" },
        { value: "✓", label: "Machine Compatible" },
      ]}
      sections={[
        {
          type: "features",
          title: "Branding Formats",
          kicker: "Print On",
          items: [
            { name: "Printed Paper Cones", desc: "" },
            { name: "Straight Pre-Rolled Cones", desc: "" },
            { name: "Ceramic-Tipped Tubes", desc: "" },
          ],
        },
        {
          type: "chips",
          title: "Customisation Options",
          kicker: "Finishes",
          items: [
            "Colored Tips",
            "Partial Wrap Cigar Bands",
            "Full Wraps",
            "Holographic Stickers",
            "Machine Compatible",
          ],
        },
        {
          type: "features",
          title: "Brand Services",
          kicker: "Beyond the Cone",
          items: [
            {
              name: "Logo Design",
              desc: "We create unique and memorable logos that encapsulate your brand's essence, setting you apart in a crowded marketplace.",
            },
            {
              name: "Brand Identity Development",
              desc: "We help you establish a strong brand identity that reflects your values, mission, and vision, ensuring consistency across all platforms.",
            },
            {
              name: "Custom Packaging Solutions",
              desc: "Packaging that protects your products while boosting brand visibility with eye-catching designs that make your branding stand out.",
            },
            {
              name: "Rebranding Services",
              desc: "Comprehensive rebranding to refresh your brand or guide a new direction — analysing your current presence and implementing changes that resonate while preserving your core values.",
            },
          ],
        },
      ]}
      ctaTitle="Brand your pre-roll"
      ctaText="MOQ starts at 4,800 cones — order any quantity to fit your company's inventory needs."
    />
  );
}
