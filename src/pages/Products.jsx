import { useSearchParams } from "react-router-dom";
import ProductsBanner from "../components/products/ProductsBanner";
import ProductGridSection from "../components/products/ProductGridSection";
import {
  MAIN_PRODUCT_TABS,
  PHASE_TABS,
  getProductsByMainAndPhase,
  getContinuousProductsByMain,
  getContinuousPhaseStartIndex,
  getProductSectionMeta,
  PRODUCT_PAGE_CONTENT,
} from "../data/productsData";

const MAIN_TAB_KEYS = new Set(MAIN_PRODUCT_TABS.map((tab) => tab.key));
const PHASE_KEYS = new Set(PHASE_TABS.map((tab) => tab.key));

const getDefaultPhase = () => "single";

const getSafeMainTab = (value) =>
  MAIN_TAB_KEYS.has(value) ? value : "ongrid";

const getSafePhase = (mainTab, value) => {
  if (mainTab === "micro" || mainTab === "storage") {
    return "single";
  }

  if (PHASE_KEYS.has(value)) {
    return value;
  }

  return getDefaultPhase(mainTab);
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const mainTab = getSafeMainTab(searchParams.get("tab"));
  const phaseTab = getSafePhase(mainTab, searchParams.get("phase"));
  const continuousScroll = mainTab === "ongrid" || mainTab === "hybrid";

  const products = continuousScroll
    ? getContinuousProductsByMain(mainTab)
    : getProductsByMainAndPhase(mainTab, phaseTab);

  const phaseStartIndex = continuousScroll
    ? getContinuousPhaseStartIndex(mainTab)
    : { single: 0, three: 0 };

  const meta = getProductSectionMeta(mainTab, phaseTab);
  const banner = PRODUCT_PAGE_CONTENT[mainTab];

  const updateFilters = (nextMainTab, nextPhase = getDefaultPhase()) => {
    const nextParams = new URLSearchParams();
    nextParams.set("tab", nextMainTab);

    if (nextMainTab !== "micro" && nextMainTab !== "storage") {
      nextParams.set("phase", nextPhase);
    }

    setSearchParams(nextParams, { replace: true });
  };

  return (
    <>
      <ProductsBanner
        title={banner.bannerTitle}
        subtitle={banner.bannerSubtitle}
        tabs={MAIN_PRODUCT_TABS}
        activeTab={mainTab}
        onTabChange={(key) => updateFilters(key, getDefaultPhase(key))}
      />

      <ProductGridSection
        title={meta.title}
        description={meta.description}
        products={products}
        showPhaseTabs={meta.showPhaseTabs}
        phaseTabs={PHASE_TABS}
        activePhase={phaseTab}
        continuousScroll={continuousScroll}
        phaseStartIndex={phaseStartIndex}
        sliderKey={mainTab}
        onPhaseChange={(key) => updateFilters(mainTab, key)}
      />
    </>
  );
}
