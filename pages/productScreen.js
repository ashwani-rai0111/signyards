import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { useCart } from "../components/context/Cartcontext";
import Link from "next/link";
import SkeletonLoaderProduct from "@/components/Loaders/SkeletonLoaderProduct";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Delivery from "@/components/reusables/delivery";

const ProductScreen = () => {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState(new Set());
  const [filterValue, setFilterValue] = useState(""); // Initialize as an empty string
  const [filterType, setFilterType] = useState(""); // Initialize as an empty string
  const observer = useRef();
  const maxProducts = 10000;
  const productsPerPage = 1000;
  const maxPages = Math.ceil(maxProducts / productsPerPage);

  const fetchPaginatedProducts = async (page = 1) => {
    if (loadedPages.has(page)) return; // Avoid reloading the same page
    setLoading(true);
    try {
      const response = await fetch("https://signyards.in/getProducts.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: "brand",
          page_number: page,
          searchValue: filterType || "", // Use filterType or an empty string
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      let filteredProducts = data.filter(
        (product) => product.type === "Product"
      );

      const sortedProducts = filteredProducts.sort((a, b) => {
        if (a.hotSelling === "Yes" && b.hotSelling !== "Yes") return -1;
        if (a.hotSelling !== "Yes" && b.hotSelling === "Yes") return 1;
        return 0;
      });

      setProducts((prevProducts) =>
        [...(page === 1 ? [] : prevProducts), ...sortedProducts].slice(
          0,
          maxProducts
        )
      );
      setLoadedPages((prevPages) => new Set([...prevPages, page]));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaginatedProducts(currentPage);
  }, [currentPage, filterType]); // Only depend on filterType

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value); // Update filter value
    setCurrentPage(1); // Reset to the first page
    setLoadedPages(new Set()); // Clear loaded pages to allow re-fetch
    setProducts([]); // Clear previous products
  };

  const handleTypeChange = (e) => {
    setFilterType(e.target.value); // Update filter type
    setCurrentPage(1); // Reset to the first page
    setLoadedPages(new Set()); // Clear loaded pages to allow re-fetch
    setProducts([]); // Clear previous products
  };

  const handleButtonClick = (product) => {
    const isInCart = cartItems.find((item) => item.id === product.id);
    if (isInCart) {
      router.push("/cart");
    } else {
      addToCart(product.id);
      console.log(`Product with ID ${product.id} added to cart`);
    }
  };

  const lastProductElementRef = useCallback(
    (node) => {
      if (loading || currentPage >= maxPages) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && products.length < maxProducts) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, currentPage, products.length]
  );

  if (loading && currentPage === 1) {
    return (
      <div id="productScreen">
        <div className="relative bg-[#eaeaea] sm:w-[calc(100%)]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <SkeletonLoaderProduct key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="mt-20 top-[120px] sm:w-full bg-[#eaeaea]">
        <div className="mx-auto max-w-7xl px-2 py-2 sm:px-2 sm:py-2 lg:px-2">
          <div className="w-full bg-[#eaeaea] mt-[40px] z-10 fixed shadow-md">
            {/* Filter Inputs */}
            <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">Filter by Brand:</span>
                <div className="relative inline-block w-full max-w-xs sm:max-w-[16rem] lg:max-w-[14rem]">
                  <select
                    value={filterType}
                    onChange={handleTypeChange}
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Brands</option>
                    <option value="MAPL">MAPL</option>
                    <option value="Aludecor">Aludecor</option>
                    <option value="Polyfix">Polyfix</option>
                    <option value="Generic">Generic</option>
                    <option value="Alstone">Alstone</option>
                    <option value="Alstar">Alstar</option>
                    <option value="Viva">Viva</option>
                    <option value="Virgo">Virgo</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 mt-[120px]">
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={
                  products.length === index + 1 ? lastProductElementRef : null
                }
                className="flex flex-col justify-between rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group block relative cursor-pointer bg-white p-4"
              >
                <Link legacyBehavior href={`/products/${product.id}`} passHref>
                  <a className="block mb-4">
                    <div className="aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
                      <div className="w-full h-64 relative">
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="object-cover object-center w-full h-full group-hover:opacity-75 border border-white"
                        />
                        {product.offer_pricing &&
                          product.offer_pricing.length > 0 && (
                            <div className="absolute bottom-1 right-1 bg-blue-400 text-white text-xs font-semibold rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                              {product.offer_pricing.length} Offers
                            </div>
                          )}
                        {product.hotSelling === "Yes" && (
                          <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Hot Selling
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.title}
                    </h3>
                    <Delivery deliveryTimeline={product.delivery_timeline} />
                    <div className="mt-2 text-lg font-medium text-gray-900 flex justify-between items-center">
                      <span>₹{product.price_per_unit}</span>
                      <span className="text-sm text-gray-500">
                        {product.subUnitPrice}/{product.unit}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      inclusive of all taxes
                    </p>
                  </a>
                </Link>
                <div className="mt-auto">
                  <button
                    onClick={() => handleButtonClick(product)}
                    className="w-full bg-[#e74c3c] text-white py-2 rounded-md text-sm font-medium hover:bg-[#c0392b] transition-colors duration-300"
                  >
                    {cartItems.find((item) => item.id === product.id)
                      ? "Go to Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductScreen;
