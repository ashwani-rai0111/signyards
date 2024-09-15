import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "../context/Cartcontext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LoaderProduct from "../Loaders/SkeletonLoaderProduct";
import Delivery from "../reusables/delivery";

const Products = ({ products = [] }) => {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const handleButtonClick = (product) => {
    const isInCart = cartItems.find((item) => item.id === product.id);
    if (isInCart) {
      router.push("/cart");
    } else {
      addToCart(product.id);
      console.log(`Product with ID ${product.id} added to cart`);
    }
  };

  const handleProductRedirect = (product) => {
    router.push({
      pathname: `/products/${product.id}`,
      query: { data: JSON.stringify(product) },
    });
  };

  const handleProductScreen = () => {
    router.push("/productScreen");
  };

  // Filter only products with type "Product"
  const filteredProducts = products.filter(
    (product) => product.type === "Product"
  );

  // Sort products so that "hotSelling" products come first
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (a.hotSelling === "Yes" && b.hotSelling !== "Yes") return -1;
    if (a.hotSelling !== "Yes" && b.hotSelling === "Yes") return 1;
    return 0;
  });

  // Displayed products based on the state, limited to 4 products
  const displayedProducts = showAllProducts
    ? sortedProducts
    : sortedProducts.slice(0, 4);

  if (loading) {
    return (
      <div
        id="products"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8"
      >
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <LoaderProduct key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="relative sm:w-full bg-[#eaeaea]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group block bg-white p-4"
            >
              <Link legacyBehavior href={`/products/${product.id}`} passHref>
                <a className="block">
                  <div className="relative aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
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
                    </div>
                  </div>

                  {product.hotSelling === "Yes" && (
                    <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Hot Selling
                    </div>
                  )}

                  <h3 className="text-sm font-medium text-gray-900 mt-2 line-clamp-2">
                    {product.title}
                  </h3>

                  <Delivery deliveryTimeline={product.delivery_timeline} />

                  <div className="mt-2 text-lg font-medium text-gray-900 flex justify-between items-center">
                    <span>₹{product.price_per_unit}</span>
                    {product.subUnitPrice && product.unit ? (
                      <span className="text-sm text-gray-500">
                        {product.subUnitPrice}/{product.unit}
                      </span>
                    ) : null}
                  </div>

                  <p className="text-xs text-gray-500">
                    inclusive of all taxes
                  </p>
                </a>
              </Link>
              <button
                onClick={() => handleButtonClick(product)}
                className="mt-4 w-full bg-[#e74c3c] text-white py-2 rounded-md text-sm font-medium hover:bg-bg-[#e74c3c] transition-colors duration-300"
              >
                {cartItems.find((item) => item.id === product.id)
                  ? "Go to Cart"
                  : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
        {!showAllProducts && sortedProducts.length > 0 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleProductScreen}
              className="flex items-center px-4 py-2 text-black text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e74c3c]"
            >
              More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
