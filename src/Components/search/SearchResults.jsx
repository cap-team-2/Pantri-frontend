/* eslint-disable react/prop-types */
// SearchResults.jsx

import axios from 'axios'
import { useEffect, useState, Suspense, lazy } from 'react'
import Loading from '../Loading'
//import SearchResultsProduct from './SearchResultsProduct'
const SearchResultsProduct = lazy(() => import('./SearchResultsProduct'))
const API = import.meta.env.VITE_APP_API_URL

export default function SearchResults({
  searchResults,
  cartQuantity,
  setCartQuantity,
  searchQuery,
}) {
  // Function to add a product to the cart
  function addToCart(product) {
    setCartQuantity(cartQuantity + 1)
  }

  return (
    <div className="grid grid-cols-1 mobile:grid-cols-2 h-full w-auto min-w-full tablet:grid-cols-3 laptop:grid-cols-4 px-4 self-center gap-4 tablet:gap-8 xl:px-20 xl:gap-20 pb-12">
      {searchResults ? (
        searchResults.map((results) => {
          return (
            <Suspense key={results.id} fallback={<Loading />}>
              <SearchResultsProduct

                results={results}
                addToCart={addToCart}
                cartQuantity={cartQuantity}
                setCartQuantity={setCartQuantity}
              />
            </Suspense>
          )
        })
      ) : (
        <h2 className="text-xl h-full font-medium col-span-full text-center mt-10">
          Sorry, we could not find any results for {searchQuery}
        </h2>
      )}
    </div>
  )
}
