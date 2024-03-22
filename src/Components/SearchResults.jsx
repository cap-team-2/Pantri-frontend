/* eslint-disable react/prop-types */
// SearchResults.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import SearchResultsProduct from "./SearchResultsProduct";
const API = import.meta.env.VITE_APP_API_URL;


export default function SearchResults({ searchResults, session, cartQuantity, setCartQuantity }) {
  const [ cart, setCart ] = useState(
    {
      session_id: '',
      product_id: '',
      quantity: 1
    }
  );

// Function to add a product to the cart
  function addToCart(product) {
    setCartQuantity(cartQuantity + 1)
    setCart({...cart, session_id: session.id, product_id: product.id, quantity: '1'})

  }

  useEffect(() => {

    axios.post(`${API}/cart-products`, cart)
    .catch((error) => {
      console.log(error);
    });

  }, [cart]);

  return (
    <div className="grid grid-cols-1 mobile:grid-cols-2 h-auto w-auto tablet:grid-cols-3 laptop:grid-cols-4 px-4  self-center gap-4 tablet:gap-8 xl:px-20 xl:gap-20 pt-10">
      {searchResults  ? (
        searchResults.map((results) => {
          return (
            <SearchResultsProduct key={results.id} results={results} addToCart={addToCart} cartQuantity={cartQuantity} setCartQuantity={setCartQuantity} />
          );
        })
      ) : (
        <h2 className="text-xl h-screen font-medium col-span-full text-center mt-10">
          Sorry, we could not find any results
        </h2>
      )}
      <p className="text-2xl text-center z-0 col-start-2">
          Loading Products <span className="animate-ping ">. . .</span>
      </p>
    </div>
  );
}

