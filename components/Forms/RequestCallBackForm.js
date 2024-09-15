import React, { useState } from "react";

const states = ["Delhi NCR", "Haryana"];
const cities = {
  "Delhi NCR": ["Delhi"],
  Haryana: ["Gurugram"],
};

const RequestCallBackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    type: "service",
  });
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));

    if (name === "state") {
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    ["name", "city", "state", "phone"].forEach((field) => {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const orderData = await onSubmit(formData);
      setOrderData(orderData);
      setIsSubmitted(true); // Set isSubmitted to true upon successful form submission
    }
  };

  return (
    <div className="mt-4">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full rounded-md py-2">
          {["name", "phone"].map((field) => (
            <div key={field} className="w-full mb-2">
              <input
                type="text"
                name={field}
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")
                }
                value={formData[field]}
                onChange={handleInputChange}
                className={`px-2 py-1 border rounded-md w-full text-sm ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field] && (
                <p className="text-red-500 text-xs">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="w-full mb-2">
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className={`px-2 py-1 border rounded-md w-full text-sm ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-xs">{errors.state}</p>
            )}
          </div>
          <div className="w-full mb-2">
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={!formData.state}
              className={`px-2 py-1 border rounded-md w-full text-sm ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select City</option>
              {formData.state &&
                cities[formData.state].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[#e74c3c] py-1 text-white text-sm hover:bg-[#e74c3c]"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-4">
          <h2 className="text-lg text-green-400">
            OUR COSTUMER EXCUTIVE CALL YOU SOON..
          </h2>
        </div>
      )}
    </div>
  );
};

export default RequestCallBackForm;
