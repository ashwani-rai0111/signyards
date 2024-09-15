import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CustomSignageForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    description: "",

    type: type,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  console.log(type);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    let newErrors = {};
    ["name", "phone", "city", "description"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${
          field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
        } is required`;
      }
    });

    if (
      formData.pincode &&
      (formData.pincode.length !== 6 || isNaN(Number(formData.pincode)))
    ) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }
    if (
      formData.phone &&
      (formData.phone.length !== 10 || isNaN(Number(formData.phone)))
    ) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const sendFormData = async (data) => {
    try {
      const response = await fetch(
        "https://signyards.in/getCustomSignageData.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text();
      if (text.trim() === "") {
        console.log("Empty response received");
        return; // Exit the function if the response is empty
      }

      const jsonData = JSON.parse(text);
      console.log("Form submitted successfully:", jsonData);
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const token = localStorage.getItem("accessToken");
      const updatedFormData = { ...formData, type };
      if (token) {
        sendFormData(updatedFormData);
        setSubmitted(true);
      } else {
        localStorage.setItem("formData", JSON.stringify(updatedFormData));
        router.push("/Authent");
      }
    }
  };

  return (
    <div className="w-full rounded-md py-2">
      {submitted ? (
        <p className="text-green-500 text-lg">
          Our customer executive will connect shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          {["name", "phone", "city", "description"].map((field) => (
            <div key={field} className="w-full mb-4">
              <input
                type="text"
                name={field}
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")
                }
                value={formData[field]}
                onChange={handleInputChange}
                className={`px-4 py-2 border rounded-md w-full ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full rounded-md bg-[#e74c3c] py-2 text-white hover:bg-indigo-500"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CustomSignageForm;
