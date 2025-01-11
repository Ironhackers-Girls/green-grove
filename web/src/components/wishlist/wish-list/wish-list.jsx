import { useEffect, useState } from "react";
import * as ProductsApi from "../../../services/products-services";
import WishItem from "../wish-item/wish-item.jsx";
import { Snackbar, Alert } from "@mui/material";

function WishList({ className = " " }) {
  const [wishlist, setWishlist] = useState([]);
  const [productsWish, setProductsWish] = useState([]);
  const [reload, setReload] = useState(false);
  // Alerts
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    ProductsApi.listWish()
      .then((wishlist) => setWishlist(wishlist))
      .catch((error) => console.log(error));
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
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
    >
      {productsWish.map((productWish) => (
        <WishItem
          key={productWish.id}
          product={productWish}
          onDeleteWish={handleDeleteWishList}
          onAddCart={handleProductAddCart}
        />
      ))}

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
