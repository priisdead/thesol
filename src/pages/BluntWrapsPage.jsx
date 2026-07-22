import React from "react";
import ProductCategoryLayout from "../components/ProductCategoryLayout";

export default function BluntWrapsPage({ setRoute }) {
  return (
    <ProductCategoryLayout
      setRoute={setRoute}
      crumb="Blunt Cones & Hemp Wraps"
      badge="100% NATURAL LEAF"
      title="BLUNT CONES & HEMP WRAPS"
      seoTitle="Blunt Cones & Hemp Wraps | SOL France"
      seoDesc="SOL France blunt cones and hemp wraps: 100% natural leaf, THC & tobacco-free, knock-box compatible, clinically approved. Green and brown blunt cones."
      highlights={[
        { value: "100%", label: "Natural Leaf" },
        { value: "0%", label: "THC & Tobacco" },
        { value: "✓", label: "Knock-Box Compatible" },
        { value: "✓", label: "Clinically Approved" },
      ]}
      sections={[
        {
          type: "imagecards",
          title: "The Range",
          kicker: "Blunt Cones",
          items: [
            {
              name: "Green Blunt Cones",
              img: "/images/blunts/green-blunt.jpg",
              desc: "A THC- and tobacco-free smooth smoking experience, letting the flavour of hemp and flower stand out. Slightly thicker papers offer a slow and even burn — a mandatory offering for your business.",
            },
            {
              name: "Brown Blunt Cones",
              img: "/images/blunts/brown-blunt.jpg",
              desc: "Less processed than white counterparts and sourced from premium hemp, offering elevated natural flavour without THC or tobacco. For custom branding, artwork should be in bright colours for better visibility.",
            },
          ],
        },
        {
          type: "list",
          title: "Every Blunt Includes",
          kicker: "Standard",
          items: [
            "100% natural leaf",
            "Knock-box compatible",
            "Clinically approved",
            "THC & tobacco-free",
          ],
        },
      ]}
      ctaTitle="Add blunts to your line"
      ctaText="Request samples of the green and brown blunt cones, or a bulk quote for your program."
    />
  );
}
