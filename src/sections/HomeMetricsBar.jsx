import "./HomeMetricsBar.css";

const METRICS = [
  {
    num: "98.8",
    suffix: "%",
    label: "Peak Efficiency",
    sub: "Industry-leading DC to AC conversion harvest",
  },
  {
    num: "500",
    suffix: "+",
    label: "EPC & Service Partners",
    sub: "Pan-India trusted channel & dealer network",
  },
  {
    num: "IP66",
    suffix: "",
    label: "Ingress Protection",
    sub: "Full resistance against heavy dust & monsoon jets",
  },
  {
    num: "<10",
    suffix: "ms",
    label: "UPS Hybrid Switch",
    sub: "Zero-flicker continuity during grid outages",
  },
  {
    num: "10+",
    suffix: "Yrs",
    label: "Design Longevity",
    sub: "Tier-1 component selection for long ROI",
  },
];

export default function HomeMetricsBar() {
  return (
    <section className="hm-bar" aria-label="Key Performance Metrics">
      <div className="hm-container">
        <div className="hm-grid">
          {METRICS.map((item, idx) => (
            <div key={idx} className="hm-item">
              <div className="hm-num">
                {item.num}
                {item.suffix && <span className="hm-suffix">{item.suffix}</span>}
              </div>
              <div className="hm-label">{item.label}</div>
              <div className="hm-sub">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
