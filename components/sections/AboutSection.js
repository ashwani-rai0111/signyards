import Link from "next/link";

function AboutUsSection() {
  return (
    <Link legacyBehavior href="/about-us">
      <div className="flex flex-col lg:flex-row items-center bg-[#eaeaea]  p-8 rounded-lg shadow-l transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <img
            className="w-full h-auto rounded-lg shadow-lg"
            src="/assets/about2.png"
            alt="Company Logo"
          />
        </div>
        <div className="lg:w-1/2 w-full lg:pl-8">
          <h2 className="text-3xl font-bold mb-6 text-red-600 hover:text-red-800 transition-colors duration-300">
            About Signyards
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            Signyards.com is a web portal that connects customers with the right
            sellers in the signage industry. We've partnered with top signage
            manufacturers and service providers across the country to offer
            quality products and services to our customers.
          </p>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            Our platform is designed to be an online marketplace where you can
            easily find all products and services related to signage and
            advertising with just a few clicks.
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-red-600">Our Mission:</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              To become the most trustworthy online platform in the signage and
              advertising industry.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-600">Our Vision:</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              To empower all genuine sellers to partner with Signyards and
              provide better products and services at competitive rates.
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AboutUsSection;
