// App.jsx

// DEPENDENCIES
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// PAGES
import Browse from "./Pages/Browse";
import Cart from "./Pages/Cart";
import FarmersMarkets from "./Pages/FarmersMarkets";
import Products from "./Pages/Products";
import ProductById from "./Components/ProductById";
import FourOFour from "./Pages/FourOFour";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Market from "./Pages/Market";
import Nav from "./Components/Nav";
import Register from "./Pages/Register";
import Sellers from "./Pages/Sellers";
import SellersById from "./Pages/SellersById"

function App() {

  const [searchResults, setSearchResults] = useState([]);

  return (
    <main className="h-full w-full">
      <Router>
        <Nav setSearchResults={setSearchResults} />
        <Routes>
          <Route
            path="/"
            element={<HomePage searchResults={searchResults} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductById />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/sellers/:id" element={<SellersById />} />
          <Route path="/market" element={<Market />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/farmers-markets" element={<FarmersMarkets />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App
