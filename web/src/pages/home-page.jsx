import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import videoHome from "../assets/video-homepage.mp4";
import productsHome from "../assets/home-products.jpg";
import aboutHome from "../assets/home-about.png";
import ProductItem from "../components/products/product-item/product-item";
import { listProducts, addCart, addWish } from "../services/products-services";
import { Snackbar, Alert } from "@mui/material";
import Lottie from "react-lottie"; 
import loadingAnimation from "../assets/loadingAnimation.json";  

function Homepage() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    listProducts()
      .then((products) => {
        const sortedProducts = products.sort(
          (a, b) => new Date(b.date_added) - new Date(a.date_added)
        );
        setLatestProducts(sortedProducts.slice(0, 4));
      })
      .catch((err) => {
        setError("Products not available at the moment");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddCart = (product) => {
    addCart(product.id)
      .then(() => {
        setSnackbarMessage("Producto added to Cart");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((error) => console.log(error));
  };

  const handleAddWishList = (product) => {
    addWish(product.id)
      .then(() => {
        setSnackbarMessage("Product added to Wishlist");
        setSnackbarSeverity("info");
        setOpenSnackbar(true);
      })
      .catch((error) => console.log(error));
  };

  const lottieOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadingAnimation, 
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="px-7 font-montserrat">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 items-stretch min-h-[24rem]">
        {/* Left */}
        <div className="flex justify-center items-center">
          <video
            src={videoHome}
            alt="Sustainability"
            className="w-full h-full object-cover rounded-2xl"
            autoPlay
            loop
            muted
          />
        </div>

        {/* Right*/}
        <div className="flex flex-col justify-between h-full gap-6">
          <div className="bg-lime-green py-7 px-7 rounded-xl flex flex-col flex-grow max-h-[80vh] overflow-hidden">
            <h2 className="text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-semibold text-black mb-20">
              SUSTAINABLE STYLE <br></br>FOR A BETTER
              <br></br>WORLD
            </h2>
            <p className="text-my-black mt-20 text-sm md:text-sm">
              We're redefining fashion by measuring the carbon footprint of
              every product, reducing waste, and championing a future of
              conscious consumption—real impact, real change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/products"
              className="relative flex items-center justify-center bg-gray-800 hover:bg-gray-800 rounded-xl group overflow-hidden h-48"
            >
              <img
                src={productsHome}
                alt="Products"
                className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4">
                <h2 className="text-my-white text-2xl font-bold uppercase">
                  PRODUCTS
                </h2>
                <span className="text-my-white text-2xl transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </Link>

            <Link
              to="/about"
              className="relative flex items-center justify-center bg-gray-800 hover:bg-gray-800 rounded-xl group overflow-hidden h-48"
            >
              <img
                src={aboutHome}
                alt="About Us"
                className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4">
                <h2 className="text-white text-2xl font-bold uppercase">
                  ABOUT US
                </h2>
                <span className="text-white text-2xl transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Products Section */}
      <div className="latest-products mb-10">
        <h2 className="text-2xl font-bold mb-4">LATEST PRODUCTS</h2>

        {loading && (
          <div className="flex justify-center items-center">
            <Lottie options={lottieOptions} height={100} width={100} />
          </div>
        )}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {latestProducts.map((product) => (
              <div
                key={product.id}
                className="group flex w-full flex-col overflow-hidden bg-white"
              >
                <ProductItem
                  product={product}
                  onAddCart={handleAddCart}
                  onAddWishList={handleAddWishList}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Homepage;
