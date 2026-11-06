const getPdfUrl = (fileName) =>
  `/datasheets/${encodeURIComponent(fileName)}`;

const getPublicFileUrl = (folder, fileName) =>
  `/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`;

const USER_MANUAL_FOLDER = "CATHODE POWER USER MANUAL";

export const DOWNLOAD_TABS = [
  { key: "product", label: "Product Datasheet" },
  { key: "brochure", label: "Brochure & Profile" },
  { key: "userManual", label: "User Manual" },
  { key: "ondFile", label: "OND File" },
  { key: "bisCertificate", label: "BIS Certificate" },
  { key: "iecCertificate", label: "IEC Certificate" },
  { key: "warrantyConditions", label: "Warranty Conditions" },
  { key: "installationPhotos", label: "Installation Photos" },
  { key: "mcbSelectionGuide", label: "MCB Selection Guide" },
  { key: "wifiSetupVideo", label: "WiFi Setup Video" },
  {
    key: "inverterInstallationGuide",
    label: "Inverter Standard Installation Guide",
  },
];

export const DOWNLOAD_TAB_GROUPS = [
  {
    label: "Product Resources",
    keys: ["product", "brochure", "userManual", "ondFile"],
  },
  {
    label: "Certificates & Warranty",
    keys: ["bisCertificate", "iecCertificate", "warrantyConditions"],
  },
  {
    label: "Installation & Guides",
    keys: [
      "installationPhotos",
      "mcbSelectionGuide",
      "wifiSetupVideo",
      "inverterInstallationGuide",
    ],
  },
];

export const DOWNLOAD_CATEGORIES = [
  {
    key: "ongrid",
    label: "Ongrid Inverters",
    subcategories: [
      {
        key: "ongrid_single",
        label: "Single Phase Ongrid Inverters",
        models: ["2kW - 4kW", "4.4kW - 6kW"],
      },
      {
        key: "ongrid_three",
        label: "Three Phase Ongrid Inverters",
        models: [
          "4kW - 15kW (Dual MPPT)",
          "4kW - 15kW (Single MPPT)",
          "18kW - 25kW",
          "30kW - 50kW",
          "80kW - 110kW",
        ],
      },
    ],
  },
  {
    key: "hybrid",
    label: "Hybrid Inverters",
    subcategories: [
      {
        key: "hybrid_single",
        label: "Single Phase Hybrid Inverters",
        models: ["3kW - 6kW", "3.6kW & 6.2kW"],
      },
      {
        key: "hybrid_three",
        label: "Three Phase Hybrid Inverters",
        models: ["8kW - 15kW"],
      },
    ],
  },
  {
    key: "micro",
    label: "Micro Inverters",
    subcategories: [
      {
        key: "micro_single",
        label: "Single Phase Micro Inverters",
        models: ["0.6kW - 1.2kW (Dual MPPT)", "1.6kW - 2.4kW (Four MPPT)"],
      },
    ],
  },
  {
    key: "storage",
    label: "Energy Storage Systems",
    subcategories: [
      {
        key: "storage_battery",
        label: "LiFePO4 Lithium Batteries",
        models: ["Rack Mount Battery", "Wall Mount Battery"],
      },
    ],
  },
  {
    key: "corporate",
    label: "Brochure & Corporate",
    subcategories: [
      {
        key: "corporate_docs",
        label: "Brochure & Company Profile",
        models: ["Product Line Brochure", "Company Profile"],
      },
    ],
  },
];

export const DOC_TYPES = [
  { key: "all", label: "Select All" },
  { key: "datasheet", label: "Datasheet" },
];

const PRODUCT_DOWNLOAD_CONFIG = [
  {
    id: 1,
    fileName: "2kW To 4kW - Single Phase Solar Inverter - Cathode Power V3.2.pdf",
    categoryKey: "ongrid",
    subcategoryKey: "ongrid_single",
    models: ["2kW - 4kW"],
    size: "9.08MB",
  },
  {
    id: 2,
    fileName: "4.4kW To 6kW - Single Phase Solar Inverter - Cathode Power V3.2.pdf",
    categoryKey: "ongrid",
    subcategoryKey: "ongrid_single",
    models: ["4.4kW - 6kW"],
    size: "9.10MB",
  },
  {
    id: 3,
    fileName: "Three Phase Dual MPPT - 4kW To 15kW - Cathode Power V3.2.pdf",
    categoryKey: "ongrid",
    subcategoryKey: "ongrid_three",
    models: ["4kW - 15kW (Dual MPPT)"],
    size: "9.09MB",
  },
  {
    id: 4,
    fileName: "Three Phase Single MPPT - 4kW To 15kW - Cathode Power V3.2.pdf",
    categoryKey: "ongrid",
    subcategoryKey: "ongrid_three",
    models: ["4kW - 15kW (Single MPPT)"],
    size: "9.18MB",
  },
  {
    id: 5,
    fileName: "Three Phase - 18kW To 25kW - Cathode Power V3.2.pdf",
    categoryKey: "ongrid",
    subcategoryKey: "ongrid_three",
    models: ["18kW - 25kW"],
    size: "9.09MB",
  },
  {
    id: 6,
    fileName: "Three Phase - 30kW To 50kW - Cathode Power V3.2.pdf",
    categoryKey: "ongrid",
    subcategoryKey: "ongrid_three",
    models: ["30kW - 50kW"],
    size: "9.09MB",
  },
  {
    id: 7,
    fileName: "Three Phase - 80kW To 110kW - Cathode Power V3.2.pdf",
    categoryKey: "ongrid",
    subcategoryKey: "ongrid_three",
    models: ["80kW - 110kW"],
    size: "8.96MB",
  },
  {
    id: 8,
    fileName: "Hybrid Single Phase - 3kW To 6kW - Cathode Power V3.2.pdf",
    categoryKey: "hybrid",
    subcategoryKey: "hybrid_single",
    models: ["3kW - 6kW"],
    size: "9.34MB",
  },
  {
    id: 9,
    fileName: "Hybrid Single Phase - 3.6kW & 6.2kW - Cathode Power V3.2.pdf",
    categoryKey: "hybrid",
    subcategoryKey: "hybrid_single",
    models: ["3.6kW & 6.2kW"],
    size: "9.30MB",
  },
  {
    id: 10,
    fileName: "Hybrid Three Phase - 8kW To 15kW - Cathode Power V3.2.pdf",
    categoryKey: "hybrid",
    subcategoryKey: "hybrid_three",
    models: ["8kW - 15kW"],
    size: "9.21MB",
  },
  {
    id: 11,
    fileName: "Micro Dual MPPT - 0.6kW To 1.2kW - Cathode Power V3.2.pdf",
    categoryKey: "micro",
    subcategoryKey: "micro_single",
    models: ["0.6kW - 1.2kW (Dual MPPT)"],
    size: "8.77MB",
  },
  {
    id: 12,
    fileName: "Micro Four MPPT - 1.6kW To 2.4kW - Cathode Power V3.2.pdf",
    categoryKey: "micro",
    subcategoryKey: "micro_single",
    models: ["1.6kW - 2.4kW (Four MPPT)"],
    size: "7.14MB",
  },
  {
    id: 13,
    fileName: "Rack Mount Battery - Cathode Power V3.2.pdf",
    categoryKey: "storage",
    subcategoryKey: "storage_battery",
    models: ["Rack Mount Battery"],
    size: "8.88MB",
  },
  {
    id: 14,
    fileName: "Wall Mount Battery - Cathode Power V3.2.pdf",
    categoryKey: "storage",
    subcategoryKey: "storage_battery",
    models: ["Wall Mount Battery"],
    size: "8.76MB",
  },
  {
    id: 15,
    fileName: "Cathode Power Brochure V3.2.pdf",
    categoryKey: "corporate",
    subcategoryKey: "corporate_docs",
    models: ["Product Line Brochure"],
    size: "82.07MB",
  },
  {
    id: 16,
    fileName: "Cathode Power Company Profile - 2026.pdf",
    categoryKey: "corporate",
    subcategoryKey: "corporate_docs",
    models: ["Company Profile"],
    size: "31.01MB",
  },
];

const buildProductDownload = ({
  id,
  fileName,
  categoryKey,
  subcategoryKey,
  models,
  size,
}) => ({
  id,
  name: fileName.replace(/\.pdf$/i, ""),
  downloadName: fileName,
  models,
  categoryKey,
  subcategoryKey,
  docType: "datasheet",
  language: "English",
  format: "PDF",
  size,
  updated: "April 2026",
  url: getPdfUrl(fileName),
});

export const ALL_DOWNLOADS = PRODUCT_DOWNLOAD_CONFIG.map(buildProductDownload);

const OND_DOWNLOAD_CONFIG = [
  // 4kW - 15kW aligned to current product model IDs (6G-xxHLS)
  { id: 101, fileName: "Cathode 6G-04HLS.OND", size: "1.94KB" },
  { id: 102, fileName: "Cathode 6G-05HLS.OND", size: "1.89KB" },
  { id: 103, fileName: "Cathode 6G-06HLS.OND", size: "1.90KB" },
  { id: 104, fileName: "Cathode 6G-08HLS.OND", size: "1.90KB" },
  { id: 105, fileName: "Cathode 6G-10HLS.OND", size: "1.91KB" },
  { id: 106, fileName: "Cathode 6G-12HLS.OND", size: "1.91KB" },
  { id: 107, fileName: "Cathode 6G-15HLS.OND", size: "1.91KB" },
  { id: 108, fileName: "Cathode CP20HL.OND", size: "1.93KB" },
  { id: 109, fileName: "Cathode 25HL.OND", size: "1.94KB" },
  { id: 110, fileName: "Cathode CP30HL.OND", size: "1.90KB" },
  { id: 111, fileName: "Cathode CP33HL.OND", size: "1.90KB" },
  { id: 112, fileName: "Cathode CP36HL.OND", size: "1.90KB" },
  { id: 113, fileName: "Cathode CP40HL.OND", size: "1.90KB" },
  { id: 114, fileName: "Cathode CP50HL.OND", size: "1.90KB" },
  { id: 115, fileName: "Cathode CP80HL.OND", size: "1.86KB" },
  { id: 116, fileName: "Cathode CP100HL.OND", size: "1.87KB" },
  { id: 117, fileName: "Cathode 110HL.OND", size: "1.87KB" },
];

const buildOndDownload = ({ id, fileName, size }) => ({
  id,
  name: fileName.replace(/\.OND$/i, ""),
  downloadName: fileName,
  language: "English",
  format: "OND",
  size,
  updated: "April 13, 2026",
  url: getPublicFileUrl("OndFile", fileName),
});

const USER_MANUAL_DOWNLOAD_CONFIG = [
  {
    id: 201,
    fileName: "Cathode Power Solar Inverter User Manual (2.3kW - 6kW).pdf",
    size: "5.90MB",
  },
  {
    id: 202,
    fileName: "3kW - 15kW (USER MANUAL).pdf",
    size: "47.46MB",
  },
  {
    id: 203,
    fileName: "Cathode Power Hybrid Single Phase Inverter User Manual.pdf",
    size: "38.10MB",
  },
  {
    id: 204,
    fileName: "USER MANUAL (18KW - 25kW).pdf",
    size: "73.53MB",
  },
  {
    id: 205,
    fileName: "USER MANUAL (30kW - 50kW).pdf",
    size: "55.36MB",
  },
  {
    id: 206,
    fileName: "USER MANUAL (80kW - 110kW).pdf",
    size: "85.85MB",
  },
];

const buildPublicPdfDownload = ({ id, fileName, size, folder = USER_MANUAL_FOLDER }) => ({
  id,
  name: fileName.replace(/\.pdf$/i, ""),
  downloadName: fileName,
  language: "English",
  format: "PDF",
  size,
  updated: "April 13, 2026",
  url: getPublicFileUrl(folder, fileName),
});

export const USER_MANUAL_DOWNLOADS =
  USER_MANUAL_DOWNLOAD_CONFIG.map(buildPublicPdfDownload);

const BIS_CERTIFICATE_DOWNLOAD_CONFIG = [
  {
    id: 301,
    fileName: "Cathode Power Private Limited BIS Certification.pdf",
    size: "0.61MB",
  },
];

export const OND_FILE_DOWNLOADS = OND_DOWNLOAD_CONFIG.map(buildOndDownload);
export const BIS_CERTIFICATE_DOWNLOADS =
  BIS_CERTIFICATE_DOWNLOAD_CONFIG.map(buildPublicPdfDownload);
export const IEC_CERTIFICATE_DOWNLOADS = [];
export const WARRANTY_CONDITIONS_DOWNLOADS = [];
export const INSTALLATION_PHOTOS_DOWNLOADS = [];
export const MCB_SELECTION_GUIDE_DOWNLOADS = [];
export const WIFI_SETUP_VIDEO_DOWNLOADS = [];
export const INVERTER_INSTALLATION_GUIDE_DOWNLOADS = [];

export const BROCHURE_DOWNLOADS = [
  {
    id: 401,
    name: "Cathode Power Brochure V3.2",
    downloadName: "Cathode Power Brochure V3.2.pdf",
    language: "English",
    format: "PDF",
    size: "82.07MB",
    updated: "April 2026",
    url: "/datasheets/Cathode%20Power%20Brochure%20V3.2.pdf",
  },
  {
    id: 402,
    name: "Cathode Power Company Profile - 2026",
    downloadName: "Cathode Power Company Profile - 2026.pdf",
    language: "English",
    format: "PDF",
    size: "31.01MB",
    updated: "April 2026",
    url: "/datasheets/Cathode%20Power%20Company%20Profile%20-%202026.pdf",
  },
];

export const TAB_DOWNLOADS = {
  product: ALL_DOWNLOADS,
  brochure: BROCHURE_DOWNLOADS,
  userManual: USER_MANUAL_DOWNLOADS,
  ondFile: OND_FILE_DOWNLOADS,
  bisCertificate: BIS_CERTIFICATE_DOWNLOADS,
  iecCertificate: IEC_CERTIFICATE_DOWNLOADS,
  warrantyConditions: WARRANTY_CONDITIONS_DOWNLOADS,
  installationPhotos: INSTALLATION_PHOTOS_DOWNLOADS,
  mcbSelectionGuide: MCB_SELECTION_GUIDE_DOWNLOADS,
  wifiSetupVideo: WIFI_SETUP_VIDEO_DOWNLOADS,
  inverterInstallationGuide: INVERTER_INSTALLATION_GUIDE_DOWNLOADS,
};
