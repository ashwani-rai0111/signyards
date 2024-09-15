import React from "react";

const faqs = [
  {
    question: "What is Signyards.com?",
    answer:
      "Signyards.com is a leading tech-enabled signage company based in Gurugram. Signyards is a marketplace of signage and advertising solutions, which helps anyone buy signage products and services directly from the seller on our platform.",
  },
  {
    question: "How Does it work?",
    answer:
      "You can go to our website www.signyards.com and choose products and services listed in our marketplace or contact us if you have any custom requirements.",
  },
  {
    question: "Who do we pay the money to? To Signyards or To Seller?",
    answer:
      "Customers have to pay to Signyards directly and we pay the Seller and supplier.",
  },
  {
    question: "Are sellers on Signyards genuine and verified?",
    answer:
      "Absolutely yes. We follow strict guidelines while onboarding all sellers and suppliers on our platform.",
  },
  {
    question:
      "Why choose a Signyards marketplace for buying products and services?",
    answer:
      "We have everything that you look for in the signage industry, that too at a very reasonable cost.",
  },
  {
    question:
      "Do Signyards provide any on-ground support for custom signage projects?",
    answer:
      "Yes, we have a dedicated person assigned for your order or project who coordinates with Seller and suppliers on your behalf and also the backend support team.",
  },
  {
    question: "How Do I buy Custom Signage from Signyards.com?",
    answer:
      "Just click on the custom signage tab and fill the form…our team will reach out and do the rest of the work.",
  },
  {
    question: "Do Signyards.com provide graphic design service also?",
    answer:
      "Yes we do. Please contact our customer support number for graphic designing services.",
  },
  {
    question: "How do I contact you for any inquiry?",
    answer:
      "You can contact us through our website signyards.com or you can email us at hello@signyards.com.",
  },
];

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-yellow-300 mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                {faq.question}
              </h2>
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
