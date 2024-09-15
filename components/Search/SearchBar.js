import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ searchOpen, setSearchOpen }) => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (value) => {
    setSearchValue(value);
    if (value.length > 0) {
      setLoading(true);
      try {
        const response = await fetch("https://signyards.in/searchAPI.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchValue: value,
            type: "searchBox",
          }),
        });

        const data = await response.json();

        const exactMatch = data.filter(
          (item) =>
            item.type === "Product" &&
            item.name.toLowerCase() === value.toLowerCase()
        );

        const partialMatch = data.filter(
          (item) =>
            item.type === "Product" &&
            item.name.toLowerCase().includes(value.toLowerCase()) &&
            item.name.toLowerCase() !== value.toLowerCase()
        );

        const rest = data.filter(
          (item) =>
            item.type !== "Product" ||
            !item.name.toLowerCase().includes(value.toLowerCase())
        );

        setResults([...exactMatch, ...partialMatch, ...rest]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchRedirect();
    }
  };

  const handleSearchRedirect = () => {
    if (searchValue.trim()) {
      router.push(`/searchScreen?query=${encodeURIComponent(searchValue)}`);
      setSearchOpen(false); // Close the search input after redirection
    }
  };

  return (
    <div className="relative w-full max-w-md ml-3">
      <div className="relative flex items-center w-full">
        {searchOpen && (
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search Products"
            className="flex-1 pl-10 pr-12 py-2 bg-[#f9f9f9] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-transparent transition-all"
          />
        )}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 lg:right-2 lg:top-1/2"
        >
          <MagnifyingGlassIcon
            className="h-6 w-6 text-[#e74c3c] transition-transform duration-150 ease-in-out"
            aria-hidden="true"
          />
        </button>
      </div>
      {searchOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {loading && <p className="p-4 text-gray-600">Loading...</p>}
          {!loading && results.length > 0 && (
            <ul className="p-2">
              {results.map((item) => (
                <li
                  key={item.id}
                  className="py-2 px-4 flex items-center hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
                >
                  <Link legacyBehavior href={`/products/${item.id}`} passHref>
                    <a className="flex items-center w-full">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 object-cover mr-4 rounded-lg shadow-sm"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-gray-900">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                          {item.type}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
