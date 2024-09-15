import React, { useState } from "react";
import { useRouter } from "next/router";
import Delivery from "./reusables/delivery";

const OrderSummary = ({
  orderProducts = [],
  formData,
  totalValue,
  onConfirmOrder,
  isSubmitting,
}) => {
  const router = useRouter();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Ensure that all price values are numbers
  const parsePrice = (price) => Number(price) || 0;

  // Calculate total price including GST
  const totalPriceIncludingGST = orderProducts.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  // Calculate GST portion (18% of the base price)
  const gstRate = 18;
  const basePrice = totalPriceIncludingGST / (1 + gstRate / 100);
  const gstAmount = totalPriceIncludingGST - basePrice;

  const handleConfirm = async () => {
    try {
      await onConfirmOrder();
      setOrderConfirmed(true);

      // Redirect to the OrderSuccess page with only the customer's name
      router.push({
        pathname: "/OrderSuccess",
        query: {
          customerName: formData.name, // Only sending the name of the customer
        },
      });
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#eaeaea] flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-full overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Order Summary</h2>

        {/* Product List */}
        <div className="space-y-4">
          {orderProducts.length > 0 ? (
            orderProducts.map((item, index) => {
              const unitPrice = parsePrice(item.totalPrice) / item.quantity;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center"
                >
                  <img
                    src={
                      item.product.image_urls &&
                      item.product.image_urls.length > 0
                        ? item.product.image_urls[0]
                        : "/placeholder.png"
                    }
                    alt={item.product.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md mb-2 sm:mb-0 sm:mr-4"
                  />

                  <div className="text-center sm:text-left">
                    <p className="text-sm sm:text-lg font-medium">
                      {item.product.name}
                    </p>
                    <p className="text-xs sm:text-base">
                      Quantity: {item.quantity} | Price per unit: ₹
                      {unitPrice.toFixed(2)} | Total: ₹
                      {item.totalPrice.toFixed(2)}
                    </p>
                    <Delivery deliveryTimeline={item.delivery_timeline} />

                    {/* Offer Details */}
                    {item.offers && item.offers.length > 0 && (
                      <div className="mt-2 p-2 border border-gray-300 rounded-md bg-gray-100">
                        <h4 className="text-sm font-semibold">
                          Applied Offers:
                        </h4>
                        <ul className="list-disc ml-5 text-xs">
                          {item.offers.map((offer, index) => (
                            <li key={index}>
                              {offer.quantity} units for ₹{offer.price} - Save{" "}
                              {offer.percent}%
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No order data available.</p>
          )}
        </div>

        {/* Customer Information */}
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="text-lg sm:text-xl font-bold">Customer Information</h3>
          <p className="text-sm sm:text-base">Name: {formData.name}</p>
          <p className="text-sm sm:text-base">
            Address: {formData.addressLine1}, {formData.addressLine2}
          </p>
          <p className="text-sm sm:text-base">City: {formData.city}</p>
          <p className="text-sm sm:text-base">Phone: {formData.phone}</p>
          <p className="text-sm sm:text-base">
            GST Number: {formData.gstNumber}
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="text-lg sm:text-xl font-bold">Price Breakdown</h3>
          <p className="text-sm sm:text-base">
            Base Price (excluding GST): ₹{basePrice.toFixed(2)}
          </p>
          <p className="text-sm sm:text-base">
            GST (18%): ₹{gstAmount.toFixed(2)}
          </p>
        </div>

        {/* Total Order Value */}
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="text-lg sm:text-xl font-bold">Total Order Value</h3>
          <p className="text-sm sm:text-lg font-medium">
            ₹{totalValue.toFixed(2)}
          </p>
        </div>

        {/* Confirm Order Button */}
        <button
          onClick={handleConfirm}
          className="mt-4 px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg shadow-md w-full text-sm sm:text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Confirm Order"}
        </button>
      </div>
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-lg flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Processing your order...
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
