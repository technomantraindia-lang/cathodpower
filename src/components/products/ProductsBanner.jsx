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
      </div>
    </section>
  );
}
