import { useEffect, useState } from "react";
import * as ProductsApi from "../services/products-services";
import { useParams } from "react-router-dom";

function ProductDetailPage({ onAddCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    ProductsApi.getProduct(id)
      .then((productData) => setProduct(productData))
      .catch((error) => console.log(error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleProductAddCart = (product) => {
    ProductsApi.addCart(product.id)
      .then(() => console.log("product add to cart"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        className="w-full h-64 object-cover"
        alt="product image"
      />
      <div className="p-4">
        <h5 className="text-xl font-semibold text-gray-800">{product.name}</h5>
        <p className="text-lg text-green-600 font-semibold">${product.price}</p>
        <div className="mt-4 flex space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={() => handleProductAddCart(product)}
          >
            Añadir al carrito
          </button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300">
            Fav
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
