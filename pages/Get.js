// pages/index.js

import { useEffect, useState } from "react";

export default function Get() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://signyards.in/getProducts.php");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        console.log("Fetched data:", result);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p style={{ color: "black" }}>Loading...</p>;
  if (error) return <p style={{ color: "black" }}>Error: {error.message}</p>;

  const renderProduct = (product) => (
    <div
      key={product.id}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <h2>{product.name}</h2>
      <img
        src={`data:image/png;base64,${product.imageBase64}`}
        alt={product.imageAlt}
        width={200}
      />
      <p>{product.description}</p>
      <p>
        <strong>Brand:</strong> {product.brand}
      </p>
      <p>
        <strong>Size:</strong> {product.size}
      </p>
      <p>
        <strong>Color:</strong> {product.color}
      </p>
      <p>
        <strong>Material:</strong> {product.material}
      </p>
      <p>
        <strong>Item weight:</strong> {product.weight}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "white", color: "black", padding: "16px" }}>
      <h1>Fetched Data</h1>
      {Array.isArray(data) ? data.map(renderProduct) : renderProduct(data)}
    </div>
  );
}
