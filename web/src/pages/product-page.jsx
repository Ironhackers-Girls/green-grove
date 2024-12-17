import { useEffect, useState } from "react";
import * as ProductsApi from "../services/products-services";
import { useParams } from "react-router-dom";

function ProductPage({ onAddCart }) {
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
    <div className="card">
      <img src={product.image} className="card-img-top" alt="product image" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <button
          className="btn btn-primary"
          onClick={() => handleProductAddCart(product)}
        >
          Añadir al carrito
        </button>
        <button className="btn btn-secondary">Fav</button>
      </div>
    </div>
  );
}

export default ProductPage;
