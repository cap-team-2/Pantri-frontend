// Cart.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Cart from "../Components/Cart.jsx";
import Summary from "../Components/Summary.jsx";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
const API = import.meta.env.VITE_APP_API_URL;

export default function CartPage({ session, cartProducts, setCartProducts, quantity, setQuantity }) {
    const navigate = useNavigate();
   
    // gets all items in the cart
    useEffect(() => {
      if(session) {
         axios
           .get(`${API}/cart-joins/${session.id || 1}`)
           .then((res) => {
             setCartProducts(res.data);
             console.log(res.data)
           })
           .catch((error) => {
             console.log(error);
           });
      }
       
    }, [])

    return ( 
      <div className="h-auto w-full px-6 pt-4 tablet:pt-4  pb-20 mt-20 tablet:mt-24 flex flex-col tablet:px-32 items-center relative">
        <div className="flex flex-col tablet:flex-row h-full tablet:h-[600px] w-full rounded-2xl border-gray tablet:gap-10 tablet:justify-center">
        <BiArrowBack
          className="mb-6 text-3xl tablet:text-2xl tablet:text-black hover:text-green cursor-pointer tablet:absolute top-0 left-10"
          onClick={() => navigate(-1)}
        />
          <div className="h-full w-full min-w-min  mb-8 border rounded-2xl pt-10 pb-4 px-4 border-gray-light shadow-lg">
            <Cart
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
          <div className="h-fit w-full min-w-max desktop:w-[400px] xl:w-[400px] border rounded-2xl pb-4 px-4 border-gray-light shadow-lg">
            <Summary cartProducts={cartProducts} />
          </div>
        </div>
      </div>
    );
}