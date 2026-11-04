import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

import { PRODUCTS } from "../data/productsData";

import ProductDetailsBanner from "../components/products/ProductDetailsBanner";
import ProductAdvantageSection from "../components/products/ProductAdvantageSection";
import ProductParametersSection from "../components/products/ProductParametersSection";
import ProductDownloadsSection from "../components/products/ProductDownloadsSection";
import NewsletterSection from "../components/products/NewsletterSection";
import QuoteModal from "../components/common/QuoteModal";
import ProductInquiryModal from "../components/common/ProductInquiryModal";

export default function ProductDetails() {
  const { slug } = useParams();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const product = useMemo(
    () => PRODUCTS.find((p) => p.slug === slug),
    [slug]
  );

  const openQuote = useCallback(() => setIsQuoteOpen(true), []);
  const closeQuote = useCallback(() => setIsQuoteOpen(false), []);
  const openInquiry = useCallback(() => setIsInquiryOpen(true), []);
  const closeInquiry = useCallback(() => setIsInquiryOpen(false), []);

  if (!product) {
    return (
      <>
        <ProductDetailsBanner product={{ name: "Product Not Found" }} />

        <main className="pd">
          <div className="pd__container">
            <Link className="pd__back" to="/products">
              ← Back to Products
            </Link>

            <p className="pd__meta">This product does not exist.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <ProductAdvantageSection product={product} onInquire={openInquiry} />

      {product.parameters && <ProductParametersSection product={product} />}

      <ProductDetailsBanner product={product} />

      {product.downloads && <ProductDownloadsSection product={product} />}

      <NewsletterSection />

      {isQuoteOpen && <QuoteModal onClose={closeQuote} />}
      {isInquiryOpen && (
        <ProductInquiryModal
          onClose={closeInquiry}
          productName={product.name}
          productSlug={product.slug}
        />
      )}
    </>
  );
}



