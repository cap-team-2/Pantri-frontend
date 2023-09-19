// FilterProductsBy.jsx

import { LuCarrot, LuApple, LuBeef, LuMilk } from "react-icons/lu";
import { v4 as generateId } from "uuid";
// Array of various products to be used as filter buttons on the home page
const products = [
  {
    category: "Vegetables",
    icon: LuCarrot,
    image:
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
  },
  {
    category: "Fruits",
    icon: LuApple,
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  },
  {
    category: "Meat",
    icon: LuBeef,
    image:
      "https://images.unsplash.com/photo-1595356161904-6708c97be89c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
  },
  {
    category: "Dairy",
    icon: LuMilk,
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
  },
];



export default function FilterProductsBy() {


    return (
        <div className='flex justify-evenly'>
            {products.map(product => {
                return (
                  <div className=" h-20 w-20 flex flex-col items-center justify-center gap-2 hover:underline hover:underline-offset-8 decoration-2 decoration-green-light cursor-pointer" key={generateId()}>
                    <product.icon className="text-2xl md:text-3xl text-green-light font-light" />
                    <p className="text-xs md:text-sm">{product.category}</p>
                  </div>
                );
                
            })}
        </div>
    )
}