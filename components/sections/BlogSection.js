import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing arrow icon from react-icons

function MainBlogPage() {
  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <Link href="/blogs" legacyBehavior>
          <a>
            <div className="mb-12 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-4">
                <img
                  className="w-full h-auto rounded-lg shadow-lg"
                  src="/assets/Blog5.jpg"
                  alt="Signage Example"
                  width={800}
                  height={600}
                />
              </div>
              <div className="md:w-1/2 md:pl-4">
                <h2 className="text-3xl font-bold mb-4 text-yellow-300 flex items-center hover:text-gray-400">
                  <FaArrowLeft className="mr-4 transition-colors duration-300" />
                  Quality Signage Solutions
                </h2>
                <p className="mb-4">
                  We at signyards use best quality raw materials to provide
                  quality signboards. Our manufacturer’s workshop team can
                  fabricate your signages and help you mount them on your store!
                </p>
              </div>
            </div>
          </a>
        </Link>

        <div className="mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-4">
            <Link href="/blogsTwo" legacyBehavior>
              <a>
                <h2 className="text-3xl font-bold mb-4 text-yellow-300 flex items-center hover:text-gray-400">
                  Full Acrylic Box Signage
                  <FaArrowRight className="ml-2 transition-colors duration-300" />
                </h2>
                <p className="mb-4">
                  Full Acrylic box backlit illuminated signage is unique and
                  similar to flex backlit signboards, made using 5mm acrylic
                  with IP 65 grade LED modules for durable lighting.
                </p>
              </a>
            </Link>
          </div>
          <div className="md:w-1/2 md:pl-4">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="/assets/Blog6.jpg"
              alt="Signage Example"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBlogPage;
