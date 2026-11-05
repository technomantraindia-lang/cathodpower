import { useId, useState } from "react";
import "./SuccessStories.css";

const FAQ_ITEMS = [
  {
    id: "01",
    title: "What are the best solar inverters for residential rooftop projects in India?",
    content:
      "For residential solar installations in India, particularly under the PM-Surya Ghar Muft Bijli Yojana, on-grid single-phase inverters like the Cathode Power CP-3000L and CP-3400L are highly recommended. These models are designed for optimal performance within the 1 kW to 5 kW capacity range, offering features like IP66 protection for outdoor durability and integrated Wi-Fi for cloud-based monitoring. Their high conversion efficiency and dual-MPPT compatibility make them ideal for maximizing energy yield from residential rooftops.",
  },
  {
    id: "02",
    title: "How does a hybrid inverter differ from a traditional On-grid solar inverter?",
    content:
      "While a traditional On-grid inverter only converts DC from panels into AC for consumption or grid export, a hybrid solar inverter acts as an integrated energy management system that can coordinate solar panels, battery storage, and the utility grid simultaneously. Cathode Power hybrid inverters allow for storage-ready configurations, enabling homeowners to save excess solar power for use during the night or during power outages, which is a critical feature for achieving true energy independence.",
  },
  {
    id: "03",
    title: "What is the importance of an IP66 rating for outdoor solar inverters?",
    content:
      "An IP66 rating signifies that the solar inverter is completely protected against dust ingress and can withstand high-pressure water jets from any direction. For the Indian climate, where inverters are often exposed to extreme heat, monsoon rains, and heavy dust, an IP66-rated housing, standard across Cathode Power's On-grid and hybrid product lines, is essential for ensuring the long-term reliability of the internal electronics and reducing maintenance costs.",
  },
  {
    id: "04",
    title: "How can AI energy management systems reduce industrial electricity costs?",
    content:
      "AI-driven energy management, integrated into Cathode Power's C&I solutions, utilizes AI-powered weather forecasting, load analysis, and dynamic tariff tracking to optimize energy consumption. By automatically adjusting battery discharge or grid export based on real-time electricity prices, businesses can engage in peak shaving, using stored solar energy during peak tariff periods, thereby significantly reducing their demand charges and overall operational expenses.",
  },
  {
    id: "05",
    title: "What are the subsidy benefits under the PM Surya Ghar: Muft Bijli Yojana in 2024?",
    content:
      "Under the PM Surya Ghar scheme, Indian households can receive a central subsidy of up to INR 78,000 for rooftop solar systems above 3 kW. For smaller systems, the subsidy covers up to 40% of the installation cost, making renewable energy accessible to millions. Selecting a compatible, high-efficiency inverter from a trusted Indian manufacturer like Cathode Power is crucial for meeting the technical guidelines and ensuring a smooth subsidy disbursement process via the National Portal.",
  },
  {
    id: "06",
    title: "Why is Dual MPPT architecture important for commercial solar projects?",
    content:
      "Dual MPPT (Maximum Power Point Tracking) architecture allows a single three-phase inverter to manage two independent strings of solar panels. This is particularly beneficial for commercial rooftops with multiple orientations or areas affected by partial shading, as the inverter can optimize the power output from each string separately. Cathode Power's HL series, including the CP-05HL to CP-25HL, leverages this technology to ensure maximum energy harvest in complex industrial environments.",
  },
  {
    id: "07",
    title: "How does a solar inverter's cooling system affect its lifespan?",
    content:
      "The cooling system is vital for preventing thermal stress, which is the leading cause of power electronic failures. Inverters that utilize “Smart Cooling” technology, such as the Cathode Power HL series, use intelligent control to maintain optimal internal temperatures, protecting sensitive components like capacitors and transistors. Proper thermal management can extend the operational life of a solar inverter to 10-12 years or more, reducing the frequency of replacement and improving long-term ROI.",
  },
  {
    id: "08",
    title: "Are Cathode Power inverters compatible with all types of solar panels?",
    content:
      "Yes, Cathode Power inverters are designed with wide DC input voltage ranges and smart MPPT algorithms, making them compatible with a broad spectrum of solar panel technologies, including traditional monocrystalline, high-efficiency PERC, and advanced bifacial modules. Their flexible architecture allows for seamless integration into various system designs, whether for small residential units or large utility-scale plants.",
  },
  {
    id: "09",
    title: "What role does the Cathode Cloud Platform play in system monitoring?",
    content:
      "The Cathode Cloud Platform provides next-generation energy visibility through real-time performance analytics and remote system access. Users can monitor their energy generation, consumption, and storage status from any location, receiving instant alerts for any technical faults or maintenance requirements. This intelligent oversight is essential for maintaining high system uptime and optimizing the financial returns of a solar energy investment.",
  },
  {
    id: "10",
    title: "What is the process for becoming a Cathode Power service partner in India?",
    content:
      "Cathode Power offers a comprehensive “Learning Program” through its “Cathode Academy” to train installers and service partners on the latest solar technologies and installation best practices. Interested entities can apply to become a Service Partner via the company's official website, gaining access to technical documents, datasheets, and direct manufacturer support, joining a network of over 500 trusted partners across the country.",
  },
];

function ChevronIcon({ open }) {
  return (
    <span
      className={`success-chevron${open ? " success-chevron--open" : ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(null);
  const baseId = useId();

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const renderFaq = (faq, index) => {
    const isOpen = activeIndex === index;
    const controlId = `${baseId}-panel-${index}`;
    const headerId = `${baseId}-header-${index}`;

    return (
      <div
        key={faq.id}
        className={`success-item${isOpen ? " success-item--open" : ""}`}
      >
        <h3 className="success-item__heading" id={headerId}>
          <button
            type="button"
            className="success-row"
            onClick={() => toggleAccordion(index)}
            aria-expanded={isOpen}
            aria-controls={controlId}
          >
            <span className="success-number">{faq.id}</span>
            <span className="success-title">{faq.title}</span>
            <span className="success-iconWrap" aria-hidden>
              <ChevronIcon open={isOpen} />
            </span>
          </button>
        </h3>

        <div
          id={controlId}
          role="region"
          aria-labelledby={headerId}
          className="success-content"
          data-open={isOpen}
          aria-hidden={!isOpen}
        >
          <div className="success-content__inner">
            <p>{faq.content}</p>
          </div>
        </div>
      </div>
    );
  };

  const faqLeft = FAQ_ITEMS.slice(0, 5);
  const faqRight = FAQ_ITEMS.slice(5, 10);

  return (
    <section className="success-section perf-cv" id="faq" aria-labelledby={`${baseId}-heading`}>
      <div className="container success-container">
        <header className="success-header">
          <span className="success-label">• FAQs</span>
          <h2 id={`${baseId}-heading`}>Frequently Asked Questions</h2>
          <p>
            Answers on Cathode Power inverters, hybrid and on-grid systems,
            compatibility, cloud monitoring, subsidies, and our partner
            program, so you can choose and run solar with confidence in India
            and beyond.
          </p>
        </header>

        <div
          className="success-accordion-grid"
          role="group"
          aria-label="Frequently asked questions"
        >
          <div className="success-accordion-col">
            {faqLeft.map((faq, i) => renderFaq(faq, i))}
          </div>
          <div className="success-accordion-col">
            {faqRight.map((faq, i) => renderFaq(faq, i + 5))}
          </div>
        </div>
      </div>
    </section>
  );
}
