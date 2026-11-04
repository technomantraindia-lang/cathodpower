import { useEffect, useMemo, useState } from "react";
import "./AboutPresenceMap.css";

const FOUNDING_DATE = new Date(2021, 0, 1);

const STATES = [
  { id: "gujarat", name: "Gujarat", x: 32.6, y: 46.4, office: true, label: "Gujarat Head office" },
  { id: "rajasthan", name: "Rajasthan", x: 37.3, y: 33.0 },
  { id: "punjab", name: "Punjab", x: 39.2, y: 21.8 },
  { id: "haryana", name: "Haryana", x: 37.9, y: 26.8 },
  { id: "delhi", name: "Delhi", x: 39.9, y: 28.0 },
  { id: "uttar-pradesh", name: "Uttar Pradesh", x: 46.7, y: 33.2 },
  { id: "bihar", name: "Bihar", x: 54.4, y: 36.8 },
  { id: "madhya-pradesh", name: "Madhya Pradesh", x: 40.3, y: 43.5 },
  { id: "chhattisgarh", name: "Chhattisgarh", x: 48.0, y: 49.3 },
  { id: "maharashtra", name: "Maharashtra", x: 34.0, y: 54.6 },
  { id: "karnataka", name: "Karnataka", x: 39.0, y: 69.3 },
  { id: "tamil-nadu", name: "Tamil Nadu", x: 42.3, y: 79.5 },
  { id: "kerala", name: "Kerala", x: 38.6, y: 81.8 },
];

function formatDays(n) {
  return n.toLocaleString("en-IN");
}

export default function AboutPresenceMap() {
  const [activeId, setActiveId] = useState("gujarat");
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calc = () => {
      const ms = Date.now() - FOUNDING_DATE.getTime();
      setDays(Math.max(0, Math.floor(ms / 86400000)));
    };
    calc();
    const id = window.setInterval(calc, 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  const active = useMemo(
    () => STATES.find((s) => s.id === activeId) ?? STATES[0],
    [activeId]
  );

  return (
    <section className="apm" id="presence" aria-label="Nationwide presence">
      <div className="apm__shell">
        <div className="apm__glow apm__glow--a" aria-hidden="true" />
        <div className="apm__glow apm__glow--b" aria-hidden="true" />

        <div className="apm__layout">
          <div className="apm__cards">
            <article className="apm__card">
              <p className="apm__card-label">Milestone Achieved</p>
              <p className="apm__card-stat">5,00,000 +</p>
              <p className="apm__card-desc">Inverters Installed Across India</p>
              <div className="apm__card-rule" aria-hidden="true" />
            </article>

            <article className="apm__card">
              <span className="apm__pill">Since 01 Jan 2021</span>
              <p className="apm__card-stat apm__card-stat--sm">
                {formatDays(days)} <span>Days</span>
              </p>
              <p className="apm__card-desc">
                Growing through dependable products, partnerships and nationwide service.
              </p>
            </article>
          </div>

          <div className="apm__map-wrap">
            <div className="apm__map" role="img" aria-label="India presence map">
              <img
                className="apm__map-img"
                src="/images/about/india-outline.png?v=3"
                alt=""
                aria-hidden="true"
                draggable={false}
              />

              {STATES.map((state) => {
                const isActive = state.id === activeId;
                return (
                  <button
                    key={state.id}
                    type="button"
                    className={`apm__pin${isActive ? " is-active" : ""}${state.office ? " is-hq" : ""}`}
                    style={{ left: `${state.x}%`, top: `${state.y}%` }}
                    onClick={() => setActiveId(state.id)}
                    onMouseEnter={() => setActiveId(state.id)}
                    aria-label={state.label || state.name}
                    aria-pressed={isActive}
                  >
                    <span className="apm__pin-dot" />
                    {isActive && (
                      <span className="apm__tooltip">
                        {state.label || state.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="apm__states" role="list">
          {STATES.map((state) => (
            <button
              key={state.id}
              type="button"
              role="listitem"
              className={`apm__chip${state.id === activeId ? " is-active" : ""}`}
              onClick={() => setActiveId(state.id)}
            >
              <span className="apm__chip-icon" aria-hidden="true">
                +
              </span>
              {state.name}
            </button>
          ))}
        </div>

        <p className="apm__footnote" aria-live="polite">
          Active region: <strong>{active.name}</strong>
          {active.office ? " — Head Office" : ""}
        </p>
      </div>
    </section>
  );
}
