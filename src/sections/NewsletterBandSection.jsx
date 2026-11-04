import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { subscribeNewsletter } from "../services/newsletterSubscribe";
import "./NewsletterBandSection.css";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_IMAGE = "/images/factoryimages/5.jpeg";

/**
 * @param {object} props
 * @param {string} [props.imageSrc] — public URL or imported asset from Vite
 * @param {string} [props.imageAlt]
 * @param {string} [props.source] — tracking label for signup source page
 */
export default function NewsletterBandSection({
  imageSrc = DEFAULT_IMAGE,
  imageAlt = "Cathode Power installation",
  source = "website",
}) {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const innerEl = section.querySelector(".nlb__inner");
      const imgEl = section.querySelector(".nlb__image img");
      const contentChildren = section.querySelectorAll(
        ".nlb__eyebrow, .nlb__title, .nlb__form, .nlb__consent"
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      if (innerEl) {
        tl.fromTo(
          innerEl,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      }

      if (imgEl) {
        tl.fromTo(
          imgEl,
          { scale: 1.08, opacity: 0.85 },
          { scale: 1, opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.7"
        );
      }

      if (contentChildren.length) {
        tl.fromTo(
          contentChildren,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!agreed) {
      setStatus("error");
      setFeedback("Please agree to the Privacy Policy and User Terms.");
      return;
    }

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus("error");
      setFeedback("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      await subscribeNewsletter({ email: trimmedEmail, source });
      setStatus("success");
      setFeedback(
        "Thank you for subscribing! Check your inbox for an email with your resource link."
      );
      setEmail("");
      setAgreed(false);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section ref={sectionRef} className="nlb" aria-labelledby="nlb-title">
      <div className="nlb__inner">
        <div className="nlb__image">
          <img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" />
        </div>
        <div className="nlb__content">
          <span className="nlb__eyebrow">To the Latest Newsletter</span>
          <h2 className="nlb__title" id="nlb-title">
            Stay Ahead with the Latest Cathode Power Updates!
          </h2>
          <form className="nlb__form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="nlb__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <button
              type="submit"
              className="nlb__btn"
              disabled={status === "loading" || !agreed}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {feedback ? (
            <p
              className={`nlb__feedback ${
                status === "success" ? "nlb__feedback--success" : "nlb__feedback--error"
              }`}
              role={status === "error" ? "alert" : "status"}
            >
              {feedback}
            </p>
          ) : null}
          <label className="nlb__consent">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed((a) => !a)}
            />
            <span>
              I have read and agree to <a href="#">Privacy Policy</a> and{" "}
              <a href="#">User Terms</a>
            </span>
          </label>
        </div>
      </div>
    </section>
  );
}
