// pages/_app.js
import { CartProvider } from "../components/context/Cartcontext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
export default MyApp;
