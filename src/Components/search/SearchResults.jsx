/* eslint-disable react/prop-types */
// SearchResults.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import SearchResultsProduct from "./SearchResultsProduct";
const API = import.meta.env.VITE_APP_API_URL;


export default function SearchResults({ searchResults, cartQuantity, setCartQuantity, session, cartProducts }) {
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

    <div className="grid grid-cols-1 mobile:grid-cols-2 h-full w-auto min-w-full tablet:grid-cols-3 laptop:grid-cols-4 px-4 self-center gap-4 tablet:gap-8 xl:px-20 xl:gap-20 pb-12">
      {searchResults.length  ? (
        searchResults.map((results) => {
          return (
            <SearchResultsProduct key={results.id} results={results} addToCart={addToCart} cartQuantity={cartQuantity} setCartQuantity={setCartQuantity} session={session} />            
          );
        })
      ) : (
        <h2 className="text-xl h-screen font-medium col-span-full text-center mt-10">
          Sorry, we could not find any results
        </h2>
      )}
    </div>
   );
   
}

