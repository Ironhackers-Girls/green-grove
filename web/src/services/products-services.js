import axios from 'axios';

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


const addCart = (idProduct) => {
    return http.post('/cart', {
        "idProduct": idProduct
    });
}

export {
    listProducts,
    getProduct,
    addCart,
    listCart,
    deleteCart
}