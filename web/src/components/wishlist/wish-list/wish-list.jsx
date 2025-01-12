import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services";
import WishItem from "../wish-item/wish-item.jsx";
import { Snackbar, Alert } from "@mui/material";
import animationEmpty from "../../../assets/empty-animation.json";
import Lottie from "react-lottie";


function WishList({ className = " " }) {
  const [wishlist, setWishlist] = useState([]);
  const [productsWish, setProductsWish] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Alerts
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationEmpty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    ProductsApi.listWish()
      .then((wishlist) => setWishlist(wishlist))
      .catch((err) => {
        setError("Products not available at the moment");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [reload]);

  useEffect(() => {
    if (wishlist.length > 0) {
      Promise.all(
        wishlist.map((wishItem) =>
          ProductsApi.getProduct(wishItem.idProduct).then((productDetails) => ({
            ...productDetails,
          }))
        )
      )
        .then((response) => {
          setProductsWish(response);
        })
        .catch((error) => console.log(error));
    } else {
      setProductsWish([]);
    }
  }, [wishlist]);

  const handleDeleteWishList = (product) => {
    const wishlistItem = wishlist.find((item) => item.idProduct === product.id);

    ProductsApi.deleteWish(wishlistItem.id)
      .then(() => {
        setReload(!reload);
        setSnackbarMessage("Product deleted from WishList");
        setSnackbarSeverity("info");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarMessage("Error deleting product");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        console.log(error);
      });
  };

  const handleProductAddCart = (product) => {
    ProductsApi.addCart(product.id)
      .then(() => {
        setReload(!reload);
        setSnackbarMessage("Product added to CartList");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarMessage("Error adding product to cart");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        console.log(error);
      });
  };

  return (
    <div>
      {loading && (
        <>
          {Array(4).fill().map((_, index) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse" key={index} >
              <div className="relative w-[400px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-300 dark:bg-gray-700">
                <div className="absolute top-0 right-0 h-full w-full bg-gray-200 flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" ></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {error && <p>{error}</p>}

      {!loading && !error && wishlist.length === 0 && (
        <div className="flex flex-col w-full justify-center items-center mb-5">
          <Lottie
            options={lottieOptions}
            height={400}
            width={400}
            style={{ cursor: "default" }}
          />
          <p className="text-center text-gray-500">
            Your wishlist is currently empty.
          </p>
        </div>
      )}

      {!loading && !error && wishlist.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsWish.map((productWish) => (
            <WishItem
              key={productWish.id}
              product={productWish}
              onDeleteWish={handleDeleteWishList}
              onAddCart={handleProductAddCart}
            />
          ))}
        </div>
      )}



      {/* Alerts */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
        sx={{ top: "80px" }}
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

export default WishList;
