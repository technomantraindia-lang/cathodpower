import { useEffect, useRef, useState } from "react";
import "./NeedHelpSection.css";

const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 12a4.6 4.6 0 1 0-4.6-4.6A4.6 4.6 0 0 0 12 12Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M4.2 20c1.7-4.1 14-4.1 15.6 0"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const IconInstaller = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 16c2.5 0 4.5-2 4.5-4.5S10.5 7 8 7 3.5 9 3.5 11.5 5.5 16 8 16Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M14.5 7.5c2.8-.8 5.6 1 6 3.9.3 2.4-1.3 4.7-3.6 5.2-2.5.6-4.9-1-5.5-3.4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M7 20c1.3-2.7 6.7-2.7 8 0"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const IconService = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 10V8a6 6 0 0 1 12 0v2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M6 10h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M18 10h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M12 19c2 0 3-1 3-2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const ITEMS = [
  {
    key: "download",
    icon: <IconUser />,
    title: "Data Download",
    desc: "Find important documents",
    href: "#",
    variant: "default",
  },
  {
    key: "installer",
    icon: <IconInstaller />,
    title: "Find an Installer",
    desc: "Find your nearest premium installer",
    href: "#",
    variant: "accent",
  },
  {
    key: "service",
    icon: <IconService />,
    title: "Service",
    desc: "Dedicated assistance, prompt problem-solving",
    href: "#",
    variant: "default",
  },
];

export default function NeedHelpSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Trigger animation only when section comes into view (first time)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`nh2 ${visible ? "is-visible" : ""}`}>
      <div className="nh2__container">
        <h2 className="nh2__title">Need Help?</h2>

        <div className="nh2__grid">
          {ITEMS.map((it, idx) => (
            <a
              key={it.key}
              href={it.href}
              className={`nh2Card ${it.variant === "accent" ? "is-accent" : ""}`}
              style={{ "--i": idx }}
            >
              <span className="nh2Card__icon">{it.icon}</span>

              <span className="nh2Card__text">
                <span className="nh2Card__h">{it.title}</span>
                <span className="nh2Card__p">{it.desc}</span>
              </span>

              <span className="nh2Card__chev" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}