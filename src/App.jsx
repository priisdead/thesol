import React, { useState, useEffect } from "react";
// Visual Redesign Routing Configuration
import SmokeCanvas from "./components/SmokeCanvas";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CustomManufacturing from "./pages/CustomManufacturing";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

// Category Subpages
import RetailPackaging from "./pages/RetailPackaging";
import WholesalePackaging from "./pages/WholesalePackaging";
import PreRolledConesPage from "./pages/PreRolledConesPage";
import BluntWrapsPage from "./pages/BluntWrapsPage";
import FilterTipsPage from "./pages/FilterTipsPage";
import PreRolledTubesPage from "./pages/PreRolledTubesPage";

// Global stylesheet imports
import "./index.css";
import "./animations.css";

export default function App() {
  const [route, setRoute] = useState("home");
  const [productDetailId, setProductDetailId] = useState("silk-flax-cone");
  const [legalSection, setLegalSection] = useState("privacy");

  // History-based routing listener (PopState)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      
      if (path === "/" || path === "") {
        setRoute("home");
      } else if (path === "/products" || path === "/products/") {
        setRoute("products");
      } else if (path === "/products/retail-packaging") {
        setRoute("products-retail-packaging");
      } else if (path === "/products/wholesale-packaging") {
        setRoute("products-wholesale-packaging");
      } else if (path === "/products/pre-rolled-cones") {
        setRoute("products-pre-rolled-cones");
      } else if (path === "/products/blunt-wraps") {
        setRoute("products-blunt-wraps");
      } else if (path === "/products/filter-tips") {
        setRoute("products-filter-tips");
      } else if (path === "/products/pre-rolled-tubes") {
        setRoute("products-pre-rolled-tubes");
      } else if (path.startsWith("/product/")) {
        const id = path.substring(9);
        setProductDetailId(id);
        setRoute("product-detail");
      } else if (path === "/custom-manufacturing") {
        setRoute("custom-mfg");
      } else if (path === "/facilities") {
        setRoute("facilities");
      } else if (path === "/contact") {
        setRoute("contact");
      } else if (["/privacy", "/terms", "/shipping", "/returns"].includes(path)) {
        setLegalSection(path.substring(1));
        setRoute("legal");
      } else {
        setRoute("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    handlePopState(); // Invoke once on initialization

    return () => window.removeEventListener("popstate", handlePopState);
  }, [productDetailId, legalSection]);

  // Global IntersectionObserver scroll reveal setup on route change
  useEffect(() => {
    let observer;
    let autoObserver;

    const timer = setTimeout(() => {
      // 1. Explicit reveals authored in the markup (.reveal-on-scroll)
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target); // Trigger once
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
      );
      document
        .querySelectorAll(".reveal-on-scroll")
        .forEach((el) => observer.observe(el));

      // 2. Broadened, automatic reveals for common building blocks so
      //    every page gets consistent motion without touching each file.
      //    Skips anything already inside an explicit reveal (no double
      //    animation) and anything already tagged.
      autoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("auto-in-view");
              autoObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );

      const autoSelectors = [
        ".section-title",
        ".section-subtitle-center",
        ".advantage-card",
        ".cat-card",
        ".subpage-product-card",
        ".certs-grid > *",
        ".certs-full-grid > *",
        ".blog-card",
        ".industries-grid > *",
        ".materials-specs-grid > *",
        ".process-timeline-layout > *",
        ".spec-row",
        ".value-prop-card",
        ".info-block",
        ".timeline-step",
      ].join(",");

      document.querySelectorAll(autoSelectors).forEach((el) => {
        if (
          el.classList.contains("reveal-on-scroll") ||
          el.classList.contains("auto-reveal") ||
          el.closest(".reveal-on-scroll")
        ) {
          return;
        }
        el.classList.add("auto-reveal");
        // Gentle stagger among auto-reveal siblings sharing a parent.
        const parent = el.parentElement;
        const idx = parent
          ? Array.prototype.filter
              .call(parent.children, (c) => c.classList.contains("auto-reveal"))
              .indexOf(el)
          : 0;
        el.style.transitionDelay = `${Math.min(idx, 6) * 0.08}s`;
        autoObserver.observe(el);
      });
    }, 120); // Small delay to ensure render complete

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      if (autoObserver) autoObserver.disconnect();
    };
  }, [route]);

  // Routing bridge utilizing pushState
  const changeRoute = (newRoute) => {
    let path = "/";
    if (newRoute === "home") {
      path = "/";
    } else if (newRoute === "products") {
      path = "/products";
    } else if (newRoute === "products-retail-packaging") {
      path = "/products/retail-packaging";
    } else if (newRoute === "products-wholesale-packaging") {
      path = "/products/wholesale-packaging";
    } else if (newRoute === "products-pre-rolled-cones") {
      path = "/products/pre-rolled-cones";
    } else if (newRoute === "products-blunt-wraps") {
      path = "/products/blunt-wraps";
    } else if (newRoute === "products-filter-tips") {
      path = "/products/filter-tips";
    } else if (newRoute === "products-pre-rolled-tubes") {
      path = "/products/pre-rolled-tubes";
    } else if (newRoute === "product-detail") {
      path = `/product/${productDetailId}`;
    } else if (newRoute === "custom-mfg") {
      path = "/custom-manufacturing";
    } else if (newRoute === "facilities") {
      path = "/facilities";
    } else if (newRoute === "contact") {
      path = "/contact";
    } else if (["privacy", "terms", "shipping", "returns"].includes(newRoute)) {
      setLegalSection(newRoute);
      path = `/${newRoute}`;
    } else if (newRoute === "legal") {
      path = `/${legalSection}`;
    }
    
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render view router helper
  const renderView = () => {
    switch (route) {
      case "home":
        return <Home setRoute={changeRoute} setProductDetailId={setProductDetailId} />;
      case "products":
        return <Products setRoute={changeRoute} />;
      case "products-retail-packaging":
        return <RetailPackaging setRoute={changeRoute} />;
      case "products-wholesale-packaging":
        return <WholesalePackaging setRoute={changeRoute} />;
      case "products-pre-rolled-cones":
        return <PreRolledConesPage setRoute={changeRoute} setProductDetailId={setProductDetailId} />;
      case "products-blunt-wraps":
        return <BluntWrapsPage setRoute={changeRoute} />;
      case "products-filter-tips":
        return <FilterTipsPage setRoute={changeRoute} setProductDetailId={setProductDetailId} />;
      case "products-pre-rolled-tubes":
        return <PreRolledTubesPage setRoute={changeRoute} setProductDetailId={setProductDetailId} />;
      case "product-detail":
        return <ProductDetail productDetailId={productDetailId} setRoute={changeRoute} />;
      case "custom-mfg":
        return <CustomManufacturing setRoute={changeRoute} />;
      case "facilities":
        return <Facilities />;
      case "contact":
        return <Contact />;
      case "legal":
        return (
          <Legal
            legalSection={legalSection}
            setRoute={changeRoute}
            setLegalSection={setLegalSection}
          />
        );
      default:
        return <Home setRoute={changeRoute} setProductDetailId={setProductDetailId} />;
    }
  };

  return (
    <div className="app-shell">
      {/* Background Interactive Smoke Canvas */}
      <SmokeCanvas />

      {/* Global Header Megamenu */}
      <Header currentRoute={route} setRoute={changeRoute} />

      {/* Page Content View Router — keyed on route so each
          navigation replays the soft view-transition animation. */}
      <main className="view-transition-wrapper" key={route}>
        {renderView()}
      </main>

      {/* Global Footer */}
      <Footer setRoute={changeRoute} />
    </div>
  );
}
