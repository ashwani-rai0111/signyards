import React from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiFacebook,
  FiInstagram,
  FiTrendingDown,
  FiArchive,
  FiLinkedin,
} from "react-icons/fi";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

const Contact = () => {
  return (
    <div>
      <div className="h-screen bg-[#eaeaea] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-wrap justify-between text-white">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Contact;
