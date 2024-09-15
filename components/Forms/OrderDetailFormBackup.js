import React, { useState } from "react";

const cities = {
  "Delhi NCR": ["Delhi"],
  Haryana: ["Gurugram"],
};

const OrderDetailForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "website",
    addressLine1: "",
    city: "",
    landmark: "",
    phone: "",
    gstNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    let newErrors = {};
    ["name", "addressLine1", "city", "phone"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${
          field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
        } is required`;
      }
    });

    if (
      formData.phone &&
      (formData.phone.length !== 10 || isNaN(Number(formData.phone)))
    ) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
    if (formData.gstNumber && !gstRegex.test(formData.gstNumber)) {
      newErrors.gstNumber = "Invalid GST number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const orderData = await onSubmit(formData);
      setOrderData(orderData);
    }
  };

  return (
    <div className="mt-4 p-4 rounded-lg  w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Delivery Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`px-4 py-2 border rounded-md w-full text-sm ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className={`px-4 py-2 border rounded-md w-full text-sm ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
      
        <div className="mb-2">
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            className={`px-4 py-2 border rounded-md w-full text-sm ${
              errors.addressLine1 ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-2">
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-md w-full text-sm border-gray-300"
            />
          </div>
          <div className="mb-2">
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`px-4 py-2 border rounded-md w-full text-sm ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select City</option>
              {Object.keys(cities).map((state) =>
                cities[state].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))
              )}
            </select>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number (optional)"
            value={formData.gstNumber}
            onChange={handleInputChange}
            className={`px-4 py-2 border rounded-md w-full text-sm ${
              errors.gstNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.gstNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.gstNumber}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[#e74c3c] py-2 text-white text-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          BUY
        </button>
      </form>
      {orderData && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Order Summary
          </h3>
          <div className="text-sm text-gray-600">
            <p>
              <strong>Product Name:</strong> {orderData.productName}
            </p>
            <p>
              <strong>Order Price:</strong> ₹{orderData.orderPrice}
            </p>
            <p className="mt-4">
              <strong>Customer Information:</strong>
            </p>
            <p>
              <strong>Name:</strong> {orderData.customerName}
            </p>
            <p>
              <strong>Address:</strong> {orderData.addressLine1},{" "}
              {orderData.landmark}, {orderData.city}
            </p>
            <p>
              <strong>Phone:</strong> {orderData.phone}
            </p>
            {orderData.gstNumber && (
              <p>
                <strong>GST Number:</strong> {orderData.gstNumber}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailForm;
