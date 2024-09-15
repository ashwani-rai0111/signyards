import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../components/firebase.config";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updatePhoneNumber,
} from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const Authent = ({ onAuthComplete, handleClose }) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAlreadyLoggedIn(true);
      setTimeout(() => {
        router.push("/"); // Redirect to main screen after 5 seconds
      }, 3000);
    }
  }, []);

  const [token, setToken] = useState("");

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha resolved..");
            onSignup();
          },
        }
      );
    } else {
      console.log("Recaptcha already initialized.");
      onSignup(); // Call your signup function here
    }
  }

  function onSignup() {
    setLoading(true);

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + ph;

    // Store the phone number in local storage

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onSignupButtonClick() {
    onCaptchVerify();
    onSignup();
  }

  function onOTPVerify() {
    setLoading(true);
    setError("");

    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);

        // Save the entered phone number (without +91) in local storage
        localStorage.setItem("phoneNumber", ph);
        console.log(phs);
        const token = await res.user.getIdToken();
        localStorage.setItem("accessToken", token); // Save the access token to local storage
        onAuthComplete(token); // Pass the token to the parent component

        setTimeout(() => {
          router.back(); // Navigate back to the previous screen after 3 seconds
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setError("OTP does not match");
        setLoading(false);
      });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 bg-[#eaeaea]">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {alreadyLoggedIn ? (
          <h2 className="text-center text-gray-800 font-medium text-2xl">
            👍 Already Logged In
          </h2>
        ) : user ? (
          <h2 className="text-center text-gray-800 font-medium text-2xl">
            👍 Login Success
          </h2>
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-center leading-normal text-gray-800 font-medium text-3xl mb-6">
              Welcome to <br /> SIGNYARD.COM
            </h1>
            {showOTP ? (
              <>
                <div
                  className="text-white w-fit mx-auto p-4 rounded-full"
                  style={{ backgroundColor: "#e74c3c" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-gray-800 text-center"
                >
                  Enter your OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,6}$/.test(value)) {
                      setOtp(value);
                    }
                  }}
                  className="opt-container border border-gray-400 rounded px-3 py-2"
                />
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                  onClick={onOTPVerify}
                  className="w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  style={{ backgroundColor: "#e74c3c" }}
                >
                  {loading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="w-fit  mx-auto  rounded-full">
                  <img
                    src="/assets/signyards.jpg"
                    alt="Success"
                    className="w-40 h-40 object-contain"
                  />
                </div>

                <label
                  htmlFor="phone"
                  className="font-bold text-xl text-gray-800 text-center"
                >
                  Verify your phone number
                </label>
                <input
                  type="tel"
                  value={ph}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      setPh(value);
                    }
                  }}
                  className="border border-gray-400 rounded px-3 py-2"
                />
                <button
                  onClick={onSignupButtonClick}
                  className="w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  style={{ backgroundColor: "#e74c3c" }}
                >
                  {loading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Authent;
