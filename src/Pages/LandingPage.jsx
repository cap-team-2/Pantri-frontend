// LandingPage.jsx
import { Link } from "react-router-dom";
import landingVeggies from "/src/assets/Banners-page-sections/engin-akyurt-Y5n8mCpvlZU-unsplash.jpg";
import LandingBanner from "../assets/Banners-page-sections/pexels-erik-scheel-95425.jpg";


export default function LandingPage() {
    return (
      <div className="h-auto w-full flex flex-col bg-white pt-16 tablet:pt-16 desktop:px-36 xl:px-80 ">
        <div className="pb-96  tablet:pb-[600px] xl:pb-[700px] relative">
          {/* Background Image */}
          <img
            src={LandingBanner}
            alt="Local vendor handing an apple to a customer"
            className="object-cover h-full w-full absolute"
          />
          <div className="flex flex-col items-center justify-center h-full w-full absolute pb-4 tablet:pt-20 desktop:p-0">
            {/* CTA with background image and Get Started Button */}
            <div className=" bg-black bg-opacity-40 h-40 w-full flex justify-center items-center ">
              <h1 className="text-white text-[26px] tablet:text-4xl font-medium text-center py-4 mobile:w-[480px]">
                From Market to <span className="text-green">PANTRI</span>:
                Nourish Your <span className="text-green">Home</span>,
                Nourish Your <span className="text-green">Community</span>
              </h1>
            </div>
            {/* Get Started Button */}
            <Link
              to={"/products"}
              className="bg-green h-10 w-32 flex items-center justify-center text-white hover:border-2 hover:border-white font-bold rounded-lg absolute bottom-10 laptop:bottom-20"
            >
              Start Shopping
            </Link>
          </div>
        </div>
        {/* Info and data about food insecurity */}
        <div className=" h-auto w-full p-4">
          <h2 className="text-green font-extrabold text-2xl text-center">
            Integer feugiat scelerisque varius morbi enim nunc
          </h2>
          <p className="text-center mt-4 p-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra
            et ultrices neque ornare aenean euismod elementum nisi.
          </p>
        </div>
        <div className="p-4">
          <img src={landingVeggies} alt="" className="p-6" />
        </div>
      </div>
    );
}