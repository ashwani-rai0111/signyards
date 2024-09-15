import Image from "next/image";

function AboutUs() {
  return (
    <div className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-yellow-400">
          About Us
        </h1>

        <p className="mb-6">
          Signage and branding is an important part of any retail business. A
          good signage provides your customers with important information,
          increases brand awareness, and in the end, it can help you convert a
          sale.
        </p>

        <div className="mb-6">
          <img
            className="w-full h-auto"
            src="/assets/about2.png"
            alt="Company Logo"
          />
        </div>

        <p className="mb-6">
          Signyards.com is a web portal which connects the customer with the
          right Seller (signage manufacturer, fabricator and service provider).
          Signyards have partnered with Signage and advertising solutions
          provider companies across the country and empowered them to sell their
          products & Services on Signyards to the right customers.
        </p>

        <p className="mb-6">
          Signyards provides the best in class signages and advertising
          solutions. We are building an online marketplace where you can find
          all products and services of the signage and advertising industry in
          4-5 clicks. We are making Signyards a single place for your signage
          related items purchase.
        </p>

        <p className="mb-6">
          You can find signage products and services for every business type
          purpose on our website. All our registered sellers are very
          experienced in the industry.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Our Values</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Our team</li>
          <li>Product Quality</li>
          <li>Customer Relationship</li>
          <li>Transparency</li>
          <li>Customer Support</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Our Mission</h2>
        <p className="mb-6">
          To become a single trustworthy online platform in the signage and
          advertising industry.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Our Vision</h2>
        <p className="mb-6">
          To empower all genuine sellers to partner with Signyards and give
          better products & services at better rates to customers.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Our Team</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-yellow-300">
            Anuj Saini - Founder & CEO
          </h3>
          <p>
            Anuj has been running a signage manufacturing company in Gurgaon for
            the last 7 years. He has worked with many brand companies over the
            years. As per him, we cannot make everything as this signage
            industry is huge. Purpose of building Signyards is to bring all
            signage types on one platform and help customers find the right
            product as per their requirement.
          </p>
          {/* <p>
            <a
              href="LINKEDIN_PROFILE"
              className="text-blue-400 hover:underline"
            >
              LinkedIn Profile
            </a>
          </p> */}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-yellow-300">
            Amit Singla (CFO)
          </h3>
          <p>Content about Amit Singla.</p>
          {/* <p>
            <a
              href="LINKEDIN_PROFILE"
              className="text-blue-400 hover:underline"
            >
              LinkedIn Profile
            </a>
          </p> */}
        </div>

        <footer className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col items-center">
            <img
              className="-m-1.5 p-1.5 h-16 w-auto"
              src="/assets/logo2.jpg"
              alt="Company Logo"
              width={150}
              height={50}
            />
            <p className="text-center mt-4">
              Signyards is an online marketplace of signage and advertising
              solutions in India.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AboutUs;
