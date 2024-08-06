/* eslint-disable react/prop-types */
// Home.jsx

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import FilterProductsBy from '../Components/filter/FilterProductsBy'
import Loading from '../Components/Loading'
import SearchResults from '../Components/search/SearchResults'
import SearchBar from '../Components/search/SearchBar'
const API = import.meta.env.VITE_APP_API_URL

export default function HomePage({
  searchResults,
  setSearchResults,
  searchForText,
  cartQuantity,
  setCartQuantity,
  cartProducts,
  setCartProducts,
}) {
  const [searchQuery, setSearchQuery] = useState(null)
  const filter = useRef('Home')

  // Make an API call for all products when returning to the homepage to update the searchResults state
  useEffect(() => {
    filterProducts(filter.current)
  }, [])

  // Api call to retrieve a specific product
  function performSearch(query) {
    try {
      axios.get(`${API}/products/?q=${query}`).then((res) => {
        if (!res.data.length) {
          setSearchResults(null)
          setSearchQuery(query)
        } else {
          setSearchResults(res.data)
        }
      })
    } catch (error) {
      setSearchResults(null)
    }
  }

  // Update the filter state to switch between the different filters for each product category
  function filterProducts(category) {
    if (category !== filter) {
      filter.current = `${category}`
      axios
        .get(
          `${API}/products?${category === 'Home' ? '' : `category=${category}`}`
        )
        .then((res) => {
          setSearchResults(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className="h-full min-h-full w-full flex flex-col tablet:pt-24 pb-4">
      <div className="flex flex-col fixed top-16 tablet:top-16 w-full bg-white z-40 pt-2">
        {/* Search Bar */}
        <SearchBar
          setSearchResults={setSearchResults}
          performSearch={performSearch}
          searchForText={searchForText}
        />
        <div className="flex overflow-x-auto scroll-smooth tablet:justify-center shadow-md tablet:pt-2">
          {/* Filter Buttons */}
          <FilterProductsBy
            setSearchResults={setSearchResults}
            filterProducts={filterProducts}
            filter={filter}
          />
        </div>
      </div>
      <div
        className="mt-56 tablet:mt-36 px-4"
      >
        {/* Products */}
        <SearchResults
          searchResults={searchResults}
          cartQuantity={cartQuantity}
          setCartQuantity={setCartQuantity}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  )
}
