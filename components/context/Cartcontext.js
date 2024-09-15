import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCartItems, setLoadingCartItems] = useState(true);

  // Fetch the cart details from the API if the phone number exists in localStorage
  const fetchCart = async () => {
    const phoneNumber = localStorage.getItem("phoneNumber") 

    if (phoneNumber) {
      try {
        const response = await fetch("https://signyards.in/cart.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "getCart",
            phone: phoneNumber,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data = await response.json();
        const formattedCartItems = data.products.map((item) => ({
          id: String(item.id), // Convert id to string
          quantity: parseInt(item.quantity, 10), // Convert quantity to integer
        }));

        setCartItems(formattedCartItems);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }finally {
        setLoadingCartItems(false);
      }
    } else {
      console.error("Phone number not found in local storage.");
    }
  };

  const postCart = async (productId, quantity) => {

    console.log(productId,quantity);
    const phoneNumber = localStorage.getItem("phoneNumber") // Hardcoded for now

    if (phoneNumber) {
      // const ids = cartItems.map((item) => ({
      //   id: item.id,
      //   quantity: item.id === productId ? quantity : item.quantity,
      // }));
      
      const products = [
        {
          product_id: productId,
          quantity: quantity,
        }
      ];
      

      console.log(products);
      try {
        const response = await fetch("https://signyards.in/cart.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "postCart",
            phone: phoneNumber,
            products: products,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update cart on server");
        }

        const data = await response.json();
        console.log("Cart updated successfully2:", data);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    } else {
      console.error("Phone number not found in local storage.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      const updatedItems = item
        ? prevItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { id: productId, quantity: 1 }];

      postCart(productId, item ? item.quantity + 1 : 1);
      return updatedItems;
    });
  };

  const removeFromCart = async (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);

    const phoneNumber = localStorage.getItem("phoneNumber");

    if (phoneNumber) {
      const product = [
        {
          product_id: productId,
        }
      ];


      try {
        const response = await fetch("https://signyards.in/cart.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "deleteCart",
            phone: phoneNumber,
            products: product,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to remove product from the cart");
        }

        const data = await response.json();
        console.log("Cart updated successfully:", data);
      } catch (error) {
        console.error("Error removing product from cart:", error);
      }
    } else {
      console.error("Phone number not found in local storage.");
    }
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    const item = cartItems.find((item) => item.id === productId);
    postCart(productId, item ? item.quantity + 1 : 1);
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    const item = cartItems.find((item) => item.id === productId);
    postCart(productId, item ? item.quantity - 1 : 0);
  };

  const clearCart = () => {
    setCartItems([]);
    // Optionally, you could also clear the cart on the server-side
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        loadingCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
