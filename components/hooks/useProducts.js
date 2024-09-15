import { useState, useEffect } from "react";

const useProducts = (initialLoadCount = 8) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://signyards.in/getProducts.php");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.slice(0, initialLoadCount)); // Only take the first initialLoadCount products
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initialLoadCount]);

  return { products, loading, error };
};

export default useProducts;
