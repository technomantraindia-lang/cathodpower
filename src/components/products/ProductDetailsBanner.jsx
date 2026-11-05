// src/components/products/ProductDetailsBanner.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getProductsByMainAndPhase } from "../../data/productsData";
import "./ProductDetailsBanner.css";

const SLIDE_DURATION = 520;

const isForegroundSlideRole = (role) =>
  role === "center" || role === "shift-center";

const getHeroImage = (p) => {
  const list = p.showcase?.filter(Boolean) ?? [];
  return list[0] ?? p.image;
};

function getShowcaseImages(product) {
  const img = product.image;
  const showcase = product.showcase ?? [];
  const unique = [...new Set(showcase.filter(Boolean))];
  return unique.length ? unique : [img];
}

export default function ProductDetailsBanner({ product }) {
  const relatedProducts = useMemo(() => {
    const list = getProductsByMainAndPhase(
      product.mainTabKey,
      product.phaseKey
    );
    return list.length ? list : [product];
  }, [product]);

  const relatedMode = relatedProducts.length > 1;

  const urlRelatedIndex = useMemo(() => {
    const i = relatedProducts.findIndex((p) => p.slug === product.slug);
    return i >= 0 ? i : 0;
  }, [relatedProducts, product.slug]);

  const [relatedCursor, setRelatedCursor] = useState(0);
  const [relatedTransition, setRelatedTransition] = useState(null);

  useEffect(() => {
    setRelatedCursor(urlRelatedIndex);
    setRelatedTransition(null);
  }, [urlRelatedIndex]);

  useEffect(() => {
    if (!relatedTransition) {
      return undefined;
    }
    const timer = setTimeout(() => {
      setRelatedCursor(relatedTransition.nextIndex);
      setRelatedTransition(null);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [relatedTransition]);

  const goToRelatedProduct = (delta) => {
    const n = relatedProducts.length;
    if (n <= 1 || relatedTransition) {
      return;
    }
    const nextIndex = (relatedCursor + delta + n) % n;
    if (nextIndex === relatedCursor) {
      return;
    }
    setRelatedTransition({
      direction: delta > 0 ? "next" : "prev",
      nextIndex,
    });
  };

  const bannerProduct = relatedMode
    ? relatedProducts[relatedCursor] ?? product
    : product;

  const images = getShowcaseImages(product);
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(null);

  const getPrevIndex = (index) => (index - 1 + images.length) % images.length;
  const getNextIndex = (index) => (index + 1) % images.length;

  useEffect(() => {
    setCurrent(0);
    setTransition(null);
  }, [product.slug]);

  useEffect(() => {
    if (!transition) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setCurrent(transition.nextIndex);
      setTransition(null);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [transition]);

  const startSlide = (direction) => {
    if (transition || images.length === 0) {
      return;
    }

    const nextIndex =
      direction === "next"
        ? getNextIndex(current)
        : getPrevIndex(current);

    setTransition({ direction, nextIndex });
  };

  const leftIdx = getPrevIndex(current);
  const rightIdx = getNextIndex(current);
  const farLeftIdx = getPrevIndex(leftIdx);
  const farRightIdx = getNextIndex(rightIdx);

  const slots = useMemo(() => {
    if (!transition) {
      return {
        preLeft: { image: images[farLeftIdx], role: "pre-left" },
        left: { image: images[leftIdx], role: "left" },
        center: { image: images[current], role: "center" },
        right: { image: images[rightIdx], role: "right" },
        preRight: { image: images[farRightIdx], role: "pre-right" },
      };
    }

    if (transition.direction === "next") {
      return {
        preLeft: { image: images[farLeftIdx], role: "pre-left" },
        left: { image: images[leftIdx], role: "exit-left" },
        center: { image: images[current], role: "shift-left" },
        right: { image: images[rightIdx], role: "shift-center" },
        preRight: { image: images[farRightIdx], role: "shift-right-in" },
      };
    }

    return {
      preLeft: { image: images[farLeftIdx], role: "shift-left-in" },
      left: { image: images[leftIdx], role: "shift-center" },
      center: { image: images[current], role: "shift-right" },
      right: { image: images[rightIdx], role: "exit-right" },
      preRight: { image: images[farRightIdx], role: "pre-right" },
    };
  }, [current, farLeftIdx, farRightIdx, images, leftIdx, rightIdx, transition]);

  const tag =
    product.mainTabKey === "hybrid"
      ? "Hybrid Inverter"
      : product.mainTabKey === "micro"
        ? "Micro Inverter"
        : product.mainTabKey === "ongrid"
          ? "On-Grid Inverter"
          : "Inverter";

  const power = bannerProduct.meta?.split("|")[0]?.trim() ?? "";

  const relatedSlots = useMemo(() => {
    if (!relatedMode) return null;
    const n = relatedProducts.length;
    const idx = (base, off) => (base + off + n) % n;
    const rc = relatedCursor;
    const hero = (i) => ({ image: getHeroImage(relatedProducts[i]), label: relatedProducts[i].name });

    if (!relatedTransition) {
      return [
        { key: "preLeft", ...hero(idx(rc, -2)), role: "pre-left" },
        { key: "left", ...hero(idx(rc, -1)), role: "left" },
        { key: "center", ...hero(idx(rc, 0)), role: "center" },
        { key: "right", ...hero(idx(rc, 1)), role: "right" },
        { key: "preRight", ...hero(idx(rc, 2)), role: "pre-right" },
      ];
    }

    const leftI = idx(rc, -1);
    const rightI = idx(rc, 1);
    const farLeftI = idx(rc, -2);
    const farRightI = idx(rc, 2);
    const h = (i) => ({ image: getHeroImage(relatedProducts[i]), label: relatedProducts[i].name });

    if (relatedTransition.direction === "next") {
      return [
        { key: "preLeft", ...h(farLeftI), role: "pre-left" },
        { key: "left", ...h(leftI), role: "exit-left" },
        { key: "center", ...h(rc), role: "shift-left" },
        { key: "right", ...h(rightI), role: "shift-center" },
        { key: "preRight", ...h(farRightI), role: "shift-right-in" },
      ];
    }

    return [
      { key: "preLeft", ...h(farLeftI), role: "shift-left-in" },
      { key: "left", ...h(leftI), role: "shift-center" },
      { key: "center", ...h(rc), role: "shift-right" },
      { key: "right", ...h(rightI), role: "exit-right" },
      { key: "preRight", ...h(farRightI), role: "pre-right" },
    ];
  }, [relatedMode, relatedProducts, relatedCursor, relatedTransition]);

  const showCarouselNav = relatedMode || images.length > 1;
  const carouselSingleClass =
    !relatedMode && images.length === 1 ? " pdb__carousel--single" : "";

  return (
    <section className="pdb">
      <div className="pdb__rays" aria-hidden="true" />
      <div className="pdb__floor" aria-hidden="true" />

      <div className="pdb__inner">
        <p className="pdb__tag">{tag}</p>
        <h1 className="pdb__title">{bannerProduct.name}</h1>
        <p className="pdb__power">{power}</p>

        <div className="pdb__stage">
          {showCarouselNav && (
            <button
              type="button"
              className="pdb__nav pdb__nav--left"
              onClick={() =>
                relatedMode ? goToRelatedProduct(-1) : startSlide("prev")
              }
              disabled={relatedMode ? !!relatedTransition : !!transition}
              aria-label={relatedMode ? "Previous product" : "Previous"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div
            className={`pdb__carousel${
              (relatedMode && relatedTransition) || (!relatedMode && transition) ? " is-animating" : ""
            }${carouselSingleClass}`}
          >
            {relatedMode && relatedSlots ? (
              relatedSlots.map(({ key, role, image, label }) => (
                <div
                  key={key}
                  className={`pdb__slide pdb__slide--${role}`}
                  aria-hidden={!isForegroundSlideRole(role)}
                >
                  <img
                    src={image}
                    alt={label}
                    draggable="false"
                    decoding="async"
                    loading={isForegroundSlideRole(role) ? "eager" : "lazy"}
                    fetchPriority={isForegroundSlideRole(role) ? "high" : "low"}
                  />
                </div>
              ))
            ) : images.length === 1 ? (
              <div className="pdb__slide pdb__slide--center">
                <img
                  src={images[0]}
                  alt={product.name}
                  draggable="false"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            ) : (
              [
                { key: "preLeft", slot: slots.preLeft },
                { key: "left", slot: slots.left },
                { key: "center", slot: slots.center },
                { key: "right", slot: slots.right },
                { key: "preRight", slot: slots.preRight },
              ].map(({ key, slot }) => (
                <div
                  key={key}
                  className={`pdb__slide pdb__slide--${slot.role}`}
                  aria-hidden={!isForegroundSlideRole(slot.role)}
                >
                  <img
                    src={slot.image}
                    alt={key === "center" ? product.name : ""}
                    draggable="false"
                    decoding="async"
                    loading={isForegroundSlideRole(slot.role) ? "eager" : "lazy"}
                    fetchPriority={isForegroundSlideRole(slot.role) ? "high" : "low"}
                  />
                </div>
              ))
            )}
          </div>

          {showCarouselNav && (
            <button
              type="button"
              className="pdb__nav pdb__nav--right"
              onClick={() =>
                relatedMode ? goToRelatedProduct(1) : startSlide("next")
              }
              disabled={relatedMode ? !!relatedTransition : !!transition}
              aria-label={relatedMode ? "Next product" : "Next"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        <p className="pdb__desc">{bannerProduct.overview}</p>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "8px" }}>
          <a
            href={bannerProduct.datasheetUrl || "/downloads"}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="pdb__btn"
          >
            Download Datasheet
          </a>
          <Link
            to="/downloads"
            className="pdb__btn"
            style={{
              background: "transparent",
              color: "#111",
              border: "1.5px solid rgba(0, 0, 0, 0.25)",
            }}
          >
            All Resources
          </Link>
        </div>
      </div>
    </section>
  );
}
