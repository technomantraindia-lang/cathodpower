import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Monitoring.css";
import phoneImage from "../../assets/images/solar-phone.png";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   FEATURE CARD VISUALS
═══════════════════════════════════════════════════════════════ */

const LiveMonitoringViz = () => (
  <div className="fv fv--line">
    <div className="fv__live-badge">
      <span className="fv__pulse" />
      Live
    </div>
    <svg viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="fv__svg">
      <path
        d="M0 62 C30 56,50 44,80 37 C105 31,125 47,155 32 C175 22,205 15,260 10"
        stroke="#ff7b00" strokeWidth="2.2" strokeLinecap="round"
      />
      <path
        d="M0 62 C30 56,50 44,80 37 C105 31,125 47,155 32 C175 22,205 15,260 10 L260 80 L0 80 Z"
        fill="#fff8f3"
      />
      <circle cx="260" cy="10" r="4.5" fill="#ff7b00" />
    </svg>
    <div className="fv__row">
      <div className="fv__metric">
        <span className="fv__big">8.4</span>
        <span className="fv__unit">kWh</span>
      </div>
      <div className="fv__badge fv__badge--up">↑ 12%</div>
    </div>
  </div>
);

const InsightsViz = () => (
  <div className="fv fv--bar">
    <div className="fv__bars">
      {[65, 80, 55, 90, 70, 85, 60].map((h, i) => (
        <div key={i} className="fv__bar-col">
          <div
            className={`fv__bar${i === 3 ? " fv__bar--hi" : ""}`}
            style={{ height: `${h}%` }}
          />
          <span className="fv__day">{["M","T","W","T","F","S","S"][i]}</span>
        </div>
      ))}
    </div>
    <div className="fv__note">Best day: <strong>Thursday</strong></div>
  </div>
);

const RemoteControlViz = () => (
  <div className="fv fv--ctrl">
    {[
      { label: "Inverter 1", on: true },
      { label: "Battery",    on: true },
      { label: "Grid Export",on: false },
    ].map((row) => (
      <div key={row.label} className="fv__ctrl-row">
        <span>{row.label}</span>
        <div className={`fv__toggle${row.on ? " fv__toggle--on" : ""}`}>
          <div className="fv__toggle-knob" />
        </div>
      </div>
    ))}
  </div>
);

const AlertsViz = () => (
  <div className="fv fv--alerts">
    {[
      { icon: "✓", text: "System Online",    time: "now",   cls: "ok"   },
      { icon: "!",  text: "Battery Low",      time: "2m ago",cls: "warn" },
      { icon: "↑",  text: "Firmware Updated", time: "1h ago",cls: "info" },
    ].map((a) => (
      <div key={a.text} className={`fv__alert fv__alert--${a.cls}`}>
        <span className="fv__alert-icon">{a.icon}</span>
        <span className="fv__alert-text">{a.text}</span>
        <span className="fv__alert-time">{a.time}</span>
      </div>
    ))}
  </div>
);

const SCORE_R = 56;
const SCORE_C = 2 * Math.PI * SCORE_R; /* full circle length */
const SCORE_PCT = 0.99;

const EnergyScoreViz = () => {
  const orangeLen = SCORE_C * SCORE_PCT;
  const gapLen = Math.max(0, SCORE_C - orangeLen);
  return (
    <div className="fv fv--score">
      <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r={SCORE_R} stroke="#f0f0f0" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={SCORE_R}
          stroke="#ff7b00" strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${orangeLen} ${gapLen}`}
          transform="rotate(-90 70 70)"
        />
        <text x="70" y="63" textAnchor="middle" fontSize="34" fontWeight="700" fill="#111">99</text>
        <text x="70" y="82" textAnchor="middle" fontSize="11" fill="#999" fontFamily="Inter,sans-serif">Efficiency</text>
      </svg>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS — STEP VISUALS
═══════════════════════════════════════════════════════════════ */

const StepLineChart = () => (
  <div className="sv-viz">
    <div className="sv-tooltip">
      <span className="sv-tooltip__val">8.4 kWh</span>
      <span className="sv-tooltip__lbl">Peak Today</span>
    </div>
    <svg viewBox="0 0 420 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="sv-svg">
      {[20, 75, 130, 185, 240, 295, 350].map((x, i) => (
        <rect key={i} x={x} y="8" width="34" height="115" rx="6"
          fill={i === 4 ? "#ffe8cc" : "#f0f0f0"} />
      ))}
      <path
        d="M10 95 C40 85,60 72,95 65 C115 60,140 48,170 43
           C190 40,210 52,230 46 C250 40,270 32,295 26
           C315 21,340 36,365 52 C380 60,400 68,415 73"
        stroke="#ff7b00" strokeWidth="2.5" strokeLinecap="round"
      />
      <circle cx="295" cy="26" r="5.5" fill="white" stroke="#ff7b00" strokeWidth="2.5" />
    </svg>
  </div>
);

const StepGrowthChart = () => (
  <div className="sv-viz">
    <svg viewBox="0 0 420 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="sv-svg">
      <line x1="0" y1="65" x2="420" y2="65" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="5 4" />
      <path
        d="M0 112 C60 110,110 102,160 92 C200 84,240 74,280 54
           C310 38,360 20,420 8 L420 120 L0 120 Z"
        fill="#fff3e8"
      />
      <path
        d="M0 112 C60 110,110 102,160 92 C200 84,240 74,280 54
           C310 38,360 20,420 8"
        stroke="#ff7b00" strokeWidth="2.5" strokeLinecap="round"
      />
      <circle cx="420" cy="8" r="5.5" fill="#ff7b00" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   ICONS (step icons)
═══════════════════════════════════════════════════════════════ */

const IconConnect = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconTrend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

/* Feature card heading icons (orange accent) */
const FeatIconLive = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const FeatIconInsights = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const FeatIconRemote = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h.01M10 10h.01M6 14h8" />
  </svg>
);
const FeatIconAlerts = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 7h18s-3 0-3-7" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const FeatIconScore = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 20h20" />
    <path d="M3 20a8.5 8.5 0 0 1 18 0" />
    <line x1="12" y1="20" x2="8" y2="5.5" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */

const FEATURES = [
  {
    id: "live",
    title: "Live Monitoring",
    desc: "Track solar system performance in real-time with instant data updates every second.",
    icon: <FeatIconLive />,
    viz: <LiveMonitoringViz />,
  },
  {
    id: "insights",
    title: "Detailed Insights",
    desc: "Access comprehensive reports on energy production and battery status.",
    icon: <FeatIconInsights />,
    viz: <InsightsViz />,
  },
  {
    id: "control",
    title: "Remote Control",
    desc: "Supports remote upgrades and maintenance for optimized performance.",
    icon: <FeatIconRemote />,
    viz: <RemoteControlViz />,
  },
  {
    id: "alerts",
    title: "Instant Alerts",
    desc: "Receive real-time notifications for system issues immediately.",
    icon: <FeatIconAlerts />,
    viz: <AlertsViz />,
  },
  {
    id: "score",
    title: "Energy Score",
    desc: "Track your overall system efficiency with a live performance score.",
    icon: <FeatIconScore />,
    viz: <EnergyScoreViz />,
  },
];

const STEPS = [
  {
    icon: <IconConnect />,
    num: "01",
    title: "Install & Connect",
    desc: "Securely link your Cathode inverter to the cloud platform in minutes with zero manual configuration.",
    viz: null,
  },
  {
    icon: <IconClock />,
    num: "02",
    title: "Monitor in Real-Time",
    desc: "View energy production, consumption, and system health live on one clean, intuitive dashboard.",
    viz: <StepLineChart />,
  },
  {
    icon: <IconTrend />,
    num: "03",
    title: "Optimize & Scale",
    desc: "Use AI-powered insights and automated reports to maximize performance and cut energy costs.",
    viz: <StepGrowthChart />,
  },
];

const FAQ_ITEMS = [
  {
    q: "How to create an installer code?",
    a: "Log in to your Cathode Power monitoring portal, navigate to Settings → Installer Management, and click 'Generate New Code'. Share the code with your installer for device pairing.",
  },
  {
    q: "How to set for working modes?",
    a: "Open the Cathode Power app, go to Device Settings → Working Mode. Choose from Self-consumption, Time-of-Use, Battery Priority, or Grid-tie mode depending on your energy needs.",
  },
  {
    q: "How to set WiFi configuration?",
    a: "Press and hold the WiFi button on your inverter for 5 seconds until the indicator blinks. Open the app, go to Device Settings → Network → WiFi Setup, and follow the on-screen instructions.",
  },
  {
    q: "How long does it take to set everything up initially?",
    a: "Most users complete the initial setup in under 10 minutes. The app guides you step-by-step through inverter pairing, WiFi configuration, and dashboard customisation.",
  },
];

const STATS = [
  { value: "10k+",  label: "Active Users"  },
  { value: "99.9%", label: "Uptime"        },
  { value: "500M+", label: "kWh Tracked"   },
];

const FEATURES_COUNT = FEATURES.length;
/** Pinned scroll length (px) — no huge 200vh+ empty track; one smooth band of scroll to cycle cards */
function getFeaturePinScrollLength() {
  if (typeof window === "undefined") return 1000;
  return Math.min(1400, Math.max(850, Math.round(window.innerHeight * 0.95)));
}

function applyDeckStack(cardEls, step, { animate = true } = {}) {
  FEATURES.forEach((_, fIdx) => {
    const el = cardEls[fIdx];
    if (!el) return;
    const sp = (fIdx - step + FEATURES_COUNT) % FEATURES_COUNT;
    const y = 20 * sp;
    const scale = 1 - 0.03 * sp;
    const rot = (sp % 2 === 0 ? 1 : -1) * (0.35 + 0.12 * sp);
    const x = (sp % 2 === 0 ? 1 : -1) * 2.2 * sp;
    const z = 50 - sp;
    if (animate) {
      gsap.to(el, {
        y,
        x,
        scale,
        rotation: rot,
        zIndex: z,
        duration: 0.55,
        ease: "power2.out",
        force3D: true,
      });
    } else {
      gsap.set(el, { y, x, scale, rotation: rot, zIndex: z, force3D: true });
    }
  });
}

function MonitoringFeatureHeader() {
  return (
    <div className="moni-feat__hdr">
      <div className="moni-feat__eyebrow">Features</div>
      <h2 className="moni-feat__title">
        Powerful Monitoring,<br />Full Control
      </h2>
      <p className="moni-feat__sub">
        Everything you need to keep your solar system running at peak performance.
      </p>
    </div>
  );
}

function MonitoringFeatureGrid() {
  return (
    <div
      className="moni-feat__grid"
      role="list"
      aria-label="Monitoring app features"
    >
      {FEATURES.map((f) => {
        const stackViz = f.id === "alerts" || f.id === "score";
        return (
          <div
            key={f.id}
            className={`moni-feat__card${stackViz ? " moni-feat__card--stack" : ""}`}
            role="listitem"
          >
            <h3 className="moni-feat__card-h">
              <span className="moni-feat__h-ico" aria-hidden="true">{f.icon}</span>
              <span className="moni-feat__h-text">{f.title}</span>
            </h3>
            <p className="moni-feat__card-p">{f.desc}</p>
            <div className="moni-feat__card-viz">{f.viz}</div>
          </div>
        );
      })}
    </div>
  );
}

function MonitoringFeatureShuffle() {
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  const cardRefs = useRef([]);
  const stInstance = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [useDeck, setUseDeck] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setUseDeck(mq.matches && !reduced.matches);
    };
    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useLayoutEffect(() => {
    if (!useDeck) return;
    const els = cardRefs.current;
    if (!els.some(Boolean)) return;
    applyDeckStack(els, 0, { animate: false });
  }, [useDeck]);

  useEffect(() => {
    if (!useDeck) return;
    const track = trackRef.current;
    const pinEl = pinRef.current;
    if (!track || !pinEl) return;

    const getEls = () => cardRefs.current.filter(Boolean);
    if (!getEls().length) return;

    const last = { n: 0 };

    const st = ScrollTrigger.create({
      scroller: document.documentElement,
      trigger: track,
      start: "top top",
      end: () => `+=${getFeaturePinScrollLength()}`,
      pin: pinEl,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const s = Math.min(
          FEATURES_COUNT - 1,
          Math.floor(self.progress * FEATURES_COUNT + 0.0001)
        );
        if (s !== last.n) {
          last.n = s;
          setActiveStep(s);
          applyDeckStack(getEls(), s, { animate: true });
        }
      },
    });
    stInstance.current = st;

    const syncFromProgress = (animate) => {
      const s = Math.min(
        FEATURES_COUNT - 1,
        Math.floor(st.progress * FEATURES_COUNT + 0.0001)
      );
      last.n = s;
      setActiveStep(s);
      applyDeckStack(getEls(), s, { animate });
    };

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      syncFromProgress(false);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      stInstance.current?.kill();
      stInstance.current = null;
    };
  }, [useDeck]);

  if (!useDeck) {
    return (
      <>
        <MonitoringFeatureHeader />
        <MonitoringFeatureGrid />
      </>
    );
  }

  const active = FEATURES[activeStep];

  return (
    <div ref={trackRef} className="moni-feat__scroll moni-feat__scroll--pin">
      <div ref={pinRef} className="moni-feat__pin">
        <p className="moni-feat__sr" aria-live="polite">
          {`Feature ${activeStep + 1} of ${FEATURES_COUNT}: ${active.title}`}
        </p>
        <div className="moni-feat__split">
          <div className="moni-feat__side">
            <div className="moni-feat__eyebrow">Features</div>
            <h2 className="moni-feat__title moni-feat__title--left">
              Powerful Monitoring,<br />Full Control
            </h2>
            <p className="moni-feat__sub moni-feat__sub--left">
              Everything you need to keep your solar system running at peak performance.
            </p>
            <div className="moni-feat__side-active" key={active.id}>
              <div className="moni-feat__side-ico" aria-hidden="true">
                {active.icon}
              </div>
              <h3 className="moni-feat__side-h">{active.title}</h3>
              <p className="moni-feat__side-p">{active.desc}</p>
              <p className="moni-feat__step-tally" aria-hidden="true">
                {String(activeStep + 1).padStart(2, "0")}
                <span className="moni-feat__step-tally-sep">/</span>
                {String(FEATURES_COUNT).padStart(2, "0")}
              </p>
            </div>
            <ol className="moni-feat__index" aria-label="Feature list">
              {FEATURES.map((f, i) => (
                <li
                  key={f.id}
                  className={`moni-feat__index-item${i === activeStep ? " is-active" : ""}`}
                >
                  <span className="moni-feat__index-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="moni-feat__index-t">{f.title}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="moni-feat__stage">
            <div
              className="moni-feat__deck"
              role="list"
              aria-label="Feature previews"
            >
              {FEATURES.map((f, fIdx) => {
                const stackViz = f.id === "alerts" || f.id === "score";
                return (
                  <div
                    key={f.id}
                    ref={(el) => {
                      cardRefs.current[fIdx] = el;
                    }}
                    className={
                      "moni-feat__card moni-feat__card--deck moni-feat__card--viz-only" +
                      (stackViz ? " moni-feat__card--stack" : "")
                    }
                    role="listitem"
                    aria-label={f.title}
                  >
                    <div className="moni-feat__card-viz moni-feat__card-viz--solo">
                      {f.viz}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="moni-feat__dots" aria-hidden="true">
              {FEATURES.map((f, i) => (
                <span
                  key={f.id}
                  className={`moni-feat__dot${i === activeStep ? " is-active" : ""}`}
                  title={f.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */

export default function Monitoring() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggle = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <main className="moni">

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="moni-hero">
        <div className="moni-hero__inner">

          <div className="moni-hero__text">
            <div className="moni-hero__eyebrow">Monitoring App</div>
            <h1 className="moni-hero__h1">
              Monitor Your Solar System,<br />Anytime.
            </h1>
            <p className="moni-hero__desc">
              Smarter tools designed to help you gain real-time insights
              into your solar system and take full control of your energy output.
            </p>
            <div className="moni-hero__ctas">
              <a
                href="https://play.google.com/store"
                className="moni-hero__btn moni-hero__btn--primary"
                target="_blank" rel="noreferrer"
              >
                Get Started
              </a>
              <a href="/downloads" className="moni-hero__btn moni-hero__btn--ghost">
                User Manual
              </a>
            </div>
          </div>

          <div className="moni-hero__visual">
            <div className="moni-hero__glow" />
            <img
              src={phoneImage}
              alt="Cathode Monitoring App"
              className="moni-hero__phone"
              loading="eager"
            />
          </div>

        </div>
      </section>

      {/* ── 2. TRUST BAR ─────────────────────────────────────── */}
      <div className="moni-trust">
        <div className="moni-trust__inner">
          <a href="#" className="moni-trust__store">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
          <a href="#" className="moni-trust__store">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M3.18 23.76c.35.2.75.21 1.12.02l12.79-7.4-2.97-2.97L3.18 23.76zM.32 1.65C.12 2.03 0 2.5 0 3.07v17.86c0 .57.12 1.04.33 1.42l.09.07 10.01-10v-.24L.41 1.58l-.09.07zm22.17 9.64l-2.87-1.66-3.24 3.24 3.24 3.24 2.89-1.68c.82-.48.82-1.26-.02-1.74zM4.3.24L17.09 7.64l-2.97 2.97L3.18.24A1.3 1.3 0 014.3.24z" />
            </svg>
            Google Play
          </a>
          <div className="moni-trust__sep" />
          {STATS.map((s) => (
            <div key={s.label} className="moni-trust__stat">
              <span className="moni-trust__val">{s.value}</span>
              <span className="moni-trust__lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. FEATURES ──────────────────────────────────────── */}
      <section className="moni-feat">
        <MonitoringFeatureShuffle />
      </section>

      {/* ── 4. HOW IT WORKS ──────────────────────────────────── */}
      <section className="moni-how">
        <div className="moni-how__inner">

          <div className="moni-how__left">
            <div className="moni-how__tag">How It Works</div>
            <h2 className="moni-how__h2">
              From install to insight—just three simple steps.
            </h2>
          </div>

          <div className="moni-how__right">
            {STEPS.map((step, i) => (
              <div key={i} className={`moni-step${step.viz ? " moni-step--exp" : ""}`}>
                <div className="moni-step__top">
                  <div className="moni-step__icon">{step.icon}</div>
                  <div className="moni-step__copy">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
                {step.viz && <div className="moni-step__viz">{step.viz}</div>}
                {step.viz && <span className="moni-step__num">{step.num}</span>}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. FAQ ───────────────────────────────────────────── */}
      <section className="moni-faq">
        <div className="moni-faq__hdr">
          <div className="moni-faq__eyebrow">Help Center</div>
          <h2 className="moni-faq__title">All You Need to Know</h2>
        </div>

        <div className="moni-faq__list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`moni-faq__item${openFaq === i ? " is-open" : ""}`}>
              <button
                className="moni-faq__q"
                onClick={() => toggle(i)}
                aria-expanded={openFaq === i}
              >
                <span>{item.q}</span>
                <svg className="moni-faq__chevron" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="moni-faq__ans">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. SUPPORT ───────────────────────────────────────── */}
      <section className="moni-support">
        <div className="moni-support__grid">

          <div className="moni-support__card">
            <div className="moni-support__ico">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M14 6h20a4 4 0 014 4v28a4 4 0 01-4 4H14a4 4 0 01-4-4V10a4 4 0 014-4z"
                  stroke="#1a7070" strokeWidth="2.5" />
                <circle cx="24" cy="36" r="2" fill="#1a7070" />
                <path d="M18 6h12" stroke="#1a7070" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Phone Support</h3>
            <p>Need help? Our energy experts are standing by to assist you with any questions.</p>
            <a href="tel:+919876543210" className="moni-support__btn">Get in touch</a>
          </div>

          <div className="moni-support__card">
            <div className="moni-support__ico">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="6" y="12" width="36" height="24" rx="3"
                  stroke="#1a7070" strokeWidth="2.5" />
                <path d="M6 15l18 11 18-11" stroke="#1a7070" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Email Inquiry</h3>
            <p>Contact us via email and we'll respond promptly to provide the assistance you need.</p>
            <a href="/contact" className="moni-support__btn">Contact us now</a>
          </div>

          <div className="moni-support__card">
            <div className="moni-support__ico">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M16 28c0-4 3-7 8-7s8 3 8 7" stroke="#1a7070" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="24" cy="16" r="5" stroke="#1a7070" strokeWidth="2.5" />
                <path d="M8 34c0-3 2-5 6-6" stroke="#1a7070" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="10" cy="22" r="4" stroke="#1a7070" strokeWidth="2.5" />
                <path d="M40 34c0-3-2-5-6-6" stroke="#1a7070" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="38" cy="22" r="4" stroke="#1a7070" strokeWidth="2.5" />
              </svg>
            </div>
            <h3>Partnership Opportunities</h3>
            <p>Interested in partnering with Cathode Power? Let's build a brighter future together.</p>
            <a href="/contact" className="moni-support__btn moni-support__btn--accent">Partner with us</a>
          </div>

        </div>
      </section>

    </main>
  );
}
