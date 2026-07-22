import React, { useState } from "react";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [filterTag, setFilterTag] = useState("all");

  const blogPosts = [
    {
      id: "evolution-of-prerolls",
      title: "The Evolution of Pre-Roll Cones in the Retail Market",
      date: "June 24, 2026",
      category: "Market Insights",
      readTime: "6 Min Read",
      excerpt: "Pre-rolls are no longer an afterthought. Discover how premium paper materials, custom tips, and elegant branding are driving market share for MSOs.",
      content: `
        The pre-rolled cone segment is experiencing a significant shift in retail dynamics. Once viewed as a cheap convenient item, pre-rolls have emerged as one of the fastest-growing categories in dispensaries worldwide.

        This transition is driven by consumers who demand a premium smoking experience. They look for ultra-thin papers, smooth combustion, and organic materials. As a result, brands are moving away from standard, unbranded cones and investing in custom-designed pre-rolls.

        Custom printed crutches, colored papers, and artisanal tip inserts (like glass or wood) have become critical design elements for brand recognition. In a crowded retail environment, a custom-embossed logo on a cone's filter crutch provides a distinct point of difference on dispensary shelves.
      `
    },
    {
      id: "sustainable-materials-spec",
      title: "Understanding Sustainable Paper Materials: Hemp vs. Flax",
      date: "May 12, 2026",
      category: "Materials Science",
      readTime: "8 Min Read",
      excerpt: "Compare organic unrefined hemp fibers against ultra-thin flax. Learn which paper type is best suited for your botanical blends and packing lines.",
      content: `
        Choosing the right paper base is a critical decision for pre-roll brands. The paper material affects not only the look and feel of the product, but also the smoking experience and packing line efficiency.

        Hemp papers, made from unrefined industrial hemp fibers, offer an authentic, organic appearance with a light brown, textured surface. They burn slowly and evenly, but can be slightly sensitive to high humidity.

        Flax papers, made from refined linseed flax, are ultra-thin and semi-translucent, allowing the green botanical blends to show through. Flax is highly stable and slides easily through automated loading funnels, making it the default choice for high-volume packing lines.
      `
    },
    {
      id: "gmp-compliance-prerolls",
      title: "Navigating GMP Compliance in Pre-Roll Manufacturing",
      date: "April 08, 2026",
      category: "Compliance & QA",
      readTime: "10 Min Read",
      excerpt: "A deep dive into Good Manufacturing Practices (GMP) and ISO requirements for pre-rolled cones. Ensure your supply chain stands up to rigorous audits.",
      content: `
        In highly regulated smoke accessories markets, maintaining a clean supply chain is essential for long-term viability. Regulatory bodies are increasingly focusing on the materials that go into pre-roll papers and crutches.

        SOL manufactures all pre-rolled cones inside Class 100,000 cleanroom environments. This positive-pressure layout keeps dust, pollen, and chemical residues out of the manufacturing process.

        Additionally, every batch is third-party tested to verify zero presence of heavy metals (lead, arsenic, cadmium, mercury) and chemical bleaches. This strict quality control ensures your pre-rolls clear state audits and build consumer trust.
      `
    }
  ];

  const filteredPosts = filterTag === "all" 
    ? blogPosts 
    : blogPosts.filter(p => p.category === filterTag);

  return (
    <div className="page-wrapper blog-page section-padding">
      <div className="container">
        {selectedPost ? (
          /* Detailed Reading View */
          <div className="blog-reading-view fade-in">
            <button onClick={() => setSelectedPost(null)} className="back-blog-btn">
              &larr; BACK TO INSIGHTS ARCHIVE
            </button>
            <div className="article-meta-row">
              <span className="art-category">{selectedPost.category}</span>
              <span>{selectedPost.date}</span>
              <span>{selectedPost.readTime}</span>
            </div>
            <h1 className="article-title">{selectedPost.title}</h1>
            <div className="article-body-markdown">
              {selectedPost.content.split("\n\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          </div>
        ) : (
          /* Archive Grid View */
          <>
            <div className="blog-header text-center-wrapper reveal-on-scroll">
              <span className="section-badge">SOL JOURNAL</span>
              <h1 className="section-title">B2B MARKET INSIGHTS</h1>
              <p className="section-subtitle-center">
                Educational briefs, compliance updates, materials science reviews, and pre-roll manufacturing guidance.
              </p>
            </div>

            {/* Filter Toolbar */}
            <div className="blog-toolbar reveal-on-scroll">
              <div className="blog-tabs">
                {["all", "Market Insights", "Materials Science", "Compliance & QA"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilterTag(tag)}
                    className={`blog-tab-btn ${filterTag === tag ? "active" : ""}`}
                  >
                    {tag.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <div key={post.id} className="blog-card reveal-on-scroll" onClick={() => setSelectedPost(post)}>
                  <div className="blog-card-visual">
                    <span className="blog-card-cat">{post.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-card-date">{post.date} &bull; {post.readTime}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="read-more-trigger">READ FULL BRIEF &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
