import "./About.css";
import NewsletterBandSection from "../sections/NewsletterBandSection";
import AboutMilestones from "../components/about/AboutMilestones";
import AboutPresenceMap from "../components/about/AboutPresenceMap";
import AboutWho from "../components/about/AboutWho";
import AboutStrengths from "../components/about/AboutStrengths";
import AboutJourney from "../components/about/AboutJourney";
import AboutIndiaDesign from "../components/about/AboutIndiaDesign";

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-inner">
          <p className="about-eyebrow">
            <span className="about-eyebrow-dot" />
            About Cathode Power
          </p>
          <h1>We Didn&apos;t Enter the Solar Industry to Follow. We Came to Build Better.</h1>
          <p className="about-sub">
            A journey driven by Indian innovation, engineering excellence, and the belief that
            better technology can power a brighter tomorrow.
          </p>
        </div>
      </section>

      <AboutWho />

      <AboutStrengths />

      <AboutIndiaDesign />

      <AboutJourney />

      {/* Keep milestones exactly as designed */}
      <AboutMilestones />

      <AboutPresenceMap />

      <section className="about-close" aria-label="Road ahead and newsletter">
        <div className="about-close__inner">
          <header className="about-ahead">
            <p className="about-ahead__kicker">
              <span className="about-ahead__kicker-line" aria-hidden="true" />
              The Road Ahead
            </p>
            <div className="about-ahead__grid">
              <h2 className="about-ahead__title">
                The Future Isn&apos;t Something We Wait For. It&apos;s Something We Engineer.
              </h2>
              <p className="about-ahead__copy">
                From smarter solar inverters to evolving energy storage technologies, our pursuit of
                innovation continues beyond today&apos;s possibilities.
              </p>
            </div>
          </header>

          <div className="about-close__newsletter">
            <NewsletterBandSection
              imageSrc="/images/factoryimages/5.jpeg"
              imageAlt="Cathode Power clean energy"
              source="about"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
