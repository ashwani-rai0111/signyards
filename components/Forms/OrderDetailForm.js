import React, { useState, useEffect } from "react";
import SkeletonLoaderDelivery from "@/components/Loaders/SkeletonLoaderDelivery";
import { FaTrashAlt } from "react-icons/fa"; // Import delete icon

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
    id:""
  });
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [existingAddresses, setExistingAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [formError, setFormError] = useState("");


  // Fetch existing addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      const phoneNumber = localStorage.getItem("phoneNumber") 
if(phoneNumber){
  console.log(phoneNumber);
  setLoadingAddress(true); // Show loader while fetching addresses

      try {
        const response = await fetch("https://signyards.in/address.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phoneNumber, // Replace with the actual phone number
            type: "getAddress",
          }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }
    
        const data = await response.json();
    
        if (data.status === "success") {
          // Successfully fetched addresses
          if (data.addresses.length > 0) {
            // If addresses are found, update the state
            setExistingAddresses(data.addresses);
          } else {
            // If no addresses are found, open the "Add New Address" form
            setAddingNewAddress(true);
          }

          
        } else {
          // Handle error response from the server
          console.error("Error fetching addresses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoadingAddress(false); // Hide loader after fetching addresses
      }
    }
    };
    

    fetchAddresses();
  }, []);

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

  const handleAddressSelect = (address) => {
    setSelectedAddressId(address.id);
    setFormData({
      ...formData,
      id:address.id,
      name: address.name,
      type: "website",
      addressLine1: address.addressLine1,
      city: address.city,
      landmark: address.landmark,
      phone: address.phone,
      gstNumber: address.gstNumber || "",
    });
    setAddingNewAddress(false);
  };

  // Delete address function
  const handleDeleteAddress = async (addressId) => {
    const phoneNumber = localStorage.getItem("phoneNumber") 
    if(phoneNumber){
          try {
      const response = await fetch(`https://signyards.in/address.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address_id: addressId,
          type: "deleteAddress",
          phone:phoneNumber
         }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the address.");
      }

      // Update the existing addresses after deletion
      setExistingAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== addressId)
      );
    } catch (error) {
      console.error("Error deleting address:", error.message);
    }
  }
  };

  const handleBuyClick = () => {
    if (selectedAddressId === null && !addingNewAddress) {
      setFormError("An address must be selected or added before proceeding.");
      return;
    }

    if (validateForm()) {
      // Proceed with the purchase
      // console.log(formData);
    }
  };

  return (
    <div className="space-y-4">
      {/* Show loader while fetching addresses */}
      {loadingAddress ? (
        <SkeletonLoaderDelivery />
      ) : (
        <>
          {/* Form to add a new address (above existing addresses) */}
          <div className="mb-6">
          {formError && (
              <p className="text-red-500 text-center mb-4">{formError}</p>
            )}
            <div className="mb-9 flex">
              <button
                type="button"
                className="justify-left w-full border border-gray-300 rounded-full px-6 py-2 text-green-500 hover:bg-gray-200 transition duration-300"
                onClick={() => {
                  setAddingNewAddress(!addingNewAddress);
                  setFormData({
                    name: "",
                    phone: "",
                    type: "website",
                    addressLine1: "",
                    landmark: "",
                    city: "",
                    gstNumber: "",
                    id: "", // Reset the id when adding a new address
                  });
                  setSelectedAddressId(null); // Deselect any existing address
                }}
              >
                {addingNewAddress ? "Cancel" : "Add New Address +"}
              </button>
            </div>

            {addingNewAddress && (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 border p-4 rounded-lg shadow-md bg-white"
              >
                {/* Form Fields */}
                {/* Name Field */}
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

                {/* Phone Field */}
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

                {/* Address Line 1 Field */}
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.addressLine1}
                    </p>
                  )}
                </div>

                {/* Landmark and City Fields */}
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

                {/* GST Number Field */}
                <div className="mb-2">
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="GST Number (optional)"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className={`px-4 py-2 border rounded-md w-full text-sm border-gray-300`}
                  />
                </div>        
              </form>
            )}
          </div>

          {/* Existing Addresses */}
          {existingAddresses.map((address) => (
          <div key={address.id} className="border border-gray-300 rounded-lg p-4 space-y-4">
            <h3 className="text-xl font-bold mb-4">Existing Addresses</h3>

              <div
                className={`relative p-4 border rounded-md cursor-pointer transition-transform duration-200 transform hover:scale-105 ${
                  selectedAddressId === address.id
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300"
                }`}
                onClick={() => handleAddressSelect(address)}
              >
                {/* Address Info */}
                <div className="space-y-2">
                  <p className="font-semibold">{address.name}</p>
                  <p>{address.addressLine1}</p>
                  <p>{address.city}</p>
                  <p>{address.landmark}</p>
                  <p>{address.phone}</p>
                  <p>{address.gstNumber && `GST: ${address.gstNumber}`}</p>
                </div>

                {/* Delete Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the select action
                    handleDeleteAddress(address.id);
                  }}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
  
          </div>
                      ))}

        </>
      )}

                       {/* Buy Button */}
                       <div className="flex justify-center mt-6">
          <form
                onSubmit={handleSubmit}
                className="w-full"
              >
            <button
              onClick={handleBuyClick}
              className="w-full text-white bg-red-500 hover:bg-green-600 font-medium rounded-lg px-5 py-2.5 text-center"
            >
              Buy
            </button>
            </form>
          </div>
    </div>
  );
};

export default OrderDetailForm;
