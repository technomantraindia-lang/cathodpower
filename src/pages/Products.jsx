import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsBanner from "../components/products/ProductsBanner";
import ProductGridSection from "../components/products/ProductGridSection";
import {
  MAIN_PRODUCT_TABS,
  PHASE_TABS,
  getProductsByMainAndPhase,
  getProductSectionMeta,
} from "../data/productsData";

const MAIN_TAB_KEYS = new Set(MAIN_PRODUCT_TABS.map((tab) => tab.key));

const PRODUCT_SECTIONS = [
  {
    key: "ongrid",
    title: "On-grid Inverters",
    description:
      "Single and three phase on-grid inverters from 2.3 kW to 110 kW for residential, commercial, and industrial solar.",
  },
  {
    key: "hybrid",
    title: "Hybrid Inverters",
    description:
      "Single and three phase hybrid inverters from 3 kW to 15 kW for solar plus storage and backup-ready systems.",
  },
  {
    key: "micro",
    title: "Micro Inverters",
    description:
      "Dual and Quad MPPT micro inverters from 0.6 kW to 2.4 kW for flexible rooftops and module-level conversion.",
  },
  {
    key: "storage",
    title: "BESS — Battery Energy Storage",
    description:
      "High-cycle LiFePO4 rack and wall mount battery systems for reliable residential and commercial energy storage.",
  },
];

const BANNER_TABS = [
  { key: "ongrid", label: "On-grid Inverter" },
  { key: "hybrid", label: "Hybrid Inverter" },
  { key: "micro", label: "Micro Inverter" },
  { key: "storage", label: "BESS" },
];

const getSafeMainTab = (value) =>
  MAIN_TAB_KEYS.has(value) ? value : "ongrid";

const sectionId = (key) => `products-${key}`;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = getSafeMainTab(searchParams.get("tab"));
  const urlPhase = searchParams.get("phase") === "three" ? "three" : "single";

  const [phaseBySection, setPhaseBySection] = useState({
    ongrid: "single",
    hybrid: "single",
  });

  useEffect(() => {
    if (activeTab !== "ongrid" && activeTab !== "hybrid") return;
    setPhaseBySection((prev) =>
      prev[activeTab] === urlPhase ? prev : { ...prev, [activeTab]: urlPhase }
    );
  }, [activeTab, urlPhase]);

  const sections = useMemo(
    () =>
      PRODUCT_SECTIONS.map((section) => {
        const meta = getProductSectionMeta(section.key, "single");
        const phase =
          section.key === "ongrid" || section.key === "hybrid"
            ? phaseBySection[section.key] || "single"
            : "single";

        return {
          ...section,
          showPhaseTabs: Boolean(meta.showPhaseTabs),
          phase,
          products: getProductsByMainAndPhase(section.key, phase),
        };
      }),
    [phaseBySection]
  );

  const scrollToSection = useCallback((key) => {
    const el = document.getElementById(sectionId(key));
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const updateMainTab = (nextMainTab) => {
    const nextParams = new URLSearchParams();
    nextParams.set("tab", nextMainTab);
    if (nextMainTab === "ongrid" || nextMainTab === "hybrid") {
      nextParams.set("phase", phaseBySection[nextMainTab] || "single");
    }
    setSearchParams(nextParams, { replace: true });
    requestAnimationFrame(() => scrollToSection(nextMainTab));
  };

  const updateSectionPhase = (sectionKey, nextPhase) => {
    setPhaseBySection((prev) => ({ ...prev, [sectionKey]: nextPhase }));

    if (sectionKey === activeTab) {
      const nextParams = new URLSearchParams();
      nextParams.set("tab", sectionKey);
      nextParams.set("phase", nextPhase);
      setSearchParams(nextParams, { replace: true });
    }
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (!tab || !MAIN_TAB_KEYS.has(tab)) return;
    const timer = setTimeout(() => scrollToSection(tab), 120);
    return () => clearTimeout(timer);
  }, [searchParams, scrollToSection]);

  return (
    <>
      <ProductsBanner
        title="Our Products"
        subtitle="Explore Cathode Power’s full range — On-Grid, Hybrid, Micro Inverters, and BESS — built for residential, commercial, and industrial solar."
        tabs={BANNER_TABS}
        activeTab={activeTab}
        onTabChange={updateMainTab}
      />

      {sections.map((section) => (
        <div key={section.key} id={sectionId(section.key)}>
          <ProductGridSection
            leadTitle={
              section.key === "ongrid" ? "One Brand Every Solar Need" : undefined
            }
            title={section.title}
            description={section.description}
            products={section.products}
            showPhaseTabs={section.showPhaseTabs}
            phaseTabs={PHASE_TABS}
            activePhase={section.phase}
            continuousScroll={false}
            sliderKey={`${section.key}-${section.phase}`}
            onPhaseChange={(key) => updateSectionPhase(section.key, key)}
          />
        </div>
      ))}
    </>
  );
}
