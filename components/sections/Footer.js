import React from "react";
import {
  FiMail,
  FiPhone,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiArchive,
  FiTrendingDown,
} from "react-icons/fi";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white p-4 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between ">
        <div className="mb-8 w-full md:w-1/3 p-6 bg-white bg-opacity-10">
          <h1 className="text-4xl text-[#e74c3c] font-bold mb-6">Signyards</h1>
          <p className="text-sm text-bold  text-black">
            Signyards is an online marketplace for signage fit-out materials. We
            are India’s first online store for buying products like ACP & HPL
            sheets, Sunboard sheets, LED SMPS power supply, Lights and modules,
            Adhesives, sealants and much more.
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-8 p-6 bg-white bg-opacity-10">
          <h2 className="text-2xl font-bold mb-4 text-[#e74c3c]">Contact Us</h2>
          <div className="flex items-center mb-4">
            <FiMail className="mr-4 text-2xl text-black" />
            <p className="text-black">hello@signyards.com</p>
          </div>
          <div className="flex items-center mb-4">
            <FiPhone
              className="text-black
             mr-4 text-2xl"
            />
            <p className="text-black">9205778814</p>
          </div>
          <div className="space-x-2 text-sm items-center">
            <Link legacyBehavior href="/customSignage">
              <a className="text-[#e74c3c] border-white underline">
                Order Signage
              </a>
            </Link>
            <Link legacyBehavior href="/contact-us">
              <a className="text-black border-white underline">ContactUs</a>
            </Link>
            <Link legacyBehavior href="/about-us">
              <a className="text-black border-white underline">AboutUs</a>
            </Link>

            <Link legacyBehavior href="/blogs">
              <a className="text-black border-white underline">Blogs</a>
            </Link>
            <Link legacyBehavior href="/terms-and-conditions">
              <a className="text-black border-white underline">
                Terms & Conditions
              </a>
            </Link>
            <Link legacyBehavior href="/orderHistory">
              <a className="text-black border-white underline">Orders</a>
            </Link>
            <Link legacyBehavior href="/privacy-policy">
              <a className="text-black border-white underline">
                Privacy Policy
              </a>
            </Link>

            {/* <Link legacyBehavior href="/about-us">
              <a className="text-black border-white underline">AboutUs</a>
            </Link> */}
            <Link legacyBehavior href="/faqs">
              <a className="text-black border-white underline">FAQs</a>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/3 mb-8 p-6 bg-white bg-opacity-10">
          <h2 className="text-2xl font-bold mb-4 text-[#e74c3c]">Follow Us</h2>
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/profile.php?id=61560404651489"
              className="hover:text-[#ff8] transition duration-300 transform hover:scale-110"
            >
              <FiFacebook className="h-8 w-8 text-black" />
            </a>
            <a
              href="https://www.instagram.com/signyards?igsh=enJxMzE0Zjc4cGNr"
              className="hover:text-[#ff8] transition duration-300 transform hover:scale-110"
            >
              <FiInstagram className="h-8 w-8 text-black" />
            </a>
            <a
              href="https://www.linkedin.com/company/signyards/"
              className="hover:text-[#ff8] transition duration-300 transform hover:scale-110"
            >
              <FiLinkedin className="h-8 w-8 text-black" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
