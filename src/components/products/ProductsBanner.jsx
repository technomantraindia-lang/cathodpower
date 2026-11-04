import "./ProductsBanner.css";

export default function ProductsBanner({ title, subtitle, tabs, activeTab, onTabChange }) {
  return (
    <section className="pb-banner">
      {/* Scenic Background & Lighting Layers */}
      <div className="pb-banner-bg" />
      <div className="pb-banner-glow" />
      <div className="pb-banner-overlay" />
      <div className="pb-banner-noise" />

      {/* Decorative grid lines */}
      <div className="pb-grid-lines" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="pb-banner-inner">

        {/* Left — Main Content */}
        <div className="pb-content">

          {/* Eyebrow */}
          <p className="pb-eyebrow">
            <span className="pb-eyebrow-dot" />
            Solar Inverter Solutions
          </p>

          {/* Title */}
          <h1 className="pb-title">{title}</h1>

          {/* Subtitle */}
          <p className="pb-subtitle">{subtitle}</p>

          {/* Tab Switcher */}
          <div className="pb-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`pb-tab ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => onTabChange(tab.key)}
              >
                {activeTab === tab.key && <span className="pb-tab-dot" />}
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Right — Stats only */}
        <div className="pb-info-card">
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