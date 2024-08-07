/* eslint-disable react/prop-types */
// ProductDetails.jsx

import { useState, useEffect} from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import { GiPitchfork } from "react-icons/gi";
// import { optional } from "joi";
import Comments from "./Comments.jsx"
import { deleteProductFromCart } from "./cart/CartFunctions";


const API = import.meta.env.VITE_APP_API_URL;

export default function ProductDetails({ cartQuantity, setCartQuantity, cartProducts, setCartProducts }) {
  const { state } = useLocation();
  const initialProductQuantity = state?.productQuantity || 0;
  const [productQuantity, setProductQuantity] = useState(
    initialProductQuantity
  );
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState({});
  const [seller, setSeller] = useState({});
  const [currentProductCost, setCurrentProductCost] = useState(0);
  const { id } = useParams();

  const costPerUnitWeight = (product.cost / product.weight).toFixed(2);

  // Make an api call to retrieve a product with the given id
  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        const currentCost = (cartQuantity * res.data.cost).toFixed(2);
        console.log(currentCost)
        setCurrentProductCost(currentCost);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        return error;
      });
    axios
      .get(`${API}/cart-products`)
      .then((res) => {
        const data = res.data.find((data) => data.product_id === product.id);
        const currentQuantity = data.quantity;
        setProductQuantity(currentQuantity);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  // Function to add a product to the cart
  function addToCart() {
  }

  // useEffect(() => {
  //   axios.post(`${API}/cart-products`, cart).catch((error) => {
  //     console.log(error);
  //   });
  // }, [cart]);

  // Calls the addToCart function, updates the quantity for the product that calls it, updates the cart if the quantity is 1 or greater
  // const handleAddToCart = (product, operator = "plus") => {

  //   axios
  //     .get(`${API}/cart-products`)
  //     .then((res) => {
  //       const currentProduct = res.data.find(
  //         (data) => data.product_id === product.id
  //       );
  //       updateQuantity(currentProduct, operator);
  //     })
  //     .catch((error) => {
  //       return error;
  //     });

  //   if (productQuantity > 1) {
  //     if (operator === "minus") {
  //       setCartQuantity(quantity - 1);
  //       setProductQuantity(productQuantity - 1);

  //     } else {
  //       setProductQuantity(productQuantity + 1);
  //       setCartQuantity(quantity + 1);
  //     }

  //   } else {
  //     if(operator !== 'minus') {

  //       addToCart(product);
  //       setProductQuantity(productQuantity + 1);
  //       setCartQuantity(cartQuantity + 1);
  //     }

  //   }

  // };

  useEffect(() => {
    axios
      .get(`${API}/sellers`)
      .then((res) => {
        setSeller(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product]);

  // Makes a put request to update the quantity of the product
  //  const updateQuantity = (product, operator = "plus") => {
  //   console.log(productQuantity)
  //    if (operator === "minus") {
  //      axios.put(`${API}/cart-products/${product.cart_id}`, {
  //        quantity: product.quantity - 1,
  //      });
  //    } else {
  //      axios.put(`${API}/cart-products/${product.cart_id}`, {
  //        quantity: product.quantity + 1,
  //      });
  //    }
  //  };

  //  Function to delete a product from the cart
  // const deleteProductFromCart = (product) => {
  //   console.log(product)
  //   axios
  //     .delete(`${API}/cart-products/${product.cart_id}`)
  //     .catch((error) => {
  //       return error;
  //     })
  // }

  // Calls the addToCart function, updates the quantity for the product that calls it, updates the cart if the quantity is 1 or greater
  const handleAddToCart = (product, operator = "plus") => {
    if (productQuantity > 0) {
      if (operator === "minus") {
        setCartQuantity(cartQuantity - 1);
        setProductQuantity(productQuantity - 1);
        setCurrentProductCost(+currentProductCost - product.cost)
      } else {
        setProductQuantity(productQuantity + 1);
        setCartQuantity(cartQuantity + 1);
        const newCost = Number(currentProductCost) + Number(product.cost);
        setCurrentProductCost(toString(newCost))
      }

      axios
        .get(`${API}/cart-products`)
        .then((res) => {
          const currentProduct = res.data.find(
            (data) => data.product_id === product.id
          );
          updateQuantity(currentProduct, operator);
        })
        .catch((error) => {
          return error;
        });
    } else {
      addToCart(product);
      setProductQuantity(productQuantity + 1);
    }
  };

  // Makes a put request to update the quantity of the product
  const updateQuantity = (product, operator = "plus") => {
    if (operator === "minus") {
      axios.put(`${API}/cart-products/${product.cart_id}`, {
        quantity: product.quantity - 1,
      });
    } else {
      axios.put(`${API}/cart-products/${product.cart_id}`, {
        quantity: product.quantity + 1,
      });
    }
  };

  return (
    <div className="h-max w-full flex justify-center">
      {Object.keys(product).length !== 0 && seller[0] && comments ? (
        <div className="h-auto w-full flex flex-col justify-center px-4 pb-20 mt-20 tablet:mt-0 gap-6 tablet:flex-row tablet:items-start tablet:pt-40 tablet:justify-center  tablet:h-fit">
          {/* Image div */}
          <div className="p-4 flex flex-col items-center gap-4 flex-shrink-0">
            <img
              src={product.image}
              alt={product.description}
              className="h-auto w-auto tablet:h-96 shadow-2xl rounded-xl"
            />
            <div className="flex gap-4 ">
              <p className="text-green">●</p>
              <p className="text-gray">●</p>
              <p className="text-gray">●</p>
              <p className="text-gray">●</p>
            </div>
          </div>
          {/* Name, stock, and description */}
          <div className="flex flex-col gap-4  tablet:pt-4 tablet:gap-20 h-full w-full tablet:max-w-md">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">{capitalize(product.name)}</h2>
              <p
                className={`${
                  product.stock > 10
                    ? "text-green font-medium"
                    : product.stock > 0
                    ? "text-gold"
                    : "text-[red]"
                }`}
              >{`${
                product.stock > 10
                  ? "● In Stock"
                  : product.stock > 0
                  ? "● Only " + product.stock + " left"
                  : "● Out of Stock"
              }`}</p>
              <div className="mt-4 flex flex-col">
                <h3 className="font-medium text-base">Description</h3>
                <p className="text-[gray] text-sm">{product.description}</p>
                <Link
                  to={`/sellers/${seller[0].id}`}
                  className="text-green text-xl"
                >
                  <p>
                    {seller[0].first_name} {seller[0].last_name}
                  </p>
                </Link>
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="flex flex-col gap-4 border-t border-gray pt-4">
              <div className="flex justify-between">
                <p className="text-2xl font-semibold relative">
                    {currentProductCost > 0 ? (
                        <>
                            <span className="text-3xl">{currentProductCost.split('.')[0]}</span>
                            <span className="text-xs absolute top-1 ">
                                {currentProductCost.split(".")[1]}
                            </span>
                        </>
                    ) : (
                       <>
                          <span className="text-3xl">
                            ${`${product.cost.split(".")[0]}`}
                          </span>
                          <span className="text-xs absolute top-1 ">
                              {product.cost.split(".")[1]}
                          </span>
                       </>
                    )}
                  <span className="pl-4 text-[gray] text-sm font-normal">
                    ({costPerUnitWeight}/{product.unit_measurement})
                  </span>
                </p>
              </div>
              {/* Add to cart button */}
              <div className="flex justify-between tablet:justify-start gap-20">
                {/* Update Quantity Buttons and Display */}
                <div className="flex items-center gap-2">
                  <p className="font-medium">Qty</p>
                  <div className="flex border items-center w-20 justify-evenly rounded border-gray shadow">
                    <CgMathMinus
                      className="text-base cursor-pointer hover:text-green hover:scale-110"
                      onClick={() => handleAddToCart(product, "minus")}
                    />
                    <p className="cursor-default h-8 flex items-center text-lg gap-1">
                      {productQuantity > 0 ? productQuantity : 0}
                    </p>
                    <CgMathPlus
                      className="text-base cursor-pointer hover:text-green hover:scale-110"
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green rounded bg-opacity-90 hover:bg-opacity-100 text-xs tablet:text-sm font-semibold text-white h-8 w-40"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div>
            {comments.length
              ? comments.map((userComment, index) => {
                  return (
                    <Comments
                      key={index}
                      productId={product.id}
                      index={index}
                      users={users}
                      userComment={userComment}
                    />
                  );
                })
              : null}
          </div>
        </div>
      ) : (
        <p className="text-2xl mt-40 text-center">
          Loading<span className="animate-ping ">. . .</span>
        </p>
      )}
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
