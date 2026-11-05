import "./ProductsBanner.css";

export default function ProductsBanner({ title, subtitle, tabs, activeTab, onTabChange }) {
  return (
    <section className="pb-banner">
      <div className="pb-banner-bg" aria-hidden="true" />
      <div className="pb-banner-overlay" aria-hidden="true" />

      <div className="pb-banner-inner">
        <div className="pb-content">
          <p className="pb-eyebrow">
            <span className="pb-eyebrow-dot" />
            Solar Inverter Solutions
          </p>

          <h1 className="pb-title">{title}</h1>
          <p className="pb-subtitle">{subtitle}</p>

          <div className="pb-tabs" role="tablist" aria-label="Product categories">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`pb-tab ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => onTabChange(tab.key)}
              >
                {activeTab === tab.key && <span className="pb-tab-dot" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pb-info-card" aria-label="Product highlights">
          <div className="pb-info-stats">
            <div className="pb-info-stat">
              <span className="pb-info-stat-num">30+</span>
              <span className="pb-info-stat-text">Models</span>
            </div>
            <div className="pb-info-stat">
              <span className="pb-info-stat-num">4</span>
              <span className="pb-info-stat-text">Categories</span>
            </div>
            <div className="pb-info-stat">
              <span className="pb-info-stat-num">IP66</span>
              <span className="pb-info-stat-text">Rated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
