import { useState } from "react";
import { subscribeNewsletter } from "../../services/newsletterSubscribe";
import "./NewsletterSection.css";
import newsletterImg from "../../assets/newsletter.jpg";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!agreed) {
      setStatus("error");
      setFeedback("Please agree to the Privacy Policy and Terms of Service.");
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setStatus("loading");
    setFeedback("");

    try {
      await subscribeNewsletter({ email: trimmedEmail, source: "product-details" });
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
    <section className="newsletterSection">
      <div className="newsletterContainer">

        {/* LEFT — Image */}
        <div className="newsletterImage">
          <img src={newsletterImg} alt="Solar Energy Home" loading="lazy" decoding="async" />
        </div>

        {/* RIGHT — Content */}
        <div className="newsletterContent">
          <p className="newsletterSmall">Stay Connected</p>

          <h2 className="newsletterTitle">
            Get the Latest Updates<br />from Cathode Power
          </h2>

          <p className="newsletterDesc">
            Latest solar technology updates and product news from Cathode Power.
          </p>

          <form className="newsletterForm" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={status === "loading" || !agreed}>
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {feedback ? (
            <p className={`newsletterFeedback newsletterFeedback--${status}`} role="status">
              {feedback}
            </p>
          ) : null}

          <label className="newsletterPolicy">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to the&nbsp;
            <a href="/privacy-policy">Privacy Policy</a>
            &nbsp;and&nbsp;
            <a href="/terms">Terms of Service</a>
          </label>
        </div>

      </div>
    </section>
  );
}