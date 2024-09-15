import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Trend from "../components/sections/Trend";
import Products from "../components/sections/Products";
import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";
import HeroSection from "../components/sections/HeroSection";
import AboutUsSection from "@/components/sections/AboutSection";
import MainBlogPage from "@/components/sections/BlogSection";
import ServiceSection from "@/components/sections/ServiceSection";

export default function Main() {
  const authRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      console.log("token", token);
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://signyards.in/getProducts.php",
          {
            page: "homepage",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        console.log(data);
        const filteredServices = data.filter((item) => item.type === "Service");
        const filteredProducts = data.filter((item) => item.type === "Product");
        setServices(filteredServices);
        setProducts(filteredProducts);
        console.log(products);
        console.log(services);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleAuthComplete = (accessToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white">
      <Header />
      <HeroSection isAuthenticated={isAuthenticated} authRef={authRef} />
      <Trend />
      <Products products={products} />
      <ServiceSection services={services} />
      <AboutUsSection />
      <Footer />
      {/* <FileUpload /> */}
    </div>
  );
}
