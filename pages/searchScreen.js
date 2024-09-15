import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../components/context/Cartcontext";
import Link from "next/link";
import SkeletonLoaderProduct from "@/components/Loaders/SkeletonLoaderProduct";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Delivery from "@/components/reusables/delivery";

const SearchScreen = () => {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  const { query } = router;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://signyards.in/searchAPI.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchValue: query.query || "", // Extract searchValue from query
            type: "searchBox",

            page_number: currentPage,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        const filteredProducts = data.filter(
          (product) => product.type === "Product"
        );

        // Function to calculate similarity score
        const calculateSimilarity = (name, query) => {
          const lowerName = name.toLowerCase();
          const lowerQuery = query.toLowerCase();
          return lowerName.includes(lowerQuery)
            ? lowerQuery.length / lowerName.length
            : 0;
        };

        // Sort products, prioritizing similar names and hot-selling ones
        const sortedProducts = filteredProducts.sort((a, b) => {
          const similarityA = calculateSimilarity(a.name, query.query || "");
          const similarityB = calculateSimilarity(b.name, query.query || "");

          // Prioritize by similarity score first
          if (similarityA > similarityB) return -1;
          if (similarityA < similarityB) return 1;

          // If similarity scores are equal, prioritize hot-selling ones
          if (a.hotSelling === "Yes" && b.hotSelling !== "Yes") return -1;
          if (a.hotSelling !== "Yes" && b.hotSelling === "Yes") return 1;

          return 0;
        });

        setProducts(sortedProducts);
        setTotalPages(data.totalPages || 1); // Assuming API returns totalPages
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, query.query]); // Fetch products whenever currentPage or search query changes

  const handleButtonClick = (product) => {
    const isInCart = cartItems.find((item) => item.id === product.id);
    if (isInCart) {
      router.push("/cart");
    } else {
      addToCart(product.id);
    }
  };

  const handleProductRedirect = (productId) => {
    router.push(`/products/${productId}`);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div
        id="productScreen"
        className="relative bg-[#eaeaea] sm:w-[calc(100%)]"
      >
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
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />

      <div id="productScreen" className="py-16 mt-20 bg-[#eaeaea]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Display the search query */}
          <p className="text-lg font-medium text-black mb-4">
            Search Results for: <span className="font-bold">{query.query}</span>
          </p>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <Link legacyBehavior href={`/products/${product.id}`} passHref>
                  <a className="block">
                    <div className="relative w-full h-64 overflow-hidden border border-white">
                      {product.hotSelling === "Yes" && (
                        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
                          Hot Selling
                        </div>
                      )}
                      <img
                        src={product.image_url}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-center object-cover transition-opacity duration-300"
                      />
                      {product.offer_pricing &&
                        product.offer_pricing.length > 0 && (
                          <div className="absolute bottom-1 right-1 bg-blue-400 text-white text-xs font-semibold rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                            {product.offer_pricing.length} Offers
                          </div>
                        )}
                    </div>
                  </a>
                </Link>
                <div className="p-4">
                  <h3 className="text-sm text-black">{product.name}</h3>
                  <Delivery deliveryTimeline={product.delivery_timeline} />

                  <div className="mt-2 text-lg font-medium text-gray-900 flex justify-between items-center">
                    <span>₹{product.price_per_unit}</span>
                    <span className="text-sm text-gray-500">
                      {product.subUnitPrice}/{product.unit}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    inclusive of all taxes
                  </p>

                  <button
                    onClick={() => handleButtonClick(product)}
                    className="mt-4 w-full bg-[#e74c3c] text-white py-2 rounded-md text-sm font-medium hover:bg-[#c0392b] transition-colors duration-300"
                  >
                    {cartItems.find((item) => item.id === product.id)
                      ? "Go to Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchScreen;
