import React, { usecontext,useState, useEffect } from "react";
import { useCart } from "../components/context/Cartcontext";
import { useRouter } from "next/router"; // Import for redirection
import SkeletonLoaderCart from "@/components/Loaders/SkeletonLoaderCart";
import Header from "./Header";

const placeholderImage = "https://via.placeholder.com/150";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    loadingCartItems,
    fetchCart
  } = useCart();
  
  const [productsData, setProductsData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [showOffers, setShowOffers] = useState(null); // State to track the visible offers

  const router = useRouter(); // Router for navigation

  useEffect(() => {
    const fetchProductById = async (id) => {
      const requestData = {
        product: {
          id: id,
        },
      };

      try {
        const response = await fetch(
          "https://signyards.in/getProductById.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch product with ID ${id}`);
        }

        const data = await response.json();
        return data[0];
      } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error.message);
        return {
          id: id,
          title: "Unknown Product",
          price_per_unit: 0,
          imageBase64: [],
          description: "",
        };
      }
    };

    const fetchProductsData = async () => {
      if (!loadingCartItems) {  // Check if cart items are still loading
        if (cartItems.length > 0) {
          const promises = cartItems.map((item) => fetchProductById(item.id));
          try {
            const products = await Promise.all(promises);
            setProductsData(products);
            setLoadingProducts(false);
          } catch (error) {
            console.error("Error fetching product details:", error);
            setErrorProducts(error.message);
            setLoadingProducts(false);
          }
        } else {
          // router.push("/cart"); // If no items in cart, redirect to cart
          setLoadingProducts(false);
          setProductsData([]);

        }
      }
    };

    if (!loadingCartItems) {
      fetchProductsData();
    }


        

  }, [cartItems,loadingCartItems]);

  const calculateTotalPrice = (item, product) => {
    let totalPrice = Number(product.price_per_unit) * item.quantity;
    let bestOffer = null;

    if (product.offer_pricing && product.offer_pricing.length > 0) {
      const sortedOffers = product.offer_pricing.sort(
        (a, b) => b.quantity - a.quantity
      );

      bestOffer = sortedOffers.find((offer) => item.quantity >= offer.quantity);

      if (bestOffer) {
        totalPrice = bestOffer.price * item.quantity;
      }
    }

    return totalPrice;
  };

  const totalValue = cartItems.reduce((acc, item) => {
    const product = productsData.find((p) => p.id === item.id);

    if (product) {
      const totalPriceForItem = calculateTotalPrice(item, product);
      return acc + totalPriceForItem;
    }

    return acc;
  }, 0);

  

  const handlePlaceOrder = () => {
    // Redirect to the checkout page, pass cart items and product details
    router.push({
      pathname: "/checkout",
      // query: { cartItems: JSON.stringify(cartItems) },
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
            <Header />
<br></br>
      <div className="container mx-auto p-2">
        <h1 className="text-4xl font-bold mb-8 text-red-500 text-center"> Your Cart</h1>
        
        <div className="flex flex-col space-y-4">
          {loadingProducts ? (
            <>
              <SkeletonLoaderCart />
              <SkeletonLoaderCart />
            </>
          ) : errorProducts ? (
            <div>Error: {errorProducts}</div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => {
              const product = productsData.find((p) => p.id === item.id);
              const imageToDisplay =
                product && product.image_urls && product.image_urls.length > 0
                  ? product.image_urls[0]
                  : placeholderImage;
                  if (product) {
              const totalPrice = calculateTotalPrice(item, product);
                

              return (
                <div
                  key={item.id}
                  className=" items-center justify-between bg-white p-4 rounded-lg"
                >
  <div className="flex items-center justify-between space-x-4">
  <img
    src={imageToDisplay}
    alt={product.title}
    className="w-20 h-20 object-cover rounded-md small-screen-img"
  />
  
  <div className="flex flex-col flex-grow">
    <div className="text-base sm:text-lg font-medium small-screen-text">
      {product.title}
    </div>
    <div className="flex items-center mt-2 space-x-3">
      <button
        onClick={() => decreaseQuantity(item.id)}
        className="px-3 py-1 bg-gray-200 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-300 small-screen-button"
      >
        -
      </button>
      <span className="mx-2 text-base sm:text-lg small-screen-text">
        {item.quantity}
      </span>
      <button
        onClick={() => increaseQuantity(item.id)}
        className="px-3 py-1 bg-gray-200 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-300 small-screen-button"
      >
        +
      </button>
      <button
        onClick={() => removeFromCart(item.id)}
        className="px-3 py-1 bg-red-500 text-white border border-red-400 rounded-md hover:bg-red-600 transition duration-300 small-screen-button"
      >
        Delete
      </button>
    </div>
  </div>

  <div className="text-right text-base sm:text-lg font-medium text-gray-700 small-screen-text">
    ₹{totalPrice.toFixed(2)}
  </div>
</div>
{product.offer_pricing && product.offer_pricing.length > 0 && (
  <div className="relative">
    <button
      onClick={() =>
        setShowOffers(showOffers === item.id ? null : item.id) // Toggle on and off
      }
      className="text-blue-500"
    >
      {showOffers === item.id ? "Hide Offers" : "View Offers"} {/* Toggle button text */}
    </button>
    {showOffers === item.id && (
      <div className="absolute top-full left-0 mt-1 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Available Offers:
        </h3>
        <ul className="space-y-4">
          {product.offer_pricing.map((offer) => {
            const isOfferApplicable = item.quantity >= offer.quantity;
            return (
              <li
                key={offer.id}
                className={`flex flex-col sm:flex-row justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm ${
                  isOfferApplicable ? "bg-blue-200" : "bg-yellow-200"
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-700">
                    {offer.quantity} units for ₹{offer.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    Save {offer.percent}%
                  </span>
                  {!isOfferApplicable && (
                    <span className="text-sm text-red-500">
                      Add {offer.quantity - item.quantity} more item(s) to get this offer
                    </span>
                  )}
                </div>
                <div
                  className={`font-semibold py-1 px-3 rounded-full text-sm shadow-inner mt-2 sm:mt-0 ${
                    isOfferApplicable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {offer.percent}% OFF
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )}
  </div>
)}


                    
                </div>
                
              );
            }
            })
          ) : (
            <div className="text-center text-gray-700">Your cart is empty.</div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="mt-8 flex justify-between items-center">
          <div className="text-right w-full">
    <h2 className="text-xl font-bold">
      Total: ₹{totalValue.toFixed(2)}
    </h2>
    <div>(Inclusive of all taxes)</div>
    <br></br>
    <button
              onClick={handlePlaceOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              Place Order
            </button>
  </div>
        
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
