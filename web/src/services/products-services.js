import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

const listProducts = () => http.get(`/products/`);

const getProduct = (id) => http.get(`/products/${id}`);

const listCart = () => http.get("/cart");

const listWish = () => http.get("wishlist");

const deleteWish = (id) => http.delete(`/wishlist/${id}`);

const deleteCart = (id) => http.delete(`/cart/${id}`);

const incrementCart = (cartProduct) => {
  return http.patch(`/cart/${cartProduct.id}`, {
    quantity: cartProduct.quantity + 1,
  });
};

const decrementCart = (cartProduct) => {
  return http.patch(`/cart/${cartProduct.id}`, {
    quantity: cartProduct.quantity - 1,
  });
};

const addWish = (idProduct) => {
  return listWish()
    .then((wishItems) => {
      const existingProduct = wishItems.find(
        (item) => item.idProduct === idProduct
      );

      if (existingProduct) {
        return console.log("ya está en la lista");
      } else {
        return http.post("/wishlist", {
          idProduct: idProduct,
        });
      }
    })
    .catch((error) => console.log(error));
};

const addCart = (idProduct) => {
  return listCart()
    .then((cartItems) => {
      const existingProduct = cartItems.find(
        (item) => item.idProduct === idProduct
      );

      if (existingProduct) {
        return http.patch(`/cart/${existingProduct.id}`, {
          quantity: existingProduct.quantity + 1,
        });
      } else {
        return http.post("/cart", {
          idProduct: idProduct,
          quantity: 1,
        });
      }
    })
    .catch((error) => console.log(error));
};

const clearCart = async () => {
  try {
    // Await the result of listCart() to get the current cart items
    const cart = await listCart();

    //  Array of promises to delete each item from the cart
    const deletePromises = cart.map((item) => deleteCart(item.id));

    // Await the resolution of all delete promises simultaneously
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export {
  listProducts,
  getProduct,
  addCart,
  listCart,
  deleteCart,
  incrementCart,
  decrementCart,
  listWish,
  deleteWish,
  addWish,
  clearCart,
};
