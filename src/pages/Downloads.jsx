import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  DOC_TYPES,
  DOWNLOAD_CATEGORIES,
  DOWNLOAD_TAB_GROUPS,
  DOWNLOAD_TABS,
  TAB_DOWNLOADS,
} from "../data/downloadsData";
import "./Downloads.css";
import NewsletterBandSection from "../sections/NewsletterBandSection";

const ITEMS_PER_PAGE = 10;
const DEFAULT_CATEGORY = DOWNLOAD_CATEGORIES[0]?.key ?? null;
const DEFAULT_SUBCATEGORY = null;

export default function Downloads() {
  const [activeTab, setActiveTab] = useState("product");
  const [expandedCat, setExpandedCat] = useState(DEFAULT_CATEGORY);
  const [expandedSub, setExpandedSub] = useState(DEFAULT_SUBCATEGORY);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDocType, setSelectedDocType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const activeTabMeta = useMemo(
    () => DOWNLOAD_TABS.find((tab) => tab.key === activeTab) ?? DOWNLOAD_TABS[0],
    [activeTab]
  );

  const filteredFiles = useMemo(() => {
    let files = [...(TAB_DOWNLOADS[activeTab] ?? [])];

    if (activeTab === "product") {
      if (expandedSub) {
        files = files.filter((file) => file.subcategoryKey === expandedSub);
      } else if (expandedCat) {
        files = files.filter((file) => file.categoryKey === expandedCat);
      }

      if (selectedModel) {
        files = files.filter((file) => (file.models ?? []).includes(selectedModel));
      }

      if (selectedDocType !== "all") {
        files = files.filter((file) => file.docType === selectedDocType);
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      files = files.filter((file) => {
        const searchableText = [
          file.name,
          file.language,
          file.format,
          ...(file.models ?? []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    return files;
  }, [
    activeTab,
    expandedCat,
    expandedSub,
    selectedDocType,
    searchQuery,
    selectedModel,
  ]);

  const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);
  const pagedFiles = filteredFiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setExpandedCat(DEFAULT_CATEGORY);
    setExpandedSub(DEFAULT_SUBCATEGORY);
    setSelectedModel(null);
    setSelectedDocType("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleCategorySelect = (event) => {
    setExpandedCat(event.target.value);
    setExpandedSub(null);
    setSelectedModel(null);
    setSelectedDocType("all");
    setCurrentPage(1);
  };

  const handleSubcategorySelect = (event) => {
    setExpandedSub(event.target.value || null);
    setSelectedModel(null);
    setSelectedDocType("all");
    setCurrentPage(1);
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setCurrentPage(1);
  };

  const handleDocTypeChange = (key) => {
    setSelectedDocType(key);
    setCurrentPage(1);
  };

  const currentSubcategories = useMemo(() => {
    const category = DOWNLOAD_CATEGORIES.find((item) => item.key === expandedCat);
    return category?.subcategories ?? [];
  }, [expandedCat]);

  const currentModels = useMemo(() => {
    if (!expandedCat || !expandedSub) return [];

    const subcategory = currentSubcategories.find(
      (item) => item.key === expandedSub
    );

    return subcategory?.models ?? [];
  }, [expandedCat, expandedSub, currentSubcategories]);

  const showSidebar = activeTab === "product";

  return (
    <main className="dl">
      <section className="dl-hero">
        <div className="dl-hero__overlay" />
        <div className="dl-hero__content">
          <h1 className="dl-hero__title">Downloads &amp; Resources</h1>
          <p className="dl-hero__subtitle">
            Access datasheets, user manuals, installation guides, and technical
            documents for all Cathode Power products.
          </p>
        </div>
      </section>

      <nav className="dl-breadcrumb">
        <div className="dl-breadcrumb__inner">
          <Link to="/" className="dl-breadcrumb__link">
            Home
          </Link>
          <span className="dl-breadcrumb__sep">&gt;</span>
          <span className="dl-breadcrumb__current">Downloads</span>
        </div>
      </nav>

      <section className="dl-panel">
        <div className="dl-panel__container">
          <h1 className="dl-panel__title">Data Download</h1>

          <div className="dl-layout">
            <aside className="dl-nav" aria-label="Download categories">
              <div className="dl-nav__mobile">
                <label className="dl-nav__mobileLabel" htmlFor="dl-category-select">
                  Category
                </label>
                <select
                  id="dl-category-select"
                  className="dl-nav__select"
                  value={activeTab}
                  onChange={(event) => handleTabChange(event.target.value)}
                >
                  {DOWNLOAD_TABS.map((tab) => (
                    <option key={tab.key} value={tab.key}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dl-nav__desktop">
                {DOWNLOAD_TAB_GROUPS.map((group) => (
                  <div key={group.label} className="dl-nav__group">
                    <p className="dl-nav__groupTitle">{group.label}</p>
                    <ul className="dl-nav__list">
                      {group.keys.map((key) => {
                        const tab = DOWNLOAD_TABS.find((item) => item.key === key);
                        if (!tab) return null;

                        const fileCount = TAB_DOWNLOADS[key]?.length ?? 0;

                        return (
                          <li key={tab.key}>
                            <button
                              type="button"
                              className={`dl-nav__item ${
                                activeTab === tab.key ? "is-active" : ""
                              }`}
                              onClick={() => handleTabChange(tab.key)}
                              aria-current={activeTab === tab.key ? "page" : undefined}
                            >
                              <span className="dl-nav__itemLabel">{tab.label}</span>
                              <span className="dl-nav__itemCount">{fileCount}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

            <div className="dl-body">
              <div className="dl-toolbar">
                <div className="dl-toolbar__heading">
                  <h2 className="dl-toolbar__title">{activeTabMeta.label}</h2>
                  <p className="dl-toolbar__meta">
                    {filteredFiles.length}{" "}
                    {filteredFiles.length === 1 ? "file" : "files"} available
                  </p>
                </div>

                <div className="dl-search">
                  <input
                    type="text"
                    className="dl-search__input"
                    placeholder="Please enter keyword"
                    value={searchQuery}
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <svg
                    className="dl-search__icon"
                    viewBox="0 0 20 20"
                    fill="none"
                    width="18"
                    height="18"
                  >
                    <circle cx="9" cy="9" r="6" stroke="#999" strokeWidth="1.5" />
                    <path
                      d="M13.5 13.5L17 17"
                      stroke="#999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {showSidebar && (
                <div className="dl-filters">
                  <div className="dl-filters__top">
                    <span className="dl-filters__label">Refine results</span>
                    <button
                      type="button"
                      className="dl-filters__reset"
                      onClick={resetFilters}
                      title="Reset filters"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="dl-filters__grid">
                    <label className="dl-filters__field">
                      <span className="dl-filters__fieldLabel">Language</span>
                      <select className="dl-filters__select" defaultValue="English">
                        <option>English</option>
                      </select>
                    </label>

                    <label className="dl-filters__field">
                      <span className="dl-filters__fieldLabel">Inverter type</span>
                      <select
                        className="dl-filters__select"
                        value={expandedCat || ""}
                        onChange={handleCategorySelect}
                      >
                        {DOWNLOAD_CATEGORIES.map((category) => (
                          <option key={category.key} value={category.key}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="dl-filters__field">
                      <span className="dl-filters__fieldLabel">Product range</span>
                      <select
                        className="dl-filters__select"
                        value={expandedSub || ""}
                        onChange={handleSubcategorySelect}
                      >
                        <option value="">All ranges</option>
                        {currentSubcategories.map((subcategory) => (
                          <option key={subcategory.key} value={subcategory.key}>
                            {subcategory.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="dl-filters__field">
                      <span className="dl-filters__fieldLabel">Model</span>
                      <select
                        className="dl-filters__select"
                        value={selectedModel || ""}
                        onChange={(event) =>
                          handleModelChange(event.target.value || null)
                        }
                        disabled={!expandedSub}
                      >
                        <option value="">All models</option>
                        {currentModels.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="dl-filters__doctypes">
                    {DOC_TYPES.map((docType) => (
                      <label key={docType.key} className="dl-doctype">
                        <input
                          type="radio"
                          name="doctype"
                          checked={selectedDocType === docType.key}
                          onChange={() => handleDocTypeChange(docType.key)}
                          className="dl-doctype__radio"
                        />
                        <span className="dl-doctype__custom" />
                        <span className="dl-doctype__label">{docType.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="dl-main">
            <div className="dl-table-wrap">
              <table className="dl-table">
                <thead>
                  <tr>
                    <th className="dl-table__th dl-table__th--name">File name</th>
                    <th className="dl-table__th">Language</th>
                    <th className="dl-table__th">Format</th>
                    <th className="dl-table__th">Size</th>
                    <th className="dl-table__th">Last updated</th>
                    <th className="dl-table__th dl-table__th--dl">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedFiles.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="dl-table__empty">
                        No files found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    pagedFiles.map((file) => (
                      <tr key={file.id} className="dl-table__row">
                        <td className="dl-table__td dl-table__td--name">{file.name}</td>
                        <td className="dl-table__td">{file.language}</td>
                        <td className="dl-table__td">{file.format}</td>
                        <td className="dl-table__td">{file.size}</td>
                        <td className="dl-table__td">{file.updated}</td>
                        <td className="dl-table__td dl-table__td--dl">
                          <a
                            href={file.url}
                            className="dl-table__download"
                            title={`Download ${file.name}`}
                            download={file.downloadName || true}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                              <path
                                d="M12 3v13m0 0l-4-4m4 4l4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="dl-pagination">
                <button
                  className="dl-pagination__btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter((page) => {
                    if (totalPages <= 5) return true;
                    if (page === 1 || page === totalPages) return true;
                    return Math.abs(page - currentPage) <= 1;
                  })
                  .reduce((accumulator, page, index, pages) => {
                    if (index > 0 && page - pages[index - 1] > 1) {
                      accumulator.push(`ellipsis-${page}`);
                    }
                    accumulator.push(page);
                    return accumulator;
                  }, [])
                  .map((item) =>
                    typeof item === "string" ? (
                      <span key={item} className="dl-pagination__ellipsis">
                        ...
                      </span>
                    ) : (
                      <button
                        key={item}
                        className={`dl-pagination__btn ${
                          currentPage === item ? "dl-pagination__btn--active" : ""
                        }`}
                        onClick={() => setCurrentPage(item)}
                      >
                        {item}
                      </button>
                    )
                  )}
                <button
                  className="dl-pagination__btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                >
                  &gt;
                </button>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterBandSection
        imageSrc="/images/factoryimages/5.jpeg"
        imageAlt="Cathode Power installation"
        source="downloads"
      />
    </main>
  );
}
