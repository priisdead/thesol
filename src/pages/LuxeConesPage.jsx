import React from "react";
import ProductCategoryLayout from "../components/ProductCategoryLayout";

export default function LuxeConesPage({ setRoute }) {
  return (
    <ProductCategoryLayout
      setRoute={setRoute}
      crumb="LUXÉ Cones"
      badge="EXCLUSIVE PREMIUM LINE"
      title="LUXÉ CONES"
      subtitle="Designed for the least herb pass-through, guaranteed. Engineered for maximum efficiency — a 1mm gumline, minimal paper overlap, and a perfectly even pull. Also available in blunt wraps."
      seoTitle="LUXÉ Cones — Premium Pre-Rolled Cones | SOL France"
      seoDesc="SOL France LUXÉ cones: engineered for the least herb pass-through, 1mm gumline, perfectly even pull, Canadian-lab certified. 8+ colours, 7+ sizes (0.3g–2g)."
      highlights={[
        { value: "1mm", label: "Gumline" },
        { value: "8+", label: "Colour Papers" },
        { value: "7+", label: "Sizes" },
        { value: "0.3–2g", label: "Fill Range" },
      ]}
      sections={[
        {
          type: "list",
          title: "Engineered for Minimal Herb Pass-Through",
          kicker: "Precision Build",
          items: [
            "1mm gumline",
            "Minimal paper overlap",
            "Perfectly even pull",
            "Certified by Canadian labs",
            "Herb test done on every batch",
            "Available in blunt wraps",
          ],
        },
        {
          type: "swatches",
          title: "Colour Papers",
          kicker: "8+ Colours",
          items: [
            { name: "Blue", color: "#2f5fa8" },
            { name: "Green", color: "#3f8f5a" },
            { name: "Purple", color: "#6a4b9c" },
            { name: "Black", color: "#1a1a1a" },
            { name: "Pink", color: "#e58fb0" },
          ],
        },
        {
          type: "chips",
          title: "Customisation",
          kicker: "Make It Yours",
          items: ["Custom Branding", "Filter Tip", "Cigar Bands", "Wraps"],
        },
      ]}
      ctaTitle="Sample the LUXÉ line"
      ctaText="Trusted by 50+ LPs & dispensaries across 4 countries. Request an evaluation kit or a bulk quote."
    />
  );
}
