import { useEffect, useState } from "react";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    console.log("Stored phone number:", storedPhoneNumber); // Log the phone number
    setPhoneNumber(storedPhoneNumber);
  }, []);

  useEffect(() => {
    if (!phoneNumber) {
      setLoading(false); // Stop loading if there's no phone number
      return;
    }

    const fetchOrderHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://signyards.in/orderHistory.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phoneNumber,
            type: "orderHistory",
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log the response

        const sortedOrders = (data.orders || []).sort(
          (a, b) => new Date(b.order_date) - new Date(a.order_date)
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setError("Failed to load order history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [phoneNumber]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <ul className="space-y-4">
        {orders.length === 0 ? (
          <li>No orders found</li>
        ) : (
          orders.map((order) => (
            <div key={order.order_id} className="border p-4 rounded-md">
              <h2 className="text-lg font-semibold">
                Order ID: {order.order_id}
              </h2>
              <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
              <p>Total Amount: ${order.total_amount}</p>

              <div className="mt-4">
                {order.line_items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 border-t pt-2"
                  >
                    <img
                      src={item.product_image}
                      alt={item.productName}
                      className="w-24 h-24 object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.productName}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default OrderHistoryPage;
