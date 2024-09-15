import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import CustomSignageForm from "../Forms/CustomSignageForm";
import Authent from "@/pages/Authent";

const HeroSection = ({ isAuthenticated, onAuthComplete }) => {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const actionAfterAuth = useRef(null);
  const router = useRouter();

  const handleFormSubmit = (formData) => {
    console.log("Form data:", formData);
    setFormSubmitted(true); // Indicate submission was successful
    setShowForm(false); // Hide the form after submission
    // Further processing can be done here
  };

  const handlePartnerClick = () => {
    router.push("/partner");
  };

  const handleMarketplaceClick = () => {
    router.push("/productScreen");
  };

  const handleAuthComplete = () => {
    setShowAuthPopup(false);
    onAuthComplete(); // Callback to update authentication state in parent component

    if (actionAfterAuth.current === "customSignage") {
      setShowForm(true);
    } else if (actionAfterAuth.current === "marketplace") {
      router.push("/products");
    }

    actionAfterAuth.current = null; // Reset the action
  };

  return (
    <div className="bg-[#eaeaea] relative isolate px-6 lg:px-8 mt-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-38 lg:py-32">
        {/* {showAuthPopup && <Authent onAuthComplete={handleAuthComplete} />} */}

        <div className="text-center">
          <h1
            className="text-6xl mt-20 font-bold tracking-tight"
            style={{ color: "gray" }}
          >
            Buy ACP & HPL sheets online
          </h1>

          {/* <p className="mt-6 text-lg leading-8 text-gray-600">
            Attractive signs (both digital & static) are memorable and cause an
            emotional reaction in customers. Customers use these graphics to
            decide whether a shop is the right fit for them before ever walking
            through the door.
          </p> */}
          {!formSubmitted && (
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={handlePartnerClick}
                className="rounded-md bg-[#e74c3c] px-3.5 py-2.5 text-sm text-[#eaeaea] font-semibold  shadow-sm hover:bg-[#c0392b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e74c3c]"
              >
                SELL ON MARKETPLACE
              </button>

              <button
                onClick={handleMarketplaceClick}
                className="rounded-md bg-[#e74c3c] px-3.5 py-2.5 text-sm font-semibold text-[#eaeaea] shadow-sm hover:bg-[#c0392b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e74c3c]"
              >
                BUY ON MARKETPLACE
              </button>
            </div>
          )}

          {showForm && <CustomSignageForm onSubmit={handleFormSubmit} />}
          {formSubmitted && (
            <div className="mt-6 text-lg" style={{ color: "#e74c3c" }}>
              Thank you for showing interest. Our customer executive will
              connect with you shortly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
