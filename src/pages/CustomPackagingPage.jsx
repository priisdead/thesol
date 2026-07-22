import React from "react";
import ProductCategoryLayout from "../components/ProductCategoryLayout";

export default function CustomPackagingPage({ setRoute }) {
  return (
    <ProductCategoryLayout
      setRoute={setRoute}
      crumb="Packaging Solutions"
      badge="EXCEPTIONAL BRANDING & PACKAGING"
      title="PACKAGING SOLUTIONS"
      subtitle="Packaging that protects your products while boosting brand visibility with eye-catching designs that make your branding stand out."
      seoTitle="Packaging Solutions & Branding | SOL France"
      seoDesc="SOL France packaging solutions: custom packaging, logo design, brand identity development, and rebranding services for pre-roll brands."
      sections={[
        {
          type: "features",
          title: "What We Offer",
          kicker: "Branding & Packaging",
          items: [
            {
              name: "Custom Packaging Solutions",
              desc: "Packaging that protects your products while boosting brand visibility with eye-catching designs that make your branding stand out.",
            },
            {
              name: "Logo Design",
              desc: "Unique and memorable logos that encapsulate your brand's essence, setting you apart in a crowded marketplace.",
            },
            {
              name: "Brand Identity Development",
              desc: "A strong brand identity that reflects your values, mission, and vision, with consistency across all platforms.",
            },
            {
              name: "Rebranding Services",
              desc: "Comprehensive rebranding to refresh your brand or guide a new direction while preserving your core values.",
            },
          ],
        },
      ]}
      ctaTitle="Design packaging around your product"
      ctaText="Tell us about your product and market, and we'll build packaging and branding to match."
    />
  );
}
