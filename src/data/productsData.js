// src/data/productsData.js

const PRODUCT_IMAGE_MODULES = import.meta.glob(
  "../assets/images/products/*.{png,jpg,jpeg,JPG,JPEG,PNG,webp,WEBP,avif,AVIF}",
  {
    eager: true,
    import: "default",
  }
);

const PRODUCT_IMAGE_URLS = Object.fromEntries(
  Object.entries(PRODUCT_IMAGE_MODULES).map(([modulePath, url]) => [
    modulePath.split("/").pop(),
    url,
  ])
);

const PLACEHOLDER =
  PRODUCT_IMAGE_URLS["18kW - 25kW Three Phase.png"] ??
  PRODUCT_IMAGE_URLS["30kW - 50kW Three Phase.png"] ??
  "/images/products/18kW - 25kW Three Phase.png";

export const PIMG = (file) => {
  if (!file) {
    return PLACEHOLDER;
  }

  // Prefer modern formats if we generated them alongside the source asset.
  const dot = file.lastIndexOf(".");
  const base = dot >= 0 ? file.slice(0, dot) : file;
  const prefer = [
    `${base}.webp`,
    `${base}.WEBP`,
    `${base}.avif`,
    `${base}.AVIF`,
  ];
  for (const candidate of prefer) {
    const url = PRODUCT_IMAGE_URLS[candidate];
    if (url) return url;
  }

  const direct = PRODUCT_IMAGE_URLS[file];
  if (direct) return direct;

  return `/images/products/${encodeURIComponent(file)}`;
};

/** Key Advantages — Patented cooling technology product visual */
export const PATENT_COOLING_PRODUCT_IMAGE_URL = PIMG("2kW - 4kW Single Phase.png");

const buildShowcase = (imageFile, showcaseFiles = []) => {
  const images = Array.from(
    new Set([imageFile, ...showcaseFiles].filter(Boolean).map((file) => PIMG(file)))
  );

  return images.length ? images : [PLACEHOLDER];
};

/* ══════════════════════════════════════════════════════════════════════
   PRODUCT VISUALS — NEW PRODUCT IMAGES (clean assets only)
   ══════════════════════════════════════════════════════════════════════ */
const PRODUCT_VISUALS = {
  // 1. On-grid Single Phase 2kW - 4kW
  ongridSingleLow: {
    imageFile: "2kW - 4kW Single Phase.png",
    showcaseFiles: ["2kW - 4kW Single Phase.png"],
  },
  // 2. On-grid Single Phase 4.4kW - 6kW
  ongridSingleHigh: {
    imageFile: "4.4kW to 6kW Single Phase.png",
    showcaseFiles: ["4.4kW to 6kW Single Phase.png"],
  },
  // 3. On-grid Three Phase 4kW - 15kW
  ongridThreeLow: {
    imageFile: "4kW to 15kW Three Phase.png",
    showcaseFiles: ["4kW to 15kW Three Phase.png"],
  },
  // 4. On-grid Three Phase Mid (18kW - 25kW)
  ongridThreeMid: {
    imageFile: "18kW - 25kW Three Phase.png",
    showcaseFiles: ["18kW - 25kW Three Phase.png"],
  },
  // 5. On-grid Three Phase Commercial (30kW - 50kW)
  ongridThreeHigh: {
    imageFile: "30kW - 50kW Three Phase.png",
    showcaseFiles: ["30kW - 50kW Three Phase.png"],
  },
  // 6. On-grid Three Phase Heavy C&I (80kW - 110kW)
  ongridThreeIndustrial: {
    imageFile: "80kW - 110kW Three Phase.png",
    showcaseFiles: ["80kW - 110kW Three Phase.png"],
  },
  // 7. Hybrid Single Phase (3kW - 6kW)
  hybridSingle: {
    imageFile: "3kW - 6kW Hybrid Single Phase.png",
    showcaseFiles: ["3kW - 6kW Hybrid Single Phase.png"],
  },
  // 8. Hybrid Three Phase (8kW - 15kW)
  hybridThree: {
    imageFile: "8kW - 15kW Hybrid Three Phase Inverter New.png",
    showcaseFiles: ["8kW - 15kW Hybrid Three Phase Inverter New.png"],
  },
  // 9. Dual MPPT Micro Inverter
  microDual: {
    imageFile: "Dual MPPT Micro.png",
    showcaseFiles: ["Dual MPPT Micro.png"],
  },
  // 10. Four MPPT Micro Inverter
  microQuad: {
    imageFile: "Four MPPT MIcro.png",
    showcaseFiles: ["Four MPPT MIcro.png"],
  },
  // 11. Energy Storage Rack Mount Battery
  storageRack: {
    imageFile: "Rack Mount Battery.png",
    showcaseFiles: ["Rack Mount Battery.png"],
  },
  // 12. Energy Storage Wall Mount Battery
  storageWall: {
    imageFile: "Wall Mount Battery.png",
    showcaseFiles: ["Wall Mount Battery.png"],
  },
};

const PRODUCT_MEDIA_BY_MODEL = {
  // On-grid Single Phase 2kW - 4kW
  "CP-2300L": PRODUCT_VISUALS.ongridSingleLow,
  "CP-3000L": PRODUCT_VISUALS.ongridSingleLow,
  "CP-3400L": PRODUCT_VISUALS.ongridSingleLow,
  "CP-3600L": PRODUCT_VISUALS.ongridSingleLow,
  "CP-4000L": PRODUCT_VISUALS.ongridSingleLow,

  // On-grid Single Phase 4.4kW - 6kW
  "CP-4400L": PRODUCT_VISUALS.ongridSingleHigh,
  "CP-5000L": PRODUCT_VISUALS.ongridSingleHigh,
  "CP-6000L": PRODUCT_VISUALS.ongridSingleHigh,

  // On-grid Three Phase 4kW - 15kW
  "CP-04HL": PRODUCT_VISUALS.ongridThreeLow,
  "CP-05HL": PRODUCT_VISUALS.ongridThreeLow,
  "CP-06HL": PRODUCT_VISUALS.ongridThreeLow,
  "CP-08HL": PRODUCT_VISUALS.ongridThreeLow,
  "CP-10HL": PRODUCT_VISUALS.ongridThreeLow,
  "CP-12HL": PRODUCT_VISUALS.ongridThreeLow,
  "CP-15HL": PRODUCT_VISUALS.ongridThreeLow,

  // On-grid Three Phase 18kW - 25kW
  "CP-18HL": PRODUCT_VISUALS.ongridThreeMid,
  "CP-20HL": PRODUCT_VISUALS.ongridThreeMid,
  "CP-25HL": PRODUCT_VISUALS.ongridThreeMid,

  // On-grid Three Phase 30kW - 50kW
  "CP-30HL": PRODUCT_VISUALS.ongridThreeHigh,
  "CP-33HL": PRODUCT_VISUALS.ongridThreeHigh,
  "CP-36HL": PRODUCT_VISUALS.ongridThreeHigh,
  "CP-40HL": PRODUCT_VISUALS.ongridThreeHigh,
  "CP-45HL": PRODUCT_VISUALS.ongridThreeHigh,
  "CP-50HL": PRODUCT_VISUALS.ongridThreeHigh,

  // On-grid Three Phase 80kW - 110kW (Heavy C&I)
  "CP-80HL": PRODUCT_VISUALS.ongridThreeIndustrial,
  "CP-100HL": PRODUCT_VISUALS.ongridThreeIndustrial,
  "CP-110HL": PRODUCT_VISUALS.ongridThreeIndustrial,

  // Single Phase Hybrid 3kW - 6kW
  "CP-3.0-HYBD": PRODUCT_VISUALS.hybridSingle,
  "CP-3.6-HYBD": PRODUCT_VISUALS.hybridSingle,
  "CP-4.0-HYBD": PRODUCT_VISUALS.hybridSingle,
  "CP-4.4-HYBD": PRODUCT_VISUALS.hybridSingle,
  "CP-5.0-HYBD": PRODUCT_VISUALS.hybridSingle,
  "CP-6.0-HYBD": PRODUCT_VISUALS.hybridSingle,

  // Three Phase Hybrid 5kW - 15kW
  "CP-5.0-3HYBD": PRODUCT_VISUALS.hybridThree,
  "CP-6.0-3HYBD": PRODUCT_VISUALS.hybridThree,
  "CP-7.0-3HYBD": PRODUCT_VISUALS.hybridThree,
  "CP-8.0-3HYBD": PRODUCT_VISUALS.hybridThree,
  "CP-10-3HYBD": PRODUCT_VISUALS.hybridThree,
  "CP-12-3HYBD": PRODUCT_VISUALS.hybridThree,
  "CP-13-3HYBD": PRODUCT_VISUALS.hybridThree,
  "CP-15-3HYBD": PRODUCT_VISUALS.hybridThree,

  // Micro Inverters (Dual MPPT & Quad MPPT)
  "CP-MI-600": PRODUCT_VISUALS.microDual,
  "CP-MI-800": PRODUCT_VISUALS.microDual,
  "CP-MI-1000": PRODUCT_VISUALS.microDual,
  "CP-MI-1200": PRODUCT_VISUALS.microQuad,
  "CP-MI-1600": PRODUCT_VISUALS.microQuad,
  "CP-MI-2000": PRODUCT_VISUALS.microQuad,
  "CP-MI-2400": PRODUCT_VISUALS.microQuad,

  // Energy Storage Batteries
  "CP-BATT-R5": PRODUCT_VISUALS.storageRack,
  "CP-BATT-R10": PRODUCT_VISUALS.storageRack,
  "CP-BATT-W5": PRODUCT_VISUALS.storageWall,
  "CP-BATT-W10": PRODUCT_VISUALS.storageWall,
};

const getProductMedia = (model, fallback) =>
  PRODUCT_MEDIA_BY_MODEL[model] ?? fallback;

const ONGRID_SINGLE_LOW_POWERS = new Set([
  "2.3 kW",
  "3.0 kW",
  "3.4 kW",
  "3.6 kW",
  "4.0 kW",
]);

const ONGRID_THREE_LOW_POWERS = new Set([
  "4 kW",
  "5 kW",
  "6 kW",
  "8 kW",
  "10 kW",
  "12 kW",
  "15 kW",
]);

const ONGRID_THREE_MID_POWERS = new Set(["18 kW", "20 kW", "25 kW"]);

const ONGRID_THREE_COMMERCIAL_POWERS = new Set([
  "30 kW",
  "33 kW",
  "36 kW",
  "40 kW",
  "45 kW",
  "50 kW",
]);

const ONGRID_THREE_INDUSTRIAL_POWERS = new Set(["80 kW", "100 kW", "110 kW"]);

export const resolveProductDatasheet = ({
  mainTabKey,
  phaseKey,
  power,
  model = "",
}) => {
  let fileName = "Cathode Power Brochure V3.2.pdf";
  let size = "82.07MB";

  if (mainTabKey === "ongrid") {
    if (phaseKey === "single") {
      if (ONGRID_SINGLE_LOW_POWERS.has(power)) {
        fileName =
          "2kW To 4kW - Single Phase Solar Inverter - Cathode Power V3.2.pdf";
        size = "9.08MB";
      } else {
        fileName =
          "4.4kW To 6kW - Single Phase Solar Inverter - Cathode Power V3.2.pdf";
        size = "9.10MB";
      }
    } else {
      if (ONGRID_THREE_LOW_POWERS.has(power)) {
        fileName =
          "Three Phase Dual MPPT - 4kW To 15kW - Cathode Power V3.2.pdf";
        size = "9.09MB";
      } else if (ONGRID_THREE_MID_POWERS.has(power)) {
        fileName = "Three Phase - 18kW To 25kW - Cathode Power V3.2.pdf";
        size = "9.09MB";
      } else if (ONGRID_THREE_COMMERCIAL_POWERS.has(power)) {
        fileName = "Three Phase - 30kW To 50kW - Cathode Power V3.2.pdf";
        size = "9.09MB";
      } else {
        fileName = "Three Phase - 80kW To 110kW - Cathode Power V3.2.pdf";
        size = "8.96MB";
      }
    }
  } else if (mainTabKey === "hybrid") {
    if (phaseKey === "single") {
      if (power === "3.6 kW" || power === "6.2 kW") {
        fileName =
          "Hybrid Single Phase - 3.6kW & 6.2kW - Cathode Power V3.2.pdf";
        size = "9.30MB";
      } else {
        fileName = "Hybrid Single Phase - 3kW To 6kW - Cathode Power V3.2.pdf";
        size = "9.34MB";
      }
    } else {
      fileName = "Hybrid Three Phase - 8kW To 15kW - Cathode Power V3.2.pdf";
      size = "9.21MB";
    }
  } else if (mainTabKey === "micro") {
    if (
      model.includes("600") ||
      model.includes("800") ||
      model.includes("1000")
    ) {
      fileName = "Micro Dual MPPT - 0.6kW To 1.2kW - Cathode Power V3.2.pdf";
      size = "8.77MB";
    } else {
      fileName = "Micro Four MPPT - 1.6kW To 2.4kW - Cathode Power V3.2.pdf";
      size = "7.14MB";
    }
  } else if (mainTabKey === "storage") {
    if (model.includes("R") || model.toLowerCase().includes("rack")) {
      fileName = "Rack Mount Battery - Cathode Power V3.2.pdf";
      size = "8.88MB";
    } else {
      fileName = "Wall Mount Battery - Cathode Power V3.2.pdf";
      size = "8.76MB";
    }
  }

  return {
    name: fileName.replace(/\.pdf$/i, ""),
    downloadName: fileName,
    language: "English",
    format: "PDF",
    size,
    updated: "April 2026",
    url: `/datasheets/${encodeURIComponent(fileName)}`,
  };
};

export const MAIN_PRODUCT_TABS = [
  { key: "ongrid", label: "On-grid Inverter" },
  { key: "hybrid", label: "Hybrid Inverter" },
  { key: "micro", label: "Micro Inverter" },
  { key: "storage", label: "BESS" },
];

export const PHASE_TABS = [
  { key: "single", label: "Single Phase" },
  { key: "three", label: "Three Phase" },
];

export const PRODUCT_CATEGORIES = [
  { key: "single", label: "Single Phase Inverter (2-6kW)" },
  { key: "three_4_15", label: "Three Phase Inverter (4-15kW)" },
  { key: "three_high", label: "Three Phase Inverter (18-110kW)" },
  { key: "hybrid_single", label: "Single Phase Hybrid Inverter (3-6kW)" },
  { key: "hybrid_three", label: "Three Phase Hybrid Inverter (5-15kW)" },
  { key: "micro_single", label: "Micro Inverter (Dual & Quad MPPT)" },
  { key: "storage", label: "Energy Storage LiFePO4 Batteries" },
];

const phaseLabelFromKey = (phaseKey) => {
  if (phaseKey === "three") return "Three Phase";
  if (phaseKey === "storage") return "LiFePO4 Storage";
  return "Single Phase";
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildMeta = (power, phase, details = []) =>
  [power, phase, ...details.filter(Boolean)].join(" | ");

const buildParameters = ({
  power,
  phase,
  topology,
  application,
  mppt,
  backupSupport,
  mounting,
}) => ({
  variants: [
    {
      power,
      pv: [
        { label: "Product family", value: topology },
        { label: "Application", value: application },
        { label: "MPPT architecture", value: mppt },
        { label: "Monitoring", value: "Cathode cloud platform" },
      ],
      ac: [
        { label: "Rated AC output / capacity", value: power },
        { label: "Phase / Chemistry", value: phase },
        { label: "Grid frequency", value: "50 / 60 Hz" },
        { label: "Cooling concept", value: "Smart cooling / Natural" },
      ],
      eps: [
        { label: "Backup support", value: backupSupport },
        {
          label: "Battery compatibility",
          value: backupSupport === "Supported" ? "Supported" : "Not applicable",
        },
        { label: "Remote access", value: "Cathode cloud platform" },
      ],
      general: [
        { label: "Protection degree", value: "IP65 / IP66" },
        { label: "Communication", value: "Wi-Fi / RS485 / CAN" },
        { label: "Mounting", value: mounting },
        { label: "Use case", value: application },
      ],
    },
  ],
});

const createProduct = ({
  categoryKey,
  mainTabKey,
  phaseKey = null,
  model,
  power,
  series,
  imageFile,
  showcaseFiles = [],
  overview,
  features,
  application,
  mppt = "Model dependent",
  metaDetails = [],
  backupSupport = "Not applicable",
  mounting = "Wall mounted",
}) => {
  const phase = phaseLabelFromKey(phaseKey);
  const image = PIMG(imageFile);
  const datasheet = resolveProductDatasheet({
    mainTabKey,
    phaseKey,
    power,
    model,
  });

  return {
    id: slugify(model),
    categoryKey,
    mainTabKey,
    phaseKey,
    slug: slugify(model),
    name: model,
    series,
    meta: buildMeta(power, phase, metaDetails),
    image,
    overview,
    features,
    specs: [
      { label: "Rated Power", value: power },
      { label: "Phase / Type", value: phase },
      { label: "Series", value: series },
      { label: "Application", value: application },
    ],
    brochureUrl: "/datasheets/Cathode%20Power%20Brochure%20V3.2.pdf",
    datasheetUrl: datasheet.url,
    showcase: buildShowcase(imageFile, showcaseFiles),
    parameters: buildParameters({
      power,
      phase,
      topology: series,
      application,
      mppt,
      backupSupport,
      mounting,
    }),
    downloads: [datasheet],
  };
};

/* ── 1. ON-GRID SINGLE PHASE MODELS (2kW - 6kW) ───────────────────────── */
const ONGRID_SINGLE_SOURCE = [
  { model: "CP-2300L", power: "2.3 kW" },
  { model: "CP-3000L", power: "3.0 kW" },
  { model: "CP-3400L", power: "3.4 kW" },
  { model: "CP-3600L", power: "3.6 kW" },
  { model: "CP-4000L", power: "4.0 kW" },
  { model: "CP-4400L", power: "4.4 kW" },
  { model: "CP-5000L", power: "5.0 kW" },
  { model: "CP-6000L", power: "6.0 kW" },
];

/* ── 2. ON-GRID THREE PHASE MODELS (4kW - 110kW) ──────────────────────── */
const ONGRID_THREE_SOURCE = [
  // Low: 4kW - 15kW
  { model: "CP-04HL", power: "4 kW" },
  { model: "CP-05HL", power: "5 kW" },
  { model: "CP-06HL", power: "6 kW" },
  { model: "CP-08HL", power: "8 kW" },
  { model: "CP-10HL", power: "10 kW" },
  { model: "CP-12HL", power: "12 kW" },
  { model: "CP-15HL", power: "15 kW" },
  // Mid: 18kW - 25kW
  { model: "CP-18HL", power: "18 kW" },
  { model: "CP-20HL", power: "20 kW" },
  { model: "CP-25HL", power: "25 kW" },
  // Commercial: 30kW - 50kW
  { model: "CP-30HL", power: "30 kW" },
  { model: "CP-33HL", power: "33 kW" },
  { model: "CP-36HL", power: "36 kW" },
  { model: "CP-40HL", power: "40 kW" },
  { model: "CP-45HL", power: "45 kW" },
  { model: "CP-50HL", power: "50 kW" },
  // Industrial C&I: 80kW - 110kW
  { model: "CP-80HL", power: "80 kW" },
  { model: "CP-100HL", power: "100 kW" },
  { model: "CP-110HL", power: "110 kW" },
];

/* ── 3. HYBRID SINGLE PHASE MODELS (3kW - 6kW) ────────────────────────── */
const HYBRID_SINGLE_SOURCE = [
  { model: "CP-3.0-HYBD", power: "3 kW" },
  { model: "CP-3.6-HYBD", power: "3.6 kW" },
  { model: "CP-4.0-HYBD", power: "4 kW" },
  { model: "CP-4.4-HYBD", power: "4.4 kW" },
  { model: "CP-5.0-HYBD", power: "5 kW" },
  { model: "CP-6.0-HYBD", power: "6 kW" },
];

/* ── 4. HYBRID THREE PHASE MODELS (5kW - 15kW) ────────────────────────── */
const HYBRID_THREE_SOURCE = [
  { model: "CP-5.0-3HYBD", power: "5 kW" },
  { model: "CP-6.0-3HYBD", power: "6 kW" },
  { model: "CP-7.0-3HYBD", power: "7 kW" },
  { model: "CP-8.0-3HYBD", power: "8 kW" },
  { model: "CP-10-3HYBD", power: "10 kW" },
  { model: "CP-12-3HYBD", power: "12 kW" },
  { model: "CP-13-3HYBD", power: "13 kW" },
  { model: "CP-15-3HYBD", power: "15 kW" },
];

/* ── 5. MICRO INVERTER MODELS (Dual MPPT & Quad MPPT) ─────────────────── */
const MICRO_SOURCE = [
  { model: "CP-MI-600", power: "600 W" },
  { model: "CP-MI-800", power: "800 W" },
  { model: "CP-MI-1000", power: "1.0 kW" },
  { model: "CP-MI-1200", power: "1.2 kW" },
  { model: "CP-MI-1600", power: "1.6 kW" },
  { model: "CP-MI-2000", power: "2.0 kW" },
  { model: "CP-MI-2400", power: "2.4 kW" },
];

/* ── 6. ENERGY STORAGE BATTERY MODELS (New Range!) ────────────────────── */
const STORAGE_SOURCE = [
  {
    model: "CP-BATT-R5",
    power: "5.12 kWh",
    type: "Rack Mount LiFePO4 Battery",
    voltage: "51.2 V",
    capacity: "100 Ah",
    mounting: "Rack mounted (19\" standard)",
    imageFile: "Rack Mount Battery.png",
  },
  {
    model: "CP-BATT-R10",
    power: "10.24 kWh",
    type: "Rack Mount LiFePO4 Battery",
    voltage: "51.2 V",
    capacity: "200 Ah",
    mounting: "Rack mounted (19\" standard)",
    imageFile: "Rack Mount Battery.png",
  },
  {
    model: "CP-BATT-W5",
    power: "5.12 kWh",
    type: "Wall Mount PowerVault Battery",
    voltage: "51.2 V",
    capacity: "100 Ah",
    mounting: "Wall mounted",
    imageFile: "Wall Mount Battery.png",
  },
  {
    model: "CP-BATT-W10",
    power: "10.24 kWh",
    type: "Wall Mount PowerVault Battery",
    voltage: "51.2 V",
    capacity: "200 Ah",
    mounting: "Wall mounted",
    imageFile: "Wall Mount Battery.png",
  },
];

/* ── ALL PRODUCTS ARRAY ───────────────────────────────────────────────── */
export const PRODUCTS = [
  // 1. On-grid Single Phase
  ...ONGRID_SINGLE_SOURCE.map(({ model, power }) => {
    const isHigh = parseFloat(power) >= 4.4;
    const fallback = isHigh
      ? PRODUCT_VISUALS.ongridSingleHigh
      : PRODUCT_VISUALS.ongridSingleLow;

    return createProduct({
      ...getProductMedia(model, fallback),
      categoryKey: "single",
      mainTabKey: "ongrid",
      phaseKey: "single",
      model,
      power,
      series: "Single Phase Solar GTI",
      overview: `${model} is a compact ${power} single phase solar GTI inverter built for efficient residential and light commercial generation.`,
      features: [
        "High conversion efficiency up to 98.2%",
        "Compact residential design with natural dissipation",
        "Cloud monitoring ready with Wi-Fi / RS485",
      ],
      application: "Residential and light commercial solar",
      mppt: isHigh ? "Dual MPPT" : "Smart MPPT",
      mounting: "Wall mounted",
    });
  }),

  // 2. On-grid Three Phase
  ...ONGRID_THREE_SOURCE.map(({ model, power }) => {
    const visuals = ONGRID_THREE_LOW_POWERS.has(power)
      ? PRODUCT_VISUALS.ongridThreeLow
      : ONGRID_THREE_MID_POWERS.has(power)
        ? PRODUCT_VISUALS.ongridThreeMid
        : ONGRID_THREE_COMMERCIAL_POWERS.has(power)
          ? PRODUCT_VISUALS.ongridThreeHigh
          : PRODUCT_VISUALS.ongridThreeIndustrial;

    const isIndustrial = ONGRID_THREE_INDUSTRIAL_POWERS.has(power);

    return createProduct({
      ...getProductMedia(model, visuals),
      categoryKey: ONGRID_THREE_LOW_POWERS.has(power)
        ? "three_4_15"
        : isIndustrial
          ? "three_industrial"
          : "three_high",
      mainTabKey: "ongrid",
      phaseKey: "three",
      model,
      power,
      series: isIndustrial
        ? "Three Phase Commercial & Industrial Solar GTI (80kW - 110kW)"
        : "Three Phase Solar GTI (Dual MPPT)",
      overview: `${model} is a ${power} three phase solar GTI inverter designed for commercial and industrial solar plants with dependable grid-tied performance.`,
      features: [
        isIndustrial ? "Multi-MPPT heavy industrial architecture" : "Dual MPPT architecture",
        "Commercial rooftop & ground-mount ready",
        "Stable three phase output with Type II surge protection",
      ],
      application: isIndustrial ? "Heavy Commercial & Industrial Solar Plants" : "Commercial and industrial solar",
      mppt: isIndustrial ? "Multi MPPT (Up to 10 strings)" : "Dual MPPT",
      metaDetails: isIndustrial ? ["Multi MPPT", "C&I Grade"] : ["Dual MPPT"],
      mounting: "Wall mounted",
    });
  }),

  // 3. Hybrid Single Phase
  ...HYBRID_SINGLE_SOURCE.map(({ model, power }) =>
    createProduct({
      ...getProductMedia(model, PRODUCT_VISUALS.hybridSingle),
      categoryKey: "hybrid_single",
      mainTabKey: "hybrid",
      phaseKey: "single",
      model,
      power,
      series: "Single Phase Hybrid Inverter (3kW - 6kW)",
      overview: `${model} is a ${power} single phase hybrid inverter built for solar plus storage systems with intelligent home energy management.`,
      features: [
        "Battery ready design with fast sub-10ms changeover",
        "Smart energy management with peak shaving",
        "Backup capable architecture with EPS support",
      ],
      application: "Residential solar plus storage",
      mppt: "Dual MPPT",
      metaDetails: ["Battery Ready"],
      backupSupport: "Supported",
      mounting: "Wall mounted",
    })
  ),

  // 4. Hybrid Three Phase
  ...HYBRID_THREE_SOURCE.map(({ model, power }) =>
    createProduct({
      ...getProductMedia(model, PRODUCT_VISUALS.hybridThree),
      categoryKey: "hybrid_three",
      mainTabKey: "hybrid",
      phaseKey: "three",
      model,
      power,
      series: "Three Phase Hybrid Inverter (5kW - 15kW)",
      overview: `${model} is a ${power} three phase hybrid inverter designed for advanced commercial solar plus storage applications.`,
      features: [
        "High voltage battery compatibility",
        "Three phase energy control and 100% unbalanced load support",
        "Commercial storage ready with diesel generator sync",
      ],
      application: "Commercial solar plus storage",
      mppt: "Dual MPPT",
      metaDetails: ["Battery Ready"],
      backupSupport: "Supported",
      mounting: "Wall mounted",
    })
  ),

  // 5. Micro Inverters (Dual & Quad MPPT)
  ...MICRO_SOURCE.map(({ model, power }) => {
    const isQuad = ["1.2 kW", "1.6 kW", "2.0 kW", "2.4 kW"].includes(power);
    const fallback = isQuad ? PRODUCT_VISUALS.microQuad : PRODUCT_VISUALS.microDual;

    return createProduct({
      ...getProductMedia(model, fallback),
      categoryKey: "micro_single",
      mainTabKey: "micro",
      phaseKey: "single",
      model,
      power,
      series: isQuad ? "Quad MPPT Micro Inverter (4-in-1)" : "Dual MPPT Micro Inverter (2-in-1)",
      overview: `${model} is a ${power} micro inverter designed for module-level conversion, flexible rooftop layouts, and improved generation visibility.`,
      features: [
        isQuad ? "Four independent MPPT channels" : "Dual independent MPPT channels",
        "Module-level conversion eliminating string mismatch",
        "Real-time Wi-Fi performance visibility with safe DC (<60V)",
      ],
      application: "Flexible rooftop & balcony solar",
      mppt: isQuad ? "Four MPPT" : "Dual MPPT",
      metaDetails: [isQuad ? "Four MPPT" : "Dual MPPT", "Safe DC"],
      mounting: "Module mounted",
    });
  }),

  // 6. Energy Storage Batteries (New Range)
  ...STORAGE_SOURCE.map(({ model, power, type, voltage, capacity, mounting, imageFile }) =>
    createProduct({
      imageFile,
      showcaseFiles: [imageFile],
      categoryKey: "storage",
      mainTabKey: "storage",
      phaseKey: "single",
      model,
      power,
      series: type,
      overview: `${model} is a high-cycle ${power} (${capacity}, ${voltage}) LiFePO4 lithium energy storage battery engineered for seamless plug-and-play pairing with Cathode Power hybrid inverters.`,
      features: [
        ">6000 cycles at 80% DoD with Tier-1 LiFePO4 cells",
        "Intelligent multi-tier BMS with CAN / RS485 communication",
        "Compact modular architecture with parallel expansion capability",
        "Ultra-safe thermal stability with zero thermal runaway risk",
      ],
      application: "Residential & Commercial Energy Storage",
      mppt: "Integrated BMS",
      metaDetails: ["LiFePO4", voltage, capacity],
      backupSupport: "Supported",
      mounting,
    })
  ),
];

export const PRODUCT_PAGE_CONTENT = {
  ongrid: {
    bannerTitle: "Our Products",
    bannerSubtitle:
      "Explore our on-grid inverter range (2 kW to 110 kW) for residential, commercial, and industrial solar projects.",
  },
  hybrid: {
    bannerTitle: "Our Products",
    bannerSubtitle:
      "Explore our single phase and three phase hybrid inverter range (3 kW to 15 kW) for solar plus storage applications.",
  },
  micro: {
    bannerTitle: "Our Products",
    bannerSubtitle:
      "Explore our dual & quad MPPT micro inverter range for flexible rooftop layouts and smarter module-level performance.",
  },
  storage: {
    bannerTitle: "Our Products",
    bannerSubtitle:
      "Explore our high-cycle LiFePO4 lithium battery storage systems for residential & commercial energy independence.",
  },
};

export const getProductsByMainAndPhase = (mainTabKey, phaseKey) => {
  if (mainTabKey === "storage") {
    return PRODUCTS.filter((item) => item.mainTabKey === "storage");
  }

  if (mainTabKey === "micro") {
    return PRODUCTS.filter((item) => item.mainTabKey === "micro");
  }

  if (mainTabKey === "hybrid") {
    return PRODUCTS.filter(
      (item) => item.mainTabKey === "hybrid" && item.phaseKey === phaseKey
    );
  }

  return PRODUCTS.filter(
    (item) => item.mainTabKey === mainTabKey && item.phaseKey === phaseKey
  );
};

/** Continuous slider: single-phase products first, then three-phase. */
export const getContinuousProductsByMain = (mainTabKey) => {
  if (mainTabKey === "micro" || mainTabKey === "storage") {
    return getProductsByMainAndPhase(mainTabKey, "single");
  }

  const single = getProductsByMainAndPhase(mainTabKey, "single");
  const three = getProductsByMainAndPhase(mainTabKey, "three");
  return [...single, ...three];
};

export const getContinuousPhaseStartIndex = (mainTabKey) => {
  if (mainTabKey === "micro" || mainTabKey === "storage") {
    return { single: 0, three: 0 };
  }

  const singleCount = getProductsByMainAndPhase(mainTabKey, "single").length;
  return {
    single: 0,
    three: singleCount,
  };
};

export const getProductSectionMeta = (mainTabKey, phaseKey) => {
  if (mainTabKey === "storage") {
    return {
      title: "Energy Storage Solutions",
      description:
        "High-density LiFePO4 lithium battery storage systems in rack-mount and wall-mount form factors, engineered for deep cycling, safety, and seamless hybrid inverter pairing.",
      showPhaseTabs: false,
    };
  }

  if (mainTabKey === "ongrid" && phaseKey === "single") {
    return {
      title: "Single Phase On-grid Inverters",
      description:
        "Efficient single phase on-grid inverter solutions (2 kW to 6 kW) for residential and light commercial applications.",
      showPhaseTabs: true,
    };
  }

  if (mainTabKey === "ongrid" && phaseKey === "three") {
    return {
      title: "Three Phase On-grid Inverters",
      description:
        "Reliable three phase on-grid inverter range (4 kW to 110 kW) for commercial and industrial solar performance needs.",
      showPhaseTabs: true,
    };
  }

  if (mainTabKey === "hybrid" && phaseKey === "three") {
    return {
      title: "Three Phase Hybrid Inverters",
      description:
        "Advanced three phase hybrid inverter solutions (5 kW to 15 kW) for commercial solar plus storage applications.",
      showPhaseTabs: true,
    };
  }

  if (mainTabKey === "hybrid") {
    return {
      title: "Single Phase Hybrid Inverters",
      description:
        "Smart single phase hybrid inverters (3 kW to 6 kW) designed for residential solar plus storage systems.",
      showPhaseTabs: true,
    };
  }

  return {
    title: "Micro Inverters",
    description:
      "Dual & Quad MPPT micro inverters engineered for flexible rooftop solar layouts, module-level conversion, and real-time visibility.",
    showPhaseTabs: false,
  };
};

export const PRODUCT_ADVANTAGES = [
  {
    id: 1,
    title: "Smart Management",
    description:
      "Smart loads management with advanced monitoring capabilities to ensure optimal solar energy utilization and system efficiency.",
    image: PIMG("18kW - 25kW Three Phase.png"),
  },
  {
    id: 2,
    title: "Flexible Adaptability",
    description:
      "Designed to support multiple solar configurations and energy storage systems for residential and commercial installations.",
    image: PIMG("30kW - 50kW Three Phase.png"),
  },
  {
    id: 3,
    title: "Assured Reliability",
    description:
      "Built with industrial-grade protection mechanisms including surge protection and robust safety architecture.",
    image: PIMG("80kW - 110kW Three Phase.png"),
  },
  {
    id: 4,
    title: "High Performance",
    description:
      "High conversion efficiency with stable output and optimized power generation under various solar conditions.",
    image: PIMG("3kW - 6kW Hybrid Single Phase.png"),
  },
  {
    id: 5,
    title: "Heavy Industrial C&I",
    description:
      "High power multi-MPPT solar inverters (80 kW to 110 kW) engineered for maximum yield and rapid ROI on utility rooftops.",
    image: PIMG("80kW - 110kW Three Phase.png"),
  },
];
