import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Lazy-loaded pages (code splitting)
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const CI = lazy(() => import("./pages/CI"));
const Monitoring = lazy(() => import("./pages/Monitoring"));
const Downloads = lazy(() => import("./pages/Downloads"));

export default function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#f7f7f5" }} />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ci" element={<CI />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Suspense>
  );
}