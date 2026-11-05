import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutPresenceMap.css";

gsap.registerPlugin(ScrollTrigger);

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

const INVERTERS_TARGET = 100000;

function calcDaysSinceFounding() {
  return Math.max(0, Math.floor((Date.now() - FOUNDING_DATE.getTime()) / 86400000));
}

export default function AboutPresenceMap() {
  const rootRef = useRef(null);
  const invertersRef = useRef(null);
  const daysStatRef = useRef(null);
  const countedRef = useRef(false);
  const [activeId, setActiveId] = useState("gujarat");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const daysTarget = calcDaysSinceFounding();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setFinalValues = () => {
      if (invertersRef.current) {
        invertersRef.current.textContent = `${formatDays(INVERTERS_TARGET)}+`;
      }
      if (daysStatRef.current) {
        daysStatRef.current.innerHTML = `${formatDays(daysTarget)} <span>Days</span>`;
      }
    };

    if (reduceMotion) {
      setFinalValues();
      return;
    }

    if (invertersRef.current) invertersRef.current.textContent = "0+";
    if (daysStatRef.current) {
      daysStatRef.current.innerHTML = `0 <span>Days</span>`;
    }

    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            once: true,
          },
        })
        .from(".apm__intro > *", {
          y: 18,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
        })
        .from(
          ".apm__stage > *",
          {
            y: 22,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.25"
        )
        .from(
          ".apm__pin",
          {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            stagger: 0.035,
            ease: "back.out(1.5)",
          },
          "-=0.35"
        )
        .from(
          ".apm__chip",
          {
            y: 8,
            opacity: 0,
            duration: 0.28,
            stagger: 0.02,
            ease: "power2.out",
          },
          "-=0.2"
        );

      const invertersObj = { val: 0 };
      tl.to(
        invertersObj,
        {
          val: INVERTERS_TARGET,
          duration: 2.4,
          ease: "power2.out",
          onUpdate: () => {
            if (!invertersRef.current) return;
            invertersRef.current.textContent = `${formatDays(
              Math.round(invertersObj.val)
            )}+`;
          },
          onComplete: () => {
            if (!invertersRef.current) return;
            invertersRef.current.textContent = `${formatDays(INVERTERS_TARGET)}+`;
            countedRef.current = true;
          },
        },
        "-=0.35"
      );

      const daysObj = { val: 0 };
      tl.to(
        daysObj,
        {
          val: daysTarget,
          duration: 2.4,
          ease: "power2.out",
          onUpdate: () => {
            if (!daysStatRef.current) return;
            daysStatRef.current.innerHTML = `${formatDays(
              Math.round(daysObj.val)
            )} <span>Days</span>`;
          },
          onComplete: () => {
            if (!daysStatRef.current) return;
            daysStatRef.current.innerHTML = `${formatDays(daysTarget)} <span>Days</span>`;
          },
        },
        "<0.15"
      );
    }, root);

    const syncDays = () => {
      if (!countedRef.current || !daysStatRef.current) return;
      daysStatRef.current.innerHTML = `${formatDays(
        calcDaysSinceFounding()
      )} <span>Days</span>`;
    };
    const id = window.setInterval(syncDays, 60 * 60 * 1000);

    return () => {
      window.clearInterval(id);
      ctx.revert();
    };
  }, []);

  const active = useMemo(
    () => STATES.find((s) => s.id === activeId) ?? STATES[0],
    [activeId]
  );

  return (
    <section className="apm" id="presence" aria-label="Nationwide presence" ref={rootRef}>
      <div className="apm__inner">
        <header className="apm__intro">
          <div className="apm__intro-left">
            <p className="apm__kicker">
              <span className="apm__kicker-line" aria-hidden="true" />
              Pan-India Presence
            </p>
            <h2 className="apm__title">
              Our Roots Are in Gujarat. Our Vision Reaches Every Corner of India.
            </h2>
          </div>
          <p className="apm__lead">
            With a growing nationwide network of solar EPCs, partners, and sales and service
            professionals, we are bringing smart solar technology closer to people across India.
          </p>
        </header>

        <div className="apm__stage">
          <aside className="apm__metric apm__metric--left">
            <p className="apm__metric-label">Milestone Achieved</p>
            <p className="apm__metric-stat" ref={invertersRef}>
              0+
            </p>
            <p className="apm__metric-desc">Inverters Installed Across India</p>
          </aside>

          <div className="apm__map-panel">
            <div className="apm__map" role="img" aria-label="India presence map">
              <img
                className="apm__map-img"
                src="/images/about/india-outline-light.png?v=6"
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
                    <span className="apm__pin-ring" aria-hidden="true" />
                    <span className="apm__pin-dot" />
                    {isActive && (
                      <span className="apm__tooltip">{state.label || state.name}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="apm__active" aria-live="polite">
              <span className="apm__active-dot" aria-hidden="true" />
              Exploring <strong>{active.label || active.name}</strong>
            </p>
          </div>

          <aside className="apm__metric apm__metric--right">
            <p className="apm__metric-label">Stamp of Quality</p>
            <p className="apm__metric-stat" ref={daysStatRef}>
              0 <span>Days</span>
            </p>
            <p className="apm__metric-desc">
              Running through dependable products, partnerships and custom-built service.
            </p>
          </aside>
        </div>

        <div className="apm__states" role="list" aria-label="Presence states">
          {STATES.map((state) => (
            <button
              key={state.id}
              type="button"
              role="listitem"
              className={`apm__chip${state.id === activeId ? " is-active" : ""}`}
              onClick={() => setActiveId(state.id)}
            >
              <span className="apm__chip-dot" aria-hidden="true" />
              {state.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
