"use client";

import React, { useState } from "react";
import CustomSignageForm from "../components/Forms/CustomSignageForm";
import Trend from "@/components/sections/Trend";

const CustomSignage = () => {
  const [showForm, setShowForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const type = "custom signyard";

  const handleFormSubmit = (formData) => {
    console.log("Form data:", formData);
    setFormSubmitted(true);
    setShowForm(false);
  };
  const status = [
    {
      name: "SKUs of Products & Services across different categories on our Marketplace.",
      value: "50+",
    },
    {
      name: "Sellers or Seller partners are registered on signyards across categories",
      value: "20+",
    },
    { name: "Registers user or Buyers or clients.", value: "50+" },
    {
      name: "Turnkey Signages & Advertising Projects Completed or delivered for different clients across India.",
      value: "50+",
    },
  ];
  return (
    <div
      className="bg-white min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://pranavagroup.com/template/img/about-01_1600.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-75 min-h-screen">
        <div className="container mx-auto max-w-7xl px-8 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 items-center">
            <div>
              {showForm && (
                <CustomSignageForm type={type} onSubmit={handleFormSubmit} />
              )}
              {formSubmitted && (
                <div className="mt-4 text-lg text-indigo-600">
                  Thank you for showing interest. Our customer executive will
                  connect with you shortly.
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 lg:gap-4">
              <img
                src="../assets/Blog6.jpg"
                alt="W."
                className="rounded-lg bg-gray-100 shadow-md"
              />
              <img
                src="../assets/Blog2.jpg"
                alt="x"
                className="rounded-lg bg-gray-100 shadow-md"
              />
              <img
                src="../assets/Blog5.jpg"
                alt="S"
                className="rounded-lg bg-gray-100 shadow-md"
              />
              <img
                src="../assets/Blog3.jpg"
                alt="W"
                className="rounded-lg bg-gray-100 shadow-md"
              />
            </div>
          </div>
        </div>
        {/* <dl className="grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {status.map((stat) => (
            <div key={stat.name} className="flex flex-col items-start">
              <dd className="text-2xl font-bold leading-9 tracking-tight text-red">
                {stat.value}
              </dd>
              <dt className="text-sm font-bold leading-7 text-gray-900">
                {stat.name}
              </dt>
            </div>
          ))}
        </dl> */}
      </div>
    </div>
  );
};

export default CustomSignage;
