    // SearchResultsProduct.jsx
    import axios from "axios";
    import { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import { updateQuantity} from "./CartFunctions";
    const API = import.meta.env.VITE_APP_API_URL;


    export default function SearchResultsProduct({ results, addToCart }) {
        const [ quantity, setQuantity ] = useState(0);
        const costPerUnitWeight = (results.cost / results.weight).toFixed(2);
        const navigate = useNavigate();
    
        // Calls the addToCart function, updates the quantity for the product that calls it, updates the cart if the quantity is 1 or greater
        const handleAddToCart = (product, quantity) => {
            if (quantity >= 1) {
                updateQuantity(product, parseInt(productAdded.quantity) + 1, setQuantity, quantity + 1);
            } else {
                addToCart(product)
            }
        }


        return (
            
          <div
            className="flex flex-col justify-between items-center p-2 gap-4 h-auto w-auto max-w-52 shadow-xl rounded-xl"
          >
            <div className="flex flex-col gap-4 shrink-0 w-full">
              {/* Product Image */}
              <img
                src={results.image}
                alt={results.description}
                className="h-44 w-full max-w-20 tablet:h-52 laptop:h-56 desktop:h-60 shrink-0 grow-1 self-center rounded-2xl hover:cursor-pointer object-cover peer"
                onClick={() => navigate(`/products/${results.id}`)}
              />
              {/* Product Name */}
              <p className="text-lg font-medium peer-hover:underline peer-hover:underline-offset-8 decoration-green hover:transition ease-in-out delay-150">
                {capitalize(results.name)}
              </p>
              {/* Price */}
              <p className="text-2xl font-semibold relative -z-0">
                <span className="text-3xl">
                  ${`${results.cost.split(".")[0]}`}
                </span>
                <span className="text-xs absolute top-1 ">
                  {results.cost.split(".")[1]}
                </span>
                <span className="pl-4 text-[gray] text-sm font-normal">
                  ({costPerUnitWeight}/{results.unit_measurement})
                </span>
              </p>
            </div>
            {/* Add to cart button */}
            <button
              className=" text-xs tablet:text-sm text-white font-semibold bg-green rounded flex items-center justify-evenly h-8 w-full  bg-opacity-90 hover:bg-opacity-100"
              onClick={() => handleAddToCart(results, quantity)}
            >
              Add to cart
            </button>
          </div>
        );
    }
    const capitalize = (str) => {
      const stringArray = str.split(" ");
      const capitalizedString = stringArray.map(
        (string) => string[0].toUpperCase() + string.slice(1)
      );

      return capitalizedString.join(" ");
    };