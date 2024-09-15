import { useState, useEffect } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RequestCallBackForm from "@/components/Forms/RequestCallBackForm";
import { FaTimes } from "react-icons/fa";

const SkeletonLoader = () => (
  <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse">
      <div className="aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
        <div className="w-full h-64 bg-slate-100"></div>
      </div>
      <div className="mt-4">
        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
        <div className="h-4 bg-slate-100 rounded w-1/4 mt-2"></div>
      </div>
      <div className="mt-2">
        <div className="h-8 bg-slate-100 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const ServiceSection = ({ services, showMoreButton = true }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (services.length > 0) {
      setLoading(false);
    }
  }, [services]);

  const ProductModal = ({ product, onClose, onSubmit }) => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full md:max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <FaTimes className="h-6 w-6" />
          </button>

          <div className="p-4 overflow-y-auto max-h-screen">
            <img
              src={product.image_url}
              alt={product.title}
              className="object-cover object-center w-full h-24 md:h-32"
            />
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              {product.name}
            </h3>
            <p className="mt-2 text-md font-medium text-yellow-500">Service</p>
            <p className="mt-2 text-sm text-gray-700">{product.description}</p>
            <RequestCallBackForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    );
  };

  const handleRequestCall = (product) => {
    setSelectedProduct(product);
  };

  const handleServiceScreen = () => {
    router.push("/ServiceScreen");
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (!selectedProduct) {
        throw new Error("No product selected.");
      }

      const dataToSend = {
        formData: {
          ...formData,
          productId: selectedProduct.id,
          productTitle: selectedProduct.name,
        },
      };

      const response = await fetch("https://signyards.in/getOrder.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);

      setNotification(
        "Service request accepted. Our customer executive will connect with you soon."
      );

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);

      handleCloseModal();

      return data;
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const displayedServices = showAllProducts ? services : services.slice(0, 8);

  if (loading) {
    return (
      <div
        id="services"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8"
      >
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
      </div>
    );
  }

  return (
    <div id="services" className="bg-white">
      {notification && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
          {notification}
        </div>
      )}
      <div className="relative sm:w-full">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 ">
            {displayedServices.map((product) => (
              <div
                key={product.id}
                className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group block relative cursor-pointer bg-gray-200 p-4"
                onClick={() => handleRequestCall(product)}
              >
                <div className="aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
                  <div className="w-full h-64">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="object-cover object-center w-full h-full group-hover:opacity-75"
                    />
                  </div>
                </div>

                <div className="mt-1 text-lg font-medium text-red-600">
                  Service
                </div>

                <h3 className="text-lg font-medium text-gray-900 ">
                  {product.title}
                </h3>

                <div className="min-h-[64px] mt-1 text-sm text-gray-700">
                  {/* Placeholder for description or additional content */}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRequestCall(product);
                  }}
                  className="absolute bottom-4 left-0 right-0 mx-auto w-10/12 bg-[#e74c3c] text-white py-2 rounded-md text-sm font-medium hover:bg-[#e74c3c] transition-colors duration-300"
                >
                  Request a Call Back
                </button>
              </div>
            ))}
          </div>

          {showMoreButton && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleServiceScreen}
                className="flex items-center px-4 py-2 text-black text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e74c3c]"
              >
                More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default ServiceSection;
