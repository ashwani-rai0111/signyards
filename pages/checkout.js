import React, { useState, useEffect } from "react";
import { useCart } from "../components/context/Cartcontext";
import OrderDetailForm from "../components/Forms/OrderDetailForm";
import SkeletonLoaderCart from "@/components/Loaders/SkeletonLoaderCart";
import { useRouter } from "next/router"; // Import for redirection
import Spinner from "./Spinner";
import Header from "./Header";


const placeholderImage = "https://via.placeholder.com/150";

const Checkout = () => {
  const {
    cartItems,
    loadingCartItems,
    clearCart,

  } = useCart();
  const [productsData, setProductsData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
            router.push("/cart"); // If no items in cart, redirect to cart
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

  const handleSubmitOrder = (formData) => {

   


    const orderProducts = cartItems.map((item) => {
      const product = productsData.find((p) => p.id === item.id);

      let totalPrice = 0;
      let appliedOffers = [];
      if (product) {
        totalPrice = calculateTotalPrice(item, product);

        if (product.offer_pricing && product.offer_pricing.length > 0) {
          appliedOffers = product.offer_pricing
            .filter((offer) => item.quantity >= offer.quantity)
            .map((offer) => ({
              quantity: offer.quantity,
              price: offer.price,
              percent: offer.percent,
            }));
        }
      }

      return {
        product: product || {
          id: item.id,
          name: "Unknown Product",
          price: 0,
          imageSrc: placeholderImage,
        },
        quantity: item.quantity,
        totalPrice: totalPrice,
        delivery_timeline: product ? product.delivery_timeline : null,
        offers: appliedOffers,
      };
    });

    // console.log(formData);
    // console.log(orderProducts);
    // console.log(totalValue);
    handleConfirmOrder(formData,orderProducts,totalValue)
  };

  const handleConfirmOrder = async (formData,orderData,totalValue) => {
    const phoneNumber = localStorage.getItem("phoneNumber") 

    setIsSubmitting(true);
    try {
      const response = await fetch("https://signyards.in/getOrder.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          orderData,
          totalValue,
          phoneNumber
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      router.push("/OrderSuccess");
    //   console.log("Order confirmed successfully:", result);

    //   clearCart();
    } catch (error) {
      console.error("Error confirming order:", error.message);
    } finally {
        
      setIsSubmitting(false);
    }
  };

  return (
    <div >
        {isSubmitting && <Spinner />}

        <Header />
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        {/* <h1 className="text-2xl font-bold mb-8 text-red-500">Checkout</h1> */}
        
        {/* Flex container for two sections */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left section: Delivery address */}
          <div className="w-full lg:w-1/2 bg-white p-4">
            <h2 className="text-xl font-semibold mb-4 rounded-lg">Delivery</h2>

            <OrderDetailForm onSubmit={handleSubmitOrder} />
          </div>
  
          {/* Right section: Product summary */}
          <div className="w-full lg:w-1/2 rounded-lg">
            {loadingProducts ? (
              <>
                <SkeletonLoaderCart />
                <SkeletonLoaderCart />
              </>
            ) : errorProducts ? (
              <div>Error: {errorProducts}</div>
            ) : cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => {
                  const product = productsData.find((p) => p.id === item.id);
  
                  // Safety check if product is undefined
                  if (!product) {
                    return (
                      <div key={item.id} className="text-red-500">
                <SkeletonLoaderCart />
                </div>
                    );
                  }
  
                  const imageToDisplay = product.image_urls?.[0] || placeholderImage;
                  const totalPrice = product.price_per_unit 
                    ? calculateTotalPrice(item, product)
                    : 0; // Ensure totalPrice is set to 0 if price_per_unit is undefined
  
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={imageToDisplay}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <div className="text-sm">{product.title}</div>
                          <div className="text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">
                        ₹{totalPrice.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
  
                {/* Total price */}
                {cartItems.length > 0 && (
                  <div className="mt-8 text-right">
                    <h2 className="text-xl font-bold">
                      Total: ₹{totalValue.toFixed(2)}
                    </h2>
                    <p className="text-sm text-gray-500">(Inclusive of all taxes)</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-700">
                     <SkeletonLoaderCart />
                     <SkeletonLoaderCart />
                {/* No items in the cart. */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
  
};

export default Checkout;
