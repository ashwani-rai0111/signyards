import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../../components/context/Cartcontext";
import ProductScreen from "../productScreen";
import SkeletonLoaderDetailScreen from "@/components/Loaders/SkeletonLoaderDetailScreen";
import Delivery from "@/components/reusables/delivery";
const GST_RATE = 0.18; // GST rate is 18%

const ProductDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  const { cartItems, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainImageRef = useRef(null);
  const magnifierRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    if (id) {
      const requestData = {
        product: {
          id: id,
        },
      };

      fetch("https://signyards.in/getProductById.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        signal: signal,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          if (isMounted) {
            if (Array.isArray(data) && data.length > 0) {
              setProduct(data[0]);
            } else {
              throw new Error("Product not found in fetched data");
            }
            setLoading(false);
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error("Error fetching product data:", error);
            setError(`Error fetching product data: ${error.message}`);
            setLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  const handleButtonClick = (product) => {
    const isInCart = cartItems.find((item) => item.id === product.id);
    if (isInCart) {
      router.push("/cart");
    } else {
      addToCart(product.id);
      console.log(`Product with ID ${product.id} added to cart`);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = mainImageRef.current;
    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;
    magnifierRef.current.style.backgroundPosition = `${x}% ${y}%`;
    magnifierRef.current.style.left = `${
      offsetX - magnifierRef.current.offsetWidth / 2
    }px`;
    magnifierRef.current.style.top = `${
      offsetY - magnifierRef.current.offsetHeight / 2
    }px`;
  };

  const handleMouseEnter = () => {
    magnifierRef.current.style.display = "block";
  };

  const handleMouseLeave = () => {
    magnifierRef.current.style.display = "none";
  };

  if (loading) {
    return <SkeletonLoaderDetailScreen />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const hasSpecifications = [
    product.brand,
    product.color,
    product.item_weight,
    product.thickness,
    product.material,
    product.pattern,
    product.size,
  ].some((spec) => spec);

  // Convert price to number and handle potential invalid values

  const gstRate = 18; // GST rate is 18%

  // Convert price to number and handle potential invalid values
  const totalPriceIncludingGST = parseFloat(product.price_per_unit) || 0;
  const basePrice = totalPriceIncludingGST / (1 + gstRate / 100); // Calculate base price excluding GST
  const gstAmount = totalPriceIncludingGST - basePrice; // GST is the difference between total price and base price

  return (
    <div className=" py-32 mt-4 mx-auto p-4 bg-[#eaeaea]">
      <div className="flex flex-col md:flex-row p-4 shadow-lg rounded-lg bg-white">
        <div className="w-full md:w-1/2 p-4">
          {product.image_urls && product.image_urls.length > 0 ? (
            <>
              <div
                className="main-image-container mb-4 relative"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={mainImageRef}
              >
                <img
                  src={product.image_urls[currentImageIndex]}
                  alt={product.title}
                  className="main-image w-full h-96 object-contain rounded-lg shadow-md"
                />

                <div
                  ref={magnifierRef}
                  className="magnifier hidden absolute w-40 h-40 rounded-full border-2 border-gray-400 bg-no-repeat bg-contain pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.image_urls[currentImageIndex]})`,
                  }}
                ></div>
              </div>
              <div className="thumbnail-container flex justify-center mt-4 space-x-2">
                {product.image_urls.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className={`thumbnail w-20 h-20 object-cover rounded-md cursor-pointer border ${
                      currentImageIndex === index
                        ? "border-indigo-600"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div>No images available</div>
          )}
        </div>
        <div className="flex-grow md:w-1/2 md:pl-8 p-4">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-800 mb-4">
            Base Price: ₹{basePrice.toFixed(2)}
            <br />
            <div className="text-green-700">
              GST (18%): ₹{gstAmount.toFixed(2)}
            </div>
            <br />
            Total Price: ₹{totalPriceIncludingGST.toFixed(2)}
          </p>
          <span className="text-sm text-gray-500">
            {product.subUnitPrice}/{product.unit}
          </span>
          {product.offer_pricing && product.offer_pricing.length > 0 && (
            <div className="mt-4 p-6 bg-white rounded-lg shadow-md mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Available Offers:
              </h3>
              <ul className="space-y-4">
                {product.offer_pricing.map((offer) => (
                  <li
                    key={offer.id}
                    className="flex justify-between items-center bg-blue-200 p-4 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-gray-700">
                        {offer.quantity} units for ₹{offer.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        Save {offer.percent}%
                      </span>
                    </div>
                    <div className="bg-green-100 text-green-800 font-semibold py-1 px-3 rounded-full text-sm shadow-inner">
                      {offer.percent}% OFF
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Delivery deliveryTimeline={product.delivery_timeline} />

          <button
            onClick={() => handleButtonClick(product)}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
          >
            {cartItems.find((item) => item.id === product.id)
              ? "Go to Cart"
              : "Add to Cart"}
          </button>
          <hr className="my-4" />
          <div className="mt-4 text-sm text-gray-700">
            <div>
              <h3 className="font-medium">Description</h3>
              <p
                className={`mb-2 ${showFullDescription ? "" : "line-clamp-3"}`}
                dangerouslySetInnerHTML={{
                  __html: product.description.replace(/\r\n|\n/g, "<br />"),
                }}
              ></p>

              <button
                onClick={toggleDescription}
                className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
              >
                {showFullDescription ? "Show less" : "Show more"}
              </button>
              <hr className="my-4" />
            </div>
            {hasSpecifications && (
              <>
                <h2 className="font-medium text-2xl mb-2">Specification</h2>

                {product.brand && product.brand !== "NA" && (
                  <p className="mb-2">Brand: {product.brand}</p>
                )}
                {product.color && product.color !== "NA" && (
                  <p className="mb-2">Color: {product.color}</p>
                )}
                {product.item_weight && product.item_weight !== "NA" && (
                  <p className="mb-2">Weight: {product.item_weight}</p>
                )}
                {product.thickness && product.thickness !== "NA" && (
                  <p className="mb-2">Thickness: {product.thickness}</p>
                )}
                {product.coil_thickness && product.coil_thickness !== "NA" && (
                  <p className="mb-2">
                    Coil Thickness: {product.coil_thickness}
                  </p>
                )}
                {product.series_type && product.series_type !== "NA" && (
                  <p className="mb-2">Series Type: {product.series_type}</p>
                )}
                {product.series_name && product.series_name !== "NA" && (
                  <p className="mb-2">Series Name: {product.series_name}</p>
                )}
                {product.application && product.application !== "NA" && (
                  <p className="mb-2">Application: {product.application}</p>
                )}
                {product.warranty && product.warranty !== "NA" && (
                  <p className="mb-2">Warranty: {product.warranty}</p>
                )}
                {product.material && product.material !== "NA" && (
                  <p className="mb-2">Material: {product.material}</p>
                )}
                {product.pattern && product.pattern !== "NA" && (
                  <p className="mb-2">Pattern: {product.pattern}</p>
                )}
                {product.size && product.size !== "NA" && (
                  <p className="mb-2">Size: {product.size}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ProductScreen />
    </div>
  );
};

export default ProductDetail;
