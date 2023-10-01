// App.jsx

// DEPENDENCIES
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// PAGES 
import Browse from "./Pages/Browse";
// import CartPage from "./Pages/CartPage";
import FarmersMarkets from "./Pages/FarmersMarkets";
import LandingPage from "./Pages/LandingPage";
import Products from "./Pages/Products";
import ProductById from "./Components/ProductDetails";
import Footer from "./Components/Footer.jsx";
import FourOFour from "./Pages/FourOFour";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Market from "./Pages/Market";
import Nav from "./Components/Nav";
import Register from "./Pages/Register";
import Sellers from "./Pages/Sellers";
import SellersById from "./Pages/SellersById";
import CartPage from "./Pages/CartPage";
// import { search } from "requirejs";
const API = import.meta.env.VITE_APP_API_URL;

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState("Home");
  const [ filteredProducts, setFilteredProducts ] = useState([]);
  const [searchForText, setSearchForText] = useState("Products");
  const [session, setSession] = useState(
    {
      user_id: '9e6ef4fb-5574-4968-912a-ea28257d708e',
      total: '0.00',
      created_at: 'today'
    }
  );

  // replace with the signed in user or a guest uuid
  const userId = "9e6ef4fb-5574-4968-912a-ea28257d708e"

  // Update searchResults state to have all products App component is rendered
    useEffect(() => {
      // if (axios.get(`${API}/shopping-session`)) {
      // } 

// used to create a new shopping session
    axios.put(`${API}/shopping-session/1`, session )

      axios.get(`${API}/shopping-session/1`)
      .then((res) => {
        setSession(res.data);
      })
      .catch((error) => {
        console.log(error);
      })

    }, []);

  return (
    <main className="h-screen w-full font-font ">
      <Router>
        <Nav
          setSearchResults={setSearchResults}
          // setFilteredProducts={setFilteredProducts}
          // filter={filter}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"

            element={<HomePage 
              searchResults={searchResults} 
              setSearchResults={setSearchResults} 
              setFilteredProducts={setFilteredProducts} 
              filteredProducts={filteredProducts}
              filter={filter}
              setFilter={setFilter}
              session={session}
              searchForText={searchForText}
            />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductById />} />
          <Route path="/sellers" element={<Sellers searchForText={searchForText} setSearchForText={setSearchForText} />} />
          <Route path="/sellers/:id" element={<SellersById />} />
          <Route
            path="/market"
            element={
              <Market
                searchForText={searchForText}
                setSearchForText={setSearchForText}

              />
            }
          />
          <Route path="/browse" element={<Browse />} />
          <Route path="/farmers-markets" element={<FarmersMarkets />} />
          <Route path="/cart" element={<CartPage session={session} />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      <Footer />
      </Router>
    </main>
  );
}

export default App
