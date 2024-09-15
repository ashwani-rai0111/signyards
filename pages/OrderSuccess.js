import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const OrderSuccess = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const ExploreMore = () => {
    router.push("/productScreen");
  };

  useEffect(() => {
    if (router.query.formData) {
      setFormData(JSON.parse(router.query.formData));
    }
  }, [router.query]);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center items-center text-green-600 mb-4">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-5xl animate-bounce"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold">
          Order Successfully Confirmed!
        </h2>
        <p className="text-lg sm:text-xl mt-2">
          Thank you, {formData.name}, for your purchase.
        </p>
        <button
          onClick={ExploreMore}
          className="mt-4 px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg shadow-md w-full text-sm sm:text-base"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
