// Sellers.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import SellerCard from "../Components/sellerCard/SellerCard.jsx";
import SearchBar from "../Components/search/SearchBar.jsx";
const API = import.meta.env.VITE_APP_API_URL;

export default function Sellers({ searchForText, setSearchForText }) {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    setSearchForText("Vendors")
    axios
      .get(`${API}/sellers`)
      .then((res) => {
        setSellers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="h-auto min-h pt-24 flex flex-col gap-4 xl:px-32 pb-4">
      <h1 className="text-center  text-4xl font-light text-gray-900 text-green tablet:text-5xl desktop:text-6xl">
        VENDORS
      </h1>
      <SearchBar searchForText={searchForText}/>  
      <div className="tablet:grid tablet:grid-cols-2 gap-8 laptop:grid-cols-3 desktop:grid-cols-4 pt-4 px-16">
        {sellers.length ? (
          sellers.map((seller) => {
            return (
              <div key={seller.id} className="flex mb-8 justify-center">
                <SellerCard seller={seller} />
              </div>
            );
          })
        ) : (
          <p className="text-lg w-full col-span-2 laptop:col-span-1 laptop:col-start-2 flex justify-center">No Vendors Found</p>
        )}
      </div>
    </div>
  );
}
