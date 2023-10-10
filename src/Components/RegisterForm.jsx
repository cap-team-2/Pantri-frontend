// RegisterForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineCheck } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { auth, provider  } from "../fireBase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import logo from "../assets/logo-dark.png";
import axios from "axios"


const API = import.meta.env.VITE_APP_API_URL;

export default function RegisterForm() {
  const [registration, setRegistration] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    type: "buyer",
  });

  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();

  // Function to update the form state with every change for login form
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setRegistration({ ...registration, [id]: value });
  };

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, registration.email, registration.password)
    .then((userCredential) => {
        console.log(userCredential);
    })
    .catch((error) => {
        console.log(error);
    });
    axios.post(`${API}/users`, registration)
    .then(() => {
      console.log(registration)
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    })
  };

  function google() {
    signInWithPopup(auth, provider)
    .catch((error) => {
      alert(error);
    });
    navigate("/");
  }

  // Function that toggles the passwordType from 'password' to 'text' creating a show password effect
  const togglePassword = (type) => {
    type === "password" ? setPasswordType("text") : setPasswordType("password");
  };

  return (
    <div className="h-full w-full flex justify-center items-center z-50 bg-[#BFDCBC]  pt-[5%]">
      <div className="h-[620px] w-[500px] px-8 bg-white rounded flex flex-col items-center">
        <img src={logo} alt="Pantri Logo" className="h-32 w-32" />
        <div className="flex flex-col items-center gap-2 mb-2 w-full">
          <div className="flex w-full justify-around">
            <Link
              to={"/login"}
              className="w-40 text-center font-semibold opacity-50 p-2"
            >
              Log in
            </Link>
            <Link className="w-40 font-semibold text-center p-2 border-b-2 border-green text-green">
              Create account
            </Link>
          </div>
          <h2 className="text-2xl text-green font-semibold m-2">
            Welcome back!
          </h2>
        </div>
        <form id="register" noValidate className="group">
          <div className="flex w-full items-center justify-between gap-2">
            {/* First Name */}
            <div className="grid gap-2 relative w-full">
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={registration.first_name}
                onChange={handleFormChange}
                className="peer h-12 border placeholder:text-[#5a5a5a] rounded pl-4 outline-none ease-in-out duration-500 focus:ring-1 focus:ring-green-light  focus:border-green-light"
                // pattern={`^[A-Za-z'-]+$`}
                required
              />
              <p className="text-xs text-[red] peer-placeholder-shown:peer-invalid:invisible peer-invalid:visible peer-valid:invisible peer-focus:invisible">
                Please enter your first name
              </p>
              <HiOutlineCheck className="absolute peer-placeholder-shown:!invisible peer-invalid:invisible peer-valid:visible top-[45px] right-2 text-green-dark text-xl" />
            </div>
            {/* Last Name */}
            <div className="grid gap-2 relative w-full">
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                value={registration.last_name}
                onChange={handleFormChange}
                className="peer h-12 border placeholder:text-[#5a5a5a] rounded pl-4 outline-none ease-in-out duration-500 focus:ring-1 focus:ring-green-light  focus:border-green-light"
                // pattern="^[A-Za-z'-]+$"
                required
              />
              <p className="text-xs text-[red] invisible peer-placeholder-shown:peer-invalid:invisible peer-focus:invisible peer-invalid:visible">
                Please enter your last name
              </p>
              <HiOutlineCheck className="absolute peer-placeholder-shown:!invisible peer-invalid:invisible peer-valid:visible top-[54px] right-2 text-green-dark text-xl" />
            </div>
          </div>
          <div className="grid gap-2 relative">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email (email@domain.com)"
              value={registration.email}
              onChange={handleFormChange}
              className="peer h-12 border placeholder:text-[#5a5a5a] rounded pl-4 outline-none ease-in-out duration-500 focus:ring-1 focus:ring-green-light  focus:border-green-light"
              required
            />
            <p className="text-xs text-[red] peer-placeholder-shown:peer-invalid:invisible invisible peer-invalid:visible peer-focus:invisible">
              Please enter a valid email
            </p>
            <HiOutlineCheck className="absolute peer-placeholder-shown:!invisible peer-invalid:invisible peer-valid:visible top-3 right-2 text-green-dark text-xl" />
          </div>
          <div className="grid gap-2 relative">
            <input
              placeholder="Password"
              className="peer h-12 border placeholder:text-[#5a5a5a] rounded pl-4 outline-none focus:ring-1 focus:ring-green-light ease-in-out duration-500 focus:border-green-light"
              onChange={handleFormChange}
              value={registration.password}
              type={passwordType}
              id="password"
              maxLength={40}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
              required
            />
            <p className="text-xs text-[red] peer-placeholder-shown:peer-invalid:invisible invisible peer-invalid:visible peer-focus:invisible">
              Password must contain at least 8 characters, including one
              uppercase letter, one lowercase letter, and one digit.
            </p>
            <AiOutlineEyeInvisible
              className={`absolute top-3 right-10 text-2xl cursor-pointer text-green ${
                passwordType === "text" ? "visible" : "invisible"
              }`}
              onClick={() => togglePassword("text")}
            />
            <AiOutlineEye
              className={`absolute top-3 right-10 text-2xl cursor-pointer text-green ${
                passwordType === "password" ? "visible" : "invisible"
              }`}
              onClick={() => togglePassword("password")}
            />
            <HiOutlineCheck className="absolute peer-placeholder-shown:!invisible peer-invalid:invisible peer-valid:visible top-3 right-2 text-green-dark text-xl" />
          </div>
          <div className="grid text-center gap-2 text-sm">
            <button
              onClick={signUp}
              className="rounded-md h-12 bg-green bg-opacity-70 hover:bg-opacity-90 font-bold cursor-pointer text-white"
            >
              Create My Account
            </button>
            <p>or</p>
            <button
              onClick={google}
              className="border border-green-light rounded-md h-12 mb-2 font-medium flex justify-center items-center gap-2 hover:border-green"
            >
              <FcGoogle size={24} /> Sign up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}