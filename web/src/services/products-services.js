import axios from 'axios';
import CartItem from '../components/cart/cart-item/cart-item';

const http = axios.create({
    baseURL: 'http://localhost:3000'
})

http.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)

const listProducts = () => http.get('/products');

const getProduct = (id) => http.get(`/products/${id}`)

const listCart = () => http.get('/cart');

const deleteCart = (id) => http.delete(`/cart/${id}`)

const incrementCart = (cartProduct) => {
    return http.patch(`/cart/${cartProduct.id}`, {
        "quantity" : cartProduct.quantity + 1 
    });
}

const decrementCart = (cartProduct) => {
    return http.patch(`/cart/${cartProduct.id}`, {
        "quantity" : cartProduct.quantity - 1 
    });
}


const addCart = (idProduct) => {
    return listCart()
        .then(cartItems => {
            const existingProduct = cartItems.find(item => item.idProduct === idProduct);

            if (existingProduct) {
                return http.patch(`/cart/${existingProduct.id}`, {
                    "quantity" : existingProduct.quantity + 1
                });                
            } else {
                return http.post('/cart', {
                    idProduct: idProduct,
                    quantity:1
                });
            }
        })
        .catch(error => console.log(error));
}

export {
    listProducts,
    getProduct,
    addCart,
    listCart,
    deleteCart,
    incrementCart,
    decrementCart
}