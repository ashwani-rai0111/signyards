import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import SearchBar from "../Search/SearchBar";
import { useCart } from "../../components/context/Cartcontext";

const Header = () => {
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthenticate, setShowAuthenticate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Your Location");
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in on component mount
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const toggleAuthenticate = () => {
    if (isLoggedIn) {
      setShowAuthenticate(true);
    } else {
      router.push("/Authent");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setShowAuthenticate(false);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const navigation = [
    { name: "MarketPlace", href: "/productScreen" },
    { name: "Services", href: "/serviceScreen" },
    { name: "ContactUs", href: "/contact-us" },
    { name: "AboutUs", href: "/about-us" },
  ];

  return (
    <div>
      <header className="bg-white fixed inset-x-0 top-0 z-50 rounded-b-lg">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center lg:hidden w-full">
            {!searchOpen && (
              <img
                src="https://signyards-asserts.s3.ap-south-1.amazonaws.com/logo1.jpeg"
                alt="Logo"
                className="h-20 w-20"
              />
            )}
            <div className="flex items-center ml-auto space-x-4 w-full justify-end">
              <SearchBar
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                className="w-full"
              />
            </div>
            <Link href="/cart" className="text-gray-400 mr-2 relative">
              <ShoppingCartIcon
                className="h-6 w-6"
                style={{ color: "#e74c3c" }}
                aria-hidden="true"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon
                className="h-6 w-6"
                aria-hidden="true"
                style={{ color: "black" }}
              />
            </button>
          </div>
          <div className="hidden lg:flex flex-1 items-center justify-between">
            <div className="flex flex-1 items-center justify-start lg:justify-start">
              <Link href="/">
                <div className="relative flex items-center">
                  <img
                    src="https://signyards-asserts.s3.ap-south-1.amazonaws.com/logo.jpeg"
                    alt="Logo"
                    className="h-12 w-auto"
                  />
                  <div className="flex items-center ml-4">
                    <MapPinIcon
                      className="h-6 w-6 text-[#e74c3c]"
                      aria-hidden="true"
                    />
                    <select
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="ml-4 px-2 py-1 border rounded-lg bg-white text-[#e74c3c] text-sm"
                    >
                      <option value="Delhi">Delhi</option>
                      <option value="Gurugram">Gurugram</option>
                      <option value="Your Location">Your Location</option>
                    </select>
                  </div>
                </div>
              </Link>
            </div>
            <SearchBar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
            <Link href="/cart" className="text-gray-400 ml-4 relative">
              <ShoppingCartIcon
                className="h-6 w-6"
                style={{ color: "#e74c3c" }}
                aria-hidden="true"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <button
                onClick={toggleAuthenticate}
                className="flex items-center space-x-1 text-sm font-semibold leading-6 text-black cursor-pointer ml-4"
              >
                <span>Log out</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <button
                onClick={toggleAuthenticate}
                className="flex items-center space-x-1 text-sm font-semibold leading-6 text-black cursor-pointer ml-4"
              >
                <span>Log in</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm rounded-b-lg"
            style={{ background: "#eaeaea" }}
          >
            <div className="flex items-center justify-between">
              <Link href="/">
                <img
                  src="https://signyards-asserts.s3.ap-south-1.amazonaws.com/logo1.jpeg"
                  alt="Logo"
                  className="h-20 w-20"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-black hover:bg-gray-400/10"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {isLoggedIn ? (
                    <button
                      onClick={toggleAuthenticate}
                      className="flex items-center space-x-1 text-sm font-semibold leading-6 text-black cursor-pointer"
                    >
                      <span>Log out</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  ) : (
                    <button
                      onClick={toggleAuthenticate}
                      className="flex items-center space-x-1 text-sm font-semibold leading-6 text-black cursor-pointer"
                    >
                      <span>Log in</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      {showAuthenticate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Yes, Log out
              </button>
              <button
                onClick={() => setShowAuthenticate(false)}
                className="ml-4 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
