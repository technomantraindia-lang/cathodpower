const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

const rawCssPath = 'C:/Users/LENOVO/.gemini/antigravity-ide/brain/7fba60a6-ceff-4946-9dd4-845954958e7e/scratch/emergena.css';
const inputCss = fs.readFileSync(rawCssPath, 'utf8');

const prefixPlugin = () => {
  return {
    postcssPlugin: 'prefix-emergena',
    Rule(rule) {
      // Do not touch keyframe steps
      if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name.includes('keyframes')) {
        return;
      }
      // Do not touch font-face
      if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name.includes('font-face')) {
        return;
      }

      // Root variables: apply to :root, .emergena-home
      if (rule.selector.trim() === ':root') {
        rule.selector = ':root, .emergena-home';
        return;
      }

      const selectors = rule.selectors.map(sel => {
        sel = sel.trim();
        if (sel === 'body' || sel === 'html') {
          return '.emergena-home';
        }
        if (sel.startsWith('body ') || sel.startsWith('html ')) {
          return sel.replace(/^(body|html)\s+/, '.emergena-home ');
        }
        if (sel.startsWith('.emergena-home')) {
          return sel;
        }
        if (sel === '*') {
          return '.emergena-home, .emergena-home *';
        }
        return `.emergena-home ${sel}`;
      });

      rule.selector = selectors.join(', ');
    }
  };
};

prefixPlugin.postcss = true;

async function generate() {
  const result = await postcss([prefixPlugin]).process(inputCss, { from: undefined });
  
  // Custom additions for icons, cursor, and resets
  const extraCss = `
/* ========================================================
   EMERGENA ENHANCEMENTS & REFINEMENTS
   ======================================================== */
.emergena-home {
  background-color: #f7f7f5;
  color: #142922;
  font-family: "Instrument Sans", sans-serif;
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: clip;
}

/* Material Icons rendering */
.emergena-home .icon,
.emergena-home .icon-counter,
.emergena-home .faq-icon,
.emergena-home .arrow-icon,
.emergena-home .swipe-icon {
  font-family: 'Material Icons', 'Material Icons Round' !important;
  font-weight: normal;
  font-style: normal;
  font-size: inherit;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  display: inline-block;
  vertical-align: middle;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

/* Hero Section explicit constraints */
.emergena-home .main-section.hero-homepage {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #0b1919;
}

.emergena-home .wrapper-image-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.emergena-home .wrapper-image-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.emergena-home .hero-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(11,25,25,0.4) 0%, rgba(11,25,25,0.85) 100%);
  z-index: 1;
}

.emergena-home .bottom-content-wrap.vertical.hero {
  position: relative;
  z-index: 2;
  width: 100%;
  padding-bottom: 40px;
}

/* Button hover interaction */
.emergena-home .button-wrap {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.emergena-home .button-wrap .bg-primary-btn {
  position: absolute;
  inset: 0;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.emergena-home .button-wrap:hover .bg-primary-btn {
  transform: translateY(0%);
}

.emergena-home .button-wrap .primary-text-wrap {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

/* Image zoom hover effects */
.emergena-home .solution-image,
.emergena-home .blog-image,
.emergena-home .client-image,
.emergena-home .img-process-wrap,
.emergena-home .img-card-middle {
  overflow: hidden;
  border-radius: 12px;
}

.emergena-home .solution-image img,
.emergena-home .blog-image img,
.emergena-home .client-image img,
.emergena-home .img-process-wrap img,
.emergena-home .img-card-middle img {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.emergena-home .solution-card-wrap:hover .solution-image img,
.emergena-home .blog-card-wrap:hover .blog-image img,
.emergena-home .single-process-wrap:hover .img-process-wrap img,
.emergena-home .card-middle:hover .img-card-middle img {
  transform: scale(1.05);
}

/* Custom Cursor */
.emergena-cursor-wrap {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 99999;
}

.cursor-core {
  position: fixed;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(169, 253, 128, 0.6);
  pointer-events: none;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease;
}

.cursor-pointer {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #a9fd80;
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}

/* FAQ Accordion */
.emergena-home .faq-dropdown {
  cursor: pointer;
  border-bottom: 1px solid rgba(20, 41, 34, 0.1);
  padding: 24px 0;
  transition: border-color 0.3s ease;
}

.emergena-home .faq-dropdown:hover {
  border-color: rgba(20, 41, 34, 0.3);
}

.emergena-home .dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.emergena-home .faq-answer {
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

/* Solutions Cards */
.emergena-home .solution-card-wrap {
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.emergena-home .solution-card-wrap:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(20, 41, 34, 0.08);
}

.emergena-home .border-card-solution {
  display: block !important;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #2d5254;
  z-index: 3;
}

.emergena-home .solution-card-wrap .bg-card-solutions {
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.emergena-home .solution-card-wrap:hover .bg-card-solutions {
  background-color: #a9fd80 !important;
}

.emergena-home .solution-card-wrap .description-solution {
  transition: color 0.3s ease;
}

.emergena-home .solution-card-wrap:hover .description-solution {
  color: #142922 !important;
}

.emergena-home .solution-card-wrap .solution-number {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.emergena-home .solution-card-wrap:hover .solution-number {
  background-color: #ffffff !important;
  color: #142922 !important;
}

.emergena-home .solution-card-wrap .solution-image img {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.emergena-home .solution-card-wrap:hover .solution-image img {
  transform: scale(1.08);
}

/* Principles Cards Hover */
.emergena-home .single-principal-wrap {
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease;
}

.emergena-home .single-principal-wrap:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(20, 41, 34, 0.08), 0 4px 12px rgba(20, 41, 34, 0.03);
  border-color: rgba(45, 82, 84, 0.4);
}

.emergena-home .single-principal-wrap .principal-number {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease;
}

.emergena-home .single-principal-wrap:hover .principal-number {
  transform: scale(1.12) rotate(4deg);
  background-color: #a9fd80;
  border-color: #142922;
}

.emergena-home .single-principal-wrap .principal-title {
  transition: color 0.3s ease;
}

.emergena-home .single-principal-wrap:hover .principal-title {
  color: #142922;
}

.emergena-home .card-middle {
  cursor: pointer;
  overflow: hidden;
  border-radius: var(--_sizes---radius--md-radius);
  transition: box-shadow 0.4s ease;
}

.emergena-home .card-middle:hover {
  box-shadow: 0 20px 44px rgba(20, 41, 34, 0.12);
}

.emergena-home .card-middle img {
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.emergena-home .card-middle:hover img {
  transform: scale(1.06);
}

/* Case Studies / Success Stories Slider Refinements */
.emergena-home .projects-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 36px;
  gap: 24px;
}

.emergena-home .arrows-wrap-stories {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.emergena-home .prev-button {
  width: 48px !important;
  height: 48px !important;
  border-radius: 50% !important;
  border: 1px dashed rgba(169, 253, 128, 0.45) !important;
  background-color: #142922 !important;
  color: #ffffff !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  position: static !important;
  top: auto !important;
  right: auto !important;
  left: auto !important;
  bottom: auto !important;
}

.emergena-home .prev-button:hover {
  background-color: #a9fd80 !important;
  color: #142922 !important;
  border-color: #a9fd80 !important;
  border-style: solid !important;
  transform: scale(1.08) !important;
}

.emergena-home .prev-button:active {
  transform: scale(0.92) !important;
}

.emergena-home .prev-button .arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.emergena-home .prev-button .arrow-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 2.2;
}

.emergena-home .project-item {
  background-color: #2d5254;
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.28);
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}

.emergena-home .project-item:hover {
  border-color: rgba(169, 253, 128, 0.25);
  box-shadow: 0 28px 56px rgba(0, 0, 0, 0.35);
}

.emergena-home .left-content-wrap.projects-card {
  width: 46%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: static;
}

.emergena-home .img-tag-stories {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: #142922;
}

.emergena-home .client-image {
  width: 100%;
  height: 340px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.emergena-home .client-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.emergena-home .project-item:hover .client-image img {
  transform: scale(1.05);
}

.emergena-home .project-number {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background-color: #ffffff;
  color: #142922;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 6px;
  transition: background-color 0.35s ease, color 0.35s ease;
}

.emergena-home .project-item:hover .project-number {
  background-color: #a9fd80;
  color: #142922;
}

.emergena-home .title-description-wrap {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.emergena-home .title-description-wrap .text-xs {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
}

.emergena-home .title-description-wrap .text-xxs {
  color: #a9fd80;
  font-size: 12px;
  font-weight: 500;
}

.emergena-home .right-content-wrap.projects-card {
  width: 54%;
  padding-left: 36px;
  border-left: 1px dashed rgba(169, 253, 128, 0.35);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.emergena-home .title-card-stories {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.emergena-home .title-card-stories .text-l {
  font-size: 30px;
  line-height: 1.25;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.emergena-home .desc-stories .text-xs {
  font-size: 14px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.72);
}

.emergena-home .bottom-content-wrap.projects-card-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 36px;
}

.emergena-home .number-suffix-wrap {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.emergena-home .metric-value .text-l,
.emergena-home .metric-unit .text-l {
  font-size: 46px;
  line-height: 1;
  font-weight: 700;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
}

.emergena-home .counter-title-stories .text-sm {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 6px;
}

.emergena-home .slide-dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
}

.emergena-home .slide-dot-item {
  height: 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.22);
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.emergena-home .slide-dot-item.active {
  width: 28px;
  background-color: #a9fd80;
}

.emergena-home .slide-dot-item:not(.active) {
  width: 8px;
}

.emergena-home .slide-dot-item:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.45);
}

@media (max-width: 991px) {
  .emergena-home .project-item {
    flex-direction: column;
    padding: 24px;
  }
  .emergena-home .left-content-wrap.projects-card,
  .emergena-home .right-content-wrap.projects-card {
    width: 100%;
  }
  .emergena-home .right-content-wrap.projects-card {
    padding-left: 0;
    padding-top: 24px;
    border-left: none;
    border-top: 1px dashed rgba(169, 253, 128, 0.35);
  }
  .emergena-home .client-image {
    height: 280px;
  }
  .emergena-home .title-card-stories .text-l {
    font-size: 24px;
  }
}

/* About & Counters Section Enhancements */
.emergena-home #about {
  position: relative;
  background-color: #142922;
  padding: 120px 0;
  overflow: hidden;
}

.emergena-home #about::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 500px;
  background: radial-gradient(ellipse at center, rgba(45, 82, 84, 0.3) 0%, rgba(20, 41, 34, 0) 70%);
  pointer-events: none;
  z-index: 0;
}

.emergena-home .main-container.about {
  position: relative;
  z-index: 1;
  pointer-events: auto !important;
}

.emergena-home .about-scroll {
  pointer-events: auto !important;
  width: 100%;
}

.emergena-home .about-content-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.emergena-home .top-content-wrap.about-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 48px;
}

.emergena-home .tag-about {
  flex-shrink: 0;
}

.emergena-home .desc-about-company {
  width: 68%;
  max-width: 820px;
}

.emergena-home .desc-about-company h2.text-l {
  font-size: 32px;
  line-height: 1.35;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.emergena-home .separator-line {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.12);
  margin: 48px 0;
  transform-origin: 0% 50%;
}

.emergena-home .about-counter {
  width: 100%;
}

.emergena-home .about-number-wrap {
  width: 100%;
}

.emergena-home .number-group-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
}

.emergena-home .number-card-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  border-radius: 16px;
  background-color: transparent;
  border: 1px solid transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.emergena-home .number-card-wrap:hover {
  background-color: rgba(45, 82, 84, 0.28);
  border-color: rgba(169, 253, 128, 0.25);
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
}

.emergena-home .number-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1e3d3e;
  border: 1px solid rgba(169, 253, 128, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.emergena-home .number-card-wrap:hover .number-icon {
  background-color: #a9fd80;
  border-color: #a9fd80;
  transform: scale(1.1) rotate(6deg);
  box-shadow: 0 0 24px rgba(169, 253, 128, 0.4);
}

.emergena-home .icon-counter-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a9fd80;
  transition: color 0.3s ease;
  z-index: 2;
}

.emergena-home .icon-counter-wrap svg {
  width: 22px;
  height: 22px;
  transition: transform 0.4s ease;
}

.emergena-home .number-card-wrap:hover .icon-counter-wrap {
  color: #142922;
}

.emergena-home .counter-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.emergena-home .number-suffix-wrap {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.emergena-home .counter-number {
  font-size: 38px;
  line-height: 1;
  font-weight: 700;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.emergena-home .suffix-text .text-m {
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
  color: #a9fd80;
  letter-spacing: -0.01em;
}

.emergena-home .counter-title .text-sm {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  letter-spacing: 0.01em;
}

@media (max-width: 991px) {
  .emergena-home .top-content-wrap.about-section {
    flex-direction: column;
    gap: 24px;
  }
  .emergena-home .desc-about-company {
    width: 100%;
  }
  .emergena-home .desc-about-company h2.text-l {
    font-size: 26px;
  }
  .emergena-home .number-group-wrap {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .emergena-home .number-group-wrap {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* ========================================================
   PROCESS SECTION REFINEMENTS & STACKING ANIMATION
   ======================================================== */
.emergena-home .main-section.process-section {
  position: relative;
  background-color: #f7f7f5;
  padding-top: 100px;
  padding-bottom: 120px;
}

.emergena-home .process-scroll.secondary {
  position: relative;
  width: 100%;
}

.emergena-home .process-content-wrapper {
  position: relative !important;
  top: 0 !important;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.emergena-home .process-title-section {
  width: 100%;
  max-width: 780px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  margin-bottom: 8px;
}

/* Step Tab Navigation Pills */
.emergena-home .process-step-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.emergena-home .process-step-tab {
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  background-color: #ffffff;
  color: #5a736a;
  border: 1px solid rgba(20, 41, 34, 0.12);
  box-shadow: 0 2px 6px rgba(20, 41, 34, 0.04);
}

.emergena-home .process-step-tab:hover {
  border-color: #142922;
  color: #142922;
  transform: translateY(-2px);
}

.emergena-home .process-step-tab.active {
  background-color: #142922;
  color: #ffffff;
  border-color: #142922;
  box-shadow: 0 4px 14px rgba(20, 41, 34, 0.18);
  transform: translateY(-2px);
}

.emergena-home .process-step-tab.active span {
  color: #a9fd80;
}

/* Card Presentation Stage */
.emergena-home .process-stage-container {
  position: relative;
  width: 100%;
  height: 380px;
  border-radius: 20px;
  overflow: hidden;
}

.emergena-home .single-process-wrap {
  width: 100%;
  height: 100%;
  border-radius: 20px !important;
  background-color: #ffffff !important;
  border: 1px solid rgba(20, 41, 34, 0.08) !important;
  box-shadow: 0 20px 48px rgba(20, 41, 34, 0.07), 0 2px 8px rgba(20, 41, 34, 0.02) !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 24px 32px !important;
  gap: 32px !important;
  position: absolute !important;
  inset: 0 !important;
  transition: box-shadow 0.4s ease;
}

.emergena-home .single-process-wrap:hover {
  box-shadow: 0 28px 56px rgba(20, 41, 34, 0.11), 0 4px 12px rgba(20, 41, 34, 0.04) !important;
}

.emergena-home .number-process {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.emergena-home .number-process.right-border {
  border-right: 1px solid rgba(20, 41, 34, 0.09) !important;
  border-left: none !important;
}

.emergena-home .number-process.left-border {
  border-left: 1px solid rgba(20, 41, 34, 0.09) !important;
  border-right: none !important;
}

.emergena-home .process-step .text-ms {
  font-size: 26px;
  font-weight: 700;
  color: #142922;
  letter-spacing: -0.02em;
}

.emergena-home .process-title {
  width: 44%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: static !important;
}

.emergena-home .process-titles {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2d5254;
  margin-bottom: 12px;
}

.emergena-home .process-step-title {
  font-size: 24px;
  line-height: 1.35;
  font-weight: 500;
  color: #142922;
  letter-spacing: -0.02em;
}

.emergena-home .process-img-desc {
  width: 36%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.emergena-home .process-image {
  width: 100%;
  height: 320px !important;
  border-radius: 16px !important;
  overflow: hidden !important;
  position: relative;
}

.emergena-home .img-process-wrap {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: auto !important;
}

.emergena-home .img-process-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.emergena-home .single-process-wrap:hover .img-process-wrap img {
  transform: scale(1.05);
}

/* Mobile responsive fallback: stacked layout */
@media (max-width: 991px) {
  .emergena-home .process-stage-container {
    height: auto !important;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow: visible !important;
  }
  .emergena-home .single-process-wrap {
    position: static !important;
    height: auto !important;
    flex-direction: column !important;
    padding: 24px !important;
    gap: 20px !important;
  }
  .emergena-home .number-process {
    width: 100% !important;
    border-right: none !important;
    border-left: none !important;
    border-bottom: 1px solid rgba(20, 41, 34, 0.09) !important;
    padding-bottom: 12px;
    justify-content: flex-start !important;
  }
  .emergena-home .process-title {
    width: 100% !important;
    align-items: flex-start !important;
    text-align: left !important;
  }
  .emergena-home .process-step-title {
    font-size: 20px !important;
  }
  .emergena-home .process-img-desc {
    width: 100% !important;
  }
  .emergena-home .process-image {
    height: 240px !important;
  }
}
`;

  const finalCss = result.css + '\n' + extraCss;
  const outPath = path.resolve('src', 'sections', 'emergena', 'emergena.css');
  fs.writeFileSync(outPath, finalCss, 'utf8');
  console.log('Successfully wrote', finalCss.length, 'bytes to', outPath);
}

generate();
